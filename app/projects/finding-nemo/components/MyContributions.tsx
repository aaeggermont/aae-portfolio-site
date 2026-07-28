import { Box, Container, Stack, Typography } from "@mui/material";

import {
  MY_CONTRIBUTIONS_BAND,
  PROJECT_CONTENT_CONTAINER_SX,
  sectionTitleContentGapMbSx,
} from "@/app/projects/finding-nemo/layoutConfig";
import { bodyTypeSx, titleTypeSx } from "@/app/projects/finding-nemo/typography";
import { breakpointMediaQuery } from "@/lib/responsive/breakpoints";
import type { FindingNemoDataProjectDocument } from "@/scripts/project-2.data";

type MyContributionsProps = {
  data: FindingNemoDataProjectDocument["myContributions"];
};

const sectionLabelSx = [
  titleTypeSx("heroSubtitle", {
    fontWeight: 500,
    color: MY_CONTRIBUTIONS_BAND.titleColor,
    lineHeight: 1.2,
    textTransform: "uppercase",
    letterSpacing: "0.04em",
  }),
  {
    [breakpointMediaQuery.desktopUp]: {
      fontSize: "22px",
    },
  },
] as const;

const tagsRowSx = {
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  justifyContent: "flex-start",
  gap: `${MY_CONTRIBUTIONS_BAND.tagGap.mobile}px`,
  width: "100%",
  m: 0,
  p: 0,
  listStyle: "none",
  [breakpointMediaQuery.tabletUp]: {
    gap: `${MY_CONTRIBUTIONS_BAND.tagGap.tablet}px`,
  },
  [breakpointMediaQuery.desktopUp]: {
    gap: `${MY_CONTRIBUTIONS_BAND.tagGap.desktop}px`,
  },
} as const;

const tagChipSx = [
  bodyTypeSx("bodyText", {
    display: "inline-flex",
    alignItems: "center",
    px: { xs: 2, md: 2.5 },
    py: { xs: 1, md: 1.25 },
    borderRadius: "999px",
    bgcolor: MY_CONTRIBUTIONS_BAND.tagBackground,
    border: `1px solid ${MY_CONTRIBUTIONS_BAND.tagBorder}`,
    color: MY_CONTRIBUTIONS_BAND.tagText,
    fontWeight: 400,
    lineHeight: 1.35,
    whiteSpace: "nowrap",
  }),
] as const;

export default function MyContributions({ data }: MyContributionsProps) {
  return (
    <Box
      component="section"
      aria-labelledby="my-contributions-heading"
      sx={{
        bgcolor: MY_CONTRIBUTIONS_BAND.background,
        py: { xs: 8, md: 10, lg: 12 },
      }}
    >
      <Container maxWidth={false} sx={PROJECT_CONTENT_CONTAINER_SX}>
        <Stack alignItems="flex-start" sx={{ width: "100%" }}>
          <Typography
            id="my-contributions-heading"
            component="h2"
            align="left"
            sx={[...sectionLabelSx, sectionTitleContentGapMbSx]}
          >
            {data.title}
          </Typography>
          <Box component="ul" sx={tagsRowSx}>
            {data.items.map((item) => (
              <Box component="li" key={item} sx={tagChipSx}>
                {item}
              </Box>
            ))}
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
