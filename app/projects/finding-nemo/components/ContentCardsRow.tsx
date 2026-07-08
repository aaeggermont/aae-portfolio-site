"use client";

import { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import type { SxProps, Theme } from "@mui/material/styles";

import ContentCard, {
  type ContentCardProps,
} from "@/app/projects/finding-nemo/components/ContentCard";
import { breakpointMediaQuery } from "@/lib/responsive/breakpoints";

const contentCardsRowSx = {
  width: "100%",
  display: "flex",
  flexDirection: { xs: "column", md: "row" },
  flexWrap: { xs: "nowrap", md: "wrap" },
  justifyContent: "center",
  alignItems: { xs: "center", md: "stretch" },
  gap: { xs: 3, md: 3, lg: 4 },
} as const;

const contentCardsGridSx = {
  width: "100%",
  display: "grid",
  gridTemplateColumns: "1fr",
  justifyItems: "center",
  gap: { xs: 3, md: 3, lg: 4 },
  [breakpointMediaQuery.tabletUp]: {
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  },
  [breakpointMediaQuery.desktopUp]: {
    gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
  },
} as const;

const CARD_REVEAL_STAGGER_MS = 90;

export type CenteredFixedGridConfig = {
  gaps: { mobile: number; tablet: number; desktop: number };
  cardWidths: { mobile: number; tablet: number; desktop: number };
};

function buildCenteredFixedGridSx({
  gaps,
  cardWidths,
}: CenteredFixedGridConfig): SxProps<Theme> {
  return {
    width: "max-content",
    maxWidth: "100%",
    mx: "auto",
    display: "grid",
    gap: `${gaps.mobile}px`,
    gridTemplateColumns: `repeat(1, ${cardWidths.mobile}px)`,
    [breakpointMediaQuery.tabletUp]: {
      gap: `${gaps.tablet}px`,
      gridTemplateColumns: `repeat(2, ${cardWidths.tablet}px)`,
    },
    [breakpointMediaQuery.desktopUp]: {
      gap: `${gaps.desktop}px`,
      gridTemplateColumns: `repeat(4, ${cardWidths.desktop}px)`,
    },
  };
}

type ContentCardsRowProps = {
  cards: ContentCardProps[];
  /** Offsets stagger when multiple rows animate in sequence. */
  rowIndex?: number;
  layout?: "flex" | "grid";
  cardBackgroundColor?: string;
  /** Fixed-width columns, explicit gaps, centered as a group on screen. */
  centeredFixedGrid?: CenteredFixedGridConfig;
};

/**
 * Content card row with the same scroll-reveal + stagger pattern as `KpiCardsRow`.
 */
export default function ContentCardsRow({
  cards,
  rowIndex = 0,
  layout = "flex",
  cardBackgroundColor,
  centeredFixedGrid,
}: ContentCardsRowProps) {
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
        threshold: 0.15,
        rootMargin: "0px 0px -10% 0px",
      },
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  const rowStaggerOffset = rowIndex * cards.length * CARD_REVEAL_STAGGER_MS;

  const containerSx =
    layout === "grid" && centeredFixedGrid
      ? buildCenteredFixedGridSx(centeredFixedGrid)
      : layout === "grid"
        ? contentCardsGridSx
        : contentCardsRowSx;

  return (
    <Box ref={ref} sx={containerSx}>
      {cards.map((card, cardIndex) => (
        <Box
          key={card.title}
          sx={{
            width: layout === "grid" && !centeredFixedGrid ? "100%" : undefined,
            flexShrink: 0,
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
            transitionDelay: inView
              ? `${rowStaggerOffset + cardIndex * CARD_REVEAL_STAGGER_MS}ms`
              : "0ms",
          }}
        >
          <ContentCard
            {...card}
            interactive
            backgroundColor={card.backgroundColor ?? cardBackgroundColor}
          />
        </Box>
      ))}
    </Box>
  );
}
