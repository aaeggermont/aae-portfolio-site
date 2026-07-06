export const HOME_SECTION_IDS = ["hero", "about", "work", "contact"] as const;

export type HomeSectionId = (typeof HOME_SECTION_IDS)[number];

export function isHomeSectionId(value: string): value is HomeSectionId {
  return (HOME_SECTION_IDS as readonly string[]).includes(value);
}

export function scrollToHomeSection(
  id: HomeSectionId,
  options?: { behavior?: ScrollBehavior },
) {
  const target = document.getElementById(id);
  if (!target) return;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  target.scrollIntoView({
    behavior: options?.behavior ?? (reducedMotion ? "auto" : "smooth"),
    block: "start",
  });
}

export type HomeNavKey = "home" | "about" | "work" | "contact";

export function getHomeNavHref(pathname: string, key: HomeNavKey): string {
  if (key === "about") return "/aboutme";
  if (key === "work") return "/mywork";

  if (pathname !== "/") {
    if (key === "home") return "/";
    return "/contact";
  }

  if (key === "home") return "#hero";
  return "#contact";
}

export function isHomeNavActive(
  pathname: string,
  hash: string,
  key: HomeNavKey,
): boolean {
  if (key === "about") {
    return pathname.startsWith("/aboutme");
  }

  if (key === "work") {
    return pathname.startsWith("/mywork") || pathname.startsWith("/work");
  }

  if (key === "contact") {
    return (
      pathname.startsWith("/contact") ||
      (pathname === "/" && hash === "#contact")
    );
  }

  return pathname === "/" && (!hash || hash === "#hero");
}
