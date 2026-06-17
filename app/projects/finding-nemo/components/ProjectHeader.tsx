"use client";

import { useEffect, useMemo, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";

import RecognitionDialog, {
  recognitionAwardButtonSx,
  recognitionLinkSx,
} from "@/app/projects/finding-nemo/components/RecognitionDialog";

import {
  HEADER_BAND_COLOR,
  PROJECT_HEADER_EXTRA_TOP_PADDING,
  PROJECT_HEADER_NAV_CLEARANCE,
} from "@/app/projects/finding-nemo/layoutConfig";
import type { FindingNemoDataProjectDocument } from "@/scripts/project-2.data";
import { breakpointMediaQuery } from "@/lib/responsive/breakpoints";
import ProjectImage from "@/lib/media/ProjectImage";

type ProjectHeaderProps = {
  data: FindingNemoDataProjectDocument["projectHeader"];
  onReady?: () => void;
};

/** Fixed desktop artboard — inner stage scales down uniformly below desktop. */
const STAGE = {
  width: 556,
  height: 388,
  canvasLeft: 45,
  canvasWidth: 511,
} as const;

const sceneLayers = [
  {
    key: "water-bubbles-background",
    imageKey: "waterBubbles" as const,
    alt: "Underwater scene",
    width: 344,
    top: 0,
    left: 0,
    zIndex: 1,
  },
  {
    key: "water-bubbles-foreground",
    imageKey: "waterBubbles" as const,
    alt: "Fish scene",
    width: 254,
    top: 15,
    left: 257,
    zIndex: 2,
  },
  {
    key: "nemo-fish",
    imageKey: "nemoFish" as const,
    alt: "Clownfish",
    width: 112,
    top: 131,
    left: 250,
    zIndex: 3,
    flipHorizontal: true,
  },
] as const;

/** Uniform shrink applied to the illustration shell (bubbles, Nemo, CV boxes). */
const SCENE_DISPLAY_SCALE = 0.75;
/** Extra scale on project tablet band (768–1023px). */
const SCENE_TABLET_BOOST = 1.25;

const SCENE_SHELL_BASE_WIDTH = {
  xs: 290,
  sm: 360,
  tablet: 420,
  lg: STAGE.width,
} as const;

function sceneShellWidth(base: number) {
  return Math.round(base * SCENE_DISPLAY_SCALE);
}

function sceneShellHeight(displayWidth: number) {
  return Math.round((displayWidth / STAGE.width) * STAGE.height);
}

const sceneShellWidths = {
  xs: sceneShellWidth(SCENE_SHELL_BASE_WIDTH.xs),
  sm: sceneShellWidth(SCENE_SHELL_BASE_WIDTH.sm),
  lg: sceneShellWidth(SCENE_SHELL_BASE_WIDTH.lg),
} as const;

const tabletSceneShellWidth = Math.round(
  sceneShellWidth(SCENE_SHELL_BASE_WIDTH.tablet) * SCENE_TABLET_BOOST,
);

const TABLET_ONLY_MQ = breakpointMediaQuery.tabletOnly;

function sceneStageShellSx(): SxProps<Theme> {
  return {
    position: "relative",
    flexShrink: 0,
    width: {
      xs: sceneShellWidths.xs,
      sm: sceneShellWidths.sm,
      lg: sceneShellWidths.lg,
    },
    height: {
      xs: sceneShellHeight(sceneShellWidths.xs),
      sm: sceneShellHeight(sceneShellWidths.sm),
      lg: sceneShellHeight(sceneShellWidths.lg),
    },
    [TABLET_ONLY_MQ]: {
      width: tabletSceneShellWidth,
      height: sceneShellHeight(tabletSceneShellWidth),
    },
    mx: { xs: "auto", lg: 0 },
  };
}

function sceneStageInnerSx(): SxProps<Theme> {
  return {
    position: "absolute",
    top: 0,
    left: 0,
    width: STAGE.width,
    height: STAGE.height,
    transformOrigin: "top left",
    transform: {
      xs: `scale(${sceneShellWidths.xs / STAGE.width})`,
      sm: `scale(${sceneShellWidths.sm / STAGE.width})`,
      lg: `scale(${sceneShellWidths.lg / STAGE.width})`,
    },
    [TABLET_ONLY_MQ]: {
      transform: `scale(${tabletSceneShellWidth / STAGE.width})`,
    },
  };
}

/** Fluid type — min at ~360px viewport, max at tablet/desktop; scales between breakpoints. */
const HEADER_FONT_SIZE = {
  title: "clamp(28px, calc(22px + 1.47vw), 34px)",
  subtitle: "clamp(18px, calc(15.5px + 0.68vw), 20px)",
  award: "clamp(16px, calc(13.5px + 0.68vw), 18px)",
} as const;

export default function ProjectHeader({ data, onReady }: ProjectHeaderProps) {
  const [recognitionOpen, setRecognitionOpen] = useState(false);

  useEffect(() => {
    onReady?.();
  }, [onReady]);

  const { boundingBoxesOverlay, recognition } = data;

  const { awardHeadlineLines, viewRecognitionLine } = useMemo(() => {
    const headline: string[] = [];
    let viewLine: string | undefined;

    for (const line of data.awardLines) {
      if (/view recognition/i.test(line)) {
        viewLine = line;
      } else {
        headline.push(line);
      }
    }

    return {
      awardHeadlineLines: headline,
      viewRecognitionLine: viewLine,
    };
  }, [data.awardLines]);

  const recognitionDialogTitle = `🏆 ${awardHeadlineLines.join(" ")}`;
  const openRecognition = () => setRecognitionOpen(true);
  const closeRecognition = () => setRecognitionOpen(false);

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
        bgcolor: HEADER_BAND_COLOR,
      }}
    >
      <Stack
        direction="column"
        alignItems="center"
        justifyContent="space-between"
        spacing={{ xs: 5, lg: 8 }}
        sx={{
          maxWidth: 1260,
          minHeight: { xs: "auto", lg: 450 },
          mx: "auto",
          px: { xs: 3, sm: 6, lg: 10 },
          pt: {
            xs: `calc(${PROJECT_HEADER_NAV_CLEARANCE.mobile} + ${PROJECT_HEADER_EXTRA_TOP_PADDING.mobile})`,
            md: `calc(${PROJECT_HEADER_NAV_CLEARANCE.tablet} + ${PROJECT_HEADER_EXTRA_TOP_PADDING.tablet})`,
            lg: `calc(${PROJECT_HEADER_NAV_CLEARANCE.desktop} + ${PROJECT_HEADER_EXTRA_TOP_PADDING.desktop})`,
          },
          pb: { xs: 6, lg: 8 },
          [breakpointMediaQuery.desktopUp]: {
            flexDirection: "row",
            alignItems: "center",
          },
        }}
      >
        <Stack
          component="header"
          spacing={2}
          alignItems="center"
          sx={{
            width: "100%",
            maxWidth: 482,
            flexShrink: 0,
            textAlign: "center",
          }}
        >
          <ProjectImage
            objectPath={data.logo.objectPath}
            alt={data.logo.alt}
            width={data.logo.width}
            height={data.logo.height}
            priority
            style={{
              display: "block",
              width: data.logo.width,
              height: data.logo.height,
              objectFit: "cover",
            }}
          />
          <Typography
            component="h1"
            sx={{
              color: "#022f5d",
              fontSize: HEADER_FONT_SIZE.title,
              lineHeight: 1.15,
              fontWeight: 400,
              WebkitTextStroke: "1px #000000",
            }}
          >
            {data.title}
          </Typography>
          <Stack spacing={0.5} alignItems="center">
            {data.subtitleLines.map((line) => (
              <Typography
                key={line}
                component="p"
                sx={{
                  color: "#02305d",
                  fontSize: HEADER_FONT_SIZE.subtitle,
                  lineHeight: 1.25,
                  fontWeight: 500,
                }}
              >
                {line}
              </Typography>
            ))}
          </Stack>
          <Stack spacing={0.25} alignItems="center" sx={{ pt: 1 }}>
            {recognition ? (
              <>
                <Box
                  component="button"
                  type="button"
                  onClick={openRecognition}
                  aria-label="View datathon recognition details"
                  sx={{
                    ...recognitionAwardButtonSx,
                    display: "inline-flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 0.25,
                  }}
                >
                  <Typography
                    component="span"
                    sx={{
                      color: "inherit",
                      fontSize: HEADER_FONT_SIZE.award,
                      lineHeight: 1.2,
                      fontWeight: 500,
                    }}
                  >
                    <Box component="span" sx={{ fontWeight: 700, mr: 0.5 }}>
                      🏆
                    </Box>
                    {awardHeadlineLines[0]}
                  </Typography>
                  {awardHeadlineLines.slice(1).map((line) => (
                    <Typography
                      key={line}
                      component="span"
                      sx={{
                        color: "inherit",
                        fontSize: HEADER_FONT_SIZE.award,
                        lineHeight: 1.2,
                        fontWeight: 500,
                      }}
                    >
                      {line}
                    </Typography>
                  ))}
                </Box>
                {viewRecognitionLine ? (
                  <Box
                    component="button"
                    type="button"
                    onClick={openRecognition}
                    aria-label="View recognition"
                    sx={{
                      ...recognitionLinkSx,
                      fontSize: HEADER_FONT_SIZE.award,
                      lineHeight: 1.2,
                      fontWeight: 500,
                    }}
                  >
                    {viewRecognitionLine}
                  </Box>
                ) : null}
              </>
            ) : (
              <>
                <Typography
                  component="p"
                  sx={{
                    color: "#02305d",
                    fontSize: HEADER_FONT_SIZE.award,
                    lineHeight: 1.2,
                    fontWeight: 500,
                  }}
                >
                  <Box component="span" sx={{ fontWeight: 700, mr: 0.5 }}>
                    🏆
                  </Box>
                  {data.awardLines[0]}
                </Typography>
                {data.awardLines.slice(1).map((line) => (
                  <Typography
                    key={line}
                    component="p"
                    sx={{
                      color: "#02305d",
                      fontSize: HEADER_FONT_SIZE.award,
                      lineHeight: 1.2,
                      fontWeight: 500,
                    }}
                  >
                    {line}
                  </Typography>
                ))}
              </>
            )}
          </Stack>
        </Stack>
        <Box sx={sceneStageShellSx()}>
          <Box sx={sceneStageInnerSx()}>
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: STAGE.canvasLeft,
                width: STAGE.canvasWidth,
                height: STAGE.height,
              }}
            >
              {sceneLayers.map((layer) => {
                const image = data[layer.imageKey];

                return (
                  <Box
                    key={layer.key}
                    sx={{
                      position: "absolute",
                      top: layer.top,
                      left: layer.left,
                      width: layer.width,
                      zIndex: layer.zIndex,
                      ...("flipHorizontal" in layer && layer.flipHorizontal
                        ? { transform: "scaleX(-1)" }
                        : {}),
                    }}
                  >
                    <ProjectImage
                      objectPath={image.objectPath}
                      alt={layer.alt}
                      width={image.width}
                      height={image.height}
                      priority
                      style={{
                        display: "block",
                        width: "100%",
                        height: "auto",
                      }}
                    />
                  </Box>
                );
              })}
            </Box>
            <Box
              sx={{
                position: "absolute",
                top: 6,
                left: STAGE.canvasLeft,
                width: 446,
                zIndex: 4,
                pointerEvents: "none",
              }}
            >
              <ProjectImage
                objectPath={boundingBoxesOverlay.objectPath}
                alt={boundingBoxesOverlay.alt}
                width={boundingBoxesOverlay.width}
                height={boundingBoxesOverlay.height}
                priority
                style={{
                  display: "block",
                  width: "100%",
                  height: "auto",
                }}
              />
            </Box>
          </Box>
        </Box>
      </Stack>
      {recognition ? (
        <RecognitionDialog
          open={recognitionOpen}
          onClose={closeRecognition}
          title={recognitionDialogTitle}
          data={recognition}
        />
      ) : null}
    </Box>
  );
}
