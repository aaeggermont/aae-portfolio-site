"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { DclRevenueManagementPage } from "@/app/projects/dcl-revenue-management/DclRevenueManagementPage";
import {
  subscribeDclRevenueManagementProject,
  type DclRevenueManagementProjectDocument,
} from "@/app/projects/dcl-revenue-management/lib/dcl-revenue-management.firestore";
import { createProjectHeaderReadyGate } from "@/app/projects/dcl-revenue-management/lib/projectHeaderReady";
import { LandingSplash } from "@/components/LandingSplash/LandingSplash";
import ProjectAccessGate from "@/lib/access/ProjectAccessGate";
import { useLoadingSplash } from "@/lib/loadingSplash/useLoadingSplash";
import { dclRevenueManagementDataProject } from "@/scripts/dcl-revenue-management.data";

function DclRevenueManagementRouteContent() {
  const [project, setProject] = useState<DclRevenueManagementProjectDocument | null>(
    null,
  );
  const [hasError, setHasError] = useState(false);

  const contentReadyRef = useRef<{
    promise: Promise<void>;
    resolve: () => void;
    reject: (error: Error) => void;
  } | null>(null);

  if (contentReadyRef.current === null) {
    let resolveReady!: () => void;
    let rejectReady!: (error: Error) => void;
    const promise = new Promise<void>((resolve, reject) => {
      resolveReady = resolve;
      rejectReady = reject;
    });
    contentReadyRef.current = {
      promise,
      resolve: resolveReady,
      reject: rejectReady,
    };
  }

  const headerReadyRef = useRef(createProjectHeaderReadyGate());

  useEffect(() => {
    const ready = contentReadyRef.current!;

    const unsubscribe = subscribeDclRevenueManagementProject(
      (projectFromDb) => {
        setProject(projectFromDb);
        setHasError(false);
        ready.resolve();
      },
      (error) => {
        console.warn(
          "[dcl-revenue-management] Firestore realtime read failed; using local fallback data.",
          error,
        );
        setProject(dclRevenueManagementDataProject);
        setHasError(false);
        ready.resolve();
      },
    );

    return unsubscribe;
  }, []);

  const handleProjectHeaderReady = useCallback(() => {
    headerReadyRef.current.markReady();
  }, []);

  const waitFor = useCallback(async () => {
    await Promise.all([
      contentReadyRef.current!.promise,
      headerReadyRef.current.promise,
    ]);
  }, []);

  const handleSplashError = useCallback(() => {
    setHasError(true);
  }, []);

  useEffect(() => {
    if (hasError) {
      document.body.style.overflow = "";
    }
  }, [hasError]);

  const { phase, isLocked, splashPhase, onFadeEnd } = useLoadingSplash({
    waitFor,
    onError: handleSplashError,
  });

  if (hasError) {
    return (
      <Box sx={{ minHeight: "60vh", display: "grid", placeItems: "center", px: 2 }}>
        <Typography variant="body1" color="text.secondary" textAlign="center">
          Unable to load this project. Please try again later.
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <div aria-hidden={isLocked} inert={isLocked ? true : undefined}>
        {project ? (
          <DclRevenueManagementPage
            project={project}
            onProjectHeaderReady={handleProjectHeaderReady}
          />
        ) : null}
      </div>

      {phase !== "done" && !hasError && (
        <LandingSplash
          phase={splashPhase}
          onFadeEnd={onFadeEnd}
          label="Loading project"
        />
      )}
    </>
  );
}

export default function DclRevenueManagementRoute() {
  return (
    <ProjectAccessGate
      projectId={dclRevenueManagementDataProject.project.projectId}
      projectKey={dclRevenueManagementDataProject.project.projectKey}
      title={dclRevenueManagementDataProject.gateTitle}
    >
      <DclRevenueManagementRouteContent />
    </ProjectAccessGate>
  );
}
