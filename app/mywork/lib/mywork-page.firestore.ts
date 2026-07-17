import { db } from "@/firebase";
import { doc, onSnapshot } from "firebase/firestore";

import {
  myWorkPageFallback,
  type MyWorkPageData,
} from "@/app/mywork/data/mywork-data";

export const MY_WORK_PAGE_COLLECTION = "my_work_page";
export const MY_WORK_INTRO_DOC_ID = "intro";

function asString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function asNumber(value: unknown, fallback = 0): number {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}

export function parseMyWorkPageDocument(
  data: Record<string, unknown>,
): MyWorkPageData {
  const pageTitle =
    asString(data.pageTitle) || myWorkPageFallback.pageTitle;
  const summary = asString(data.summary);

  if (!summary) {
    throw new Error("My Work page document has no valid summary");
  }

  return {
    version: asNumber(data.version, 1),
    pageTitle,
    summary,
  };
}

/**
 * Subscribes to `my_work_page/intro`.
 * Falls back to local data when the document is missing or invalid.
 */
export function subscribeMyWorkPageData(
  onData: (data: MyWorkPageData) => void,
  onError?: (error: Error) => void,
): () => void {
  const docRef = doc(db, MY_WORK_PAGE_COLLECTION, MY_WORK_INTRO_DOC_ID);

  onData(myWorkPageFallback);

  return onSnapshot(
    docRef,
    (snap) => {
      try {
        if (!snap.exists()) {
          throw new Error(
            `Missing Firestore document: ${MY_WORK_PAGE_COLLECTION}/${MY_WORK_INTRO_DOC_ID}`,
          );
        }

        const raw = snap.data() as Record<string, unknown> | undefined;
        if (!raw) {
          throw new Error(
            `Empty document: ${MY_WORK_PAGE_COLLECTION}/${MY_WORK_INTRO_DOC_ID}`,
          );
        }

        onData(parseMyWorkPageDocument(raw));
      } catch (err) {
        const error =
          err instanceof Error
            ? err
            : new Error("Unknown snapshot parsing error");
        onError?.(error);
        console.warn(
          "[my-work-page] Firestore realtime read failed; using local fallback.",
          error,
        );
        onData(myWorkPageFallback);
      }
    },
    (firestoreError) => {
      const error =
        firestoreError instanceof Error
          ? firestoreError
          : new Error("Firestore subscription failed");
      onError?.(error);
      console.warn(
        "[my-work-page] Firestore subscription failed; using local fallback.",
        error,
      );
      onData(myWorkPageFallback);
    },
  );
}
