"use client";

import { useEffect } from "react";
import { useSetAtom } from "jotai";
import Stack from "@mui/material/Stack";

import styles from "./dcl-revenue-management.module.scss";
import FullBleedBand from "./components/FullBleedBand";
import OverviewSection from "./components/OverviewSection";
import PreviewNotice from "./components/PreviewNotice";
import ProjectHeader from "./components/ProjectHeader";
import SectionDelimiter from "./components/SectionDelimiter";
import type { DclRevenueManagementProjectDocument } from "./lib/dcl-revenue-management.firestore";
import {
  INTRO_SECTIONS_BACKGROUND,
  sectionRowGapSx,
} from "./layoutConfig";
import { DCL_HEADER_LOGO } from "./headerTheme";
import { useResponsive } from "@/lib/responsive/ResponsiveQueryProvider";
import { layoutState } from "@/app/(public)/layout-state";
import {
  defaultHeaderState,
  headerState,
} from "@/components/Header/HeaderState";

type DclRevenueManagementPageProps = {
  project: DclRevenueManagementProjectDocument;
  onProjectHeaderReady?: () => void;
};

export function DclRevenueManagementPage({
  project,
  onProjectHeaderReady,
}: DclRevenueManagementPageProps) {
  const { isDesktopOrLaptop, isTablet, isMobile } = useResponsive();
  const setLayoutState = useSetAtom(layoutState);
  const setHeaderState = useSetAtom(headerState);

  const viewportBand =
    isMobile ? "mobile" : isTablet ? "tablet" : isDesktopOrLaptop ? "desktop" : "unknown";

  useEffect(() => {
    setLayoutState({ isFullWidth: true });
    setHeaderState({
      position: "absolute",
      isDark: false,
      logoPrimaryColor: DCL_HEADER_LOGO.primary,
      logoAccentColor: DCL_HEADER_LOGO.accent,
    });

    return () => {
      setLayoutState({ isFullWidth: false });
      setHeaderState({ ...defaultHeaderState });
    };
  }, [setLayoutState, setHeaderState]);

  return (
    <div className={styles.pageClipViewport}>
      <div className={styles.page} data-viewport-band={viewportBand}>
        <ProjectHeader
          data={project.projectHeader}
          onReady={onProjectHeaderReady}
        />

        <FullBleedBand backgroundColor={INTRO_SECTIONS_BACKGROUND}>
          <Stack alignItems="center" sx={{ ...sectionRowGapSx, width: "100%" }}>
            <OverviewSection data={project.challengeSection} />
            <OverviewSection data={project.previewProjectSnapshot} />
            <OverviewSection data={project.aboutTheSystem} />
            <SectionDelimiter data={project.sectionDelimiter} />
            <PreviewNotice data={project.previewNotice} />
          </Stack>
        </FullBleedBand>
      </div>
    </div>
  );
}
