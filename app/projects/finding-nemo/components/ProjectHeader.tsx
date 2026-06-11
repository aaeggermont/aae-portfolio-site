import { useEffect } from "react";
import { Box, Container, Stack, Typography } from "@mui/material";

import { LAYOUT_DIMENSIONS } from "@/app/projects/finding-nemo/layoutConfig";
import { titleTypeSx } from "@/app/projects/finding-nemo/typography";
import { breakpointMediaQuery } from "@/lib/responsive/breakpoints";
import type { FindingNemoDataProjectDocument } from "@/scripts/project-2.data";

type ProjectHeaderProps = {
  data: FindingNemoDataProjectDocument["projectHeader"];
  onReady?: () => void;
};

export default function ProjectHeader({ data, onReady }: ProjectHeaderProps) {
  useEffect(() => {
    onReady?.();
  }, [onReady]);

  return (
    <Box
      component="section"
      sx={{
        width: "100%",
        bgcolor: "#dde8f2",
        minHeight: { xs: 360, md: 420, lg: 502 },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: LAYOUT_DIMENSIONS.mobile.margin,
        py: { xs: 8, md: 10, lg: 12 },
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
        <Stack
          spacing={{ xs: 2, md: 2.5 }}
          alignItems="center"
          justifyContent="center"
          textAlign="center"
        >
          <Typography
            component="h1"
            sx={titleTypeSx("heroTitle", {
              color: "#022f5d",
              fontWeight: 400,
              lineHeight: 1.2,
              WebkitTextStroke: "1px #000000",
            })}
          >
            {data.title}
          </Typography>
          <Typography
            component="p"
            sx={titleTypeSx("heroSubtitle", {
              color: "#02305d",
              fontWeight: 500,
              lineHeight: 1.35,
              maxWidth: { xs: "100%", md: 540 },
            })}
          >
            {data.subtitle}
          </Typography>
          <Typography
            component="p"
            sx={titleTypeSx("heroSubtitle", {
              color: "#02305d",
              fontWeight: 500,
              lineHeight: 1.35,
            })}
          >
            {data.award}
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}
