"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { doc, getDoc, type DocumentData } from "firebase/firestore";

import { ArStoryTellerPage } from "@/app/projects/ar-story-teller/ArStoryTellerPage";
import { LandingSplash } from "@/components/LandingSplash/LandingSplash";
import ProjectAccessGate from "@/lib/access/ProjectAccessGate";
import { useProjectAccess } from "@/lib/access/ProjectAccessContext";
import { preloadArStoryTellerHeroAssets } from "@/app/projects/ar-story-teller/lib/preloadArStoryTellerAssets";
import type { ViewportBand } from "@/app/projects/ar-story-teller/lib/projectHeaderPreloadUrls";
import { useResponsive } from "@/lib/responsive/ResponsiveQueryProvider";
import { useLoadingSplash } from "@/lib/loadingSplash/useLoadingSplash";
import fsReference from "@/firebase";

type ProjectDoc = DocumentData;

const FIRESTORE_DOC_ID = "project_1";

function resolveViewportBand(
  isMobile: boolean,
  isTablet: boolean,
  isDesktopOrLaptop: boolean,
): ViewportBand {
  if (isMobile) return "mobile";
  if (isTablet) return "tablet";
  if (isDesktopOrLaptop) return "desktop";
  return "desktop";
}

function ArStoryTellerRouteContent() {
  const { projectKey, visibility } = useProjectAccess();
  const { isMobile, isTablet, isDesktopOrLaptop } = useResponsive();
  const viewportBand = resolveViewportBand(
    isMobile,
    isTablet,
    isDesktopOrLaptop,
  );

  const [projectData, setProjectData] = useState<ProjectDoc | null>(null);
  const [hasError, setHasError] = useState(false);

  const firestoreLoadRef = useRef<Promise<ProjectDoc> | null>(null);
  if (firestoreLoadRef.current === null) {
    firestoreLoadRef.current = getDoc(
      doc(fsReference, "projects_content", FIRESTORE_DOC_ID),
    ).then((snap) => {
      if (!snap.exists()) {
        throw new Error(`Missing Firestore document: projects_content/${FIRESTORE_DOC_ID}`);
      }
      return snap.data();
    });
  }

  const waitFor = useCallback(async () => {
    const data = await firestoreLoadRef.current!;
    setProjectData(data);
    await preloadArStoryTellerHeroAssets({
      projectKey,
      visibility,
      viewportBand,
    });
  }, [projectKey, visibility, viewportBand]);

  useEffect(() => {
    firestoreLoadRef.current?.catch(() => setHasError(true));
  }, []);

  useEffect(() => {
    if (hasError) {
      document.body.style.overflow = "";
    }
  }, [hasError]);

  const { phase, isLocked, splashPhase, onFadeEnd } = useLoadingSplash({
    waitFor,
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

  const arStoryTellerContent = projectData?.content;

  return (
    <>
      {arStoryTellerContent ? (
        <div aria-hidden={isLocked} inert={isLocked ? true : undefined}>
          <ArStoryTellerPage projectData={arStoryTellerContent} />
        </div>
      ) : null}

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

export default function ARStoryTellerRoute() {
  return (
    <ProjectAccessGate
      projectId={4}
      projectKey="project_1"
      title="AR Story Teller"
    >
      <ArStoryTellerRouteContent />
    </ProjectAccessGate>
  );
}
