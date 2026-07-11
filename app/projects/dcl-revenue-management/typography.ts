import type { SxProps, Theme } from "@mui/material/styles";

import { breakpointMediaQuery } from "@/lib/responsive/breakpoints";

/**
 * DCL Revenue Management type tokens.
 */

/** Project header + section titles — Maven Pro. */
export const DCL_TITLE_FONT =
  'var(--font-maven-pro), "Maven Pro", Helvetica, sans-serif';

/** Body copy — placeholder (Figtree) until body brand is finalized. */
export const DCL_BODY_FONT =
  'var(--font-figtree), "Figtree", Helvetica, sans-serif';

/** Hero title on banner — mockup `#F6F6F6`. */
export const DCL_HERO_TITLE_COLOR = "#F6F6F6";

/** Hero subtitle on banner — mockup `#114578`. */
export const DCL_HERO_SUBTITLE_COLOR = "#114578";

/** Primary title color on light bands. Placeholder. */
export const DCL_TITLE_COLOR = "#0B2A4A";

/** Body copy on light bands. Placeholder. */
export const DCL_BODY_COLOR = "#1F2937";

/** Muted supporting / status copy. Placeholder. */
export const DCL_MUTED_COLOR = "#4B5563";

/**
 * Responsive type scale (px).
 *
 * Breakpoints match `styles/variables.scss` / `lib/responsive/breakpoints.ts`:
 *
 * - `mobile`  -> 360–767px
 * - `tablet`  -> 768–1023px
 * - `desktop` -> 1024px+
 */
export const TYPOGRAPHY = {
  /** Banner title — desktop Maven Pro ExtraBold 48px. */
  heroTitle: { mobile: "24px", tablet: "34px", desktop: "38px" },
  /** Banner subtitle — desktop Maven Pro SemiBold 36px. */
  heroSubtitle: { mobile: "16px", tablet: "24px", desktop: "24px" },
  /** Top-level section headings. */
  sectionTitle: { mobile: "24px", tablet: "30px", desktop: "36px" },
  /** Overview and preview body paragraphs. */
  overviewBody: { mobile: "18px", tablet: "20px", desktop: "22px" },
  /** Status / coming-soon notice. */
  previewNotice: { mobile: "16px", tablet: "17px", desktop: "18px" },
} as const;

export type TypographyScaleKey = keyof typeof TYPOGRAPHY;

export type TitleTypographyScaleKey = Extract<
  TypographyScaleKey,
  "heroTitle" | "heroSubtitle" | "sectionTitle"
>;

export type BodyTypographyScaleKey = Extract<
  TypographyScaleKey,
  "overviewBody" | "previewNotice"
>;

const TITLE_FONT_WEIGHT: Record<TitleTypographyScaleKey, number> = {
  heroTitle: 800,
  heroSubtitle: 600,
  sectionTitle: 700,
};

const TITLE_COLOR: Partial<Record<TitleTypographyScaleKey, string>> = {
  heroTitle: DCL_HERO_TITLE_COLOR,
  heroSubtitle: DCL_HERO_SUBTITLE_COLOR,
  sectionTitle: DCL_TITLE_COLOR,
};

const BODY_FONT_WEIGHT: Record<BodyTypographyScaleKey, number> = {
  overviewBody: 500,
  previewNotice: 500,
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
  return buildResponsiveTypeSx(
    scaleKey,
    {
      fontFamily: DCL_TITLE_FONT,
      fontWeight: TITLE_FONT_WEIGHT[scaleKey],
      lineHeight: 1.2,
      ...(TITLE_COLOR[scaleKey] ? { color: TITLE_COLOR[scaleKey] } : {}),
    },
    extra,
  );
}

export function bodyTypeSx(
  scaleKey: BodyTypographyScaleKey,
  extra?: SxProps<Theme>,
): SxProps<Theme> {
  return buildResponsiveTypeSx(
    scaleKey,
    {
      fontFamily: DCL_BODY_FONT,
      fontWeight: BODY_FONT_WEIGHT[scaleKey],
      lineHeight: 1.6,
      color: scaleKey === "previewNotice" ? DCL_MUTED_COLOR : DCL_BODY_COLOR,
    },
    extra,
  );
}
