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

const RING_RATIOS = [0.28, 0.48, 0.68, 0.88];
const HUB_RATIO = 0.22;
const DOMAIN_LABEL_RATIO = 0.78;
const SKILL_LABEL_RATIO = 0.98;
const SPOKE_INNER_RATIO = 0.28;

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

function labelAnchor(angle: number): {
  textAnchor: "start" | "middle" | "end";
  dy: number;
} {
  const deg = ((angle * 180) / Math.PI) % 360;
  const normalized = deg < 0 ? deg + 360 : deg;

  if (normalized > 20 && normalized < 160) {
    return { textAnchor: "start", dy: 0 };
  }
  if (normalized > 200 && normalized < 340) {
    return { textAnchor: "end", dy: 0 };
  }
  if (normalized >= 160 && normalized <= 200) {
    return { textAnchor: "middle", dy: 10 };
  }
  return { textAnchor: "middle", dy: -4 };
}

export function CapabilityMapChart({
  data,
  width,
  height,
  showSkillLabels = true,
}: CapabilityMapChartProps) {
  if (width < 120 || height < 120) return null;

  const size = Math.min(width, height);
  const margin = showSkillLabels ? size * 0.14 : size * 0.08;
  const radius = (size - margin * 2) / 2;
  const cx = width / 2;
  const cy = height / 2;

  const layout = buildCapabilityMapLayout(data);
  const hubRadius = radius * HUB_RATIO;

  return (
    <svg
      className={styles.capabilityMapChart}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-label={`${data.header.title}: capability domains and skills`}
    >
      <Group left={cx} top={cy}>
        {layout.domains.map((domain) => (
          <Arc
            key={`wedge-${domain.id}`}
            innerRadius={hubRadius}
            outerRadius={radius * RING_RATIOS[RING_RATIOS.length - 1]}
            startAngle={domain.startAngle}
            endAngle={domain.endAngle}
            fill={domain.color}
            fillOpacity={0.1}
            padAngle={0.012}
          />
        ))}

        {RING_RATIOS.map((ratio) => (
          <circle
            key={`ring-${ratio}`}
            r={radius * ratio}
            className={styles.capabilityMapRing}
          />
        ))}

        {layout.domains.map((domain) => {
          const inner = polarToCartesian(0, 0, hubRadius, domain.startAngle);
          const outer = polarToCartesian(
            0,
            0,
            radius * RING_RATIOS[RING_RATIOS.length - 1],
            domain.startAngle,
          );
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

        {layout.skills.map((skill) => {
          const inner = polarToCartesian(
            0,
            0,
            radius * SPOKE_INNER_RATIO,
            skill.angle,
          );
          const outer = polarToCartesian(
            0,
            0,
            radius * RING_RATIOS[RING_RATIOS.length - 1],
            skill.angle,
          );
          return (
            <line
              key={`spoke-${skill.id}`}
              x1={inner.x}
              y1={inner.y}
              x2={outer.x}
              y2={outer.y}
              stroke={skill.color}
              strokeOpacity={0.35}
              strokeWidth={1}
            />
          );
        })}

        {layout.domains.map((domain) => {
          const point = polarToCartesian(
            0,
            0,
            radius * DOMAIN_LABEL_RATIO,
            domain.midAngle,
          );
          const lines = wrapLabel(domain.label, 16);
          const { textAnchor, dy } = labelAnchor(domain.midAngle);

          return (
            <text
              key={`domain-label-${domain.id}`}
              x={point.x}
              y={point.y}
              textAnchor={textAnchor}
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

        {showSkillLabels &&
          layout.skills.map((skill) => {
            const point = polarToCartesian(
              0,
              0,
              radius * SKILL_LABEL_RATIO,
              skill.angle,
            );
            const { textAnchor, dy } = labelAnchor(skill.angle);

            return (
              <text
                key={`skill-label-${skill.id}`}
                x={point.x}
                y={point.y}
                textAnchor={textAnchor}
                dy={dy}
                className={styles.capabilityMapSkillLabel}
                fill={skill.color}
              >
                {skill.label}
              </text>
            );
          })}

        <circle r={hubRadius} className={styles.capabilityMapHub} />
        <text
          textAnchor="middle"
          className={styles.capabilityMapHubName}
          y={-hubRadius * 0.18}
        >
          {data.hub.name}
        </text>
        {data.hub.roles.slice(0, 3).map((role, index) => (
          <text
            key={`role-${role}`}
            textAnchor="middle"
            className={styles.capabilityMapHubRole}
            y={hubRadius * (0.12 + index * 0.28)}
          >
            {role}
          </text>
        ))}
      </Group>
    </svg>
  );
}
