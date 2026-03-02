"use client";

import { ProjectHeader } from './components/ProjectHeader';
import { OverviewSection } from './components/sections/OverviewSection';
import designChallenge from './data/designChallenge';
import theProblem from './data/theProblem';
import solution from './data/solution';
import team from './data/team';
import { TeamSection } from './components/sections/TeamSection';
import { CaseStudyOverviewSection } from './components/sections/CaseStudyOverviewSection';
import caseStudy from './data/caseStudy';
import { NotificationsSection } from './components/sections/NotificationsSection';
import { MagicExperiencesSection } from './components/sections/MagicExperiencesSection';
import { DesignSystemSection } from './components/sections/DesignSystemSection';
import { NextStepsSection } from './components/sections/NextStepsSection';
import nextSteps from './data/nextSteps';
import { useSetAtom } from "jotai";
import { useEffect } from "react";
import { layoutState } from "@/app/(public)/layout-state";
import { headerState } from '@/components/Header/HeaderState';

export function ArStoryTellerPage() {
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

    return (
        <div style={{ paddingBottom: '200px' }}>
            <ProjectHeader />
            <div className='global-container'>
              <OverviewSection data={{ designChallenge, theProblem, solution }} />
              <TeamSection data={{ team }} />
              <CaseStudyOverviewSection data={{ caseStudy }} />
              <NotificationsSection data={{ caseStudy }} />
              <MagicExperiencesSection data={{ caseStudy }} />
              <DesignSystemSection data={{ caseStudy }} />
              <NextStepsSection data={{ nextSteps, caseStudy }} />
            </div>
        </div>
    )
}