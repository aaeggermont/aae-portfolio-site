const AOS_ENABLED = true;

export type AosEffect =
  | "fade-up"
  | "fade-down"
  | "fade-left"
  | "fade-right"
  | "zoom-in"
  | "fade-in";

type AosOptions = {
  delay?: number;
  duration?: number;
  once?: boolean;
  /** px — higher = must scroll further before the animation starts. */
  offset?: number;
  anchorPlacement?: string;
};

function buildAosProps(effect: AosEffect, options: AosOptions = {}) {
  if (!AOS_ENABLED) {
    return {};
  }

  const {
    delay,
    duration = 1000,
    once = false,
    offset,
    anchorPlacement = "top-bottom",
  } = options;

  return {
    "data-aos": effect,
    "data-aos-duration": String(duration),
    "data-aos-anchor-placement": anchorPlacement,
    ...(once ? { "data-aos-once": "true" } : {}),
    ...(delay ? { "data-aos-delay": String(delay) } : {}),
    ...(typeof offset === "number" ? { "data-aos-offset": String(offset) } : {}),
  } as const;
}

export const aosFadeUp = (options?: AosOptions) => buildAosProps("fade-up", options);
export const aosFadeLeft = (options?: AosOptions) => buildAosProps("fade-left", options);
export const aosFadeRight = (options?: AosOptions) => buildAosProps("fade-right", options);
export const aosZoomIn = (options?: AosOptions) => buildAosProps("zoom-in", options);

/**
 * Cards below Overview — stricter trigger so they animate on scroll, not during
 * hero/splash layout. Prefer this over Overview (which sits too close to first paint).
 */
export function aosIntroFadeUp(options?: AosOptions) {
  return buildAosProps("fade-up", {
    once: true,
    duration: 900,
    offset: 160,
    anchorPlacement: "top-bottom",
    ...options,
  });
}
