import type { ProjectHeaderTheme } from "@/components/Header/HeaderState";
import { HEADER_LOGO_DEFAULT_COLORS } from "@/components/Header/HeaderLogo";

/**
 * Global top nav overrides while Spotify Music Groups Session is mounted.
 * Default (non-overlay) chrome until a hero is designed.
 */
export const SPOTIFY_MUSIC_GROUPS_SESSION_HEADER_THEME: ProjectHeaderTheme = {
  position: "relative",
  isDark: false,
  logoPrimaryColor: HEADER_LOGO_DEFAULT_COLORS.primary,
  logoAccentColor: HEADER_LOGO_DEFAULT_COLORS.accent,
  backgroundColor: "#FFFFFF",
};
