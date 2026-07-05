import {
  getHomeNavHref,
  isHomeNavActive,
  type HomeNavKey,
} from "@/lib/home/homeAnchors";

export type HeaderNavKey = "home" | "about" | "work" | "resume" | "contact";

export type HeaderNavItem = {
  key: HeaderNavKey;
  label: string;
  /** Route path for Next.js links; omitted for download-only items. */
  path?: string;
  /** External download link (Resume PDF). */
  download?: boolean;
};

export const HEADER_NAV_ITEMS: readonly HeaderNavItem[] = [
  { key: "home", label: "Home", path: "/" },
  { key: "about", label: "About Me", path: "/aboutme" },
  { key: "work", label: "My Work", path: "/mywork" },
  { key: "resume", label: "Resume", download: true },
  { key: "contact", label: "Contact", path: "/contact" },
] as const;

function isSectionNavKey(key: HeaderNavKey): key is HomeNavKey {
  return key !== "resume";
}

/** Shared active-state rules for desktop, tablet, and mobile drawer nav. */
export function isHeaderNavActive(
  pathname: string,
  key: HeaderNavKey,
  hash = "",
): boolean {
  if (key === "resume") {
    return false;
  }
  return isHomeNavActive(pathname, hash, key);
}

export function getHeaderNavHref(
  item: HeaderNavItem,
  resumeHref: string,
  pathname: string,
): string {
  if (item.download) {
    return resumeHref;
  }
  if (isSectionNavKey(item.key)) {
    return getHomeNavHref(pathname, item.key);
  }
  return item.path ?? "/";
}
