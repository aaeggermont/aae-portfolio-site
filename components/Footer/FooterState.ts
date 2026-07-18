import { atom } from "jotai";

export type FooterStateValue = {
  isDark: boolean;
  /**
   * CSS `background` value (solid or gradient). When set, takes precedence
   * over `backgroundColor`.
   */
  background?: string;
  /** Solid background fallback when `background` is unset. */
  backgroundColor?: string;
  /** When set (and not `isDark`), overrides default navy text. */
  fontColor?: string;
  /** When set, overrides default / `isDark` logo primary. */
  logoFontColor?: string;
  /** When set, overrides brand cyan logo accent. */
  logoAccentColor?: string;
};

/** Subset project routes pass via `setFooterState`. */
export type ProjectFooterTheme = Pick<
  FooterStateValue,
  | "isDark"
  | "background"
  | "backgroundColor"
  | "fontColor"
  | "logoFontColor"
  | "logoAccentColor"
>;

export const defaultFooterState: FooterStateValue = {
  isDark: false,
};

export const footerState = atom<FooterStateValue>(defaultFooterState);
