"use client";

import { useEffect, useRef, useState } from "react";
import type { SxProps, Theme } from "@mui/material/styles";

type UseScrollRevealOptions = {
  effect?: "fade-up" | "zoom-in";
  /**
   * When false (typical for zoom-in), the block stays visible on first paint
   * so it doesn’t leave empty space under the hero.
   */
  hideUntilReveal?: boolean;
  /** Don't arm the observer until the user has scrolled at least this far. */
  armAfterScrollY?: number;
  rootMargin?: string;
  threshold?: number;
  durationMs?: number;
  translateYPx?: number;
  scaleFrom?: number;
};

/**
 * One-shot scroll reveal. Fade-up can stay hidden until armed; zoom-in can
 * remain visible and only scale up so the layout never collapses to blank space.
 */
export function useScrollReveal<T extends HTMLElement>(
  options: UseScrollRevealOptions = {},
) {
  const {
    effect = "fade-up",
    hideUntilReveal = effect === "fade-up",
    armAfterScrollY = 72,
    rootMargin = "0px 0px -16% 0px",
    threshold = 0.22,
    durationMs = 850,
    translateYPx = 28,
    scaleFrom = 0.92,
  } = options;

  const ref = useRef<T | null>(null);
  const [armed, setArmed] = useState(false);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setArmed(true);
      setRevealed(true);
      return;
    }

    const tryArm = () => {
      if (window.scrollY >= armAfterScrollY) {
        setArmed(true);
        return true;
      }
      return false;
    };

    if (tryArm()) return;

    const onScroll = () => {
      if (tryArm()) {
        window.removeEventListener("scroll", onScroll);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [armAfterScrollY]);

  useEffect(() => {
    if (!armed || revealed) return;
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        requestAnimationFrame(() => {
          requestAnimationFrame(() => setRevealed(true));
        });
        io.disconnect();
      },
      { rootMargin, threshold },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [armed, revealed, rootMargin, threshold]);

  const hiddenTransform =
    effect === "zoom-in"
      ? `scale(${scaleFrom})`
      : `translateY(${translateYPx}px)`;

  const revealSx = {
    opacity: hideUntilReveal ? (revealed ? 1 : 0) : 1,
    transform: revealed ? "none" : hiddenTransform,
    transition: armed
      ? `opacity ${durationMs}ms ease, transform ${durationMs}ms ease`
      : "none",
    willChange: revealed ? "auto" : "opacity, transform",
  } satisfies SxProps<Theme>;

  return { ref, revealSx, revealed, armed };
}
