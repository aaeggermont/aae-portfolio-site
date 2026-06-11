"use client";

import Box from "@mui/material/Box";

import Overview from "@/app/projects/finding-nemo/components/Overview";
import ProjectHeader from "@/app/projects/finding-nemo/components/ProjectHeader";
import { findingNemoDataProject } from "@/scripts/project-2.data";

export function FindingNemoPage() {
  const project = findingNemoDataProject;

  return (
    <Box component="main">
      <ProjectHeader data={project.projectHeader} />
      <Overview data={project.overview} />
    </Box>
  );
}
