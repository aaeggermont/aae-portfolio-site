"use client";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Headphones, Music2, Users, type LucideIcon } from "lucide-react";

import FullBleedBand from "@/app/projects/spotify-music-groups-session/components/FullBleedBand";
import { SECTION_COLORS } from "@/app/projects/spotify-music-groups-session/layoutConfig";
import {
  bodyTypeSx,
  titleTypeSx,
} from "@/app/projects/spotify-music-groups-session/typography";
import type { SpotifyMusicGroupsSessionDataProjectDocument } from "@/scripts/project-8.data";
import { breakpointMediaQuery } from "@/lib/responsive/breakpoints";

type ActivityHierarchyData =
  SpotifyMusicGroupsSessionDataProjectDocument["activityHierarchy"];

type ActivityHierarchySectionProps = {
  data: ActivityHierarchyData;
};

const TIER_ICONS: Record<ActivityHierarchyData["tiers"][number]["icon"], LucideIcon> = {
  users: Users,
  music: Music2,
  headphones: Headphones,
};

export default function ActivityHierarchySection({
  data,
}: ActivityHierarchySectionProps) {
  return (
    <FullBleedBand
      dataId="spotify-activity-hierarchy"
      backgroundColor={SECTION_COLORS.band}
    >
      <Stack spacing={{ xs: 2, md: 2.5 }} sx={{ maxWidth: "48rem" }}>
        <Typography
          component="p"
          sx={bodyTypeSx("sectionEyebrow", {
            color: SECTION_COLORS.label,
            textTransform: "uppercase",
            letterSpacing: "0.14em",
            fontWeight: 600,
            m: 0,
          })}
        >
          {data.eyebrow}
        </Typography>

        <Typography
          component="h2"
          sx={titleTypeSx("sectionTitle", {
            color: SECTION_COLORS.heading,
            fontWeight: 700,
            lineHeight: 1.2,
            m: 0,
          })}
        >
          {data.title}
        </Typography>

        <Typography
          component="p"
          sx={bodyTypeSx("bodyText", {
            color: SECTION_COLORS.body,
            fontWeight: 400,
            lineHeight: 1.65,
            m: 0,
            pt: { xs: 0.5, md: 1 },
          })}
        >
          {data.intro}
        </Typography>
      </Stack>

      <Box
        sx={{
          mt: { xs: 4, md: 5 },
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "repeat(3, minmax(0, 1fr))" },
          gap: { xs: 4, md: 3 },
          position: "relative",
        }}
      >
        {/* Desktop connector behind the icon nodes */}
        <Box
          aria-hidden
          sx={{
            display: "none",
            [breakpointMediaQuery.tabletUp]: {
              display: "block",
              position: "absolute",
              top: 32,
              left: "16%",
              right: "16%",
              height: "1px",
              backgroundColor: SECTION_COLORS.cardBorder,
              zIndex: 0,
            },
          }}
        />

        {data.tiers.map((tier, idx) => {
          const Icon = TIER_ICONS[tier.icon];

          return (
            <Box
              key={tier.level}
              sx={{
                position: "relative",
                zIndex: 1,
                display: "flex",
                flexDirection: "column",
                height: "100%",
              }}
            >
              <Stack alignItems="center" spacing={1}>
                <Box
                  sx={{
                    width: 64,
                    height: 64,
                    borderRadius: "50%",
                    backgroundColor: SECTION_COLORS.cardSurface,
                    border: `2px solid ${SECTION_COLORS.label}`,
                    display: "grid",
                    placeItems: "center",
                    boxShadow: "0 1px 2px rgba(15, 23, 42, 0.06)",
                  }}
                >
                  <Icon size={24} color={SECTION_COLORS.label} strokeWidth={2} />
                </Box>
                <Box
                  component="span"
                  sx={{
                    ...bodyTypeSx("pillLabel"),
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 999,
                    backgroundColor: SECTION_COLORS.heading,
                    color: "#FFFFFF",
                    fontWeight: 600,
                    px: 1.5,
                    py: 0.35,
                  }}
                >
                  {tier.level}
                </Box>
              </Stack>

              <Box
                sx={{
                  mt: 3,
                  flex: 1,
                  borderRadius: "16px",
                  border: `1px solid ${SECTION_COLORS.cardBorder}`,
                  backgroundColor: SECTION_COLORS.cardSurface,
                  px: 2.5,
                  py: 2.5,
                }}
              >
                <Typography
                  component="p"
                  sx={bodyTypeSx("sectionEyebrow", {
                    color: SECTION_COLORS.accent,
                    textTransform: "uppercase",
                    letterSpacing: "0.14em",
                    fontWeight: 700,
                    m: 0,
                    fontSize: "10px",
                  })}
                >
                  {tier.label}
                </Typography>

                <Box
                  component="ul"
                  sx={{
                    m: 0,
                    mt: 1.5,
                    p: 0,
                    listStyle: "none",
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                  }}
                >
                  {tier.items.map((item) => (
                    <Box
                      key={item}
                      component="li"
                      sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 1,
                      }}
                    >
                      <Box
                        aria-hidden
                        sx={{
                          mt: "7px",
                          width: 6,
                          height: 6,
                          borderRadius: "50%",
                          backgroundColor: SECTION_COLORS.label,
                          flexShrink: 0,
                        }}
                      />
                      <Typography
                        component="span"
                        sx={bodyTypeSx("cardBody", {
                          color: SECTION_COLORS.body,
                          fontWeight: 400,
                          lineHeight: 1.45,
                        })}
                      >
                        {item}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>

              {idx < data.tiers.length - 1 ? (
                <Box
                  aria-hidden
                  sx={{
                    display: "none",
                    [breakpointMediaQuery.tabletUp]: {
                      display: "flex",
                      position: "absolute",
                      top: 28,
                      right: -14,
                      width: 28,
                      alignItems: "center",
                      justifyContent: "center",
                      color: SECTION_COLORS.label,
                      fontSize: "18px",
                      fontWeight: 600,
                      zIndex: 2,
                      pointerEvents: "none",
                    },
                  }}
                >
                  →
                </Box>
              ) : null}
            </Box>
          );
        })}
      </Box>
    </FullBleedBand>
  );
}
