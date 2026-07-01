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

/**
 * Top/bottom padding for full-bleed section bands (overview, preview demo, etc.).
 * Uses the same 3 : 5 : 8 rem scale as `SECTION_GAPS`.
 */
export const FULL_BLEED_BAND_PADDINGS = {
  y: SECTION_GAPS,
} as const;

/**
 * Standardized usable content dimensions for the Automatic Seater Assignments case study.
 *
 * `.project-content` and `FullBleedBand` enforce these as `max-width` (outer container cap)
 * and horizontal padding (inner side margins). Mobile is intentionally uncapped so the page
 * fills larger phones while keeping 16px side margins.
 */
export const LAYOUT_DIMENSIONS = {
  mobile: { maxWidth: "none", margin: "16px" },
  tablet: { maxWidth: "1024px", margin: "40px" },
  desktop: { maxWidth: "1260px", margin: "80px" },
} as const;

export const cssLengthToPx = (value: string): number => Number.parseFloat(value);

export const getUsableLayoutWidth = (
  breakpoint: "tablet" | "desktop",
): number => {
  const { maxWidth, margin } = LAYOUT_DIMENSIONS[breakpoint];
  return cssLengthToPx(maxWidth) - cssLengthToPx(margin) * 2;
};

/** Desktop usable content width (`1260 − 2 × 80`) — shared inset panel cap. */
export const PANEL_CONTENT_MAX_WIDTH_PX = getUsableLayoutWidth("desktop");

/**
 * Overview intro paragraph measure — scales with `overviewBody` typography (18 → 20 → 22px).
 * Tablet value: 660 × (20 / 22) ≈ 600px. Mobile uses the layout column (`100%`).
 */
export const OVERVIEW_PARAGRAPH_MAX_WIDTH = {
  mobile: "100%",
  tablet: "600px",
  desktop: "660px",
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
  maxWidth: {
    xs: LAYOUT_DIMENSIONS.mobile.maxWidth,
    md: LAYOUT_DIMENSIONS.tablet.maxWidth,
    lg: LAYOUT_DIMENSIONS.desktop.maxWidth,
  },
  px: LAYOUT_DIMENSIONS.mobile.margin,
  [breakpointMediaQuery.tabletUp]: {
    px: LAYOUT_DIMENSIONS.tablet.margin,
  },
  [breakpointMediaQuery.desktopUp]: {
    px: LAYOUT_DIMENSIONS.desktop.margin,
  },
};

/**
 * Horizontal margins only — for sections that cap width on an inner `Container`
 * (Finding Nemo overview pattern).
 */
export const layoutSectionOuterSx: SxProps<Theme> = {
  width: "100%",
  px: LAYOUT_DIMENSIONS.mobile.margin,
  [breakpointMediaQuery.tabletUp]: {
    px: LAYOUT_DIMENSIONS.tablet.margin,
  },
  [breakpointMediaQuery.desktopUp]: {
    px: LAYOUT_DIMENSIONS.desktop.margin,
  },
};

export type SectionGaps = typeof SECTION_GAPS;
export type FullBleedBandPaddings = typeof FULL_BLEED_BAND_PADDINGS;
export type LayoutDimensions = typeof LAYOUT_DIMENSIONS;
