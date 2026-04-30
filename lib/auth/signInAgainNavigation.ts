"use client";

import { signOut, type Auth } from "firebase/auth";

/**
 * Clears the httpOnly session cookie, signs out of Firebase (fire-and-forget),
 * then hard-navigates to the current URL so App Router client state resets and gated UIs remount.
 */
export async function signOutSessionAndReloadForSignIn(auth: Auth) {
  try {
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });
  } catch {
    // Network / server errors — still attempt client navigation + Firebase sign-out.
  }

  void signOut(auth).catch(() => {});

  const target =
    `${window.location.pathname}${window.location.search}${window.location.hash}` || "/";
  window.location.assign(target);
}
