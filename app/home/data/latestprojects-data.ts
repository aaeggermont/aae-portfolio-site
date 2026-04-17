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
      "Enhanced the guest experience in Disney World theme parks by turning the environment into an attraction itself using augmented reality."
    ],
  },
  {
    title: "Disney Cruise Line Revenue Management",
    img: DCLImageThumb,
    description: [
      "Modernized a web app for revenue management to streamline data ingestion, visualization, and real-time notifications."
    ],
  },
  {
    title: "R-3X – Automatic Seating Assignments",
    img: R3XAutomaticSeaterThumb,
    description: [
      "Optimized throughput for seating guests at rides and attractions in Disney World theme parks."
    ],
  },
];
