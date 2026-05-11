"use client";

import styles from './ArStoryTeller.module.scss';
import { ProjectHeader } from './components/ProjectHeader';
import { OverviewSection } from './components/sections/OverviewSection';
import { TeamSection } from './components/sections/TeamSection';
import { ProjectOverviewSection } from './components/sections/ProjectOverviewSection'; 
import { CaseStudyOverviewSection } from './components/sections/CaseStudyOverviewSection';
import { NotificationsSection } from './components/sections/NotificationsSection';
import { MagicExperiencesSection } from './components/sections/MagicExperiencesSection';
import { DesignSystemSection } from './components/sections/DesignSystemSection';
import { NextStepsSection } from './components/sections/NextStepsSection';
import { useSetAtom } from "jotai";
import { useEffect } from "react";
import { layoutState } from "@/app/(public)/layout-state";
import { headerState } from '@/components/Header/HeaderState';
import { DocumentData } from 'firebase-admin/firestore';

type ProjectDoc = DocumentData;

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
            <div className={styles['project-content']}>
              <OverviewSection data={{ designChallenge, theProblem, solution }} />
              <TeamSection data={{ team }} />
              <ProjectOverviewSection  />
              <CaseStudyOverviewSection data={{ caseStudy }} />
              <MagicExperiencesSection data={{ caseStudy }} />

               
              <NotificationsSection data={{ caseStudy }} />

              {/* 
             
           
              <DesignSystemSection data={{ caseStudy }} />
              <NextStepsSection data={{ nextSteps }} /> 
               */}
            </div>
        </div>
    )
}