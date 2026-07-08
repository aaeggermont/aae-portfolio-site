"use client";

import { useProjectAccess } from "@/lib/access/ProjectAccessContext";
import {
  buildPublicStorageUrl,
  stripLeadingSlash,
} from "@/lib/firebase/publicStorageUrl";

import { useSignedMediaUrl } from "./useSignedMediaUrl";

/** Resolves a gated or public Storage URL for CSS backgrounds and non-`ProjectImage` use. */
export function useProjectMediaUrl(objectPath: string) {
  const { projectKey, visibility } = useProjectAccess();
  const normalizedPath = stripLeadingSlash(objectPath);
  const isPublic = visibility === "public";
  const publicUrl = isPublic ? buildPublicStorageUrl(normalizedPath) : null;
  const { url: signedUrl, error: signedError } = useSignedMediaUrl(
    projectKey,
    normalizedPath,
    { enabled: !isPublic },
  );

  return {
    url: publicUrl ?? signedUrl,
    error: publicUrl ? null : signedError,
  };
}
