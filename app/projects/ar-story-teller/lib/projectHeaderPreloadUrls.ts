import {
  OVERVIEW_WAITING_PEOPLE_OBJECT_PATHS,
  PROJECT_HEADER_CROWD_OBJECT_PATH,
  PROJECT_HEADER_DESKTOP_CLOUD_OBJECT_PATHS,
  PROJECT_HEADER_MOBILE_CLOUD_OBJECT_PATHS,
} from "./projectHeaderAssets";

export type ViewportBand = "mobile" | "tablet" | "desktop";

const DESKTOP_CLOUD_OBJECT_PATHS = [
  PROJECT_HEADER_DESKTOP_CLOUD_OBJECT_PATHS.layer4,
  PROJECT_HEADER_DESKTOP_CLOUD_OBJECT_PATHS.layer3,
  PROJECT_HEADER_DESKTOP_CLOUD_OBJECT_PATHS.layer2,
  PROJECT_HEADER_DESKTOP_CLOUD_OBJECT_PATHS.layer1,
];

const MOBILE_CLOUD_OBJECT_PATHS = [
  PROJECT_HEADER_MOBILE_CLOUD_OBJECT_PATHS.layer4,
  PROJECT_HEADER_MOBILE_CLOUD_OBJECT_PATHS.layer3,
  PROJECT_HEADER_MOBILE_CLOUD_OBJECT_PATHS.layer2,
  PROJECT_HEADER_MOBILE_CLOUD_OBJECT_PATHS.layer1,
];

/** Cloud layers + crowd strip for the active viewport band. */
export function getProjectHeaderPreloadObjectPaths(
  band: ViewportBand,
): string[] {
  const cloudPaths =
    band === "mobile" ? MOBILE_CLOUD_OBJECT_PATHS : DESKTOP_CLOUD_OBJECT_PATHS;

  return [...cloudPaths, PROJECT_HEADER_CROWD_OBJECT_PATH];
}

export function getOverviewWaitingPeoplePreloadObjectPath(
  band: ViewportBand,
): string {
  if (band === "mobile") {
    return OVERVIEW_WAITING_PEOPLE_OBJECT_PATHS.mobile;
  }

  if (band === "tablet") {
    return OVERVIEW_WAITING_PEOPLE_OBJECT_PATHS.tablet;
  }

  return OVERVIEW_WAITING_PEOPLE_OBJECT_PATHS.desktop;
}
