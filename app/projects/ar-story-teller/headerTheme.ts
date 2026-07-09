import type { ProjectHeaderTheme } from "@/components/Header/HeaderState";
import { HEADER_LOGO_DEFAULT_COLORS } from "@/components/Header/HeaderLogo";

/** Hero gradient top on desktop (`ProjectHeader.scss`) — use for a solid nav bar over the hero. */
export const AR_STORY_TELLER_HERO_HEADER_BG = "#153077";

/** Page canvas while this case study is mounted (`pageCanvas.ts`). */
export const AR_STORY_TELLER_PAGE_HEADER_BG = "#ffffff";

/** Global top nav overrides while `ArStoryTellerPage` is mounted. */
export const AR_STORY_TELLER_HEADER_THEME: ProjectHeaderTheme = {
  position: "absolute",
  isDark: true,
  logoPrimaryColor: "#D3D3D3",
  logoAccentColor: HEADER_LOGO_DEFAULT_COLORS.accent,
  /** Transparent keeps the hero gradient visible under the absolute nav; swap to `AR_STORY_TELLER_HERO_HEADER_BG` for a solid bar. */
  backgroundColor: "transparent",
};

/** @deprecated Use `AR_STORY_TELLER_HEADER_THEME.logoPrimaryColor` / accent fields. */
export const AR_STORY_TELLER_HEADER_LOGO = {
  primary: AR_STORY_TELLER_HEADER_THEME.logoPrimaryColor ?? "#ffffff",
  accent: AR_STORY_TELLER_HEADER_THEME.logoAccentColor ?? HEADER_LOGO_DEFAULT_COLORS.accent,
} as const;
