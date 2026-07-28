"use client";

import { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";

import KpiCard from "@/app/projects/finding-nemo/components/KpiCard";
import { IDENTIFY_AI_OPPORTUNITY_CARD } from "@/app/projects/finding-nemo/layoutConfig";
import { breakpointMediaQuery } from "@/lib/responsive/breakpoints";
import type { FindingNemoKpiCardItem } from "@/scripts/project-2.data";

const CARD_REVEAL_STAGGER_MS = 90;

const kpiCardsRowSx = {
  width: "100%",
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  alignItems: "stretch",
  justifyContent: "center",
  gap: `${IDENTIFY_AI_OPPORTUNITY_CARD.gap.mobile}px`,
  [breakpointMediaQuery.tabletUp]: {
    gap: `${IDENTIFY_AI_OPPORTUNITY_CARD.gap.tablet}px`,
  },
  [breakpointMediaQuery.desktopUp]: {
    gap: `${IDENTIFY_AI_OPPORTUNITY_CARD.gap.desktop}px`,
  },
} as const;

type KpiCardsRowProps = {
  cards: FindingNemoKpiCardItem[];
  /** Offsets stagger when multiple rows animate in sequence. */
  rowIndex?: number;
};

/**
 * KPI card row — Business Opportunities layout (wrapping fixed-width cards)
 * with the same scroll-reveal stagger as StageInfoCardsRow.
 */
export default function KpiCardsRow({ cards, rowIndex = 0 }: KpiCardsRowProps) {
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

  return (
    <Box ref={ref} sx={kpiCardsRowSx}>
      {cards.map((card, cardIndex) => (
        <Box
          key={card.title}
          sx={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
            transitionDelay: inView
              ? `${rowStaggerOffset + cardIndex * CARD_REVEAL_STAGGER_MS}ms`
              : "0ms",
          }}
        >
          <KpiCard
            icon={card.icon}
            title={card.title}
            description={card.description}
          />
        </Box>
      ))}
    </Box>
  );
}
