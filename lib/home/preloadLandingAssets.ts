import { buildPublicStorageUrlWithBucket } from "@/lib/firebase/publicStorageUrl";
import { HEADER_LOGO_PNG_STORAGE_PATH } from "@/lib/home/landingAssetPaths";
import { SPLASH_LOGO_SRC } from "@/lib/home/splashLogo";
import { preloadImages } from "@/lib/media/preloadImages";

const LOCAL_LOGO_FALLBACK = "/images/topbar-header/AAE-SimpleLogo.svg";

/** URLs the header logo may use — preload so first paint after splash hits cache. */
export function getHeaderLogoPreloadUrls(): string[] {
  const urls: string[] = [SPLASH_LOGO_SRC, LOCAL_LOGO_FALLBACK];
  const bucket = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET?.trim();
  if (bucket) {
    try {
      urls.unshift(
        buildPublicStorageUrlWithBucket(bucket, HEADER_LOGO_PNG_STORAGE_PATH),
      );
    } catch {
      /* ignore */
    }
  }
  return urls;
}

export async function preloadLandingImages(): Promise<void> {
  await preloadImages(getHeaderLogoPreloadUrls());
}
