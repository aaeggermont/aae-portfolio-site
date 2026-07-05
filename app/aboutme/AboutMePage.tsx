// app/aboutme/AboutMePage.tsx
"use client";

import { useEffect } from "react";
import { useSetAtom } from "jotai";

import styles from "./aboutme.module.scss";
import { layoutState } from "@/app/(public)/layout-state";

// Views
import { AboutMeIntro } from './components/AboutMeIntro';
import { AboutMeLocation } from './components/AboutMeLocation';
import { AboutMeEngineeringSkills } from './components/AboutMeEngineeringSkills';
import { AboutMeDesignSkills } from './components/AboutMeDesignSkills';
import { AboutMeMore } from './components/AboutMeMore';

export default function AboutMePage() {
  const setLayoutState = useSetAtom(layoutState);

  useEffect(() => {
    setLayoutState({ isFullWidth: true });
    return () => setLayoutState({ isFullWidth: false });
  }, [setLayoutState]);

  return <>
    <div className={styles.aboutMePage}>
      <section className={styles.aboutMePageContent}>
        <AboutMeIntro />
        <AboutMeLocation />
        <AboutMeEngineeringSkills />
        <AboutMeDesignSkills />
        <AboutMeMore />
      </section>
    </div>
  </>
}
