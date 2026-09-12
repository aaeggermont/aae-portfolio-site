"use client";

import { MAIN_DEMO_COACHING_SWAY } from "./mainDemoTiming";
import styles from "./ArkitCoachingOverlay.module.scss";

type Dot = { cx: number; cy: number; r: number };

/** Dot cluster on the left of the plane — varying radii, loose radial layout. */
const SURFACE_DOTS: Dot[] = [
  { cx: 88, cy: 66, r: 2 },
  { cx: 100, cy: 62, r: 1.5 },
  { cx: 94, cy: 74, r: 2.5 },
  { cx: 108, cy: 70, r: 1.5 },
  { cx: 84, cy: 82, r: 1.5 },
  { cx: 98, cy: 84, r: 2 },
  { cx: 112, cy: 80, r: 1 },
  { cx: 78, cy: 94, r: 2 },
  { cx: 92, cy: 96, r: 1.5 },
  { cx: 106, cy: 92, r: 2 },
  { cx: 72, cy: 108, r: 1.5 },
  { cx: 86, cy: 110, r: 2 },
  { cx: 100, cy: 106, r: 1 },
  { cx: 66, cy: 120, r: 1.5 },
  { cx: 82, cy: 122, r: 1 },
];

export type ArkitCoachingOverlayProps = {
  className?: string;
  /** When true, the phone silhouette runs the side-to-side sway. */
  swayActive?: boolean;
};

/**
 * ARKit-style AR coaching overlay — perspective ground plane, surface-detection
 * dots, swaying phone silhouette, and “Move iPhone to start” caption.
 */
export function ArkitCoachingOverlay({
  className = "",
  swayActive = true,
}: ArkitCoachingOverlayProps) {
  const swayStyle = {
    ["--phone-sway-duration" as string]: `${MAIN_DEMO_COACHING_SWAY.durationSec}s`,
    ["--phone-sway-loops" as string]: String(MAIN_DEMO_COACHING_SWAY.loops),
  };

  return (
    <svg
      viewBox="0 0 240 178"
      fill="none"
      className={[styles.root, className].filter(Boolean).join(" ")}
      role="img"
      aria-label="AR coaching overlay: move iPhone to start"
    >
      <polygon
        points="88,52 152,52 200,128 40,128"
        fill="rgba(255,255,255,0.04)"
        stroke="white"
        strokeWidth="2"
        strokeLinejoin="round"
      />

      {SURFACE_DOTS.map((d, i) => (
        <circle key={i} cx={d.cx} cy={d.cy} r={d.r} fill="white" />
      ))}

      <g
        className={swayActive ? styles.phoneSway : undefined}
        style={swayActive ? swayStyle : { transform: "translateX(0)" }}
      >
        <rect
          x="107"
          y="98"
          width="26"
          height="54"
          rx="5"
          fill="#333333"
          stroke="white"
          strokeWidth="1.5"
        />
        <rect
          x="116"
          y="102"
          width="8"
          height="1.5"
          rx="0.75"
          fill="white"
          opacity="0.6"
        />
      </g>

      <text
        x="120"
        y="170"
        textAnchor="middle"
        fill="white"
        fontSize="8.5"
        fontFamily='var(--font-source-sans-3), "Source Sans 3", system-ui, sans-serif'
        fontWeight="500"
        letterSpacing="0.3"
      >
        Move iPhone to start
      </text>
    </svg>
  );
}

export default ArkitCoachingOverlay;
