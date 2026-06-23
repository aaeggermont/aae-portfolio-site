"use client";

import { Box, Paper, Stack, Typography } from "@mui/material";
import type { ReactNode } from "react";
import ParagraphBlock from "./ParagraphBlock";
import ProjectImage from "@/lib/media/ProjectImage";
import ProjectImageLightbox from "@/lib/media/ProjectImageLightbox";
import { PrototypingImageCarousel } from "./PrototypingImageCarousel";
import { breakpointMediaQuery, breakpointPx } from "@/lib/responsive/breakpoints";
import {
  cssLengthToPx,
  getPanelInnerWidthPx,
  LAYOUT_DIMENSIONS,
  PANEL_CONTENT_MAX_WIDTH_PX,
} from "../layoutConfig";
import { bodyTypeSx } from "../typography";

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
  annotation?: string;
  annotationInstruction?: string;
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

/** Wire-flow diagram — landscape intrinsic ratio for layout reserve. */
const WIREFLOW_IMAGE_INTRINSIC_WIDTH = 900;
const WIREFLOW_IMAGE_INTRINSIC_HEIGHT = 560;

const DESKTOP_LAYOUT_MQ = breakpointMediaQuery.desktopUp;

const IMAGE_ANNOTATION_SX = bodyTypeSx("caption", {
  textAlign: "center",
  width: "100%",
  m: 0,
});

/** Matches `InteractionDesignPrinciples` stacked / row column gap. */
const SPLIT_COLUMN_GAP = {
  mobile: "32px",
  tablet: "40px",
  desktop: "48px",
} as const;

/** Software Prototypes copy / carousel split (desktop). */
const CAROUSEL_SPLIT_COPY_WIDTH = `calc((100% - ${SPLIT_COLUMN_GAP.desktop}) * 0.65)`;
const CAROUSEL_SPLIT_MEDIA_WIDTH = `calc((100% - ${SPLIT_COLUMN_GAP.desktop}) * 0.35)`;

const WIREFLOW_LIGHTBOX_ID = "ar-story-teller-wireflow";

const WIREFLOW_INLINE_IMAGE_STYLE = {
  display: "block",
  width: `${PANEL_IMAGE_DISPLAY_SCALE * 100}%`,
  height: "auto",
  maxWidth: `${PANEL_IMAGE_DISPLAY_SCALE * 100}%`,
} as const;

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

function CopyImageSplitLayout({
  paragraphs,
  image,
  carouselImages,
}: {
  paragraphs?: string[];
  image?: PrototypingPanelImage;
  carouselImages?: PrototypingPanelImage[];
}) {
  const hasCarousel = Boolean(carouselImages?.length);
  const hasRightColumn = Boolean(image || hasCarousel);

  return (
    <Stack
      sx={{
        flexDirection: "column",
        alignItems: "stretch",
        gap: {
          xs: SPLIT_COLUMN_GAP.mobile,
          sm: SPLIT_COLUMN_GAP.tablet,
        },
        [DESKTOP_LAYOUT_MQ]: {
          flexDirection: "row",
          alignItems: "center",
          justifyContent: hasCarousel ? "flex-start" : "space-between",
          gap: SPLIT_COLUMN_GAP.desktop,
        },
      }}
    >
      {paragraphs?.length ? (
        <Box
          sx={{
            width: "100%",
            flexShrink: 0,
            [DESKTOP_LAYOUT_MQ]: hasCarousel
              ? {
                  flex: `0 0 ${CAROUSEL_SPLIT_COPY_WIDTH}`,
                  width: CAROUSEL_SPLIT_COPY_WIDTH,
                  maxWidth: CAROUSEL_SPLIT_COPY_WIDTH,
                  minWidth: 0,
                }
              : hasRightColumn
                ? {
                    width: 402,
                    maxWidth: "42%",
                  }
                : {
                    width: "100%",
                    maxWidth: "100%",
                  },
          }}
        >
          <ParagraphBlock paragraphs={paragraphs} />
        </Box>
      ) : null}
      {hasCarousel && carouselImages ? (
        <Box
          sx={{
            width: "100%",
            maxWidth: 498,
            flexShrink: 0,
            alignSelf: "center",
            [DESKTOP_LAYOUT_MQ]: {
              flex: `0 0 ${CAROUSEL_SPLIT_MEDIA_WIDTH}`,
              width: CAROUSEL_SPLIT_MEDIA_WIDTH,
              maxWidth: CAROUSEL_SPLIT_MEDIA_WIDTH,
              minWidth: 0,
              alignSelf: "center",
            },
          }}
        >
          <PrototypingImageCarousel images={carouselImages} />
        </Box>
      ) : null}
      {image ? (
        <Paper
          component="section"
          elevation={0}
          aria-label={image.alt}
          sx={{
            bgcolor: "#fff",
            width: "100%",
            maxWidth: 498,
            flexShrink: 0,
            alignSelf: "center",
            borderRadius: { xs: 4, md: "44px" },
            p: { xs: 3, sm: 4, md: "35px 18px" },
            [DESKTOP_LAYOUT_MQ]: {
              width: 468,
              maxWidth: "52%",
              alignSelf: "center",
            },
          }}
        >
          <Stack alignItems="center" spacing={2} sx={{ width: "100%" }}>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <ProjectImageLightbox
                objectPath={image.objectPath}
                alt={image.alt}
                lightboxId={WIREFLOW_LIGHTBOX_ID}
                width={WIREFLOW_IMAGE_INTRINSIC_WIDTH}
                height={WIREFLOW_IMAGE_INTRINSIC_HEIGHT}
                style={WIREFLOW_INLINE_IMAGE_STYLE}
              />
            </Box>
            {image.annotation || image.annotationInstruction ? (
              <Stack alignItems="center" spacing="6px" sx={{ width: "100%" }}>
                {image.annotation ? (
                  <Typography component="p" sx={IMAGE_ANNOTATION_SX}>
                    {image.annotation}
                  </Typography>
                ) : null}
                {image.annotationInstruction ? (
                  <Typography component="p" sx={IMAGE_ANNOTATION_SX}>
                    {image.annotationInstruction}
                  </Typography>
                ) : null}
              </Stack>
            ) : null}
          </Stack>
        </Paper>
      ) : null}
    </Stack>
  );
}

export interface PrototypingMethodPanelProps {
  children?: ReactNode;
  /** Copy left / image right (Wire-Flow panel). */
  paragraphs?: string[];
  copyImage?: PrototypingPanelImage;
  /** Copy left / carousel right (Software Prototypes panel). */
  carouselImages?: PrototypingPanelImage[];
  /** First image in the panel (e.g. mobile wireframe). */
  primaryImage?: PrototypingPanelImage;
  /** Second image, stacked below the primary (e.g. spatial interaction model). */
  secondaryImage?: PrototypingPanelImage;
}

export function PrototypingMethodPanel({
  children,
  paragraphs,
  copyImage,
  carouselImages,
  primaryImage,
  secondaryImage,
}: PrototypingMethodPanelProps) {
  const hasCopyImageSplit = Boolean(
    paragraphs?.length || copyImage || carouselImages?.length,
  );
  const hasStackedImages = Boolean(primaryImage || secondaryImage);

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
        {hasCopyImageSplit ? (
          <CopyImageSplitLayout
            paragraphs={paragraphs}
            image={copyImage}
            carouselImages={carouselImages}
          />
        ) : null}
        {hasStackedImages ? (
          <Stack
            spacing={{ xs: 3, sm: 4, md: 5 }}
            sx={{
              mb: children ? { xs: 3, sm: 4, md: 5 } : 0,
              mt: hasCopyImageSplit ? { xs: 3, sm: 4, md: 5 } : 0,
            }}
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
