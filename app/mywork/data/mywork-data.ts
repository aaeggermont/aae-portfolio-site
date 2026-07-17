/**
 * My Work page frame content (title + summary).
 * Seeded to Firestore at `my_work_page/intro`.
 */

export type MyWorkPageData = {
  version: number;
  pageTitle: string;
  summary: string;
};

export const myWorkPageFallback: MyWorkPageData = {
  version: 1,
  pageTitle: "My Work",
  summary:
    "This collection brings together professional case studies, academic research, and technical explorations that reflect my approach to designing and building intelligent digital products. Spanning UX engineering, software development, human-centered design, and AI, these projects demonstrate how I transform complex challenges into intuitive experiences that create value for both people and organizations.",
};

/** @deprecated Prefer `myWorkPageFallback`; kept for existing imports. */
export const MyWorkPageData = {
  pageTitle: myWorkPageFallback.pageTitle,
  summary: myWorkPageFallback.summary,
} as const;
