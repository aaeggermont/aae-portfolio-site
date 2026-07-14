"use client";

import { Group } from "@visx/group";
import { Arc } from "@visx/shape";
import type { CapabilityMapData } from "@/app/aboutme/data/capability-map-data";
import {
  buildCapabilityMapLayout,
  polarToCartesian,
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
const SPOKE_INNER_RATIO = 0.3;
/**
 * Spoke lines extend past the last expertise ring toward the labels.
 * Expertise dots sit on GRID_RING_RATIOS by level.
 */
const SPOKE_LINE_OUTER_RATIO = 0.88;
/** Endpoint dot size as a fraction of chart radius. */
const SPOKE_DOT_RADIUS_RATIO = 0.01;

/** Ring radius for a skill's expertise level (1–4 → four grid rings). */
function expertiseRingRatio(level: 1 | 2 | 3 | 4): number {
  return GRID_RING_RATIOS[level - 1] ?? GRID_RING_RATIOS[GRID_RING_RATIOS.length - 1];
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
  // Narrow bands so only near-vertical domains (e.g. Strategy) get pulled in.
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

export function CapabilityMapChart({
  data,
  width,
  height,
  showSkillLabels = true,
}: CapabilityMapChartProps) {
  if (width < 120 || height < 120) return null;

  // Square canvas keeps concentric rings truly circular (no rectangular stretch).
  const size = Math.min(width, height);
  // Extra margin so outside domain labels are not clipped by ParentSize overflow.
  const margin = showSkillLabels ? size * 0.26 : size * 0.16;
  const radius = (size - margin * 2) / 2;
  const cx = size / 2;
  const cy = size / 2;

  const layout = buildCapabilityMapLayout(data);
  const hubRadius = radius * HUB_RATIO;
  const outerRimRadius = radius * OUTER_RIM_RATIO;
  const spokeDotRadius = Math.max(2.5, radius * SPOKE_DOT_RADIUS_RATIO);

  // Center hub text block (name + roles) vertically in the hub circle.
  const hubRoles = data.hub.roles.slice(0, 3);
  const hubNameToRoleGap = 0.3;
  const hubRoleStep = 0.16;
  const hubBlockBottom =
    hubRoles.length === 0
      ? 0
      : hubNameToRoleGap + (hubRoles.length - 1) * hubRoleStep;
  const hubBlockMid = hubBlockBottom / 2;
  // Optical nudge: SVG baselines sit slightly below letter visual centers.
  const hubOpticalNudge = 0.03;
  const hubNameY = (-hubBlockMid + hubOpticalNudge) * hubRadius;

  // Closed expertise polygon — connect dots in angular order (Core Expertise overlay).
  const expertisePoints = [...layout.skills]
    .sort((a, b) => a.angle - b.angle)
    .map((skill) => {
      const levelRadius = radius * expertiseRingRatio(skill.level);
      return polarToCartesian(0, 0, levelRadius, skill.angle);
    });
  const expertisePolygonPoints = expertisePoints
    .map((point) => `${point.x},${point.y}`)
    .join(" ");

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
        {layout.domains.map((domain) => (
          <Arc
            key={`wedge-${domain.id}`}
            innerRadius={hubRadius}
            outerRadius={outerRimRadius}
            startAngle={domain.startAngle}
            endAngle={domain.endAngle}
            fill={domain.color}
            fillOpacity={0.1}
          />
        ))}

        {GRID_RING_RATIOS.map((ratio) => (
          <circle
            key={`grid-ring-${ratio}`}
            r={radius * ratio}
            className={styles.capabilityMapRing}
          />
        ))}

        <circle
          r={outerRimRadius}
          className={styles.capabilityMapOuterRim}
        />

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

        {expertisePoints.length >= 3 && (
          <polygon
            points={expertisePolygonPoints}
            className={styles.capabilityMapExpertiseArea}
          />
        )}

        {layout.skills.map((skill) => {
          const levelRadius = radius * expertiseRingRatio(skill.level);
          const lineOuterRadius = radius * SPOKE_LINE_OUTER_RATIO;
          const inner = polarToCartesian(
            0,
            0,
            radius * SPOKE_INNER_RATIO,
            skill.angle,
          );
          const lineEnd = polarToCartesian(0, 0, lineOuterRadius, skill.angle);
          const dot = polarToCartesian(0, 0, levelRadius, skill.angle);
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
                cx={dot.x}
                cy={dot.y}
                r={spokeDotRadius}
                className={styles.capabilityMapSpokeDot}
                fill={skill.color}
              />
            </g>
          );
        })}

        {showSkillLabels &&
          layout.skills.map((skill) => {
            const point = polarToCartesian(
              0,
              0,
              radius * SKILL_LABEL_RATIO,
              skill.angle,
            );
            const lines = wrapLabel(skill.label, SKILL_LABEL_MAX_CHARS);
            // Middle-align every label so centers sit on one circle
            // (start/end anchors made left/right labels push outward).
            const wrapDy = lines.length > 1 ? -((lines.length - 1) * 5) : 0;

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

        {layout.domains.map((domain) => {
          const labelRatio = domainLabelRatioForAngle(domain.midAngle);
          const point = polarToCartesian(
            0,
            0,
            radius * labelRatio,
            domain.midAngle,
          );
          const lines = wrapLabel(domain.label, 18);
          // Outside labels stay centered on the sector midpoint.
          const dy = lines.length > 1 ? -((lines.length - 1) * 6) : 0;

          return (
            <text
              key={`domain-label-${domain.id}`}
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
        })}

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
