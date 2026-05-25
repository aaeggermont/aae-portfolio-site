"use client";

import { Box, Stack } from "@mui/material";
import type { ReactNode } from "react";
import ProjectImage from "@/lib/media/ProjectImage";
import { breakpointPx } from "@/lib/responsive/breakpoints";
import {
  cssLengthToPx,
  getPanelInnerWidthPx,
  LAYOUT_DIMENSIONS,
  PANEL_CONTENT_MAX_WIDTH_PX,
} from "../layoutConfig";

/** Mobile wireframe asset — intrinsic ratio for layout reserve. */
const WIREFRAME_IMAGE_INTRINSIC_WIDTH = 390;
const WIREFRAME_IMAGE_INTRINSIC_HEIGHT = 844;

/** Display scale for panel images (10% smaller than full panel width). */
const PANEL_IMAGE_DISPLAY_SCALE = 0.9;

const PANEL_IMAGE_SIZES = [
  `(max-width: ${breakpointPx.mobileMax}px) calc(100vw - ${
    cssLengthToPx(LAYOUT_DIMENSIONS.mobile.margin) * 2
  }px)`,
  `(max-width: ${breakpointPx.tabletMax}px) ${getPanelInnerWidthPx("tablet")}px`,
  `${getPanelInnerWidthPx("desktop")}px`,
].join(", ");

const PANEL_IMAGE_DISPLAY_STYLE = {
  display: "block",
  width: `${PANEL_IMAGE_DISPLAY_SCALE * 100}%`,
  height: "auto",
  maxWidth: `${PANEL_IMAGE_DISPLAY_SCALE * 100}%`,
} as const;

export interface PrototypingPanelImage {
  objectPath: string;
  alt: string;
}

/** Grey inset panel — matches `UserModeInteractions` content container (1100px cap). */
const GREY_PANEL_SURFACE_SX = {
  width: "100%",
  bgcolor: "#f5f5f7",
  borderRadius: { xs: 4, md: "40px" },
  px: { xs: 3, sm: 5, md: 7.5 },
  py: { xs: 4, sm: 5, md: 7.5 },
} as const;

/** Spatial interaction diagram — landscape intrinsic ratio for layout reserve. */
const SPATIAL_IMAGE_INTRINSIC_WIDTH = 960;
const SPATIAL_IMAGE_INTRINSIC_HEIGHT = 540;

function PanelImageFigure({
  image,
  intrinsicWidth,
  intrinsicHeight,
}: {
  image: PrototypingPanelImage;
  intrinsicWidth: number;
  intrinsicHeight: number;
}) {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <ProjectImage
        objectPath={image.objectPath}
        alt={image.alt}
        width={intrinsicWidth}
        height={intrinsicHeight}
        unoptimized
        sizes={PANEL_IMAGE_SIZES}
        style={PANEL_IMAGE_DISPLAY_STYLE}
      />
    </Box>
  );
}

export interface PrototypingMethodPanelProps {
  children?: ReactNode;
  /** First image in the panel (e.g. mobile wireframe). */
  primaryImage?: PrototypingPanelImage;
  /** Second image, stacked below the primary (e.g. spatial interaction model). */
  secondaryImage?: PrototypingPanelImage;
}

export function PrototypingMethodPanel({
  children,
  primaryImage,
  secondaryImage,
}: PrototypingMethodPanelProps) {
  const hasPanelImages = Boolean(primaryImage || secondaryImage);

  return (
    <Stack
      sx={{
        width: "100%",
        maxWidth: PANEL_CONTENT_MAX_WIDTH_PX,
        minWidth: { xs: "auto", sm: 358 },
        mx: "auto",
      }}
    >
      <Box sx={GREY_PANEL_SURFACE_SX}>
        {hasPanelImages ? (
          <Stack
            spacing={{ xs: 3, sm: 4, md: 5 }}
            sx={{ mb: children ? { xs: 3, sm: 4, md: 5 } : 0 }}
          >
            {primaryImage ? (
              <PanelImageFigure
                image={primaryImage}
                intrinsicWidth={WIREFRAME_IMAGE_INTRINSIC_WIDTH}
                intrinsicHeight={WIREFRAME_IMAGE_INTRINSIC_HEIGHT}
              />
            ) : null}
            {secondaryImage ? (
              <PanelImageFigure
                image={secondaryImage}
                intrinsicWidth={SPATIAL_IMAGE_INTRINSIC_WIDTH}
                intrinsicHeight={SPATIAL_IMAGE_INTRINSIC_HEIGHT}
              />
            ) : null}
          </Stack>
        ) : null}
        {children}
      </Box>
    </Stack>
  );
}

export default PrototypingMethodPanel;
