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
];
