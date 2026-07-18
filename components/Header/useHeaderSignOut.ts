"use client";

import { useCallback, useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";

import { auth } from "@/firebase";
import {
  notifyPortfolioAccessChanged,
  PORTFOLIO_ACCESS_CHANGED_EVENT,
} from "@/lib/auth/portfolioAccessEvents";

export { notifyPortfolioAccessChanged } from "@/lib/auth/portfolioAccessEvents";

/**
 * True when the visitor has a Firebase session and/or a portfolio access-code
 * session — used to show Sign out in the global header.
 */
export function useHeaderSignOutVisibility() {
  const [firebaseSignedIn, setFirebaseSignedIn] = useState(false);
  const [accessCodeActive, setAccessCodeActive] = useState(false);
  const [ready, setReady] = useState(false);

  const refreshAccessCodeSession = useCallback(async () => {
    try {
      const res = await fetch("/api/access/portfolio-session", {
        credentials: "include",
        cache: "no-store",
      });
      const data = (await res.json().catch(() => null)) as {
        active?: boolean;
      } | null;
      setAccessCodeActive(Boolean(data?.active));
    } catch {
      setAccessCodeActive(false);
    }
  }, []);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setFirebaseSignedIn(Boolean(user));
      setReady(true);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    void refreshAccessCodeSession();

    const onAccessChanged = () => {
      void refreshAccessCodeSession();
    };

    window.addEventListener(PORTFOLIO_ACCESS_CHANGED_EVENT, onAccessChanged);
    // Back/forward cache or tab focus can leave a stale header state.
    window.addEventListener("focus", onAccessChanged);
    return () => {
      window.removeEventListener(PORTFOLIO_ACCESS_CHANGED_EVENT, onAccessChanged);
      window.removeEventListener("focus", onAccessChanged);
    };
  }, [refreshAccessCodeSession]);

  return {
    ready,
    showSignOut: firebaseSignedIn || accessCodeActive,
  };
}

export async function signOutEverywhere() {
  try {
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });
  } catch {
    // continue
  }

  try {
    await fetch("/api/access/clear-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({}),
    });
  } catch {
    // continue
  }

  notifyPortfolioAccessChanged();

  try {
    await signOut(auth);
  } catch {
    // continue
  }

  window.location.reload();
}
