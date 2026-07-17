"use client";

import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { AutomaticSeaterAssignmentsPage } from "@/app/projects/automatic-seater-assignments/AutomaticSeaterAssignmentsPage";
import {
  subscribeAutomaticSeaterAssignmentsProject,
  type AutomaticSeaterAssignmentsProjectDocument,
} from "@/app/projects/automatic-seater-assignments/lib/automatic-seater-assignments.firestore";
import {
  AUTOMATIC_SEATER_GATE_TITLE,
  AUTOMATIC_SEATER_PROJECT_ID,
  AUTOMATIC_SEATER_PROJECT_KEY,
} from "@/app/projects/automatic-seater-assignments/types/automaticSeaterAssignmentsContent";
import ProjectAccessGate from "@/lib/access/ProjectAccessGate";

function AutomaticSeaterAssignmentsRouteContent() {
  const [project, setProject] =
    useState<AutomaticSeaterAssignmentsProjectDocument | null>(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeAutomaticSeaterAssignmentsProject(
      (projectFromDb) => {
        setProject(projectFromDb);
        setHasError(false);
      },
      (error) => {
        console.warn(
          "[automatic-seater-assignments] Firestore realtime read failed.",
          error,
        );
        setHasError(true);
      },
    );

    return unsubscribe;
  }, []);

  if (hasError) {
    return (
      <Box
        sx={{
          minHeight: "60vh",
          display: "grid",
          placeItems: "center",
          px: 2,
        }}
      >
        <Typography variant="body1" color="text.secondary" textAlign="center">
          Unable to load this project. Please try again later.
        </Typography>
      </Box>
    );
  }

  if (!project) {
    return null;
  }

  return <AutomaticSeaterAssignmentsPage project={project} />;
}

export default function AutomaticSeaterAssignmentsRoute() {
  return (
    <ProjectAccessGate
      projectId={AUTOMATIC_SEATER_PROJECT_ID}
      projectKey={AUTOMATIC_SEATER_PROJECT_KEY}
      title={AUTOMATIC_SEATER_GATE_TITLE}
    >
      <AutomaticSeaterAssignmentsRouteContent />
    </ProjectAccessGate>
  );
}
