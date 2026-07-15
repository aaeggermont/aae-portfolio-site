/**
 * Experience, Education & Formal Training — serializable content.
 * Seeded to Firestore at `about_page/experience_training`.
 * Logo StaticImageData lives in `experience-training-logos.ts` (app-only).
 */

export type ExperienceLogoKey =
  | "disney"
  | "akamai"
  | "cbs"
  | "sony"
  | "harvard"
  | "uw"
  | "emerson"
  | "mit";

export type ExperiencePositionData = {
  year?: string;
  location: string;
  position: string;
  /** Blank-line separates paragraphs in the UI. */
  details: string;
};

export type ExperienceEntryData = {
  logoKey: ExperienceLogoKey;
  companyName: string;
  year?: string;
  positions: ExperiencePositionData[];
};

export type EducationEntryData = {
  logoKey: ExperienceLogoKey;
  year: string;
  degree: string;
  location: string;
  school: string;
  /** Blank-line separates paragraphs in the UI. */
  details: string;
};

export type ExperienceTrainingData = {
  version: number;
  sectionTitle: string;
  experience: ExperienceEntryData[];
  education: EducationEntryData[];
  certification: EducationEntryData[];
};

export const experienceTrainingFallback: ExperienceTrainingData = {
  version: 1,
  sectionTitle: "Experience, Education & Formal Training",
  experience: [
    {
      logoKey: "disney",
      companyName: "The Walt Disney Company",
      positions: [
        {
          year: "2017 - Present",
          position: "Lead Engineer",
          location: "Seattle, WA",
          details: `As a Lead Software Engineer, I design and develop intelligent enterprise applications that support park operations, revenue management, and guest experiences. My work spans UX engineering, front-end architecture, human-centered design, and AI-powered technologies, helping transform complex operational workflows into intuitive products that improve business decision-making.

I collaborate with multidisciplinary teams throughout the entire product lifecycle—from research and interaction design to software development and production deployment—bridging business goals, user needs, and technical implementation to deliver scalable enterprise solutions.`,
        },
        {
          year: "2013 - 2017",
          position: "Senior Software Engineer",
          location: "Palo Alto, CA",
          details:
            "Developed Web applications in content management systems and data access systems, tools for data exploration, data visualizations, backend services, and proof of concepts to define requirements for data driven workflows.",
        },
      ],
    },
    {
      logoKey: "akamai",
      companyName: "Akamai Technologies",
      year: "2013 - 2013",
      positions: [
        {
          position: "Senior Applications Developer",
          location: "Boston, MA",
          details:
            "Developed web applications and an API for the support of the GNET project which visualizes global traffic patterns among Akamai customers. The GNET project provides with a suite of 3D interactive visualization applications in WebGL to visualize Internet traffic patterns for content delivery, streaming media, firewall web applications, and static media assets storage on Akamai distributed network",
        },
      ],
    },
    {
      logoKey: "cbs",
      companyName: "CBS Corporation",
      positions: [
        {
          year: "2011 - 2012",
          position: "Staff Engineer",
          location: "San Francisco, CA",
          details:
            "Architecting and implementing workflows for the acquisition, encoding, transcoding, and publishing of video content and metadata from external partners to public sites and CBS video players. Workflow components included a Java API to interface with a external video publisher (thePlatform/MPX ), job schedulers, and a content management system.",
        },
      ],
    },
    {
      logoKey: "disney",
      companyName: "The Walt Disney Company",
      positions: [
        {
          year: "2008 - 2010",
          position: "Technical Director",
          location: "San Francisco, CA",
          details:
            "Developed and engineered media file based workflows for the production of stereoscopic imagery. Projects involved developing applications APIs to extend and implement features for 3D animation, bitmap manipulation, encoding of media and integration of queuing systems and management controls of high-performance server enclosures for the rendering of stereoscopic imagery.",
        },
      ],
    },
    {
      logoKey: "sony",
      companyName: "Sony Pictures Imageworks",
      positions: [
        {
          year: "2008 - 2008",
          position: "Production Services Techician",
          location: "Los Angeles, CA",
          details:
            "Assisted in the technical aspects for the production of the motion picture “Valkyrie”, directed by Bryan Singer. Main projects and activities included visual quality assurance on all outputs before they go to film and prepared daily reports for reviews, processing image conversions from all supported formats at Sony Imageworks for testing and pre-visualization of shots, and monitoring, troubleshooting and verification for the completion of renders in the rendering queue.",
        },
      ],
    },
    {
      logoKey: "harvard",
      companyName: "Harvard University",
      positions: [
        {
          year: "1999 - 2006",
          position: "Software Engineer",
          location: "Cambridge, MA",
          details:
            "Development and integration of an innovative system architecture for the production of digital video and multimedia content for the first distance education project at Harvard University. The project gained national acclaim in the fields of digital video technology, distance education and streaming media",
        },
      ],
    },
  ],
  education: [
    {
      year: "2022",
      degree: "MS - Human Centered Design",
      logoKey: "uw",
      location: "Seattle, WA",
      school: "UNIVERSITY OF WASHINGTOWN",
      details:
        "Research and course work includes Human Centered Design, Design Thinking, User Interaction Design and Prototyping, Visual Communication, VR/AR prototyping, Usability Studies, Digital Fabrication, IoT and Physical Computing, Information Design, Design and Management of Complex Systems.",
    },
    {
      year: "2019",
      degree: "GRADUATE CERTIFICATE -  User Centered Design",
      logoKey: "uw",
      location: "Seattle, WA",
      school: "UNIVERSITY OF WASHINGTOWN",
      details:
        "Research and course work includes Human Centered Design, Design Thinking, User Interaction Design and Prototyping, Visual Communication, VR/AR prototyping, Usability Studies, Digital Fabrication, IoT and Physical Computing, Information Design, Design and Management of Complex Systems.",
    },
    {
      year: "2007",
      degree: "MA - Media Arts",
      logoKey: "emerson",
      location: "Boston, MA",
      school: "EMERSON COLLEGE",
      details:
        "My course work included television studio production, graduate film production, computer animation using Maya, digital compositing, research methods in media arts, and traditional cinematography.",
    },
    {
      year: "2003",
      degree: "GRADUATE CERTIFICATE APPLIED SCIENCES",
      logoKey: "harvard",
      location: "Cambridge, MA",
      school: "HARVARD UNIVERSITY",
      details:
        "My course work included introduction to computer science using C and C++, data structures and algorithms, communication systems and technology, Web programming in Perl, Unix systems programming, Java for distributed systems, communication protocols and Internet architectures, and the study of computer network systems and the development of multimedia applications over high speed networking systems.",
    },
  ],
  certification: [
    {
      year: "2025",
      degree: "Designing and Building AI Products and Services",
      logoKey: "mit",
      location: "Cambridge, Massachusetts - on-line",
      school: "MIT xPro",
      details:
        "Study of the design principles and applications of different artificial intelligence (AI) technologies across different industries. Topics included the four stages of AI product design, study of different machine learning algorithms, applying machine learning methods to practical problems, design of intelligent human-machine interfaces, analysis of technical and operational requirements to build AI models, and the Lawler Model for defining an AI problem and identify hey steps to build an organization case.",
    },
    {
      year: "2025",
      degree: "Designing and Building AR Applications",
      logoKey: "mit",
      location: "Cambridge, Massachusetts - on-line",
      school: "MIT xPro",
      details:
        "Study of the design principles and applications of different artificial intelligence (AI) technologies across different industries. Topics included the four stages of AI product design, study of different machine learning algorithms, applying machine learning methods to practical problems, design of intelligent human-machine interfaces, analysis of technical and operational requirements to build AI models, and the Lawler Model for defining an AI problem and identify hey steps to build an organization case.",
    },
    {
      year: "2019",
      degree: "Graduate Certificate - User Centered Design",
      logoKey: "uw",
      location: "Seattle, Washington",
      school: "University of Washington",
      details:
        "My course work included television studio production, graduate film production, computer animation using Maya, digital compositing, research methods in media arts, and traditional cinematography.",
    },
  ],
};
