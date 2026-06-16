import { HEADER_LOGO_DEFAULT_COLORS } from "@/components/Header/HeaderLogo";

import { HEADER_BAND_COLOR } from "./layoutConfig";

/** Header band + nav overlay colors while the Finding Nemo case study is mounted. */
export const FINDING_NEMO_HEADER_BAND_COLOR = HEADER_BAND_COLOR;

/** Default brand logo on the light blue hero band (`isDark: false`). */
export const FINDING_NEMO_HEADER_LOGO = {
  primary: HEADER_LOGO_DEFAULT_COLORS.primary,
  accent: HEADER_LOGO_DEFAULT_COLORS.accent,
} as const;
