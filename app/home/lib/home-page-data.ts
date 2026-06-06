import {
  mainBannerFallback,
  type MainBannerData,
} from "@/app/home/data/main-banner-data";

export type { MainBannerData };

/** Aggregated Firestore-backed content for landing-page panels. */
export type HomePageData = {
  mainBanner: MainBannerData;
};

export const homePageFallback: HomePageData = {
  mainBanner: mainBannerFallback,
};

export function parseMainBannerDocument(
  data: Record<string, unknown>,
): MainBannerData {
  const title = typeof data.title === "string" ? data.title.trim() : "";
  const description =
    typeof data.description === "string" ? data.description.trim() : "";

  if (!title || !description) {
    throw new Error("Missing 'title' or 'description' in main_page/main_banner");
  }

  return { title, description };
}
