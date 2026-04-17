"use client";

import React from "react";
import styles from "./automatic-seater-assignments.module.scss";
import ProjectAccessGate from "@/lib/access/ProjectAccessGate";
import { useResponsive } from "@/lib/responsive/ResponsiveQueryProvider";
import TestSignOutButton from "./components/Signout";
import ImageBanner from "./components/ImageBanner";
import OverviewSection from "./components/OverviewSection";
const PROJECT_ID = 4;
const PROJECT_KEY = "project_4";

export default function AutomaticSeaterAssignmentsPage() {
  const { isDesktopOrLaptop, isTablet, isMobile } = useResponsive();

  const viewportBand =
    isMobile ? "mobile" : isTablet ? "tablet" : isDesktopOrLaptop ? "desktop" : "unknown";

  return (
    <ProjectAccessGate
      projectId={PROJECT_ID}
      projectKey={PROJECT_KEY}
      title="Automatic Seating Assignments"
    >
      <div className={styles.page} data-viewport-band={viewportBand}>
        <div className={`${styles.banner} ${styles.bannerFullBleed}`}>
          <ImageBanner />
        </div>
        <div className={styles.overviewFullBleed}>
          <OverviewSection />
        </div>
        <div className={styles.container}>
          <TestSignOutButton />
        </div>
      </div>
    </ProjectAccessGate>
  );
}
