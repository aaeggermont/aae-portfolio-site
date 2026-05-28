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
import { headerState } from '@/components/Header/HeaderState';
import type { ArStoryTellerContent } from '@/app/projects/ar-story-teller/types/arStoryTellerContent';
import BusinessGoals from './components/sections/BusinessGoals';
import {
    LAYOUT_DIMENSIONS,
    PANEL_BLOCK_PADDINGS,
    SECTION_GAPS,
    type LayoutDimensions,
    type PanelBlockPaddings,
    type SectionGaps,
} from './layoutConfig';

export { LAYOUT_DIMENSIONS, PANEL_BLOCK_PADDINGS, SECTION_GAPS };
export type { LayoutDimensions, PanelBlockPaddings, SectionGaps };

const projectContentStyle: CSSProperties = {
    ['--section-gap-mobile' as string]: SECTION_GAPS.mobile,
    ['--section-gap-tablet' as string]: SECTION_GAPS.tablet,
    ['--section-gap-desktop' as string]: SECTION_GAPS.desktop,
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
    setHeaderState({ position: 'absolute', isDark: true });

    return () => {
      setLayoutState({ isFullWidth: false });
      setHeaderState({ position: 'relative', isDark: false });
    };
  }, [setLayoutState, setHeaderState]);

  const hasContent = projectData != null;

  return (
    <div>
      <ProjectHeader onAllLayersReady={onProjectHeaderLayersReady} />
      {hasContent ? (
        <div className={styles['project-content']} style={projectContentStyle}>
          <OverviewSection
            data={{
              designChallenge: projectData.designChallenge,
              theProblem: projectData.theProblem,
              solution: projectData.solution,
            }}
          />
          <BusinessGoals data={projectData.businessGoals} />
          <TeamSection data={{ team: projectData.team }} />
          <ProjectOverviewSection data={{ projectOverview: projectData.projectOverview }} />
          <CaseStudyOverviewSection data={{ caseStudy: projectData.caseStudy }} />
          <DesignSystemSection data={{ caseStudy: projectData.caseStudy }} />
          <ConclusionsAndImpactSection data={{ caseStudy: projectData.caseStudy }} />
        </div>
      ) : null}
    </div>
  );
}
