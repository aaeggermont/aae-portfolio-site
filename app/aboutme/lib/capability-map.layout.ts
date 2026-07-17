import {
  CAPABILITY_COLOR_HEX,
  type CapabilityDomain,
  type CapabilityExpertiseLevel,
  type CapabilityMapData,
} from "@/app/aboutme/data/capability-map-data";

export type CapabilityDomainLayout = {
  id: string;
  label: string;
  color: string;
  icon: CapabilityDomain["icon"];
  startAngle: number;
  endAngle: number;
  midAngle: number;
};

export type CapabilitySkillLayout = {
  id: string;
  label: string;
  domainId: string;
  color: string;
  angle: number;
  level: CapabilityExpertiseLevel;
};

export type CapabilityMapLayout = {
  domains: CapabilityDomainLayout[];
  skills: CapabilitySkillLayout[];
};

/** Convert chart angle (0 at top, clockwise) to cartesian. */
export function polarToCartesian(
  cx: number,
  cy: number,
  radius: number,
  angleRadians: number,
): { x: number; y: number } {
  return {
    x: cx + radius * Math.cos(angleRadians - Math.PI / 2),
    y: cy + radius * Math.sin(angleRadians - Math.PI / 2),
  };
}

/**
 * Build angular layout for domains and skills.
 * Domain wedge size is proportional to skill count (min weight 1).
 * Skills are spaced evenly inside each wedge.
 */
export function buildCapabilityMapLayout(
  data: CapabilityMapData,
): CapabilityMapLayout {
  const domainsSorted = [...data.domains].sort((a, b) => a.order - b.order);

  const weights = domainsSorted.map((domain) =>
    Math.max(domain.skills.length, 1),
  );
  const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
  const fullCircle = Math.PI * 2;

  let angleCursor = 0;
  const domains: CapabilityDomainLayout[] = domainsSorted.map((domain, index) => {
    const wedge = (weights[index] / totalWeight) * fullCircle;
    const startAngle = angleCursor;
    const endAngle = startAngle + wedge;
    angleCursor = endAngle;

    return {
      id: domain.id,
      label: domain.label,
      color: CAPABILITY_COLOR_HEX[domain.color],
      icon: domain.icon,
      startAngle,
      endAngle,
      midAngle: startAngle + wedge / 2,
    };
  });

  const skills: CapabilitySkillLayout[] = [];

  domainsSorted.forEach((domain, domainIndex) => {
    const domainLayout = domains[domainIndex];
    const wedge = domainLayout.endAngle - domainLayout.startAngle;
    const startAngle = domainLayout.startAngle;
    const skillsSorted = [...domain.skills].sort((a, b) => a.order - b.order);
    const skillCount = skillsSorted.length;
    if (skillCount === 0) return;

    const color = CAPABILITY_COLOR_HEX[domain.color];
    const padding = wedge * 0.12;
    const usable = wedge - padding * 2;
    const step = skillCount === 1 ? 0 : usable / (skillCount - 1);

    skillsSorted.forEach((skill, skillIndex) => {
      const angle =
        skillCount === 1
          ? startAngle + wedge / 2
          : startAngle + padding + step * skillIndex;

      skills.push({
        id: skill.id,
        label: skill.label,
        domainId: domain.id,
        color,
        angle,
        level: skill.level,
      });
    });
  });

  return { domains, skills };
}
