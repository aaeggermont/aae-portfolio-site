"use client";

import { useEffect, useState } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Box, IconButton, Stack } from "@mui/material";

import ProjectImage from "@/lib/media/ProjectImage";
import { breakpointMediaQuery, breakpointPx } from "@/lib/responsive/breakpoints";
import type { PrototypingPanelImage } from "./PrototypingMethodPanel";

const CAROUSEL_INTERVAL_MS = 3500;

const DESKTOP_LAYOUT_MQ = breakpointMediaQuery.desktopUp;
const TABLET_STACKED_MQ = breakpointMediaQuery.tabletOnly;

/** Software prototype mockups — portrait phone screens. */
const CAROUSEL_IMAGE_INTRINSIC_WIDTH = 390;
const CAROUSEL_IMAGE_INTRINSIC_HEIGHT = 844;

/** ~15% smaller than the previous carousel display caps. */
const CAROUSEL_IMAGE_DISPLAY_SCALE = 0.85;
const CAROUSEL_IMAGE_MAX_WIDTH_DESKTOP_PX = Math.round(
  360 * CAROUSEL_IMAGE_DISPLAY_SCALE,
);
const CAROUSEL_IMAGE_MAX_WIDTH_TABLET_PX = Math.round(
  320 * CAROUSEL_IMAGE_DISPLAY_SCALE,
);

const CAROUSEL_IMAGE_SIZES = [
  `(max-width: ${breakpointPx.mobileMax}px) 100vw`,
  `(max-width: ${breakpointPx.tabletMax}px) min(45vw, ${CAROUSEL_IMAGE_MAX_WIDTH_TABLET_PX}px)`,
  `${CAROUSEL_IMAGE_MAX_WIDTH_DESKTOP_PX}px`,
].join(", ");

const navigationButtons = [
  {
    key: "previous",
    label: "Previous prototype image",
    icon: <ArrowBackIosNewIcon sx={{ fontSize: 16 }} />,
  },
  {
    key: "next",
    label: "Next prototype image",
    icon: <ArrowForwardIosIcon sx={{ fontSize: 16 }} />,
  },
] as const;

export type PrototypingImageCarouselProps = {
  images: PrototypingPanelImage[];
};

export function PrototypingImageCarousel({ images }: PrototypingImageCarouselProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [hasUserInteractedWithCarousel, setHasUserInteractedWithCarousel] =
    useState(false);
  const currentImage = images[currentImageIndex];
  const canNavigateCarousel = images.length > 1;

  useEffect(() => {
    if (currentImageIndex < images.length) return;
    setCurrentImageIndex(0);
  }, [currentImageIndex, images.length]);

  useEffect(() => {
    if (hasUserInteractedWithCarousel || !canNavigateCarousel) return;

    const intervalId = window.setInterval(() => {
      setCurrentImageIndex((index) => (index + 1) % images.length);
    }, CAROUSEL_INTERVAL_MS);

    return () => window.clearInterval(intervalId);
  }, [canNavigateCarousel, hasUserInteractedWithCarousel, images.length]);

  const handlePrevious = () => {
    if (!canNavigateCarousel) return;
    setHasUserInteractedWithCarousel(true);
    setCurrentImageIndex(
      (index) => (index - 1 + images.length) % images.length,
    );
  };

  const handleNext = () => {
    if (!canNavigateCarousel) return;
    setHasUserInteractedWithCarousel(true);
    setCurrentImageIndex((index) => (index + 1) % images.length);
  };

  if (!currentImage) {
    return null;
  }

  return (
    <Stack spacing={3} alignItems="center" sx={{ width: "100%" }}>
      <Box
        sx={{
          width: "100%",
          maxWidth: "100%",
          display: "flex",
          justifyContent: "center",
          [TABLET_STACKED_MQ]: {
            maxWidth: CAROUSEL_IMAGE_MAX_WIDTH_TABLET_PX,
            width: `min(100%, ${CAROUSEL_IMAGE_MAX_WIDTH_TABLET_PX}px)`,
          },
          [DESKTOP_LAYOUT_MQ]: {
            maxWidth: CAROUSEL_IMAGE_MAX_WIDTH_DESKTOP_PX,
          },
        }}
      >
        <ProjectImage
          objectPath={currentImage.objectPath}
          alt={currentImage.alt}
          width={CAROUSEL_IMAGE_INTRINSIC_WIDTH}
          height={CAROUSEL_IMAGE_INTRINSIC_HEIGHT}
          sizes={CAROUSEL_IMAGE_SIZES}
          unoptimized
          style={{
            display: "block",
            width: `${CAROUSEL_IMAGE_DISPLAY_SCALE * 100}%`,
            height: "auto",
            maxWidth: `${CAROUSEL_IMAGE_DISPLAY_SCALE * 100}%`,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        />
      </Box>
      <Stack
        direction="row"
        spacing={1}
        justifyContent="flex-end"
        sx={{ width: "100%" }}
      >
        {navigationButtons.map((button) => (
          <IconButton
            key={button.key}
            aria-label={button.label}
            disabled={!canNavigateCarousel}
            onClick={button.key === "previous" ? handlePrevious : handleNext}
            size="small"
            sx={{
              width: 30,
              height: 30,
              bgcolor: button.key === "next" ? "#142257" : "#f1f1f3",
              color: button.key === "next" ? "#ffffff" : "#11255f",
              "&.Mui-disabled": {
                bgcolor: "#f1f1f3",
                color: "rgba(17, 37, 95, 0.28)",
              },
              "&:hover": {
                bgcolor: button.key === "next" ? "#1d317a" : "#e8e8ec",
              },
            }}
          >
            {button.icon}
          </IconButton>
        ))}
      </Stack>
    </Stack>
  );
}

export default PrototypingImageCarousel;
