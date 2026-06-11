"use client";

import Box from "@mui/material/Box";

import Overview from "@/app/projects/finding-nemo/components/Overview";
import ProjectHeader from "@/app/projects/finding-nemo/components/ProjectHeader";
import type { FindingNemoProjectDocument } from "@/app/projects/finding-nemo/lib/finding-nemo.firestore";

type FindingNemoPageProps = {
  project: FindingNemoProjectDocument | null;
  onProjectHeaderReady?: () => void;
};

export function FindingNemoPage({
  project,
  onProjectHeaderReady,
}: FindingNemoPageProps) {
  const hasProject = project != null;

  return (
    <Box component="main">
      {hasProject ? (
        <>
          <ProjectHeader
            data={project.projectHeader}
            onReady={onProjectHeaderReady}
          />
          <Overview data={project.overview} />
        </>
      ) : null}
    </Box>
  );
}
