// app/(public)/ar-story-teller/page.tsx
"use client";

import { useEffect, useState } from 'react';
import ProjectAccessGate from "@/lib/access/ProjectAccessGate";
import ProjectImage from "@/lib/media/ProjectImage";
import fsReference from '../../../../firebase';
import { getDoc, doc, DocumentData } from "firebase/firestore";
import { ArStoryTellerPage } from "@/app/ar-story-teller/ArStoryTellerPage";

type ProjectDoc = DocumentData;

export default function ARStoryTellerRoute() {
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
      <ArStoryTellerPage projectData={projectData?.content} />
    </ProjectAccessGate>
  );
}
