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
      "As a UX engineer and designer, I get involved in the different stages of the user experience design process, from user research to implementation. My technical skills as a software engineer and creative skills as a designer allow me to collaborate and bridge the gap between different teams and disciplines.",
      "My experience in UX engineering and design centers on understanding target audiences through user research to create positive and usable user experiences. My experience in UI Design includes information architecture, page layout, interactive elements, development of wireframes at different resolutions, and digital and software functional prototypes.",
    ],
  },
  {
    title: "Human Centered Design",
    img: HumanCenteredDesignIcon,
    description: [
      "I employ user centered design as a design framework to make usable products and services. In my professional experience, user centered design has helped me understand where to begin when building or enhancing a new product or service, keeping the user-first mind set, employing iteration in the design and development process, and building empathy and collaboration across the different teams involved.",
      "User research methods I have experience with include context inquiry interviews, co-design, participatory design, rapid ethnography, brainstorming, literature research, storyboarding, and development of personas. I enjoy using Design Thinking and Human Computer Interaction as toolkits for technology innovation, where I practice empathy building for users, developers, and stakeholders to prototype and test solutions.",
    ],
  },
  {
    title: "Frontend Development",
    img: FrontEndDevelopmentIcon,
    description: [
      "As a front end engineer, I take the vision and design concepts for implementation through code. I have a particular interest in designing and developing AI/ML driven interactive interfaces for Web and Mobile platforms.",
      "My experience in front end development includes frameworks such as Angular, React, Django, and knowledge of iOS/Swift. Programming and markup languages include HTML, CSS preprocessors, Javascript, TypeScript and Python.",
      "The projects I have developed include Web apps and Mobile Web apps for Web publishing, content management systems, revenue management systems, and front end applications that interface with AI/ML backend services for automation and recommendation systems.",
    ],
  },
  {
    title: "Systems Integration",
    img: SystemsArchitectureIcon,
    description: [
      "My experience in systems integration ranges from data, user experience, process integration, and application integrations to ensure different system components work together seamlessly to achieve a unified and full view of a functional application or service.",
      "My most recent work in systems integration include data exchange between frontend and backend systems via RestFull interfaces, event driven for two-way interactive communication and message queues, and integration of cloud platform providers such AWS, GCP, and SnowFlake data storage.",
    ],
  },
];

export default backgroundItems;
