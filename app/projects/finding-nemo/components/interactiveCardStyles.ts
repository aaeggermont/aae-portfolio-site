/** Shared surface + hover treatment for KPI and interactive content cards. */
export const INTERACTIVE_CARD_BG_COLOR = "#F2F6FA" as const;
export const INTERACTIVE_CARD_HOVER_BG_COLOR = "#f7fbff" as const;

export const interactiveCardHoverSx = {
  boxShadow: "0 4px 18px rgba(0, 0, 0, 0.08)",
  transition:
    "transform 0.22s ease, box-shadow 0.22s ease, background-color 0.22s ease, opacity 0.22s ease",
  "&:hover": {
    transform: "translateY(-6px)",
    boxShadow: "0 18px 45px rgba(0, 0, 0, 0.18)",
    bgcolor: INTERACTIVE_CARD_HOVER_BG_COLOR,
  },
} as const;
