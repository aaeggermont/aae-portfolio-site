/**
 * Firestore `caseStudy.designSystem` shape (paths are Storage object paths unless noted).
 * Phase B — full typing for `DesignSystemSection` and related components.
 */

import type { ResearchMethodCardData } from "./researchMethodCard";

/** Responsive band: desktop / tablet / mobile (seed convention). */
export type ResponsiveImagePaths = string[];

export type StorageImageRef = {
  objectPath: string;
  alt: string;
};

export type BulletPointItem = {
  icon: string;
  text: string;
};

export type ProcessBullet = string | BulletPointItem;

export type FeatureSpecification = {
  title: string;
  description?: string;
  /** Legacy seed typo — prefer `description`. */
  desciption?: string;
};

export type FeaturesAndSpecificationsBlock = {
  title: string;
  featuresAndSpecifications: FeatureSpecification[];
};

export type InteractionModeSpec = {
  title: string;
  description: string;
  image: StorageImageRef;
};

export type InteractionModeSpecs = {
  title: string;
  modes: InteractionModeSpec[];
};

export type DevelopingSpecs = {
  title: string;
  paragraphs: string[];
  images?: StorageImageRef[];
  featuresAndSpecifications?: FeaturesAndSpecificationsBlock;
  interactionDesignModeSpecifications?: InteractionModeSpecs;
};

/** Carousel cards at `designSystem.researchMethods` (seed may include extra fields). */
export type DesignSystemResearchMethod = ResearchMethodCardData & {
  paragraphs?: string[];
  bulletpoints?: BulletPointItem[];
  sectionImages?: ResponsiveImagePaths;
};

export type UserResearchJourney = {
  title: string;
  paragraphs: string[];
  alt: string;
  imagesDescription: string;
  images: ResponsiveImagePaths;
  /** Legacy nested methods — UI uses top-level `researchMethods`. */
  methods?: DesignSystemResearchMethod[];
};

export type StoryboardSlideInput = {
  alt: string;
  title: string;
  image: string;
  description: string;
};

/** Mapped for `Storyboard` carousel (`ProjectImage` expects `objectPath` + `alt`). */
export type StoryboardSlide = {
  title: string;
  description: string;
  image: StorageImageRef;
};

export type EnvisionUseCase = {
  title: string;
  paragraphs?: string[];
  storyboard?: {
    title: string;
    storyboardSlides: StoryboardSlideInput[];
  };
};

export type Storyboarding = {
  title: string;
};

export type ScenarioBaseDesign = {
  title: string;
  paragraphs: string[];
  storyboarding: Storyboarding;
  images: ResponsiveImagePaths;
  alt: string;
};

export type PrototypingImage = {
  objectPath: string;
  alt: string;
  annotation?: string;
  annotationInstruction?: string;
};

export type PrototypingMethod = {
  title: string;
  alt: string;
  paragraphs?: string[];
  /** Expandable copy blocks (Software Prototypes panel). */
  accordionSections?: FeatureSpecification[];
  images: PrototypingImage[];
};

export type Prototyping = {
  title: string;
  paragraphs?: string[];
  methods?: PrototypingMethod[];
};

export type SoftwarePrototypes = {
  title: string;
  paragraphs: string[];
  prototypeVideos?: {
    title: string;
    paragraphs?: string[];
    videos?: Array<{
      title?: string;
      width?: string;
      height?: string;
      description?: string;
      srcVideo?: string;
    }>;
  };
};

export type ProcessSection = {
  title: string;
  bulletpoints?: ProcessBullet[];
};

export type UsabilityInsight = {
  insightTitle: string;
  insightDescription: string;
};

export type FindingsInsights = {
  title: string;
  insights?: UsabilityInsight[];
};

export type UsabilityTesting = {
  title: string;
  paragraphs?: string[];
  theProcess?: ProcessSection;
  /** Seed field name: `FindingsInsights`. */
  FindingsInsights?: FindingsInsights;
  dataAnalysis?: ProcessSection;
};

export type DesignSystem = {
  title: string;
  paragraphs: string[];
  alt: string;
  imageTitle: string;
  imageDescription: string;
  images: ResponsiveImagePaths;
  description: string;
  userResearchJourney: UserResearchJourney;
  developingSpecs: DevelopingSpecs;
  /** Not in current seed; optional for forward compatibility. */
  scenarioBaseDesign?: ScenarioBaseDesign;
  prototyping?: Prototyping;
  softwarePrototypes: SoftwarePrototypes;
  usabilityTesting?: UsabilityTesting;
  researchMethods?: DesignSystemResearchMethod[];
  envisionUseCase?: EnvisionUseCase;
};
