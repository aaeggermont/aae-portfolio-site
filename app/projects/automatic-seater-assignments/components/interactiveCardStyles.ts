/** Hover lift + shadow for `MethodologyCard` (matches Finding Nemo `ContentCard`). */
export const METHODOLOGY_CARD_HOVER_BG_COLOR = "#F7F7F7" as const;

export const methodologyCardHoverSx = {
  boxShadow: "0 4px 18px rgba(0, 0, 0, 0.08)",
  transition:
    "transform 0.22s ease, box-shadow 0.22s ease, background-color 0.22s ease, opacity 0.22s ease",
  border: "1px solid transparent",
  "&:hover": {
    transform: "translateY(-6px)",
    boxShadow: "0 18px 45px rgba(0, 0, 0, 0.18)",
    bgcolor: METHODOLOGY_CARD_HOVER_BG_COLOR,
  },
} as const;
