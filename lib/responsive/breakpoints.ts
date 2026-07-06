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
 * Header nav tiers (`home-layout.scss`):
 * - mobile: hamburger only (≤767px)
 * - tablet: compact horizontal nav (768–1023px)
 * - desktop: standard horizontal nav (1024px+; fluid type 1024–1260px)
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
  /** Hamburger + slide-out drawer only — matches `$header-mobile-max`. */
  headerMobileOnly: `@media (max-width: ${breakpointPx.mobileMax}px)`,
  /** Compact horizontal nav — matches `$header-tablet-min` / `$header-tablet-max`. */
  headerTabletBand: `@media (min-width: ${breakpointPx.tabletMin}px) and (max-width: ${breakpointPx.tabletMax}px)`,
  /** Horizontal top nav (tablet + desktop) — matches `$header-tablet-min`. */
  headerHorizontalNavUp: `@media (min-width: ${breakpointPx.tabletMin}px)`,
  /** Standard horizontal nav fluid type band — matches `$header-desktop-min` / `$header-desktop-max`. */
  headerDesktopBand: `@media (min-width: ${breakpointPx.desktopMin}px) and (max-width: 1260px)`,
} as const;

export type BreakpointMediaQuery = typeof breakpointMediaQuery;
