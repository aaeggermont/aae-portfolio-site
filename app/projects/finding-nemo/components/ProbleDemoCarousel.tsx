"use client";

import { useCallback, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Box, Container, IconButton, Stack, Typography } from "@mui/material";

import {
  INTRO_SECTIONS_BACKGROUND,
  LAYOUT_DIMENSIONS,
  PANEL_CONTENT_MAX_WIDTH_PX,
  PROBLEM_DEMO_CAROUSEL_IMAGE_DISPLAY,
  PROBLEM_DEMO_PANEL_BACKGROUND,
  PROBLEM_DEMO_PANEL_COPY_MIN_WIDTH_PX,
  PROBLEM_DEMO_PANEL_COPY_WIDTH,
  PROBLEM_DEMO_PANEL_GAP,
  PROBLEM_DEMO_PANEL_SIDE_BY_SIDE_MIN_WIDTH_PX,
  PROBLEM_DEMO_PANEL_TITLE_GAP,
  PROBLEM_DEMO_CAROUSEL_CAPTION_FONT_SIZE,
} from "@/app/projects/finding-nemo/layoutConfig";
import { bodyTypeSx, FINDING_NEMO_BODY_FONT, titleTypeSx } from "@/app/projects/finding-nemo/typography";
import { breakpointMediaQuery } from "@/lib/responsive/breakpoints";
import ProjectImage from "@/lib/media/ProjectImage";
import type { FindingNemoDataProjectDocument } from "@/scripts/project-2.data";

type ProblemDemoPanelProps = {
  data: NonNullable<FindingNemoDataProjectDocument["problemDemoPanel"]>;
};

const { desktop, tablet, mobile } = PROBLEM_DEMO_CAROUSEL_IMAGE_DISPLAY;
const copyWidth = PROBLEM_DEMO_PANEL_COPY_WIDTH;
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

const sectionContentStackSx = {
  width: "100%",
  alignItems: "center",
  gap: PROBLEM_DEMO_PANEL_TITLE_GAP.mobile,
  [breakpointMediaQuery.tabletUp]: {
    gap: PROBLEM_DEMO_PANEL_TITLE_GAP.tablet,
  },
  [breakpointMediaQuery.desktopUp]: {
    gap: PROBLEM_DEMO_PANEL_TITLE_GAP.desktop,
  },
} as const;

const problemDemoPanelSideBySideMq = `@media (min-width: ${PROBLEM_DEMO_PANEL_SIDE_BY_SIDE_MIN_WIDTH_PX}px)`;

/** Stacked below 1260px — copy width matches carousel; side-by-side uses fixed copy column. */
const copyColumnSx = {
  width: "100%",
  maxWidth: mobile.width,
  flexShrink: 0,
  [breakpointMediaQuery.tabletUp]: {
    maxWidth: tablet.width,
  },
  [problemDemoPanelSideBySideMq]: {
    width: copyWidth.desktop,
    maxWidth: copyWidth.desktop,
    minWidth: PROBLEM_DEMO_PANEL_COPY_MIN_WIDTH_PX,
    flexShrink: 0,
  },
} as const;

const panelRowSx = {
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between",
  gap: `${panelGap.stacked}px`,
  [problemDemoPanelSideBySideMq]: {
    flexDirection: "row",
    alignItems: "center",
    gap: `${panelGap.sideBySide}px`,
  },
} as const;

const carouselImageSizes = [
  `(max-width: 767px) ${mobile.width}px`,
  `(max-width: 1023px) ${tablet.width}px`,
  `${desktop.width}px`,
].join(", ");

/** Fixed frame per breakpoint — steps down at tablet / mobile, no fluid scaling between bands. */
const carouselFrameSx = {
  position: "relative",
  width: mobile.width,
  height: mobile.height,
  maxWidth: "100%",
  overflow: "hidden",
  borderRadius: 5,
  flexShrink: 0,
  [breakpointMediaQuery.tabletUp]: {
    width: tablet.width,
    height: tablet.height,
    maxWidth: tablet.width,
  },
  [breakpointMediaQuery.desktopUp]: {
    width: desktop.width,
    height: desktop.height,
    maxWidth: desktop.width,
  },
} as const;

const carouselColumnSx = {
  flexShrink: 0,
  width: mobile.width,
  maxWidth: "100%",
  alignItems: "stretch",
  [breakpointMediaQuery.tabletUp]: {
    width: tablet.width,
    maxWidth: tablet.width,
  },
  [breakpointMediaQuery.desktopUp]: {
    width: desktop.width,
    maxWidth: desktop.width,
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
  const { sectionTitle, description, slides } = data;
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
        px: LAYOUT_DIMENSIONS.mobile.margin,
        pb: { xs: 8, md: 10, lg: 12 },
        [breakpointMediaQuery.tabletUp]: {
          px: LAYOUT_DIMENSIONS.tablet.margin,
        },
        [breakpointMediaQuery.desktopUp]: {
          px: LAYOUT_DIMENSIONS.desktop.margin,
        },
      }}
    >
      <Container
        maxWidth={false}
        sx={{
          maxWidth: {
            xs: LAYOUT_DIMENSIONS.mobile.maxWidth,
            md: LAYOUT_DIMENSIONS.tablet.maxWidth,
            lg: LAYOUT_DIMENSIONS.desktop.maxWidth,
          },
        }}
      >
        <Stack sx={sectionContentStackSx}>
          <Typography
            component="h2"
            align="center"
            sx={titleTypeSx("sectionTitle", {
              width: "100%",
              color: "text.primary",
              fontWeight: 700,
              lineHeight: 1.2,
              m: 0,
            })}
          >
            {sectionTitle}
          </Typography>
          <Box
            sx={{
              width: "100%",
              maxWidth: PANEL_CONTENT_MAX_WIDTH_PX,
              mx: "auto",
              bgcolor: PROBLEM_DEMO_PANEL_BACKGROUND,
              borderRadius: 5,
              px: { xs: 3, sm: 5, md: 8 },
              py: { xs: 4, sm: 5, md: 8 },
            }}
          >
            <Stack sx={panelRowSx}>
              <Box component="article" sx={copyColumnSx}>
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
              </Box>
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
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
