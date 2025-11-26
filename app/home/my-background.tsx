"use client";

import React from "react";
import styles from "./my-background.module.scss";

function MyBackground() {
  return (
    <section className={styles.myBackgroundSection} id="my-background">
      <div className={styles.content}>
        <h2 className={styles.heading}>My Background</h2>
        <p className={styles.placeholder}>
          This is a placeholder section for your background. Content coming soon.
        </p>
      </div>
    </section>
  );
}

export default MyBackground;
