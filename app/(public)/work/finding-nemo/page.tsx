"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { FindingNemoPage } from "@/app/projects/finding-nemo/FindingNemoPage";
import {
  subscribeFindingNemoProject,
  type FindingNemoProjectDocument,
} from "@/app/projects/finding-nemo/lib/finding-nemo.firestore";
import { createProjectHeaderReadyGate } from "@/app/projects/finding-nemo/lib/projectHeaderReady";
import { LandingSplash } from "@/components/LandingSplash/LandingSplash";
import ProjectAccessGate from "@/lib/access/ProjectAccessGate";
import { useLoadingSplash } from "@/lib/loadingSplash/useLoadingSplash";

const PROJECT_ID = 2;
const PROJECT_KEY = "project_2";
const GATE_TITLE = "Finding Nemo: Shark Scenes";

function FindingNemoRouteContent() {
  const [project, setProject] = useState<FindingNemoProjectDocument | null>(null);
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

    const unsubscribe = subscribeFindingNemoProject(
      (nextProject) => {
        setProject(nextProject);
        setHasError(false);
        ready.resolve();
      },
      (error) => {
        setHasError(true);
        ready.reject(error);
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
        <FindingNemoPage
          project={project}
          onProjectHeaderReady={handleProjectHeaderReady}
        />
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

export default function FindingNemoRoute() {
  return (
    <ProjectAccessGate
      projectId={PROJECT_ID}
      projectKey={PROJECT_KEY}
      title={GATE_TITLE}
    >
      <FindingNemoRouteContent />
    </ProjectAccessGate>
  );
}
