// app/aboutme/AboutMePage.tsx
"use client";
import styles from "./aboutme.module.scss";

// Views
import { AboutMeIntro } from './components/AboutMeIntro';
import { AboutMeLocation } from './components/AboutMeLocation';

export default function AboutMePage() {
  return <>
    <div className={styles.aboutMePage}>
      <section className={styles.content}>
        <AboutMeIntro />
        <AboutMeLocation />
      </section>
    </div>
  </>
}
