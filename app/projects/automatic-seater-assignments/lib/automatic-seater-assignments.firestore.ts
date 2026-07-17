import { db } from "@/firebase";
import { doc, getDoc, onSnapshot } from "firebase/firestore";

import {
  AUTOMATIC_SEATER_PROJECT_KEY,
  type AutomaticSeaterAssignmentsDataProjectDocument,
} from "@/app/projects/automatic-seater-assignments/types/automaticSeaterAssignmentsContent";

const COLLECTION = "projects_content";
const PROJECT_KEY = AUTOMATIC_SEATER_PROJECT_KEY;
const NESTED_ARRAY_WRAPPER_KEY = "__firestoreNestedArray";

export type AutomaticSeaterAssignmentsProjectDocument =
  AutomaticSeaterAssignmentsDataProjectDocument;

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

export async function fetchAutomaticSeaterAssignmentsProject(): Promise<AutomaticSeaterAssignmentsDataProjectDocument> {
  const docRef = doc(db, COLLECTION, PROJECT_KEY);
  const snap = await getDoc(docRef);

  if (!snap.exists()) {
    throw new Error(`Missing Firestore document: ${COLLECTION}/${PROJECT_KEY}`);
  }

  const payload = snap.data() as { content?: unknown };
  const content = payload?.content;

  if (!content) {
    throw new Error(`Missing 'content' field in ${COLLECTION}/${PROJECT_KEY}`);
  }

  return decodeFirestoreNestedArrays(content) as AutomaticSeaterAssignmentsDataProjectDocument;
}

/**
 * Live Firestore subscription. No local fallback — errors surface via `onError`
 * so case-study copy is not shipped in the client bundle.
 */
export function subscribeAutomaticSeaterAssignmentsProject(
  onData: (project: AutomaticSeaterAssignmentsDataProjectDocument) => void,
  onError: (error: Error) => void,
) {
  const docRef = doc(db, COLLECTION, PROJECT_KEY);

  return onSnapshot(
    docRef,
    (snap) => {
      try {
        if (!snap.exists()) {
          throw new Error(`Missing Firestore document: ${COLLECTION}/${PROJECT_KEY}`);
        }

        const payload = snap.data() as { content?: unknown };
        const content = payload?.content;
        if (!content) {
          throw new Error(`Missing 'content' field in ${COLLECTION}/${PROJECT_KEY}`);
        }

        onData(
          decodeFirestoreNestedArrays(
            content,
          ) as AutomaticSeaterAssignmentsDataProjectDocument,
        );
      } catch (err) {
        const parsedError =
          err instanceof Error ? err : new Error("Unknown snapshot parsing error");
        if (process.env.NODE_ENV !== "production") {
          console.error(
            "[automatic-seater-assignments] Failed to parse Firestore content:",
            parsedError.message,
          );
        }
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
