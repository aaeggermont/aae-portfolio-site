import {
  Box,
  Container,
  List,
  ListItem,
  Stack,
  Typography,
} from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";

import {
  INTRO_INSET_CARD_TABLET_MAX_WIDTH_PX,
  INTRO_SECTIONS_BACKGROUND,
  LAYOUT_DIMENSIONS,
  MY_CONTRIBUTIONS_CARD,
} from "@/app/projects/finding-nemo/layoutConfig";
import { bodyTypeSx, titleTypeSx } from "@/app/projects/finding-nemo/typography";
import { breakpointMediaQuery } from "@/lib/responsive/breakpoints";
import type { FindingNemoDataProjectDocument } from "@/scripts/project-2.data";

type MyContributionsProps = {
  data: FindingNemoDataProjectDocument["myContributions"];
};

const contributionsCardSx = {
  width: "100%",
  maxWidth: "100%",
  mx: "auto",
  boxSizing: "border-box",
  backgroundColor: MY_CONTRIBUTIONS_CARD.background,
  borderRadius: `${MY_CONTRIBUTIONS_CARD.borderRadiusPx}px`,
  p: `${MY_CONTRIBUTIONS_CARD.paddingPx}px`,
  boxShadow: "0 4px 14px rgba(0, 0, 0, 0.08)",
  [breakpointMediaQuery.tabletOnly]: {
    maxWidth: INTRO_INSET_CARD_TABLET_MAX_WIDTH_PX,
  },
  [breakpointMediaQuery.desktopUp]: {
    maxWidth: MY_CONTRIBUTIONS_CARD.maxWidthPx,
  },
} as const;

export default function MyContributions({ data }: MyContributionsProps) {
  return (
    <Box
      component="section"
      aria-labelledby="my-contributions-heading"
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
        <Box sx={contributionsCardSx}>
          <Stack spacing={{ xs: 4, md: 5 }} alignItems="center">
            <Typography
              id="my-contributions-heading"
              component="h2"
              align="center"
              sx={titleTypeSx("sectionTitle", {
                fontWeight: 700,
                color: "text.primary",
                lineHeight: 1.2,
              })}
            >
              {data.title}
            </Typography>
            <List
              sx={{
                width: "fit-content",
                maxWidth: 520,
                mx: "auto",
                my: 0,
                p: 0,
                listStyleType: "disc",
                listStylePosition: "outside",
                pl: { xs: 4, md: 5 },
              }}
            >
              {data.items.map((item) => (
                <ListItem
                  key={item}
                  disableGutters
                  sx={
                    [
                      {
                        display: "list-item",
                        py: 0.5,
                        color: "text.primary",
                      },
                      bodyTypeSx("bodyText", {
                        lineHeight: 1.65,
                      }),
                    ] as SxProps<Theme>
                  }
                >
                  <Typography
                    component="span"
                    sx={{
                      fontSize: "inherit",
                      lineHeight: "inherit",
                      color: "inherit",
                      fontFamily: "inherit",
                      fontWeight: 400,
                    }}
                  >
                    {item}
                  </Typography>
                </ListItem>
              ))}
            </List>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
