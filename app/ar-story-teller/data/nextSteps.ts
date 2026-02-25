import { StaticImageData } from "next/image";
import BulletPoint from "../Images/BulletPoint.svg";
import NextSteps from "../Images/NextSteps.png";

interface BulletPointItem {
  icon: StaticImageData;
  text: string;
}

interface NextStepsData {
  title: string;
  sectionSeparatorImages: StaticImageData[];
  bulletpoints: BulletPointItem[];
}

const nextSteps: NextStepsData = {
  title: "Next Steps",
  sectionSeparatorImages: [NextSteps, NextSteps, NextSteps],
  bulletpoints: [
    {
      icon: BulletPoint,
      text: "More research and experimentation  is needed to assess other attractions where the A.R. Magic Tours framework can be implemented.",
    },
    {
      icon: BulletPoint,
      text: "A proof of concept using the A.R. Magic Tours framework will be implemented to create a A.R. experience for features films that don't have attractions available in the theme park. The A.R. experience will focus on Disney's Coco film. ",
    },
    {
      icon: BulletPoint,
      text: "Analyzing the potential of making a scalable and extendable platform for Augmented Reality entertainment at theme parks.  Using the on device ML platforms such as Apple's Core ML and and Onnx fo unity.  Machine learning models could be published and downloaded on demand with trained data specific to the attraction with enhanced A.R. content for guests to access.",
    },
  ],
};

export default nextSteps;
