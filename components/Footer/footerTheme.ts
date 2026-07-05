import type { CSSProperties } from "react";
import {
  HEADER_MOBILE_NAVY,
  HEADER_SIDEBAR_TYPOGRAPHY,
} from "@/components/Header/headerTheme";
import { HEADER_LOGO_DEFAULT_COLORS } from "@/components/Header/HeaderLogo";

/** Footer text + border — aligned with header brand navy (`HEADER_MOBILE_NAVY`). */
export const FOOTER_COLORS = {
  text: HEADER_MOBILE_NAVY,
  textDark: "#ffffff",
  borderLight: "rgb(7, 76, 95, 0.15)",
  borderDark: "rgba(255, 255, 255, 0.15)",
  activeUnderline: "#feb000",
} as const;

export const FOOTER_LOGO = {
  primaryLight: HEADER_MOBILE_NAVY,
  accent: HEADER_LOGO_DEFAULT_COLORS.accent,
  primaryDark: "#ffffff",
} as const;

/**
 * Footer nav type tiers — mirrors top navigation (`header.module.scss` + `headerTheme.ts`).
 *
 * | Viewport | Header nav | Footer nav links | Footer “Navigation” title + copyright |
 * |----------|------------|------------------|---------------------------------------|
 * | All      | varies     | **16px** (fixed) | responsive tiers below                |
 *
 * Responsive sizes are applied in `footer.module.scss` (fluid-type + header breakpoints).
 */
export const FOOTER_NAV_TYPOGRAPHY = {
  fontFamily: "var(--font-poppins), sans-serif",
  fontWeight: 400,
  lineHeight: "1.3",
  navActiveFontWeight: 700,
  /** Home, About Me, My Work, Contact — fixed across breakpoints. */
  navLinkFontSize: "16px",
  titleFontWeight: 600,
  copyrightFontWeight: 500,

  mobile: {
    navFontSize: HEADER_SIDEBAR_TYPOGRAPHY.navFontSize,
    titleFontSize: HEADER_SIDEBAR_TYPOGRAPHY.nameFontSize,
  },
  tablet: {
    fontSize: "15px",
  },
  desktop: {
    fluidMin: "16px",
    fluidMid: "16px",
    fluidMax: "18px",
  },
} as const;

/**
 * Mobile stacked footer spacing — Navigation → Logo → Copyright.
 * Applied via CSS variables on `.footer-container` (mobile breakpoints only).
 */
export const FOOTER_MOBILE_LAYOUT = {
  /** Space above the footer shell (below page content). */
  wrapperPaddingTop: "3rem",
  /** Space inside footer below the top border. */
  containerPaddingTop: "2rem",
  /** Equal gap between Navigation, Logo, and Copyright blocks. */
  blockGap: "2rem",
  /** Gap between “Navigation” title and link list. */
  navStackGap: "0.75rem",
  /** Gap between copyright lines. */
  copyrightLineGap: "0.35rem",
  containerPaddingBottom: "2.5rem",
} as const;

export type FooterThemeOptions = {
  isDark?: boolean;
  fontColor?: string;
};

export function resolveFooterTextColor(options: FooterThemeOptions = {}): string {
  if (options.isDark) {
    return FOOTER_COLORS.textDark;
  }
  return options.fontColor ?? FOOTER_COLORS.text;
}

export function resolveFooterBorderColor(options: FooterThemeOptions = {}): string {
  return options.isDark ? FOOTER_COLORS.borderDark : FOOTER_COLORS.borderLight;
}

export function resolveFooterLogoColors(options: {
  isDark?: boolean;
  logoFontColor?: string;
  logoAccentColor?: string;
} = {}) {
  return {
    primary:
      options.logoFontColor ??
      (options.isDark ? FOOTER_LOGO.primaryDark : FOOTER_LOGO.primaryLight),
    accent: options.logoAccentColor ?? FOOTER_LOGO.accent,
  };
}

/** CSS custom properties for `.footer-container` — colors + weights; sizes live in SCSS tiers. */
export function getFooterThemeStyle(
  options: FooterThemeOptions = {},
): CSSProperties {
  const textColor = resolveFooterTextColor(options);
  const borderColor = resolveFooterBorderColor(options);

  return {
    "--footer-font-family": FOOTER_NAV_TYPOGRAPHY.fontFamily,
    "--footer-text-color": textColor,
    "--footer-border-color": borderColor,
    "--footer-active-underline-color": FOOTER_COLORS.activeUnderline,

    "--footer-text-font-weight": String(FOOTER_NAV_TYPOGRAPHY.fontWeight),
    "--footer-text-line-height": FOOTER_NAV_TYPOGRAPHY.lineHeight,
    "--footer-nav-active-font-weight": String(
      FOOTER_NAV_TYPOGRAPHY.navActiveFontWeight,
    ),

    "--footer-title-font-weight": String(FOOTER_NAV_TYPOGRAPHY.titleFontWeight),
    "--footer-copyright-font-weight": String(
      FOOTER_NAV_TYPOGRAPHY.copyrightFontWeight,
    ),

    "--footer-nav-link-font-size": FOOTER_NAV_TYPOGRAPHY.navLinkFontSize,

    "--footer-nav-font-size-mobile": FOOTER_NAV_TYPOGRAPHY.mobile.navFontSize,
    "--footer-title-font-size-mobile":
      FOOTER_NAV_TYPOGRAPHY.mobile.titleFontSize,
    "--footer-nav-font-size-tablet": FOOTER_NAV_TYPOGRAPHY.tablet.fontSize,

    "--footer-mobile-wrapper-padding-top": FOOTER_MOBILE_LAYOUT.wrapperPaddingTop,
    "--footer-mobile-container-padding-top":
      FOOTER_MOBILE_LAYOUT.containerPaddingTop,
    "--footer-mobile-block-gap": FOOTER_MOBILE_LAYOUT.blockGap,
    "--footer-mobile-nav-stack-gap": FOOTER_MOBILE_LAYOUT.navStackGap,
    "--footer-mobile-copyright-line-gap":
      FOOTER_MOBILE_LAYOUT.copyrightLineGap,
    "--footer-mobile-container-padding-bottom":
      FOOTER_MOBILE_LAYOUT.containerPaddingBottom,
  } as CSSProperties;
}
