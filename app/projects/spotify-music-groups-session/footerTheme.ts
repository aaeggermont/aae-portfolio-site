import type { ProjectFooterTheme } from "@/components/Footer/FooterState";

import { HERO_COLORS } from "@/app/projects/spotify-music-groups-session/layoutConfig";

/** Footer blends into the cream end of the hero gradient until more sections exist. */
export const SPOTIFY_MUSIC_GROUPS_SESSION_FOOTER_THEME: ProjectFooterTheme = {
  isDark: false,
  backgroundColor: HERO_COLORS.cream,
};
