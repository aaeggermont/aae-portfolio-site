import type { ProjectHeaderTheme } from "@/components/Header/HeaderState";
import { HEADER_LOGO_DEFAULT_COLORS } from "@/components/Header/HeaderLogo";

/**
 * Global top nav overlays the deepsea hero band.
 * `isDark: true` forces white nav text / logo on the navy gradient.
 */
export const SPOTIFY_MUSIC_GROUPS_SESSION_HEADER_THEME: ProjectHeaderTheme = {
  position: "absolute",
  isDark: true,
  logoPrimaryColor: "#FFFFFF",
  logoAccentColor: HEADER_LOGO_DEFAULT_COLORS.accent,
  backgroundColor: "transparent",
};
