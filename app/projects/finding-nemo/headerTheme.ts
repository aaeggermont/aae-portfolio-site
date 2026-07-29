import type { ProjectHeaderTheme } from "@/components/Header/HeaderState";
import { HEADER_LOGO_DEFAULT_COLORS } from "@/components/Header/HeaderLogo";

import { HEADER_BAND_COLOR } from "./layoutConfig";

/** Header band + nav overlay colors while the Finding Nemo case study is mounted. */
export const FINDING_NEMO_HEADER_BAND_COLOR = HEADER_BAND_COLOR;

/**
 * Global top nav overrides while Finding Nemo is mounted.
 * Absolute + transparent over the hero image; `isDark: true` forces white nav text.
 */
export const FINDING_NEMO_HEADER_THEME: ProjectHeaderTheme = {
  position: "absolute",
  isDark: true,
  logoPrimaryColor: "#FFFFFF",
  logoAccentColor: HEADER_LOGO_DEFAULT_COLORS.accent,
  backgroundColor: "transparent",
};

/** @deprecated Prefer `FINDING_NEMO_HEADER_THEME` logo fields. */
export const FINDING_NEMO_HEADER_LOGO = {
  primary: FINDING_NEMO_HEADER_THEME.logoPrimaryColor ?? "#FFFFFF",
  accent:
    FINDING_NEMO_HEADER_THEME.logoAccentColor ?? HEADER_LOGO_DEFAULT_COLORS.accent,
} as const;
