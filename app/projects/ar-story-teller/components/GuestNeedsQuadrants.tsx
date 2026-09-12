"use client";

import type { ReactNode, SVGProps } from "react";
import "./GuestNeedsQuadrants.scss";

type IconProps = SVGProps<SVGSVGElement>;

function IconBase({ children, ...props }: IconProps & { children: ReactNode }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      {children}
    </svg>
  );
}

function UserIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </IconBase>
  );
}

function CompassIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </IconBase>
  );
}

function SmartphoneIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
      <path d="M12 18h.01" />
    </IconBase>
  );
}

function SparklesIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
      <path d="M20 3v4" />
      <path d="M22 5h-4" />
      <path d="M4 17v2" />
      <path d="M5 18H3" />
    </IconBase>
  );
}

type Quadrant = {
  id: string;
  title: string;
  description: string;
  icon: ReactNode;
};

const QUADRANTS: Quadrant[] = [
  {
    id: "persona",
    title: "Persona — Who?",
    description:
      "Disney guests at Walt Disney World who want to learn the backstage stories behind attractions, plus Disney Imagineers.",
    icon: <UserIcon />,
  },
  {
    id: "behaviors",
    title: "Behaviors & Wants — Why it fits",
    description:
      "Guests gain interactive, on-theme activities tied to an attraction while they wait in line for the ride.",
    icon: <CompassIcon />,
  },
  {
    id: "technology",
    title: "Technology Accessibility — Access",
    description:
      "Middle-tier common mobile devices running AR experiences backed by on-device ML processors.",
    icon: <SmartphoneIcon />,
  },
  {
    id: "reactions",
    title: "Reactions — Expected outcome",
    description:
      "Guests are empowered to explore attractions and learn their stories in greater depth, before and after the ride.",
    icon: <SparklesIcon />,
  },
];

export function GuestNeedsQuadrants() {
  return (
    <section
      className="guest-needs-quadrants"
      aria-label="Understanding guest needs framework"
    >
      <div className="guest-needs-quadrants__panel">
        {QUADRANTS.map((quadrant) => (
          <article key={quadrant.id} className="guest-needs-quadrants__cell">
            <header className="guest-needs-quadrants__header">
              <span className="guest-needs-quadrants__icon">{quadrant.icon}</span>
              <h3 className="guest-needs-quadrants__title">{quadrant.title}</h3>
            </header>
            <p className="guest-needs-quadrants__body">{quadrant.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default GuestNeedsQuadrants;
