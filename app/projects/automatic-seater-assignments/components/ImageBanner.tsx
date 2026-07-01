"use client";

import { Box, Typography } from "@mui/material";

import GatedImage from "@/lib/media/GatedImage";
import { imageBannerBandContentSx, imageBannerOverlayMaxWidthSx } from "../layoutConfig";
import { titleTypeSx } from "../typography";

/** Intrinsic dimensions for `GatedImage` / Next `Image` (banner scales to 100% width). */
const BANNER_INTRINSIC_WIDTH = 1260;
const BANNER_INTRINSIC_HEIGHT = 778;

export type ImageBannerData = {
  projectKey: string;
  objectPath: string;
  alt: string;
  sizes: string;
  headline: string;
  taglineLine1: string;
  taglineLine2: string;
};

type Props = {
  data: ImageBannerData;
};

export default function ImageBanner({ data }: Props) {
  const {
    projectKey,
    objectPath,
    alt,
    sizes,
    headline,
    taglineLine1,
    taglineLine2,
  } = data;

  const tagline = [taglineLine1, taglineLine2].filter(Boolean).join(" ");

  return (
    <Box
      component="section"
      data-id="hero-banner"
      sx={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        ...imageBannerBandContentSx,
      }}
    >
      <Box
        sx={{
          width: "100%",
          "& img": {
            width: "100%",
            height: "auto",
            display: "block",
          },
        }}
      >
        <GatedImage
          fullViewportLoading
          priority
          projectKey={projectKey}
          objectPath={objectPath}
          alt={alt}
          sizes={sizes}
          width={BANNER_INTRINSIC_WIDTH}
          height={BANNER_INTRINSIC_HEIGHT}
          style={{ width: "100%", height: "auto", objectFit: "cover" }}
        />
      </Box>

      <Box
        component="header"
        sx={{
          position: "absolute",
          left: "50%",
          bottom: { xs: 12, sm: 24 },
          transform: "translateX(-50%)",
          ...imageBannerOverlayMaxWidthSx,
          mx: { xs: 1, sm: 0 },
          px: { xs: 1.25, sm: 3 },
          py: { xs: 1, sm: 2 },
          borderRadius: "10px",
          backgroundColor: "rgba(52, 50, 50, 0.6)",
          textAlign: "center",
          boxSizing: "border-box",
        }}
      >
        <Typography
          component="h1"
          sx={titleTypeSx("heroTitle", {
            lineHeight: { xs: 1.15, sm: 1.2 },
          })}
        >
          {headline}
        </Typography>

        <Typography
          component="p"
          sx={titleTypeSx("heroSubtitle", {
            mt: { xs: 0.75, sm: 1 },
            lineHeight: { xs: 1.2, sm: 1.25 },
          })}
        >
          {tagline}
        </Typography>
      </Box>
    </Box>
  );
}
