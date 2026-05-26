import type { StaticImageData } from "next/image";

import CloudsLayer1 from "../Images/cloud-1.png";
import CloudsLayer2 from "../Images/cloud-2.png";
import CloudsLayer3 from "../Images/cloud-3.png";
import CloudsLayer4 from "../Images/cloud-4.png";
import CloudsLayerMobile1 from "../Images/clouds-layer-1.png";
import CloudsLayerMobile2 from "../Images/clouds-layer-2.png";
import CloudsLayerMobile3 from "../Images/clouds-layer-3.png";
import CloudsLayerMobile4 from "../Images/clouds-layer-4.png";
import CrowdsWaitingDesktop from "../Images/CrowdsWaiting-Desktop.png";

export type ViewportBand = "mobile" | "tablet" | "desktop";

function staticSrc(image: StaticImageData): string {
  return image.src;
}

const DESKTOP_HEADER_IMAGES = [
  CloudsLayer1,
  CloudsLayer2,
  CloudsLayer3,
  CloudsLayer4,
  CrowdsWaitingDesktop,
];

const TABLET_HEADER_IMAGES = [
  CloudsLayer1,
  CloudsLayer2,
  CloudsLayer3,
  CloudsLayer4,
  CrowdsWaitingDesktop,
];

const MOBILE_HEADER_IMAGES = [
  CloudsLayerMobile1,
  CloudsLayerMobile2,
  CloudsLayerMobile3,
  CloudsLayerMobile4,
  CrowdsWaitingDesktop,
];

/** Static `ProjectHeader` artwork for the active viewport band. */
export function getProjectHeaderPreloadUrls(band: ViewportBand): string[] {
  const images =
    band === "mobile"
      ? MOBILE_HEADER_IMAGES
      : band === "tablet"
        ? TABLET_HEADER_IMAGES
        : DESKTOP_HEADER_IMAGES;

  return images.map(staticSrc);
}
