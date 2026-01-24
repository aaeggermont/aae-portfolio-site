// app/aboutme/AboutMePage.tsx
"use client";
import styles from "./aboutme.module.scss";

// Views
import { AboutMeIntro } from './components/AboutMeIntro';
import { AboutMeLocation } from './components/AboutMeLocation';
import { AboutMeEngineeringSkills } from './components/AboutMeEngineeringSkills';
import { AboutMeDesignSkills } from './components/AboutMeDesignSkills';

export default function AboutMePage() {
  return <>
    <div className={styles.aboutMePage}>
      <section className={styles.content}>
        <AboutMeIntro />
        <AboutMeLocation />
        <AboutMeEngineeringSkills />
        <AboutMeDesignSkills />
      </section>
    </div>
  </>
}
