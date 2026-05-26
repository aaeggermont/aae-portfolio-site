/** Firestore `content` fields used by `ArStoryTellerPage`. */

import type { DesignSystem } from "./designSystemTypes";

export type { DesignSystem, StoryboardSlide } from "./designSystemTypes";

export type OverviewBlock = {
  title: string;
  paragraphs: string[];
};

export type SolutionBlock = OverviewBlock & {
  description?: string;
  alt?: string;
  images?: string[];
};

export type TeamMember = {
  name: string;
  role: string;
};

export type TeamData = {
  title: string;
  members: TeamMember[];
};

export type CaseStudyOverview = {
  title: string;
  paragraphs: string[];
};

export type ARAsNarrativeTool = {
  title: string;
  paragraphs: string[];
  imageSrc: string;
  alt: string;
};

export type NotificationsAttrac = {
  title: string;
  paragraphs: string[];
  images: string[];
  alt?: string;
  description?: string;
};

export type MagicExperience = {
  title: string;
  alt: string;
  description: string;
  images: string[];
};

export type MagicExperiences = {
  title: string;
  paragraphs: string[];
  experiences: MagicExperience[];
};

export type ConclusionItem = {
  title: string;
  paragraphs?: string[];
};

export type ArStoryTellerCaseStudy = {
  overview: CaseStudyOverview;
  overviewImages: string[];
  overviewImagesAlt: string;
  ARAsNarrativeTool: ARAsNarrativeTool;
  notificationsAttrac: NotificationsAttrac;
  magicExperiences: MagicExperiences;
  designSystem: DesignSystem;
  conclusionsAndImpact?: ConclusionItem[];
};

export type ArStoryTellerContent = {
  designChallenge: OverviewBlock;
  theProblem: OverviewBlock;
  solution: SolutionBlock;
  team: TeamData;
  caseStudy: ArStoryTellerCaseStudy;
};

export type OverviewSectionData = Pick<
  ArStoryTellerContent,
  "designChallenge" | "theProblem" | "solution"
>;

export type TeamSectionData = Pick<ArStoryTellerContent, "team">;

export type CaseStudyOverviewSectionData = Pick<
  ArStoryTellerContent,
  "caseStudy"
>;

export type DesignSystemSectionData = Pick<ArStoryTellerContent, "caseStudy">;

export type ConclusionsAndImpactSectionData = Pick<
  ArStoryTellerContent,
  "caseStudy"
>;
