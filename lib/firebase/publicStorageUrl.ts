/**
 * Public Firebase Storage download URLs (object must be readable by unauthenticated clients).
 * Path is the object path in the bucket, e.g. `site/AAE-SimpleLogo.svg`.
 */

export function stripLeadingSlash(path: string): string {
  return path.startsWith("/") ? path.slice(1) : path;
}

/** Same REST shape Firebase uses for `getDownloadURL`-style public reads (`?alt=media`). */
export function buildPublicStorageUrlWithBucket(
  bucket: string,
  objectPath: string,
): string {
  const normalizedPath = stripLeadingSlash(objectPath);
  const encodedPath = encodeURIComponent(normalizedPath);
  return `https://firebasestorage.googleapis.com/v0/b/${bucket}/o/${encodedPath}?alt=media`;
}

export function buildPublicStorageUrl(objectPath: string): string {
  const bucket = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;

  if (!bucket) {
    throw new Error("Missing NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET");
  }

  return buildPublicStorageUrlWithBucket(bucket, objectPath);
}

/**
 * Some projects use `*.appspot.com` and some `*.firebasestorage.app` as the bucket id in
 * `v0/b/{bucket}/o/...` URLs. They are not always interchangeable — if one form 404s, try the other.
 */
export function alternateFirebaseStorageBucketId(bucket: string): string | null {
  if (bucket.endsWith(".firebasestorage.app")) {
    const projectId = bucket.slice(0, -".firebasestorage.app".length);
    return `${projectId}.appspot.com`;
  }
  if (bucket.endsWith(".appspot.com")) {
    const projectId = bucket.slice(0, -".appspot.com".length);
    return `${projectId}.firebasestorage.app`;
  }
  return null;
}
