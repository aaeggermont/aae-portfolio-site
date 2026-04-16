"use client";

import React from "react";
import styles from "./automatic-seater-assignments.module.scss";
import ProjectAccessGate from "@/lib/access/ProjectAccessGate";
import TestSignOutButton from "./components/Signout";
import ImageBanner from "./components/ImageBanner";

const PROJECT_ID = 4;
const PROJECT_KEY = "project_4";

export default function AutomaticSeaterAssignmentsPage() {
  return (
    <ProjectAccessGate
      projectId={PROJECT_ID}
      projectKey={PROJECT_KEY}
      title="Automatic Seating Assignments"
    >
      <div className={styles.page}>
        <div className={`${styles.banner} ${styles.bannerFullBleed}`}>
          <ImageBanner />
        </div>
        <div className={styles.container}>
          <TestSignOutButton />
        </div>
      </div>
    </ProjectAccessGate>
  );
}
