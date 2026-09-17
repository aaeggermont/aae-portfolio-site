"use client";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import {
  CONTENT_CONTAINER_SX,
  SECTION_COLORS,
  SECTION_PADDING_Y,
} from "@/app/projects/spotify-music-groups-session/layoutConfig";
import {
  bodyTypeSx,
  titleTypeSx,
} from "@/app/projects/spotify-music-groups-session/typography";
import type { SpotifyMusicGroupsSessionDataProjectDocument } from "@/scripts/project-8.data";
import ProjectImage from "@/lib/media/ProjectImage";

type TheQuestionSectionProps = {
  data: SpotifyMusicGroupsSessionDataProjectDocument["theQuestion"];
};

export default function TheQuestionSection({ data }: TheQuestionSectionProps) {
  return (
    <Box
      component="section"
      data-id="spotify-the-question"
      sx={{
        width: "100%",
        backgroundColor: SECTION_COLORS.surface,
        py: {
          xs: SECTION_PADDING_Y.mobile,
          md: SECTION_PADDING_Y.tablet,
          lg: SECTION_PADDING_Y.desktop,
        },
      }}
    >
      <Box sx={CONTENT_CONTAINER_SX}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "1.15fr 0.85fr" },
            columnGap: { lg: "3.5rem" },
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
                maxWidth: "22ch",
              })}
            >
              {data.title}
            </Typography>

            <Typography
              component="p"
              sx={bodyTypeSx("sectionByline", {
                color: SECTION_COLORS.accent,
                fontWeight: 500,
                m: 0,
              })}
            >
              {data.byline}
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

          <Box
            sx={{
              backgroundColor: SECTION_COLORS.card,
              borderRadius: "16px",
              px: { xs: 2.5, md: 3.5 },
              py: { xs: 3, md: 4 },
              display: "flex",
              flexDirection: "column",
              gap: { xs: 2.5, md: 3 },
              height: "fit-content",
            }}
          >
            <Box
              aria-hidden
              sx={{
                width: data.callout.icon.width,
                height: data.callout.icon.height,
                lineHeight: 0,
                "& img": {
                  width: "100%",
                  height: "100%",
                  display: "block",
                },
              }}
            >
              <ProjectImage
                objectPath={data.callout.icon.objectPath}
                alt={data.callout.icon.alt || ""}
                width={data.callout.icon.width}
                height={data.callout.icon.height}
              />
            </Box>

            <Typography
              component="blockquote"
              sx={titleTypeSx("calloutQuote", {
                color: SECTION_COLORS.heading,
                fontWeight: 700,
                lineHeight: 1.35,
                m: 0,
                quotes: "none",
              })}
            >
              {data.callout.quote}
            </Typography>

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
              {data.callout.label}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
