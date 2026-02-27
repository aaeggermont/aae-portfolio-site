// app/(public)/work/automatic-seater-assignments/page.tsx
"use client";

import React from "react";
import styles from "./automatic-seater-assignments.module.scss";
import ProjectAccessGate from "@/lib/access/ProjectAccessGate";

const PROJECT_ID = 1;
const PROJECT_KEY = "project_1";

export default function ArStoryTellerPage() {
  return (
    <ProjectAccessGate
      projectId={4}
      projectKey="project_1"
      title="AR Story Teller"
    >
      <main className={styles.page}>
        <div className={styles.container}>
          <header className={styles.hero}>
            <h1 className={styles.title}>AR Story Teller</h1>
            <p>hello world</p>
          </header>
        </div>
      </main>
    </ProjectAccessGate>
  );
}
