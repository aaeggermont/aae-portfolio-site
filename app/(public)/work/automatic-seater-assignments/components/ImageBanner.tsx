"use client";

import { Box, Typography } from "@mui/material";
import GatedImage from "@/lib/media/GatedImage";
import { breakpointPx } from "@/lib/responsive/breakpoints";
import { aosFadeUp } from "../aosProps";

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
      sx={{
        position: "relative",
        width: "100%",
        aspectRatio: "4 / 5",
        overflow: "hidden",
        backgroundColor: "#000",
        [`@media (min-width: ${breakpointPx.tabletMin}px)`]: {
          aspectRatio: "16 / 9",
        },
        [`@media (min-width: ${breakpointPx.desktopMin}px)`]: {
          aspectRatio: "1.62 / 1",
        },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          "& img": {
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          },
        }}
      >
        <GatedImage
          fullViewportLoading
          priority
          mode="fill"
          projectKey={projectKey}
          objectPath={objectPath}
          alt={alt}
          sizes={sizes}
          style={{ objectFit: "cover" }}
        />
      </Box>

      <Box
        sx={{
          position: "absolute",
          bottom: "8%",
          left: 0,
          width: { xs: "100%", md: "100%" },
          px: { xs: 2, md: 4 },
          display: "flex",
          flexDirection: "column",
          gap: "15px",
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          {...aosFadeUp({ duration: 900 })}
          sx={{
            fontFamily: "'Poppins', Helvetica, sans-serif",
            fontWeight: 600,
            color: "white",
            fontSize: { xs: "1.5rem", md: "2.5rem" },
            textAlign: "center",
            lineHeight: "normal",
            letterSpacing: 0,
          }}
        >
          {headline}
        </Typography>

        <Typography
          variant="body1"
          component="p"
          {...aosFadeUp({ delay: 150, duration: 900 })}
          sx={{
            fontFamily: "'Poppins', Helvetica, sans-serif",
            fontWeight: 600,
            color: "white",
            fontSize: { xs: "1rem", md: "1.125rem", lg: "1.5rem" },
            textAlign: "center",
            lineHeight: "normal",
            letterSpacing: 0,
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
