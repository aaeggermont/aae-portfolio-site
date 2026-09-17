"use client";

import { useEffect } from "react";
import { useSetAtom } from "jotai";
import Box from "@mui/material/Box";

import { SPOTIFY_MUSIC_GROUPS_SESSION_HEADER_THEME } from "@/app/projects/spotify-music-groups-session/headerTheme";
import { SPOTIFY_MUSIC_GROUPS_SESSION_FOOTER_THEME } from "@/app/projects/spotify-music-groups-session/footerTheme";
import type { SpotifyMusicGroupsSessionProjectDocument } from "@/app/projects/spotify-music-groups-session/lib/spotify-music-groups-session.firestore";
import { layoutState } from "@/app/(public)/layout-state";
import {
  defaultHeaderState,
  headerState,
} from "@/components/Header/HeaderState";
import {
  defaultFooterState,
  footerState,
} from "@/components/Footer/FooterState";

type SpotifyMusicGroupsSessionPageProps = {
  project: SpotifyMusicGroupsSessionProjectDocument | null;
  onProjectHeaderReady?: () => void;
};

/**
 * Empty case-study shell for Analyzing Spotify Music Group Sessions.
 * Content sections will be added incrementally.
 */
export function SpotifyMusicGroupsSessionPage({
  onProjectHeaderReady,
}: SpotifyMusicGroupsSessionPageProps) {
  const setLayoutState = useSetAtom(layoutState);
  const setHeaderState = useSetAtom(headerState);
  const setFooterState = useSetAtom(footerState);

  useEffect(() => {
    setLayoutState({ isFullWidth: true });
    setHeaderState({ ...SPOTIFY_MUSIC_GROUPS_SESSION_HEADER_THEME });
    setFooterState({ ...SPOTIFY_MUSIC_GROUPS_SESSION_FOOTER_THEME });

    return () => {
      setLayoutState({ isFullWidth: false });
      setHeaderState({ ...defaultHeaderState });
      setFooterState({ ...defaultFooterState });
    };
  }, [setLayoutState, setHeaderState, setFooterState]);

  useEffect(() => {
    onProjectHeaderReady?.();
  }, [onProjectHeaderReady]);

  return <Box component="main" sx={{ minHeight: "60vh" }} />;
}
