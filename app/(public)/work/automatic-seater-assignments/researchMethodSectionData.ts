import type { ResearchMethodSectionData } from "./researchMethodTypes";

/** Static fallback; `page.tsx` passes this into `<ResearchMethod />` — replace with Firestore fetch when ready. */
export const researchMethodSectionData: ResearchMethodSectionData = {
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
};
