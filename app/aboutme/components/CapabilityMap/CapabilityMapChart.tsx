"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Group } from "@visx/group";
import { Arc } from "@visx/shape";
import type { CapabilityMapData } from "@/app/aboutme/data/capability-map-data";
import {
  buildCapabilityMapLayout,
  polarToCartesian,
  type CapabilityDomainLayout,
  type CapabilitySkillLayout,
} from "@/app/aboutme/lib/capability-map.layout";
import styles from "./capability-map.module.scss";

type CapabilityMapChartProps = {
  data: CapabilityMapData;
  width: number;
  height: number;
  showSkillLabels?: boolean;
};

/**
 * Expertise-level grid rings (outside the hub).
 * Index 0 → level 1 (low), index 3 → level 4 (high).
 * Ring 1 sits near the hub; rings 2–4 step outward with room before skill labels.
 */
const GRID_RING_RATIOS = [0.43, 0.53, 0.63, 0.73];
/** Outer rim — creates a wide band between last grid ring and this circle for skill labels. */
const OUTER_RIM_RATIO = 1.09;
const HUB_RATIO = 0.3;
/** Domain titles sit clearly outside the outer rim. */
const DOMAIN_LABEL_RATIO = 1.34;
/** Pull top/bottom domain labels closer (vertical stack clears the rim more). */
const DOMAIN_LABEL_VERTICAL_INSET = 0.1;
/** Push left/right domain labels farther out (text extends into the chart). */
const DOMAIN_LABEL_SIDE_OUTSET = 0.06;
/** Skill labels sit outside the outermost expertise ring. */
const SKILL_LABEL_RATIO = 0.93;
/** Soft wrap length for skill labels (keeps rim labels compact). */
const SKILL_LABEL_MAX_CHARS = 12;
/** Spokes begin at the hub edge. */
const SPOKE_INNER_RATIO = 0.2;
/**
 * Spoke lines extend past the last expertise ring toward the labels.
 * Expertise dots sit on GRID_RING_RATIOS by level.
 */
const SPOKE_LINE_OUTER_RATIO = 0.78;
/** Endpoint dot size as a fraction of chart radius. */
const SPOKE_DOT_RADIUS_RATIO = 0.01;

/** Hover: light zoom from chart center. */
const HOVER_SCALE = 1.06;
/** Hover: radial lift as a fraction of chart radius. */
const HOVER_LIFT_RATIO = 0.028;
/** Hover zoom / lift ease duration. */
const HOVER_MOTION_MS = 320;

function easeOutCubic(t: number): number {
  return 1 - (1 - t) ** 3;
}

/** Animate 0→1 (or reverse) when `active` flips; preserves mid-flight progress. */
function useHoverProgress(active: boolean, durationMs = HOVER_MOTION_MS): number {
  const [progress, setProgress] = useState(0);
  const progressRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const from = progressRef.current;
    const to = active ? 1 : 0;
    if (Math.abs(from - to) < 0.0001) {
      progressRef.current = to;
      setProgress(to);
      return;
    }

    const start = performance.now();

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs);
      const next = from + (to - from) * easeOutCubic(t);
      progressRef.current = next;
      setProgress(next);
      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        progressRef.current = to;
        setProgress(to);
        rafRef.current = null;
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, [active, durationMs]);

  return progress;
}

/** Ring radius for a skill's expertise level (1–4 → four grid rings). */
function expertiseRingRatio(level: 1 | 2 | 3 | 4): number {
  return GRID_RING_RATIOS[level - 1] ?? GRID_RING_RATIOS[GRID_RING_RATIOS.length - 1];
}

function DomainMotionGroup({
  isHovered,
  midAngle,
  liftPx,
  className,
  children,
}: {
  isHovered: boolean;
  midAngle: number;
  liftPx: number;
  className?: string;
  children: ReactNode;
}) {
  const progress = useHoverProgress(isHovered);
  const scale = 1 + (HOVER_SCALE - 1) * progress;
  const { x, y } = polarToCartesian(0, 0, liftPx * progress, midAngle);
  const transform =
    progress < 0.001 ? undefined : `translate(${x} ${y}) scale(${scale})`;

  return (
    <g
      className={className}
      transform={transform}
      style={{ pointerEvents: "none" }}
    >
      {children}
    </g>
  );
}

function wrapLabel(label: string, maxChars: number): string[] {
  if (label.length <= maxChars) return [label];

  const words = label.split(" ");
  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length > maxChars && current) {
      lines.push(current);
      current = word;
    } else {
      current = next;
    }
  }

  if (current) lines.push(current);
  return lines.slice(0, 3);
}

/** Domain labels: pull in at top/bottom; push out on sides (horizontal text overlaps the rim). */
function domainLabelRatioForAngle(angleRadians: number): number {
  const deg = (((angleRadians * 180) / Math.PI) % 360 + 360) % 360;
  const nearBottom = deg > 160 && deg < 210;
  const nearTop = deg < 25 || deg > 335;
  const nearSide =
    (deg > 55 && deg < 125) || (deg > 235 && deg < 305);

  if (nearBottom || nearTop) {
    return DOMAIN_LABEL_RATIO - DOMAIN_LABEL_VERTICAL_INSET;
  }
  if (nearSide) {
    return DOMAIN_LABEL_RATIO + DOMAIN_LABEL_SIDE_OUTSET;
  }
  return DOMAIN_LABEL_RATIO;
}

type ExpertiseVertex = CapabilitySkillLayout & { x: number; y: number };

export function CapabilityMapChart({
  data,
  width,
  height,
  showSkillLabels = true,
}: CapabilityMapChartProps) {
  const [hoveredDomainId, setHoveredDomainId] = useState<string | null>(null);

  if (width < 120 || height < 120) return null;

  const size = Math.min(width, height);
  const margin = showSkillLabels ? size * 0.22 : size * 0.16;
  const radius = (size - margin * 2) / 2;
  const cx = size / 2;
  const cy = size / 2;

  const layout = buildCapabilityMapLayout(data);
  const hubRadius = radius * HUB_RATIO;
  const outerRimRadius = radius * OUTER_RIM_RATIO;
  const spokeDotRadius = Math.max(2.5, radius * SPOKE_DOT_RADIUS_RATIO);
  const hoverLiftPx = radius * HOVER_LIFT_RATIO;
  const isHovering = hoveredDomainId !== null;

  const hubRoles = data.hub.roles.slice(0, 3);
  const hubNameToRoleGap = 0.3;
  const hubRoleStep = 0.16;
  const hubBlockBottom =
    hubRoles.length === 0
      ? 0
      : hubNameToRoleGap + (hubRoles.length - 1) * hubRoleStep;
  const hubBlockMid = hubBlockBottom / 2;
  const hubOpticalNudge = 0.03;
  const hubNameY = (-hubBlockMid + hubOpticalNudge) * hubRadius;

  const expertiseVertices: ExpertiseVertex[] = [...layout.skills]
    .sort((a, b) => a.angle - b.angle)
    .map((skill) => {
      const levelRadius = radius * expertiseRingRatio(skill.level);
      const point = polarToCartesian(0, 0, levelRadius, skill.angle);
      return { ...skill, x: point.x, y: point.y };
    });

  const domainOverlays = layout.domains.map((domain) => {
    const skills = expertiseVertices
      .filter((skill) => skill.domainId === domain.id)
      .sort((a, b) => a.angle - b.angle);

    if (skills.length === 0) {
      return {
        domain,
        skills: [] as ExpertiseVertex[],
        fillPoints: [] as { x: number; y: number }[],
      };
    }

    const startRadius = radius * expertiseRingRatio(skills[0].level);
    const endRadius = radius * expertiseRingRatio(skills[skills.length - 1].level);
    const edgeStart = polarToCartesian(0, 0, startRadius, domain.startAngle);
    const edgeEnd = polarToCartesian(0, 0, endRadius, domain.endAngle);

    return {
      domain,
      skills,
      fillPoints: [
        edgeStart,
        ...skills.map((skill) => ({ x: skill.x, y: skill.y })),
        edgeEnd,
      ],
    };
  });

  // Cross-domain chords stay in a fixed underlay and fade while hovering.
  const crossDomainLinks = expertiseVertices.flatMap((skill, index) => {
    const next = expertiseVertices[(index + 1) % expertiseVertices.length];
    if (skill.domainId === next.domainId) return [];
    return [{ skill, next }];
  });

  // Hovered domain last so it paints above siblings.
  const orderedOverlays = [...domainOverlays].sort((a, b) => {
    if (a.domain.id === hoveredDomainId) return 1;
    if (b.domain.id === hoveredDomainId) return -1;
    return 0;
  });

  return (
    <svg
      className={styles.capabilityMapChart}
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      role="img"
      aria-label={`${data.header.title}: capability domains and skills`}
    >
      <Group left={cx} top={cy}>
        {/* Shared chrome — does not rise with a domain */}
        {GRID_RING_RATIOS.map((ratio) => (
          <circle
            key={`grid-ring-${ratio}`}
            r={radius * ratio}
            className={styles.capabilityMapRing}
          />
        ))}

        {layout.domains.map((domain) => {
          const inner = polarToCartesian(0, 0, hubRadius, domain.startAngle);
          const outer = polarToCartesian(0, 0, outerRimRadius, domain.startAngle);
          return (
            <line
              key={`divider-${domain.id}`}
              x1={inner.x}
              y1={inner.y}
              x2={outer.x}
              y2={outer.y}
              className={styles.capabilityMapDivider}
            />
          );
        })}

        {crossDomainLinks.map(({ skill, next }) => (
          <line
            key={`cross-link-${skill.id}-${next.id}`}
            x1={skill.x}
            y1={skill.y}
            x2={next.x}
            y2={next.y}
            stroke={skill.color}
            className={styles.capabilityMapExpertiseAreaStroke}
            style={{ opacity: isHovering ? 0.15 : undefined }}
          />
        ))}

        {orderedOverlays.map(({ domain, skills, fillPoints }) => {
          const isHovered = hoveredDomainId === domain.id;

          return (
            <DomainMotionGroup
              key={`domain-${domain.id}`}
              className={styles.capabilityMapDomainGroup}
              isHovered={isHovered}
              midAngle={domain.midAngle}
              liftPx={hoverLiftPx}
            >
              <Arc
                innerRadius={hubRadius}
                outerRadius={outerRimRadius}
                startAngle={domain.startAngle}
                endAngle={domain.endAngle}
                fill={domain.color}
                fillOpacity={isHovered ? 0.18 : 0.1}
              />

              {fillPoints.length > 0 && (
                <path
                  d={[
                    "M 0 0",
                    ...fillPoints.map((point) => `L ${point.x} ${point.y}`),
                    "Z",
                  ].join(" ")}
                  fill={domain.color}
                  className={styles.capabilityMapExpertiseAreaFill}
                />
              )}

              {/* Intra-domain expertise outline */}
              {skills.map((skill, index) => {
                if (index >= skills.length - 1) return null;
                const next = skills[index + 1];
                return (
                  <line
                    key={`intra-link-${skill.id}-${next.id}`}
                    x1={skill.x}
                    y1={skill.y}
                    x2={next.x}
                    y2={next.y}
                    stroke={skill.color}
                    className={styles.capabilityMapExpertiseAreaStroke}
                  />
                );
              })}

              {skills.map((skill) => {
                const lineOuterRadius = radius * SPOKE_LINE_OUTER_RATIO;
                const inner = polarToCartesian(
                  0,
                  0,
                  radius * SPOKE_INNER_RATIO,
                  skill.angle,
                );
                const lineEnd = polarToCartesian(
                  0,
                  0,
                  lineOuterRadius,
                  skill.angle,
                );
                return (
                  <g key={`spoke-${skill.id}`}>
                    <line
                      x1={inner.x}
                      y1={inner.y}
                      x2={lineEnd.x}
                      y2={lineEnd.y}
                      stroke={skill.color}
                      strokeOpacity={0.35}
                      strokeWidth={1}
                    />
                    <circle
                      cx={skill.x}
                      cy={skill.y}
                      r={spokeDotRadius}
                      className={styles.capabilityMapSpokeDot}
                      fill={skill.color}
                    />
                  </g>
                );
              })}

              {/* Outer rim segment — scales with the domain on hover */}
              <Arc
                innerRadius={outerRimRadius - 0.625}
                outerRadius={outerRimRadius + 0.625}
                startAngle={domain.startAngle}
                endAngle={domain.endAngle}
                className={styles.capabilityMapOuterRim}
              />

              {showSkillLabels &&
                skills.map((skill) => {
                  const point = polarToCartesian(
                    0,
                    0,
                    radius * SKILL_LABEL_RATIO,
                    skill.angle,
                  );
                  const lines = wrapLabel(skill.label, SKILL_LABEL_MAX_CHARS);
                  const wrapDy =
                    lines.length > 1 ? -((lines.length - 1) * 5) : 0;

                  return (
                    <text
                      key={`skill-label-${skill.id}`}
                      x={point.x}
                      y={point.y}
                      textAnchor="middle"
                      dy={wrapDy}
                      className={styles.capabilityMapSkillLabel}
                      fill={skill.color}
                    >
                      {lines.map((line, index) => (
                        <tspan
                          key={`${skill.id}-line-${index}`}
                          x={point.x}
                          dy={index === 0 ? 0 : "1.1em"}
                        >
                          {line}
                        </tspan>
                      ))}
                    </text>
                  );
                })}

              <DomainLabel domain={domain} radius={radius} />
            </DomainMotionGroup>
          );
        })}

        {/* Fixed hit wedges (above visuals, below hub) — stable while domains rise */}
        {layout.domains.map((domain) => {
          const labelRatio = domainLabelRatioForAngle(domain.midAngle);
          const hitOuter = Math.max(
            outerRimRadius,
            radius * labelRatio + spokeDotRadius * 4,
          );
          return (
            <Arc
              key={`domain-hit-${domain.id}`}
              innerRadius={hubRadius}
              outerRadius={hitOuter}
              startAngle={domain.startAngle}
              endAngle={domain.endAngle}
              fill="transparent"
              className={styles.capabilityMapDomainHit}
              onPointerEnter={() => setHoveredDomainId(domain.id)}
              onPointerLeave={() => setHoveredDomainId(null)}
              style={{ cursor: "pointer" }}
            />
          );
        })}

        {/* Hub stays fixed above rising domains */}
        <circle r={hubRadius} className={styles.capabilityMapHub} />
        <text
          textAnchor="middle"
          className={styles.capabilityMapHubName}
          y={hubNameY}
        >
          {data.hub.name}
        </text>
        {hubRoles.map((role, index) => (
          <text
            key={`role-${role}`}
            textAnchor="middle"
            className={styles.capabilityMapHubRole}
            y={
              (hubNameToRoleGap + index * hubRoleStep - hubBlockMid + hubOpticalNudge) *
              hubRadius
            }
          >
            {role}
          </text>
        ))}
      </Group>
    </svg>
  );
}

function DomainLabel({
  domain,
  radius,
}: {
  domain: CapabilityDomainLayout;
  radius: number;
}) {
  const labelRatio = domainLabelRatioForAngle(domain.midAngle);
  const point = polarToCartesian(0, 0, radius * labelRatio, domain.midAngle);
  const lines = wrapLabel(domain.label, 18);
  const dy = lines.length > 1 ? -((lines.length - 1) * 6) : 0;

  return (
    <text
      x={point.x}
      y={point.y}
      textAnchor="middle"
      dy={dy}
      className={styles.capabilityMapDomainLabel}
      fill={domain.color}
    >
      {lines.map((line, index) => (
        <tspan
          key={`${domain.id}-line-${index}`}
          x={point.x}
          dy={index === 0 ? 0 : "1.15em"}
        >
          {line}
        </tspan>
      ))}
    </text>
  );
}
