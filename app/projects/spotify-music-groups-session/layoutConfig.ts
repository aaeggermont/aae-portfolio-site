import { breakpointMediaQuery } from "@/lib/responsive/breakpoints";

/** Deep sea → navy → cream hero gradient (from app.base44 tokens). */
export const HERO_COLORS = {
  deepsea: "hsl(203 85% 20%)",
  navy: "hsl(205 45% 22%)",
  cream: "hsl(40 33% 97%)",
  /** Warm amber for eyebrow + hero description */
  accent: "#E0A05A",
  textOnDark: "#FFFFFF",
  metaLabel: "rgba(255, 255, 255, 0.72)",
  divider: "rgba(255, 255, 255, 0.28)",
} as const;

export const HERO_GRADIENT = `linear-gradient(
  to bottom,
  ${HERO_COLORS.deepsea},
  ${HERO_COLORS.navy},
  ${HERO_COLORS.cream}
)` as const;

/**
 * Vertical clearance under the absolute global top bar.
 */
export const PROJECT_HEADER_NAV_CLEARANCE = {
  mobile: "80px",
  tablet: "88px",
  desktop: "96px",
} as const;

/** Content max-width + horizontal gutters for the hero band. */
export const LAYOUT_DIMENSIONS = {
  mobile: { maxWidth: "none" as const, margin: "24px" },
  tablet: { maxWidth: "960px", margin: "40px" },
  desktop: { maxWidth: "1100px", margin: "48px" },
} as const;

/** Shared content max-width + gutters (hero + body sections). */
export const CONTENT_CONTAINER_SX = {
  width: "100%",
  maxWidth: {
    xs: LAYOUT_DIMENSIONS.mobile.maxWidth,
    md: LAYOUT_DIMENSIONS.tablet.maxWidth,
    lg: LAYOUT_DIMENSIONS.desktop.maxWidth,
  },
  mx: "auto",
  px: LAYOUT_DIMENSIONS.mobile.margin,
  boxSizing: "border-box" as const,
  [breakpointMediaQuery.tabletUp]: {
    px: LAYOUT_DIMENSIONS.tablet.margin,
  },
  [breakpointMediaQuery.desktopUp]: {
    px: LAYOUT_DIMENSIONS.desktop.margin,
  },
} as const;

/** @deprecated Prefer `CONTENT_CONTAINER_SX`. */
export const HERO_CONTENT_CONTAINER_SX = CONTENT_CONTAINER_SX;

/** Body section surfaces + text (post-hero). */
export const SECTION_COLORS = {
  surface: "#FFFFFF",
  card: "hsl(40 33% 97%)",
  label: "#5B8DB8",
  heading: "hsl(205 45% 18%)",
  body: "hsl(210 18% 32%)",
  accent: HERO_COLORS.accent,
} as const;

/** Vertical rhythm between top-level page sections. */
export const SECTION_PADDING_Y = {
  mobile: "4rem",
  tablet: "5rem",
  desktop: "6rem",
} as const;

/** Rounded corners on the hero photograph. */
export const HERO_IMAGE_BORDER_RADIUS = "16px" as const;

export const HERO_IMAGE = {
  objectPath: "projects/project_8/HeroSpotifyMusicGroupsHero.png",
  width: 1200,
  height: 675,
} as const;
