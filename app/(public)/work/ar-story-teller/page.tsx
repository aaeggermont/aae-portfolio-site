"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { ArStoryTellerPage } from "@/app/projects/ar-story-teller/ArStoryTellerPage";
import { subscribeArStoryTellerProject } from "@/app/projects/ar-story-teller/lib/ar-story-teller.firestore";
import { createProjectHeaderLayersReadyGate } from "@/app/projects/ar-story-teller/lib/projectHeaderLayersReady";
import { preloadArStoryTellerCaseStudyBanner } from "@/app/projects/ar-story-teller/lib/preloadArStoryTellerAssets";
import type { ViewportBand } from "@/app/projects/ar-story-teller/lib/projectHeaderPreloadUrls";
import { LandingSplash } from "@/components/LandingSplash/LandingSplash";
import ProjectAccessGate from "@/lib/access/ProjectAccessGate";
import { useProjectAccess } from "@/lib/access/ProjectAccessContext";
import { useResponsive } from "@/lib/responsive/ResponsiveQueryProvider";
import type { ArStoryTellerContent } from "@/app/projects/ar-story-teller/types/arStoryTellerContent";
import { useLoadingSplash } from "@/lib/loadingSplash/useLoadingSplash";

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

  const [content, setContent] = useState<ArStoryTellerContent | null>(null);
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

  const headerLayersReadyRef = useRef(createProjectHeaderLayersReadyGate());
  const prevViewportBandRef = useRef(viewportBand);

  useEffect(() => {
    if (prevViewportBandRef.current === viewportBand) return;
    prevViewportBandRef.current = viewportBand;
    headerLayersReadyRef.current = createProjectHeaderLayersReadyGate();
  }, [viewportBand]);

  const bannerPreloadRef = useRef<Promise<void> | null>(null);

  useEffect(() => {
    bannerPreloadRef.current = preloadArStoryTellerCaseStudyBanner({
      projectKey,
      visibility,
    });
  }, [projectKey, visibility]);

  useEffect(() => {
    const ready = contentReadyRef.current!;

    const unsubscribe = subscribeArStoryTellerProject(
      (nextContent) => {
        setContent(nextContent);
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

  const handleProjectHeaderLayersReady = useCallback(() => {
    headerLayersReadyRef.current.markReady();
  }, []);

  const waitFor = useCallback(async () => {
    await Promise.all([
      contentReadyRef.current!.promise,
      headerLayersReadyRef.current.promise,
      bannerPreloadRef.current ??
        preloadArStoryTellerCaseStudyBanner({ projectKey, visibility }),
    ]);
  }, [projectKey, visibility]);

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
        <ArStoryTellerPage
          projectData={content}
          onProjectHeaderLayersReady={handleProjectHeaderLayersReady}
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
