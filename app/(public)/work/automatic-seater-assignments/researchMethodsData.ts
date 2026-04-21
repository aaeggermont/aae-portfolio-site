import type { ResearchMethodBlockData } from "./researchMethodTypes";

/**
 * Ordered list of research-method blocks for this case study.
 * Append another `ResearchMethodBlockData` for “2. …”; add `cards` for more methodologies.
 * `page.tsx` maps this list to `<ResearchMethod />` (Firestore can return the same array shape).
 */
export const researchMethods: ResearchMethodBlockData[] = [
  {
    id: "understanding-the-problem",
    kicker: "User Research Methods",
    title: "1. Understanding the Problem",
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
          },
          {
            type: "paragraphs",
            id: "activity-theory-persona-intro",
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
    introParagraphs: [
      "Formulation of Real-Time Seating Flows:  The cycle to seat Guests in an attraction’s vehicle requires the coordination of more than one Cast Member. Currently Cast Members employ hand signals and use their memory to calculate on the fly the allocation of Guest parties in vehicles.",
      "This real time communication led to the idea of using bidirectional real-time messaging with visualizations of vehicles' individual seats status to track the seating assignments. This way both the Grouper and Gate Agents have a real time view of the seating assignments and can manage the flow of people in the waiting queues.",
      "The flow of Guests into an attraction can also be split into multiple queues of people so each queue is managed independently.",
      "Organizing a framework:  Based on the activity theory analysis and data collected in affinity diagrams, the ideas and concepts were sorted so features and functionality were identified through a sitemap.",
      "The goal was to architect an application with components that could be reused driven by different configurations based on different attractions."    ],
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
          },
          {
            type: "paragraphs",
            id: "activity-theory-persona-intro",
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
          },
        ],
      },
    ],
  },
];
