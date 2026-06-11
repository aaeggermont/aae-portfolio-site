import { db } from "@/firebase";
import { doc, getDoc, onSnapshot } from "firebase/firestore";

import type { FindingNemoDataProjectDocument } from "@/scripts/project-2.data";

export const FINDING_NEMO_PROJECT_KEY = "project_2";
export const FINDING_NEMO_COLLECTION = "projects_content";

const NESTED_ARRAY_WRAPPER_KEY = "__firestoreNestedArray";

export type FindingNemoProjectDocument = FindingNemoDataProjectDocument;

function decodeFirestoreNestedArrays(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(decodeFirestoreNestedArrays);
  }

  if (value && typeof value === "object") {
    const record = value as Record<string, unknown>;
    const wrappedArray = record[NESTED_ARRAY_WRAPPER_KEY];

    if (Array.isArray(wrappedArray)) {
      return wrappedArray.map(decodeFirestoreNestedArrays);
    }

    const decoded: Record<string, unknown> = {};
    for (const [key, nestedValue] of Object.entries(record)) {
      decoded[key] = decodeFirestoreNestedArrays(nestedValue);
    }
    return decoded;
  }

  return value;
}

export async function fetchFindingNemoProject(): Promise<FindingNemoProjectDocument> {
  const docRef = doc(db, FINDING_NEMO_COLLECTION, FINDING_NEMO_PROJECT_KEY);
  const snap = await getDoc(docRef);

  if (!snap.exists()) {
    throw new Error(
      `Missing Firestore document: ${FINDING_NEMO_COLLECTION}/${FINDING_NEMO_PROJECT_KEY}`,
    );
  }

  const payload = snap.data() as { content?: unknown };
  const content = payload?.content;

  if (!content) {
    throw new Error(
      `Missing 'content' field in ${FINDING_NEMO_COLLECTION}/${FINDING_NEMO_PROJECT_KEY}`,
    );
  }

  return decodeFirestoreNestedArrays(content) as FindingNemoProjectDocument;
}

export function subscribeFindingNemoProject(
  onData: (project: FindingNemoProjectDocument) => void,
  onError: (error: Error) => void,
): () => void {
  const docRef = doc(db, FINDING_NEMO_COLLECTION, FINDING_NEMO_PROJECT_KEY);

  return onSnapshot(
    docRef,
    (snap) => {
      try {
        if (!snap.exists()) {
          throw new Error(
            `Missing Firestore document: ${FINDING_NEMO_COLLECTION}/${FINDING_NEMO_PROJECT_KEY}`,
          );
        }

        const payload = snap.data() as { content?: unknown };
        const content = payload?.content;
        if (!content) {
          throw new Error(
            `Missing 'content' field in ${FINDING_NEMO_COLLECTION}/${FINDING_NEMO_PROJECT_KEY}`,
          );
        }

        onData(
          decodeFirestoreNestedArrays(content) as FindingNemoProjectDocument,
        );
      } catch (err) {
        const parsedError =
          err instanceof Error ? err : new Error("Unknown snapshot parsing error");
        onError(parsedError);
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
