"use client";

import styles from './ArStoryTeller.module.scss';
import { ProjectHeader } from './components/ProjectHeader';
import { OverviewSection } from './components/sections/OverviewSection';
import { TeamSection } from './components/sections/TeamSection';
import { ProjectOverviewSection } from './components/sections/ProjectOverviewSection';
import { CaseStudyOverviewSection } from './components/sections/CaseStudyOverviewSection';
import { DesignSystemSection } from './sections/DesignSystemSection';
import ConclusionsAndImpactSection from './components/sections/ConclusionsAndImpactSection';
import { useSetAtom } from "jotai";
import { useEffect, type CSSProperties } from "react";
import { layoutState } from "@/app/(public)/layout-state";
import {
  defaultHeaderState,
  headerState,
} from "@/components/Header/HeaderState";
import { AR_STORY_TELLER_HEADER_LOGO } from "./headerTheme";
import type { ArStoryTellerContent } from '@/app/projects/ar-story-teller/types/arStoryTellerContent';
import BusinessGoals from './components/sections/BusinessGoals';
import {
    BODY_STACK_GAP,
    FULL_BLEED_BAND_PADDINGS,
    LAYOUT_DIMENSIONS,
    PANEL_BLOCK_PADDINGS,
    PANEL_SECTION_GAPS,
    SECTION_GAPS,
    TITLE_CONTENT_GAP,
    type BodyStackGap,
    type FullBleedBandPaddings,
    type LayoutDimensions,
    type PanelBlockPaddings,
    type PanelSectionGaps,
    type SectionGaps,
    type TitleContentGap,
} from './layoutConfig';

export {
    BODY_STACK_GAP,
    FULL_BLEED_BAND_PADDINGS,
    LAYOUT_DIMENSIONS,
    PANEL_BLOCK_PADDINGS,
    PANEL_SECTION_GAPS,
    SECTION_GAPS,
    TITLE_CONTENT_GAP,
};
export type {
    BodyStackGap,
    FullBleedBandPaddings,
    LayoutDimensions,
    PanelBlockPaddings,
    PanelSectionGaps,
    SectionGaps,
    TitleContentGap,
};

const arStoryTellerPageStyle: CSSProperties = {
    ['--section-gap-mobile' as string]: SECTION_GAPS.mobile,
    ['--section-gap-tablet' as string]: SECTION_GAPS.tablet,
    ['--section-gap-desktop' as string]: SECTION_GAPS.desktop,
    ['--full-bleed-band-padding-y-mobile' as string]:
        FULL_BLEED_BAND_PADDINGS.y.mobile,
    ['--full-bleed-band-padding-y-tablet' as string]:
        FULL_BLEED_BAND_PADDINGS.y.tablet,
    ['--full-bleed-band-padding-y-desktop' as string]:
        FULL_BLEED_BAND_PADDINGS.y.desktop,
    ['--panel-section-gap-mobile' as string]: PANEL_SECTION_GAPS.mobile,
    ['--panel-section-gap-tablet' as string]: PANEL_SECTION_GAPS.tablet,
    ['--panel-section-gap-desktop' as string]: PANEL_SECTION_GAPS.desktop,
    ['--title-content-gap-mobile' as string]: TITLE_CONTENT_GAP.mobile,
    ['--title-content-gap-tablet' as string]: TITLE_CONTENT_GAP.tablet,
    ['--title-content-gap-desktop' as string]: TITLE_CONTENT_GAP.desktop,
    ['--body-stack-gap-mobile' as string]: BODY_STACK_GAP.mobile,
    ['--body-stack-gap-tablet' as string]: BODY_STACK_GAP.tablet,
    ['--body-stack-gap-desktop' as string]: BODY_STACK_GAP.desktop,
    ['--layout-max-width-mobile' as string]: LAYOUT_DIMENSIONS.mobile.maxWidth,
    ['--layout-max-width-tablet' as string]: LAYOUT_DIMENSIONS.tablet.maxWidth,
    ['--layout-max-width-desktop' as string]: LAYOUT_DIMENSIONS.desktop.maxWidth,
    ['--layout-margin-mobile' as string]: LAYOUT_DIMENSIONS.mobile.margin,
    ['--layout-margin-tablet' as string]: LAYOUT_DIMENSIONS.tablet.margin,
    ['--layout-margin-desktop' as string]: LAYOUT_DIMENSIONS.desktop.margin,
} as CSSProperties;

type ArStoryTellerPageProps = {
  projectData?: ArStoryTellerContent | null;
  onProjectHeaderLayersReady?: () => void;
};

export function ArStoryTellerPage({
  projectData = null,
  onProjectHeaderLayersReady,
}: ArStoryTellerPageProps) {
  const setLayoutState = useSetAtom(layoutState);
  const setHeaderState = useSetAtom(headerState);

  useEffect(() => {
    setLayoutState({ isFullWidth: true });
    setHeaderState({
      position: "absolute",
      isDark: true,
      logoPrimaryColor: "#D3D3D3",
      logoAccentColor: AR_STORY_TELLER_HEADER_LOGO.accent,
    });

    return () => {
      setLayoutState({ isFullWidth: false });
      setHeaderState({ ...defaultHeaderState });
    };
  }, [setLayoutState, setHeaderState]);

  const hasContent = projectData != null;

  return (
    <div className={styles['project-page']} style={arStoryTellerPageStyle}>
      <ProjectHeader onAllLayersReady={onProjectHeaderLayersReady} />
      {hasContent ? (
        <div className={styles['project-content']}>
          <OverviewSection
            data={{
              designChallenge: projectData.designChallenge,
              theProblem: projectData.theProblem,
              solution: projectData.solution,
            }}
          />
          <BusinessGoals data={projectData.businessGoals} />
          <ProjectOverviewSection data={{ projectOverview: projectData.projectOverview }} />
          <TeamSection data={{ team: projectData.team }} />
          <CaseStudyOverviewSection data={{ caseStudy: projectData.caseStudy }} />
          <DesignSystemSection data={{ caseStudy: projectData.caseStudy }} />
          <ConclusionsAndImpactSection data={{ caseStudy: projectData.caseStudy }} />
        </div>
      ) : null}
    </div>
  );
}
