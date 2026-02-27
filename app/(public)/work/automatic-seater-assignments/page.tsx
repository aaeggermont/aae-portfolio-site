// app/(public)/work/automatic-seater-assignments/page.tsx
"use client";

import React from "react";
import styles from "./automatic-seater-assignments.module.scss";
import ProjectAccessGate from "@/lib/access/ProjectAccessGate";

const PROJECT_ID = 4;

export default function AutomaticSeaterAssignmentsPage() {
  return (
    <ProjectAccessGate
      projectId={4}
      projectKey="project_4"
      title="Automatic Seater Assignments"
    >
      <main className={styles.page}>
        <div className={styles.container}>
          <header className={styles.hero}>
            <h1 className={styles.title}>Automatic Seater Assignments</h1>
            <p>hello world</p>
          </header>
        </div>
      </main>
    </ProjectAccessGate>
  );
}
