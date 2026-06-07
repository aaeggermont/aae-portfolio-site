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
  anchorPlacement?: string;
};

function buildAosProps(effect: AosEffect, options: AosOptions = {}) {
  const {
    delay,
    duration = 1000,
    once = false,
    anchorPlacement = "top-bottom",
  } = options;

  return {
    "data-aos": effect,
    "data-aos-duration": String(duration),
    "data-aos-anchor-placement": anchorPlacement,
    ...(once ? { "data-aos-once": "true" } : {}),
    ...(delay ? { "data-aos-delay": String(delay) } : {}),
  } as const;
}

export const aosFadeUp = (options?: AosOptions) => buildAosProps("fade-up", options);
export const aosFadeLeft = (options?: AosOptions) => buildAosProps("fade-left", options);
export const aosFadeRight = (options?: AosOptions) => buildAosProps("fade-right", options);
export const aosZoomIn = (options?: AosOptions) => buildAosProps("zoom-in", options);
