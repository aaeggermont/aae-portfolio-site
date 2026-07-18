"use client";

import { signOut, type Auth } from "firebase/auth";

/**
 * Clears the httpOnly session cookie, optionally clears a project access-code
 * session, signs out of Firebase (fire-and-forget), then hard-navigates so gated UIs remount.
 */
export async function signOutSessionAndReloadForSignIn(
  auth: Auth,
  projectKey?: string,
) {
  try {
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });
  } catch {
    // Network / server errors — still attempt client navigation + Firebase sign-out.
  }

  if (projectKey) {
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
  }

  void signOut(auth).catch(() => {});

  const target =
    `${window.location.pathname}${window.location.search}${window.location.hash}` || "/";
  window.location.assign(target);
}
