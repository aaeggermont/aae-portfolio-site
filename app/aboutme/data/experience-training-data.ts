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
      degree: "Master of Science — Human Centered Design & Engineering",
      logoKey: "uw",
      location: "Seattle, WA",
      school: "University of Washington",
      details: `Graduate studies focused on human-centered design, user research, interaction design, information visualization, accessibility, and emerging technologies including virtual and augmented reality. Through interdisciplinary research and project-based learning, I developed a design approach that combines systems thinking, human-centered research, and rapid prototyping to create intuitive solutions for complex technical and organizational challenges.

Notable research projects included AR Magic Tours, an augmented reality experience exploring immersive storytelling within theme parks, and a capstone research project investigating how speculative design can foster trust, reflection, and cross-disciplinary collaboration in scientific research.`,
    },
    {
      year: "2007",
      degree: "Master of Arts — Media Arts",
      logoKey: "emerson",
      location: "Boston, MA",
      school: "Emerson College",
      details: `Graduate studies explored the intersection of storytelling, visual communication, film production, computer animation, and digital media technologies. Through hands-on production and interdisciplinary collaboration, I developed a strong foundation in creating engaging visual experiences that combine technical execution with narrative design.

My master's project involved producing an original narrative film that integrated live-action cinematography with computer-generated imagery (CGI) and traditional animation, providing early experience in designing interactive and multimedia experiences across multiple creative disciplines.`,
    },
    {
      year: "2003",
      degree: "Graduate Certificate — Applied Sciences",
      logoKey: "harvard",
      location: "Cambridge, MA",
      school: "Harvard University",
      details: `Graduate studies established a strong foundation in computer science, software engineering, distributed systems, networking, and multimedia technologies. Coursework emphasized software architecture, algorithms, communication protocols, and the design of scalable applications running across networked environments.

The program strengthened my ability to bridge software engineering with digital media, providing the technical foundation that would later support my work building enterprise platforms, interactive applications, and large-scale production systems.`,
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
      degree: "Professional Certificate — Virtual Reality and Augmented Reality",
      logoKey: "mit",
      location: "Cambridge, Massachusetts - on-line",
      school: "MIT xPRO",
      details: `Professional studies focused on the design, development, and evaluation of extended reality (XR) experiences, including augmented reality (AR), virtual reality (VR), and mixed reality (MR). The program explored human-centered XR design principles, immersive interaction techniques, spatial computing, and the technical foundations required to conceive, prototype, and communicate end-to-end XR solutions.

The knowledge and methodologies developed through the program directly informed the AR Magic Tours research project, where immersive storytelling, contextual interactions, and augmented reality were explored to transform attraction wait times into engaging guest experiences.`,
    },
  ],
};
