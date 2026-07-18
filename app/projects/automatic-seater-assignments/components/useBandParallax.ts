"use client";

import { useEffect, useRef } from "react";

type UseBandParallaxOptions = {
  /** Multiplier on `-bandRect.top` (higher = more movement). */
  factor: number;
  /** Optional hard cap in px so motion stays to “a few pixels”. */
  maxPx?: number;
};

/**
 * Subtle scroll parallax relative to the nearest positioned band parent.
 * No-ops when `prefers-reduced-motion: reduce`.
 */
export function useBandParallax<T extends HTMLElement>({
  factor,
  maxPx,
}: UseBandParallaxOptions) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionQuery.matches) return;

    const band = el.parentElement;
    if (!band) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = band.getBoundingClientRect();
      let offsetY = -rect.top * factor;
      if (typeof maxPx === "number") {
        offsetY = Math.max(-maxPx, Math.min(maxPx, offsetY));
      }
      el.style.transform = `translate3d(0, ${offsetY}px, 0)`;
    };

    const onScrollOrResize = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
      el.style.transform = "";
    };
  }, [factor, maxPx]);

  return ref;
}
