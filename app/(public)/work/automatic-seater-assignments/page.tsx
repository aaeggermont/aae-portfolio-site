"use client";

import React from "react";
import styles from "./ar-story-teller.module.scss";
import ProjectAccessGate from "@/lib/access/ProjectAccessGate";
import Image from "next/image";
import { GatedImage } from "./components/GatedImage";
import TestSignOutButton from "./components/Signout";
import ProjectImage from "@/lib/media/ProjectImage";

const PROJECT_ID = 4;
const PROJECT_KEY = "project_4";

export default function AutomaticSeaterAssignmentsPage() {
  return (
    <ProjectAccessGate
      projectId={4}
      projectKey="project_4"
      title="Automatic Seating Assignments"
    >
      <main className={styles.page}>
        <div className={styles.container}>
          <header className={styles.hero}>
            <h1 className={styles.title}>Automatic Seating Assignments</h1>
            <p>hello world</p>

            <ProjectImage
              objectPath="projects/project_4/GenericTaskFlow.png"
              alt="GenericTaskFlow.png"
              width={1600}
              height={900}
              priority
            />
          </header>
          <TestSignOutButton />
        </div>
      </main>
    </ProjectAccessGate>
  );
}
