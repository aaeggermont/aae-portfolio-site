"use client";

import { useEffect } from "react";
import { useSetAtom } from "jotai";
import Box from "@mui/material/Box";

import ProjectHeader from "@/app/projects/spotify-music-groups-session/components/ProjectHeader";
import TheQuestionSection from "@/app/projects/spotify-music-groups-session/components/TheQuestionSection";
import ProductContextSection from "@/app/projects/spotify-music-groups-session/components/ProductContextSection";
import TheoreticalFrameworkSection from "@/app/projects/spotify-music-groups-session/components/TheoreticalFrameworkSection";
import FeatureUnderStudySection from "@/app/projects/spotify-music-groups-session/components/FeatureUnderStudySection";
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

export function SpotifyMusicGroupsSessionPage({
  project,
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
    if (!project?.projectHeader) {
      onProjectHeaderReady?.();
    }
  }, [project, onProjectHeaderReady]);

  return (
    <Box component="main">
      {project?.projectHeader ? (
        <ProjectHeader
          data={project.projectHeader}
          onReady={onProjectHeaderReady}
        />
      ) : null}
      {project?.theQuestion ? (
        <TheQuestionSection data={project.theQuestion} />
      ) : null}
      {project?.productContext ? (
        <ProductContextSection data={project.productContext} />
      ) : null}
      {project?.theoreticalFramework ? (
        <TheoreticalFrameworkSection data={project.theoreticalFramework} />
      ) : null}
      {project?.featureUnderStudy ? (
        <FeatureUnderStudySection data={project.featureUnderStudy} />
      ) : null}
    </Box>
  );
}
