"use client";

import {
  AnnotatedPhoneSpec,
  type AnnotatedPhoneCallout,
} from "./AnnotatedPhoneSpec";

export type WireframeCallout = AnnotatedPhoneCallout;

export const LEFT_WIREFRAME_CALLOUTS: WireframeCallout[] = [
  {
    number: "1",
    title: "System Indicators",
    description:
      "Displays device-level information such as time, battery status, and connectivity.",
  },
  {
    number: "2",
    title: "AR Coaching Overlay",
    description:
      "Provides contextual guidance to help guests understand how to interact with AR elements in the environment.",
  },
  {
    number: "3",
    title: "Attraction Story Content",
    description:
      "Presents narrative details and contextual information about the attraction.",
  },
  {
    number: "4",
    title: "AR Content Area",
    description:
      "Displays augmented reality overlays anchored to the physical environment, enabling interactive exploration.",
  },
];

export const RIGHT_WIREFRAME_CALLOUTS: WireframeCallout[] = [
  {
    number: "5",
    title: "Discover",
    description:
      "Initiates scanning to detect and surface nearby AR content.",
  },
  {
    number: "6",
    title: "Camera",
    description:
      "Opens the camera to capture photos with AR overlays.",
  },
  {
    number: "7",
    title: "About",
    description:
      "Displays additional information about the attraction’s story and background.",
  },
  {
    number: "8",
    title: "Share",
    description:
      "Allows guests to share AR-enhanced photos via social platforms.",
  },
];

export type ArExperienceWireframeSpecProps = {
  objectPath: string;
  alt: string;
};

/**
 * Phone mockup with numbered markers (in the asset) plus HTML callout labels
 * matching the AR Experience Spec wireframe diagram.
 */
export function ArExperienceWireframeSpec({
  objectPath,
  alt,
}: ArExperienceWireframeSpecProps) {
  return (
    <AnnotatedPhoneSpec
      objectPath={objectPath}
      alt={alt}
      leftCallouts={LEFT_WIREFRAME_CALLOUTS}
      rightCallouts={RIGHT_WIREFRAME_CALLOUTS}
      ariaLabel="AR Storytelling Experience wireframe with annotations"
    />
  );
}

export default ArExperienceWireframeSpec;
