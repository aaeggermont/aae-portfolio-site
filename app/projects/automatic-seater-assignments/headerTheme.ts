import type { ProjectHeaderTheme } from "@/components/Header/HeaderState";
import { HEADER_LOGO_DEFAULT_COLORS } from "@/components/Header/HeaderLogo";

/**
 * Global top nav overrides while Automatic Seater Assignments is mounted.
 * Absolute + transparent so the hero photo shows under the bar (Finding Nemo /
 * AR Story Teller overlay model). `isDark: true` for light logo on the dark banner.
 */
export const AUTOMATIC_SEATER_HEADER_THEME: ProjectHeaderTheme = {
  position: "absolute",
  isDark: true,
  logoPrimaryColor: "#D3D3D3",
  logoAccentColor: HEADER_LOGO_DEFAULT_COLORS.accent,
  backgroundColor: "transparent",
};
