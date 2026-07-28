"use client";

import { useEffect, useRef, useState } from "react";
import { Box, List, ListItem, Typography } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";

import { IDENTIFY_AI_OPPORTUNITY_CARD } from "@/app/projects/finding-nemo/layoutConfig";
import { interactiveCardHoverSx } from "@/app/projects/finding-nemo/components/interactiveCardStyles";
import { bodyTypeSx, titleTypeSx } from "@/app/projects/finding-nemo/typography";
import { breakpointMediaQuery } from "@/lib/responsive/breakpoints";

const CARD_REVEAL_STAGGER_MS = 90;

export type StageInfoCardItem = {
  title: string;
  description: string | string[];
};

export type StageInfoCardWidths = {
  mobile: number;
  tablet: number;
  desktop: number;
};

type StageInfoCardsRowProps = {
  cards: StageInfoCardItem[];
  /** Defaults to Business Opportunities orange title color. */
  titleColor?: string;
  /** Defaults to Stage 01 card widths; override for wider Primary Users cards. */
  widthPx?: StageInfoCardWidths;
  /** Keep cards centered at all breakpoints (matches Personas row). */
  centered?: boolean;
  sx?: SxProps<Theme>;
};

function buildCardsRowSx(centered: boolean) {
  return {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "stretch",
    justifyContent: "center",
    gap: `${IDENTIFY_AI_OPPORTUNITY_CARD.gap.mobile}px`,
    [breakpointMediaQuery.tabletUp]: {
      justifyContent: centered ? "center" : "flex-start",
      gap: `${IDENTIFY_AI_OPPORTUNITY_CARD.gap.tablet}px`,
    },
    [breakpointMediaQuery.desktopUp]: {
      gap: `${IDENTIFY_AI_OPPORTUNITY_CARD.gap.desktop}px`,
    },
  } as const;
}

function buildCardShellSx(widthPx: StageInfoCardWidths) {
  return {
    flex: "0 1 auto",
    width: widthPx.mobile,
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
      width: widthPx.tablet,
    },
    [breakpointMediaQuery.desktopUp]: {
      width: widthPx.desktop,
    },
  } as const;
}

/**
 * Compact fixed-width info cards used by Business Opportunities, challenge cards,
 * and Primary Users — wrapping row, orange titles, left-aligned body.
 */
export default function StageInfoCardsRow({
  cards,
  titleColor = IDENTIFY_AI_OPPORTUNITY_CARD.opportunityTitleColor,
  widthPx = IDENTIFY_AI_OPPORTUNITY_CARD.widthPx,
  centered = false,
  sx,
}: StageInfoCardsRowProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);
  const cardShellSx = buildCardShellSx(widthPx);
  const cardsRowSx = buildCardsRowSx(centered);

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

  return (
    <Box ref={ref} sx={[cardsRowSx, ...(sx ? [sx] : [])] as SxProps<Theme>}>
      {cards.map((card, index) => {
        const bulletItems = Array.isArray(card.description)
          ? card.description
          : null;

        return (
          <Box
            key={card.title}
            sx={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
              transitionDelay: inView
                ? `${index * CARD_REVEAL_STAGGER_MS}ms`
                : "0ms",
            }}
          >
            <Box
              component="article"
              sx={{
                ...cardShellSx,
                height: "100%",
                ...interactiveCardHoverSx,
                "&:hover": {
                  ...interactiveCardHoverSx["&:hover"],
                  bgcolor: IDENTIFY_AI_OPPORTUNITY_CARD.background,
                  backgroundColor: IDENTIFY_AI_OPPORTUNITY_CARD.background,
                },
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
              {card.title}
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
                  fontWeight: 400,
                  lineHeight: 1.5,
                  textAlign: "left",
                  m: 0,
                })}
              >
                {card.description}
              </Typography>
            )}
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}
