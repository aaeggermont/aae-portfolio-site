import type {
  ARAsNarrativeTool,
  ArStoryTellerCaseStudy,
  ArStoryTellerContent,
  MagicExperience,
  MagicExperiences,
  NotificationsAttrac,
  OverviewBlock,
  ProjectOverviewData,
  ProjectOverviewColumn,
  SolutionBlock,
  TeamData,
  TeamMember,
} from "@/app/projects/ar-story-teller/types/arStoryTellerContent";

import { parseDesignSystem } from "./parseDesignSystem";
import {
  isRecord,
  parseStringArray,
  requireString,
} from "./parseContentHelpers";

function parseOverviewBlock(value: unknown, path: string): OverviewBlock {
  if (!isRecord(value)) {
    throw new Error(`Invalid ${path}: expected object`);
  }
  return {
    title: requireString(value.title, `${path}.title`),
    paragraphs: parseStringArray(value.paragraphs, `${path}.paragraphs`),
  };
}

function parseSolutionBlock(value: unknown, path: string): SolutionBlock {
  if (!isRecord(value)) {
    throw new Error(`Invalid ${path}: expected object`);
  }

  const solution: SolutionBlock = {
    ...parseOverviewBlock(value, path),
  };

  if (value.description !== undefined) {
    solution.description = requireString(value.description, `${path}.description`);
  }
  if (value.alt !== undefined) {
    solution.alt = requireString(value.alt, `${path}.alt`);
  }
  if (value.images !== undefined) {
    solution.images = parseStringArray(value.images, `${path}.images`);
  }
  return solution;
}

function parseTeamData(value: unknown, path: string): TeamData {
  if (!isRecord(value)) {
    throw new Error(`Invalid ${path}: expected object`);
  }
  if (!Array.isArray(value.members)) {
    throw new Error(`Invalid ${path}.members: expected array`);
  }

  const members: TeamMember[] = value.members.map((member, index) => {
    if (!isRecord(member)) {
      throw new Error(`Invalid ${path}.members[${index}]: expected object`);
    }
    return {
      name: requireString(member.name, `${path}.members[${index}].name`),
      role: requireString(member.role, `${path}.members[${index}].role`),
    };
  });

  return {
    title: requireString(value.title, `${path}.title`),
    members,
  };
}

function parseARAsNarrativeTool(value: unknown, path: string): ARAsNarrativeTool {
  if (!isRecord(value)) {
    throw new Error(`Invalid ${path}: expected object`);
  }
  return {
    title: requireString(value.title, `${path}.title`),
    paragraphs: parseStringArray(value.paragraphs, `${path}.paragraphs`),
    imageSrc: requireString(value.imageSrc, `${path}.imageSrc`),
    alt: requireString(value.alt, `${path}.alt`),
  };
}

function parseNotificationsAttrac(
  value: unknown,
  path: string,
): NotificationsAttrac {
  if (!isRecord(value)) {
    throw new Error(`Invalid ${path}: expected object`);
  }

  const notifications: NotificationsAttrac = {
    title: requireString(value.title, `${path}.title`),
    paragraphs: parseStringArray(value.paragraphs, `${path}.paragraphs`),
    images: parseStringArray(value.images, `${path}.images`),
  };

  if (value.alt !== undefined) {
    notifications.alt = requireString(value.alt, `${path}.alt`);
  }
  if (value.description !== undefined) {
    notifications.description = requireString(
      value.description,
      `${path}.description`,
    );
  }

  return notifications;
}

function parseMagicExperience(value: unknown, path: string): MagicExperience {
  if (!isRecord(value)) {
    throw new Error(`Invalid ${path}: expected object`);
  }
  return {
    title: requireString(value.title, `${path}.title`),
    alt: requireString(value.alt, `${path}.alt`),
    description: requireString(value.description, `${path}.description`),
    images: parseStringArray(value.images, `${path}.images`),
  };
}

function parseMagicExperiences(value: unknown, path: string): MagicExperiences {
  if (!isRecord(value)) {
    throw new Error(`Invalid ${path}: expected object`);
  }
  if (!Array.isArray(value.experiences)) {
    throw new Error(`Invalid ${path}.experiences: expected array`);
  }
  return {
    title: requireString(value.title, `${path}.title`),
    paragraphs: parseStringArray(value.paragraphs, `${path}.paragraphs`),
    experiences: value.experiences.map((item, index) =>
      parseMagicExperience(item, `${path}.experiences[${index}]`),
    ),
  };
}

function parseProjectOverview(
  value: unknown,
  path: string,
): ProjectOverviewData {
  if (!isRecord(value)) {
    throw new Error(`Invalid ${path}: expected object`);
  }
  if (!Array.isArray(value.columns)) {
    throw new Error(`Invalid ${path}.columns: expected array`);
  }

  const columns: ProjectOverviewColumn[] = value.columns.map((column, index) => {
    if (!isRecord(column)) {
      throw new Error(`Invalid ${path}.columns[${index}]: expected object`);
    }
    if (!Array.isArray(column.items)) {
      throw new Error(`Invalid ${path}.columns[${index}].items: expected array`);
    }
    return {
      icon: requireString(column.icon, `${path}.columns[${index}].icon`),
      title: requireString(column.title, `${path}.columns[${index}].title`),
      items: parseStringArray(column.items, `${path}.columns[${index}].items`),
    };
  });

  return {
    title: requireString(value.title, `${path}.title`),
    columns,
  };
}

function parseCaseStudy(value: unknown, path: string): ArStoryTellerCaseStudy {
  if (!isRecord(value)) {
    throw new Error(`Invalid ${path}: expected object`);
  }

  const caseStudy: ArStoryTellerCaseStudy = {
    overview: parseOverviewBlock(value.overview, `${path}.overview`),
    overviewImages: parseStringArray(
      value.overviewImages,
      `${path}.overviewImages`,
    ),
    overviewImagesAlt: requireString(
      value.overviewImagesAlt,
      `${path}.overviewImagesAlt`,
    ),
    ARAsNarrativeTool: parseARAsNarrativeTool(
      value.ARAsNarrativeTool,
      `${path}.ARAsNarrativeTool`,
    ),
    notificationsAttrac: parseNotificationsAttrac(
      value.notificationsAttrac,
      `${path}.notificationsAttrac`,
    ),
    magicExperiences: parseMagicExperiences(
      value.magicExperiences,
      `${path}.magicExperiences`,
    ),
    designSystem: parseDesignSystem(value.designSystem, `${path}.designSystem`),
  };

  if (value.conclusionsAndImpact !== undefined) {
    if (!Array.isArray(value.conclusionsAndImpact)) {
      throw new Error(`Invalid ${path}.conclusionsAndImpact: expected array`);
    }
    caseStudy.conclusionsAndImpact = value.conclusionsAndImpact.map(
      (item, index) => {
        if (!isRecord(item)) {
          throw new Error(
            `Invalid ${path}.conclusionsAndImpact[${index}]: expected object`,
          );
        }
        const parsed: { title: string; paragraphs?: string[] } = {
          title: requireString(
            item.title,
            `${path}.conclusionsAndImpact[${index}].title`,
          ),
        };
        if (item.paragraphs !== undefined) {
          parsed.paragraphs = parseStringArray(
            item.paragraphs,
            `${path}.conclusionsAndImpact[${index}].paragraphs`,
          );
        }
        return parsed;
      },
    );
  }

  return caseStudy;
}

/** Validates Firestore `content` and returns typed project fields. */
export function parseArStoryTellerContent(raw: unknown): ArStoryTellerContent {
  if (!isRecord(raw)) {
    throw new Error("Invalid project content: expected object");
  }

  return {
    designChallenge: parseOverviewBlock(raw.designChallenge, "designChallenge"),
    theProblem: parseOverviewBlock(raw.theProblem, "theProblem"),
    solution: parseSolutionBlock(raw.solution, "solution"),
    team: parseTeamData(raw.team, "team"),
    projectOverview: parseProjectOverview(raw.projectOverview, "projectOverview"),
    caseStudy: parseCaseStudy(raw.caseStudy, "caseStudy"),
  };
}
