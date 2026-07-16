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
            "Designed and developed enterprise analytics platforms that enabled business intelligence teams and data scientists to explore, query, and visualize analytics data for Disney Interactive's mobile games. I also developed a centralized data access platform that unified multiple data warehouses—including Vertica and Google BigQuery—making enterprise data more accessible through reusable queries and a streamlined user experience.",
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
            "Developed data APIs for GNET, a customer-facing WebGL platform that visualized global Internet traffic across Akamai’s distributed content delivery network. The applications helped CDN customers explore traffic patterns related to content delivery, streaming media, web security, and static asset distribution through interactive 3D visualizations.",
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
            "Designed and developed backend services supporting the acquisition, transcoding, and publication of video content for TV.com. Built Java APIs, workflow automation services, and content management tools that streamlined media publishing and integrated external video providers into CBS's digital media platform.",
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
            "Designed and developed production workflow systems supporting the creation of stereoscopic imagery for feature film productions. Built engineering tools for media processing, texture management, rendering workflows, and high-performance computing infrastructure that helped automate complex digital production pipelines.",
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
            "Supported the digital production of the feature film Valkyrie by ensuring the quality and reliability of visual effects workflows. Responsibilities included image quality assurance, media processing and format conversions, render queue monitoring, and production reporting, helping maintain the efficiency and integrity of large-scale digital production pipelines.",
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
            "Architected and developed a digital learning platform and multimedia framework for one of Harvard University's pioneering distance education initiatives. The platform integrated digital video, streaming media, and multimedia publishing technologies, enabling the program to grow from a single computer science course to more than 30 online courses across multiple academic disciplines.",
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
