import type { SxProps, Theme } from "@mui/material/styles";

import { breakpointMediaQuery } from "@/lib/responsive/breakpoints";

/**
 * Vertical spacing between top-level section children inside the case study content band.
 *
 * Breakpoint bands match `styles/variables.scss`:
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

/** Responsive `rowGap` sx for stacks of major page sections (uses `SECTION_GAPS`). */
export const sectionRowGapSx: SxProps<Theme> = {
  rowGap: SECTION_GAPS.mobile,
  [breakpointMediaQuery.tabletUp]: { rowGap: SECTION_GAPS.tablet },
  [breakpointMediaQuery.desktopUp]: { rowGap: SECTION_GAPS.desktop },
};

/** Responsive `gap` sx for flex columns separating major page sections (uses `SECTION_GAPS`). */
export const sectionGapSx: SxProps<Theme> = {
  gap: SECTION_GAPS.mobile,
  [breakpointMediaQuery.tabletUp]: { gap: SECTION_GAPS.tablet },
  [breakpointMediaQuery.desktopUp]: { gap: SECTION_GAPS.desktop },
};

/**
 * Top/bottom padding for full-bleed section bands.
 * Uses the same 3 : 5 : 8 rem scale as `SECTION_GAPS`.
 */
export const FULL_BLEED_BAND_PADDINGS = {
  y: SECTION_GAPS,
} as const;

/**
 * Standardized usable content dimensions for the DCL Revenue Management case study.
 *
 * `FullBleedBand` enforces these as `max-width` (outer container cap) and horizontal
 * padding (inner side margins). Mobile is intentionally uncapped so the page fills
 * larger phones while keeping 16px side margins.
 */
export const LAYOUT_DIMENSIONS = {
  mobile: { maxWidth: "none", margin: "16px" },
  tablet: { maxWidth: "1024px", margin: "40px" },
  desktop: { maxWidth: "1260px", margin: "80px" },
} as const;

/** Shared background for intro / overview preview sections — continues from banner wave into white. */
export const INTRO_SECTIONS_BACKGROUND = "#FFFFFF" as const;

/** Project hero band — matches banner sky so letterboxing / edges blend. */
export const HEADER_BAND_COLOR = "#7FB1B8" as const;

/**
 * Vertical clearance under the global top bar when `headerState.position` is
 * `"absolute"`.
 */
export const PROJECT_HEADER_NAV_CLEARANCE = {
  mobile: "80px",
  tablet: "88px",
  desktop: "96px",
} as const;

/**
 * Padding below nav clearance on the project hero inner stack.
 * Desktop is 40px less than tablet/mobile to balance overlay nav whitespace.
 */
export const PROJECT_HEADER_EXTRA_TOP_PADDING = {
  mobile: "48px",
  tablet: "48px",
  desktop: "24px",
} as const;

export const cssLengthToPx = (value: string): number => Number.parseFloat(value);

export const getUsableLayoutWidth = (
  breakpoint: "tablet" | "desktop",
): number => {
  const { maxWidth, margin } = LAYOUT_DIMENSIONS[breakpoint];
  return cssLengthToPx(maxWidth) - cssLengthToPx(margin) * 2;
};

/** Desktop usable content width (`1260 − 2 × 80`). */
export const PANEL_CONTENT_MAX_WIDTH_PX = getUsableLayoutWidth("desktop");

/**
 * Narrative paragraph measure for Challenge / snapshot / about sections.
 *
 * Desktop: 920px (design target).
 * Tablet / mobile scale from the same share of usable layout width
 * (`920 / 1100 ≈ 84%` of desktop usable `1260 − 2×80`):
 * - tablet usable `1024 − 2×40` → ≈790px
 * - mobile: full content column (`100%`) with 16px side margins
 */
export const OVERVIEW_PARAGRAPH_MAX_WIDTH = {
  mobile: "100%",
  tablet: "790px",
  desktop: "920px",
} as const;

/** Centered max-width for overview body copy. */
export const overviewParagraphMaxWidthSx: SxProps<Theme> = {
  width: "100%",
  maxWidth: OVERVIEW_PARAGRAPH_MAX_WIDTH.mobile,
  mx: "auto",
  [breakpointMediaQuery.tabletUp]: {
    maxWidth: OVERVIEW_PARAGRAPH_MAX_WIDTH.tablet,
  },
  [breakpointMediaQuery.desktopUp]: {
    maxWidth: OVERVIEW_PARAGRAPH_MAX_WIDTH.desktop,
  },
};

/**
 * Standard `Container` constraints for case-study content inside a full-bleed band.
 * Applies `LAYOUT_DIMENSIONS` max-width and horizontal margins per breakpoint.
 */
export const layoutContentContainerSx: SxProps<Theme> = {
  width: "100%",
  maxWidth: LAYOUT_DIMENSIONS.mobile.maxWidth,
  mx: "auto",
  boxSizing: "border-box",
  px: LAYOUT_DIMENSIONS.mobile.margin,
  [breakpointMediaQuery.tabletUp]: {
    maxWidth: LAYOUT_DIMENSIONS.tablet.maxWidth,
    px: LAYOUT_DIMENSIONS.tablet.margin,
  },
  [breakpointMediaQuery.desktopUp]: {
    maxWidth: LAYOUT_DIMENSIONS.desktop.maxWidth,
    px: LAYOUT_DIMENSIONS.desktop.margin,
  },
};

export type SectionGaps = typeof SECTION_GAPS;
export type FullBleedBandPaddings = typeof FULL_BLEED_BAND_PADDINGS;
export type LayoutDimensions = typeof LAYOUT_DIMENSIONS;
export type IntroSectionsBackground = typeof INTRO_SECTIONS_BACKGROUND;
