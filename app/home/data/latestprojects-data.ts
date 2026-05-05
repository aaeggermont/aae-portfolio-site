// app/home/data/latest-projects-data.ts
import type { StaticImageData } from "next/image";

import ARMagicToursThumb from "../images/arMagicTours-thumb.png";
import DCLImageThumb from "../images/DCLImage-thumb.png";
import R3XAutomaticSeaterThumb from "../images/R3-XAutomaticSeater-thumb.png";

export type LatestProjectItem = {
  title: string;
  img: StaticImageData;
  description: string[];
};

export const latestProjectsItems: LatestProjectItem[] = [
  {
    title: "Disney AR Magic Tours",
    img: ARMagicToursThumb,
    description: [
      "Enhanced park experiences by transforming the environment into an interactive AR-driven attraction",
    ],
  },
  {
    title: "Disney Cruise Line Revenue Management",
    img: DCLImageThumb,
    description: [
      "Led front-end redesign of dashboards, data grids, and ingestion workflows for pricing and inventory insights."
    ],
  },
  {
    title: "R-3X – Automatic Seating Assignments",
    img: R3XAutomaticSeaterThumb,
    description: [
      "Led development of a real-time mobile solution to optimize guest seating throughput at rides and attractions."
    ],
  },
];
