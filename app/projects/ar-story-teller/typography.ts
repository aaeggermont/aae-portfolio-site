import type { SxProps, Theme } from "@mui/material/styles";

import { breakpointMediaQuery } from "@/lib/responsive/breakpoints";

/** Headings, section titles, card titles — Satoshi. */
export const AR_STORY_TELLER_TITLE_FONT =
  'var(--font-satoshi), "Satoshi", system-ui, sans-serif';

/** Body copy, descriptions, captions — Source Sans 3. */
export const AR_STORY_TELLER_BODY_FONT =
  'var(--font-source-sans-3), "Source Sans 3", system-ui, sans-serif';

/** Standard body and caption color across the case study. */
export const AR_STORY_TELLER_TEXT_COLOR = "#03133c";

/** Hero banner — dark background only. */
export const AR_STORY_TELLER_HERO_TITLE_COLOR = "#ffffff";
export const AR_STORY_TELLER_HERO_SUBTITLE_COLOR = "#ffbb00";

/**
 * AR Story Teller responsive type scale (px).
 * Breakpoints match `styles/variables.scss` / `lib/responsive/breakpoints.ts`:
 * mobile (<768px), tablet (768–1023px), desktop (1024px+).
 */
export const TYPOGRAPHY = {
  /** Project banner main title. */
  heroTitle: { mobile: "28px", tablet: "32px", desktop: "40px" },
  /** Project banner subtitle lines. */
  heroSubtitle: { mobile: "20px", tablet: "20px", desktop: "24px" },
  /** Top-level section headings (`SectionTitle`). */
  sectionTitle: { mobile: "28px", tablet: "34px", desktop: "40px" },
  /** Subsections under a section (`SectionSubTitle`, e.g. “AR As Narrative Tool”). */
  sectionSubTitle: { mobile: "24px", tablet: "28px", desktop: "32px" },
  /** In-panel section headings (interaction design, user modes, etc.). */
  panelHeading: { mobile: "22px", tablet: "24px", desktop: "26px" },
  /** Card / column titles (AR mockups, research cards, mode titles). */
  cardTitle: { mobile: "18px", tablet: "20px", desktop: "22px" },
  /** Long-form prose (`ParagraphBlock`, overview copy). */
  bodyText: { mobile: "18px", tablet: "20px", desktop: "20px" },
  /** Grey inset panels (`ArAsNarrative`, Business Goals, Team, etc.). */
  panelBody: { mobile: "18px", tablet: "20px", desktop: "20px" },
  /** Emphasized body — list intros; use sparingly. */
  bodyTextMedium: { mobile: "18px", tablet: "20px", desktop: "20px" },
  /** Dense UI copy (accordions, compact lists). */
  smallBody: { mobile: "16px", tablet: "17px", desktop: "18px" },
  /** Image annotations and diagram labels. */
  caption: { mobile: "14px", tablet: "15px", desktop: "16px" },
  /** White title on the case study banner image. */
  caseStudyBannerTitle: { mobile: "20px", tablet: "24px", desktop: "28px" },
  /** Optional labels / meta text. */
  eyebrow: { mobile: "14px", tablet: "14px", desktop: "15px" },
} as const;

export type TypographyScaleKey = keyof typeof TYPOGRAPHY;

export type TitleTypographyScaleKey = Extract<
  TypographyScaleKey,
  | "heroTitle"
  | "heroSubtitle"
  | "sectionTitle"
  | "sectionSubTitle"
  | "panelHeading"
  | "cardTitle"
  | "caseStudyBannerTitle"
  | "eyebrow"
>;

export type BodyTypographyScaleKey = Extract<
  TypographyScaleKey,
  | "bodyText"
  | "panelBody"
  | "bodyTextMedium"
  | "smallBody"
  | "caption"
>;

const TITLE_FONT_WEIGHT: Record<TitleTypographyScaleKey, number> = {
  heroTitle: 600,
  heroSubtitle: 600,
  sectionTitle: 700,
  sectionSubTitle: 700,
  panelHeading: 700,
  cardTitle: 600,
  caseStudyBannerTitle: 600,
  eyebrow: 600,
};

const BODY_FONT_WEIGHT: Record<BodyTypographyScaleKey, number> = {
  bodyText: 400,
  panelBody: 400,
  bodyTextMedium: 500,
  smallBody: 400,
  caption: 400,
};

const TITLE_COLOR: Record<TitleTypographyScaleKey, string> = {
  heroTitle: AR_STORY_TELLER_HERO_TITLE_COLOR,
  heroSubtitle: AR_STORY_TELLER_HERO_SUBTITLE_COLOR,
  sectionTitle: AR_STORY_TELLER_TEXT_COLOR,
  sectionSubTitle: AR_STORY_TELLER_TEXT_COLOR,
  panelHeading: AR_STORY_TELLER_TEXT_COLOR,
  cardTitle: AR_STORY_TELLER_TEXT_COLOR,
  caseStudyBannerTitle: AR_STORY_TELLER_HERO_TITLE_COLOR,
  eyebrow: AR_STORY_TELLER_TEXT_COLOR,
};

export function titleTypeSx(
  scaleKey: TitleTypographyScaleKey,
  extra?: SxProps<Theme>,
): SxProps<Theme> {
  const responsive: SxProps<Theme> = {
    fontFamily: AR_STORY_TELLER_TITLE_FONT,
    fontWeight: TITLE_FONT_WEIGHT[scaleKey],
    lineHeight: scaleKey === "heroSubtitle" ? 1.35 : "normal",
    color: TITLE_COLOR[scaleKey],
    fontSize: TYPOGRAPHY[scaleKey].mobile,
    [breakpointMediaQuery.tabletUp]: {
      fontSize: TYPOGRAPHY[scaleKey].tablet,
    },
    [breakpointMediaQuery.desktopUp]: {
      fontSize: TYPOGRAPHY[scaleKey].desktop,
    },
  };

  if (!extra) return responsive;

  return { ...responsive, ...extra };
}

export function bodyTypeSx(
  scaleKey: BodyTypographyScaleKey,
  extra?: SxProps<Theme>,
): SxProps<Theme> {
  const responsive: SxProps<Theme> = {
    fontFamily: AR_STORY_TELLER_BODY_FONT,
    fontWeight: BODY_FONT_WEIGHT[scaleKey],
    lineHeight: 1.35,
    color: AR_STORY_TELLER_TEXT_COLOR,
    fontSize: TYPOGRAPHY[scaleKey].mobile,
    [breakpointMediaQuery.tabletUp]: {
      fontSize: TYPOGRAPHY[scaleKey].tablet,
    },
    [breakpointMediaQuery.desktopUp]: {
      fontSize: TYPOGRAPHY[scaleKey].desktop,
    },
  };

  if (!extra) return responsive;

  return { ...responsive, ...extra };
}

/** Plain CSS length for a token at a given breakpoint (SCSS / inline styles). */
export function typographySize(
  scaleKey: TypographyScaleKey,
  breakpoint: keyof (typeof TYPOGRAPHY)[TypographyScaleKey],
): string {
  return TYPOGRAPHY[scaleKey][breakpoint];
}
