import { db } from "@/firebase";
import { doc, onSnapshot } from "firebase/firestore";

import {
  biographyChaptersFallback,
  type BiographyChapter,
  type BiographyChapterBlock,
  type BiographyChapterCaptionColumn,
  type BiographyChapterFigure,
  type BiographyChapterIcon,
  type BiographyChapterId,
  type BiographyChaptersData,
} from "@/app/aboutme/data/biography-chapters-data";

export const ABOUT_PAGE_COLLECTION = "about_page";
export const BIOGRAPHY_CHAPTERS_DOC_ID = "biography_chapters";

const CHAPTER_IDS = new Set<BiographyChapterId>([
  "harvard",
  "emerson",
  "disney-animation",
  "disney-emerging",
  "beyond-work",
  "closing",
]);

const CHAPTER_ICONS = new Set<BiographyChapterIcon>([
  "menuBook",
  "school",
  "lightbulb",
  "devices",
  "air",
  "mail",
]);

function asString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function asNumber(value: unknown, fallback = 0): number {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}

function parseCaptionColumn(
  raw: unknown,
): BiographyChapterCaptionColumn | null {
  if (!raw || typeof raw !== "object") return null;
  const record = raw as Record<string, unknown>;
  const linesRaw = Array.isArray(record.lines) ? record.lines : [];
  const lines = linesRaw.map(asString).filter(Boolean);
  if (lines.length === 0) return null;
  return { lines };
}

function parseFigure(raw: unknown): BiographyChapterFigure | null {
  if (!raw || typeof raw !== "object") return null;
  const record = raw as Record<string, unknown>;

  const imageObjectPath = asString(record.imageObjectPath);
  const alt = asString(record.alt);
  if (!imageObjectPath || !alt) return null;

  const captionsRaw = Array.isArray(record.captions) ? record.captions : [];
  const captions = captionsRaw
    .map(parseCaptionColumn)
    .filter((column): column is BiographyChapterCaptionColumn => column !== null);

  const captionTitleRaw = Array.isArray(record.captionTitle)
    ? record.captionTitle
    : [];
  const captionTitle = captionTitleRaw.map(asString).filter(Boolean);
  const captionCredit = asString(record.captionCredit);

  return {
    imageObjectPath,
    alt,
    captions,
    ...(captionTitle.length > 0 ? { captionTitle } : {}),
    ...(captionCredit ? { captionCredit } : {}),
  };
}

function parseBlock(raw: unknown): BiographyChapterBlock | null {
  if (!raw || typeof raw !== "object") return null;
  const record = raw as Record<string, unknown>;
  const type = asString(record.type);

  if (type === "copy") {
    const paragraphsRaw = Array.isArray(record.paragraphs)
      ? record.paragraphs
      : [];
    const paragraphs = paragraphsRaw.map(asString).filter(Boolean);
    if (paragraphs.length === 0) return null;
    return { type: "copy", paragraphs };
  }

  if (type === "figure") {
    const figure = parseFigure(record.figure);
    if (!figure) return null;
    return { type: "figure", figure };
  }

  if (type === "section") {
    const heading = asString(record.heading);
    if (!heading) return null;
    const paragraphsRaw = Array.isArray(record.paragraphs)
      ? record.paragraphs
      : [];
    const paragraphs = paragraphsRaw.map(asString).filter(Boolean);
    return {
      type: "section",
      heading,
      ...(paragraphs.length > 0 ? { paragraphs } : {}),
    };
  }

  if (type === "mediaText") {
    const figure = parseFigure(record.figure);
    const paragraphsRaw = Array.isArray(record.paragraphs)
      ? record.paragraphs
      : [];
    const paragraphs = paragraphsRaw.map(asString).filter(Boolean);
    if (!figure || paragraphs.length === 0) return null;
    const heading = asString(record.heading);
    return {
      type: "mediaText",
      figure,
      paragraphs,
      ...(heading ? { heading } : {}),
    };
  }

  return null;
}

/** Supports legacy `paragraphs` + `figures` docs written before blocks. */
function legacyBlocksFromChapter(
  record: Record<string, unknown>,
  fallback?: BiographyChapter,
): BiographyChapterBlock[] {
  const blocks: BiographyChapterBlock[] = [];

  const paragraphsRaw = Array.isArray(record.paragraphs)
    ? record.paragraphs
    : [];
  const paragraphs = paragraphsRaw.map(asString).filter(Boolean);
  if (paragraphs.length > 0) {
    blocks.push({ type: "copy", paragraphs });
  }

  const figuresRaw = Array.isArray(record.figures) ? record.figures : [];
  for (const figureRaw of figuresRaw) {
    const figure = parseFigure(figureRaw);
    if (figure) blocks.push({ type: "figure", figure });
  }

  if (blocks.length > 0) return blocks;
  return fallback?.blocks ?? [];
}

function parseChapter(raw: unknown, index: number): BiographyChapter | null {
  if (!raw || typeof raw !== "object") return null;
  const record = raw as Record<string, unknown>;

  const idRaw = asString(record.id) as BiographyChapterId;
  const id = CHAPTER_IDS.has(idRaw)
    ? idRaw
    : (biographyChaptersFallback.chapters[index]?.id ?? null);
  if (!id) return null;

  const fallback =
    biographyChaptersFallback.chapters.find((chapter) => chapter.id === id) ??
    biographyChaptersFallback.chapters[index];

  const tocLabel = asString(record.tocLabel) || fallback?.tocLabel || "";
  const title = asString(record.title) || fallback?.title || "";
  if (!tocLabel || !title) return null;

  const eyebrowRaw = asString(record.eyebrow);
  const eyebrow = eyebrowRaw || fallback?.eyebrow;

  const iconRaw = asString(record.icon) as BiographyChapterIcon;
  const icon = CHAPTER_ICONS.has(iconRaw)
    ? iconRaw
    : (fallback?.icon ?? "menuBook");

  const blocksRaw = Array.isArray(record.blocks) ? record.blocks : [];
  const parsedBlocks = blocksRaw
    .map(parseBlock)
    .filter((block): block is BiographyChapterBlock => block !== null);

  const blocks =
    parsedBlocks.length > 0
      ? parsedBlocks
      : legacyBlocksFromChapter(record, fallback);

  if (blocks.length === 0) return null;

  return {
    id,
    tocLabel,
    ...(eyebrow ? { eyebrow } : {}),
    title,
    icon,
    blocks,
  };
}

export function parseBiographyChaptersDocument(
  data: Record<string, unknown>,
): BiographyChaptersData {
  const chaptersRaw = Array.isArray(data.chapters) ? data.chapters : [];
  const chapters = chaptersRaw
    .map((chapter, index) => parseChapter(chapter, index))
    .filter((chapter): chapter is BiographyChapter => chapter !== null);

  if (chapters.length === 0) {
    throw new Error("Biography chapters document has no valid chapters");
  }

  return {
    version: asNumber(data.version, 1),
    chapters,
  };
}

/**
 * Subscribes to `about_page/biography_chapters`.
 * Falls back to local data when the document is missing or invalid.
 */
export function subscribeBiographyChaptersData(
  onData: (data: BiographyChaptersData) => void,
  onError?: (error: Error) => void,
): () => void {
  const docRef = doc(db, ABOUT_PAGE_COLLECTION, BIOGRAPHY_CHAPTERS_DOC_ID);

  onData(biographyChaptersFallback);

  return onSnapshot(
    docRef,
    (snap) => {
      try {
        if (!snap.exists()) {
          throw new Error(
            `Missing Firestore document: ${ABOUT_PAGE_COLLECTION}/${BIOGRAPHY_CHAPTERS_DOC_ID}`,
          );
        }

        const raw = snap.data() as Record<string, unknown> | undefined;
        if (!raw) {
          throw new Error(
            `Empty document: ${ABOUT_PAGE_COLLECTION}/${BIOGRAPHY_CHAPTERS_DOC_ID}`,
          );
        }

        onData(parseBiographyChaptersDocument(raw));
      } catch (err) {
        const error =
          err instanceof Error
            ? err
            : new Error("Unknown snapshot parsing error");
        onError?.(error);
        console.warn(
          "[biography-chapters] Firestore realtime read failed; using local fallback.",
          error,
        );
        onData(biographyChaptersFallback);
      }
    },
    (firestoreError) => {
      const error =
        firestoreError instanceof Error
          ? firestoreError
          : new Error("Firestore subscription failed");
      onError?.(error);
      console.warn(
        "[biography-chapters] Firestore subscription failed; using local fallback.",
        error,
      );
      onData(biographyChaptersFallback);
    },
  );
}
