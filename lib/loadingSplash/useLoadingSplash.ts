"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { LandingSplashPhase } from "@/components/LandingSplash/LandingSplash";

export type LoadingSplashPhase = "loading" | "fading" | "done";

const DEFAULT_MIN_SPLASH_MS = 880;
const DEFAULT_TIMEOUT_MS = 10_000;

type UseLoadingSplashOptions = {
  /** Route-specific readiness (Firestore, hero preloads, etc.). */
  waitFor: () => Promise<void>;
  minDurationMs?: number;
  /** Max wait before fading in anyway (avoids a stuck splash). */
  timeoutMs?: number;
  /** Called when `waitFor` rejects; splash stays up and does not fade. */
  onError?: (error: unknown) => void;
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
  timeoutMs = DEFAULT_TIMEOUT_MS,
  onError,
}: UseLoadingSplashOptions) {
  const [phase, setPhase] = useState<LoadingSplashPhase>("loading");
  const waitForRef = useRef(waitFor);
  waitForRef.current = waitFor;
  const onErrorRef = useRef(onError);
  onErrorRef.current = onError;

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
        await Promise.race([
          Promise.all([
            waitForRef.current(),
            document.fonts.ready,
            delay(minDurationMs),
          ]),
          delay(timeoutMs),
        ]);
      } catch (err) {
        onErrorRef.current?.(err);
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
  }, [minDurationMs, timeoutMs]);

  const splashPhase: LandingSplashPhase = phase === "fading" ? "fading" : "loading";

  return {
    phase,
    isLocked: phase !== "done",
    splashPhase,
    onFadeEnd: () => setPhase("done"),
  };
}
