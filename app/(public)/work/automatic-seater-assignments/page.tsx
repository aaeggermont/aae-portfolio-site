"use client";

import React from "react";

import { AutomaticSeaterAssignmentsPage } from "@/app/projects/automatic-seater-assignments/AutomaticSeaterAssignmentsPage";
import {
  subscribeAutomaticSeaterAssignmentsProject,
  type AutomaticSeaterAssignmentsProjectDocument,
} from "@/app/projects/automatic-seater-assignments/lib/automatic-seater-assignments.firestore";
import ProjectAccessGate from "@/lib/access/ProjectAccessGate";
import { automaticSeaterAssignmentsDataProject } from "@/scripts/automatic-seater-assignments.data";

function AutomaticSeaterAssignmentsRouteContent() {
  const [project, setProject] = React.useState<AutomaticSeaterAssignmentsProjectDocument>(
    automaticSeaterAssignmentsDataProject,
  );

  React.useEffect(() => {
    const unsubscribe = subscribeAutomaticSeaterAssignmentsProject(
      (projectFromDb) => {
        setProject(projectFromDb);
      },
      (error) => {
        console.warn(
          "[automatic-seater-assignments] Firestore realtime read failed; using local fallback data.",
          error,
        );
      },
    );

    return unsubscribe;
  }, []);

  return <AutomaticSeaterAssignmentsPage project={project} />;
}

export default function AutomaticSeaterAssignmentsRoute() {
  return (
    <ProjectAccessGate
      projectId={automaticSeaterAssignmentsDataProject.project.projectId}
      projectKey={automaticSeaterAssignmentsDataProject.project.projectKey}
      title={automaticSeaterAssignmentsDataProject.gateTitle}
    >
      <AutomaticSeaterAssignmentsRouteContent />
    </ProjectAccessGate>
  );
}
