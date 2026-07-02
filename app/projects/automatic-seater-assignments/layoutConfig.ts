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

/** Shared background for overview and my-contributions intro sections. */
export const INTRO_SECTIONS_BACKGROUND = "#F5F7FA" as const;

export const cssLengthToPx = (value: string): number => Number.parseFloat(value);

export const getUsableLayoutWidth = (
  breakpoint: "tablet" | "desktop",
): number => {
  const { maxWidth, margin } = LAYOUT_DIMENSIONS[breakpoint];
  return cssLengthToPx(maxWidth) - cssLengthToPx(margin) * 2;
};

/** Desktop usable content width (`1260 − 2 × 80`) — shared inset panel cap. */
export const PANEL_CONTENT_MAX_WIDTH_PX = getUsableLayoutWidth("desktop");

/** Outer shell max-width for `ResearchMethod` panels (capped by usable layout width). */
export const RESEARCH_METHOD_PANEL_MAX_WIDTH_PX = 1100;

export const RESEARCH_METHOD_PANEL_MAX_WIDTH = {
  mobile: "100%",
  tablet: `${Math.min(RESEARCH_METHOD_PANEL_MAX_WIDTH_PX, getUsableLayoutWidth("tablet"))}px`,
  desktop: `${Math.min(RESEARCH_METHOD_PANEL_MAX_WIDTH_PX, getUsableLayoutWidth("desktop"))}px`,
} as const;

export const researchMethodPanelShellSx: SxProps<Theme> = {
  width: "100%",
  maxWidth: RESEARCH_METHOD_PANEL_MAX_WIDTH.mobile,
  mx: "auto",
  boxSizing: "border-box",
  [breakpointMediaQuery.tabletUp]: {
    maxWidth: RESEARCH_METHOD_PANEL_MAX_WIDTH.tablet,
  },
  [breakpointMediaQuery.desktopUp]: {
    maxWidth: RESEARCH_METHOD_PANEL_MAX_WIDTH.desktop,
  },
};

/**
 * Vertical gap between major content blocks in `ResearchMethod`
 * (title, intro copy, methodology cards, legacy cards). Desktop: 16px.
 */
export const RESEARCH_METHOD_CONTENT_BLOCK_GAP = {
  mobile: 12,
  tablet: 14,
  desktop: 16,
} as const;

export const researchMethodContentStackSx: SxProps<Theme> = {
  display: "flex",
  flexDirection: "column",
  alignItems: "stretch",
  width: "100%",
};

/** Top padding before a block that follows another inside `ResearchMethod`. */
export const researchMethodContentBlockGapPtSx: SxProps<Theme> = {
  paddingTop: `${RESEARCH_METHOD_CONTENT_BLOCK_GAP.mobile}px`,
  [breakpointMediaQuery.tabletUp]: {
    paddingTop: `${RESEARCH_METHOD_CONTENT_BLOCK_GAP.tablet}px`,
  },
  [breakpointMediaQuery.desktopUp]: {
    paddingTop: `${RESEARCH_METHOD_CONTENT_BLOCK_GAP.desktop}px`,
  },
};

/** Vertical gap between sibling copy inside one intro block. */
export const researchMethodIntroCopyStackSx: SxProps<Theme> = {
  display: "flex",
  flexDirection: "column",
  rowGap: `${RESEARCH_METHOD_CONTENT_BLOCK_GAP.mobile}px`,
  [breakpointMediaQuery.tabletUp]: {
    rowGap: `${RESEARCH_METHOD_CONTENT_BLOCK_GAP.tablet}px`,
  },
  [breakpointMediaQuery.desktopUp]: {
    rowGap: `${RESEARCH_METHOD_CONTENT_BLOCK_GAP.desktop}px`,
  },
};

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
 * Frosted title/subtitle overlay on `ImageBanner` — scales with `heroTitle` (20 → 30 → 34px).
 * Tablet: 755 × (30 / 34) ≈ 665px. Mobile uses full banner width (`100%`).
 */
export const IMAGE_BANNER_OVERLAY_MAX_WIDTH = {
  mobile: "100%",
  tablet: "665px",
  desktop: "755px",
} as const;

/** Centered max-width for the hero banner text overlay. */
export const imageBannerOverlayMaxWidthSx: SxProps<Theme> = {
  width: "100%",
  maxWidth: IMAGE_BANNER_OVERLAY_MAX_WIDTH.mobile,
  [breakpointMediaQuery.tabletUp]: {
    maxWidth: IMAGE_BANNER_OVERLAY_MAX_WIDTH.tablet,
  },
  [breakpointMediaQuery.desktopUp]: {
    maxWidth: IMAGE_BANNER_OVERLAY_MAX_WIDTH.desktop,
  },
};

/**
 * `ImageBanner` band — full-bleed to the viewport on mobile; `LAYOUT_DIMENSIONS` from tablet up.
 */
export const imageBannerBandContentSx: SxProps<Theme> = {
  width: "100%",
  maxWidth: "none",
  px: 0,
  mx: "auto",
  boxSizing: "border-box",
  [breakpointMediaQuery.tabletUp]: {
    maxWidth: LAYOUT_DIMENSIONS.tablet.maxWidth,
    px: LAYOUT_DIMENSIONS.tablet.margin,
  },
  [breakpointMediaQuery.desktopUp]: {
    maxWidth: LAYOUT_DIMENSIONS.desktop.maxWidth,
    px: LAYOUT_DIMENSIONS.desktop.margin,
  },
};

/**
 * Frosted contributions card — same measure as overview body copy (`660px` desktop).
 */
export const MY_CONTRIBUTIONS_CARD_MAX_WIDTH = OVERVIEW_PARAGRAPH_MAX_WIDTH;

/** Centered numbered list inside the contributions card. */
export const MY_CONTRIBUTIONS_LIST_MAX_WIDTH_PX = 420;

export function myContributionsCardSx(background: string): SxProps<Theme> {
  return {
    width: "100%",
    maxWidth: MY_CONTRIBUTIONS_CARD_MAX_WIDTH.mobile,
    minHeight: { xs: "auto", sm: 355 },
    mx: "auto",
    px: { xs: 3, sm: 5, md: 6 },
    py: { xs: 4, sm: 5, md: 6 },
    borderRadius: "32px",
    overflow: "hidden",
    borderTop: "1px solid transparent",
    background,
    boxShadow: "0px 4px 14px rgba(0, 0, 0, 0.18)",
    [breakpointMediaQuery.tabletUp]: {
      maxWidth: MY_CONTRIBUTIONS_CARD_MAX_WIDTH.tablet,
    },
    [breakpointMediaQuery.desktopUp]: {
      maxWidth: MY_CONTRIBUTIONS_CARD_MAX_WIDTH.desktop,
    },
  };
}

export const myContributionsListSx: SxProps<Theme> = {
  maxWidth: MY_CONTRIBUTIONS_LIST_MAX_WIDTH_PX,
  mx: "auto",
  listStyleType: "decimal",
  pl: 4,
};

/** Shared max-width for intro cards (`MyContributions`, `ChallengeCard`). */
export const INTRO_CARD_MAX_WIDTH = MY_CONTRIBUTIONS_CARD_MAX_WIDTH;

/**
 * Methodology insight card (`MethodologyCard`) — scales with `methodologyCardTitle`
 * (16 → 20 → 22px). Desktop: 380 × 360px.
 */
export const METHODOLOGY_CARD_BACKGROUND = "#F1F1F1" as const;

export const METHODOLOGY_CARD_DIMENSIONS = {
  mobile: { width: 310, height: 294 },
  tablet: { width: 345, height: 327 },
  desktop: { width: 380, height: 360 },
} as const;

/** Description measure inside the card — ~83% of card width at each breakpoint. */
export const METHODOLOGY_CARD_DESCRIPTION_MAX_WIDTH = {
  mobile: 258,
  tablet: 287,
  desktop: 316,
} as const;

export const methodologyCardDimensionsSx: SxProps<Theme> = {
  width: "100%",
  maxWidth: METHODOLOGY_CARD_DIMENSIONS.mobile.width,
  height: METHODOLOGY_CARD_DIMENSIONS.mobile.height,
  mx: "auto",
  boxSizing: "border-box",
  justifySelf: "stretch",
  [breakpointMediaQuery.tabletUp]: {
    maxWidth: "none",
    height: METHODOLOGY_CARD_DIMENSIONS.tablet.height,
  },
  [breakpointMediaQuery.desktopUp]: {
    height: METHODOLOGY_CARD_DIMENSIONS.desktop.height,
  },
};

export const methodologyCardDescriptionMaxWidthSx: SxProps<Theme> = {
  maxWidth: METHODOLOGY_CARD_DESCRIPTION_MAX_WIDTH.mobile,
  [breakpointMediaQuery.tabletUp]: {
    maxWidth: METHODOLOGY_CARD_DESCRIPTION_MAX_WIDTH.tablet,
  },
  [breakpointMediaQuery.desktopUp]: {
    maxWidth: METHODOLOGY_CARD_DESCRIPTION_MAX_WIDTH.desktop,
  },
};

/**
 * “Read insights” control — scales with `methodologyCardTitle` (16 → 20 → 22px).
 * Desktop: 20px icon, 12px glyph, 8px gap.
 */
export const METHODOLOGY_CARD_READ_INSIGHTS = {
  mobile: { iconDiameter: 15, iconGlyph: 9, gap: 6 },
  tablet: { iconDiameter: 18, iconGlyph: 11, gap: 7 },
  desktop: { iconDiameter: 20, iconGlyph: 12, gap: 8 },
} as const;

export const methodologyCardReadInsightsRowSx: SxProps<Theme> = {
  gap: `${METHODOLOGY_CARD_READ_INSIGHTS.mobile.gap}px`,
  [breakpointMediaQuery.tabletUp]: {
    gap: `${METHODOLOGY_CARD_READ_INSIGHTS.tablet.gap}px`,
  },
  [breakpointMediaQuery.desktopUp]: {
    gap: `${METHODOLOGY_CARD_READ_INSIGHTS.desktop.gap}px`,
  },
};

export const methodologyCardReadInsightsIconSx: SxProps<Theme> = {
  width: METHODOLOGY_CARD_READ_INSIGHTS.mobile.iconDiameter,
  height: METHODOLOGY_CARD_READ_INSIGHTS.mobile.iconDiameter,
  borderRadius: "50%",
  bgcolor: "#003366",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  [breakpointMediaQuery.tabletUp]: {
    width: METHODOLOGY_CARD_READ_INSIGHTS.tablet.iconDiameter,
    height: METHODOLOGY_CARD_READ_INSIGHTS.tablet.iconDiameter,
  },
  [breakpointMediaQuery.desktopUp]: {
    width: METHODOLOGY_CARD_READ_INSIGHTS.desktop.iconDiameter,
    height: METHODOLOGY_CARD_READ_INSIGHTS.desktop.iconDiameter,
  },
};

export const methodologyCardReadInsightsGlyphSx: SxProps<Theme> = {
  color: "#ffffff",
  fontSize: METHODOLOGY_CARD_READ_INSIGHTS.mobile.iconGlyph,
  [breakpointMediaQuery.tabletUp]: {
    fontSize: METHODOLOGY_CARD_READ_INSIGHTS.tablet.iconGlyph,
  },
  [breakpointMediaQuery.desktopUp]: {
    fontSize: METHODOLOGY_CARD_READ_INSIGHTS.desktop.iconGlyph,
  },
};

/** Grid gap between `MethodologyCard` items in `ResearchMethod`. */
export const METHODOLOGY_CARD_GRID_GAP = {
  mobile: 16,
  tablet: 16,
  desktop: 32,
} as const;

export const methodologyCardGridSx: SxProps<Theme> = {
  display: "grid",
  gridTemplateColumns: "1fr",
  rowGap: `${METHODOLOGY_CARD_GRID_GAP.mobile}px`,
  columnGap: `${METHODOLOGY_CARD_GRID_GAP.mobile}px`,
  justifyItems: "center",
  justifyContent: "center",
  [breakpointMediaQuery.tabletUp]: {
    gridTemplateColumns: `repeat(2, ${METHODOLOGY_CARD_DIMENSIONS.tablet.width}px)`,
    rowGap: `${METHODOLOGY_CARD_GRID_GAP.tablet}px`,
    columnGap: `${METHODOLOGY_CARD_GRID_GAP.tablet}px`,
    justifyItems: "stretch",
  },
  [breakpointMediaQuery.desktopUp]: {
    gridTemplateColumns: `repeat(2, ${METHODOLOGY_CARD_DIMENSIONS.desktop.width}px)`,
    rowGap: `${METHODOLOGY_CARD_GRID_GAP.desktop}px`,
    columnGap: `${METHODOLOGY_CARD_GRID_GAP.desktop}px`,
  },
};

export function challengeCardSx(background: string): SxProps<Theme> {
  return {
    width: "100%",
    maxWidth: INTRO_CARD_MAX_WIDTH.mobile,
    mx: "auto",
    px: { xs: 3, sm: 5, md: 6 },
    py: { xs: 4, sm: 5, md: "50px" },
    borderRadius: "32px",
    overflow: "hidden",
    borderTop: 1,
    borderColor: "divider",
    background,
    [breakpointMediaQuery.tabletUp]: {
      maxWidth: INTRO_CARD_MAX_WIDTH.tablet,
    },
    [breakpointMediaQuery.desktopUp]: {
      maxWidth: INTRO_CARD_MAX_WIDTH.desktop,
    },
  };
}

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
export type IntroSectionsBackground = typeof INTRO_SECTIONS_BACKGROUND;
