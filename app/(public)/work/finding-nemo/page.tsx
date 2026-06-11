"use client";

import { FindingNemoPage } from "@/app/projects/finding-nemo/FindingNemoPage";
import ProjectAccessGate from "@/lib/access/ProjectAccessGate";
import { findingNemoDataProject } from "@/scripts/project-2.data";

export default function FindingNemoRoute() {
  const { project, gateTitle } = findingNemoDataProject;

  return (
    <ProjectAccessGate
      projectId={project.projectId}
      projectKey={project.projectKey}
      title={gateTitle}
    >
      <FindingNemoPage />
    </ProjectAccessGate>
  );
}
