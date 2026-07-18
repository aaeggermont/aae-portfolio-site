// app/admin/page.tsx
"use client";

import React from "react";
import { auth, db } from "@/firebase";
import {
  arrayRemove,
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
  writeBatch,
} from "firebase/firestore";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { signOut } from "firebase/auth";

type AccessRequest = {
  id: string; // doc id
  projectId: number;
  projectKey: string;
  uid: string;
  email?: string | null;
  displayName?: string | null;
  status: "pending" | "approved" | "rejected";
  createdAt?: any;
  resolvedAt?: any;
  resolvedBy?: string | null;
};

type AllowlistDoc = {
  projectId?: number;
  projectKey: string;
  slug?: string;
  title?: string;
  enabled?: boolean;
  allowedUids?: string[];
  allowedEmails?: string[];
  updatedAt?: any;
  updatedBy?: string;
};

type ApprovedUserRow = {
  uid: string;
  email?: string | null;
  displayName?: string | null;
};

type AccessCodeRow = {
  id: string;
  projectKey?: string;
  projectKeys?: string[];
  label?: string;
  reference?: string;
  codeHint?: string;
  /** Plaintext code when available (newer codes). */
  accessCode?: string;
  enabled?: boolean;
  expiresAt?: { seconds?: number; toDate?: () => Date } | null;
  redemptionCount?: number;
  maxRedemptions?: number | null;
  createdAt?: { seconds?: number; toDate?: () => Date } | null;
};

/** Known protected portfolio projects (shown as multi-select for access codes). */
const PROTECTED_PROJECT_OPTIONS = [
  { key: "project_1", label: "AR Story Teller" },
  { key: "project_2", label: "Finding Nemo" },
  { key: "project_3", label: "DCL Revenue Management" },
  { key: "project_4", label: "Automatic Seating Assignments" },
] as const;

function accessCodeProjectKeys(c: AccessCodeRow): string[] {
  if (Array.isArray(c.projectKeys) && c.projectKeys.length > 0) return c.projectKeys;
  if (c.projectKey) return [c.projectKey];
  return [];
}

function normalizeEmail(email?: string | null) {
  return (email ?? "").trim().toLowerCase();
}

function uniq(arr: string[]) {
  return Array.from(new Set(arr));
}

function formatAccessCodeDate(value?: AccessCodeRow["expiresAt"]): string {
  if (!value) return "—";
  try {
    if (typeof value.toDate === "function") {
      return value.toDate().toLocaleDateString();
    }
    if (typeof value.seconds === "number") {
      return new Date(value.seconds * 1000).toLocaleDateString();
    }
  } catch {
    // ignore
  }
  return "—";
}

export default function AdminAccessPage() {
  const [pendingRequests, setPendingRequests] = React.useState<AccessRequest[]>([]);
  const [allowlists, setAllowlists] = React.useState<Record<string, AllowlistDoc>>({});
  const [approvedByProject, setApprovedByProject] = React.useState<Record<string, ApprovedUserRow[]>>(
    {}
  );
  const [accessCodes, setAccessCodes] = React.useState<AccessCodeRow[]>([]);

  // manual add panel (keep if useful)
  const [manualProjectKey, setManualProjectKey] = React.useState("project_4");
  const [manualUid, setManualUid] = React.useState("");
  const [manualEmail, setManualEmail] = React.useState("");

  // access code generator
  const [codeProjectKeys, setCodeProjectKeys] = React.useState<string[]>(["project_4"]);
  const [codeReference, setCodeReference] = React.useState("");
  const [codeDays, setCodeDays] = React.useState("30");
  const [codeBusy, setCodeBusy] = React.useState(false);
  const [codeError, setCodeError] = React.useState<string | null>(null);
  const [lastGeneratedCode, setLastGeneratedCode] = React.useState<{
    code: string;
    reference: string;
    projectKeys: string[];
    expiresAt: string;
  } | null>(null);

  React.useEffect(() => {
    // 1) Pending requests
    const qPending = query(
      collection(db, "access_requests"),
      where("status", "==", "pending")
    );

    const unsubPending = onSnapshot(qPending, (snap) => {
      const next: AccessRequest[] = snap.docs.map((d) => {
        const data = d.data() as Omit<AccessRequest, "id">;
        return { id: d.id, ...data };
      });
      setPendingRequests(next);
    });

    // 2) All allowlist docs
    const unsubAllow = onSnapshot(collection(db, "access_allowlist"), (snap) => {
      const map: Record<string, AllowlistDoc> = {};
      snap.docs.forEach((d) => {
        map[d.id] = d.data() as AllowlistDoc;
      });
      setAllowlists(map);
    });

    // 3) Approved requests (for displaying name/email next to UID)
    const qApproved = query(
      collection(db, "access_requests"),
      where("status", "==", "approved")
    );

    const unsubApproved = onSnapshot(qApproved, (snap) => {
      const map: Record<string, ApprovedUserRow[]> = {};
      snap.docs.forEach((d) => {
        const data = d.data() as any;
        const projectKey = String(data.projectKey || "");
        const uid = String(data.uid || "");
        if (!projectKey || !uid) return;

        if (!map[projectKey]) map[projectKey] = [];
        map[projectKey].push({
          uid,
          email: data.email ?? null,
          displayName: data.displayName ?? null,
        });
      });
      setApprovedByProject(map);
    });

    const unsubCodes = onSnapshot(collection(db, "project_access_codes"), (snap) => {
      const rows: AccessCodeRow[] = snap.docs.map((d) => {
        const data = d.data() as Omit<AccessCodeRow, "id">;
        return { id: d.id, ...data };
      });
      rows.sort((a, b) => {
        const aSec = a.createdAt?.seconds ?? 0;
        const bSec = b.createdAt?.seconds ?? 0;
        return bSec - aSec;
      });
      setAccessCodes(rows);
    });

    return () => {
      unsubPending();
      unsubAllow();
      unsubApproved();
      unsubCodes();
    };
  }, []);

  const onLogout = async () => {
    await signOut(auth);
    // optional: hard redirect so auth state fully resets in UI
    window.location.href = "/";
  };

  const approveRequest = async (req: AccessRequest) => {
    console.info(
      `Approving access for project=${req.projectKey} uid=${req.uid} email=${req.email}`
    );

    const adminUid = auth.currentUser?.uid ?? "unknown";
    const allowRef = doc(db, "access_allowlist", req.projectKey);
    const reqRef = doc(db, "access_requests", req.id);

    const allowSnap = await getDoc(allowRef);
    const existing = (allowSnap.exists() ? (allowSnap.data() as AllowlistDoc) : {}) as AllowlistDoc;

    const nextUids = uniq([...(existing.allowedUids ?? []), req.uid].filter(Boolean));
    const nextEmails = uniq(
      [...(existing.allowedEmails ?? []), normalizeEmail(req.email)]
        .filter(Boolean)
        .map((e) => e.trim().toLowerCase())
    );

    const batch = writeBatch(db);

    batch.set(
      allowRef,
      {
        projectId: req.projectId,
        projectKey: req.projectKey,
        enabled: existing.enabled ?? true,
        allowedUids: nextUids,
        allowedEmails: nextEmails,
        updatedAt: serverTimestamp(),
        updatedBy: adminUid,
      },
      { merge: true }
    );

    batch.update(reqRef, {
      status: "approved",
      resolvedAt: serverTimestamp(),
      resolvedBy: adminUid,
    });

    await batch.commit();
  };

  const rejectRequest = async (req: AccessRequest) => {
    const adminUid = auth.currentUser?.uid ?? "unknown";
    await updateDoc(doc(db, "access_requests", req.id), {
      status: "rejected",
      resolvedAt: serverTimestamp(),
      resolvedBy: adminUid,
    });

    // safety: ensure removed from allowlist
    await revokeAccess(req.projectKey, req.uid, req.email ?? undefined);
  };

  const revokeAccess = async (projectKey: string, uid?: string, email?: string) => {
    const adminUid = auth.currentUser?.uid ?? "unknown";
    const allowRef = doc(db, "access_allowlist", projectKey);

    const emailNorm = normalizeEmail(email);

    console.info(
      `Revoking access for project=${projectKey} uid=${uid ?? "-"} email=${emailNorm ?? "-"}`
    );

    try {
      const batch = writeBatch(db);

      // remove from allowlist atomically
      const payload: Record<string, any> = {
        updatedAt: serverTimestamp(),
        updatedBy: adminUid,
      };
      if (uid) payload.allowedUids = arrayRemove(uid);
      if (emailNorm) payload.allowedEmails = arrayRemove(emailNorm);

      batch.update(allowRef, payload);

      // update request doc status if it exists (Gate uses `${projectKey}_${uid}`)
      if (uid) {
        const reqId = `${projectKey}_${uid}`;
        const reqRef = doc(db, "access_requests", reqId);
        const snap = await getDoc(reqRef);
        if (snap.exists()) {
          batch.update(reqRef, {
            status: "rejected",
            resolvedAt: serverTimestamp(),
            resolvedBy: adminUid,
          });
        }
      }

      await batch.commit();
    } catch (e: any) {
      console.error("Revoke failed:", e);
      alert(`Revoke failed: ${e?.message ?? e}`);
    }
  };

  const toggleEnabled = async (projectKey: string, enabled: boolean) => {
    const adminUid = auth.currentUser?.uid ?? "unknown";
    await setDoc(
      doc(db, "access_allowlist", projectKey),
      {
        projectKey,
        enabled,
        updatedAt: serverTimestamp(),
        updatedBy: adminUid,
      },
      { merge: true }
    );
  };

  const manualAdd = async () => {
    const projectKey = manualProjectKey.trim();
    if (!projectKey) return;

    const uid = manualUid.trim();
    const email = normalizeEmail(manualEmail);

    if (!uid && !email) return;

    const adminUid = auth.currentUser?.uid ?? "unknown";
    const allowRef = doc(db, "access_allowlist", projectKey);

    const snap = await getDoc(allowRef);
    const existing = (snap.exists() ? (snap.data() as AllowlistDoc) : {}) as AllowlistDoc;

    const nextUids = uid ? uniq([...(existing.allowedUids ?? []), uid]) : (existing.allowedUids ?? []);
    const nextEmails = email
      ? uniq([...(existing.allowedEmails ?? []).map(normalizeEmail), email])
      : (existing.allowedEmails ?? []).map(normalizeEmail);

    await setDoc(
      allowRef,
      {
        projectKey,
        enabled: existing.enabled ?? true,
        allowedUids: nextUids,
        allowedEmails: nextEmails,
        updatedAt: serverTimestamp(),
        updatedBy: adminUid,
      },
      { merge: true }
    );

    setManualUid("");
    setManualEmail("");
  };

  const toggleCodeProjectKey = (key: string) => {
    setCodeProjectKeys((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key],
    );
  };

  const generateAccessCode = async () => {
    setCodeBusy(true);
    setCodeError(null);
    setLastGeneratedCode(null);

    try {
      const reference = codeReference.trim();
      const projectKeys = codeProjectKeys;
      const days = Number(codeDays);
      if (projectKeys.length === 0 || !reference) {
        setCodeError("Select at least one project and enter a reference.");
        return;
      }
      if (!Number.isFinite(days) || days <= 0) {
        setCodeError("Days must be a positive number.");
        return;
      }

      const idToken = await auth.currentUser?.getIdToken(true);
      if (!idToken) {
        setCodeError("Admin session missing. Sign in again.");
        return;
      }

      const res = await fetch("/api/admin/access-codes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        credentials: "include",
        body: JSON.stringify({ projectKeys, reference, days }),
      });

      const data = (await res.json().catch(() => null)) as {
        ok?: boolean;
        reason?: string;
        code?: string;
        reference?: string;
        projectKeys?: string[];
        expiresAt?: string;
        message?: string;
      } | null;

      if (!res.ok || !data?.ok || !data.code) {
        setCodeError(data?.message || data?.reason || `Failed (${res.status})`);
        return;
      }

      setLastGeneratedCode({
        code: data.code,
        reference: data.reference ?? reference,
        projectKeys: data.projectKeys ?? projectKeys,
        expiresAt: data.expiresAt ?? "",
      });
      setCodeReference("");
    } catch (e: unknown) {
      setCodeError(e instanceof Error ? e.message : "Failed to generate code.");
    } finally {
      setCodeBusy(false);
    }
  };

  const revokeAccessCode = async (codeHash: string) => {
    const idToken = await auth.currentUser?.getIdToken(true);
    if (!idToken) return;

    await fetch("/api/admin/access-codes", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
      },
      credentials: "include",
      body: JSON.stringify({ codeHash, enabled: false }),
    });
  };

  const restoreAccessCode = async (codeHash: string) => {
    const idToken = await auth.currentUser?.getIdToken(true);
    if (!idToken) return;

    await fetch("/api/admin/access-codes", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
      },
      credentials: "include",
      body: JSON.stringify({ codeHash, enabled: true }),
    });
  };

  const copyGeneratedCode = async () => {
    if (!lastGeneratedCode) return;
    try {
      await navigator.clipboard.writeText(lastGeneratedCode.code);
    } catch {
      // ignore
    }
  };

  const copyListedAccessCode = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      // ignore
    }
  };

  return (
    <Box sx={{ p: { xs: 2, md: 3 }, maxWidth: 1100, mx: "auto" }}>
      <Stack spacing={2}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          spacing={1}
        >
          <Typography variant="h4" sx={{ fontWeight: 800 }}>
            Admin · Project Access
          </Typography>
          <Button variant="outlined" color="inherit" onClick={onLogout}>
            Sign out
          </Button>
        </Stack>

        <Typography variant="body2" color="text.secondary">
          Approve/revoke reviewers, issue access codes for job applications, and
          control per-project allowlists.
        </Typography>

        <Divider />

        {/* Access codes */}
        <Paper sx={{ p: 2, borderRadius: 2 }}>
          <Stack spacing={1.5}>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Access codes
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Generate one 6-digit code for a company or person that unlocks one or
              more protected projects. Codes stay visible here so you can re-send
              them. Revoking a code immediately ends live reviewer sessions.
            </Typography>

            <TextField
              label="Reference (company or person)"
              value={codeReference}
              onChange={(e) => setCodeReference(e.target.value)}
              placeholder="Acme Corp – May 2026"
              fullWidth
            />

            <Stack spacing={0.5}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                Projects this code unlocks
              </Typography>
              <FormGroup row>
                {PROTECTED_PROJECT_OPTIONS.map((p) => (
                  <FormControlLabel
                    key={p.key}
                    control={
                      <Checkbox
                        checked={codeProjectKeys.includes(p.key)}
                        onChange={() => toggleCodeProjectKey(p.key)}
                      />
                    }
                    label={`${p.label} (${p.key})`}
                  />
                ))}
              </FormGroup>
            </Stack>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={1} alignItems={{ sm: "center" }}>
              <TextField
                label="Valid days"
                value={codeDays}
                onChange={(e) => setCodeDays(e.target.value)}
                sx={{ minWidth: { sm: 140 } }}
              />
              <Button
                variant="contained"
                onClick={generateAccessCode}
                disabled={codeBusy}
                sx={{ whiteSpace: "nowrap" }}
              >
                Generate
              </Button>
            </Stack>

            {codeError && (
              <Typography variant="body2" color="error">
                {codeError}
              </Typography>
            )}

            {lastGeneratedCode && (
              <Paper
                variant="outlined"
                sx={{
                  p: 1.5,
                  borderRadius: 2,
                  bgcolor: "rgba(6, 76, 95, 0.06)",
                }}
              >
                <Stack spacing={1}>
                  <Typography variant="body2" sx={{ fontWeight: 700 }}>
                    New code for {lastGeneratedCode.reference}
                  </Typography>
                  <Typography variant="h5" sx={{ fontFamily: "monospace", letterSpacing: 4 }}>
                    {lastGeneratedCode.code}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Projects: {lastGeneratedCode.projectKeys.join(", ")}
                    {lastGeneratedCode.expiresAt
                      ? ` · expires ${new Date(lastGeneratedCode.expiresAt).toLocaleString()}`
                      : ""}
                    {" · also saved in the list below for re-send"}
                  </Typography>
                  <Button size="small" variant="outlined" onClick={copyGeneratedCode} sx={{ alignSelf: "flex-start" }}>
                    Copy code
                  </Button>
                </Stack>
              </Paper>
            )}

            {accessCodes.length === 0 ? (
              <Typography variant="body2" color="text.secondary">
                No access codes yet.
              </Typography>
            ) : (
              <Stack spacing={1}>
                {accessCodes.map((c) => {
                  const reference = c.reference || c.label || "(no reference)";
                  const keys = accessCodeProjectKeys(c);
                  const revoked = c.enabled === false;
                  const storedCode =
                    typeof c.accessCode === "string" && /^\d{6}$/.test(c.accessCode)
                      ? c.accessCode
                      : null;
                  return (
                    <Paper key={c.id} variant="outlined" sx={{ p: 1.5, borderRadius: 2 }}>
                      <Stack
                        direction={{ xs: "column", md: "row" }}
                        spacing={1}
                        alignItems={{ md: "center" }}
                        justifyContent="space-between"
                      >
                        <Stack spacing={0.5} sx={{ minWidth: 0, flex: 1 }}>
                          <Typography variant="body2" sx={{ fontWeight: 700 }}>
                            {reference}
                          </Typography>
                          {storedCode ? (
                            <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
                              <Typography
                                variant="h6"
                                sx={{ fontFamily: "monospace", letterSpacing: 3, m: 0 }}
                              >
                                {storedCode}
                              </Typography>
                              <Button
                                size="small"
                                variant="outlined"
                                onClick={() => copyListedAccessCode(storedCode)}
                              >
                                Copy
                              </Button>
                            </Stack>
                          ) : (
                            <Typography variant="body2" color="text.secondary">
                              Code not stored (hint {c.codeHint ?? "••••••"}) — generate a new
                              code to re-share.
                            </Typography>
                          )}
                          <Typography variant="body2" color="text.secondary">
                            {keys.join(", ") || "(no projects)"} · uses {c.redemptionCount ?? 0}
                            {typeof c.maxRedemptions === "number"
                              ? ` / ${c.maxRedemptions}`
                              : ""}{" "}
                            · expires {formatAccessCodeDate(c.expiresAt)}
                          </Typography>
                          <Chip
                            size="small"
                            label={revoked ? "Revoked" : "Active"}
                            color={revoked ? "default" : "success"}
                            sx={{ alignSelf: "flex-start" }}
                          />
                        </Stack>
                        <Button
                          size="small"
                          variant="outlined"
                          color={revoked ? "primary" : "error"}
                          onClick={() =>
                            revoked ? restoreAccessCode(c.id) : revokeAccessCode(c.id)
                          }
                        >
                          {revoked ? "Restore" : "Revoke"}
                        </Button>
                      </Stack>
                    </Paper>
                  );
                })}
              </Stack>
            )}
          </Stack>
        </Paper>

        {/* Pending requests */}
        <Paper sx={{ p: 2, borderRadius: 2 }}>
          <Stack spacing={1.5}>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Pending requests
            </Typography>

            {pendingRequests.length === 0 ? (
              <Typography variant="body2" color="text.secondary">
                No pending requests.
              </Typography>
            ) : (
              <Stack spacing={1}>
                {pendingRequests.map((r) => (
                  <Paper key={r.id} variant="outlined" sx={{ p: 1.5, borderRadius: 2 }}>
                    <Stack spacing={1}>
                      <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
                        <Chip size="small" label={r.projectKey} />
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {r.displayName ?? "Reviewer"}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {r.email ?? "(no email)"} · UID: {r.uid}
                        </Typography>
                      </Stack>

                      <Stack direction="row" spacing={1} flexWrap="wrap">
                        <Button variant="contained" onClick={() => approveRequest(r)}>
                          Approve
                        </Button>
                        <Button variant="outlined" color="error" onClick={() => rejectRequest(r)}>
                          Reject
                        </Button>
                      </Stack>
                    </Stack>
                  </Paper>
                ))}
              </Stack>
            )}
          </Stack>
        </Paper>

        {/* Allowlists */}
        <Paper sx={{ p: 2, borderRadius: 2 }}>
          <Stack spacing={1.5}>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Allowlists
            </Typography>

            {Object.keys(allowlists).length === 0 ? (
              <Typography variant="body2" color="text.secondary">
                No allowlist documents yet.
              </Typography>
            ) : (
              <Stack spacing={1.25}>
                {Object.entries(allowlists).map(([projectKey, a]) => {
                  const allowedUids = a.allowedUids ?? [];
                  const approvedRows = approvedByProject[projectKey] ?? [];

                  // Build ONE row per currently-allowed UID, enriched from approved request info if available
                  const rows: ApprovedUserRow[] = allowedUids.map((uid) => {
                    const match = approvedRows.find((x) => x.uid === uid);
                    return {
                      uid,
                      email: match?.email ?? null,
                      displayName: match?.displayName ?? null,
                    };
                  });

                  return (
                    <Paper key={projectKey} variant="outlined" sx={{ p: 1.5, borderRadius: 2 }}>
                      <Stack spacing={1}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                          <Stack spacing={0.25}>
                            <Typography sx={{ fontWeight: 700 }}>{projectKey}</Typography>
                            <Typography variant="caption" color="text.secondary">
                              enabled: {String(a.enabled ?? true)} · reviewers: {rows.length}
                            </Typography>
                          </Stack>

                          <Stack direction="row" spacing={1} alignItems="center">
                            <Typography variant="caption" color="text.secondary">
                              Enabled
                            </Typography>
                            <Switch
                              checked={a.enabled !== false}
                              onChange={(e) => toggleEnabled(projectKey, e.target.checked)}
                            />
                          </Stack>
                        </Stack>

                        {rows.length === 0 ? (
                          <Typography variant="body2" color="text.secondary">
                            No approved reviewers currently allowed.
                          </Typography>
                        ) : (
                          <Stack spacing={1}>
                            {rows.map((u) => (
                              <Stack
                                key={u.uid}
                                direction={{ xs: "column", md: "row" }}
                                spacing={1}
                                alignItems={{ xs: "flex-start", md: "center" }}
                                justifyContent="space-between"
                                sx={{
                                  p: 1,
                                  borderRadius: 1,
                                  bgcolor: "rgba(0,0,0,0.02)",
                                }}
                              >
                                <Stack spacing={0.25}>
                                  <Typography variant="body2" sx={{ fontWeight: 700 }}>
                                    {u.displayName ?? "Reviewer"}
                                  </Typography>
                                  <Typography variant="body2" color="text.secondary">
                                    {u.email ?? "(no email on file)"}
                                  </Typography>
                                  <Typography variant="caption" color="text.secondary">
                                    uid: {u.uid}
                                  </Typography>
                                </Stack>

                                <Button
                                  size="small"
                                  color="error"
                                  variant="outlined"
                                  onClick={() => revokeAccess(projectKey, u.uid, u.email ?? undefined)}
                                >
                                  Revoke access
                                </Button>
                              </Stack>
                            ))}
                          </Stack>
                        )}
                      </Stack>
                    </Paper>
                  );
                })}
              </Stack>
            )}
          </Stack>
        </Paper>

        {/* Manual add */}
        <Paper sx={{ p: 2, borderRadius: 2 }}>
          <Stack spacing={1.25}>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Manual approve (UID + email)
            </Typography>

            <Stack direction={{ xs: "column", md: "row" }} spacing={1}>
              <TextField
                label="Project key (e.g. project_4)"
                value={manualProjectKey}
                onChange={(e) => setManualProjectKey(e.target.value)}
                fullWidth
              />
              <TextField
                label="UID (optional)"
                value={manualUid}
                onChange={(e) => setManualUid(e.target.value)}
                fullWidth
              />
              <TextField
                label="Email (optional)"
                value={manualEmail}
                onChange={(e) => setManualEmail(e.target.value)}
                fullWidth
              />
              <Button variant="contained" onClick={manualAdd} sx={{ whiteSpace: "nowrap" }}>
                Add
              </Button>
            </Stack>

            <Typography variant="caption" color="text.secondary">
              Tip: approving a request automatically adds BOTH UID + email (if available).
            </Typography>
          </Stack>
        </Paper>
      </Stack>
    </Box>
  );
}
