// app/home/my-background.tsx
"use client";

import React from "react";
import styles from "./my-background.module.scss";
import { useResponsive } from "@/app/lib/responsive/ResponsiveQueryProvider";

function MyBackground() {
  const { isMobile, isTablet, isDesktopOrLaptop } = useResponsive();

  return (
    <section className={styles.myBackgroundSection} id="my-background">
      <div className={styles.content}>
        <h2 className={styles.heading}>My Background</h2>
        <p className={styles.placeholder}>
          This is a placeholder section for your background. Content coming soon.
        </p>
        <p className={styles.placeholder}>
          {isMobile && "Viewing on mobile – show condensed layout here."}
          {isTablet && !isMobile && "Viewing on tablet – maybe adjust columns."}
          {isDesktopOrLaptop && "Viewing on desktop/laptop – full layout."}
        </p>
      </div>
    </section>
  );
}

export default MyBackground;
