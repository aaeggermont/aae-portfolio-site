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
  background: "#ffffff",
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
 * Footer typography — single place to edit type tokens.
 * Applied as CSS variables on `.footer-container` (consumed in `footer.module.scss`).
 *
 * | Role | Size | Weight |
 * |------|------|--------|
 * | Nav links (Home, About Me, …) | 16px fixed | 400 (700 active) |
 * | “Navigation” title | responsive + 18px mobile | 600 |
 * | Copyright lines | responsive | 500 |
 *
 * Responsive tiers for title + copyright mirror header `.main_menu a`
 * (17px mobile → 15px tablet → fluid 16–18px desktop).
 */
export const FOOTER_TYPOGRAPHY = {
  fontFamily: "var(--font-poppins), sans-serif",
  lineHeight: "1.3",

  /** Title + copyright — breakpoint sizes (nav links use `navLink` instead). */
  responsiveType: {
    fontSizeMobile: HEADER_SIDEBAR_TYPOGRAPHY.navFontSize,
    fontSizeTablet: "15px",
    desktopFluidMin: "16px",
    desktopFluidMax: "18px",
  },

  title: {
    fontWeight: 600,
    /** Mobile “Navigation” label — overrides `responsiveType.fontSizeMobile`. */
    fontSizeMobile: HEADER_SIDEBAR_TYPOGRAPHY.nameFontSize,
  },

  navLink: {
    fontSize: "16px",
    fontWeight: 400,
    activeFontWeight: 700,
  },

  copyright: {
    fontWeight: 500,
  },
} as const;

/**
 * Mobile stacked footer spacing — Navigation → Logo → Copyright.
 * Applied via CSS variables on `.footer-container` (mobile breakpoints only).
 */
export const FOOTER_MOBILE_LAYOUT = {
  wrapperPaddingTop: "3rem",
  containerPaddingTop: "2rem",
  blockGap: "2rem",
  navStackGap: "0.75rem",
  copyrightLineGap: "0.35rem",
  containerPaddingBottom: "2.5rem",
} as const;

/** CSS custom properties for footer type — keep in sync with FOOTER_TYPOGRAPHY. */
export const footerTypographyStyle = {
  "--footer-font-family": FOOTER_TYPOGRAPHY.fontFamily,
  "--footer-text-line-height": FOOTER_TYPOGRAPHY.lineHeight,

  "--footer-type-size-mobile": FOOTER_TYPOGRAPHY.responsiveType.fontSizeMobile,
  "--footer-type-size-tablet": FOOTER_TYPOGRAPHY.responsiveType.fontSizeTablet,
  "--footer-desktop-fluid-min": FOOTER_TYPOGRAPHY.responsiveType.desktopFluidMin,
  "--footer-desktop-fluid-max": FOOTER_TYPOGRAPHY.responsiveType.desktopFluidMax,

  "--footer-title-font-weight": String(FOOTER_TYPOGRAPHY.title.fontWeight),
  "--footer-title-font-size-mobile": FOOTER_TYPOGRAPHY.title.fontSizeMobile,

  "--footer-nav-link-font-size": FOOTER_TYPOGRAPHY.navLink.fontSize,
  "--footer-nav-link-font-weight": String(FOOTER_TYPOGRAPHY.navLink.fontWeight),
  "--footer-nav-active-font-weight": String(
    FOOTER_TYPOGRAPHY.navLink.activeFontWeight,
  ),

  "--footer-copyright-font-weight": String(FOOTER_TYPOGRAPHY.copyright.fontWeight),
} as CSSProperties;

/** CSS custom properties for mobile footer spacing — keep in sync with FOOTER_MOBILE_LAYOUT. */
export const footerMobileLayoutStyle = {
  "--footer-mobile-wrapper-padding-top": FOOTER_MOBILE_LAYOUT.wrapperPaddingTop,
  "--footer-mobile-container-padding-top":
    FOOTER_MOBILE_LAYOUT.containerPaddingTop,
  "--footer-mobile-block-gap": FOOTER_MOBILE_LAYOUT.blockGap,
  "--footer-mobile-nav-stack-gap": FOOTER_MOBILE_LAYOUT.navStackGap,
  "--footer-mobile-copyright-line-gap": FOOTER_MOBILE_LAYOUT.copyrightLineGap,
  "--footer-mobile-container-padding-bottom":
    FOOTER_MOBILE_LAYOUT.containerPaddingBottom,
} as CSSProperties;

export type FooterThemeOptions = {
  isDark?: boolean;
  fontColor?: string;
  backgroundColor?: string;
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

export function resolveFooterBackgroundColor(
  options: FooterThemeOptions = {},
): string {
  return options.backgroundColor ?? FOOTER_COLORS.background;
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

/** CSS custom properties for `.footer-container` — merge typography + layout + runtime colors. */
export function getFooterThemeStyle(
  options: FooterThemeOptions = {},
): CSSProperties {
  return {
    ...footerTypographyStyle,
    ...footerMobileLayoutStyle,
    "--footer-text-color": resolveFooterTextColor(options),
    "--footer-border-color": resolveFooterBorderColor(options),
    "--footer-background-color": resolveFooterBackgroundColor(options),
    "--footer-active-underline-color": FOOTER_COLORS.activeUnderline,
  } as CSSProperties;
}
