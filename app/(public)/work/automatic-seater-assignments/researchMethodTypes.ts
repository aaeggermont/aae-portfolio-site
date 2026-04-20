import type { ReactNode } from "react";

/**
 * Ordered body content inside a research method card.
 * Order is preserved: e.g. paragraphs → image → bullets → paragraphs.
 */
export type ResearchCardContentBlock =
  | {
      type: "paragraphs";
      id: string;
      paragraphs: string[];
    }
  | {
      type: "bullets";
      id: string;
      items: string[];
      /** Defaults to square markers (current design). */
      marker?: "square" | "dot" | "dash";
    }
  | {
      type: "image";
      id: string;
      src: string;
      alt: string;
      caption?: string;
      objectFit?: "cover" | "contain";
      aspectRatio?: string;
    }
  | {
      type: "custom";
      id: string;
      /** Escape hatch for layouts not covered by structured blocks. */
      node: ReactNode;
    };

export type ResearchMethodCardData = {
  id: string;
  title: string;
  subtitle?: string;
  contentBlocks: ResearchCardContentBlock[];
};

export type ResearchMethodSectionData = {
  kicker: string;
  title: string;
  introParagraphs: string[];
  cards: ResearchMethodCardData[];
};
