"use client";

import { Box, Typography } from "@mui/material";
import GatedImage from "@/lib/media/GatedImage";
import { breakpointPx } from "@/lib/responsive/breakpoints";

type ImageBannerProps = {
  objectPath?: string;
  alt?: string;
};

const DEFAULT_OBJECT_PATH = "projects/project_4/STBannerDesktop.png";

// Align with styles/variables.scss — $tablet-min, $desktop-min
//const TABLET_MIN_PX = 768;
//const DESKTOP_MIN_PX = 1024;

const PROJECT_KEY = "project_4";

/** Parent handles full-bleed width; image always spans viewport width. */
const BANNER_SIZES = "100vw";

export default function ImageBanner({
  objectPath = DEFAULT_OBJECT_PATH,
  alt = "Automatic seating assignments banner",
}: ImageBannerProps) {
  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        width: "100%",
        // Mobile: taller crop; tablet: 16:9; desktop: wide hero (1.62)
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
          projectKey={PROJECT_KEY}
          objectPath={objectPath}
          alt={alt}
          sizes={BANNER_SIZES}
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
          Automatic Seating Assignments
        </Typography>

        <Typography
          variant="body1"
          component="p"
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
          Serving as many Guests as possible
         
          as quickly as possible
        </Typography>
      </Box>
    </Box>
  );
}
