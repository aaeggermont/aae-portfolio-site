"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { getAuth, onAuthStateChanged, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/firebase";

/**
 * Admin gate for /admin routes.
 *
 * Requires:
 *  - Firebase client initialized somewhere (e.g. in firebase.ts / firebase.js)
 *  - Your set-admin script sets custom claim: { admin: true }
 *
 * Notes:
 *  - Custom claims are cached in the ID token. After setting admin claim,
 *    user must sign out/in or you force token refresh (getIdToken(true)).
 */
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const [status, setStatus] = React.useState<"loading" | "authed" | "denied">("loading");
  const [userEmail, setUserEmail] = React.useState<string | null>(null);

  React.useEffect(() => {
    //const auth = getAuth();

    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setUserEmail(null);
        setStatus("denied");
        return;
      }

      setUserEmail(user.email ?? null);

      try {
        // Force-refresh token once to pick up newly-added claims
        const tokenResult = await user.getIdTokenResult(true);
        const isAdmin = tokenResult?.claims?.admin === true;

        setStatus(isAdmin ? "authed" : "denied");
      } catch (e) {
        console.error("Admin check failed:", e);
        setStatus("denied");
      }
    });

    return () => unsub();
  }, []);

  const handleGoogleSignIn = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      // auth listener will re-run and evaluate claims
    } catch (e) {
      console.error("Google sign-in failed:", e);
    }
  };

  const handleGoHome = () => {
    router.push("/");
  };

  if (status === "loading") {
    return (
      <Box sx={{ minHeight: "70vh", display: "grid", placeItems: "center", p: 3 }}>
        <Stack spacing={2} alignItems="center">
          <CircularProgress />
          <Typography variant="body2" color="text.secondary">
            Checking admin access…
          </Typography>
        </Stack>
      </Box>
    );
  }

  if (status === "denied") {
    return (
      <Box sx={{ minHeight: "70vh", display: "grid", placeItems: "center", p: 3 }}>
        <Stack spacing={2} sx={{ maxWidth: 520, width: "100%" }}>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            Admin access required
          </Typography>

          <Typography variant="body2" color="text.secondary">
            This route is restricted. Sign in with an authorized account.
          </Typography>

          {userEmail && (
            <Typography variant="body2" color="text.secondary">
              Signed in as: <strong>{userEmail}</strong>
            </Typography>
          )}

          <Stack direction="row" spacing={1} sx={{ pt: 1, flexWrap: "wrap" }}>
            <Button variant="contained" onClick={handleGoogleSignIn}>
              Sign in with Google
            </Button>
            <Button variant="outlined" onClick={handleGoHome}>
              Back to home
            </Button>
          </Stack>

          <Typography variant="caption" color="text.secondary" sx={{ pt: 1 }}>
            Path: {pathname}
          </Typography>
        </Stack>
      </Box>
    );
  }

  // status === "authed"
  return <>{children}</>;
}
