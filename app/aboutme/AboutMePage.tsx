// app/aboutme/AboutMePage.tsx
"use client";

import { useEffect } from "react";
import { useSetAtom } from "jotai";

import styles from "./aboutme.module.scss";
import { layoutState } from "@/app/(public)/layout-state";

// Views
import { AboutMeIntro } from './components/AboutMeIntro';
// Temporary: hide location map while iterating on Capability Map
// import { AboutMeLocation } from './components/AboutMeLocation';
import { CapabilityMap } from './components/CapabilityMap';
import { AboutMeMore } from './components/AboutMeMore';
import ContactMe from '@/app/home/contact-me';
import { SectionActionLink } from '@/components/SectionActionLink/SectionActionLink';

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
        {/* Temporary: hide location map while iterating on Capability Map */}
        {/* <AboutMeLocation /> */}
        <CapabilityMap />
        <AboutMeMore />
      </section>
      <div className={styles.viewAllWorkRow}>
        <SectionActionLink href="/mywork" label="View all work" tone="navy" />
      </div>
    </div>
    <ContactMe />
  </>
}
