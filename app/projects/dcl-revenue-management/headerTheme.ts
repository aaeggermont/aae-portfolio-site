import { HEADER_LOGO_DEFAULT_COLORS } from "@/components/Header/HeaderLogo";

import { HEADER_BAND_COLOR } from "./layoutConfig";

/** Header band + nav overlay colors while the DCL case study is mounted. */
export const DCL_HEADER_BAND_COLOR = HEADER_BAND_COLOR;

/** Accent bar / underline on the teal banner sky. */
export const DCL_HEADER_LOGO_ACCENT = "#D5CDCD";

/**
 * Nav logo on the teal banner sky.
 * Keep AAE letterforms (primary); accent bar uses `#D5CDCD` for contrast on the sky.
 */
export const DCL_HEADER_LOGO = {
  primary: HEADER_LOGO_DEFAULT_COLORS.primary,
  accent: DCL_HEADER_LOGO_ACCENT,
} as const;
