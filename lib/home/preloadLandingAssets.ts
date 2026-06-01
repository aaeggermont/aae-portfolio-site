import { SPLASH_LOGO_SRC } from "@/lib/home/splashLogo";
import { preloadImages } from "@/lib/media/preloadImages";

/** URLs to warm before / after landing splash (header logo is inline SVG — not preloaded). */
export function getHeaderLogoPreloadUrls(): string[] {
  return [SPLASH_LOGO_SRC];
}

export async function preloadLandingImages(): Promise<void> {
  await preloadImages(getHeaderLogoPreloadUrls());
}
