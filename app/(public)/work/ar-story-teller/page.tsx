"use client";

import React from "react";
import styles from "./ar-story-teller.module.scss";
import ProjectAccessGate from "@/app/lib/access/ProjectAccessGate";

const PROJECT_ID = 4;

export default function AutomaticSeaterAssignmentsPage() {
  return (
    <ProjectAccessGate
      projectId={4}
      projectKey="project_1"
      title="AR Magic Tours"
    >
      <main className={styles.page}>
        <div className={styles.container}>
          <header className={styles.hero}>
            <h1 className={styles.title}>AR Magic Tours</h1>
            <p>hello world</p>
          </header>
        </div>
      </main>
    </ProjectAccessGate>
  );
}
