"use client";

import { useEffect, useRef, useState } from "react";
import { Box, List, ListItem, Stack, Typography } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";

import {
  BAND_COLORS,
  IDENTIFY_AI_OPPORTUNITY_CARD,
  PANEL_CONTENT_MAX_WIDTH_PX,
  SECTION_GAPS,
  sectionTitleContentGapMbSx,
  sectionTitleContentGapMtSx,
} from "@/app/projects/finding-nemo/layoutConfig";
import FullBleedBand from "@/app/projects/finding-nemo/components/FullBleedBand";
import { bodyTypeSx, titleTypeSx } from "@/app/projects/finding-nemo/typography";
import { breakpointMediaQuery } from "@/lib/responsive/breakpoints";
import type { FindingNemoDataProjectDocument } from "@/scripts/project-2.data";

type IdentifyAiOpportunitySectionProps = {
  framing: FindingNemoDataProjectDocument["problemSpaceFraming"];
  challenges: FindingNemoDataProjectDocument["challenges"];
  businessOpportunities: FindingNemoDataProjectDocument["businessOpportunities"];
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

const subsectionTitleSx = titleTypeSx("sectionSubtitle", {
  fontWeight: 700,
  color: "#073B5E",
  lineHeight: 1.2,
});

const cardsRowSx = {
  width: "100%",
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  alignItems: "stretch",
  justifyContent: "center",
  gap: `${IDENTIFY_AI_OPPORTUNITY_CARD.gap.mobile}px`,
  [breakpointMediaQuery.tabletUp]: {
    justifyContent: "flex-start",
    gap: `${IDENTIFY_AI_OPPORTUNITY_CARD.gap.tablet}px`,
  },
  [breakpointMediaQuery.desktopUp]: {
    gap: `${IDENTIFY_AI_OPPORTUNITY_CARD.gap.desktop}px`,
  },
} as const;

const cardShellSx = {
  flex: "0 1 auto",
  width: IDENTIFY_AI_OPPORTUNITY_CARD.widthPx.mobile,
  maxWidth: "100%",
  boxSizing: "border-box",
  borderRadius: `${IDENTIFY_AI_OPPORTUNITY_CARD.borderRadiusPx}px`,
  bgcolor: IDENTIFY_AI_OPPORTUNITY_CARD.background,
  border: `1px solid ${IDENTIFY_AI_OPPORTUNITY_CARD.border}`,
  px: { xs: 2.5, md: 3 },
  py: { xs: 2.5, md: 3 },
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: 1.5,
  [breakpointMediaQuery.tabletUp]: {
    width: IDENTIFY_AI_OPPORTUNITY_CARD.widthPx.tablet,
  },
  [breakpointMediaQuery.desktopUp]: {
    width: IDENTIFY_AI_OPPORTUNITY_CARD.widthPx.desktop,
  },
} as const;

const sectionStackGapSx = {
  mt: SECTION_GAPS.mobile,
  [breakpointMediaQuery.tabletUp]: {
    mt: SECTION_GAPS.tablet,
  },
  [breakpointMediaQuery.desktopUp]: {
    mt: SECTION_GAPS.desktop,
  },
} as const;

type StageCardProps = {
  title: string;
  description: string | string[];
  titleColor: string;
  index: number;
  inView: boolean;
  rowOffsetMs?: number;
};

function StageCard({
  title,
  description,
  titleColor,
  index,
  inView,
  rowOffsetMs = 0,
}: StageCardProps) {
  const bulletItems = Array.isArray(description) ? description : null;

  return (
    <Box
      component="article"
      sx={{
        ...cardShellSx,
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
        transitionDelay: inView
          ? `${rowOffsetMs + index * CARD_REVEAL_STAGGER_MS}ms`
          : "0ms",
      }}
    >
      <Typography
        component="h3"
        sx={[
          titleTypeSx("contentCardTitle", {
            fontWeight: 700,
            lineHeight: 1.2,
            m: 0,
          }),
          { color: titleColor },
        ]}
      >
        {title}
      </Typography>
      {bulletItems ? (
        <List
          sx={{
            width: "100%",
            my: 0,
            p: 0,
            listStyleType: "disc",
            listStylePosition: "outside",
            pl: 2.5,
          }}
        >
          {bulletItems.map((item) => (
            <ListItem
              key={item}
              disableGutters
              sx={
                [
                  {
                    display: "list-item",
                    py: 0.25,
                    color: IDENTIFY_AI_OPPORTUNITY_CARD.bodyColor,
                  },
                  bodyTypeSx("contentCardBody", {
                    lineHeight: 1.55,
                    fontWeight: 400,
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
      ) : (
        <Typography
          component="p"
          sx={bodyTypeSx("contentCardBody", {
            color: IDENTIFY_AI_OPPORTUNITY_CARD.bodyColor,
            fontWeight: 400,
            lineHeight: 1.5,
            textAlign: "left",
            m: 0,
          })}
        >
          {description}
        </Typography>
      )}
    </Box>
  );
}

function useCardsInView() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        threshold: 0.12,
        rootMargin: "0px 0px -10% 0px",
      },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, inView };
}

export default function IdentifyAiOpportunitySection({
  framing,
  challenges,
  businessOpportunities,
}: IdentifyAiOpportunitySectionProps) {
  const challengeReveal = useCardsInView();
  const opportunityReveal = useCardsInView();
  const introParagraphs = framing.paragraphs ?? [];

  return (
    <FullBleedBand backgroundColor={BAND_COLORS.identifyAiOpportunity}>
      <Stack spacing={0} sx={{ width: "100%" }}>
        <Box sx={{ width: "100%", maxWidth: PANEL_CONTENT_MAX_WIDTH_PX }}>
          <Stack sx={sectionTitleContentGapMbSx}>
            {framing.sectionLabel ? (
              <Typography component="p" align="left" sx={sectionLabelSx}>
                {framing.sectionLabel}
              </Typography>
            ) : null}
            <Typography component="h2" align="left" sx={sectionHeadlineSx}>
              {framing.title}
            </Typography>
          </Stack>
          {introParagraphs.length > 0 ? (
            <Box component="article">
              {introParagraphs.map((paragraph, index) => (
                <Typography
                  key={index}
                  component="p"
                  sx={bodyTypeSx("sectionDescription", {
                    color: "#3F5266",
                    fontWeight: 400,
                    lineHeight: 1.5,
                    textAlign: "left",
                    mb: index === introParagraphs.length - 1 ? 0 : 3.5,
                  })}
                >
                  {paragraph}
                </Typography>
              ))}
            </Box>
          ) : null}
        </Box>

        <Box
          ref={challengeReveal.ref}
          sx={{ ...cardsRowSx, ...sectionTitleContentGapMtSx }}
        >
          {challenges.cards.map((card, index) => (
            <StageCard
              key={card.title}
              title={card.title}
              description={card.description}
              titleColor={IDENTIFY_AI_OPPORTUNITY_CARD.opportunityTitleColor}
              index={index}
              inView={challengeReveal.inView}
            />
          ))}
        </Box>

        <Stack spacing={{ xs: 3, md: 4 }} sx={sectionStackGapSx}>
          <Typography component="h3" align="left" sx={subsectionTitleSx}>
            {businessOpportunities.title}
          </Typography>
          <Box ref={opportunityReveal.ref} sx={cardsRowSx}>
            {businessOpportunities.cards.map((card, index) => (
              <StageCard
                key={card.title}
                title={card.title}
                description={card.description}
                titleColor={IDENTIFY_AI_OPPORTUNITY_CARD.opportunityTitleColor}
                index={index}
                inView={opportunityReveal.inView}
              />
            ))}
          </Box>
        </Stack>
      </Stack>
    </FullBleedBand>
  );
}
