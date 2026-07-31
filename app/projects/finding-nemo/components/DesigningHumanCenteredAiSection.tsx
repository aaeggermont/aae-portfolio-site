"use client";

import { useEffect, useRef, useState } from "react";
import { Box, Container, Stack, Typography } from "@mui/material";

import {
  HUMAN_CENTERED_AI_FRAMEWORK_CARD,
  HUMAN_CENTERED_AI_FRAMEWORK_CARD_GAP,
  INTRO_SECTIONS_BACKGROUND,
  PANEL_CONTENT_MAX_WIDTH_PX,
  PROJECT_CONTENT_CONTAINER_SX,
  sectionTitleContentGapMbSx,
} from "@/app/projects/finding-nemo/layoutConfig";
import { bodyTypeSx, titleTypeSx } from "@/app/projects/finding-nemo/typography";
import { breakpointMediaQuery } from "@/lib/responsive/breakpoints";
import type { FindingNemoDataProjectDocument } from "@/scripts/project-2.data";

type DesigningHumanCenteredAiSectionProps = {
  data: FindingNemoDataProjectDocument["designingHumanCenteredAi"];
};

const CARD_REVEAL_STAGGER_MS = 90;

const sectionLabelSx = [
  titleTypeSx("heroSubtitle", {
    fontWeight: 500,
    color: "#0B6E9F",
    lineHeight: 1.2,
    mb: 1.5,
    textTransform: "uppercase",
    letterSpacing: "0.04em",
  }),
  {
    [breakpointMediaQuery.desktopUp]: {
      fontSize: "22px",
    },
  },
] as const;

const sectionHeadlineSx = titleTypeSx("sectionTitle", {
  fontWeight: 700,
  color: "#073B5E",
  lineHeight: 1.2,
});

const frameworkCardsRowSx = {
  width: "100%",
  display: "grid",
  gridTemplateColumns: "1fr",
  alignItems: "stretch",
  justifyItems: "center",
  gap: `${HUMAN_CENTERED_AI_FRAMEWORK_CARD_GAP.mobile}px`,
  [breakpointMediaQuery.tabletUp]: {
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    justifyItems: "stretch",
    gap: `${HUMAN_CENTERED_AI_FRAMEWORK_CARD_GAP.tablet}px`,
  },
  [breakpointMediaQuery.desktopUp]: {
    gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
    gap: `${HUMAN_CENTERED_AI_FRAMEWORK_CARD_GAP.desktop}px`,
  },
} as const;

const frameworkCardShellSx = {
  width: HUMAN_CENTERED_AI_FRAMEWORK_CARD.widthPx.mobile,
  maxWidth: "100%",
  boxSizing: "border-box",
  borderRadius: `${HUMAN_CENTERED_AI_FRAMEWORK_CARD.borderRadiusPx}px`,
  bgcolor: HUMAN_CENTERED_AI_FRAMEWORK_CARD.background,
  border: `1px solid ${HUMAN_CENTERED_AI_FRAMEWORK_CARD.border}`,
  px: { xs: 2.5, md: 3 },
  py: { xs: 2.5, md: 3 },
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: 1.5,
  [breakpointMediaQuery.tabletUp]: {
    width: "100%",
  },
} as const;

function formatStageNumber(index: number) {
  return String(index + 1).padStart(2, "0");
}

export default function DesigningHumanCenteredAiSection({
  data,
}: DesigningHumanCenteredAiSectionProps) {
  const cardsRef = useRef<HTMLDivElement | null>(null);
  const [cardsInView, setCardsInView] = useState(false);

  useEffect(() => {
    const el = cardsRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCardsInView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        threshold: 0.15,
        rootMargin: "0px 0px -10% 0px",
      },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Box
      component="section"
      sx={{
        bgcolor: INTRO_SECTIONS_BACKGROUND,
        py: { xs: 8, md: 10, lg: 12 },
      }}
    >
      <Container maxWidth={false} sx={PROJECT_CONTENT_CONTAINER_SX}>
        <Stack spacing={{ xs: 5, md: 6, lg: 8 }} sx={{ width: "100%" }}>
          <Box sx={{ width: "100%", maxWidth: PANEL_CONTENT_MAX_WIDTH_PX }}>
            <Stack sx={sectionTitleContentGapMbSx}>
              {data.sectionLabel ? (
                <Typography component="p" align="left" sx={sectionLabelSx}>
                  {data.sectionLabel}
                </Typography>
              ) : null}
              <Typography component="h2" align="left" sx={sectionHeadlineSx}>
                {data.title}
              </Typography>
            </Stack>
            <Box component="article">
              {data.paragraphs.map((paragraph, index) => (
                <Typography
                  key={index}
                  component="p"
                  sx={bodyTypeSx("sectionDescription", {
                    fontWeight: 400,
                    lineHeight: 1.5,
                    textAlign: "left",
                    mb: index === data.paragraphs.length - 1 ? 0 : 3.5,
                  })}
                >
                  {paragraph}
                </Typography>
              ))}
            </Box>
          </Box>

          <Box ref={cardsRef} sx={frameworkCardsRowSx}>
            {data.cards.map((card, cardIndex) => (
              <Box
                key={card.title}
                component="article"
                sx={{
                  ...frameworkCardShellSx,
                  opacity: cardsInView ? 1 : 0,
                  transform: cardsInView ? "translateY(0)" : "translateY(24px)",
                  transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
                  transitionDelay: cardsInView
                    ? `${cardIndex * CARD_REVEAL_STAGGER_MS}ms`
                    : "0ms",
                }}
              >
                <Typography
                  component="span"
                  sx={titleTypeSx("sectionTitle", {
                    color: HUMAN_CENTERED_AI_FRAMEWORK_CARD.numberColor,
                    fontWeight: 700,
                    lineHeight: 1,
                    m: 0,
                  })}
                >
                  {formatStageNumber(cardIndex)}
                </Typography>
                <Typography
                  component="h3"
                  sx={titleTypeSx("contentCardTitle", {
                    color: HUMAN_CENTERED_AI_FRAMEWORK_CARD.titleColor,
                    fontWeight: 700,
                    lineHeight: 1.2,
                    m: 0,
                  })}
                >
                  {card.title}
                </Typography>
                <Typography
                  component="p"
                  sx={bodyTypeSx("contentCardBody", {
                    fontWeight: 400,
                    lineHeight: 1.5,
                    textAlign: "left",
                    m: 0,
                  })}
                >
                  {Array.isArray(card.description)
                    ? card.description.join(" ")
                    : card.description}
                </Typography>
              </Box>
            ))}
          </Box>

          {data.paragraphAfterCards ? (
            <Typography
              component="p"
              sx={bodyTypeSx("sectionDescription", {
                fontWeight: 400,
                lineHeight: 1.5,
                textAlign: "left",
                maxWidth: PANEL_CONTENT_MAX_WIDTH_PX,
                m: 0,
              })}
            >
              {data.paragraphAfterCards}
            </Typography>
          ) : null}
        </Stack>
      </Container>
    </Box>
  );
}
