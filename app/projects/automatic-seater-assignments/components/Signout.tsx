"use client";

import React from "react";
import Button from "@mui/material/Button";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase";

export default function TestSignOutButton() {
  const handleSignOut = async () => {
    try {
      // 1️⃣ Delete server session cookie
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (e) {
      console.error("Server logout failed", e);
    }

    // 2️⃣ Sign out Firebase client
    await signOut(auth);

    // 3️⃣ Hard refresh to fully reset state
    window.location.reload();
  };

  return (
    <Button
      variant="outlined"
      color="error"
      onClick={handleSignOut}
      sx={{ mt: 2 }}
    >
      Sign Out (Test)
    </Button>
  );
}
