import type { StandaloneResearchMethodImageData } from "@/app/projects/automatic-seater-assignments/components/ResearchMethodImageBlock";
import type {
  ReadMoreWordConfig,
  ResearchMethodBlockData,
} from "@/app/projects/automatic-seater-assignments/researchMethodTypes";

/**
 * Firestore content shape for Automatic Seater Assignments
 * (`projects_content/project_4` → `content`).
 *
 * Seed values live only in `scripts/automatic-seater-assignments.data.ts`
 * (Node seed scripts) — do not import that module from client routes.
 */
export type AutomaticSeaterAssignmentsDataProjectDocument = {
  id: string;
  project: {
    projectId: number;
    projectKey: string;
  };
  gateTitle: string;
  overviewSection: {
    title: string;
    paragraphs: string[];
    background: string;
  };
  myContributions: {
    title: string;
    items: string[];
  };
  challengeCard: {
    title: string;
    introParagraph: string;
    question: {
      emphasisPrefix: string;
      text: string;
    };
  };
  mainSolution: {
    title: string;
    /** Plain text; use `\u00a0` for non-breaking spaces where needed. */
    body: string;
  };
  imageBanner: {
    projectKey: string;
    objectPath: string;
    alt: string;
    /** Passed to `GatedImage` `sizes` (e.g. `100vw` for full-bleed hero). */
    sizes: string;
    headline: string;
    taglineLine1: string;
    taglineLine2: string;
  };
  previewDemo: {
    projectKey: string;
    objectPath: string;
    alt: string;
    /** Passed to `GatedImage` `sizes` for responsive `srcSet`. */
    sizes: string;
    priority?: boolean;
    fullViewportLoading?: boolean;
  };
  narrative: {
    starToursCaseStudyTitle: string;
    starToursCaseStudySubtitle?: string;
    starToursIntroParagraphs: string[];
    starToursIntroReadMore?: ReadMoreWordConfig;
    humanCenteredDesignProcessSubtitle: string;
    humanCenteredDesignProcessParagraphs: string[];
    userResearchLeadInParagraphs: string[];
    userResearchSectionTitle: string;
    userResearchSectionSubtitle?: string;
    userResearchLeadInReadMore?: ReadMoreWordConfig;
  };
  figures: {
    humanCenteredDesignIllustration: StandaloneResearchMethodImageData;
  };
  sections: {
    projectOutcomes: {
      id: string;
      title: string;
      paragraphs: string[];
    };
    finalResultsKeyMetrics: {
      id: string;
      title: string;
      subtitle?: string;
      contentBlocks: Array<{
        type: "bullets";
        id: string;
        items: string[];
      }>;
    };
    nextSteps: {
      id: string;
      title: string;
      subtitle?: string;
      contentBlocks: Array<{
        type: "bullets";
        id: string;
        items: string[];
      }>;
    };
  };
  researchMethods: ResearchMethodBlockData[];
};

/** Public gate identifiers — safe to ship in the client (no case-study copy). */
export const AUTOMATIC_SEATER_PROJECT_ID = 4;
export const AUTOMATIC_SEATER_PROJECT_KEY = "project_4";
export const AUTOMATIC_SEATER_GATE_TITLE = "Automatic Seating Assignments";
