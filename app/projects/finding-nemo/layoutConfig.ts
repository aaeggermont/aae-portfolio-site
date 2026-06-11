/**
 * Vertical spacing between top-level section children inside `.project-content`.
 *
 * Each value is a CSS length string (any unit: `rem`, `px`, `clamp(...)`, etc.) that
 * applies inside the matching breakpoint defined in `styles/variables.scss`:
 *
 * - `mobile`  -> 360 - 767px
 * - `tablet`  -> 768 - 1023px
 * - `desktop` -> 1024px +
 */
export const SECTION_GAPS = {
  mobile: "3rem",
  tablet: "5rem",
  desktop: "8rem",
} as const;

/**
 * Standardized usable content dimensions for the Finding Nemo case study.
 *
 * `.project-content` enforces these as `max-width` (outer container cap) and
 * horizontal padding (inner side margins). Mobile is intentionally uncapped so
 * the page fills larger phones while keeping 16px side margins.
 */
export const LAYOUT_DIMENSIONS = {
  mobile: { maxWidth: "none", margin: "16px" },
  tablet: { maxWidth: "1024px", margin: "40px" },
  desktop: { maxWidth: "1260px", margin: "80px" },
} as const;

/**
 * Padding for inset panel blocks (rounded grey sections, narrative panels, etc.).
 * Vertical values use the case study breakpoints (`variables.scss`): mobile (<768px),
 * tablet (768–1023px), desktop (1024px+).
 *
 * Horizontal values mirror MUI spacing units **3 / 4 / 6** (24 / 32 / 48px at theme
 * `spacing` 8px) applied with the same breakpoint bands for consistency with `py`.
 */
export const PANEL_BLOCK_PADDINGS = {
  y: {
    mobile: "56px",
    tablet: "72px",
    desktop: "90px",
  },
  x: {
    mobile: "24px",
    tablet: "32px",
    desktop: "48px",
  },
} as const;

export type SectionGaps = typeof SECTION_GAPS;
export type LayoutDimensions = typeof LAYOUT_DIMENSIONS;
export type PanelBlockPaddings = typeof PANEL_BLOCK_PADDINGS;
