"use client";

import { useEffect, useState } from "react";
import { auth } from "@/firebase";

type UseSignedMediaUrlOptions = {
  /** When false, skips the signed-url request (e.g. public projects use direct Storage URLs). */
  enabled?: boolean;
};

/**
 * Fetches a time-limited signed URL for a gated Storage object (same endpoint as `GatedImage`).
 */
export function useSignedMediaUrl(
  projectKey: string,
  objectPath: string,
  options?: UseSignedMediaUrlOptions,
) {
  const enabled = options?.enabled ?? true;
  const [url, setUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    setError(null);
    setUrl(null);

    if (!enabled) {
      return () => {
        alive = false;
      };
    }

    (async () => {
      const idToken = await auth.currentUser?.getIdToken().catch(() => undefined);
      const res = await fetch("/api/media/signed-url", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(idToken ? { Authorization: `Bearer ${idToken}` } : {}),
        },
        credentials: "include",
        body: JSON.stringify({ projectKey, objectPath }),
      });

      const data = await res.json().catch(() => null);
      if (!alive) return;

      if (!res.ok || !data?.url) {
        setError(
          (typeof data?.message === "string" && data.message) ||
            (typeof data?.reason === "string" && data.reason) ||
            `signed-url failed (${res.status})`,
        );
        return;
      }

      setUrl(data.url as string);
    })().catch((e: unknown) => {
      if (!alive) return;
      setError(e instanceof Error ? e.message : "Failed to load image.");
    });

    return () => {
      alive = false;
    };
  }, [projectKey, objectPath, enabled]);

  return { url, error };
}
