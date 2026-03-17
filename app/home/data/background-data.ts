import type { StaticImageData } from "next/image";

import UXUIDesignIcon from "../images/UXUIDesignIcon.png";
import HumanCenteredDesignIcon from "../images/HumanCenteredDesignIcon.png";
import FrontEndDevelopmentIcon from "../images/FullStrackDevelopmentIcon.png";
import SystemsArchitectureIcon from "../images/SystemsArchitectureIcon.png";

export type BackgroundItem = {
  title: string;
  img: StaticImageData;
  description: string[];
};

export const backgroundItems: BackgroundItem[] = [
  {
    title: "UX/UI Design & Engineering",
    img: UXUIDesignIcon,
    description: [
      "I bridge design and engineering across the full product lifecycle—from research and concept to implementation. My combination of design craft and software engineering helps teams ship experiences that are both usable and technically sound, and I work as a connector between design, product, and engineering.",
      "I focus on understanding users and translating that into clear structure and interaction: information architecture, layouts, wireframes at multiple breakpoints, and functional prototypes. I’ve applied this in product design, web and mobile interfaces, and in high-traffic, guest-facing experiences.",
    ],
  },
  {
    title: "Human Centered Design",
    img: HumanCenteredDesignIcon,
    description: [
      "I use human-centered design as a framework to keep products and services usable and aligned with real user needs. In practice, that means starting from the user when building or improving a product, iterating in design and development, and building empathy and collaboration across design, engineering, and stakeholders.",
      "I draw on research methods such as contextual inquiry, co-design, participatory design, rapid ethnography, personas, and storyboarding, and I apply Design Thinking and human–computer interaction (HCI) to prototype and test solutions with users and stakeholders.",
    ],
  },
  {
    title: "Frontend Development",
    img: FrontEndDevelopmentIcon,
    description: [
      "I turn design vision into production-ready frontends for web and mobile, with a focus on performance and maintainable code. I specialize in AI/ML-driven interactive interfaces that connect users to intelligent backend services.",
      "I work with frameworks such as React, Angular, Django, and iOS/Swift, and languages including TypeScript, JavaScript, Python, HTML, and CSS (with preprocessors). I've delivered frontends for content and revenue management systems, web publishing, and applications that integrate with AI/ML backends for automation and recommendations.",
    ],
  },
  {
    title: "Systems Integration",
    img: SystemsArchitectureIcon,
    description: [
      "I connect data, user experience, and application layers so that systems work together seamlessly and users get a unified view of the product or service. I focus on making frontends, backends, and data reliable and scalable as they grow.",
      "I work with RESTful APIs, event-driven architecture and message queues for real-time and two-way communication, and cloud integrations—including AWS, GCP, and Snowflake—so that applications stay consistent and performant end to end.",
    ],
  },
];

export default backgroundItems;
