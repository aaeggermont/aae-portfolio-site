export type GameplayMechanicStep = {
  id: string;
  step: string;
  title: string;
  description: string;
  icon: "scan" | "discover" | "unlock" | "badge";
};

export const DEFAULT_GAMEPLAY_MECHANICS_COPY = {
  eyebrow: "Gameplay Mechanics",
  title: "A four-step guest journey",
  description:
    "The experience turns passive wait time into an active quest — guests scan, discover, unlock, and earn as they wait in extended queue times , blending the physical environment with layered digital narrative.",
} as const;

export const DEFAULT_GAMEPLAY_MECHANIC_STEPS: GameplayMechanicStep[] = [
  {
    id: "scan",
    step: "01",
    title: "Scan Park Area",
    description:
      "Guests point their device at landmarks to scan the surrounding environment and surface hidden AR layers.",
    icon: "scan",
  },
  {
    id: "discover",
    step: "02",
    title: "Discover Clues",
    description:
      "Interactive puzzles and prompts guide guests to explore the physical space, turning the queue into a quest.",
    icon: "discover",
  },
  {
    id: "unlock",
    step: "03",
    title: "Unlock Lore",
    description:
      "Solving challenges reveals narrative rewards — character stories and historical context tied to the location.",
    icon: "unlock",
  },
  {
    id: "badge",
    step: "04",
    title: "Earn Badges",
    description:
      "Completed quests award collectible badges, encouraging social sharing and repeat engagement.",
    icon: "badge",
  },
];
