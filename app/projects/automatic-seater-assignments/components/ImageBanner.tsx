"use client";

import { Box, Typography } from "@mui/material";

import GatedImage from "@/lib/media/GatedImage";

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

  return (
    <Box
      component="section"
      data-id="hero-banner"
      sx={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
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
          bottom: 24,
          transform: "translateX(-50%)",
          width: "100%",
          maxWidth: 620,
          px: { xs: 2, sm: 3 },
          py: { xs: 1.5, sm: 2 },
          borderRadius: "10px",
          backgroundColor: "rgba(52, 50, 50, 0.6)",
          textAlign: "center",
        }}
      >
        <Typography
          component="h1"
          sx={{
            color: "#f2f2f2",
            fontWeight: 700,
            fontSize: { xs: 24, sm: 30, md: 34 },
            lineHeight: 1.2,
          }}
        >
          {headline}
        </Typography>

        <Typography
          component="p"
          sx={{
            mt: 1,
            color: "#ffffff",
            fontWeight: 500,
            fontSize: { xs: 18, sm: 22, md: 24 },
            lineHeight: 1.3,
          }}
        >
          {taglineLine1}
          <br />
          {taglineLine2}
        </Typography>
      </Box>
    </Box>
  );
}
