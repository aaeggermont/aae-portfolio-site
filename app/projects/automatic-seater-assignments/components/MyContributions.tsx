"use client";

import { Box, Typography } from "@mui/material";

import {
  AUTOMATIC_SEATER_INTRO_CARD_BODY_COLOR,
  AUTOMATIC_SEATER_INTRO_CARD_TITLE_COLOR,
  bodyTypeSx,
  titleTypeSx,
} from "../typography";
import { useScrollReveal } from "./useScrollReveal";

const MY_CONTRIBUTIONS_CARD_BACKGROUND =
  "linear-gradient(109deg, rgba(230, 233, 238, 0.25) 13.84%, rgba(188, 197, 207, 0.25) 56.92%, rgba(142, 152, 164, 0.30) 78.46%, rgba(188, 197, 207, 0.60) 89.23%, #F2F4F7 100%)";

export type MyContributionsData = {
  title: string;
  items: string[];
};

type Props = {
  data: MyContributionsData;
};

export default function MyContributions({ data }: Props) {
  const { title, items } = data;
  const { ref, revealSx } = useScrollReveal<HTMLDivElement>({
    effect: "fade-up",
    // Wait until the user has actually scrolled past the hero splash.
    armAfterScrollY: 96,
    rootMargin: "0px 0px -18% 0px",
    threshold: 0.25,
    translateYPx: 36,
    durationMs: 900,
  });

  return (
    <Box
      ref={ref}
      component="section"
      sx={{
        width: "100%",
        maxWidth: 660,
        minHeight: 355,
        mx: "auto",
        px: { xs: 3, sm: 5, md: 6 },
        py: { xs: 4, sm: 5, md: 6 },
        borderRadius: "32px",
        overflow: "hidden",
        borderTop: "1px solid transparent",
        background: MY_CONTRIBUTIONS_CARD_BACKGROUND,
        boxShadow: "0 4px 4px 0 rgba(0, 0, 0, 0.25)",
        ...revealSx,
      }}
    >
      <Typography
        component="h2"
        align="center"
        sx={titleTypeSx("introCardTitle", {
          color: AUTOMATIC_SEATER_INTRO_CARD_TITLE_COLOR,
          mb: { xs: 4, sm: 5, md: 6 },
        })}
      >
        {title}
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Box
          component="ol"
          sx={{
            width: "fit-content",
            maxWidth: 420,
            m: 0,
            py: 0,
            pl: 2.5,
            listStyleType: "decimal",
            listStylePosition: "outside",
            color: AUTOMATIC_SEATER_INTRO_CARD_BODY_COLOR,
          }}
        >
          {items.map((item) => (
            <Typography
              key={item}
              component="li"
              sx={bodyTypeSx("introCardBody", {
                color: AUTOMATIC_SEATER_INTRO_CARD_BODY_COLOR,
                display: "list-item",
                py: 0.25,
              })}
            >
              {item}
            </Typography>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
