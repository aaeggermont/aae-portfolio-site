import { atom } from "jotai";

type Position = "static" | "relative" | "absolute" | "sticky" | "fixed";

export type HeaderStateValue = {
  position: Position;
  isDark: boolean;
  /** When set (e.g. by a project page), overrides default / `isDark` logo primary. */
  logoPrimaryColor?: string;
  /** When set, overrides `HeaderLogo` default accent; omit to use brand cyan. */
  logoAccentColor?: string;
  /** When set (project pages), paints the top nav bar; home sticky uses `--page-canvas` when unset. */
  backgroundColor?: string;
};

/** Subset project routes pass via `setHeaderState` — landing defaults stay in `defaultHeaderState`. */
export type ProjectHeaderTheme = Pick<
  HeaderStateValue,
  "position" | "isDark" | "logoPrimaryColor" | "logoAccentColor" | "backgroundColor"
>;

export const defaultHeaderState: HeaderStateValue = {
  position: "relative",
  isDark: false,
};

export const headerState = atom<HeaderStateValue>(defaultHeaderState);
