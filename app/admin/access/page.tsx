// app/admin/access/page.tsx
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
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

type AccessRequest = {
  id: string;
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
  projectId: number;
  projectKey: string;
  slug?: string;
  title?: string;
  enabled?: boolean;
  allowedUids?: string[];
  allowedEmails?: string[];
  updatedAt?: any;
  updatedBy?: string;
};

function normalizeEmail(email?: string | null) {
  return (email ?? "").trim().toLowerCase();
}

function uniq(arr: string[]) {
  return Array.from(new Set(arr));
}

export default function AdminAccessPage() {
  const [requests, setRequests] = React.useState<AccessRequest[]>([]);
  const [allowlists, setAllowlists] = React.useState<Record<string, AllowlistDoc>>(
    {}
  );

  // quick add panel
  const [manualProjectKey, setManualProjectKey] = React.useState("project_4");
  const [manualUid, setManualUid] = React.useState("");
  const [manualEmail, setManualEmail] = React.useState("");

  React.useEffect(() => {
    // live pending requests
    const qReq = query(
      collection(db, "access_requests"),
      where("status", "==", "pending"),
      orderBy("createdAt", "desc")
    );

    const unsubReq = onSnapshot(qReq, (snap) => {
      const next: AccessRequest[] = snap.docs.map((d) => {
        const data = d.data() as Omit<AccessRequest, "id">;
        return { id: d.id, ...data };
      });
      setRequests(next);
    });

    // live allowlist docs
    const unsubAllow = onSnapshot(collection(db, "access_allowlist"), (snap) => {
      const map: Record<string, AllowlistDoc> = {};
      snap.docs.forEach((d) => {
        map[d.id] = d.data() as AllowlistDoc;
      });
      setAllowlists(map);
    });

    return () => {
      unsubReq();
      unsubAllow();
    };
  }, []);

  const approveRequest = async (req: AccessRequest) => {
    console.info(`Approving access for project=${req.projectKey} uid=${req.uid} email=${req.email}`);
    
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

    await revokeAccess(req.projectKey, req.uid, req.email ?? undefined);
  };


  const revokeAccess = async (projectKey: string, uid?: string, email?: string) => {
    const adminUid = auth.currentUser?.uid ?? "unknown";
    const allowRef = doc(db, "access_allowlist", projectKey);

    const emailNorm = normalizeEmail(email);

    console.info(`Revoking access for project=${projectKey} uid=${uid} email=${emailNorm}`);

    try {
      const payload: Record<string, any> = {
        updatedAt: serverTimestamp(),
        updatedBy: adminUid,
      };

      // atomic removals
      if (uid) payload.allowedUids = arrayRemove(uid);
      if (emailNorm) payload.allowedEmails = arrayRemove(emailNorm);

      await updateDoc(allowRef, payload);
    } catch (e) {
      console.error("Revoke failed:", e);
      alert(`Revoke failed: ${(e as any)?.message ?? e}`);
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
    const nextEmails = email ? uniq([...(existing.allowedEmails ?? []).map(normalizeEmail), email]) : (existing.allowedEmails ?? []).map(normalizeEmail);

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

  return (
    <Box sx={{ p: { xs: 2, md: 3 }, maxWidth: 1100, mx: "auto" }}>
      <Stack spacing={2}>
        <Typography variant="h4" sx={{ fontWeight: 800 }}>
          Admin · Project Access
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Approve/revoke reviewers and control per-project allowlists.
        </Typography>

        <Divider />

        {/* Pending requests */}
        <Paper sx={{ p: 2, borderRadius: 2 }}>
          <Stack spacing={1.5}>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Pending requests
            </Typography>

            {requests.length === 0 ? (
              <Typography variant="body2" color="text.secondary">
                No pending requests.
              </Typography>
            ) : (
              <Stack spacing={1}>
                {requests.map((r) => (
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

        {/* Allowlist management */}
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
                {Object.entries(allowlists).map(([key, a]) => (
                  <Paper key={key} variant="outlined" sx={{ p: 1.5, borderRadius: 2 }}>
                    <Stack spacing={1}>
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Stack spacing={0.25}>
                          <Typography sx={{ fontWeight: 700 }}>{key}</Typography>
                          <Typography variant="caption" color="text.secondary">
                            enabled: {String(a.enabled ?? true)} · uids: {(a.allowedUids ?? []).length} · emails:{" "}
                            {(a.allowedEmails ?? []).length}
                          </Typography>
                        </Stack>

                        <Stack direction="row" spacing={1} alignItems="center">
                          <Typography variant="caption" color="text.secondary">
                            Enabled
                          </Typography>
                          <Switch
                            checked={a.enabled !== false}
                            onChange={(e) => toggleEnabled(key, e.target.checked)}
                          />
                        </Stack>
                      </Stack>

                      {/* chips */}
                      <Stack direction="row" spacing={1} flexWrap="wrap">
                        {(a.allowedEmails ?? []).slice(0, 8).map((em) => (
                          <Chip
                            key={em}
                            label={em}
                            onDelete={() => revokeAccess(key, undefined, em)}
                            size="small"
                          />
                        ))}
                        {(a.allowedUids ?? []).slice(0, 6).map((uid) => (
                          <Chip
                            key={uid}
                            label={`uid:${uid.slice(0, 8)}…`}
                            onDelete={() => revokeAccess(key, uid, undefined)}
                            size="small"
                            variant="outlined"
                          />
                        ))}
                      </Stack>
                    </Stack>
                  </Paper>
                ))}
              </Stack>
            )}
          </Stack>
        </Paper>

        {/* Manual add (useful when reviewer cannot request) */}
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
