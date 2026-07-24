// app/home/data/latest-projects-data.ts
import type { StaticImageData } from "next/image";

import ARMagicToursThumb from "../images/arMagicTours-thumb.png";
import DCLImageThumb from "../images/DCLImage-thumb.png";
import R3XAutomaticSeaterThumb from "../images/R3-XAutomaticSeater-thumb.png";

export type LatestProjectItem = {
  title: string;
  img: StaticImageData;
  /** Role line shown under the title (orange). */
  role: string;
  /** Short card body copy. */
  description: string;
  /** Bold outcome line at the bottom of the card. */
  outcome: string;
  /** Optional route for Selected Work cards that already have a project page. */
  href?: string;
};

export const latestProjectsItems: LatestProjectItem[] = [
  {
    title: "Disney AR Magic Tours",
    img: ARMagicToursThumb,
    role: "UX Engineer",
    description:
      "Transformed park environments into interactive AR-driven guest attractions.",
    outcome: "Guest experiences reimagined",
    href: "/work/ar-story-teller",
  },
  {
    title: "Disney Cruise Line Revenue Management",
    img: DCLImageThumb,
    role: "Frontend Lead",
    description:
      "Redesigned dashboards and ingestion workflows for pricing & inventory insights.",
    outcome: "Revenue systems modernized",
    href: "/work/dcl-revenue-management",
  },
  {
    title: "R-3X – Automatic Seating Assignments",
    img: R3XAutomaticSeaterThumb,
    role: "Frontend Lead",
    description:
      "Built a real-time mobile solution to optimize guest seating at rides and attractions.",
    outcome: "Seating throughput optimized",
    href: "/work/automatic-seater-assignments",
  },
];
