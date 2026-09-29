/**
 * About Me intro content (page title + paragraphs).
 * Seeded to Firestore at `about_page/intro`.
 */

export type AboutIntroData = {
  version: number;
  pageTitle: string;
  pageParagraphs: string[];
};

export const aboutIntroFallback: AboutIntroData = {
  version: 1,
  pageTitle: "Hello, I'm Antonio",
  pageParagraphs: [
    "I'm a Lead Software Engineer and UX Engineer passionate about designing intelligent enterprise applications that connect human needs, business goals, data, and emerging technologies. My work brings together software engineering, human-centered design, analytics, and AI to create intuitive products that help people make better decisions.",
  ],
};
