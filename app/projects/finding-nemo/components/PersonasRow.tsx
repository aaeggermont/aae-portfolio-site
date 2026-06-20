"use client";

import { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";

import Persona, { type PersonaProps } from "@/app/projects/finding-nemo/components/Persona";

const personasRowSx = {
  width: "100%",
  display: "flex",
  flexDirection: { xs: "column", md: "row" },
  flexWrap: { xs: "nowrap", md: "wrap" },
  justifyContent: "center",
  alignItems: { xs: "center", md: "stretch" },
  gap: { xs: 3, md: 3, lg: 4 },
} as const;

const CARD_REVEAL_STAGGER_MS = 90;

type PersonasRowProps = {
  personas: PersonaProps[];
  /** Offsets stagger when multiple rows animate in sequence. */
  rowIndex?: number;
};

/**
 * Persona card row with the same scroll-reveal + stagger pattern as `ContentCardsRow`.
 */
export default function PersonasRow({ personas, rowIndex = 0 }: PersonasRowProps) {
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

  const rowStaggerOffset = rowIndex * personas.length * CARD_REVEAL_STAGGER_MS;

  return (
    <Box ref={ref} sx={personasRowSx}>
      {personas.map((persona, personaIndex) => (
        <Box
          key={persona.title}
          sx={{
            flexShrink: 0,
            width: { xs: "100%", md: 490 },
            maxWidth: 490,
            display: "flex",
            flexDirection: "column",
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
            transitionDelay: inView
              ? `${rowStaggerOffset + personaIndex * CARD_REVEAL_STAGGER_MS}ms`
              : "0ms",
          }}
        >
          <Persona {...persona} interactive fillHeight />
        </Box>
      ))}
    </Box>
  );
}
