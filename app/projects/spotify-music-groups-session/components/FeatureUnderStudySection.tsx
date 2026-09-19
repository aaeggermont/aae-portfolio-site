"use client";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import FullBleedBand from "@/app/projects/spotify-music-groups-session/components/FullBleedBand";
import GroupsSessionPhones from "@/app/projects/spotify-music-groups-session/components/GroupsSessionPhones";
import { SECTION_COLORS } from "@/app/projects/spotify-music-groups-session/layoutConfig";
import {
  bodyTypeSx,
  titleTypeSx,
} from "@/app/projects/spotify-music-groups-session/typography";
import type { SpotifyMusicGroupsSessionDataProjectDocument } from "@/scripts/project-8.data";

type FeatureUnderStudySectionProps = {
  data: SpotifyMusicGroupsSessionDataProjectDocument["featureUnderStudy"];
};

export default function FeatureUnderStudySection({
  data,
}: FeatureUnderStudySectionProps) {
  return (
    <FullBleedBand
      dataId="spotify-feature-under-study"
      backgroundColor={SECTION_COLORS.surface}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", lg: "1.05fr 0.95fr" },
          columnGap: { lg: "3rem" },
          rowGap: { xs: "2.5rem", md: "3rem" },
          alignItems: "center",
        }}
      >
        <Stack spacing={{ xs: 2, md: 2.5 }}>
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
              maxWidth: "18ch",
            })}
          >
            {data.title}
          </Typography>

          <Stack spacing={{ xs: 2, md: 2.25 }} sx={{ pt: { xs: 0.5, md: 1 } }}>
            {data.paragraphs.map((paragraph) => (
              <Typography
                key={paragraph.slice(0, 32)}
                component="p"
                sx={bodyTypeSx("bodyText", {
                  color: SECTION_COLORS.body,
                  fontWeight: 400,
                  lineHeight: 1.65,
                  m: 0,
                })}
              >
                {paragraph}
              </Typography>
            ))}
          </Stack>
        </Stack>

        <GroupsSessionPhones />
      </Box>
    </FullBleedBand>
  );
}
