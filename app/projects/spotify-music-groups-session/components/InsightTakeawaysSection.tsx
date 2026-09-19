"use client";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { AlertTriangle, Sparkles, type LucideIcon } from "lucide-react";

import FullBleedBand from "@/app/projects/spotify-music-groups-session/components/FullBleedBand";
import {
  HERO_COLORS,
  SECTION_COLORS,
} from "@/app/projects/spotify-music-groups-session/layoutConfig";
import {
  bodyTypeSx,
  titleTypeSx,
} from "@/app/projects/spotify-music-groups-session/typography";
import type { SpotifyMusicGroupsSessionDataProjectDocument } from "@/scripts/project-8.data";

type InsightTakeawaysData =
  SpotifyMusicGroupsSessionDataProjectDocument["insightTakeaways"];

type InsightTakeawaysSectionProps = {
  data: InsightTakeawaysData;
};

const INSIGHT_ICONS: Record<
  InsightTakeawaysData["insights"][number]["icon"],
  LucideIcon
> = {
  sparkles: Sparkles,
  alertTriangle: AlertTriangle,
};

const ACCENT_STYLES = {
  amber: {
    border: HERO_COLORS.accent,
    label: HERO_COLORS.accent,
    iconBg: "rgba(224, 160, 90, 0.12)",
    icon: HERO_COLORS.accent,
  },
  sea: {
    border: SECTION_COLORS.label,
    label: SECTION_COLORS.label,
    iconBg: SECTION_COLORS.highlight,
    icon: SECTION_COLORS.label,
  },
} as const;

export default function InsightTakeawaysSection({
  data,
}: InsightTakeawaysSectionProps) {
  return (
    <FullBleedBand
      dataId="spotify-insight-takeaways"
      backgroundColor={SECTION_COLORS.surface}
    >
      <Stack spacing={{ xs: 1.5, md: 2 }} sx={{ maxWidth: "48rem" }}>
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
            letterSpacing: "-0.02em",
            m: 0,
          })}
        >
          {data.title}
        </Typography>
      </Stack>

      <Box
        sx={{
          mt: { xs: 4, md: 5 },
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))" },
          gap: { xs: 3, md: 3 },
          alignItems: "stretch",
        }}
      >
        {data.insights.map((insight) => {
          const Icon = INSIGHT_ICONS[insight.icon];
          const accent = ACCENT_STYLES[insight.accent];

          return (
            <Box
              key={insight.label}
              sx={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                borderRadius: "16px",
                border: `1px solid ${SECTION_COLORS.cardBorder}`,
                borderLeft: `4px solid ${accent.border}`,
                backgroundColor: SECTION_COLORS.cardSurface,
                boxShadow: "0 1px 2px rgba(15, 23, 42, 0.04)",
                px: { xs: 2.5, md: 3.5 },
                py: { xs: 2.5, md: 3.5 },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                }}
              >
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    backgroundColor: accent.iconBg,
                    display: "grid",
                    placeItems: "center",
                    flexShrink: 0,
                  }}
                >
                  <Icon size={20} color={accent.icon} strokeWidth={2} />
                </Box>
                <Typography
                  component="span"
                  sx={bodyTypeSx("sectionEyebrow", {
                    color: accent.label,
                    textTransform: "uppercase",
                    letterSpacing: "0.18em",
                    fontWeight: 600,
                    m: 0,
                  })}
                >
                  {insight.label}
                </Typography>
              </Box>

              <Typography
                component="h3"
                sx={titleTypeSx("cardTitle", {
                  color: SECTION_COLORS.heading,
                  fontWeight: 700,
                  lineHeight: 1.35,
                  m: 0,
                  mt: 2,
                })}
              >
                {insight.title}
              </Typography>

              <Typography
                component="p"
                sx={bodyTypeSx("cardBody", {
                  color: SECTION_COLORS.body,
                  fontWeight: 400,
                  lineHeight: 1.65,
                  m: 0,
                  mt: 1.5,
                  flex: 1,
                })}
              >
                {insight.body}
              </Typography>
            </Box>
          );
        })}
      </Box>

      <Box
        sx={{
          mt: { xs: 5, md: 6 },
          borderTop: `1px solid ${SECTION_COLORS.cardBorder}`,
          pt: { xs: 3, md: 4 },
        }}
      >
        <Typography
          component="h3"
          sx={titleTypeSx("pillLabel", {
            color: SECTION_COLORS.heading,
            textTransform: "uppercase",
            letterSpacing: "0.18em",
            fontWeight: 700,
            m: 0,
          })}
        >
          {data.references.label}
        </Typography>

        <Box
          component="ol"
          sx={{
            m: 0,
            mt: 2,
            p: 0,
            listStyle: "none",
            display: "flex",
            flexDirection: "column",
            gap: 1.25,
          }}
        >
          {data.references.items.map((ref, index) => (
            <Box
              key={`${index}-${ref.text.slice(0, 24)}`}
              component="li"
              sx={{
                position: "relative",
                pl: 2,
                ...bodyTypeSx("sectionEyebrow", {
                  color: "hsl(210 12% 46%)",
                  fontWeight: 400,
                  lineHeight: 1.65,
                  fontSize: "12px",
                }),
              }}
            >
              <Box
                component="span"
                sx={{
                  position: "absolute",
                  left: 0,
                  color: SECTION_COLORS.label,
                  fontWeight: 600,
                }}
              >
                {index + 1}.
              </Box>
              {ref.url ? (
                <Box
                  component="a"
                  href={ref.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    color: SECTION_COLORS.label,
                    textDecoration: "none",
                    "&:hover": {
                      color: SECTION_COLORS.heading,
                      textDecoration: "underline",
                    },
                  }}
                >
                  {ref.text}
                </Box>
              ) : (
                ref.text
              )}
            </Box>
          ))}
        </Box>
      </Box>
    </FullBleedBand>
  );
}
