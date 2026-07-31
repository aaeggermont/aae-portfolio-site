import { Box, Container, Stack, Typography } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";

import {
  MY_CONTRIBUTIONS_BAND,
  PROJECT_CONTENT_CONTAINER_SX,
  SECTION_TITLE_CONTENT_GAP,
} from "@/app/projects/finding-nemo/layoutConfig";
import {
  bodyTypeSx,
  FINDING_NEMO_TITLE_FONT,
  TYPOGRAPHY,
} from "@/app/projects/finding-nemo/typography";
import { breakpointMediaQuery } from "@/lib/responsive/breakpoints";
import type { FindingNemoDataProjectDocument } from "@/scripts/project-2.data";

type MyContributionsProps = {
  data: FindingNemoDataProjectDocument["myContributions"];
};

const sectionLabelSx: SxProps<Theme> = {
  fontFamily: FINDING_NEMO_TITLE_FONT,
  fontSize: TYPOGRAPHY.heroSubtitle.mobile,
  fontWeight: 500,
  color: MY_CONTRIBUTIONS_BAND.titleColor,
  lineHeight: 1.2,
  textTransform: "uppercase",
  letterSpacing: "0.04em",
  mb: SECTION_TITLE_CONTENT_GAP.mobile,
  [breakpointMediaQuery.tabletUp]: {
    fontSize: TYPOGRAPHY.heroSubtitle.tablet,
    mb: SECTION_TITLE_CONTENT_GAP.tablet,
  },
  [breakpointMediaQuery.desktopUp]: {
    fontSize: "22px",
    mb: SECTION_TITLE_CONTENT_GAP.desktop,
  },
};

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

const tagChipSx = bodyTypeSx("bodyText", {
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
});

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
            sx={sectionLabelSx}
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
