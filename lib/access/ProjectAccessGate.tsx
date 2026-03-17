"use client";

import React from "react";
import {
  doc,
  getDoc,
  onSnapshot,
  serverTimestamp,
  setDoc,
  collection,
  query,
  where,
  limit,
  getDocs,
} from "firebase/firestore";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  type User,
} from "firebase/auth";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { auth, db } from "@/firebase";
import { ProjectAccessContext } from "./ProjectAccessContext";

type GateProps = {
  projectId: number;
  projectKey: string; // e.g. "project_4"
  title?: string;
  children: React.ReactNode;
};

type AllowlistDoc = {
  enabled?: boolean;
  allowedUids?: string[];
  allowedEmails?: string[];
};

type AccessRequestDoc = {
  projectId: number;
  projectKey: string;
  uid: string;
  email?: string | null;
  displayName?: string | null;
  status: "pending" | "approved" | "rejected";
  createdAt: any;
  resolvedAt?: any;
  resolvedBy?: string | null;
};

function normalizeEmail(email?: string | null) {
  return (email ?? "").trim().toLowerCase();
}

function requestId(projectKey: string, uid: string) {
  return `${projectKey}_${uid}`;
}

export default function ProjectAccessGate({
  projectId,
  projectKey,
  title = "Restricted project",
  children,
}: GateProps) {
  const [user, setUser] = React.useState<User | null>(null);
  const [loading, setLoading] = React.useState(true);

  const [allow, setAllow] = React.useState<AllowlistDoc | null>(null);
  const [allowed, setAllowed] = React.useState(false);

  const [reqStatus, setReqStatus] = React.useState<
    AccessRequestDoc["status"] | null
  >(null);

  const [visibility, setVisibility] = React.useState<"public" | "restricted">(
    "restricted"
  );
  const [visibilityLoading, setVisibilityLoading] = React.useState(true);

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [authBusy, setAuthBusy] = React.useState(false);
  const [msg, setMsg] = React.useState<string | null>(null);

  React.useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
      setMsg(null);
      setReqStatus(null);
    });
    return () => unsub();
  }, []);

  React.useEffect(() => {
    let alive = true;
    setVisibilityLoading(true);

    async function loadVisibility() {
      const q = query(
        collection(db, "projects_data"),
        where("projectKey", "==", projectKey),
        limit(1)
      );

      const snap = await getDocs(q);
      const v = (snap.docs[0]?.data() as any)?.visibility;

      if (!alive) return;

      setVisibility(v === "public" ? "public" : "restricted");
      setVisibilityLoading(false);
    }

    loadVisibility()
      .catch(() => {
        if (!alive) return;
        setVisibility("restricted");
        setVisibilityLoading(false);
      });

    return () => {
      alive = false;
    };
  }, [projectKey]);

  React.useEffect(() => {
    if (visibilityLoading) return;

    if (visibility === "public") {
      setAllow(null);
      setAllowed(true);
      return;
    }

    if (!user) {
      setAllow(null);
      setAllowed(false);
      return;
    }

    const allowRef = doc(db, "access_allowlist", projectKey);
    const unsub = onSnapshot(
      allowRef,
      (snap) => {
        const data = (snap.exists()
          ? (snap.data() as AllowlistDoc)
          : {}) as AllowlistDoc;

        setAllow(data);

        const enabled = data.enabled !== false;
        const uidOk = (data.allowedUids ?? []).includes(user.uid);
        const emailOk = (data.allowedEmails ?? [])
          .map(normalizeEmail)
          .includes(normalizeEmail(user.email));

        setAllowed(enabled && (uidOk || emailOk));
      },
      () => {
        setAllow(null);
        setAllowed(false);
      }
    );

    return () => unsub();
  }, [user, projectKey, visibility, visibilityLoading]);

  React.useEffect(() => {
    if (visibilityLoading) return;
    if (visibility === "public") return;
    if (!user || allowed) return;

    const reqRef = doc(db, "access_requests", requestId(projectKey, user.uid));
    const unsub = onSnapshot(reqRef, (snap) => {
      if (!snap.exists()) {
        setReqStatus(null);
        return;
      }

      const data = snap.data() as AccessRequestDoc;
      setReqStatus(data.status);
    });

    return () => unsub();
  }, [user, allowed, projectKey, visibility, visibilityLoading]);

  async function mintSessionCookie(user: User) {
    const idToken = await user.getIdToken(true);

    const res = await fetch("/api/auth/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken }),
      credentials: "include",
    });

    if (!res.ok) {
      const txt = await res.text().catch(() => "");
      throw new Error(`Failed to create session (${res.status}): ${txt}`);
    }
  }

  const handleGoogle = async () => {
    setAuthBusy(true);
    setMsg(null);

    try {
      const cred = await signInWithPopup(auth, new GoogleAuthProvider());

      if (visibility === "restricted") {
        await mintSessionCookie(cred.user);
      }
    } catch (e: any) {
      setMsg(e?.message ?? "Google sign-in failed.");
    } finally {
      setAuthBusy(false);
    }
  };

  const handleEmailSignIn = async () => {
    setAuthBusy(true);
    setMsg(null);

    try {
      const cred = await signInWithEmailAndPassword(auth, email.trim(), password);

      if (visibility === "restricted") {
        await mintSessionCookie(cred.user);
      }
    } catch (e: any) {
      setMsg(e?.message ?? "Email sign-in failed.");
    } finally {
      setAuthBusy(false);
    }
  };

  const handleEmailCreate = async () => {
    setAuthBusy(true);
    setMsg(null);

    try {
      const cred = await createUserWithEmailAndPassword(auth, email.trim(), password);

      if (visibility === "restricted") {
        await mintSessionCookie(cred.user);
      }
    } catch (e: any) {
      setMsg(e?.message ?? "Account creation failed.");
    } finally {
      setAuthBusy(false);
    }
  };

  const handleReset = async () => {
    setAuthBusy(true);
    setMsg(null);

    try {
      await sendPasswordResetEmail(auth, email.trim());
      setMsg("Password reset email sent.");
    } catch (e: any) {
      setMsg(e?.message ?? "Password reset failed.");
    } finally {
      setAuthBusy(false);
    }
  };

  const handleRequestAccess = async () => {
    if (!user) return;

    setMsg(null);

    const reqRef = doc(db, "access_requests", requestId(projectKey, user.uid));
    const snap = await getDoc(reqRef);

    if (snap.exists()) return;

    const payload: AccessRequestDoc = {
      projectId,
      projectKey,
      uid: user.uid,
      email: user.email ?? null,
      displayName: user.displayName ?? null,
      status: "pending",
      createdAt: serverTimestamp(),
    };

    await setDoc(reqRef, payload, { merge: true });
  };

  const handleSignOut = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch {}

    await signOut(auth);
    window.location.reload();
  };

  if (loading || visibilityLoading) {
    return (
      <Box sx={{ minHeight: "60vh", display: "grid", placeItems: "center" }}>
        <Stack spacing={2} alignItems="center">
          <CircularProgress />
          <Typography variant="body2" color="text.secondary">
            Checking access…
          </Typography>
        </Stack>
      </Box>
    );
  }

  if (visibility === "public") {
    return (
      <ProjectAccessContext.Provider value={{ projectKey, visibility }}>
        {children}
      </ProjectAccessContext.Provider>
    );
  }

  if (user && allowed) {
    return (
      <ProjectAccessContext.Provider value={{ projectKey, visibility }}>
        {children}
      </ProjectAccessContext.Provider>
    );
  }

  return (
    <Box sx={{ maxWidth: 720, mx: "auto", py: { xs: 5, md: 8 }, px: 2 }}>
      <Paper sx={{ p: { xs: 2, md: 3 }, borderRadius: 2 }}>
        <Stack spacing={2}>
          <Typography variant="h4" sx={{ fontWeight: 800 }}>
            {title}
          </Typography>

          <Typography color="text.secondary">
            This page is restricted.
          </Typography>

          <Divider />

          {!user ? (
            <Stack spacing={2}>
              <Button
                variant="contained"
                onClick={handleGoogle}
                disabled={authBusy}
              >
                Sign in with Google
              </Button>

              <Divider>or</Divider>

              <Stack spacing={1.25}>
                <TextField
                  label="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
                <TextField
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                />

                <Stack direction="row" spacing={1} flexWrap="wrap">
                  <Button
                    variant="contained"
                    onClick={handleEmailSignIn}
                    disabled={authBusy}
                  >
                    Sign in
                  </Button>

                  <Button
                    variant="outlined"
                    onClick={handleEmailCreate}
                    disabled={authBusy}
                  >
                    Create account
                  </Button>

                  <Button
                    variant="text"
                    onClick={handleReset}
                    disabled={authBusy || !email.trim()}
                  >
                    Forgot password
                  </Button>
                </Stack>
              </Stack>

              {msg && (
                <Typography variant="body2" color="error">
                  {msg}
                </Typography>
              )}
            </Stack>
          ) : (
            <Stack spacing={1.5}>
              <Typography variant="body2" color="text.secondary">
                Signed in as <strong>{user.email ?? user.uid}</strong>
              </Typography>

              <Stack direction="row" spacing={1} flexWrap="wrap">
                <Button variant="outlined" onClick={handleSignOut}>
                  Sign out
                </Button>

                <Button
                  variant="contained"
                  onClick={handleRequestAccess}
                  disabled={reqStatus === "pending" || reqStatus === "approved"}
                >
                  {reqStatus === "pending"
                    ? "Request sent"
                    : reqStatus === "rejected"
                    ? "Request rejected"
                    : reqStatus === "approved"
                    ? "Approved (refresh)"
                    : "Request access"}
                </Button>
              </Stack>

              {reqStatus === "pending" && (
                <Typography variant="body2" color="text.secondary">
                  Your request is pending approval. Once approved, refresh this
                  page.
                </Typography>
              )}

              {reqStatus === "rejected" && (
                <Typography variant="body2" color="error">
                  Your request was rejected. Contact the site owner if this is a
                  mistake.
                </Typography>
              )}

              <Typography variant="caption" color="text.secondary">
                Allowlist enabled: {String(allow?.enabled !== false)} ·
                projectKey: {projectKey}
              </Typography>
            </Stack>
          )}
        </Stack>
      </Paper>
    </Box>
  );
}
