"use client";

import React from "react";
import styles from "./latest-projects.module.scss";

function LatestProjects() {
  return (
    <section className={styles.latestProjectsSection} id="latest-projects">
      <div className={styles.content}>
        <h2 className={styles.heading}>Latest Projects</h2>
        <p className={styles.placeholder}>
          This is a placeholder section for your latest projects. Content coming soon.
        </p>
      </div>
    </section>
  );
}

export default LatestProjects;
