import type { ProjectFooterTheme } from "@/components/Footer/FooterState";
import { HEADER_LOGO_DEFAULT_COLORS } from "@/components/Header/HeaderLogo";

/**
 * Dark cousin of the My Contributions card wash — same 109° cool-gray language,
 * re-tinted to settle on the narrative band end (`#030405`) so the footer blends
 * while keeping a soft metallic lift.
 */
export const AUTOMATIC_SEATER_FOOTER_BACKGROUND =
  "linear-gradient(109deg, #2c343f 13.84%, #1a2028 56.92%, #10141a 78.46%, #080a0d 89.23%, #030405 100%)";

export const AUTOMATIC_SEATER_FOOTER_THEME: ProjectFooterTheme = {
  isDark: true,
  background: AUTOMATIC_SEATER_FOOTER_BACKGROUND,
  logoFontColor: "#D3D3D3",
  logoAccentColor: HEADER_LOGO_DEFAULT_COLORS.accent,
};
