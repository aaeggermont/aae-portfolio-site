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
      /** Firebase Storage path (e.g. `projects/project_4/illustration.png`). */
      objectPath: string;
      alt: string;
      caption?: string;
      /** Optional helper text shown under caption (e.g. interaction hint). */
      annotation?: string;
      objectFit?: "cover" | "contain";
      aspectRatio?: string;
      /**
       * Area behind the image when `objectFit` is `contain` (letterboxing).
       * Defaults to white for diagrams; use when the asset doesn’t match `aspectRatio`.
       */
      letterboxBackground?: string;
      /** Defaults to this case study’s gated project (`project_4`). */
      projectKey?: string;
      /** Passed to `next/image` `sizes`; omit for a sensible default in the card layout. */
      sizes?: string;
      priority?: boolean;
      /**
       * Full-viewport loading overlay (same as hero banner). Ignored when `lightbox` is true.
       */
      fullViewportLoading?: boolean;
      /**
       * When `true`, uses `lightbox.js-react` (`SlideshowLightbox`): click to open zoom + pan (wheel / drag / pinch).
       * Requires `NEXT_PUBLIC_LIGHTBOXJS_LICENSE` and `initLightboxJS` in `app/providers.tsx`.
       */
      lightbox?: boolean;
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

/**
 * One research-method block on the page (e.g. “1. Understanding…”) with intro copy
 * and a list of method cards (SME interviews, workshops, etc.).
 */
export type ResearchMethodBlockData = {
  /** Stable id for React keys / Firestore (e.g. doc id or slug). */
  id: string;
  kicker: string;
  title: string;
  introParagraphs: string[];
  cards: ResearchMethodCardData[];
};
