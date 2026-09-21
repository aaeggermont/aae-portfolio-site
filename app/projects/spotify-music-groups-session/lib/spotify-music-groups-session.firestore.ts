import { db } from "@/firebase";
import { doc, getDoc, onSnapshot } from "firebase/firestore";

import type { SpotifyMusicGroupsSessionDataProjectDocument } from "@/scripts/project-8.data";

export const SPOTIFY_MUSIC_GROUPS_SESSION_PROJECT_KEY = "project_8";
export const SPOTIFY_MUSIC_GROUPS_SESSION_COLLECTION = "projects_content";

const NESTED_ARRAY_WRAPPER_KEY = "__firestoreNestedArray";

export type SpotifyMusicGroupsSessionProjectDocument = SpotifyMusicGroupsSessionDataProjectDocument;

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

export async function fetchSpotifyMusicGroupsSessionProject(): Promise<SpotifyMusicGroupsSessionProjectDocument> {
  const docRef = doc(db, SPOTIFY_MUSIC_GROUPS_SESSION_COLLECTION, SPOTIFY_MUSIC_GROUPS_SESSION_PROJECT_KEY);
  const snap = await getDoc(docRef);

  if (!snap.exists()) {
    throw new Error(
      `Missing Firestore document: ${SPOTIFY_MUSIC_GROUPS_SESSION_COLLECTION}/${SPOTIFY_MUSIC_GROUPS_SESSION_PROJECT_KEY}`,
    );
  }

  const payload = snap.data() as { content?: unknown };
  const content = payload?.content;

  if (!content) {
    throw new Error(
      `Missing 'content' field in ${SPOTIFY_MUSIC_GROUPS_SESSION_COLLECTION}/${SPOTIFY_MUSIC_GROUPS_SESSION_PROJECT_KEY}`,
    );
  }

  return decodeFirestoreNestedArrays(content) as SpotifyMusicGroupsSessionProjectDocument;
}

export function subscribeSpotifyMusicGroupsSessionProject(
  onData: (project: SpotifyMusicGroupsSessionProjectDocument) => void,
  onError: (error: Error) => void,
): () => void {
  const docRef = doc(db, SPOTIFY_MUSIC_GROUPS_SESSION_COLLECTION, SPOTIFY_MUSIC_GROUPS_SESSION_PROJECT_KEY);

  return onSnapshot(
    docRef,
    (snap) => {
      try {
        if (!snap.exists()) {
          throw new Error(
            `Missing Firestore document: ${SPOTIFY_MUSIC_GROUPS_SESSION_COLLECTION}/${SPOTIFY_MUSIC_GROUPS_SESSION_PROJECT_KEY}`,
          );
        }

        const payload = snap.data() as { content?: unknown };
        const content = payload?.content;
        if (!content) {
          throw new Error(
            `Missing 'content' field in ${SPOTIFY_MUSIC_GROUPS_SESSION_COLLECTION}/${SPOTIFY_MUSIC_GROUPS_SESSION_PROJECT_KEY}`,
          );
        }

        onData(
          decodeFirestoreNestedArrays(content) as SpotifyMusicGroupsSessionProjectDocument,
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
