import type { StandaloneResearchMethodImageData } from "./components/ResearchMethodImageBlock";
import type {
  ReadMoreWordConfig,
  ResearchMethodBlockData,
} from "./researchMethodTypes";

/**
 * Single Firestore-style document for this project page (one collection / one read).
 * The page should read only from `automaticSeaterAssignmentsDataProject`.
 */
export type AutomaticSeaterAssignmentsDataProjectDocument = {
  id: string;
  project: {
    projectId: number;
    projectKey: string;
  };
  gateTitle: string;
  overviewSection: {
    title: string;
    paragraphs: string[];
    background: string;
  };
  mainSolution: {
    title: string;
    /** Plain text; use `\u00a0` for non-breaking spaces where needed. */
    body: string;
  };
  projectOverviewCard: {
    title: string;
    background: string;
    columns: Array<{
      icon: "designServices" | "formatListBulleted" | "category";
      label: string;
      items: string[];
    }>;
  };
  keyBenefitsCard: {
    title: string;
    background: string;
    items: string[];
  };
  imageBanner: {
    projectKey: string;
    objectPath: string;
    alt: string;
    /** Passed to `GatedImage` `sizes` (e.g. `100vw` for full-bleed hero). */
    sizes: string;
    headline: string;
    taglineLine1: string;
    taglineLine2: string;
  };
  previewDemo: {
    projectKey: string;
    objectPath: string;
    alt: string;
    /** Passed to `GatedImage` `sizes` for responsive `srcSet`. */
    sizes: string;
    priority?: boolean;
    fullViewportLoading?: boolean;
  };
  narrative: {
    starToursCaseStudyTitle: string;
    starToursIntroParagraphs: string[];
    starToursIntroReadMore?: ReadMoreWordConfig;
    userResearchLeadInParagraphs: string[];
    userResearchSectionTitle: string;
    userResearchLeadInReadMore?: ReadMoreWordConfig;
  };
  figures: {
    humanCenteredDesignIllustration: StandaloneResearchMethodImageData;
  };
  sections: {
    finalResultsKeyMetrics: {
      id: string;
      title: string;
      contentBlocks: Array<{
        type: "bullets";
        id: string;
        items: string[];
      }>;
    };
    nextSteps: {
      id: string;
      title: string;
      contentBlocks: Array<{
        type: "bullets";
        id: string;
        items: string[];
      }>;
    };
  };
  researchMethods: ResearchMethodBlockData[];
};

export const automaticSeaterAssignmentsDataProject =
  {
    id: "automatic-seater-assignments",
    project: {
      projectId: 4,
      projectKey: "project_4",
    },
    gateTitle: "Automatic Seating Assignments",
    overviewSection: {
      title: "Overview",
      paragraphs: [
        "Disney Theme Parks operate on the principle of serving as many Guests as possible and as quickly as possible. Maintaining high attraction capacity and throughput is essential to getting Guests into the gates and keeping them happy while maximize attractions capacity.",
        "One key aspect of attraction capacity is the seat assignment process. Attractions staff referred as Cast Members need to keep track of how many Guests were in a given row and try to do some mathematical calculations on the fly to squeeze in more parties of Guests. This as a result increases operational complexity as social distance requirements lead to more complicated mathematical and tracking of party sizes, and social distancing seats.",
      ],
      background:
        "linear-gradient(180deg, rgba(30,59,90,1) 0%, rgba(64,126,192,1) 77%)",
    },
    mainSolution: {
      title: "Solution",
      body:
        "A scalable, configuration driven Web mobile app designed to automate the seating assignments for Guests in attractions and rides at\u00a0\u00a0Disney theme parks.",
    },
    projectOverviewCard: {
      title: "Project Overview",
      background:
        "linear-gradient(109deg, rgba(64,126,192,1) 13%, rgba(30,59,90,1) 100%)",
      columns: [
        {
          icon: "designServices",
          label: "My Roles",
          items: ["UX/UI Designer", "Frontend Developer", "User Research"],
        },
        {
          icon: "formatListBulleted",
          label: "Timeline",
          items: ["6 Months"],
        },
        {
          icon: "category",
          label: "Category",
          items: ["Operation automation", "Entertainment"],
        },
      ],
    },
    keyBenefitsCard: {
      title: "Key Benefits",
      background:
        "linear-gradient(109deg, rgba(64,126,192,1) 13%, rgba(30,59,90,1) 100%)",
      items: [
        "Intelligent seating decisions through the use of historic party size distribution.",
        "Potential integration into park´s reservation systems",
        "Increased seating of Guest throughput over manual procedures.",
        "The app can be used as a simulation tool to test seating throughput of different scenarios.",
      ],
    },
    imageBanner: {
      projectKey: "project_4",
      objectPath: "projects/project_4/STBannerDesktop.png",
      alt: "Automatic seating assignments banner",
      sizes: "100vw",
      headline: "Automatic Seating Assignments",
      taglineLine1: "Serving as many Guests as possible",
      taglineLine2: "as quickly as possible",
    },
    previewDemo: {
      projectKey: "project_4",
      objectPath: "projects/project_4/SeaterVideoRecording-Desktop.gif",
      alt: "Automatic seater demo recording",
      sizes:
        "(max-width: 767px) 440px, (max-width: 1023px) 800px, 1034px",
      priority: true,
      fullViewportLoading: false,
    },
    narrative: {
      starToursCaseStudyTitle: "Star Tours Case Study",
      starToursIntroParagraphs: [
        "Star Tours is a motion simulator attraction available at several Disney theme parks, based on the original Star Wards film series created by George Lucas. Set in the Star Wars universe, the attraction sends Guests on a turbulent trip across the galaxy, as droids C-3PO and R2-D2 attempt to safely return a spy to the Rebel Alliance.",
        "The Star Tours attraction was the best fit to test the inception and adoption of the Automatic Seater. This attraction was chosen because of the very high guest attendance with long waiting times and a desire of a seating more than one party per row. The complexity for Cast Member of seating manually at such locations with added social-distancing constraints can be very complex and time consuming.",
        "A Human Centered Design approach was employed during the design, development and implementation phases where Human Computer Interaction(HCI) was a essential methodology during the initial analysis phase.",
      ],
      userResearchLeadInParagraphs: [
        " In order to understand better the pain points and current processes, I first focused on understanding the operation aspects of the facility and current workflows and procedures of Cast Members working at the attraction. I employed the following research methods:",
      ],
      userResearchSectionTitle: "User Research",
      userResearchLeadInReadMore: {
        firstParagraphWords: 10,
        buttonLabel: "Read more",
        readLessButtonLabel: "Read less",
        textColor: "#ffffff",
      },
    },
    figures: {
      humanCenteredDesignIllustration: {
        id: "human-centered-design-illustration",
        title: "A Human Centered Design",
        objectPath: "projects/project_4/Illustration-Human-Centered-Design.png",
        alt: "Human centered design process illustration",
        objectFit: "contain",
        aspectRatio: "16 / 9",
        lightbox: true,
        letterboxBackground: "transparent",
        lightboxModalBackground: "#ffffff",
        annotation: "(Double click on illustration to zoom in and browse)",
      },
    },
    sections: {
      finalResultsKeyMetrics: {
        id: "final-results-key-metrics",
        title: "Final Results & Key Metrics",
        contentBlocks: [
          {
            type: "bullets" as const,
            id: "final-results-bullets",
            items: [
              "Increase in throughout when the app was used by Cast Members, in some cases up to 10%.",
              "Reduced training time for new Cast Members.",
              "Allowed Cast Members to seat Guests filling all cabins.",
              "Reduced congestion at merge point of queue, increasing guest flow.",
              "Ability to simulate different party size scenarios and measure capacity.",
            ],
          },
        ],
      },
      nextSteps: {
        id: "next-steps",
        title: "Next Steps",
        contentBlocks: [
          {
            type: "bullets" as const,
            id: "next-steps-bullets",
            items: [
              "Gamification of the Automatic Seater to increase engagement and motivation of Cast Members.",
              "Roll out to additional attractions such as theater seating",
              "Realtime Analytics and Reporting to allow in the moment data driven business decisions.",
            ],
          },
        ],
      },
    },
    researchMethods: [
  {
    id: "understanding-the-problem",
    kicker: "User Research Methods",
    title: "1. Understanding the Problem",
    background:
      "linear-gradient(109deg, rgba(64,126,192,1) 13%, rgba(30,59,90,1) 100%)",
    textColors: {
      kicker: "#eef305",
      title: "#ffffff",
      introParagraph: "#ffffff",
    },
    introParagraphReadMore: {
      firstParagraphWords: 24,
      buttonLabel: "Read more",
    },
    introParagraphs: [
      "Cast Members need to keep track of how many Guests were in a given row and try to do some simple mathematical calculations on the fly to squeeze in more parties. This manual process results in longer waiting times for Guests and lowers the attractions throughput. We employed the following user research methodologies to better understand the problem:",
    ],
    cards: [
      {
        id: "subject-matter-expert",
        title: "Subject Mater Expert Interviews",
        contentBlocks: [
          {
            type: "bullets",
            id: "sme-bullets",
            items: [
              "In depth conversations with the facility managers to understand the physical activities, and areas of improvement in the flows for the ride.",
              "Discuss integration of algorithms for  automatic seating capabilities to increase attraction’s throughput..",
            ],
          },
        ],
      },
      {
        id: "contextual-inquiries",
        title: "Contextual Inquiries",
        contentBlocks: [
          {
            type: "bullets",
            id: "ci-bullets",
            items: [
              "Conducting interviews with Cast Members to get a robust understanding their interactions with their current tools, processes and their work environment.",
              "Promoting inclusion of their environment of use into our development efforts.",
              "Gathering continues feedback to explore/discover new ideas..",
            ],
          },
        ],
      },
      {
        id: "co-design-workshops",
        title: "Co-Design Workshops",
        contentBlocks: [
          {
            type: "bullets",
            id: "cd-bullets",
            items: [
              "We conducted workshops via zoom calls with cast members, facility managers, and developers to define interaction designs and flows..",
              "We invited Cast Members assigned by their attraction manager to join our the design process..",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "defining-the-problem",
    kicker: "User Research Methods",
    title: "2. Defining & Reframing the Problem",
    background:
      "linear-gradient(109deg, rgba(64,126,192,1) 13%, rgba(30,59,90,1) 100%)",
    textColors: {
      kicker: "#eef305",
      title: "#ffffff",
      introParagraph: "#ffffff",
    },
    introParagraphReadMore: {
      firstParagraphWords: 31,
      buttonLabel: "Read more",
      fontWeight: "600",
      readLessButtonLabel: "Read less",
      textColor: "#ffffff"
    },
    introParagraphs: [
      "Activity theory was employed to understand current operation processes and identify processes that could be optimized and automated. Understanding these underlying processes when Cast Members are interacting with technology and Guests and the idea of paying attention to a goal oriented activity helps understand current manual operation processes and identify processes that could be optimized and automated. The main focus is on meaningful goal oriented activities. This analysis helped with definitions of personas and their roles.",
    ],
    cards: [
      {
        id: "activity-theory",
        title: "Activity Theory Analysis",
        contentBlocks: [
          {
            type: "image",
            id: "activity-theory-illustration",
            objectPath: "projects/project_4/IllustrationActivityTheory.png",
            alt: "Activity Theory Analysis",
            //aspectRatio: "16 / 9",
            sizes: "(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 1000px",
            priority: true,
            fullViewportLoading: true,
            objectFit: "contain",
            lightbox: true,
            annotation: "(Double click on illustration to zoom in and browse)",
            textColors: {
              title: "#ffffff",
              caption: "#cfcccc",
              annotation: "#dbe6f0",
            },
          },
          {
            type: "paragraphs",
            id: "activity-theory-persona-intro",
            textColors: {
              paragraph: "#ffffff",
              emphasis: "#EDD84A",
            },
            readMore: {
              expandTriggerParagraphIndex: 1,
              wordLimitsByParagraphIndex: {
                1: 12,
              },
              buttonLabel: "Read more",
              readLessButtonLabel: "Read less",
              textColor: "#ffffff",
            },
            paragraphs: [
              [
                { text: "Two " },
                { text: "User Personas", style: "emphasis" },
                {
                  text: " were identified in the Activity Theory analysis based on activities, actions at the facility's daily operation:",
                },
              ],
            ],
          },
          {
            type: "userPersonas",
            id: "user-personas-block",
            personas: [
              {
                title: "Grouper",
                description:
                  "An operations cast member helping organize arriving groups of guests at an attraction into parties and assign them to a gate at ride or theater.",
                objectPath: "projects/project_4/Grouper-Persona.png",
                alt: "Grouper persona",
              },
              {
                title: "Gate Agent",
                description:
                  "An operations cast member helping guest grouped into parties find their seats in attraction cabins or theater sections.",
                objectPath: "projects/project_4/Gate-Agent-Persona.png",
                alt: "Gate agent persona",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "ideation-and-initial-prototyping",
    kicker: "User Research Methods",
    title: "3. Ideation & Initial Prototyping",
    background:
      "linear-gradient(109deg, rgba(64,126,192,1) 13%, rgba(30,59,90,1) 100%)",
    textColors: {
      kicker: "#eef305",
      title: "#ffffff",
      introParagraph: "#ffffff",
    },
    introParagraphReadMore: {
      expandTriggerParagraphIndex: 1,
      wordLimitsByParagraphIndex: {
        1: 10
      },
      buttonLabel: "Read more",
      readLessButtonLabel: "Read less",
      fontWeight: "600",
      textColor: "#ffffff"
    },
    introParagraphs: [
      "Formulation of Real-Time Seating Flows: The cycle to seat Guests in an attraction’s vehicle requires the coordination of more than one Cast Member. Currently Cast Members employ hand signals and use their memory to calculate on the fly the allocation of Guest parties in vehicles.",
      "This real time communication led to the idea of using bidirectional real-time messaging with visualizations of vehicles' individual seats status to track the seating assignments. This way both the Grouper and Gate Agents have a real time view of the seating assignments and can manage the flow of people in the waiting queues.",
      "The flow of Guests into an attraction can also be split into multiple queues of people so each queue is managed independently.",
      "Organizing a framework:  Based on the activity theory analysis and data collected in affinity diagrams, the ideas and concepts were sorted so features and functionality were identified through a sitemap.",
      "The goal was to architect an application with components that could be reused driven by different configurations based on different attractions."    
    ],
    cards: [
      {
        id: "sitemap-illustration",
        contentBlocks: [
          {
            type: "image",
            title: "Site Map",
            id: "sitemap-illustration",
            objectPath: "projects/project_4/AutomaticSeater-Sitemap.png",
            alt: "Site Map Illustration",
            //aspectRatio: "16 / 9",
            sizes: "(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 1000px",
            priority: true,
            fullViewportLoading: true,
            objectFit: "contain",
            lightbox: true,
            annotation: "(Double click on illustration to zoom in and browse)",
            textColors: {
              title: "#ffffff",
              caption: "#cfcccc",
              annotation: "#dbe6f0",
            },
          },
          {
            type: "paragraphs",
            id: "activity-theory-persona-intro",
            textColors: {
              paragraph: "#ffffff",
              emphasis: "#EDD84A",
            },
            readMore: {
              expandTriggerParagraphIndex: 0,
              wordLimitsByParagraphIndex: {
                0: 50,
              },
              buttonLabel: "Read more",
              readLessButtonLabel: "Read less",
              textColor: "#ffffff",
            },
            paragraphs: [
              [
                { text: "Development Introspection:  ", style: "emphasis" },
                {
                  text: "  The nature of a real-time communication between Groupers and Gate Agents and the need for real time visualization of positional seats assigned and available in an attraction’s vehicle led to the idea of using Web sockets in a distributed mobile application. The application could have different views and features based on the Cast Member’s role.",
                },
                { text: "The development team explored different technologies for message queues, storage of configurations, and frontend and backend solutions that supported bidirectional real time messaging capabilities."}
              ],
              [
                { text: "The development team explored different technologies for message queues, storage of configurations, and frontend and backend solutions that supported bidirectional real time messaging capabilities."}
              ],
              [
                { text: "The team analyzed the implementation of probabilistic algorithms to recommend positional seating orders in a ride’s vehicle. A software prototype was developed with a functional MVP with a ride’s vehicle visualization."}
              ],
            ],
          },
          {
            type: "image",
            title: "Software Intronspection and Initial Prototypes",
            id: "initialprototype-illustration",
            objectPath: "projects/project_4/Illustration-Initial-Prototype.png",
            alt: "Initial Prototype Illustration",
            //aspectRatio: "16 / 9",
            sizes: "(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 1000px",
            priority: true,
            fullViewportLoading: true,
            objectFit: "contain",
            lightbox: true,
            annotation: "(Double click on illustration to zoom in and browse)",
            textColors: {
              title: "#ffffff",
              caption: "#cfcccc",
              annotation: "#dbe6f0",
            },
          },
        ],
      },
    ],
  },

  {
    id: "prototyping",
    kicker: "User Research Methods",
    title: "4. Prototyping",
    background:
      "linear-gradient(109deg, rgba(255,255,255,1) 13%, rgba(109,156,206,1) 100%)",
    textColors: {
      kicker: "#04C300",
      title: "#23466A",
      introParagraph: "#204061",
    },
    introParagraphs: [
      "Wire frames: Low and high fidelity Wireframes were developed using Figma, and software simulations using Python programs and an Angular SPA  were extensibly used at multiple design and co-design iterations.",
    ],
      cards: [
      {
        id: "landing-screen-illustration",
        contentBlocks: [
          {
            type: "image",
            title: "Landing Screen",
            id: "landing-screen",
            objectPath: "projects/project_4/LandingScreen-StarTours.png",
            alt: "Landing Screen",
            //aspectRatio: "16 / 9",
            sizes: "(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 1000px",
            priority: true,
            fullViewportLoading: true,
            objectFit: "contain",
            lightbox: true,
            letterboxBackground: "transparent",
            lightboxModalBackground: "#CBCBCB",
            annotation: "(Double click on illustration to zoom in and browse)",
            textColors: {
              title: "#204061",
              caption: "#204061",
              annotation: "#204061",
            },
          },
          {
            type: "image",
            title: "Landing Screen",
            id: "landing-screen-specs",
            objectPath: "projects/project_4/LandingScreen-StarTours-Specs.png",
            alt: "Landing Screen",
            //aspectRatio: "16 / 9",
            sizes: "(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 1000px",
            priority: true,
            fullViewportLoading: true,
            objectFit: "contain",
            lightbox: true,
            letterboxBackground: "transparent",
            lightboxModalBackground: "#CBCBCB",
            annotation: "(Double click on illustration to zoom in and browse)",
            textColors: {
              title: "#204061",
              caption: "#204061",
              annotation: "#204061",
            },
          },
          {
            type: "image",
            title: "Interactive View",
            id: "interactive-view-screen",
            objectPath: "projects/project_4/InteractiveMode-StarTours.png",
            alt: "Interactive View",
            //aspectRatio: "16 / 9",
            sizes: "(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 1000px",
            priority: true,
            fullViewportLoading: true,
            objectFit: "contain",
            lightbox: true,
            letterboxBackground: "transparent",
            lightboxModalBackground: "#CBCBCB",
            annotation: "(Double click on illustration to zoom in and browse)",
            textColors: {
              title: "#204061",
              caption: "#204061",
              annotation: "#204061",
            },
          },
          {
            type: "image",
            title: "Interactive View",
            id: "interactive-view-screen-specs",
            objectPath: "projects/project_4/InteractiveMode-StarTours-specs.png",
            alt: "Interactive View",
            //aspectRatio: "16 / 9",
            sizes: "(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 1000px",
            priority: true,
            fullViewportLoading: true,
            objectFit: "contain",
            lightbox: true,
            letterboxBackground: "transparent",
            lightboxModalBackground: "#CBCBCB",
            annotation: "(Double click on illustration to zoom in and browse)",
            textColors: {
              title: "#204061",
              caption: "#204061",
              annotation: "#204061",
            },
          },
          {
            type: "paragraphs",
            id: "activity-theory-persona-intro",
            textColors: {
              paragraph: "#204061",
              emphasis: "#04C300",
            },
            readMore: {
              expandTriggerParagraphIndex: 0,
              wordLimitsByParagraphIndex: {
                0: 40,
              },
              buttonLabel: "Read more",
              readLessButtonLabel: "Read less",
              textColor: "#204061",
            },
            paragraphs: [
              [
                { text: "Reusable Components: ", style: "emphasis" },
                {
                  text: "The primary design goal was to build a framework and interactive interface that can be scalable and reusable across different types of attractions. To achieve this goal the design was kept minimalistic in the different user interfaces employing material design and a configuration driven backend.",
                },
                { text: "During the rapid ethnography and user research, I learned that white boards and cardboards were used to train operation cast members memorize seat numbers to mentally do math to allocate groups of people to be seated together in a section of a ride or attraction."},
                             ],
              [
                { text: "This requires a cognitive effort that could be replaced by automating this process so the cast member focuses mainly on bringing the guest the best possible experience and ensure optimal attraction's throughput."},

              ]
            ],
          },
          {
            type: "reusableComponent",
            id: "reusable-seat-component",
            title: "The Seat",
            description:
              "The most basic element is the seat component. This element is a clickable component that visualizes the state of a given seat.",
            objectPath: "projects/project_4/Seat-Component.png",
            alt: "Seat component",
            textColors: {
              title: "#04C300",
              description: "#204061",
            },
          },
          {
            type: "reusableComponent",
            id: "reusable-cabin-geometry",
            title: "The Cabin Geometry",
            description:
              "Each cabin is represented by a geometry element that contains clickable seats for manual seating assignments. The geometry is an abstraction component that can be used in different rides and attractions in the form of cabins, vehicles, and theater seating sections.",
            objectPath: "projects/project_4/Cabin-Geometry-Component.png",
            alt: "Cabin geometry component",
            textColors: {
              title: "#04C300",
              description: "#204061",
            },
          },
          {
            type: "reusableComponent",
            id: "reusable-keypad",
            title: "Keypad",
            description:
              "A key path is used to enter a Guest party size and automatically assign the seats while optimizing seating capacity. This key path can be used in other attractions and rides requiring the seating of more than 4 Guests per cabin or vehicle.",
            objectPath: "projects/project_4/Keypad-Component.png",
            alt: "Keypad component",
            textColors: {
              title: "#04C300",
              description: "#204061",
            },
          },
          {
            type: "reusableComponent",
            id: "reusable-cabin-geometry-configuration",
            title: "The Cabin Geometry Configuration",
            description:
              "Cabin geometries can be configured independently to mark seats as broken, accessibility seats, infants, etc.",
            objectPath: "projects/project_4/Cabin-Geometry-Configuration.png",
            alt: "Cabin geometry configuration",
            textColors: {
              title: "#04C300",
              description: "#204061",
            },
          }
        ],
      },
    ],
  },
  {
    id: "test-iterate-report",
    kicker: "User Research Methods",
    title: "5. Test, Iterate, Report",
    background:
      "linear-gradient(109deg, rgba(64,126,192,1) 13%, rgba(30,59,90,1) 100%)",
    textColors: {
      kicker: "#eef305",
      title: "#ffffff",
      introParagraph: "#ffffff",
    },
    introParagraphReadMore: {
      firstParagraphWords: 24,
      buttonLabel: "Read more",
    },
    introParagraphs: [
      "The primary objective was to gather qualitative data to evaluate Cast Members interaction with the new design and quantitative data to assess common issues and new feature opportunities that could arise:" 
    ],
    cards: [
      {
        id: "subject-matter-expert",
       
        contentBlocks: [
          {
            type: "bullets",
            id: "sme-bullets",
            items: [
              "Weekly usability testing sessions during development post launch phase.",
              "Co-design usability testing sessions were conducted during development and post launch phase.",
              "Post launch phase usability testing sessions were conducted to assess the new features and functionality of the application.",
              "Physical Observations and video surveillance footage was evaluated to analyze new team dynamics and flows in the Guests throughput management.",
              "New features were developed during the iteration and testings phases such as real time asynchronous communication in the app, manual seat assignments and on the fly gate configurations."

            ],
          },
        ],
      },
    ],
  },
],
  } satisfies AutomaticSeaterAssignmentsDataProjectDocument;
