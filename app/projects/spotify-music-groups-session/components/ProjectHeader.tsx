"use client";

import { useEffect, useSyncExternalStore } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Parallax } from "react-scroll-parallax";

import {
  HERO_COLORS,
  HERO_CONTENT_CONTAINER_SX,
  HERO_GRADIENT,
  HERO_IMAGE,
  HERO_IMAGE_BORDER_RADIUS,
  PROJECT_HEADER_NAV_CLEARANCE,
} from "@/app/projects/spotify-music-groups-session/layoutConfig";
import {
  bodyTypeSx,
  titleTypeSx,
} from "@/app/projects/spotify-music-groups-session/typography";
import type { SpotifyMusicGroupsSessionDataProjectDocument } from "@/scripts/project-8.data";
import { breakpointMediaQuery } from "@/lib/responsive/breakpoints";
import ProjectImage from "@/lib/media/ProjectImage";

type ProjectHeaderProps = {
  data: SpotifyMusicGroupsSessionDataProjectDocument["projectHeader"];
  onReady?: () => void;
};

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(onStoreChange: () => void): () => void {
  const media = window.matchMedia(REDUCED_MOTION_QUERY);
  media.addEventListener("change", onStoreChange);
  return () => media.removeEventListener("change", onStoreChange);
}

function getReducedMotionSnapshot(): boolean {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

/** Soft glow lags behind scroll for depth. */
const GLOW_PARALLAX_SPEED = -14;
/** Copy drifts slightly ahead of the band. */
const CONTENT_PARALLAX_SPEED = 7;

export default function ProjectHeader({ data, onReady }: ProjectHeaderProps) {
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    () => false,
  );

  const glowSpeed = reducedMotion ? 0 : GLOW_PARALLAX_SPEED;
  const contentSpeed = reducedMotion ? 0 : CONTENT_PARALLAX_SPEED;

  useEffect(() => {
    onReady?.();
  }, [onReady]);

  return (
    <Box
      component="section"
      data-id="spotify-hero-banner"
      sx={{
        position: "relative",
        isolation: "isolate",
        overflow: "hidden",
        width: "100%",
        background: HERO_GRADIENT,
        pt: {
          xs: PROJECT_HEADER_NAV_CLEARANCE.mobile,
          md: PROJECT_HEADER_NAV_CLEARANCE.tablet,
          lg: PROJECT_HEADER_NAV_CLEARANCE.desktop,
        },
        pb: { xs: 6, md: 8, lg: 10 },
      }}
    >
      {/* Soft circular light leak — center sits off the left edge near the title band */}
      <Parallax speed={glowSpeed} style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <Box
          aria-hidden
          sx={{
            position: "absolute",
            left: { xs: "-45%", md: "-28%", lg: "-18%" },
            top: { xs: "4%", md: "2%", lg: "0%" },
            width: { xs: "95%", md: "70%", lg: "58%" },
            aspectRatio: "1 / 1",
            borderRadius: "50%",
            pointerEvents: "none",
            background: `radial-gradient(
              circle at center,
              hsl(200 30% 62% / 0.42) 0%,
              hsl(203 35% 40% / 0.22) 38%,
              transparent 68%
            )`,
          }}
        />
      </Parallax>

      <Box sx={{ ...HERO_CONTENT_CONTAINER_SX, position: "relative", zIndex: 1 }}>
        <Stack spacing={{ xs: 3, md: 3.5, lg: 4 }}>
          <Parallax speed={contentSpeed}>
            <Stack spacing={{ xs: 3, md: 3.5, lg: 4 }}>
              <Stack spacing={{ xs: 1.5, md: 2 }}>
                <Typography
                  component="p"
                  sx={titleTypeSx("heroEyebrow", {
                    color: HERO_COLORS.accent,
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                    fontWeight: 700,
                    m: 0,
                  })}
                >
                  {data.eyebrow}
                </Typography>

                <Typography
                  component="h1"
                  sx={titleTypeSx("heroTitle", {
                    color: HERO_COLORS.textOnDark,
                    fontWeight: 700,
                    lineHeight: 1.15,
                    m: 0,
                  })}
                >
                  {data.title}
                </Typography>

                <Typography
                  component="p"
                  sx={bodyTypeSx("heroDescription", {
                    color: HERO_COLORS.accent,
                    fontWeight: 500,
                    lineHeight: 1.5,
                    maxWidth: "42rem",
                    m: 0,
                  })}
                >
                  {data.description}
                </Typography>
              </Stack>

              <Box
                component="hr"
                sx={{
                  border: 0,
                  borderTop: `1px solid ${HERO_COLORS.divider}`,
                  m: 0,
                  width: "100%",
                }}
              />

              <Box
                component="dl"
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr 1fr",
                    md: "repeat(4, minmax(0, 1fr))",
                  },
                  columnGap: { xs: 2, md: 3 },
                  rowGap: { xs: 2.5, md: 0 },
                  m: 0,
                }}
              >
                {data.meta.map((item) => (
                  <Box key={item.label} component="div" sx={{ minWidth: 0 }}>
                    <Typography
                      component="dt"
                      sx={bodyTypeSx("heroMetaLabel", {
                        color: HERO_COLORS.metaLabel,
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                        fontWeight: 500,
                        m: 0,
                        mb: 0.75,
                      })}
                    >
                      {item.label}
                    </Typography>
                    <Typography
                      component="dd"
                      sx={bodyTypeSx("heroMetaValue", {
                        color: HERO_COLORS.textOnDark,
                        fontWeight: 600,
                        lineHeight: 1.35,
                        m: 0,
                      })}
                    >
                      {item.value}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Stack>
          </Parallax>

          <Box
            sx={{
              width: "100%",
              mt: { xs: 1, md: 1.5 },
              borderRadius: HERO_IMAGE_BORDER_RADIUS,
              overflow: "hidden",
              lineHeight: 0,
              [breakpointMediaQuery.desktopUp]: {
                mt: 2,
              },
              "& img": {
                width: "100%",
                height: "auto",
                display: "block",
              },
            }}
          >
            <ProjectImage
              objectPath={data.heroImage.objectPath}
              alt={data.heroImage.alt}
              width={data.heroImage.width ?? HERO_IMAGE.width}
              height={data.heroImage.height ?? HERO_IMAGE.height}
              sizes="(max-width: 1100px) 100vw, 1100px"
              priority
              fullViewportLoading
              borderRadius={HERO_IMAGE_BORDER_RADIUS}
            />
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}
