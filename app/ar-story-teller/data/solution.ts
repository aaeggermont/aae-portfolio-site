import ARTowerofTerrorDemo from "../Images/ARTowerofTerrorDemo.gif";
import { StaticImageData } from "next/image";

interface Solution {
  title: string;
  description: string;
  alt: string;
  images: StaticImageData[];
  paragraphs: string[];
}

const solution: Solution = {
  title: "Solution",
  description: "Sample Mobile View of an Augmented View of the Tower of Terror Building",
  alt: "Sample Mobile View",
  images: [ARTowerofTerrorDemo, ARTowerofTerrorDemo, ARTowerofTerrorDemo],
  paragraphs: [
    "An Augmented Reality experience to make the physical environment an attraction itself for guests while they wait in long lines.  The digital experience can be used to create memories with scavenger hunt games collecting artifacts while learning more about attractions' story lines.",
  ],
};

export default solution;
