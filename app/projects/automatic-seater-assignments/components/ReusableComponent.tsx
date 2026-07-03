"use client";

import { Box, Typography } from "@mui/material";

import GatedImage from "@/lib/media/GatedImage";
import { breakpointMediaQuery } from "@/lib/responsive/breakpoints";

const DEFAULT_PROJECT_KEY = "project_4";
const DEFAULT_TITLE_COLOR = "#23466A";
const DEFAULT_DESCRIPTION_COLOR = "#204061";

/** Desktop layout dimensions (see design spec). */
const IMAGE_WIDTH_PX = 240;
const TEXT_WIDTH_PX = 635;
const COLUMN_GAP_PX = 64;
/** Tablet keeps the desktop two-column layout with a scaled-down image. */
const TABLET_IMAGE_WIDTH_PX = 168;
const TABLET_COLUMN_GAP_PX = 40;
/** Mobile stacks vertically with a smaller image (~25% smaller than desktop). */
const MOBILE_IMAGE_WIDTH_PX = 180;

export type ReusableComponentProps = {
  title: string;
  description: string;
  objectPath: string;
  alt: string;
  projectKey?: string;
  sizes?: string;
  /** Intrinsic image size, used for the image frame aspect ratio. */
  frameDimensionsPx?: { width: number; height: number };
  textColors?: {
    title?: string;
    description?: string;
  };
};

export function ReusableComponent({
  title,
  description,
  objectPath,
  alt,
  projectKey = DEFAULT_PROJECT_KEY,
  sizes = "(max-width: 1023px) 240px, 240px",
  frameDimensionsPx,
  textColors,
}: ReusableComponentProps) {
  const titleColor = textColors?.title ?? DEFAULT_TITLE_COLOR;
  const descriptionColor = textColors?.description ?? DEFAULT_DESCRIPTION_COLOR;
  const aspectRatio = frameDimensionsPx
    ? `${frameDimensionsPx.width} / ${frameDimensionsPx.height}`
    : "1 / 1";

  return (
    <Box
      component="section"
      sx={{
        px: 2,
        display: "grid",
        justifyContent: "center",
        justifyItems: "center",
        rowGap: 2,
        gridTemplateColumns: "minmax(0, 1fr)",
        width: "100%",
        [breakpointMediaQuery.tabletUp]: {
          gridTemplateColumns: `${TABLET_IMAGE_WIDTH_PX}px minmax(0, 1fr)`,
          columnGap: `${TABLET_COLUMN_GAP_PX}px`,
          rowGap: 3,
          justifyItems: "stretch",
          justifyContent: "center",
        },
        [breakpointMediaQuery.desktopUp]: {
          gridTemplateColumns: `${IMAGE_WIDTH_PX}px ${TEXT_WIDTH_PX}px`,
          columnGap: `${COLUMN_GAP_PX}px`,
        },
      }}
    >
      <Box
        sx={{
          width: "100%",
          [breakpointMediaQuery.tabletUp]: {
            gridColumn: "2",
            gridRow: "1",
            width: "100%",
          },
          [breakpointMediaQuery.desktopUp]: {
            width: `${TEXT_WIDTH_PX}px`,
          },
        }}
      >
        <Typography
          component="h3"
          sx={{
            color: titleColor,
            fontWeight: 700,
            fontFamily: "'Poppins', Helvetica, sans-serif",
            fontSize: "20px",
            lineHeight: 1.2,
            textAlign: "center",
            m: 0,
            [breakpointMediaQuery.tabletUp]: { fontSize: "22px" },
            [breakpointMediaQuery.desktopUp]: { fontSize: "24px" },
          }}
        >
          {title}
        </Typography>
      </Box>

      <Box
        sx={{
          position: "relative",
          width: `${MOBILE_IMAGE_WIDTH_PX}px`,
          maxWidth: "100%",
          aspectRatio,
          [breakpointMediaQuery.tabletUp]: {
            gridColumn: "1",
            gridRow: "2",
            alignSelf: "center",
            width: `${TABLET_IMAGE_WIDTH_PX}px`,
          },
          [breakpointMediaQuery.desktopUp]: {
            width: `${IMAGE_WIDTH_PX}px`,
          },
        }}
      >
        <GatedImage
          mode="fill"
          projectKey={projectKey}
          objectPath={objectPath}
          alt={alt}
          sizes={sizes}
          priority={false}
          fullViewportLoading={false}
          style={{ objectFit: "contain" }}
        />
      </Box>

      <Box
        component="article"
        sx={{
          width: "100%",
          mt: "16px",
          [breakpointMediaQuery.tabletUp]: {
            gridColumn: "2",
            gridRow: "2",
            width: "100%",
            mt: 0,
          },
          [breakpointMediaQuery.desktopUp]: {
            width: `${TEXT_WIDTH_PX}px`,
          },
        }}
      >
        <Typography
          component="p"
          sx={{
            color: descriptionColor,
            fontWeight: 400,
            fontFamily: "'Poppins', Helvetica, sans-serif",
            fontSize: "18px",
            lineHeight: 1.35,
            m: 0,
            [breakpointMediaQuery.tabletUp]: { fontSize: "20px" },
            [breakpointMediaQuery.desktopUp]: { fontSize: "22px" },
          }}
        >
          {description}
        </Typography>
      </Box>
    </Box>
  );
}

export default ReusableComponent;
