import type { ReactNode } from "react";

export type RichParagraphSegment = {
  text: string;
  /**
   * `emphasis` is used for highlighted terms within a sentence.
   * Current style in renderer: #EDD84A + semibold.
   */
  style?: "default" | "emphasis";
};

export type RichParagraphValue = string | RichParagraphSegment[];

export type ReadMoreWordConfig = {
  /**
   * Per-paragraph word limits for collapsed mode.
   * Keys are zero-based paragraph indexes.
   */
  wordLimitsByParagraphIndex?: Record<number, number>;
  /** Word limit for paragraph index 0. */
  firstParagraphWords?: number;
  /** Word limit for paragraph index 1. */
  secondParagraphWords?: number;
  /**
   * Paragraph index that should display the inline expansion trigger.
   * Defaults to first truncated paragraph.
   */
  expandTriggerParagraphIndex?: number;
  /** Defaults to "Read more". */
  buttonLabel?: string;
  /** Defaults to "Read less". */
  readLessButtonLabel?: string;
  /** Optional text color for both "Read more" and "Read less". */
  textColor?: string;
  /** Optional font family for both toggle labels. */
  fontFamily?: string;
  /** Optional font weight for both toggle labels. */
  fontWeight?: number | string;
  /** Optional font size for both toggle labels. */
  fontSize?: number | string;
};

export type ResearchUserPersona = {
  title: string;
  description: string;
  objectPath: string;
  alt: string;
};

/**
 * Ordered body content inside a research method card.
 * Order is preserved: e.g. paragraphs → image → bullets → paragraphs.
 */
export type ResearchCardContentBlock =
  | {
      type: "paragraphs";
      id: string;
      paragraphs: RichParagraphValue[];
      /** Optional per-block typography colors for paragraph text and emphasis segments. */
      textColors?: {
        paragraph?: string;
        emphasis?: string;
      };
      /** Optional truncation + inline expand/collapse behavior for this paragraph block. */
      readMore?: ReadMoreWordConfig;
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
      /** Optional label above the figure (e.g. “Site Map”), distinct from card title. */
      title?: string;
      /** Firebase Storage path (e.g. `projects/project_4/illustration.png`). */
      objectPath: string;
      alt: string;
      caption?: string;
      /** Optional helper text shown under caption (e.g. interaction hint). */
      annotation?: string;
      /** Optional typography colors for title/caption/annotation around the image. */
      textColors?: {
        title?: string;
        caption?: string;
        annotation?: string;
      };
      objectFit?: "cover" | "contain";
      aspectRatio?: string;
      /**
       * Area behind the image when `objectFit` is `contain` (letterboxing).
       * Defaults to white for diagrams; use when the asset doesn’t match `aspectRatio`.
       * Use `"transparent"` so the card gradient shows through.
       */
      letterboxBackground?: string;
      /**
       * Backdrop behind the image when `lightbox` is open (`SlideshowLightbox` `backgroundColor`).
       * Defaults to a dark scrim; set `"transparent"` for no overlay tint.
       */
      lightboxModalBackground?: string;
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
      type: "userPersonas";
      id: string;
      personas: ResearchUserPersona[];
    }
  | {
      type: "reusableComponent";
      id: string;
      title: string;
      description: string;
      /** Firebase Storage path (e.g. `projects/project_4/Seat-Component.png`). */
      objectPath: string;
      alt: string;
      /** Defaults to this case study’s gated project (`project_4`). */
      projectKey?: string;
      sizes?: string;
      textColors?: {
        title?: string;
        description?: string;
      };
    }
  | {
      type: "custom";
      id: string;
      /** Escape hatch for layouts not covered by structured blocks. */
      node: ReactNode;
    };

export type ResearchMethodCardData = {
  id: string;
  /** Omit when headings live only in `contentBlocks` (e.g. image `title`). */
  title?: string;
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
  /** Background used by the outer method section shell. */
  background: string;
  /** Typography colors for method header and intro copy. */
  textColors: {
    kicker: string;
    title: string;
    introParagraph: string;
  };
  /** Optional intro truncation + "Read more" behavior for paragraphs 1 and 2. */
  introParagraphReadMore?: ReadMoreWordConfig;
  introParagraphs: string[];
  cards: ResearchMethodCardData[];
};
