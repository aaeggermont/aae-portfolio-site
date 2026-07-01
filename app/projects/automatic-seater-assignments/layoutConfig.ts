import type { SxProps, Theme } from "@mui/material/styles";

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
 * Section components apply `margin` as horizontal padding on the outer wrapper and
 * `maxWidth` on the inner `Container`. Mobile is intentionally uncapped so the page
 * fills larger phones.
 */
export const LAYOUT_DIMENSIONS = {
  mobile: { maxWidth: "none", margin: "32px" },
  tablet: { maxWidth: "none", margin: "80px" },
  desktop: { maxWidth: "1260px", margin: "80px" },
} as const;

/** MUI `Container` max-width token for narrative / research sections. */
export const CASE_STUDY_CONTAINER_MAX_WIDTH = "lg" as const;

/**
 * Shared horizontal rhythm for case-study sections.
 * Keep in sync: outer gutter + inner container padding.
 *
 * Values mirror theme spacing units **4 / 10** (32 / 80px at `spacing` 8px).
 */
export const caseStudySectionGutterSx: SxProps<Theme> = {
  width: "100%",
  px: { xs: 4, md: 10 },
};

/** Inner `Container` horizontal padding — applied on top of `caseStudySectionGutterSx`. */
export const caseStudyContainerSx: SxProps<Theme> = {
  px: { xs: 2, sm: 3 },
};

export type SectionGaps = typeof SECTION_GAPS;
export type FullBleedBandPaddings = typeof FULL_BLEED_BAND_PADDINGS;
export type LayoutDimensions = typeof LAYOUT_DIMENSIONS;
