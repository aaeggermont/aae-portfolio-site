import { auth } from "@/firebase";
import type { ProjectAccessContextValue } from "@/lib/access/ProjectAccessContext";
import { buildPublicStorageUrl } from "@/lib/firebase/publicStorageUrl";
import { preloadOne } from "@/lib/media/preloadImages";

import { CASE_STUDY_BANNER_OBJECT_PATH } from "./criticalAssets";

type PreloadBannerOptions = {
  projectKey: string;
  visibility: ProjectAccessContextValue["visibility"];
};

async function preloadGatedMediaObject(
  projectKey: string,
  objectPath: string,
  visibility: ProjectAccessContextValue["visibility"],
): Promise<void> {
  if (visibility === "public") {
    try {
      await preloadOne(buildPublicStorageUrl(objectPath));
    } catch {
      /* ignore — page will retry via ProjectImage */
    }
    return;
  }

  const idToken = await auth.currentUser?.getIdToken().catch(() => undefined);

  const res = await fetch("/api/media/signed-url", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(idToken ? { Authorization: `Bearer ${idToken}` } : {}),
    },
    credentials: "include",
    body: JSON.stringify({ projectKey, objectPath }),
  });

  const data = (await res.json().catch(() => null)) as { url?: string } | null;
  if (data?.url) {
    await preloadOne(data.url);
  }
}

/** Case study hero banner (ProjectHeader layers load via mounted Next/Image). */
export async function preloadArStoryTellerCaseStudyBanner({
  projectKey,
  visibility,
}: PreloadBannerOptions): Promise<void> {
  await preloadGatedMediaObject(
    projectKey,
    CASE_STUDY_BANNER_OBJECT_PATH,
    visibility,
  );
}
