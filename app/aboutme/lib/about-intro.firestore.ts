import { db } from "@/firebase";
import { doc, onSnapshot } from "firebase/firestore";

import {
  aboutIntroFallback,
  type AboutIntroData,
} from "@/app/aboutme/data/about-intro-data";

export const ABOUT_PAGE_COLLECTION = "about_page";
export const ABOUT_INTRO_DOC_ID = "intro";

function asString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function asNumber(value: unknown, fallback = 0): number {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}

export function parseAboutIntroDocument(
  data: Record<string, unknown>,
): AboutIntroData {
  const pageTitle =
    asString(data.pageTitle) || aboutIntroFallback.pageTitle;

  const paragraphsRaw = Array.isArray(data.pageParagraphs)
    ? data.pageParagraphs
    : [];
  const pageParagraphs = paragraphsRaw
    .map(asString)
    .filter(Boolean);

  if (pageParagraphs.length === 0) {
    throw new Error(
      "About intro document has no valid pageParagraphs",
    );
  }

  return {
    version: asNumber(data.version, 1),
    pageTitle,
    pageParagraphs,
  };
}

/**
 * Subscribes to `about_page/intro`.
 * Falls back to local data when the document is missing or invalid.
 */
export function subscribeAboutIntroData(
  onData: (data: AboutIntroData) => void,
  onError?: (error: Error) => void,
): () => void {
  const docRef = doc(db, ABOUT_PAGE_COLLECTION, ABOUT_INTRO_DOC_ID);

  onData(aboutIntroFallback);

  return onSnapshot(
    docRef,
    (snap) => {
      try {
        if (!snap.exists()) {
          throw new Error(
            `Missing Firestore document: ${ABOUT_PAGE_COLLECTION}/${ABOUT_INTRO_DOC_ID}`,
          );
        }

        const raw = snap.data() as Record<string, unknown> | undefined;
        if (!raw) {
          throw new Error(
            `Empty document: ${ABOUT_PAGE_COLLECTION}/${ABOUT_INTRO_DOC_ID}`,
          );
        }

        onData(parseAboutIntroDocument(raw));
      } catch (err) {
        const error =
          err instanceof Error
            ? err
            : new Error("Unknown snapshot parsing error");
        onError?.(error);
        console.warn(
          "[about-intro] Firestore realtime read failed; using local fallback.",
          error,
        );
        onData(aboutIntroFallback);
      }
    },
    (firestoreError) => {
      const error =
        firestoreError instanceof Error
          ? firestoreError
          : new Error("Firestore subscription failed");
      onError?.(error);
      console.warn(
        "[about-intro] Firestore subscription failed; using local fallback.",
        error,
      );
      onData(aboutIntroFallback);
    },
  );
}
