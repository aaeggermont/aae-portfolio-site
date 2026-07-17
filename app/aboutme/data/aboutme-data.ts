import AAEPhoto from '../images/AAEPhoto.png';
import { aboutIntroFallback } from './about-intro-data';
import { experienceTrainingFallback } from './experience-training-data';
import {
  toEducationTimeline,
  toExperienceTimeline,
} from './experience-training-logos';

export const AboutMeData  =  {
  pageTitle: aboutIntroFallback.pageTitle,
  profilePhoto: AAEPhoto,
  pageParagraphs: aboutIntroFallback.pageParagraphs,
  skills: {
    design: [
      {
        name: "Human Centered Design",
        skillPercent: "95",
      },
      {
        name: "Human Computer Interaction",
        skillPercent: "70",
      },
      {
        name: "Figma",
        skillPercent: "95",
      },
      {
        name: "Adobe Photoshop",
        skillPercent: "95",
      },
      {
        name: "Adobe Premier",
        skillPercent: "95",
      },

      {
        name: "Adobe After Effects",
        skillPercent: "95",
      },
      {
        name: "Miro",
        skillPercent: "90",
      }
    ],
    engineering: [
      {
        name: "Angular",
        skillPercent: "95",
      },
      {
        name: "React.Js",
        skillPercent: "80",
      },
      {
        name: "Django",
        skillPercent: "90",
      },
      {
        name: "AI/ML",
        skillPercent: "90",
      },
      {
        name: "iO/Swift",
        skillPercent: "70",
      },
      {
        name: "Python",
        skillPercent: "70",
      },
      {
        name: "Typecript",
        skillPercent: "90",
      },
      {
        name: "JavaScript",
        skillPercent: "90",
      },
      {
        name: "Java",
        skillPercent: "90",
      },
    ]
  },
};

/** @deprecated Prefer experience-training Firestore data; kept for local fallbacks. */
export const TimelineData = {
  experience: toExperienceTimeline(experienceTrainingFallback.experience),
  education: toEducationTimeline(experienceTrainingFallback.education),
  certification: toEducationTimeline(experienceTrainingFallback.certification),
};
