import type { SxProps, Theme } from "@mui/material/styles";

import { breakpointMediaQuery } from "@/lib/responsive/breakpoints";

/** Titles, subtitles, section headings — IBM Plex Sans. */
export const FINDING_NEMO_TITLE_FONT =
  'var(--font-ibm-plex-sans), "IBM Plex Sans", system-ui, sans-serif';

/** Body copy, descriptions, captions — Source Sans 3. */
export const FINDING_NEMO_BODY_FONT =
  'var(--font-source-sans-3), "Source Sans 3", system-ui, sans-serif';

/**
 * Finding Nemo responsive type scale (px).
 * Breakpoints match `styles/variables.scss` / `lib/responsive/breakpoints.ts`.
 */
export const TYPOGRAPHY = {
  heroTitle: { mobile: "36px", tablet: "44px", desktop: "52px" },
  heroSubtitle: { mobile: "20px", tablet: "22px", desktop: "24px" },
  sectionTitle: { mobile: "28px", tablet: "32px", desktop: "36px" },
  sectionDescription: { mobile: "18px", tablet: "20px", desktop: "22px" },
  cardTitle: { mobile: "20px", tablet: "22px", desktop: "24px" },
  /** `ContentCard` title — IBM Plex Sans Bold. */
  contentCardTitle: { mobile: "20px", tablet: "22px", desktop: "24px" },
  /** `ContentCard` body / bullets — Source Sans 3 Regular. */
  contentCardBody: { mobile: "16px", tablet: "17px", desktop: "18px" },
  /** `Persona` Goals / Pain Points headings — IBM Plex Sans Bold. */
  personaSectionTitle: { mobile: "17px", tablet: "19px", desktop: "20px" },
  /** `Persona` role description — Source Sans 3, fixed 16px all breakpoints. */
  personaRoleDescription: { mobile: "16px", tablet: "16px", desktop: "16px" },
  /** `KpiCard` title — IBM Plex Sans Semibold. */
  kpiCardTitle: { mobile: "18px", tablet: "19px", desktop: "20px" },
  /** `KpiCard` description — Source Sans 3 Regular. */
  kpiCardBody: { mobile: "16px", tablet: "17px", desktop: "18px" },
  bodyText: { mobile: "17px", tablet: "18px", desktop: "18px" },
  smallCaption: { mobile: "15px", tablet: "15px", desktop: "16px" },
  diagramLabels: { mobile: "16px", tablet: "17px", desktop: "18px" },
} as const;

export type TypographyScaleKey = keyof typeof TYPOGRAPHY;

export function titleTypeSx(
  scaleKey: TypographyScaleKey,
  extra?: SxProps<Theme>,
): SxProps<Theme> {
  const responsive: SxProps<Theme> = {
    fontFamily: FINDING_NEMO_TITLE_FONT,
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
  extra?: SxProps<Theme>,
): SxProps<Theme> {
  const responsive: SxProps<Theme> = {
    fontFamily: FINDING_NEMO_BODY_FONT,
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
