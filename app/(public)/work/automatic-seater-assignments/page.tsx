"use client";

import React from "react";
import styles from "./automatic-seater-assignments.module.scss";
import ProjectAccessGate from "@/lib/access/ProjectAccessGate";
import TestSignOutButton from "./components/Signout";
import ImageBanner from "./components/ImageBanner";
import { GatedImage } from "./components/GatedImage";

const PROJECT_ID = 4;
const PROJECT_KEY = "project_4";

export default function AutomaticSeaterAssignmentsPage() {
  return (
    <ProjectAccessGate
      projectId={PROJECT_ID}
      projectKey={PROJECT_KEY}
      title="Automatic Seating Assignments"
    >
      <main className={styles.page}>
        <div className={styles.container}>
          <div className={styles.banner}>
            {/*
            <ImageBanner />
            */}
            <GatedImage
              projectKey={PROJECT_KEY}
              objectPath="projects/project_4/STBannerDesktop.png"
              alt="STBannerDesktop.png"
              width={400}
              height={600}
            />
          </div>
          <TestSignOutButton />
        </div>
      </main>
    </ProjectAccessGate>
  );
}
