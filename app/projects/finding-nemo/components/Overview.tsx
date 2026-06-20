import { Box, Container, Typography } from "@mui/material";

import { INTRO_SECTIONS_BACKGROUND, LAYOUT_DIMENSIONS } from "@/app/projects/finding-nemo/layoutConfig";
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
        px: LAYOUT_DIMENSIONS.mobile.margin,
        [breakpointMediaQuery.tabletUp]: {
          px: LAYOUT_DIMENSIONS.tablet.margin,
        },
        [breakpointMediaQuery.desktopUp]: {
          px: LAYOUT_DIMENSIONS.desktop.margin,
        },
      }}
    >
      <Container
        maxWidth={false}
        sx={{
          maxWidth: {
            xs: LAYOUT_DIMENSIONS.mobile.maxWidth,
            md: LAYOUT_DIMENSIONS.tablet.maxWidth,
            lg: LAYOUT_DIMENSIONS.desktop.maxWidth,
          },
        }}
      >
        <Box
          sx={{
            maxWidth: 920,
            mx: "auto",
          }}
        >
          <Typography
            component="h2"
            align="center"
            sx={titleTypeSx("sectionTitle", {
              fontWeight: 700,
              color: "text.primary",
              lineHeight: 1.2,
              mb: { xs: 4, md: 5 },
            })}
          >
            {data.title}
          </Typography>
          <Box component="article">
            {data.paragraphs.map((paragraph, index) => (
              <Typography
                key={index}
                component="p"
                sx={bodyTypeSx("bodyText", {
                  color: "text.primary",
                  lineHeight: 1.65,
                  mb: index === data.paragraphs.length - 1 ? 0 : 3.5,
                })}
              >
                {paragraph}
              </Typography>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
