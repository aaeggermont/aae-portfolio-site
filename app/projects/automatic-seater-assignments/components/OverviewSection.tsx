"use client";

import { Box, Stack, Typography } from "@mui/material";

import { overviewParagraphMaxWidthSx } from "../layoutConfig";
import {
  AUTOMATIC_SEATER_OVERVIEW_TITLE_COLOR,
  bodyTypeSx,
  titleTypeSx,
} from "../typography";
import { useScrollReveal } from "./useScrollReveal";

export type OverviewSectionData = {
  title: string;
  paragraphs: string[];
  background: string;
};

type Props = {
  data: OverviewSectionData;
};

export const OverviewSection = ({ data }: Props) => {
  const { title, paragraphs } = data;
  const { ref, revealSx } = useScrollReveal<HTMLDivElement>({
    effect: "zoom-in",
    hideUntilReveal: false,
    armAfterScrollY: 56,
    rootMargin: "0px 0px -8% 0px",
    threshold: 0.15,
    scaleFrom: 0.96,
    durationMs: 900,
  });

  return (
    <Stack
      ref={ref}
      spacing={4}
      alignItems="center"
      sx={{ width: "100%", ...revealSx }}
    >
      <Typography
        component="h2"
        textAlign="center"
        sx={titleTypeSx("sectionTitle", {
          color: AUTOMATIC_SEATER_OVERVIEW_TITLE_COLOR,
        })}
      >
        {title}
      </Typography>
      <Box sx={overviewParagraphMaxWidthSx}>
        {paragraphs.map((text, index) => (
          <Typography
            key={index}
            component="p"
            sx={bodyTypeSx("overviewBody", {
              mb: index < paragraphs.length - 1 ? 3 : 0,
            })}
          >
            {text}
          </Typography>
        ))}
      </Box>
    </Stack>
  );
};

export default OverviewSection;
