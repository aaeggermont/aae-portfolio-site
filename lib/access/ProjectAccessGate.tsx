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
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  type User,
} from "firebase/auth";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Divider from "@mui/material/Divider";
import LinearProgress from "@mui/material/LinearProgress";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { auth, db } from "@/firebase";
import SessionAccessDialog from "@/lib/access/SessionAccessDialog";
import { notifyPortfolioAccessChanged } from "@/lib/auth/portfolioAccessEvents";
import { signOutSessionAndReloadForSignIn } from "@/lib/auth/signInAgainNavigation";
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
  createdAt: unknown;
  resolvedAt?: unknown;
  resolvedBy?: string | null;
};

function normalizeEmail(email?: string | null) {
  return (email ?? "").trim().toLowerCase();
}

function requestId(projectKey: string, uid: string) {
  return `${projectKey}_${uid}`;
}

/** Default: 24 hours. Override with `SESSION_SILENT_REFRESH_INTERVAL_MS` (see next.config.ts env). */
function getSilentRefreshIntervalMs(): number {
  const DEFAULT_MS = 24 * 60 * 60 * 1000;
  const raw = process.env.SESSION_SILENT_REFRESH_INTERVAL_MS;
  if (raw === undefined || raw === "") return DEFAULT_MS;
  const n = Number(raw);
  return Number.isFinite(n) && n > 0 ? n : DEFAULT_MS;
}

export default function ProjectAccessGate({
  projectId,
  projectKey,
  title = "Restricted project",
  children,
}: GateProps) {
  const [user, setUser] = React.useState<User | null>(null);
  const [loading, setLoading] = React.useState(true);

  const [allowed, setAllowed] = React.useState(false);
  const [accessCodeAllowed, setAccessCodeAllowed] = React.useState(false);
  const [accessCodeStatusReady, setAccessCodeStatusReady] = React.useState(false);

  const [reqStatus, setReqStatus] = React.useState<
    AccessRequestDoc["status"] | null
  >(null);

  const [visibility, setVisibility] = React.useState<"public" | "restricted">(
    "restricted",
  );
  const [visibilityLoading, setVisibilityLoading] = React.useState(true);
  /** False until first allowlist snapshot (or error) when restricted + signed in. */
  const [allowlistReady, setAllowlistReady] = React.useState(false);

  const [accessCode, setAccessCode] = React.useState("");
  const [authBusy, setAuthBusy] = React.useState(false);
  const [msg, setMsg] = React.useState<string | null>(null);
  const [sessionHardExpired, setSessionHardExpired] = React.useState(false);

  const refreshAccessCodeStatus = React.useCallback(async () => {
    try {
      const res = await fetch(
        `/api/access/session-status?projectKey=${encodeURIComponent(projectKey)}`,
        { credentials: "include" },
      );
      const data = (await res.json().catch(() => null)) as {
        allowed?: boolean;
        via?: string;
        visibility?: "public" | "restricted";
      } | null;

      if (data?.visibility === "public" || data?.visibility === "restricted") {
        setVisibility(data.visibility);
        setVisibilityLoading(false);
      }

      setAccessCodeAllowed(Boolean(data?.allowed && data?.via === "access_code"));
    } catch {
      setAccessCodeAllowed(false);
    } finally {
      setAccessCodeStatusReady(true);
    }
  }, [projectKey]);

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
    void refreshAccessCodeStatus();
  }, [refreshAccessCodeStatus]);

  React.useEffect(() => {
    let alive = true;
    setVisibilityLoading(true);

    async function loadVisibility() {
      const q = query(
        collection(db, "projects_data"),
        where("projectKey", "==", projectKey),
        limit(1),
      );

      const snap = await getDocs(q);
      const v = (snap.docs[0]?.data() as { visibility?: string } | undefined)
        ?.visibility;

      if (!alive) return;

      setVisibility(v === "public" ? "public" : "restricted");
      setVisibilityLoading(false);
    }

    loadVisibility().catch(() => {
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
      setAllowed(true);
      setAllowlistReady(true);
      return;
    }

    if (!user) {
      setAllowed(false);
      setAllowlistReady(true);
      return;
    }

    setAllowlistReady(false);

    const allowRef = doc(db, "access_allowlist", projectKey);
    const unsub = onSnapshot(
      allowRef,
      (snap) => {
        const data = (
          snap.exists() ? (snap.data() as AllowlistDoc) : {}
        ) as AllowlistDoc;

        const enabled = data.enabled !== false;
        const uidOk = (data.allowedUids ?? []).includes(user.uid);
        const emailOk = (data.allowedEmails ?? [])
          .map(normalizeEmail)
          .includes(normalizeEmail(user.email));

        setAllowed(enabled && (uidOk || emailOk));
        setAllowlistReady(true);
      },
      () => {
        setAllowed(false);
        setAllowlistReady(true);
      },
    );

    return () => unsub();
  }, [user, projectKey, visibility, visibilityLoading]);

  React.useEffect(() => {
    if (visibilityLoading) return;
    if (visibility === "public") return;
    if (!user || allowed || accessCodeAllowed) return;

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
  }, [
    user,
    allowed,
    accessCodeAllowed,
    projectKey,
    visibility,
    visibilityLoading,
  ]);

  React.useEffect(() => {
    if (visibilityLoading) return;
    if (visibility !== "restricted" || !user || sessionHardExpired) return;
    if (accessCodeAllowed) return;

    const signedInUser = user;
    const refreshEveryMs = getSilentRefreshIntervalMs();
    let cancelled = false;

    async function refreshServerSessionWithReasonHandling() {
      try {
        const idToken = await signedInUser.getIdToken(true);
        const res = await fetch("/api/auth/session/refresh", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ idToken, projectKey }),
          credentials: "include",
        });

        if (!res.ok) {
          const payload = (await res.json().catch(() => null)) as
            | { reason?: string }
            | null;
          if (payload?.reason === "session_hard_expired") {
            setSessionHardExpired(true);
          }
        }
      } catch {
        // Transient network/auth errors — next interval or tab focus will retry.
      }
    }

    void refreshServerSessionWithReasonHandling();

    const intervalId = window.setInterval(() => {
      if (!cancelled) void refreshServerSessionWithReasonHandling();
    }, refreshEveryMs);

    const onVisibility = () => {
      if (cancelled || document.visibilityState !== "visible") return;
      void refreshServerSessionWithReasonHandling();
    };

    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelled = true;
      window.clearInterval(intervalId);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [
    user,
    visibility,
    visibilityLoading,
    sessionHardExpired,
    projectKey,
    accessCodeAllowed,
  ]);

  const handleSessionDialogSignInAgain = React.useCallback(() => {
    void signOutSessionAndReloadForSignIn(auth, projectKey);
  }, [projectKey]);

  async function mintSessionCookie(nextUser: User) {
    const idToken = await nextUser.getIdToken(true);

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
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Google sign-in failed.";
      setMsg(message);
    } finally {
      setAuthBusy(false);
    }
  };

  const handleRedeemAccessCode = async () => {
    setAuthBusy(true);
    setMsg(null);

    try {
      const res = await fetch("/api/access/redeem-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ projectKey, code: accessCode }),
      });

      const data = (await res.json().catch(() => null)) as {
        ok?: boolean;
        reason?: string;
      } | null;

      if (!res.ok || !data?.ok) {
        const reason = data?.reason;
        if (reason === "invalid_code") setMsg("That access code is not valid.");
        else if (reason === "code_expired") setMsg("That access code has expired.");
        else if (reason === "code_disabled" || reason === "code_revoked")
          setMsg("That access code has been revoked.");
        else if (reason === "code_exhausted")
          setMsg("That access code has reached its use limit.");
        else if (reason === "rate_limited")
          setMsg("Too many attempts. Please try again later.");
        else setMsg("Could not redeem access code. Please try again.");
        return;
      }

      setAccessCodeAllowed(true);
      setAccessCode("");
      notifyPortfolioAccessChanged();
    } catch {
      setMsg("Could not redeem access code. Please try again.");
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
    } catch {
      // ignore
    }

    try {
      await fetch("/api/access/clear-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ projectKey }),
      });
    } catch {
      // ignore
    }

    await signOut(auth);
    window.location.reload();
  };

  const accessPending =
    visibility === "restricted" &&
    !!user &&
    !allowlistReady &&
    !accessCodeAllowed;

  const gateReady = accessCodeStatusReady && !visibilityLoading;

  const sessionDialog = (
    <SessionAccessDialog
      open={sessionHardExpired}
      reason="session_hard_expired"
      onSignInAgain={handleSessionDialogSignInAgain}
    />
  );

  if (loading || !gateReady || accessPending) {
    const verifyingOnly = accessPending && !loading && gateReady;

    return (
      <>
        {sessionDialog}
        <Box
          sx={{
            flex: 1,
            display: "grid",
            placeItems: "center",
            px: 2,
            minHeight: { xs: "40vh", md: "50vh" },
          }}
        >
          <Stack spacing={2} alignItems="center" sx={{ width: "100%", maxWidth: 360 }}>
            <CircularProgress />
            <Typography variant="body2" color="text.secondary" textAlign="center">
              {verifyingOnly ? "Verifying access…" : "Checking access…"}
            </Typography>
            {verifyingOnly ? (
              <LinearProgress sx={{ width: "100%", borderRadius: 1 }} />
            ) : null}
          </Stack>
        </Box>
      </>
    );
  }

  if (visibility === "public" || (user && allowed) || accessCodeAllowed) {
    return (
      <>
        {sessionDialog}
        <ProjectAccessContext.Provider value={{ projectKey, visibility }}>
          {children}
        </ProjectAccessContext.Provider>
      </>
    );
  }

  return (
    <>
      {sessionDialog}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          maxWidth: 720,
          width: "100%",
          mx: "auto",
          py: { xs: 5, md: 8 },
          px: 2,
          boxSizing: "border-box",
        }}
      >
        <Paper sx={{ p: { xs: 2, md: 3 }, borderRadius: 2 }}>
          <Stack spacing={2}>
            <Typography variant="h4" sx={{ fontWeight: 800 }}>
              {title}
            </Typography>

            <Typography color="text.secondary">This page is restricted.</Typography>

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

                <Typography variant="body2" color="text.secondary">
                  Have an access code from a job application or invite?
                </Typography>

                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={1}
                  alignItems={{ sm: "flex-start" }}
                >
                  <TextField
                    label="Access code"
                    value={accessCode}
                    onChange={(e) =>
                      setAccessCode(e.target.value.replace(/\D/g, "").slice(0, 6))
                    }
                    inputProps={{
                      inputMode: "numeric",
                      pattern: "[0-9]*",
                      maxLength: 6,
                      autoComplete: "one-time-code",
                    }}
                    placeholder="6-digit code"
                    sx={{ flex: 1 }}
                  />
                  <Button
                    variant="outlined"
                    onClick={handleRedeemAccessCode}
                    disabled={authBusy || accessCode.length !== 6}
                    sx={{ whiteSpace: "nowrap", minHeight: 56 }}
                  >
                    Enter code
                  </Button>
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

                <Divider>or use an access code</Divider>

                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={1}
                  alignItems={{ sm: "flex-start" }}
                >
                  <TextField
                    label="Access code"
                    value={accessCode}
                    onChange={(e) =>
                      setAccessCode(e.target.value.replace(/\D/g, "").slice(0, 6))
                    }
                    inputProps={{
                      inputMode: "numeric",
                      pattern: "[0-9]*",
                      maxLength: 6,
                      autoComplete: "one-time-code",
                    }}
                    placeholder="6-digit code"
                    sx={{ flex: 1 }}
                  />
                  <Button
                    variant="outlined"
                    onClick={handleRedeemAccessCode}
                    disabled={authBusy || accessCode.length !== 6}
                    sx={{ whiteSpace: "nowrap", minHeight: 56 }}
                  >
                    Enter code
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

                {msg && (
                  <Typography variant="body2" color="error">
                    {msg}
                  </Typography>
                )}
              </Stack>
            )}
          </Stack>
        </Paper>
      </Box>
    </>
  );
}
