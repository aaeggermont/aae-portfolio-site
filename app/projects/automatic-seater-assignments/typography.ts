import type { SxProps, Theme } from "@mui/material/styles";

import { breakpointMediaQuery } from "@/lib/responsive/breakpoints";

/** Headings, section titles, card titles — Poppins. */
export const AUTOMATIC_SEATER_TITLE_FONT =
  'var(--font-poppins), "Poppins", Helvetica, sans-serif';

/** Body copy, descriptions, captions — Poppins (single-family case study). */
export const AUTOMATIC_SEATER_BODY_FONT = AUTOMATIC_SEATER_TITLE_FONT;

/** Long-form body on dark / gradient bands. */
export const AUTOMATIC_SEATER_BODY_ON_DARK_COLOR = "#cfcccc";

/** Primary titles on dark bands and research cards. */
export const AUTOMATIC_SEATER_TITLE_ON_DARK_COLOR = "#ffffff";

/** Solution section title on the white content band. */
export const AUTOMATIC_SEATER_SOLUTION_TITLE_COLOR = "#1d2d92";

/** Overview section title on the blue gradient band. */
export const AUTOMATIC_SEATER_OVERVIEW_TITLE_COLOR = "#003366";

/** Overview section body copy. */
export const AUTOMATIC_SEATER_OVERVIEW_BODY_COLOR = "#1F2937";

/** Shared intro card title (`MyContributions`, `ChallengeCard`). */
export const AUTOMATIC_SEATER_INTRO_CARD_TITLE_COLOR = "#003366";

/** Shared intro card body (`MyContributions`, `ChallengeCard`). */
export const AUTOMATIC_SEATER_INTRO_CARD_BODY_COLOR = "#1F2937";

/** Hero banner headline (frosted overlay). */
export const AUTOMATIC_SEATER_HERO_TITLE_COLOR = "#f2f2f2";

/** Hero banner tagline. */
export const AUTOMATIC_SEATER_HERO_SUBTITLE_COLOR = "#ffffff";

/** Inline emphasis in research rich paragraphs. */
export const AUTOMATIC_SEATER_EMPHASIS_COLOR = "#EDD84A";

/**
 * Automatic Seater Assignments responsive type scale (px).
 *
 * Breakpoints match `styles/variables.scss` / `lib/responsive/breakpoints.ts`:
 *
 * - `mobile`  -> 360–767px
 * - `tablet`  -> 768–1023px
 * - `desktop` -> 1024px+
 */
export const TYPOGRAPHY = {
  /** Hero banner headline (`ImageBanner`). Desktop: 34px bold. */
  heroTitle: { mobile: "20px", tablet: "30px", desktop: "34px" },
  /** Hero banner tagline (`ImageBanner`). Desktop: 24px medium. */
  heroSubtitle: { mobile: "15px", tablet: "22px", desktop: "24px" },
  /** Top-level section headings (overview, narrative blocks, solution title). */
  sectionTitle: { mobile: "24px", tablet: "30px", desktop: "36px" },
  /** Subtitle on dark narrative bands (`StandardParagraphBlock`). Desktop: 28px bold. */
  sectionSubtitle: { mobile: "22px", tablet: "26px", desktop: "28px" },
  /** Intro cards title (`MyContributions`, `ChallengeCard`). Desktop: 28px bold. */
  introCardTitle: { mobile: "22px", tablet: "26px", desktop: "28px" },
  /** Research method kicker (e.g. “1. Understanding…”). */
  methodKicker: { mobile: "18px", tablet: "19px", desktop: "22px" },
  /** Research method block title. */
  methodTitle: { mobile: "18px", tablet: "28px", desktop: "32px" },
  /** Info card titles (`ProjectOverviewCard`, `KeyBenefitsCard`). */
  cardTitle: { mobile: "20px", tablet: "22px", desktop: "24px" },
  /** Card column labels (`ProjectOverviewCard`). */
  cardColumnLabel: { mobile: "16px", tablet: "16px", desktop: "18px" },
  /** Figure / illustration titles (`ResearchMethodImageBlock`). */
  figureTitle: { mobile: "16px", tablet: "18px", desktop: "18px" },
  /** Persona name (`UserPersonas`). */
  personaTitle: { mobile: "16px", tablet: "16px", desktop: "19px" },
  /** Reusable component block title. */
  componentBlockTitle: { mobile: "16px", tablet: "16px", desktop: "20px" },
  /** Methodology insight card title (`MethodologyCard`). Desktop: 22px bold. */
  methodologyCardTitle: { mobile: "16px", tablet: "20px", desktop: "22px" },
  /** Overview intro paragraphs on the blue gradient band. */
  overviewBody: { mobile: "18px", tablet: "20px", desktop: "22px" },
  /** Intro cards body (`MyContributions` list, `ChallengeCard` paragraphs). Desktop: 18px medium. */
  introCardBody: { mobile: "16px", tablet: "17px", desktop: "18px" },
  /** Methodology insight card description (`MethodologyCard`). Desktop: 16px regular. */
  methodologyCardBody: { mobile: "14px", tablet: "15px", desktop: "16px" },
  /** Methodology insight card “Read insights” label. Desktop: 16px semibold. */
  methodologyCardAction: { mobile: "12px", tablet: "15px", desktop: "16px" },
  /** Long-form body on dark / gradient bands (legacy / other sections). */
  bodyText: { mobile: "18px", tablet: "20px", desktop: "26px" },
  /** Narrative / standard paragraph blocks on gradient band. */
  narrativeBody: { mobile: "16px", tablet: "18px", desktop: "20px" },
  /** Main solution description on white band. */
  solutionBody: { mobile: "18px", tablet: "20px", desktop: "26px" },
  /** Research method intro and card body copy. */
  panelBody: { mobile: "16px", tablet: "16px", desktop: "19px" },
  /** Research method card title (inset shell). */
  researchCardTitle: { mobile: "16px", tablet: "16px", desktop: "16px" },
  /** Research method card subtitle. */
  researchCardSubtitle: { mobile: "14px", tablet: "14px", desktop: "14px" },
  /** Card list items and column values. */
  cardBody: { mobile: "14px", tablet: "16px", desktop: "18px" },
  /** Image captions and annotations. */
  caption: { mobile: "12px", tablet: "12px", desktop: "12px" },
} as const;

export type TypographyScaleKey = keyof typeof TYPOGRAPHY;

export type TitleTypographyScaleKey = Extract<
  TypographyScaleKey,
  | "heroTitle"
  | "heroSubtitle"
  | "sectionTitle"
  | "sectionSubtitle"
  | "introCardTitle"
  | "methodKicker"
  | "methodTitle"
  | "cardTitle"
  | "cardColumnLabel"
  | "figureTitle"
  | "personaTitle"
  | "componentBlockTitle"
  | "methodologyCardTitle"
>;

export type BodyTypographyScaleKey = Extract<
  TypographyScaleKey,
  | "overviewBody"
  | "introCardBody"
  | "methodologyCardBody"
  | "methodologyCardAction"
  | "bodyText"
  | "narrativeBody"
  | "solutionBody"
  | "panelBody"
  | "researchCardTitle"
  | "researchCardSubtitle"
  | "cardBody"
  | "caption"
>;

const TITLE_FONT_WEIGHT: Record<TitleTypographyScaleKey, number> = {
  heroTitle: 700,
  heroSubtitle: 500,
  sectionTitle: 700,
  sectionSubtitle: 700,
  introCardTitle: 700,
  methodKicker: 700,
  methodTitle: 700,
  cardTitle: 600,
  cardColumnLabel: 600,
  figureTitle: 700,
  personaTitle: 800,
  componentBlockTitle: 700,
  methodologyCardTitle: 700,
};

const BODY_FONT_WEIGHT: Record<BodyTypographyScaleKey, number> = {
  overviewBody: 500,
  introCardBody: 500,
  methodologyCardBody: 400,
  methodologyCardAction: 600,
  bodyText: 500,
  narrativeBody: 500,
  solutionBody: 400,
  panelBody: 400,
  researchCardTitle: 700,
  researchCardSubtitle: 400,
  cardBody: 400,
  caption: 400,
};

const TITLE_COLOR: Partial<Record<TitleTypographyScaleKey, string>> = {
  heroTitle: AUTOMATIC_SEATER_HERO_TITLE_COLOR,
  heroSubtitle: AUTOMATIC_SEATER_HERO_SUBTITLE_COLOR,
  sectionTitle: AUTOMATIC_SEATER_TITLE_ON_DARK_COLOR,
  sectionSubtitle: AUTOMATIC_SEATER_TITLE_ON_DARK_COLOR,
  introCardTitle: AUTOMATIC_SEATER_INTRO_CARD_TITLE_COLOR,
  cardTitle: AUTOMATIC_SEATER_TITLE_ON_DARK_COLOR,
  cardColumnLabel: AUTOMATIC_SEATER_TITLE_ON_DARK_COLOR,
  figureTitle: AUTOMATIC_SEATER_TITLE_ON_DARK_COLOR,
  methodologyCardTitle: AUTOMATIC_SEATER_INTRO_CARD_BODY_COLOR,
};

const BODY_COLOR: Partial<Record<BodyTypographyScaleKey, string>> = {
  overviewBody: AUTOMATIC_SEATER_OVERVIEW_BODY_COLOR,
  introCardBody: AUTOMATIC_SEATER_INTRO_CARD_BODY_COLOR,
  methodologyCardBody: AUTOMATIC_SEATER_INTRO_CARD_BODY_COLOR,
  methodologyCardAction: AUTOMATIC_SEATER_INTRO_CARD_BODY_COLOR,
  bodyText: AUTOMATIC_SEATER_BODY_ON_DARK_COLOR,
  narrativeBody: AUTOMATIC_SEATER_BODY_ON_DARK_COLOR,
  panelBody: AUTOMATIC_SEATER_TITLE_ON_DARK_COLOR,
  researchCardTitle: AUTOMATIC_SEATER_TITLE_ON_DARK_COLOR,
  researchCardSubtitle: AUTOMATIC_SEATER_BODY_ON_DARK_COLOR,
  cardBody: AUTOMATIC_SEATER_TITLE_ON_DARK_COLOR,
};

function buildResponsiveTypeSx(
  scaleKey: TypographyScaleKey,
  base: SxProps<Theme>,
  extra?: SxProps<Theme>,
): SxProps<Theme> {
  const responsive = {
    ...base,
    fontSize: TYPOGRAPHY[scaleKey].mobile,
    [breakpointMediaQuery.tabletUp]: {
      fontSize: TYPOGRAPHY[scaleKey].tablet,
    },
    [breakpointMediaQuery.desktopUp]: {
      fontSize: TYPOGRAPHY[scaleKey].desktop,
    },
  } satisfies SxProps<Theme>;

  if (!extra) return responsive;

  return { ...responsive, ...extra } as SxProps<Theme>;
}

export function titleTypeSx(
  scaleKey: TitleTypographyScaleKey,
  extra?: SxProps<Theme>,
): SxProps<Theme> {
  return buildResponsiveTypeSx(scaleKey, {
    fontFamily: AUTOMATIC_SEATER_TITLE_FONT,
    fontWeight: TITLE_FONT_WEIGHT[scaleKey],
    lineHeight:
      scaleKey === "heroSubtitle" ? 1.25
      : scaleKey === "heroTitle" || scaleKey === "introCardTitle" || scaleKey === "sectionSubtitle" || scaleKey === "methodologyCardTitle"
        ? 1.2
        : "normal",
    ...(TITLE_COLOR[scaleKey] ? { color: TITLE_COLOR[scaleKey] } : {}),
  }, extra);
}

export function bodyTypeSx(
  scaleKey: BodyTypographyScaleKey,
  extra?: SxProps<Theme>,
): SxProps<Theme> {
  const lineHeight =
    scaleKey === "caption"
      ? 1.35
      : scaleKey === "narrativeBody" ||
          scaleKey === "bodyText" ||
          scaleKey === "overviewBody" ||
          scaleKey === "methodologyCardBody"
        ? 1.6
        : scaleKey === "introCardBody" || scaleKey === "methodologyCardAction"
          ? 1.4
          : 1.35;

  return buildResponsiveTypeSx(scaleKey, {
    fontFamily: AUTOMATIC_SEATER_BODY_FONT,
    fontWeight: BODY_FONT_WEIGHT[scaleKey],
    lineHeight,
    ...(BODY_COLOR[scaleKey] ? { color: BODY_COLOR[scaleKey] } : {}),
  }, extra);
}

/** Plain CSS length for a given breakpoint (SCSS / inline styles). */
export function typographySize(
  scaleKey: TypographyScaleKey,
  breakpoint: keyof (typeof TYPOGRAPHY)[TypographyScaleKey],
): string {
  return TYPOGRAPHY[scaleKey][breakpoint];
}
