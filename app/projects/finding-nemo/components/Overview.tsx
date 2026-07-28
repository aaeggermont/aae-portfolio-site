import { Box, Container, Stack, Typography } from "@mui/material";

import {
  INTRO_SECTIONS_BACKGROUND,
  PROJECT_CONTENT_CONTAINER_SX,
  sectionTitleContentGapMbSx,
} from "@/app/projects/finding-nemo/layoutConfig";
import { bodyTypeSx, titleTypeSx } from "@/app/projects/finding-nemo/typography";
import { breakpointMediaQuery } from "@/lib/responsive/breakpoints";
import type { FindingNemoDataProjectDocument } from "@/scripts/project-2.data";

type OverviewSectionProps = {
  data: FindingNemoDataProjectDocument["overview"];
};

export default function OverviewSection({ data }: OverviewSectionProps) {
  return (
    <Box
      component="section"
      sx={{
        bgcolor: INTRO_SECTIONS_BACKGROUND,
        py: { xs: 8, md: 10, lg: 12 },
      }}
    >
      <Container maxWidth={false} sx={PROJECT_CONTENT_CONTAINER_SX}>
        <Stack sx={sectionTitleContentGapMbSx}>
          {data.sectionLabel ? (
            <Typography
              component="p"
              align="left"
              sx={[
                titleTypeSx("heroSubtitle", {
                  fontWeight: 500,
                  color: "#0B6E9F",
                  lineHeight: 1.2,
                  mb: 1.5,
                  textTransform: "uppercase",
                }),
                {
                  [breakpointMediaQuery.desktopUp]: {
                    fontSize: "22px",
                  },
                },
              ]}
            >
              {data.sectionLabel}
            </Typography>
          ) : null}
          <Typography
            component="h2"
            align="left"
            sx={titleTypeSx("sectionTitle", {
              fontWeight: 700,
              color: "#073B5E",
              lineHeight: 1.2,
            })}
          >
            {data.title}
          </Typography>
        </Stack>
        <Box component="article">
          {data.paragraphs.map((paragraph, index) => (
            <Typography
              key={index}
              component="p"
              sx={bodyTypeSx("sectionDescription", {
                color: "#3F5266",
                fontWeight: 400,
                lineHeight: 1.5,
                mb: index === data.paragraphs.length - 1 ? 0 : 3.5,
              })}
            >
              {paragraph}
            </Typography>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
