"use client";

import { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";

import ContentCard, {
  type ContentCardProps,
} from "@/app/projects/finding-nemo/components/ContentCard";

const contentCardsRowSx = {
  width: "100%",
  display: "flex",
  flexDirection: { xs: "column", md: "row" },
  flexWrap: { xs: "nowrap", md: "wrap" },
  justifyContent: "center",
  alignItems: { xs: "center", md: "stretch" },
  gap: { xs: 3, md: 3, lg: 4 },
} as const;

const CARD_REVEAL_STAGGER_MS = 90;

type ContentCardsRowProps = {
  cards: ContentCardProps[];
  /** Offsets stagger when multiple rows animate in sequence. */
  rowIndex?: number;
};

/**
 * Content card row with the same scroll-reveal + stagger pattern as `KpiCardsRow`.
 */
export default function ContentCardsRow({
  cards,
  rowIndex = 0,
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

  return (
    <Box ref={ref} sx={contentCardsRowSx}>
      {cards.map((card, cardIndex) => (
        <Box
          key={card.title}
          sx={{
            flexShrink: 0,
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
            transitionDelay: inView
              ? `${rowStaggerOffset + cardIndex * CARD_REVEAL_STAGGER_MS}ms`
              : "0ms",
          }}
        >
          <ContentCard {...card} interactive />
        </Box>
      ))}
    </Box>
  );
}
