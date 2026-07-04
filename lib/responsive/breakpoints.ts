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
 * Header nav uses a narrower desktop layout band: 1024px–1260px
 * (`home-layout.scss` → `$header-desktop-min` / `$header-desktop-max`).
 * Site-wide `$desktop-max` remains 3800px for other components.
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

/**
 * `@media` strings derived from `breakpointPx` — use in MUI `sx` keys and anywhere the
 * case-study bands must match SCSS (`variables.scss`).
 */
export const breakpointMediaQuery = {
  tabletUp: `@media (min-width: ${breakpointPx.tabletMin}px)`,
  tabletOnly: `@media (min-width: ${breakpointPx.tabletMin}px) and (max-width: ${breakpointPx.tabletMax}px)`,
  desktopUp: `@media (min-width: ${breakpointPx.desktopMin}px)`,
  /** Header horizontal nav layout band — matches `$header-desktop-min` / `$header-desktop-max`. */
  headerDesktopBand: `@media (min-width: ${breakpointPx.desktopMin}px) and (max-width: 1260px)`,
} as const;

export type BreakpointMediaQuery = typeof breakpointMediaQuery;
