// app/(public)/work/automatic-seater-assignments/page.tsx
"use client";

import React from "react";
import { useEffect, useState } from 'react';
import styles from "./automatic-seater-assignments.module.scss";
import ProjectAccessGate from "@/lib/access/ProjectAccessGate";
import fsReference from '../../../../firebase';
import { collection, where, getDoc, onSnapshot, orderBy, query, deleteDoc, doc, DocumentData } from "firebase/firestore";
  
const PROJECT_ID = 1;
const PROJECT_KEY = "project_1";
type ProjectDoc = DocumentData;

export default function ArStoryTellerPage() {
  const [projectData, setProjectData] = useState<ProjectDoc | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  /* Firebase data fetching */
  useEffect(() => {
    const docRef = doc(fsReference, 'projects_content', 'project_1');
    getDoc(docRef)
      .then((doc) => {
        if (!doc.exists()) {
          setHasError(true);
          return;
        }
        console.log("Document data:", doc.data());
        setProjectData(doc.data());
        setIsLoading(false);
      })
      .catch(() => setHasError(true));
    },[]);

    if (isLoading) {
        return <p>loading...</p>
    }

    if (hasError) {
        return <p>Has error!</p>
    }


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
