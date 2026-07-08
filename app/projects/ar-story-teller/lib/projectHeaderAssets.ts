/** Firebase Storage object paths for AR Story Teller hero + overview artwork (`projectKey`: project_1). */

const PROJECT_1_PREFIX = "projects/project_1";

/** Castle + queue strip below the hero parallax (`PeopleInLineCrowd`). */
export const PROJECT_HEADER_CROWD_OBJECT_PATH =
  `${PROJECT_1_PREFIX}/CrowdsWaiting-Desktop.png`;

/** Ferris wheel silhouettes behind overview copy (`OverviewParagraphBlock`). */
export const OVERVIEW_WAITING_PEOPLE_OBJECT_PATHS = {
  desktop: `${PROJECT_1_PREFIX}/WaitingPeople-DesktopLg.png`,
  tablet: `${PROJECT_1_PREFIX}/WaitingPeople-LgMd.png`,
  mobile: `${PROJECT_1_PREFIX}/WaitingPeople-SMSX.png`,
} as const;

/** Desktop + tablet parallax layers (back → front render order is defined in `ProjectHeader`). */
export const PROJECT_HEADER_DESKTOP_CLOUD_OBJECT_PATHS = {
  layer1: `${PROJECT_1_PREFIX}/cloud-1.png`,
  layer2: `${PROJECT_1_PREFIX}/cloud-2.png`,
  layer3: `${PROJECT_1_PREFIX}/cloud-3.png`,
  layer4: `${PROJECT_1_PREFIX}/cloud-4.png`,
} as const;

/** Mobile parallax layers. */
export const PROJECT_HEADER_MOBILE_CLOUD_OBJECT_PATHS = {
  layer1: `${PROJECT_1_PREFIX}/clouds-layer-1.png`,
  layer2: `${PROJECT_1_PREFIX}/clouds-layer-2.png`,
  layer3: `${PROJECT_1_PREFIX}/clouds-layer-3.png`,
  layer4: `${PROJECT_1_PREFIX}/clouds-layer-4.png`,
} as const;

export type ProjectHeaderCloudObjectPaths =
  | typeof PROJECT_HEADER_DESKTOP_CLOUD_OBJECT_PATHS
  | typeof PROJECT_HEADER_MOBILE_CLOUD_OBJECT_PATHS;
