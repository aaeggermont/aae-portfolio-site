/**
 * Capability map content model.
 * Expertise level: 1 (low) → 4 (high), mapped to the four chart rings.
 */

export type CapabilityIconKey =
  | "brain"
  | "code"
  | "people"
  | "person"
  | "chart";

export type CapabilityColorKey =
  | "domain-ai"
  | "domain-engineering"
  | "domain-strategy"
  | "domain-design"
  | "domain-data";

/** Skill expertise level: 1 = lowest ring, 4 = highest / outermost. */
export type CapabilityExpertiseLevel = 1 | 2 | 3 | 4;

export type CapabilitySkill = {
  id: string;
  label: string;
  order: number;
  /** Simulated expertise level (1–4). */
  level: CapabilityExpertiseLevel;
};

export type CapabilityDomain = {
  id: string;
  label: string;
  color: CapabilityColorKey;
  icon: CapabilityIconKey;
  order: number;
  skills: CapabilitySkill[];
};

export type CapabilityMapData = {
  version: number;
  header: {
    title: string;
    tagline: string;
    description: string;
  };
  hub: {
    name: string;
    roles: string[];
  };
  footer: {
    title: string;
    description: string;
  };
  domains: CapabilityDomain[];
};

export const CAPABILITY_COLOR_HEX: Record<CapabilityColorKey, string> = {
  "domain-ai": "#6B5B95",
  "domain-engineering": "#C4783A",
  "domain-strategy": "#2A8A8A",
  "domain-design": "#4A8B5C",
  "domain-data": "#3D6FA8",
};

export const capabilityMapFallback: CapabilityMapData = {
  version: 1,
  header: {
    title: "Antonio's Capability Map",
    tagline: "Helping people make better decisions.",
    description:
      "I design and build intelligent systems that connect human needs, business goals, and emerging technologies.",
  },
  hub: {
    name: "Antonio",
    roles: ["UX Engineer", "Full Stack Developer", "AI-Powered Experiences"],
  },
  footer: {
    title: "Bringing It All Together",
    description:
      "I bridge technology, design, and data to create human-centered solutions that drive measurable impact and empower better decisions.",
  },
  domains: [
    {
      id: "ai-intelligent-systems",
      label: "AI & Intelligent Systems",
      color: "domain-ai",
      icon: "brain",
      order: 1,
      skills: [
        { id: "ai-product-design", label: "AI Product Design", order: 0, level: 4 },
        { id: "prompt-engineering", label: "Prompt Engineering", order: 1, level: 3 },
        { id: "computer-vision", label: "Computer Vision", order: 2, level: 1 },
        { id: "human-centered-ai", label: "Human-Centered AI", order: 3, level: 4 },
        { id: "ai-agents", label: "AI Agents", order: 4, level: 2 },
      ],
    },
    {
      id: "engineering-development",
      label: "Engineering & Development",
      color: "domain-engineering",
      icon: "code",
      order: 0,
      skills: [
        { id: "react-nextjs", label: "React / Next.js", order: 0, level: 4 },
        { id: "angular", label: "Angular", order: 1, level: 4 },
        { id: "typescript", label: "TypeScript / JavaScript", order: 2, level: 4 },
        { id: "python-django", label: "Python / Django", order: 3, level: 3 },
        { id: "firebase-cloud", label: "Firebase / Cloud", order: 4, level: 3 },
        { id: "apis-integrations", label: "APIs & Integrations", order: 5, level: 4 },
      ],
    },
    {
      id: "strategy-leadership",
      label: "Strategy & Leadership",
      color: "domain-strategy",
      icon: "people",
      order: 2,
      skills: [
        { id: "systems-thinking", label: "Systems Thinking", order: 0, level: 4 },
        { id: "product-strategy", label: "Product Strategy", order: 1, level: 3 },
        { id: "workshops", label: "Workshops & Facilitation", order: 2, level: 3 },
        { id: "storytelling", label: "Storytelling", order: 3, level: 4 },
      ],
    },
    {
      id: "human-centered-design",
      label: "Human Centered Design",
      color: "domain-design",
      icon: "person",
      order: 4,
      skills: [
        { id: "user-research", label: "User Research", order: 0, level: 4 },
        { id: "journey-mapping", label: "Journey Mapping", order: 1, level: 3 },
        { id: "information-architecture", label: "Information Architecture", order: 2, level: 4 },
        { id: "interaction-design", label: "Interaction Design", order: 3, level: 4 },
        { id: "prototyping-testing", label: "Prototyping", order: 4, level: 4 },
      ],
    },
    {
      id: "data-analytics",
      label: "Data & Analytics",
      color: "domain-data",
      icon: "chart",
      order: 3,
      skills: [
        { id: "data-visualization", label: "Data Visualization", order: 0, level: 4 },
        { id: "dashboard-design", label: "Dashboard Design", order: 1, level: 4 },
        { id: "analytics-insights", label: "Analytics & Insights", order: 2, level: 3 },
        { id: "metrics-kpis", label: "Metrics & KPIs", order: 3, level: 3 },
      ],
    },
  ],
};
