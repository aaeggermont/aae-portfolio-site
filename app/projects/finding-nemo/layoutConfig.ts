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

/** Full-bleed section band backgrounds (edge-to-edge via `FullBleedBand`). */
export const BAND_COLORS = {
  /** #DEE8F3 @ 80% opacity */
  businessOpportunities: "rgba(222, 232, 243, 0.5)",
  /** #F3F3F3 — neutral panel (matches Overview / My Contributions) */
  neutralPanel: "#FFFFFF",
} as const;

/** Inset panel shell backgrounds (white panels inside full-bleed bands). */
export const PANEL_COLORS = {
  default: "#ffffff",
  coreMvpComponents: "#E5EDF5",
} as const;

/** Shared shell for inset white/colored panels (`PanelSection`, narrative panels). */
export const PANEL_SHELL_SX = {
  py: "96px",
  px: { xs: 3, sm: 4, md: 6, lg: 8 },
  borderRadius: "20px",
  width: "100%",
  maxWidth: "100%",
} as const;

/**
 * Top/bottom padding for `FullBleedBand`.
 * Uses the same 3 : 5 : 8 rem scale as `SECTION_GAPS` (48 / 80 / 128px at 16px root).
 */
export const FULL_BLEED_BAND_PADDINGS = {
  y: SECTION_GAPS,
} as const;

/**
 * Solution overview diagram display size (maintains 211:430 aspect ratio).
 * Desktop matches design spec; tablet ~90%, mobile ~75%.
 */
export const SOLUTION_OVERVIEW_IMAGE_DISPLAY = {
  mobile: { width: 158, height: 322 },
  tablet: { width: 190, height: 387 },
  desktop: { width: 211, height: 430 },
} as const;

/** Mobile experience mockup display — same phone aspect ratio as solution overview diagram. */
export const MOBILE_EXPERIENCE_MOCKUP_DISPLAY = SOLUTION_OVERVIEW_IMAGE_DISPLAY;

/**
 * Gap between mobile experience mockups in the flex row.
 * Desktop 64px; tablet/mobile use the same 3 : 5 : 8 ratio (24 / 40 / 64px).
 */
export const MOBILE_EXPERIENCE_MOCKUP_GAPS = {
  mobile: "24px",
  tablet: "40px",
  desktop: "64px",
} as const;

/**
 * Core Principles panel image — square display (473px desktop).
 * Tablet ~90%, mobile ~75%.
 */
export const CORE_PRINCIPLES_IMAGE_DISPLAY = {
  mobile: { width: 355, height: 355 },
  tablet: { width: 426, height: 426 },
  desktop: { width: 473, height: 473 },
} as const;

/**
 * Vertical gap between `PanelSection` blocks (title + panel), and from section intro copy.
 * Desktop 112px; tablet/mobile use the same 3 : 5 : 8 ratio (42 / 70 / 112px).
 */
export const PANEL_SECTION_GAPS = {
  mobile: "42px",
  tablet: "70px",
  desktop: "112px",
} as const;

/**
 * System workflow illustration display (622:795 aspect ratio).
 * Desktop matches design spec; tablet ~90%, mobile ~75% (same scale as solution overview / core principles).
 */
export const SYSTEM_WORKFLOW_ILLUSTRATION_DISPLAY = {
  mobile: { width: 467, height: 596 },
  tablet: { width: 560, height: 716 },
  desktop: { width: 622, height: 795 },
} as const;

/**
 * Conceptual MVP architecture illustration (800px desktop width; ~622:795 aspect ratio).
 * Tablet ~90%, mobile ~75%.
 */
export const CONCEPTUAL_MVP_ARCHITECTURE_ILLUSTRATION_DISPLAY = {
  mobile: { width: 600, height: 767 },
  tablet: { width: 720, height: 920 },
  desktop: { width: 800, height: 1022 },
} as const;

export type SectionGaps = typeof SECTION_GAPS;
export type LayoutDimensions = typeof LAYOUT_DIMENSIONS;
export type PanelBlockPaddings = typeof PANEL_BLOCK_PADDINGS;
export type BandColors = typeof BAND_COLORS;
export type PanelColors = typeof PANEL_COLORS;
export type FullBleedBandPaddings = typeof FULL_BLEED_BAND_PADDINGS;
export type SolutionOverviewImageDisplay = typeof SOLUTION_OVERVIEW_IMAGE_DISPLAY;
export type SystemWorkflowIllustrationDisplay =
  typeof SYSTEM_WORKFLOW_ILLUSTRATION_DISPLAY;
export type ConceptualMvpArchitectureIllustrationDisplay =
  typeof CONCEPTUAL_MVP_ARCHITECTURE_ILLUSTRATION_DISPLAY;
