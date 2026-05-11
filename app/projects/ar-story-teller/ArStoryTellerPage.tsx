"use client";

import styles from './ArStoryTeller.module.scss';
import { ProjectHeader } from './components/ProjectHeader';
import { OverviewSection } from './components/sections/OverviewSection';
import { TeamSection } from './components/sections/TeamSection';
import { ProjectOverviewSection } from './components/sections/ProjectOverviewSection'; 
import { CaseStudyOverviewSection } from './components/sections/CaseStudyOverviewSection';
import { NotificationsSection } from './components/sections/NotificationsSection';
import { DesignSystemSection } from './components/sections/DesignSystemSection';
import { NextStepsSection } from './components/sections/NextStepsSection';
import { useSetAtom } from "jotai";
import { useEffect, type CSSProperties } from "react";
import { layoutState } from "@/app/(public)/layout-state";
import { headerState } from '@/components/Header/HeaderState';
import { DocumentData } from 'firebase-admin/firestore';
import {
    LAYOUT_DIMENSIONS,
    SECTION_GAPS,
    type LayoutDimensions,
    type SectionGaps,
} from './layoutConfig';

export { LAYOUT_DIMENSIONS, SECTION_GAPS };
export type { LayoutDimensions, SectionGaps };

type ProjectDoc = DocumentData;

/* Cast helper — CSS custom properties aren't part of React's `CSSProperties` type, so
   we widen the literal once at the boundary instead of sprinkling `as` casts inline.
   Both spacing concerns (vertical gaps + horizontal layout dimensions) ride on the same
   element (`.project-content`), so we emit a single style object rather than spreading
   two. */
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

export function ArStoryTellerPage({ projectData = {} }: { projectData: ProjectDoc }) {
  const setLayoutState = useSetAtom(layoutState);
  const setHeaderState = useSetAtom(headerState);

  useEffect(() => {
    // 1. Al entrar a la ruta, establecemos los valores específicos de la página
    setLayoutState({ isFullWidth: true });
    setHeaderState({ position: 'absolute', isDark: true });

    // 2. Al salir de la ruta (unmount), reseteamos los valores a los por defecto
    return () => {
      setLayoutState({ isFullWidth: false });
      setHeaderState({ position: 'relative', isDark: false });
    };
  }, [setLayoutState, setHeaderState]);

  

  const { designChallenge, theProblem, solution, team, nextSteps, caseStudy, projectOverview} = projectData;

    return (
        <div>
            <ProjectHeader />
            <div className={styles['project-content']} style={projectContentStyle}>
              <OverviewSection data={{ designChallenge, theProblem, solution }} />
              <TeamSection data={{ team }} />
              <ProjectOverviewSection  />
              <CaseStudyOverviewSection data={{ caseStudy }} />

              {/* 
             
           
              <DesignSystemSection data={{ caseStudy }} />
              <NextStepsSection data={{ nextSteps }} /> 
               */}
            </div>
        </div>
    )
}