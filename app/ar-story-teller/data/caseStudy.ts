import SectionImgTowerOfTerrorDesktop from "../Images/SectionImgTowerOfTerror-Desktop.png";
import SectionImgTowerOfTerrorLgMd from "../Images/SectionImgTowerOfTerror-LgMd.png";
import SectionImgTowerOfTerrorSmSx from "../Images/SectionImgTowerOfTerror-SmSx.png";
import HollywoodTowerofTerrorARImgDesktop from "../Images/HollywoodTowerofTerrorARImg-Desktop.png";
import HollywoodTowerofTerrorARImgLgMd from "../Images/HollywoodTowerofTerrorARImg-MdLg.png";
import HollywoodTowerofTerrorARImgSmSx from "../Images/HollywoodTowerofTerrorARImg-SmSx.png";
import NotificationsMapDesktop from "../Images/NotificationsMap-Desktop.png";
import NotificationsMapMdLg from "../Images/NotificationsMap-MdLg.png";
import NotificationsIllustration1SmSx from "../Images/NotificationsIllustration1-SmSx.png";
import NotificationsIllustration2SmSx from "../Images/NotificationsIllustration2-SmSx.png";
import NotificationsIllustration3SmSx from "../Images/NotificationsIllustration3-SmSx.png";
import SampleNotificationsMdLg from "../Images/SampleNotifications-MdLg.svg";
import SampleNotificationsIllustrationMdLg from "../Images/SampleNotificationsIllustration-MdLg.svg";
import SampleNotificationsIllustrationDesktop from "../Images/SampleNotificationsIllustrationDesktop.png";
import LearningAbouttheAttractionDesktop from "../Images/LearningAbouttheAttraction-Desktop.png";
import LearningAbouttheAttractionMdLg from "../Images/LearningAbouttheAttraction-MdLg.png";
import LearningAbouttheAttractionSmSx from "../Images/LearningAbouttheAttraction-Desktop.png";
import TakingSelfieDesktop from "../Images/TakingSelfie-Desktop.png";
import TakingSelfieMdLg from "../Images/TakingSelfie-MdLg.png";
import TakingSelfieSmSx from "../Images/TakingSelfie-Desktop.png";
import CollectingArtifactsDesktop from "../Images/CollectingArtifacts-Desktop.png";
import CollectingArtifactsMdLg from "../Images/CollectingArtifacts-MdLg.png";
import CollectingArtifactsSmSx from "../Images/CollectingArtifacts-Desktop.png";
import NearbyAttractionsDesktop from "../Images/NearbyAttractions-Desktop.png";
import NearbyAttractionsMdLg from "../Images/NearbyAttractions-MdLg.png";
import NearbyAttractionsSmSx from "../Images/NearbyAttractions-SmSx.png";
import LayoutStatesDesktop from "../Images/LayoutStates-Desktop.png";
import LayoutStatesMdLg from "../Images/LayoutStates-MdLg.png";
import LayoutStatesSmSx from "../Images/LayoutStates-SmSx.png";
import BulletPoint from "../Images/BulletPoint.svg";
import HCDXRProcessDesktop from "../Images/HCDXRProcess-Desktop.png";
import HCDXRProcessMdLg from "../Images/HCDXRProcess-MdLg.png";
import HCDXRProcessSmSx from "../Images/HCDXRProcess-SmSx.png";
import UserResearchJourneyDesktop from "../Images/UserResearchJourney-Desktop.png";
import UserResearchJourneyMdLg from "../Images/UserResearchJourney-MdLg.png";
import UserResearchJourneySmSx from "../Images/UserResearchJourney-SmSx.png";
import PersonasAndMotivesDesktop from "../Images/PersonasAndMotives-Desktop.png";
import PersonasAndMotivesMdLg from "../Images/PersonasAndMotives-MdLg.png";
import PersonasAndMotivesSmSx from "../Images/PersonasAndMotives-SmSx.png";
import UserInteractionModeSpecsDesktop from "../Images/UserInteractionModeSpecs-Desktop.png";
import MockupsAndSpecsDesktop from "../Images/MockupsAndSpecs-Desktop.png";
import MockupsAndSpecsMdLg from "../Images/MockupsAndSpecs-MdLg.png";
import MockupsAndSpecs2SmSx from "../Images/MockupsAndSpecs2-SmSx.png";
import PanoramaGridViewMockupSpecsDesktop from "../Images/PanoramaGridViewMockupSpecs-Desktop.png";
import PanoramaGridViewMockupSpecsMdLg from "../Images/PanoramaGridViewMockupSpecs-MdLg.png";
import PanoramaGridViewMockupSpecsSmSx from "../Images/PanoramaGridViewMockupSpecs-SmSx.png";
import StoryTellerWireFlowDesktop from "../Images/StoryTellerWireFlow-Desktop.png";
import StoryTellerWireFlowMdLg from "../Images/StoryTellerWireFlow-MdLg.png";
import StoryTellerWireFlowSmSx from "../Images/StoryTellerWireFlow-Desktop.png";
import DesignThinkingDesktop from "../Images/DesignThinking-Desktop.png";
import DesignThinkingMdLg from "../Images/DesignThinking-MdLg.png";
import DesignThinkingSmSx from "../Images/DesignThinking-SmSx.png";
import TrainingImages from "../Images/TrainingImages.png";
import SketchingInteractionDesignDesktop from "../Images/SketchingInteractionDesign-Desktop.png";
import HFMockupSample1Desktop from "../Images/HFMockupSample1-Desktop.png";
import HFMockupSample2Desktop from "../Images/HFMockupSample2-Desktop.png";
import HFMockupSample3Desktop from "../Images/HFMockupSample3-Desktop.png";
import HFMockupSample4Desktop from "../Images/HFMockupSample4-Desktop.png";
import HFMockupSample5Desktop from "../Images/HFMockupSample5-Desktop.png";
import HFMockupSample6Desktop from "../Images/HFMockupSample6-Desktop.png";
import ContextInquirySectionImage from "../Images/ContextInquirySectionImage.png";
import GenericUserFlow from "../Images/StoryTeller-GenericUser-Desktop.svg";

import { StaticImageData } from "next/image";

// ─── Shared types ────────────────────────────────────────────────────────────

interface BulletPointItem {
  icon: StaticImageData;
  text: string;
}

interface ImageGroup {
  images: StaticImageData[];
  alt: string;
}

interface VideoItem {
  title: string;
  width: string;
  height: string;
  description: string;
  srcVideo: string;
}

interface PrototypeVideos {
  title: string;
  paragraphs: string[];
  videos: VideoItem[];
}

// ─── caseStudy sub-types ─────────────────────────────────────────────────────

interface CaseStudyOverview {
  title: string;
  paragraphs: string[];
}

interface OverviewImagesDesc {
  paragraphs: string[];
}

interface LearningAboutAttrac {
  title: string;
  paragraphs: string[];
}

interface NotificationsAttrac {
  title: string;
  images: StaticImageData[];
  description: string;
  paragraphs: string[];
  sampleNotifications1SmSX: ImageGroup;
  sampleNotifications2SmSX: ImageGroup;
  sampleNotifications3SmSX: ImageGroup;
  sampleNotificationsMdLg: ImageGroup;
  sampleNotificationsDesktop: ImageGroup;
}

interface MagicExperience {
  title: string;
  alt: string;
  description: string;
  images: StaticImageData[];
}

interface MagicExperiences {
  title: string;
  paragraphs: string[];
  experiences: MagicExperience[];
}

interface LearningAboutAttrc {
  title: string;
  alt: string;
  paragraphs: string[];
  images: StaticImageData[];
}

interface ResearchMethod {
  title: string;
  sectionImages?: StaticImageData[];
  paragraphs?: string[];
  bulletpoints?: BulletPointItem[];
  alt?: string;
  images?: StaticImageData[];
}

interface UserResearchJourney {
  title: string;
  paragraphs: string[];
  alt: string;
  imagesDescription: string;
  images: StaticImageData[];
  methods: ResearchMethod[];
}

interface SpecMethod {
  title: string;
  bulletpoints?: BulletPointItem[];
  paragraphs?: string[];
  alt?: string;
  images?: StaticImageData[];
  description?: string;
}

interface DevelopingSpecs {
  title: string;
  paragraphs: string[];
  methods: SpecMethod[];
}

interface Storyboarding {
  title: string;
  paragraphs: string[];
  galleryTitle: string;
}

interface ScenarioBaseDesign {
  title: string;
  paragraphs: string[];
  storyboarding: Storyboarding;
  images: StaticImageData[];
  alt: string;
}

interface WireframeMethod {
  title: string;
  alt: string;
  paragraphs?: string[];
  description?: string;
  images: StaticImageData[];
}

interface Wireframes {
  title: string;
  alt: string;
  methods: WireframeMethod[];
}

interface SoftwarePrototypes {
  title: string;
  paragraphs: string[];
  prototypeVideos: PrototypeVideos;
}

interface MockupItem {
  images: StaticImageData[];
  width: string;
  alt: string;
  imageDesc: string;
}

interface SampleMockups {
  title: string;
  paragraphs: string[];
  mockup1: MockupItem;
  mockup2: MockupItem;
  mockup3: MockupItem;
  mockup4: MockupItem;
  mockup5: MockupItem;
  mockup6: MockupItem;
}

interface DesignFunnels {
  title: string;
  paragraphs: string[];
  alt: string;
  imagesDesc: string;
  images: StaticImageData[];
}

interface DesignThinking {
  title: string;
  paragraphs: string[];
  alt: string;
  imageDescriptino: string;
  images: StaticImageData[];
  designFunnels: DesignFunnels;
  prototypeVideos: PrototypeVideos;
  sampleMockups: SampleMockups;
}

interface TheProcess {
  title: string;
  bulletpoints: BulletPointItem[];
}

interface DataAnalysis {
  title: string;
  bulletpoints: BulletPointItem[];
}

interface UsabilityTesting {
  title: string;
  paragraphs: string[];
  theProcess: TheProcess;
  dataAnalysis: DataAnalysis;
}

interface GenericTaskFlow {
  title: string;
  alt: string;
  paragraphs: string[];
  images: StaticImageData[];
  description: string;
}

interface ScalablePlatform {
  title: string;
  imageDesc: string;
  paragraphs: string[];
  alt: string;
  images: StaticImageData[];
  genericTaskFlow: GenericTaskFlow;
}

interface DesignSystem {
  title: string;
  paragraphs: string[];
  alt: string;
  images: StaticImageData[];
  description: string;
  userResearchJourney: UserResearchJourney;
  developingSpecs: DevelopingSpecs;
  scenarioBaseDesign: ScenarioBaseDesign;
  wireframes: Wireframes;
  softwarePrototypes: SoftwarePrototypes;
  designThinking: DesignThinking;
  usabilityTesting: UsabilityTesting;
  scalablePlatform: ScalablePlatform;
}

interface CaseStudy {
  caseStudySectionImages: StaticImageData[];
  overview: CaseStudyOverview;
  overviewImages: StaticImageData[];
  overviewImagesAlt: string;
  overviewImagesDesc: OverviewImagesDesc;
  learningAboutAttrac: LearningAboutAttrac;
  notificationsAttrac: NotificationsAttrac;
  magicExperiences: MagicExperiences;
  learningAboutAttrc: LearningAboutAttrc;
  designSystem: DesignSystem;
}

// ─── Data ────────────────────────────────────────────────────────────────────

const caseStudy: CaseStudy = {
  caseStudySectionImages: [
    SectionImgTowerOfTerrorDesktop,
    SectionImgTowerOfTerrorLgMd,
    SectionImgTowerOfTerrorSmSx,
  ],
  overview: {
    title: "The Hollywood Tower of Terror Case Study",
    paragraphs: [
      "The tower of terror is an attraction based on the Twilight Zone television series aired from 1959 to 1964. It is a major attraction at most Disney theme parks and due to its popularity waiting lines could last for up to 130 minutes.  Due to long waiting times, this attraction was chosen as a case study to develop the augmented reality Magic Tours prototype.  ",
      "The A.R. Magic Tour is a narrative first approach experience that can be used by Guests waiting inline to get more specifics about the story of Tower of Terror. Augmented Reality content is used to embody in the environment elements from the ride and the story behind the attraction for guests to interact with and take selfies.",
    ],
  },
  overviewImages: [
    HollywoodTowerofTerrorARImgDesktop,
    HollywoodTowerofTerrorARImgLgMd,
    HollywoodTowerofTerrorARImgSmSx,
  ],
  overviewImagesAlt: "Guest viewing Tower of Terror Overview while walking by.",
  overviewImagesDesc: {
    paragraphs: [
      "The primary focus of the A.R. experience is a narrative first approach, where guests learn about the attraction as they approach Tower of Terror and wait in line. While they wait inline, guests can get more facts about the attraction and learn some of the history and behind the scenes design concepts.",
    ],
  },
  learningAboutAttrac: {
    title: "Learning about the Attraction",
    paragraphs: [
      "The theme of Tower of Terror is escalating horror. The whole thing should start lightly, and then draw the guest into the tension and fear that pervade the attraction. They should feel that mounting fear throughout the entire experience. SMS notifications with story snapshots and cues are randomly sent to enhance the fear experience and also to educate guests about the attraction.",
    ],
  },
  notificationsAttrac: {
    title: "Sample Notifications",
    images: [NotificationsMapDesktop, SampleNotificationsMdLg, NotificationsMapMdLg],
    description:
      "Beacon sensors are positioned along the waiting queue area to send notifications for A.R. content to near by guests waiting in line.",
    paragraphs: [
      "The following are sample notifications that are sent once the guest has entered the waiting queue area.",
    ],
    sampleNotifications1SmSX: {
      images: [
        NotificationsIllustration1SmSx,
        NotificationsIllustration1SmSx,
        NotificationsIllustration1SmSx,
      ],
      alt: "Sample Notification",
    },
    sampleNotifications2SmSX: {
      images: [
        NotificationsIllustration2SmSx,
        NotificationsIllustration2SmSx,
        NotificationsIllustration2SmSx,
      ],
      alt: "Sample Notification",
    },
    sampleNotifications3SmSX: {
      images: [
        NotificationsIllustration3SmSx,
        NotificationsIllustration3SmSx,
        NotificationsIllustration3SmSx,
      ],
      alt: "Sample Notification",
    },
    sampleNotificationsMdLg: {
      images: [
        SampleNotificationsIllustrationMdLg,
        SampleNotificationsIllustrationMdLg,
        SampleNotificationsIllustrationMdLg,
      ],
      alt: "Sample Notification",
    },
    sampleNotificationsDesktop: {
      images: [SampleNotificationsIllustrationDesktop],
      alt: "Sample Notification",
    },
  },
  magicExperiences: {
    title: "Magic Experiences Using Augmented Reality",
    paragraphs: [
      "Four experiences were designed and developed to discover near by attractions with A.R. content available, using A.R. to discover and learn facts about an attraction, taking selfies to share with family and friends, and collecting found artifacts. ",
    ],
    experiences: [
      {
        title: "Discovering Facts about the Attraction",
        alt: "Discovering Facts about the Attraction",
        description:
          "Guests can use their phone\u2019s camera to scan the attraction facility\u2019s environment to discover  facts about the story. A notification can trigger the guest to open the app to scan the environment.",
        images: [
          LearningAbouttheAttractionDesktop,
          LearningAbouttheAttractionMdLg,
          LearningAbouttheAttractionSmSx,
        ],
      },
      {
        title: "Taking a Selfie",
        alt: "Taking a Selfie",
        description:
          "Once A.R. content is discovered, selfies can be taken and shared as memories in social networks.",
        images: [TakingSelfieDesktop, TakingSelfieMdLg, TakingSelfieSmSx],
      },
      {
        title: "Collecting Artifacts",
        alt: "Collecting Artifacts",
        description:
          "Discovered artifacts about the attraction\u2019s story can be collected. These artifacts can be retrieved and shared with other guests, or viewed as memories after visiting the park. ",
        images: [CollectingArtifactsDesktop, CollectingArtifactsMdLg, CollectingArtifactsSmSx],
      },
      {
        title: "Nearby Attractions",
        alt: "Nearby Attractions",
        description:
          "The initial screen lists nearby attractions with augmented reality content is available.",
        images: [NearbyAttractionsDesktop, NearbyAttractionsMdLg, NearbyAttractionsSmSx],
      },
    ],
  },
  learningAboutAttrc: {
    title: "Learning About the Attraction",
    alt: "Learning About the Attraction",
    paragraphs: [
      "Guests can learn about the attraction\u2019s storyline, and the craft and art Disney imagineers employed when designing and building the facility while they wait or before and after they visit the attraction. ",
      "The app provides with a section using parallax layout static media combinations to visualize the storyline and more information about the attraction.",
    ],
    images: [LayoutStatesDesktop, LayoutStatesMdLg, LayoutStatesSmSx],
  },
  designSystem: {
    title: "Design System",
    paragraphs: [
      "Since the early inception of the project, the engineering team had  envisioned the use augmented reality as a tool for story telling.  However, we wanted to embrace a Human-Centered Design Process (HCD)  approach to explore  extended reality (XR) solutions as they would fit it into users\u2019s needs first.",
      "XR is an umbrella term that covers Virtual Reality(VR), Augmented Reality (AR) and Mixed Reality (MR).    The HCD process was employed to clarify and empathize with user\u2019s needs employing user research methods,  ideation for developing specifications to define a context scenario-based design, sketching and story boarding the context scenarios, developing wireframes,  and implementing a functional software prototype for usability evaluation.",
    ],
    alt: "Human Centered Design Framework for XR",
    images: [HCDXRProcessDesktop, HCDXRProcessMdLg, HCDXRProcessSmSx],
    description:
      "Human Centered Design Process for XR Design (based on MIT Digital Media & Artificial Intelligence laboratories)",
    userResearchJourney: {
      title: "1. Building on User Needs",
      paragraphs: [
        "Several user research methods were employed to define user values and needs in order to drive the A.R. design experience and development process.",
      ],
      alt: "Round map journey of employed research methods",
      imagesDescription: "Employed User Research Methods",
      images: [UserResearchJourneyDesktop, UserResearchJourneyMdLg, UserResearchJourneySmSx],
      methods: [
        {
          title: "Context Inquiry Interviews",
          sectionImages: [
            ContextInquirySectionImage,
            ContextInquirySectionImage,
            ContextInquirySectionImage,
          ],
          paragraphs: [
            "Context inquiries in the form of open-ended interviews were conducted with Cast Members working at Park.  These interviews were conducted mostly with a lead Cast Member who have a high degree of expertise and experience working at the Hollywood Tower of Terror.  The interviews were conducted remotely. These interviews were helpful to understand the protocols to manage the flows of Guests going to the attraction, waiting times. and rules. ",
            "Additionally, these interviews provided documentation about the story behind the attraction\u2019s ride, and the art and craft Disney imagineers employed to design and build the architecture of the facility and the origin of props staged during the ride.",
          ],
        },
        {
          title: "Literature Research",
          paragraphs: [
            "We were able to get substantial literature about the story behind the Hollywood Tower of Terror and  and craft Disney imagineers used during the construction of the facility.  Documentation about the facility came from variety of sources, including Walt Disney World press releases,  documentation produced by Walt Disney Imagineering about set decorations, and the set pieces and real antique artifacts part of the attraction. ",
            "The Twilight Zone tale which is the main theme of the Hollywood Tower of Terror ride was also reviewed. ",
          ],
        },
        {
          title: "Rapid Ethnography",
          paragraphs: [
            "Rapid Ethnography studies were conducted by a member of the development team by observing the dynamics of Guests visiting the Hollywood Tower of Terror attraction during the day. Fotos and videos were taken of people at the waiting queues.",
            "Additionally, video footage collected by Martins Videos  were analyzed. These videos are non commercial, fan made videos available online.  Some of the fan\u2019s videos were shot in 360 while they wait to get into the ride and during the ride, which helped our team understand better the experience of Guests at the facility.",
          ],
        },
        {
          title: "Co-design Workshops",
          paragraphs: [
            "Code Design workshops were conducted with 5 participants. The participants were Cast Members working at the Hollywood Tower of Terror attraction, and fans who visit the park.",
            "These workshops were conducted via zoom using a Miro board with 5 activities. The first of part of the workshop was to get an understanding of how Guests could use the surrounding environment at the Hollywood Tower of Terror as an attraction while they wait in line for the ride. During the second part of the workshop,  we exposed participants to a preliminary digital prototype to brain storm  features in an A.R. Experience.",
          ],
          bulletpoints: [
            {
              icon: BulletPoint,
              text: 'Guests usually think \u201cI know nothings about the rides.\u201d Usually after the rides, they usually don\'t have a clear idea of the story behind it.',
            },
            {
              icon: BulletPoint,
              text: 'Guests would prefer a digital version for the attractions overview: \u201cThe ride experiences use paper handouts or blogs to learn about it, I wish there was a digital version.\u201d',
            },
            {
              icon: BulletPoint,
              text: 'So much time is spent waiting in line: \u201cI am waiting for my next ride and am unsure of what to do while I wait.\u201d',
            },
            {
              icon: BulletPoint,
              text: '\u201cI don\u2019t  understand what the the ride experiences are really about sometimes while in the ride.\u201d',
            },
            {
              icon: BulletPoint,
              text: "Getting some type of notifications while I get on line as a cue to use my phone\u2019s camera to scan the environment and get visuals about the ride\u2019s story.",
            },
            {
              icon: BulletPoint,
              text: "Having the ability to take selfies with A.R. content overlays to share with friends and collect memories. ",
            },
          ],
        },
        {
          title: "Affinity Diagrams",
          paragraphs: [
            "The data collected from context inquiry interviews and co-design workshops was sorted into an affinity diagram. This process helped to pull our themes from our research. Four themes emerged from our analysis: ",
          ],
          bulletpoints: [
            { icon: BulletPoint, text: "Cast Members and Guest familiarity with A.R. experiences." },
            {
              icon: BulletPoint,
              text: "How A. R. could be used in extended wait times when guests are in line to take a ride.",
            },
            {
              icon: BulletPoint,
              text: "Marketing efforts and challenges to incept A.R. experiences in theme parks.",
            },
            { icon: BulletPoint, text: "Employing A.R. technology as a tool for story telling." },
          ],
        },
        {
          title: "Personas & Motives",
          alt: "Personas & Motives",
          paragraphs: [
            "Based on user research key insights from user research and development introspections, the following Personas and Motives relation was defined:",
          ],
          images: [PersonasAndMotivesDesktop, PersonasAndMotivesMdLg, PersonasAndMotivesSmSx],
        },
      ],
    },
    developingSpecs: {
      title: "2. Developing Specifications",
      paragraphs: [
        'A subjective organization schema also known as \u201cAmbiguous Organization Schema\u201d  was employed  to define features, user interactions, and interaction design principles based on our user research findings. ',
        "The subjective organization schema categorization helps facilitate learning about a story behind a ride  by helping Guests understand and draw connections between pieces of content in a storyline.    The following is a list of identified features and specifications:",
      ],
      methods: [
        {
          title: "Features and Specifications",
          bulletpoints: [
            {
              icon: BulletPoint,
              text: "A.R. Interactions should be short-lived, less than 15 seconds while waiting in line to do a ride.",
            },
            {
              icon: BulletPoint,
              text: "When doing artifacts detection in A.R.,  the digital content elements should remain anchored to the physical space as A.R overlays for users to continue exploring during 15 seconds. ",
            },
            {
              icon: BulletPoint,
              text: "Discovered A.R. content overlays are lock into the smart phone screen for guests to explore them and use them to take selfies in their own time.",
            },
            {
              icon: BulletPoint,
              text: "Selfie photos taken with A.R. overlays can be shared via social networks.",
            },
            {
              icon: BulletPoint,
              text: "Discovered digital artifacts can be collected and shared with other guests. They remind available  they can be viewed as memories after visiting the park. ",
            },
            {
              icon: BulletPoint,
              text: "Notifications are sent to Guests\u2019 smart phones while they wait in line for a ride or attraction. These notifications can be cues to warn Guests about A.R. content nearby to be discovered.",
            },
            {
              icon: BulletPoint,
              text: "Notifications are randomly sent to enhance the fear experience and also to educate guests about the attraction with cues and pieces of the attraction\u2019s story line.",
            },
            {
              icon: BulletPoint,
              text: "All interactions at the park should be non-blocking using translucent backgrounds on screen to avoid slowing down the flow of people walking throughout the attraction.",
            },
          ],
        },
        {
          title: "User Interaction  Mode Specifications",
          paragraphs: [
            "When a guest is standing still or in a set in place position, they can use the camera of their mobile AR device (phone or tablet) to point & click on the Tower of Terror attraction and get overlaid visual blended with the environment to explore and learn about the attraction in a non-linear and explorative way. The field of view ranges between 25 to 50 degrees.",
          ],
          alt: "User Interaction  Mode Specifications",
          images: [
            UserInteractionModeSpecsDesktop,
            UserInteractionModeSpecsDesktop,
            UserInteractionModeSpecsDesktop,
          ],
          description:
            "User interaction model with grounded interaction with a blended physical environment of digital content overlays.",
        },
      ],
    },
    scenarioBaseDesign: {
      title: "3. Scenario Based Design",
      paragraphs: [
        "Storyboards and sketches were used as graphical representations of how the different  activities and features would unfold in the A.R. Magic Tours experience.",
        "The main goal of the experience is to make the environment an attraction itself while Guests wait in line. The story line of the attraction is broken down in small pieces and told with A.R and text SMS notifications; by approximating, guests can draw connections between these pieces of the story and make them memorable.",
      ],
      storyboarding: {
        title: "Story boarding the A.R. Experience",
        paragraphs: [
          "Storyboards were used as graphical representations of how the different task activities would unfold in the A.R. Magic Tours.  The experiences were designed using an ambiguous organization scheme. ",
          "The story line of the attraction is broken down in small pieces with supported A.R: content; by approximating, guests can draw connections between these pieces of the story and make it memorable.  The content is grouped based on a geographical place which is the attraction\u2019s location. ",
        ],
        galleryTitle:
          "Discovering A.R. Content and Learning about Tower of Terror  Storyboard",
      },
      images: [
        SketchingInteractionDesignDesktop,
        SketchingInteractionDesignDesktop,
        SketchingInteractionDesignDesktop,
      ],
      alt: "Sample sketch exploring an interaction design and a user journey to search and scan  for A.R. content and collectable hidden objects around an attraction. ",
    },
    wireframes: {
      title: "5. Wireframing & Prototyping",
      alt: "Mockups and Specs",
      methods: [
        {
          title: "Wireframes",
          alt: "Mockups and Specs",
          paragraphs: [
            "Wireframes were developed using Figma and were shared with Cast Members and Guests participating in co-design and usability sessions.",
          ],
          description: "Mockup & Specs of Main A.R. Screen for Object Detection.",
          images: [
            MockupsAndSpecsDesktop,
            MockupsAndSpecsMdLg,
            MockupsAndSpecs2SmSx,
            MockupsAndSpecs2SmSx,
          ],
        },
        {
          title: "A.R. Field of View Specs",
          alt: "A.R. Field of View Specs",
          images: [
            PanoramaGridViewMockupSpecsDesktop,
            PanoramaGridViewMockupSpecsMdLg,
            PanoramaGridViewMockupSpecsSmSx,
          ],
        },
        {
          title: "Wire Flow",
          alt: "Wire Flow",
          images: [StoryTellerWireFlowDesktop, StoryTellerWireFlowMdLg, StoryTellerWireFlowSmSx],
          paragraphs: [
            "Sample wireflow that describes the different interactions involved in the A.R. story teller experience. The wire flow journey exemplifies asynchronous notifications sent to Guests while waiting in line for an attraction\u2019s ride to find A.R. content,  captured content arrangement for photo selfies, and visuals and story of the attraction for the Guests to learn more about the story line.",
          ],
        },
      ],
    },
    softwarePrototypes: {
      title: "Software Prototypes",
      paragraphs: [
        "A functional software prototype was developed employing the iOS and ARKit platform. The object detection for A.R. features was implemented using on device Apple\u2019s Core Machine Learning platform.  The underlying Machine Learning model for this the Story Teller app is a convolutional neural network (CNN) called MobileNetV2. CNN is a deep-learning algorithm which can take an image input, break it down into different layers, assign weights and biases to different segments in the image and differentiate from one another.",
        "MobileNetV2 was chosen as it is optimized for mobile devices. The following are recorded screen videos of prototype testing performed in the field.",
      ],
      prototypeVideos: {
        title: "Testing and Evaluating Functional Software Prototypes",
        paragraphs: [
          "Sample video screenshots taken from mobile device with installed functional prototypes developed in iOS ARKit  to search and scan  for A.R. content and collectable hidden objects around an attraction. ",
        ],
        videos: [
          {
            title: "",
            width: "900px",
            height: "1080px",
            description: "",
            srcVideo:
              "https://player.vimeo.com/video/916526451?autoplay=1&loop=1&autopause=0&background=1",
          },
          {
            title: "",
            width: "900px",
            height: "1080px",
            description: "",
            srcVideo:
              "https://player.vimeo.com/video/916775754?autoplay=1&loop=1&autopause=0&background=1",
          },
        ],
      },
    },
    designThinking: {
      title: "Development Using Design Thinking",
      paragraphs: [
        "Our human design centered process provided the team with framework for our design efforts.  framework. Using our collected the research insights and digital prototypes, we then followed  principles of Design Thinking to develop a functional software prototype. ",
        "The user research provided the team with enough background and context to empathize with potential Guests and Cast members and to ideate and test different strategies to adapt A.R. content in to the attraction\u2019s physical environment.",
        "Our second literature research helped the team understand  park operations procedures,  story lines behind the attraction\u2019s ride, and the creative vision of Disney Imagineers used when designing and building the ride.   ",
        "Development  introspection was a fundamental process we used to create functional prototypes incepting A.R. and ML computer vision capabilities.  Developers would examine and experiment with different technologies and platforms to develop a functional mobile app  and train data for ML models based on user research insights and low/high fidelity mockups. ",
      ],
      alt: "Iterative design and development process using Design Thinking",
      imageDescriptino: "Iterative design and development process ",
      images: [DesignThinkingDesktop, DesignThinkingMdLg, DesignThinkingSmSx],
      designFunnels: {
        title: "From Sketching & Ideation to Prototype Testing ",
        paragraphs: [
          "We used interaction sketching and prototyping as a design funnel to keep on track our creative ideation and prototyping efforts.",
          "Our design funnels began with ideation iterations and ended with functional software prototypes for usability testing and evaluation. Our ideation iterations included mood boards and  interaction design sketches to explore user journeys and ideas quickly and cheaply.  More refined high fidelity mockups simulations and functional prototypes provided the ability for testing and evaluation in the field with Cast Members to get feedback. ",
        ],
        alt: "Interaction design and a user journey",
        imagesDesc:
          "Sample sketch exploring an interaction design and a user journey to search and scan  for A.R. content and collectable hidden objects around an attraction. ",
        images: [
          SketchingInteractionDesignDesktop,
          SketchingInteractionDesignDesktop,
          SketchingInteractionDesignDesktop,
        ],
      },
      prototypeVideos: {
        title: "Testing and Evaluating Functional Software Prototypes",
        paragraphs: [
          "Sample video screenshots taken from mobile device with installed functional prototypes developed in iOS ARKit  to search and scan  for A.R. content and collectable hidden objects around an attraction. ",
        ],
        videos: [
          {
            title: "",
            width: "900px",
            height: "1080px",
            description: "",
            srcVideo:
              "https://player.vimeo.com/video/916526451?autoplay=1&loop=1&autopause=0&background=1",
          },
          {
            title: "",
            width: "900px",
            height: "1080px",
            description: "",
            srcVideo:
              "https://player.vimeo.com/video/916775754?autoplay=1&loop=1&autopause=0&background=1",
          },
        ],
      },
      sampleMockups: {
        title: "Sample High Fidelity Mockups",
        paragraphs: [
          "Sample high fidelity mockups  were produced to feature the search and scan for A.R. content and the collectable hidden objects capabilities in the mobile app.  The mockups were design to show case how these features could be visually implemented for the Hollywood Tower of Terror attraction and for other potential attractions. ",
        ],
        mockup1: {
          images: [HFMockupSample1Desktop, HFMockupSample1Desktop, HFMockupSample1Desktop],
          width: "0%",
          alt: "Mobile app initial landing screen. ",
          imageDesc: "Mobile app initial landing screen.",
        },
        mockup2: {
          images: [HFMockupSample2Desktop, HFMockupSample2Desktop, HFMockupSample2Desktop],
          width: "10%",
          alt: "Listing of near by attractions while in the park. ",
          imageDesc:
            "Listing of near by attractions while in the park. The app detects near by attractions with A.R. content available to the Guest\u2019s mobile phone.",
        },
        mockup3: {
          images: [HFMockupSample3Desktop, HFMockupSample3Desktop, HFMockupSample3Desktop],
          width: "100%",
          alt: "Displaying collected artifacts by a Guest. ",
          imageDesc:
            "Screen displaying collected artifacts by a Guest. The app tracks and notifies the number artifacts to yet be collected. ",
        },
        mockup4: {
          images: [HFMockupSample4Desktop, HFMockupSample4Desktop, HFMockupSample4Desktop],
          width: "100%",
          alt: "Displaying visuals of artifacts yet to be collected.",
          imageDesc: "Screen displaying visuals of artifacts yet to be collected.",
        },
        mockup5: {
          images: [HFMockupSample5Desktop, HFMockupSample5Desktop, HFMockupSample5Desktop],
          width: "100%",
          alt: "Searching for A.R. content.",
          imageDesc: "Searching for A.R. content over an icon attraction\u2019s artifact.",
        },
        mockup6: {
          images: [HFMockupSample6Desktop, HFMockupSample6Desktop, HFMockupSample6Desktop],
          width: "100%",
          alt: "Collected and stored artifacts",
          imageDesc: "Successfully collected and stored artifacts screen.",
        },
      },
    },
    usabilityTesting: {
      title: "Usability Evaluation",
      paragraphs: [
        "Usability tests were conducted to test both mockup designs and functional software prototypes. For design prototypes developed in Figma, remote sessions were conducted via Zoom.  Testing was performed using  the concurrent thinking aloud and concurrent probing protocols.",
        "For functional software prototypes, the iOS app was deployed to iPhones for Cast Members to test physically at the Tower of Terror attraction at the Disney World theme park in Orlando, Florida.",
      ],
      theProcess: {
        title: "The Process",
        bulletpoints: [
          {
            icon: BulletPoint,
            text: "For concept design testing, we chose 4 Cast Members with 4 activities during the usability test.",
          },
          {
            icon: BulletPoint,
            text: "Since we were a team of six members, we all covered the usability session with one member moderating and another   taking notes. The rest of the team of mostly software developers were listening in the call and asking questions from time to time.",
          },
          {
            icon: BulletPoint,
            text: "A script was created and the visual activities were posted in a Miro board with the high fidelity mockups designed in Figma.",
          },
          {
            icon: BulletPoint,
            text: "An affinity diagram was employed to sort through all the data collected. We grouped data by which activities it was associated with to synthesize it and agree on insights.",
          },
          {
            icon: BulletPoint,
            text: "For functional prototype testing, we chose one Cast Members with 2 activities during the usability test in the field.",
          },
          {
            icon: BulletPoint,
            text: "Two members of the team were present during the testing in the field. They observed  and took notes as the Cast Member was testing the features for searching  A.R. content and discovering facts about the attraction. ",
          },
        ],
      },
      dataAnalysis: {
        title: "Data Analysis Findings",
        bulletpoints: [
          {
            icon: BulletPoint,
            text: "Almost all participants were familiar with Augmented Reality technologies, but they had not used A.R. before.",
          },
          {
            icon: BulletPoint,
            text: "Cast members were excited with the use of Magic Tours A.R. app for independent virtual tours for guests. The app has potential to be used as a story telling tool for guests to learn about the story behind the attraction\u2019s ride.",
          },
          {
            icon: BulletPoint,
            text: "The app has the potential to distract the guests on extended wait times, especially in special days such as Christmas, and 4th of July when waiting times can last over an hour.",
          },
          {
            icon: BulletPoint,
            text: "Selfies are such a common part of everyday life now a days that this feature suits well the A.R. app experience. The share option makes sense to go straight to major social media apps like Facebook, Instagram, etc which enforces the Disney brand.",
          },
          {
            icon: BulletPoint,
            text: "While waiting in Q areas, scanning and object detection is an effective way  to get facts about the attraction that guests wouldn\u2019t know by taking the ride or just by looking at the exteriors and interiors of the attraction.",
          },
          {
            icon: BulletPoint,
            text: "The immersive experience nature of the app could also be distracting enough to make guests crash into other party of people or objects in the park.",
          },
          {
            icon: BulletPoint,
            text: "The U.I. looks nice, clean and easy to use. The layout is very standard and feels consistent with other non A.R. apps in terms of  features at the bottom of the screen.",
          },
        ],
      },
    },
    scalablePlatform: {
      title: "Making a scalable and extendable platform ",
      imageDesc: "Training the A.R. Model",
      paragraphs: [
        "The grounded interaction with a blended environment is stablished as an interaction pattern that can be used across different attractions and rides in the park.  Machine learning models are published and downloaded on demand with trained data specific to the attraction with enhanced A.R. content for guests to access.",
        "The underlying Machine Learning model for this the Story Teller app is a convolutional neural network (CNN) called MobileNetV2. CNN is a deep-learning algorithm which can take an image input, break it down into different layers, assign weights and biases to different segments in the image and differentiate from one another. MobileNetV2 was chosen as it is optimized for mobile devices. The process of training the model is repeating this step with hundreds of images until we have high precision and recall. The final model output is formatted for each platform - Core ML for Apple and Onnx for Unity. ",
        "Apple\u2019s iOS  and ARKit platform was employed as a front end mobile interface for Guests to access augmented reality content embedded in an attraction. Core ML models were employed for the ARKit component.",
      ],
      alt: "Training the A.R. Model",
      images: [TrainingImages, TrainingImages, TrainingImages],
      genericTaskFlow: {
        title: "Generic User Flow for Different Attractions",
        alt: "Generic User Flow for Different Attractions",
        paragraphs: [],
        images: [GenericUserFlow, GenericUserFlow, GenericUserFlow],
        description:
          "Generic user flow that can be adopted in different attractions.  The goal is to enhance the experience while waiting in line with the use of A.R. content, notifications, and static content about the story behind the ride.",
      },
    },
  },
};

export default caseStudy;
