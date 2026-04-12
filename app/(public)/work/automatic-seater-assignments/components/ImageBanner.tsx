"use client";

import { Box, Typography } from "@mui/material";
import ProjectImage from "@/lib/media/ProjectImage";
import STD from '../images/STBannerDesktop.png'
type ImageBannerProps = {
  objectPath?: string;
  alt?: string;
};

const DEFAULT_OBJECT_PATH = '../images/STBannerDesktop.png';

// Align with styles/variables.scss — $tablet-min, $desktop-min
const TABLET_MIN_PX = 768;
const DESKTOP_MIN_PX = 1024;

/** Matches container max widths: $mobile-max, $tablet-max, $desktop-max */
const BANNER_SIZES = `(max-width: 767px) min(100vw, 767px), (max-width: 1023px) min(100vw, 1023px), min(100vw, 3800px)`;

export default function ImageBanner({
  objectPath = DEFAULT_OBJECT_PATH,
  alt = "Automatic seating assignments — banner",
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
        [`@media (min-width: ${TABLET_MIN_PX}px)`]: {
          aspectRatio: "16 / 9",
        },
        [`@media (min-width: ${DESKTOP_MIN_PX}px)`]: {
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
        <ProjectImage
          objectPath="projects/project_4/STBannerDesktop.png"
          alt={alt}
          width={2400}
          height={1480}
          priority
          sizes={BANNER_SIZES}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </Box>

      <Box
        sx={{
          position: "absolute",
          bottom: "8%",
          left: 0,
          width: { xs: "100%", md: "60%" },
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
            fontWeight: 700,
            color: "white",
            fontSize: { xs: "1.5rem", md: "2rem" },
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
            fontWeight: 500,
            color: "white",
            fontSize: { xs: "1rem", md: "1.125rem" },
            textAlign: "center",
            lineHeight: "normal",
            letterSpacing: 0,
          }}
        >
          Serving as many Guests as possible
          <br />
          as quickly as possible
        </Typography>
      </Box>
    </Box>
  );
}
