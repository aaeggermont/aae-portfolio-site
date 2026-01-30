"use client";

import React from "react";
import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
  type DocumentData,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "@/firebase";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";

type ProjectRow = {
  projectId: number;
  title: string;
  projectLinkV2?: string;
  projectTypeV2?: string;
};

type AllowlistDoc = {
  enabled?: boolean;
  allowedUids?: string[];
  allowedEmails?: string[];
  updatedAt?: any;
  updatedBy?: string;
};

type AllowRow =
  | { kind: "uid"; uid: string }
  | { kind: "email"; email: string };

type RequestRow = {
  id: string;
  projectId: number;
  projectKey: string; // "project_4"
  uid: string;
  email?: string | null;
  displayName?: string | null;
  status: "pending" | "approved" | "rejected";
  createdAt?: any;
};

function normalizeEmail(email?: string | null) {
  return (email ?? "").trim().toLowerCase();
}

function projectKeyFromId(projectId: string | number) {
  return `project_${String(projectId)}`;
}

export default function AdminAccessPanel() {
  const auth = getAuth();
  const adminUid = auth.currentUser?.uid ?? "unknown";

  const [projects, setProjects] = React.useState<ProjectRow[]>([]);
  const [selectedProjectId, setSelectedProjectId] = React.useState<string>("");

  const [allowDoc, setAllowDoc] = React.useState<AllowlistDoc | null>(null);
  const [allowRows, setAllowRows] = React.useState<AllowRow[]>([]);
  const [requests, setRequests] = React.useState<RequestRow[]>([]);

  const [addEmail, setAddEmail] = React.useState("");
  const [busy, setBusy] = React.useState(false);
  const [msg, setMsg] = React.useState<string | null>(null);

  const selectedProjectKey = React.useMemo(
    () => (selectedProjectId ? projectKeyFromId(selectedProjectId) : ""),
    [selectedProjectId]
  );

  // 1) Load projects (projects_data) — only those with projectTypeV2 === "page"
  React.useEffect(() => {
    const qProjects = query(
      collection(db, "projects_data"),
      orderBy("index", "asc")
    );

    const unsub = onSnapshot(qProjects, (snap) => {
      const rows: ProjectRow[] = snap.docs
        .map((d) => d.data() as any)
        .filter((p) => p.projectTypeV2 === "page")
        .map((p) => ({
          projectId: p.projectId,
          title: p.title,
          projectLinkV2: p.projectLinkV2,
          projectTypeV2: p.projectTypeV2,
        }));

      setProjects(rows);

      if (!selectedProjectId && rows.length) {
        setSelectedProjectId(String(rows[0].projectId));
      }
    });

    return () => unsub();
  }, [selectedProjectId]);

  // 2) Load allowlist doc for selected project: access_allowlist/{projectKey}
  React.useEffect(() => {
    if (!selectedProjectKey) {
      setAllowDoc(null);
      setAllowRows([]);
      return;
    }

    const allowRef = doc(db, "access_allowlist", selectedProjectKey);

    const unsub = onSnapshot(
      allowRef,
      (snap) => {
        const data = (snap.exists() ? (snap.data() as AllowlistDoc) : {}) as AllowlistDoc;
        setAllowDoc(data);

        const uids = (data.allowedUids ?? []).filter(Boolean);
        const emails = (data.allowedEmails ?? [])
          .map(normalizeEmail)
          .filter(Boolean);

        const rows: AllowRow[] = [
          ...uids.map((uid) => ({ kind: "uid" as const, uid })),
          ...emails.map((email) => ({ kind: "email" as const, email })),
        ];

        // De-dupe exact duplicates
        const seen = new Set<string>();
        const deduped: AllowRow[] = [];
        for (const r of rows) {
          const key = r.kind === "uid" ? `uid:${r.uid}` : `email:${r.email}`;
          if (seen.has(key)) continue;
          seen.add(key);
          deduped.push(r);
        }

        setAllowRows(deduped);
      },
      () => {
        setAllowDoc(null);
        setAllowRows([]);
      }
    );

    return () => unsub();
  }, [selectedProjectKey]);

  // 3) Load pending requests for selected project
  React.useEffect(() => {
    if (!selectedProjectKey) {
      setRequests([]);
      return;
    }

    const qReq = query(
      collection(db, "access_requests"),
      where("projectKey", "==", selectedProjectKey),
      where("status", "==", "pending"),
      orderBy("createdAt", "desc")
    );

    const unsub = onSnapshot(qReq, (snap) => {
      const rows: RequestRow[] = snap.docs.map((d) => {
        const data = d.data() as DocumentData;
        return {
          id: d.id,
          projectId: Number(data.projectId),
          projectKey: String(data.projectKey),
          uid: String(data.uid),
          email: (data.email ?? null) as string | null,
          displayName: (data.displayName ?? null) as string | null,
          status: data.status as RequestRow["status"],
          createdAt: data.createdAt,
        };
      });
      setRequests(rows);
    });

    return () => unsub();
  }, [selectedProjectKey]);

  // ---- helpers ----

  // ✅ upsert allowlist doc safely (no "updateDoc fails if missing" footgun)
  const upsertAllowlist = async (projectKey: string, patch: Partial<AllowlistDoc>) => {
    const allowRef = doc(db, "access_allowlist", projectKey);
    await setDoc(
      allowRef,
      {
        enabled: true,
        ...patch,
        updatedAt: serverTimestamp(),
        updatedBy: adminUid,
      },
      { merge: true }
    );
  };

  // ✅ revoke BOTH uid + email (because gate is uidOk || emailOk)
  const revokeAccess = async (uid?: string, email?: string | null) => {
    if (!selectedProjectKey) return;

    const emailNorm = normalizeEmail(email);
    const patch: any = {};

    if (uid) patch.allowedUids = arrayRemove(uid);
    if (emailNorm) patch.allowedEmails = arrayRemove(emailNorm);

    await upsertAllowlist(selectedProjectKey, patch);
  };

  // ---- actions ----

  const approveRequest = async (req: RequestRow) => {
    setBusy(true);
    setMsg(null);
    try {
      const emailNorm = normalizeEmail(req.email);

      await upsertAllowlist(req.projectKey, {
        allowedUids: arrayUnion(req.uid),
        ...(emailNorm ? { allowedEmails: arrayUnion(emailNorm) } : {}),
      });

      await updateDoc(doc(db, "access_requests", req.id), {
        status: "approved",
        resolvedAt: serverTimestamp(),
        resolvedBy: adminUid,
      });
    } catch (e: any) {
      setMsg(e?.message ?? "Approve failed.");
    } finally {
      setBusy(false);
    }
  };

  const rejectRequest = async (req: RequestRow) => {
    setBusy(true);
    setMsg(null);
    try {
      // ✅ IMPORTANT: reject should also remove access if it was previously granted
      await revokeAccess(req.uid, req.email);

      await updateDoc(doc(db, "access_requests", req.id), {
        status: "rejected",
        resolvedAt: serverTimestamp(),
        resolvedBy: adminUid,
      });
    } catch (e: any) {
      setMsg(e?.message ?? "Reject failed.");
    } finally {
      setBusy(false);
    }
  };

  const revokeUid = async (uid: string) => {
    setBusy(true);
    setMsg(null);
    try {
      await upsertAllowlist(selectedProjectKey, { allowedUids: arrayRemove(uid) });
    } catch (e: any) {
      setMsg(e?.message ?? "Revoke uid failed.");
    } finally {
      setBusy(false);
    }
  };

  const revokeEmail = async (email: string) => {
    setBusy(true);
    setMsg(null);
    try {
      await upsertAllowlist(selectedProjectKey, {
        allowedEmails: arrayRemove(normalizeEmail(email)),
      });
    } catch (e: any) {
      setMsg(e?.message ?? "Revoke email failed.");
    } finally {
      setBusy(false);
    }
  };

  // Add by email directly (works even if they never requested yet)
  const addEmailToAllowlist = async () => {
    if (!selectedProjectKey) return;

    const emailNorm = normalizeEmail(addEmail);
    if (!emailNorm) return;

    setBusy(true);
    setMsg(null);
    try {
      await upsertAllowlist(selectedProjectKey, {
        allowedEmails: arrayUnion(emailNorm),
      });
      setAddEmail("");
    } catch (e: any) {
      setMsg(e?.message ?? "Add email failed.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <Stack spacing={2}>
      {/* Project selector */}
      <Paper variant="outlined" sx={{ p: 2 }}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={2}
          alignItems="center"
        >
          <Typography sx={{ fontWeight: 700 }}>Project</Typography>

          <Select
            size="small"
            value={selectedProjectId}
            onChange={(e) => setSelectedProjectId(e.target.value)}
            sx={{ minWidth: 320 }}
          >
            {projects.map((p) => (
              <MenuItem key={p.projectId} value={String(p.projectId)}>
                {p.title} (#{p.projectId})
              </MenuItem>
            ))}
          </Select>

          <Box sx={{ flex: 1 }} />

          <Stack direction="row" spacing={1} alignItems="center">
            <TextField
              size="small"
              label="Allow email"
              value={addEmail}
              onChange={(e) => setAddEmail(e.target.value)}
              sx={{ width: 260 }}
            />
            <Button
              variant="outlined"
              onClick={addEmailToAllowlist}
              disabled={busy || !addEmail.trim()}
            >
              Add
            </Button>
          </Stack>
        </Stack>

        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ mt: 1, display: "block" }}
        >
          Doc: access_allowlist/{selectedProjectKey || "—"} · enabled:{" "}
          {String(allowDoc?.enabled !== false)}
        </Typography>

        {msg && (
          <Typography variant="caption" color="error" sx={{ mt: 1, display: "block" }}>
            {msg}
          </Typography>
        )}
      </Paper>

      {/* Allowlist */}
      <Paper variant="outlined" sx={{ p: 2 }}>
        <Typography sx={{ fontWeight: 800, mb: 1 }}>Allowlist</Typography>

        {allowRows.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            No one has access yet.
          </Typography>
        ) : (
          <Stack spacing={1}>
            {allowRows.map((row, idx) => (
              <Stack
                key={`${row.kind}-${row.kind === "uid" ? row.uid : row.email}-${idx}`}
                direction="row"
                spacing={1}
                alignItems="center"
                justifyContent="space-between"
              >
                <Stack direction="row" spacing={1} alignItems="center">
                  {row.kind === "uid" ? (
                    <Chip size="small" label={`uid: ${row.uid.slice(0, 8)}…`} />
                  ) : (
                    <Chip size="small" label={`email: ${row.email}`} />
                  )}
                </Stack>

                {row.kind === "uid" ? (
                  <Button
                    size="small"
                    color="error"
                    variant="outlined"
                    disabled={busy}
                    onClick={() => revokeUid(row.uid)}
                  >
                    Revoke uid
                  </Button>
                ) : (
                  <Button
                    size="small"
                    color="error"
                    variant="outlined"
                    disabled={busy}
                    onClick={() => revokeEmail(row.email)}
                  >
                    Revoke email
                  </Button>
                )}
              </Stack>
            ))}
          </Stack>
        )}
      </Paper>

      {/* Pending Requests */}
      <Paper variant="outlined" sx={{ p: 2 }}>
        <Typography sx={{ fontWeight: 800, mb: 1 }}>
          Pending Access Requests
        </Typography>

        {requests.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            No pending requests.
          </Typography>
        ) : (
          <Stack spacing={1}>
            {requests.map((r) => (
              <Box
                key={r.id}
                sx={{ p: 1.25, borderRadius: 1, bgcolor: "rgba(0,0,0,0.02)" }}
              >
                <Stack
                  direction={{ xs: "column", md: "row" }}
                  spacing={1}
                  alignItems="center"
                >
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 700 }}>
                      {r.displayName ?? "Unknown"}{" "}
                      <Typography
                        component="span"
                        variant="body2"
                        color="text.secondary"
                      >
                        {r.email ?? ""}
                      </Typography>
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {r.projectKey} • uid: {r.uid}
                    </Typography>
                  </Box>

                  <Stack direction="row" spacing={1} flexWrap="wrap">
                    <Button
                      size="small"
                      variant="contained"
                      disabled={busy}
                      onClick={() => approveRequest(r)}
                    >
                      Approve
                    </Button>

                    <Button
                      size="small"
                      variant="outlined"
                      color="error"
                      disabled={busy}
                      onClick={() => rejectRequest(r)}
                    >
                      Reject
                    </Button>

                    {/* ✅ One-click removal of BOTH uid + email */}
                    <Button
                      size="small"
                      variant="text"
                      color="error"
                      disabled={busy}
                      onClick={() => revokeAccess(r.uid, r.email)}
                    >
                      Revoke access
                    </Button>
                  </Stack>
                </Stack>
              </Box>
            ))}
          </Stack>
        )}
      </Paper>

      <Divider />
      <Typography variant="caption" color="text.secondary">
        Note: Your gate uses access_allowlist/{`{projectKey}`} with arrays
        allowedUids/allowedEmails. “Reject” now also removes both uid + email from
        that allowlist so access is actually revoked.
      </Typography>
    </Stack>
  );
}
