import {
  Box,
  Container,
  List,
  ListItem,
  Stack,
  Typography,
} from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";

import { INTRO_SECTIONS_BACKGROUND, LAYOUT_DIMENSIONS } from "@/app/projects/finding-nemo/layoutConfig";
import { bodyTypeSx, titleTypeSx } from "@/app/projects/finding-nemo/typography";
import { breakpointMediaQuery } from "@/lib/responsive/breakpoints";
import type { FindingNemoDataProjectDocument } from "@/scripts/project-2.data";

type MyContributionsProps = {
  data: FindingNemoDataProjectDocument["myContributions"];
};

export default function MyContributions({ data }: MyContributionsProps) {
  return (
    <Box
      component="section"
      sx={{
        bgcolor: INTRO_SECTIONS_BACKGROUND,
        py: { xs: 10, md: 12, lg: 16 },
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
        <Stack spacing={4} alignItems="center">
          <Typography
            component="h2"
            sx={titleTypeSx("sectionTitle", {
              fontWeight: 700,
              color: "common.black",
              textAlign: "center",
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
                      color: "common.black",
                    },
                    bodyTypeSx("bodyText", {
                      lineHeight: 1.6,
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
      </Container>
    </Box>
  );
}
