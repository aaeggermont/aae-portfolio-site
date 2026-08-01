/** Header copy for the Goals & Outcomes band. */
export const DEFAULT_BUSINESS_GOALS_COPY = {
  eyebrow: "Goals & Outcomes",
  title: "Business goals, by design",
  description:
    "Each business goal was framed around the guest and operational outcomes the experience was designed to influence.",
} as const;

/** Default Business Goals cards — used when Firestore has no `items`. */
export const DEFAULT_BUSINESS_GOAL_ITEMS = [
  {
    title: "Guest Engagement",
    description:
      "Increase dwell time and positive sentiment by turning wait time into interactive, on-brand play.",
  },
  {
    title: "Revenue Generation",
    description:
      "Create opportunities for exclusive in-app content and collectible experiences that complement the visit.",
  },
  {
    title: "Queue Optimization",
    description:
      "Distribute foot traffic more evenly across attractions through gamified exploration.",
  },
  {
    title: "Data-Driven Insights",
    description:
      "Better understand guest movement patterns to inform operations and capacity planning.",
  },
] as const;
