"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { LandingSplashPhase } from "@/components/LandingSplash/LandingSplash";

export type LoadingSplashPhase = "loading" | "fading" | "done";

const DEFAULT_MIN_SPLASH_MS = 880;

type UseLoadingSplashOptions = {
  /** Route-specific readiness (Firestore, hero preloads, etc.). */
  waitFor: () => Promise<void>;
  minDurationMs?: number;
};

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Orchestrates splash phases: loading → fading → done.
 * Also waits for `document.fonts.ready` and a minimum visible duration.
 */
export function useLoadingSplash({
  waitFor,
  minDurationMs = DEFAULT_MIN_SPLASH_MS,
}: UseLoadingSplashOptions) {
  const [phase, setPhase] = useState<LoadingSplashPhase>("loading");
  const waitForRef = useRef(waitFor);
  waitForRef.current = waitFor;

  useLayoutEffect(() => {
    if (phase === "done") {
      document.body.style.overflow = "";
      return;
    }
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [phase]);

  useEffect(() => {
    let cancelled = false;

    void (async () => {
      try {
        await Promise.all([
          waitForRef.current(),
          document.fonts.ready,
          delay(minDurationMs),
        ]);
      } catch {
        return;
      } finally {
        if (cancelled) return;
        requestAnimationFrame(() => {
          if (!cancelled) {
            setPhase("fading");
          }
        });
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [minDurationMs]);

  const splashPhase: LandingSplashPhase = phase === "fading" ? "fading" : "loading";

  return {
    phase,
    isLocked: phase !== "done",
    splashPhase,
    onFadeEnd: () => setPhase("done"),
  };
}
