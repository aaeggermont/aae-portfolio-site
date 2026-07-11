"use client";

import { useCallback, useEffect, useRef } from "react";
import { Box, Stack, Typography } from "@mui/material";

import {
  LAYOUT_DIMENSIONS,
  PROJECT_HEADER_EXTRA_TOP_PADDING,
  PROJECT_HEADER_NAV_CLEARANCE,
} from "@/app/projects/dcl-revenue-management/layoutConfig";
import { titleTypeSx } from "@/app/projects/dcl-revenue-management/typography";
import type { DclRevenueManagementDataProjectDocument } from "@/scripts/dcl-revenue-management.data";
import { breakpointMediaQuery } from "@/lib/responsive/breakpoints";
import ProjectImage from "@/lib/media/ProjectImage";

type ProjectHeaderProps = {
  data: DclRevenueManagementDataProjectDocument["projectHeader"];
  onReady?: () => void;
};

/**
 * Full-bleed illustrated banner hero with Maven Pro title / subtitle overlay
 * matching the DCL RMS mockup (upper-left on the sky).
 */
export default function ProjectHeader({ data, onReady }: ProjectHeaderProps) {
  const bannerRef = useRef<HTMLDivElement | null>(null);
  const reportedReadyRef = useRef(false);

  const reportReady = useCallback(() => {
    if (reportedReadyRef.current) return;
    reportedReadyRef.current = true;
    onReady?.();
  }, [onReady]);

  useEffect(() => {
    reportedReadyRef.current = false;

    let cancelled = false;
    let rafId = 0;
    let img: HTMLImageElement | null = null;
    let loadHandler: (() => void) | null = null;

    const finish = (target: HTMLImageElement) => {
      void target.decode?.().then(reportReady).catch(reportReady);
    };

    const attach = () => {
      if (cancelled) return;
      img = bannerRef.current?.querySelector("img") ?? null;
      if (!img) {
        rafId = requestAnimationFrame(attach);
        return;
      }

      if (img.complete && img.naturalWidth > 0) {
        finish(img);
        return;
      }

      loadHandler = () => finish(img!);
      img.addEventListener("load", loadHandler, { once: true });
      img.addEventListener("error", reportReady, { once: true });
    };

    attach();

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
      if (img && loadHandler) {
        img.removeEventListener("load", loadHandler);
      }
      if (img) {
        img.removeEventListener("error", reportReady);
      }
    };
  }, [data.banner.objectPath, reportReady]);

  const { banner, title, subtitle } = data;

  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        width: "100vw",
        maxWidth: "none",
        ml: "calc(50% - 50vw)",
        mr: "calc(50% - 50vw)",
        overflowX: "hidden",
        boxSizing: "border-box",
        bgcolor: "#FFFFFF",
      }}
    >
      <Box
        ref={bannerRef}
        sx={{
          position: "relative",
          width: "100%",
          maxWidth: LAYOUT_DIMENSIONS.desktop.maxWidth,
          mx: "auto",
          lineHeight: 0,
          "& img": {
            width: "100%",
            height: "auto",
            display: "block",
          },
        }}
      >
        <ProjectImage
          objectPath={banner.objectPath}
          alt={banner.alt}
          width={banner.width}
          height={banner.height}
          priority
          sizes="(max-width: 1260px) 100vw, 1260px"
          style={{
            width: "100%",
            height: "auto",
            objectFit: "contain",
          }}
        />

        <Stack
          component="header"
          spacing={{ xs: 0.5, md: 0.75 }}
          alignItems={{ xs: "center", md: "flex-start" }}
          sx={{
            position: "absolute",
            zIndex: 1,
            top: {
              // Mobile: 20% higher than the shared +10% offset → net −10% of banner height.
              xs: `calc(${PROJECT_HEADER_NAV_CLEARANCE.mobile} + ${PROJECT_HEADER_EXTRA_TOP_PADDING.mobile} - 10%)`,
              md: `calc(${PROJECT_HEADER_NAV_CLEARANCE.tablet} + ${PROJECT_HEADER_EXTRA_TOP_PADDING.tablet} + 10%)`,
              lg: `calc(${PROJECT_HEADER_NAV_CLEARANCE.desktop} + ${PROJECT_HEADER_EXTRA_TOP_PADDING.desktop} + 10%)`,
            },
            left: {
              xs: LAYOUT_DIMENSIONS.mobile.margin,
              md: LAYOUT_DIMENSIONS.tablet.margin,
              lg: LAYOUT_DIMENSIONS.desktop.margin,
            },
            right: {
              xs: LAYOUT_DIMENSIONS.mobile.margin,
              md: "auto",
            },
            maxWidth: { xs: "100%", md: 560, lg: 640 },
            textAlign: { xs: "center", md: "left" },
            pointerEvents: "none",
            [breakpointMediaQuery.desktopUp]: {
              left: LAYOUT_DIMENSIONS.desktop.margin,
            },
          }}
        >
          <Typography component="h1" sx={titleTypeSx("heroTitle")}>
            {title}
          </Typography>
          <Typography component="p" sx={titleTypeSx("heroSubtitle")}>
            {subtitle}
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
}
