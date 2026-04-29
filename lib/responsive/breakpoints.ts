/**
 * Layout breakpoints (px) — mirrors `styles/variables.scss`:
 *
 * | field       | SCSS variable   |
 * |------------|-----------------|
 * | mobileMin  | $mobile-min     |
 * | mobileMax  | $mobile-max     |
 * | tabletMin  | $tablet-min     |
 * | tabletMax  | $tablet-max     |
 * | desktopMin | $desktop-min    |
 * | desktopMax | $desktop-max    |
 *
 * When you change the SCSS values, update this object to match.
 */
export const breakpointPx = {
  mobileMin: 360,
  mobileMax: 767,
  tabletMin: 768,
  tabletMax: 1023,
  desktopMin: 1024,
  desktopMax: 3800,
} as const;

export type BreakpointPx = typeof breakpointPx;
