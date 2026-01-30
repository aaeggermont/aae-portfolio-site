"use client";

import React from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter, useSearchParams } from "next/navigation";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import "@/firebase"; // ensure your firebase client init runs once

export default function LoginPage() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") ?? "/";

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

    router.replace(next);
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
