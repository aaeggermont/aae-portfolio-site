import { db } from "@/firebase";
import { doc, onSnapshot, type DocumentData } from "firebase/firestore";

import { parseArStoryTellerContent } from "@/app/projects/ar-story-teller/lib/parseArStoryTellerContent";
import type { ArStoryTellerContent } from "@/app/projects/ar-story-teller/types/arStoryTellerContent";

const COLLECTION = "projects_content";
export const AR_STORY_TELLER_DOC_ID = "project_1";

export type ArStoryTellerFirestorePayload = DocumentData & {
  content?: unknown;
};

function parseArStoryTellerSnapshot(
  snap: { exists: () => boolean; data: () => DocumentData | undefined },
): ArStoryTellerContent {
  if (!snap.exists()) {
    throw new Error(
      `Missing Firestore document: ${COLLECTION}/${AR_STORY_TELLER_DOC_ID}`,
    );
  }

  const payload = snap.data() as ArStoryTellerFirestorePayload | undefined;
  const content = payload?.content;

  if (content == null) {
    throw new Error(
      `Missing 'content' field in ${COLLECTION}/${AR_STORY_TELLER_DOC_ID}`,
    );
  }

  return parseArStoryTellerContent(content);
}

/**
 * Live Firestore subscription for AR Story Teller. No local fallback — errors surface via `onError`.
 */
export function subscribeArStoryTellerProject(
  onContent: (content: ArStoryTellerContent) => void,
  onError: (error: Error) => void,
): () => void {
  const docRef = doc(db, COLLECTION, AR_STORY_TELLER_DOC_ID);

  return onSnapshot(
    docRef,
    (snap) => {
      try {
        onContent(parseArStoryTellerSnapshot(snap));
      } catch (err) {
        const parsed =
          err instanceof Error ? err : new Error("Unknown snapshot parsing error");
        if (process.env.NODE_ENV !== "production") {
          console.error("[ar-story-teller] Failed to parse Firestore content:", parsed.message);
        }
        onError(parsed);
      }
    },
    (firestoreError) => {
      onError(
        firestoreError instanceof Error
          ? firestoreError
          : new Error("Firestore subscription failed"),
      );
    },
  );
}
