export type MagicExperienceDefault = {
  title: string;
  alt: string;
  /** Short copy under the phone mockup. */
  description: string;
  /** Long copy for the lightbox left rail. */
  longDescription: string;
  objectPath: string;
};

export const DEFAULT_MAGIC_EXPERIENCES_COPY = {
  eyebrow: "Experience Screens",
  title: "Magic Experiences Using Augmented Reality",
  description:
    "Four connected moments turn the queue into an interactive story. Tap any screen to explore it up close.",
} as const;

/** Display order: Nearby → Discovering → Selfie → Artifacts. */
export const DEFAULT_MAGIC_EXPERIENCES: MagicExperienceDefault[] = [
  {
    title: "Nearby Attractions",
    alt: "Nearby Attractions AR screen",
    description: "Browse nearby attractions where AR content is available.",
    longDescription:
      "The initial screen lists nearby attractions with augmented reality content is available.",
    objectPath: "projects/project_1/ARNearbyAttractions.png",
  },
  {
    title: "Discovering Story Details",
    alt: "Discovering Story Details AR screen",
    description: "Scan the environment to unlock location-based story elements.",
    longDescription:
      "Guests can scan the physical environment to unlock location-based story elements tied to the attraction. Contextual notifications surface nearby points of interest, guiding guests to explore and engage with the narrative while waiting in line.",
    objectPath: "projects/project_1/ARDicoveringStoryDetails.png",
  },
  {
    title: "Taking a Selfie",
    alt: "Taking a Selfie AR screen",
    description: "Capture photos with integrated digital elements.",
    longDescription:
      "After interacting with AR content, guests can capture photos with integrated digital elements, creating personalized, shareable moments that extend the experience beyond the attraction.",
    objectPath: "projects/project_1/ARTakingSelfie.png",
  },
  {
    title: "Collecting Artifacts",
    alt: "Collecting Artifacts AR screen",
    description: "Collect digital artifacts tied to the attraction's narrative.",
    longDescription:
      "Guests can collect digital artifacts tied to the attraction’s narrative, creating a persistent, personalized record of their experience. These artifacts can be revisited, shared, and expanded over time, encouraging continued engagement beyond the visit.",
    objectPath: "projects/project_1/ARCollectingArtifacts.png",
  },
];
