import type { CSSProperties } from "react";

/** Mobile hamburger + slide-out drawer — keep in sync with globals.scss. */
export const HEADER_MOBILE_NAVY = "#064C5F" as const;

/** Logo on the navy drawer — white letterforms + brand cyan accent (same idea as favicon). */
export const HEADER_SIDEBAR_LOGO_PRIMARY = "#ffffff" as const;
export const HEADER_SIDEBAR_LOGO_ACCENT = "#01a4e1" as const;

/**
 * Mobile sidebar typography — single place to edit drawer type.
 * Applied as CSS variables on `.sidenav_menu` (consumed in `header.module.scss`).
 *
 * Nav links = Home, About Me, My Work, Resume, Contact.
 * Use `navFontSize` / `navFontWeight` for those options (not `baseFontSize`).
 */
export const HEADER_SIDEBAR_TYPOGRAPHY = {
  /** Drawer shell default (inherited by children that do not set their own size). */
  baseFontFamily: "var(--font-poppins), sans-serif",
  baseFontWeight: 400,
  baseFontSize: "16px",
  baseLineHeight: "1.4",

  /** Name under the logo */
  nameFontFamily: "var(--font-poppins), sans-serif",
  nameFontWeight: 400,
  nameFontSize: "18px",
  nameLineHeight: "1.3",

  /** Nav options: Home, About Me, My Work, Resume, Contact */
  navFontFamily: "var(--font-poppins), sans-serif",
  /** Change this to adjust link weight (e.g. 400, 500, 600, 700). */
  navFontWeight: 400,
  /** Change this to adjust link size (e.g. "16px", "18px", "20px"). */
  navFontSize: "17px",
  navLineHeight: "1.3",
} as const;

/** CSS custom properties for `.sidenav_menu` — keep in sync with HEADER_SIDEBAR_TYPOGRAPHY. */
export const headerSidebarTypographyStyle = {
  "--sidebar-font-family": HEADER_SIDEBAR_TYPOGRAPHY.baseFontFamily,
  "--sidebar-font-weight": String(HEADER_SIDEBAR_TYPOGRAPHY.baseFontWeight),
  "--sidebar-font-size": HEADER_SIDEBAR_TYPOGRAPHY.baseFontSize,
  "--sidebar-line-height": HEADER_SIDEBAR_TYPOGRAPHY.baseLineHeight,

  "--sidebar-name-font-family": HEADER_SIDEBAR_TYPOGRAPHY.nameFontFamily,
  "--sidebar-name-font-weight": String(HEADER_SIDEBAR_TYPOGRAPHY.nameFontWeight),
  "--sidebar-name-font-size": HEADER_SIDEBAR_TYPOGRAPHY.nameFontSize,
  "--sidebar-name-line-height": HEADER_SIDEBAR_TYPOGRAPHY.nameLineHeight,

  "--sidebar-nav-font-family": HEADER_SIDEBAR_TYPOGRAPHY.navFontFamily,
  "--sidebar-nav-font-weight": String(HEADER_SIDEBAR_TYPOGRAPHY.navFontWeight),
  "--sidebar-nav-font-size": HEADER_SIDEBAR_TYPOGRAPHY.navFontSize,
  "--sidebar-nav-line-height": HEADER_SIDEBAR_TYPOGRAPHY.navLineHeight,
} as CSSProperties;
