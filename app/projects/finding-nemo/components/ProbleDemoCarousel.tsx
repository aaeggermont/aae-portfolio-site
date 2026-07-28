"use client";

import { useCallback, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Box, Container, IconButton, Stack, Typography } from "@mui/material";

import {
  INTRO_SECTIONS_BACKGROUND,
  PROBLEM_DEMO_CAROUSEL_IMAGE_DISPLAY,
  PROBLEM_DEMO_PANEL_GAP,
  PROBLEM_DEMO_CAROUSEL_CAPTION_FONT_SIZE,
  PROJECT_CONTENT_CONTAINER_SX,
  sectionTitleContentGapMbSx,
} from "@/app/projects/finding-nemo/layoutConfig";
import { bodyTypeSx, FINDING_NEMO_BODY_FONT, titleTypeSx } from "@/app/projects/finding-nemo/typography";
import { breakpointMediaQuery } from "@/lib/responsive/breakpoints";
import ProjectImage from "@/lib/media/ProjectImage";
import type { FindingNemoDataProjectDocument } from "@/scripts/project-2.data";

type ProblemDemoPanelProps = {
  data: NonNullable<FindingNemoDataProjectDocument["problemDemoPanel"]>;
};

const { desktop } = PROBLEM_DEMO_CAROUSEL_IMAGE_DISPLAY;
const panelGap = PROBLEM_DEMO_PANEL_GAP;
const captionFontSize = PROBLEM_DEMO_CAROUSEL_CAPTION_FONT_SIZE;

const carouselCaptionSx = {
  fontFamily: FINDING_NEMO_BODY_FONT,
  color: "#000",
  fontSize: captionFontSize.mobile,
  lineHeight: 1.3,
  fontWeight: 600,
  textAlign: "center",
  flex: { xs: "1 1 auto", md: "0 1 auto" },
  px: 1,
  [breakpointMediaQuery.tabletUp]: {
    fontSize: captionFontSize.tablet,
  },
  [breakpointMediaQuery.desktopUp]: {
    fontSize: captionFontSize.desktop,
  },
} as const;

const sectionLabelSx = [
  titleTypeSx("heroSubtitle", {
    fontWeight: 500,
    color: "#0B6E9F",
    lineHeight: 1.2,
    mb: 1.5,
    textTransform: "uppercase",
  }),
  {
    [breakpointMediaQuery.desktopUp]: {
      fontSize: "22px",
    },
  },
] as const;

const sectionHeadlineSx = titleTypeSx("sectionTitle", {
  fontWeight: 700,
  color: "#073B5E",
  lineHeight: 1.2,
});

/**
 * Stacked on mobile/tablet at full content width (same as Overview);
 * on desktop: ~60% copy / ~40% carousel (flex 3:2, gap excluded).
 */
const copyColumnSx = {
  width: "100%",
  maxWidth: "100%",
  [breakpointMediaQuery.desktopUp]: {
    flex: "3 1 0%",
    width: "auto",
    minWidth: 0,
    maxWidth: "none",
  },
} as const;

const panelRowSx = {
  width: "100%",
  flexDirection: "column",
  alignItems: "stretch",
  justifyContent: "space-between",
  gap: `${panelGap.stacked}px`,
  [breakpointMediaQuery.desktopUp]: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: `${panelGap.sideBySide}px`,
  },
} as const;

const carouselImageSizes = [
  `(max-width: 767px) 100vw`,
  `(max-width: 1023px) 100vw`,
  `40vw`,
].join(", ");

/** Full-width fluid frame on mobile/tablet; ~40% column beside copy on desktop. */
const carouselFrameSx = {
  position: "relative",
  width: "100%",
  aspectRatio: "524 / 330",
  maxWidth: "100%",
  overflow: "hidden",
  borderRadius: 5,
  flexShrink: 0,
} as const;

const carouselColumnSx = {
  width: "100%",
  maxWidth: "100%",
  alignItems: "stretch",
  [breakpointMediaQuery.desktopUp]: {
    flex: "2 1 0%",
    width: "auto",
    maxWidth: "none",
    minWidth: 0,
  },
} as const;

const navigationButtons = [
  {
    key: "previous",
    label: "Previous demo image",
    icon: <ArrowBackIcon fontSize="small" />,
  },
  {
    key: "next",
    label: "Next demo image",
    icon: <ArrowForwardIcon fontSize="small" />,
  },
] as const;

export default function ProblemDemoPanel({ data }: ProblemDemoPanelProps) {
  const { sectionLabel, title, description, slides } = data;
  const [currentIndex, setCurrentIndex] = useState(0);
  const canNavigate = slides.length > 1;
  const currentSlide = slides[currentIndex];

  const goToPrevious = useCallback(() => {
    if (!canNavigate) return;
    setCurrentIndex((index) => (index - 1 + slides.length) % slides.length);
  }, [canNavigate, slides.length]);

  const goToNext = useCallback(() => {
    if (!canNavigate) return;
    setCurrentIndex((index) => (index + 1) % slides.length);
  }, [canNavigate, slides.length]);

  if (!currentSlide) {
    return null;
  }

  return (
    <Box
      component="section"
      sx={{
        bgcolor: INTRO_SECTIONS_BACKGROUND,
        pb: { xs: 8, md: 10, lg: 12 },
      }}
    >
      <Container maxWidth={false} sx={PROJECT_CONTENT_CONTAINER_SX}>
        <Stack sx={panelRowSx}>
          <Stack spacing={3} sx={copyColumnSx}>
            <Stack sx={sectionTitleContentGapMbSx}>
              <Typography component="p" align="left" sx={sectionLabelSx}>
                {sectionLabel}
              </Typography>
              <Typography component="h2" align="left" sx={sectionHeadlineSx}>
                {title}
              </Typography>
            </Stack>
            <Typography
              component="p"
              sx={bodyTypeSx("sectionDescription", {
                color: "common.black",
                lineHeight: 1.5,
                fontWeight: 400,
                m: 0,
              })}
            >
              {description}
            </Typography>
          </Stack>
          <Stack spacing={3} sx={carouselColumnSx}>
            <Box component="figure" sx={{ m: 0, width: "100%" }}>
              <Box sx={carouselFrameSx}>
                <ProjectImage
                  objectPath={currentSlide.objectPath}
                  alt={currentSlide.alt}
                  width={desktop.width}
                  height={desktop.height}
                  sizes={carouselImageSizes}
                  priority={currentIndex === 0}
                  style={{
                    display: "block",
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </Box>
            </Box>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              spacing={2}
              component="figcaption"
            >
              <Box sx={{ flex: 1, minWidth: 0 }} aria-hidden />
              <Typography component="span" sx={carouselCaptionSx}>
                {currentSlide.caption}
              </Typography>
              <Stack
                direction="row"
                spacing={0.5}
                sx={{ flex: 1, minWidth: 0 }}
                justifyContent="flex-end"
              >
                {navigationButtons.map((button) => (
                  <IconButton
                    key={button.key}
                    aria-label={button.label}
                    disabled={!canNavigate}
                    onClick={
                      button.key === "previous" ? goToPrevious : goToNext
                    }
                    size="small"
                    sx={{
                      color: "#8a8a8a",
                      "&.Mui-disabled": {
                        color: "rgba(138, 138, 138, 0.35)",
                      },
                    }}
                  >
                    {button.icon}
                  </IconButton>
                ))}
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
