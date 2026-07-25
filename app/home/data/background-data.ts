export type BackgroundItem = {
  title: string;
  /** Firebase Storage object path under the public `site/` prefix. */
  iconObjectPath: string;
  /** Card icon display size — defaults to 36×36. */
  iconWidth?: number;
  iconHeight?: number;
  /** One-line blurb shown on the card under the title. */
  summary: string;
  /** Longer copy shown in the card dialog. */
  description: string[];
};

export const backgroundItems: BackgroundItem[] = [
  {
    title: "UX Engineering",
    iconObjectPath: "site/UXEngineringCardIcon.png",
    iconWidth: 44,
    iconHeight: 36,
    summary:
      "Bridging design and engineering to build intuitive digital experiences.",
    description: [
      "I bridge design and engineering across the full product lifecycle—from research and concept to implementation. My combination of design craft and software engineering helps teams ship experiences that are both usable and technically sound, and I work as a connector between design, product, and engineering.",
      "I focus on understanding users and translating that into clear structure and interaction: information architecture, layouts, wireframes at multiple breakpoints, and functional prototypes. I’ve applied this in product design, web and mobile interfaces, and in high-traffic, guest-facing experiences.",
    ],
  },
  {
    title: "Human-Centered Design",
    iconObjectPath: "site/HumanCenteredDesignCardIcon.png",
    summary:
      "Designing products around people, workflows, and business goals.",
    description: [
      "I use human-centered design as a framework to keep products and services usable and aligned with real user needs. In practice, that means starting from the user when building or improving a product, iterating in design and development, and building empathy and collaboration across design, engineering, and stakeholders.",
      "I draw on research methods such as contextual inquiry, co-design, participatory design, rapid ethnography, personas, and storyboarding, and I apply Design Thinking and human–computer interaction (HCI) to prototype and test solutions with users and stakeholders.",
    ],
  },
  {
    title: "Software Development",
    iconObjectPath: "site/SoftwareDevelopmentCardIcon.png",
    summary:
      "Building modern, scalable, and interactive enterprise applications.",
    description: [
      "I turn design vision into production-ready frontends for web and mobile, with a focus on performance and maintainable code. I specialize in AI/ML-driven interactive interfaces that connect users to intelligent backend services.",
      "I work with frameworks such as React, Angular, Django, and iOS/Swift, and languages including TypeScript, JavaScript, Python, HTML, and CSS (with preprocessors). I've delivered frontends for content and revenue management systems, web publishing, and applications that integrate with AI/ML backends for automation and recommendations.",
    ],
  },
  {
    title: "Data & Visualization",
    iconObjectPath: "site/DatVizCardIcon.png",
    summary:
      "Transforming complex data into actionable insights and intuitive visual experiences.",
    description: [
      "I design and build enterprise data-driven applications, including analytics dashboards, interactive data grids, data ingestion workflows, and decision-support tools. My work centers on making complex enterprise systems easier to understand through intuitive data visualization and user-centered interfaces that support confident decision-making.",
    ],
  },
];

export default backgroundItems;
