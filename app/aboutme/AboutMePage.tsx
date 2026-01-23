// app/aboutme/AboutMePage.tsx
"use client";
import styles from "./aboutme.module.scss";

// Views
import { AboutMeIntro } from './components/AboutMeIntro';

export default function AboutMePage() {
  return <>
    <div className={styles.aboutMePage}>
      <section className={styles.content}>
        <AboutMeIntro />
      </section>
    </div>
  </>
}
