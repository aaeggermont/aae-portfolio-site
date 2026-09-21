"use client";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import FullBleedBand from "@/app/projects/spotify-music-groups-session/components/FullBleedBand";
import { SECTION_COLORS } from "@/app/projects/spotify-music-groups-session/layoutConfig";
import {
  bodyTypeSx,
  titleTypeSx,
} from "@/app/projects/spotify-music-groups-session/typography";
import type { SpotifyMusicGroupsSessionDataProjectDocument } from "@/scripts/project-8.data";

type ProductContextSectionProps = {
  data: SpotifyMusicGroupsSessionDataProjectDocument["productContext"];
};

export default function ProductContextSection({
  data,
}: ProductContextSectionProps) {
  return (
    <FullBleedBand
      dataId="spotify-product-context"
      backgroundColor={SECTION_COLORS.band}
    >
      <Stack spacing={{ xs: 2, md: 2.5 }} sx={{ maxWidth: "46rem" }}>
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
    </FullBleedBand>
  );
}
