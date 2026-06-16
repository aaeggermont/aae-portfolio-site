"use client";

import { useEffect } from "react";
import { Box, Stack, Typography } from "@mui/material";

import type { FindingNemoDataProjectDocument } from "@/scripts/project-2.data";
import ProjectImage from "@/lib/media/ProjectImage";

type ProjectHeaderProps = {
  data: FindingNemoDataProjectDocument["projectHeader"];
  onReady?: () => void;
};

const sceneLayers = [
  {
    key: "water-bubbles-background",
    imageKey: "waterBubbles" as const,
    alt: "Underwater scene",
    width: { xs: 180, sm: 220, md: 344 },
    top: 0,
    left: 0,
    zIndex: 1,
  },
  {
    key: "water-bubbles-foreground",
    imageKey: "waterBubbles" as const,
    alt: "Fish scene",
    width: { xs: 130, sm: 170, md: 254 },
    top: { xs: 8, md: 15 },
    left: { xs: 135, sm: 170, md: 257 },
    zIndex: 2,
  },
  {
    key: "nemo-fish",
    imageKey: "nemoFish" as const,
    alt: "Clownfish",
    width: { xs: 58, sm: 80, md: 112 },
    top: { xs: 70, sm: 96, md: 131 },
    left: { xs: 130, sm: 168, md: 250 },
    zIndex: 3,
  },
] as const;

/** Desktop overlay display width — matches Figma / Anima export alignment. */
const boundingBoxOverlaySx = {
  position: "absolute",
  top: { xs: 2, md: 6 },
  left: { xs: 10, sm: 20, md: 45 },
  width: { xs: 250, sm: 340, md: 446 },
  zIndex: 4,
  pointerEvents: "none",
} as const;

export default function ProjectHeader({ data, onReady }: ProjectHeaderProps) {
  useEffect(() => {
    onReady?.();
  }, [onReady]);

  const { boundingBoxesOverlay } = data;

  return (
    <Box
      component="section"
      sx={{
        width: "100%",
        bgcolor: "#dde8f2",
      }}
    >
      <Stack
        direction={{ xs: "column", md: "row" }}
        alignItems="center"
        justifyContent="space-between"
        spacing={{ xs: 5, md: 8 }}
        sx={{
          maxWidth: 1260,
          minHeight: { xs: "auto", md: 450 },
          mx: "auto",
          px: { xs: 3, sm: 6, md: 10 },
          py: { xs: 6, md: 8 },
          overflow: "hidden",
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
              fontSize: { xs: 28, sm: 34 },
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
                  fontSize: { xs: 18, md: 20 },
                  lineHeight: 1.25,
                  fontWeight: 500,
                }}
              >
                {line}
              </Typography>
            ))}
          </Stack>
          <Stack spacing={0.25} alignItems="center" sx={{ pt: 1 }}>
            <Typography
              component="p"
              sx={{
                color: "#02305d",
                fontSize: { xs: 16, md: 18 },
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
                  fontSize: { xs: 16, md: 18 },
                  lineHeight: 1.2,
                  fontWeight: 500,
                }}
              >
                {line}
              </Typography>
            ))}
          </Stack>
        </Stack>
        <Box
          sx={{
            position: "relative",
            width: "100%",
            maxWidth: { xs: 320, sm: 420, md: 556 },
            height: { xs: 220, sm: 290, md: 388 },
            flexShrink: 0,
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: { xs: 10, sm: 20, md: 45 },
              width: { xs: 290, sm: 360, md: 511 },
              height: "100%",
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
          <Box sx={boundingBoxOverlaySx}>
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
      </Stack>
    </Box>
  );
}
