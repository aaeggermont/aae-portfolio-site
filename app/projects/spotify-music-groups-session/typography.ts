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
 */
export const TYPOGRAPHY = {
  heroEyebrow: { mobile: "12px", tablet: "12px", desktop: "13px" },
  heroTitle: { mobile: "36px", tablet: "48px", desktop: "56px" },
  heroDescription: { mobile: "17px", tablet: "19px", desktop: "20px" },
  heroMetaLabel: { mobile: "11px", tablet: "11px", desktop: "12px" },
  heroMetaValue: { mobile: "14px", tablet: "15px", desktop: "16px" },
  sectionEyebrow: { mobile: "12px", tablet: "12px", desktop: "13px" },
  sectionTitle: { mobile: "28px", tablet: "34px", desktop: "40px" },
  sectionByline: { mobile: "15px", tablet: "16px", desktop: "16px" },
  sectionSubtitle: { mobile: "22px", tablet: "24px", desktop: "26px" },
  bodyText: { mobile: "16px", tablet: "17px", desktop: "18px" },
  calloutQuote: { mobile: "18px", tablet: "20px", desktop: "22px" },
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
