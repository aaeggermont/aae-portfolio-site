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
    "I'm a Lead Software Engineer and UX Engineer passionate about designing intelligent enterprise applications that connect human needs, business goals, data, and emerging technologies. My work combines software engineering, human-centered design, analytics, and AI to create products that help people make better decisions.",
    "Throughout my career, I've partnered with multidisciplinary teams to modernize enterprise platforms, build operational decision-support systems, and explore emerging technologies including augmented reality, computer vision, and AI-powered experiences. I enjoy translating complex business challenges into intuitive, scalable products that create meaningful value for both users and organizations.",
  ],
};
