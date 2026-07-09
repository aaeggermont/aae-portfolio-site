import { OVERVIEW_PROJECT_OVERVIEW_MAX_WIDTH_PX } from "./layoutConfig";
import { breakpointMediaQuery } from "@/lib/responsive/breakpoints";

/** Centered cap for overview narrative blocks (Project Overview, Solution, Business Goals). */
export const overviewNarrativeBlockSx = {
  width: "100%",
  maxWidth: "100%",
  mx: "auto",
  [breakpointMediaQuery.tabletUp]: {
    maxWidth: `${OVERVIEW_PROJECT_OVERVIEW_MAX_WIDTH_PX.tablet}px`,
  },
  [breakpointMediaQuery.desktopUp]: {
    maxWidth: `${OVERVIEW_PROJECT_OVERVIEW_MAX_WIDTH_PX.desktop}px`,
  },
} as const;
