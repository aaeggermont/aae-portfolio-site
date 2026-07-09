/** Default Business Goals rows — matches design spec when Firestore has no `items`. */
export const DEFAULT_BUSINESS_GOAL_ITEMS = [
  {
    title: "Extend Storytelling",
    description:
      "Transform the surrounding environment into part of the attraction experience.",
  },
  {
    title: "Increase Guest Engagement",
    description:
      "Turn unavoidable wait times into moments of discovery, exploration, and play.",
  },
  {
    title: "Build a Scalable Platform",
    description:
      "Create a reusable AR framework adaptable to multiple attractions and use cases.",
  },
  {
    title: "Support Sustainable Innovation",
    description:
      "Deliver immersive experiences that balance operational efficiency with Disney's commitment to exceptional guest experiences.",
  },
] as const;
