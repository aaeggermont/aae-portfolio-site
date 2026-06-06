import { db } from "@/firebase";
import { doc, onSnapshot } from "firebase/firestore";

import {
  homePageFallback,
  parseMainBannerDocument,
  type HomePageData,
} from "@/app/home/lib/home-page-data";

export const MAIN_PAGE_COLLECTION = "main_page";

export const MAIN_PAGE_DOC_IDS = {
  mainBanner: "main_banner",
} as const;

type HomePagePanelKey = keyof typeof MAIN_PAGE_DOC_IDS;

function reportPanelError(
  panel: HomePagePanelKey,
  error: Error,
  onError?: (panel: HomePagePanelKey, error: Error) => void,
) {
  onError?.(panel, error);
  console.warn(
    `[home-panels] Firestore realtime read failed for "${panel}"; using local fallback.`,
    error,
  );
}

function subscribeMainPageDocument<T>(
  docId: string,
  parse: (data: Record<string, unknown>) => T,
  onData: (value: T) => void,
  onPanelError: (error: Error) => void,
) {
  const docRef = doc(db, MAIN_PAGE_COLLECTION, docId);

  return onSnapshot(
    docRef,
    (snap) => {
      try {
        if (!snap.exists()) {
          throw new Error(`Missing Firestore document: ${MAIN_PAGE_COLLECTION}/${docId}`);
        }

        const raw = snap.data() as Record<string, unknown> | undefined;
        if (!raw) {
          throw new Error(`Empty document: ${MAIN_PAGE_COLLECTION}/${docId}`);
        }

        onData(parse(raw));
      } catch (err) {
        onPanelError(
          err instanceof Error ? err : new Error("Unknown snapshot parsing error"),
        );
      }
    },
    (firestoreError) => {
      onPanelError(
        firestoreError instanceof Error
          ? firestoreError
          : new Error("Firestore subscription failed"),
      );
    },
  );
}

/**
 * Subscribes to all home-page panel documents under `main_page/*`.
 * Only `main_banner` is wired today; add more panels here as they are seeded.
 */
export function subscribeHomePageData(
  onData: (data: HomePageData) => void,
  onError?: (panel: HomePagePanelKey, error: Error) => void,
) {
  let latest = { ...homePageFallback };

  const publish = () => {
    onData(latest);
  };

  const unsubscribeMainBanner = subscribeMainPageDocument(
    MAIN_PAGE_DOC_IDS.mainBanner,
    parseMainBannerDocument,
    (mainBanner) => {
      latest = { ...latest, mainBanner };
      publish();
    },
    (error) => reportPanelError("mainBanner", error, onError),
  );

  publish();

  return () => {
    unsubscribeMainBanner();
  };
}
