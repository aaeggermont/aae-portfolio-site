import { db } from "@/firebase";
import { doc, getDoc, onSnapshot } from "firebase/firestore";

import {
  automaticSeaterAssignmentsDataProject,
  type AutomaticSeaterAssignmentsDataProjectDocument,
} from "@/scripts/automatic-seater-assignments.data";

const COLLECTION = "projects_content";
const PROJECT_KEY = automaticSeaterAssignmentsDataProject.project.projectKey;
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

export function subscribeAutomaticSeaterAssignmentsProject(
  onData: (project: AutomaticSeaterAssignmentsDataProjectDocument) => void,
  onError?: (error: Error) => void,
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
        onError?.(parsedError);
      }
    },
    (firestoreError) => {
      onError?.(firestoreError as Error);
    },
  );
}
