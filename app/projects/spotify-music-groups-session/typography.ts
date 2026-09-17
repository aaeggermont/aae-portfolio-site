import type { Theme } from "@mui/material/styles";
import type { SystemStyleObject } from "@mui/system";

import { breakpointMediaQuery } from "@/lib/responsive/breakpoints";

/** Titles, subtitles, section headings — Sora. */
export const SPOTIFY_MUSIC_GROUPS_SESSION_TITLE_FONT =
  'var(--font-sora), "Sora", system-ui, sans-serif';

/** Body copy, descriptions, captions — Inter. */
export const SPOTIFY_MUSIC_GROUPS_SESSION_BODY_FONT =
  'var(--font-inter), "Inter", system-ui, sans-serif';

/**
 * Spotify Music Groups Session responsive type scale (px).
 * Breakpoints match `styles/variables.scss` / `lib/responsive/breakpoints.ts`.
 * Sizes can be tuned as sections are designed.
 */
export const TYPOGRAPHY = {
  heroTitle: { mobile: "36px", tablet: "44px", desktop: "52px" },
  heroSubtitle: { mobile: "20px", tablet: "22px", desktop: "24px" },
  sectionTitle: { mobile: "28px", tablet: "32px", desktop: "36px" },
  sectionSubtitle: { mobile: "22px", tablet: "24px", desktop: "26px" },
  sectionDescription: { mobile: "18px", tablet: "20px", desktop: "22px" },
  cardTitle: { mobile: "20px", tablet: "22px", desktop: "24px" },
  bodyText: { mobile: "17px", tablet: "18px", desktop: "18px" },
  smallCaption: { mobile: "15px", tablet: "15px", desktop: "16px" },
} as const;

export type TypographyScaleKey = keyof typeof TYPOGRAPHY;

export function titleTypeSx(
  scaleKey: TypographyScaleKey,
  extra?: SystemStyleObject<Theme>,
): SystemStyleObject<Theme> {
  const responsive: SystemStyleObject<Theme> = {
    fontFamily: SPOTIFY_MUSIC_GROUPS_SESSION_TITLE_FONT,
    fontSize: TYPOGRAPHY[scaleKey].mobile,
    [breakpointMediaQuery.tabletUp]: {
      fontSize: TYPOGRAPHY[scaleKey].tablet,
    },
    [breakpointMediaQuery.desktopUp]: {
      fontSize: TYPOGRAPHY[scaleKey].desktop,
    },
  };

  if (!extra) return responsive;

  return { ...extra, ...responsive };
}

export function bodyTypeSx(
  scaleKey: TypographyScaleKey,
  extra?: SystemStyleObject<Theme>,
): SystemStyleObject<Theme> {
  const responsive: SystemStyleObject<Theme> = {
    fontFamily: SPOTIFY_MUSIC_GROUPS_SESSION_BODY_FONT,
    fontSize: TYPOGRAPHY[scaleKey].mobile,
    [breakpointMediaQuery.tabletUp]: {
      fontSize: TYPOGRAPHY[scaleKey].tablet,
    },
    [breakpointMediaQuery.desktopUp]: {
      fontSize: TYPOGRAPHY[scaleKey].desktop,
    },
  };

  if (!extra) return responsive;

  return { ...extra, ...responsive };
}
