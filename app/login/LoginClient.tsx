// app/login/LoginClient.tsx
"use client";

import React from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import "@/firebase"; // ensure firebase init runs once

export default function LoginClient({ nextPath }: { nextPath: string }) {
  const router = useRouter();

  const onLogin = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    const cred = await signInWithPopup(auth, provider);
    const idToken = await cred.user.getIdToken();

    await fetch("/api/auth/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken }),
    });

    router.replace(nextPath);
  };

  return (
    <Box sx={{ maxWidth: 520, mx: "auto", py: 8, px: 2 }}>
      <Typography variant="h4" sx={{ mb: 2, fontWeight: 700 }}>
        Sign in
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        This page is restricted.
      </Typography>

      <Button variant="contained" onClick={onLogin}>
        Sign in with Google
      </Button>
    </Box>
  );
}
