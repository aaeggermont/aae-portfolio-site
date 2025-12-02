// app/aboutme/AboutMePage.tsx
"use client";

import React from "react";
import styles from "./aboutme.module.scss";

export default function AboutMePage() {
  return (
    <div className={styles.aboutMePage}>
      <section id="overview" className={styles.section}>
        <h1 className={styles.sectionTitle}>Overview</h1>
        <p className={styles.sectionBody}>
          {/* Your overview text here */}
        </p>
      </section>

      <section id="engineering-skills" className={styles.section}>
        <h2 className={styles.sectionTitle}>Engineering Skills</h2>
      </section>

      <section id="design-skills" className={styles.section}>
        <h2 className={styles.sectionTitle}>Design Skills</h2>
      </section>

      <section id="professional-experience" className={styles.section}>
        <h2 className={styles.sectionTitle}>Professional Experience</h2>
      </section>

      <section id="education" className={styles.section}>
        <h2 className={styles.sectionTitle}>Education</h2>
      </section>

      <section id="certifications" className={styles.section}>
        <h2 className={styles.sectionTitle}>Certifications</h2>
      </section>

      <section id="when-im-not-working" className={styles.section}>
        <h2 className={styles.sectionTitle}>When I’m Not Working</h2>
      </section>
    </div>
  );
}
