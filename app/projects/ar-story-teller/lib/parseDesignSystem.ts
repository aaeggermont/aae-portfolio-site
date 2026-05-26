import type {
  BulletPointItem,
  DesignSystem,
  DesignSystemResearchMethod,
  DevelopingSpecs,
  EnvisionUseCase,
  FeatureSpecification,
  FindingsInsights,
  InteractionModeSpecs,
  Prototyping,
  PrototypingImage,
  PrototypingMethod,
  ProcessBullet,
  ProcessSection,
  ScenarioBaseDesign,
  SoftwarePrototypes,
  StoryboardSlideInput,
  StorageImageRef,
  Storyboarding,
  UsabilityInsight,
  UsabilityTesting,
  UserResearchJourney,
} from "@/app/projects/ar-story-teller/types/designSystemTypes";

import {
  requireString,
  optionalString,
  parseStringArray,
  isRecord,
} from "./parseContentHelpers";

export { parseDesignSystem };

function parseStorageImageRef(value: unknown, path: string): StorageImageRef {
  if (!isRecord(value)) {
    throw new Error(`Invalid ${path}: expected object`);
  }
  return {
    objectPath: requireString(value.objectPath, `${path}.objectPath`),
    alt: requireString(value.alt, `${path}.alt`),
  };
}

function parseOptionalStorageImageRefs(
  value: unknown,
  path: string,
): StorageImageRef[] | undefined {
  if (value === undefined) return undefined;
  if (!Array.isArray(value)) {
    throw new Error(`Invalid ${path}: expected array`);
  }
  return value.map((item, index) =>
    parseStorageImageRef(item, `${path}[${index}]`),
  );
}

function parseFeatureSpecification(
  value: unknown,
  path: string,
): FeatureSpecification {
  if (!isRecord(value)) {
    throw new Error(`Invalid ${path}: expected object`);
  }
  const spec: FeatureSpecification = {
    title: requireString(value.title, `${path}.title`),
  };
  if (value.description !== undefined) {
    spec.description = requireString(value.description, `${path}.description`);
  }
  if (value.desciption !== undefined) {
    spec.desciption = requireString(value.desciption, `${path}.desciption`);
  }
  return spec;
}

function parseInteractionModeSpecs(
  value: unknown,
  path: string,
): InteractionModeSpecs {
  if (!isRecord(value)) {
    throw new Error(`Invalid ${path}: expected object`);
  }
  if (!Array.isArray(value.modes)) {
    throw new Error(`Invalid ${path}.modes: expected array`);
  }
  return {
    title: requireString(value.title, `${path}.title`),
    modes: value.modes.map((mode, index) => {
      if (!isRecord(mode)) {
        throw new Error(`Invalid ${path}.modes[${index}]: expected object`);
      }
      return {
        title: requireString(mode.title, `${path}.modes[${index}].title`),
        description: requireString(
          mode.description,
          `${path}.modes[${index}].description`,
        ),
        image: parseStorageImageRef(
          mode.image,
          `${path}.modes[${index}].image`,
        ),
      };
    }),
  };
}

function parseDevelopingSpecs(value: unknown, path: string): DevelopingSpecs {
  if (!isRecord(value)) {
    throw new Error(`Invalid ${path}: expected object`);
  }

  const specs: DevelopingSpecs = {
    title: requireString(value.title, `${path}.title`),
    paragraphs: parseStringArray(value.paragraphs, `${path}.paragraphs`),
  };

  specs.images = parseOptionalStorageImageRefs(value.images, `${path}.images`);

  if (value.featuresAndSpecifications !== undefined) {
    if (!isRecord(value.featuresAndSpecifications)) {
      throw new Error(`Invalid ${path}.featuresAndSpecifications: expected object`);
    }
    const block = value.featuresAndSpecifications;
    if (!Array.isArray(block.featuresAndSpecifications)) {
      throw new Error(
        `Invalid ${path}.featuresAndSpecifications.featuresAndSpecifications: expected array`,
      );
    }
    specs.featuresAndSpecifications = {
      title: requireString(
        block.title,
        `${path}.featuresAndSpecifications.title`,
      ),
      featuresAndSpecifications: block.featuresAndSpecifications.map(
        (item, index) =>
          parseFeatureSpecification(
            item,
            `${path}.featuresAndSpecifications.featuresAndSpecifications[${index}]`,
          ),
      ),
    };
  }

  if (value.interactionDesignModeSpecifications !== undefined) {
    specs.interactionDesignModeSpecifications = parseInteractionModeSpecs(
      value.interactionDesignModeSpecifications,
      `${path}.interactionDesignModeSpecifications`,
    );
  }

  return specs;
}

function parseBulletPointItem(value: unknown, path: string): BulletPointItem {
  if (!isRecord(value)) {
    throw new Error(`Invalid ${path}: expected object`);
  }
  return {
    icon: requireString(value.icon, `${path}.icon`),
    text: requireString(value.text, `${path}.text`),
  };
}

function parseProcessBullets(value: unknown, path: string): ProcessBullet[] {
  if (!Array.isArray(value)) {
    throw new Error(`Invalid ${path}: expected array`);
  }
  return value.map((item, index) => {
    if (typeof item === "string") {
      return item;
    }
    return parseBulletPointItem(item, `${path}[${index}]`);
  });
}

function parseResearchMethodCard(
  value: unknown,
  path: string,
): DesignSystemResearchMethod {
  if (!isRecord(value)) {
    throw new Error(`Invalid ${path}: expected object`);
  }

  const card: DesignSystemResearchMethod = {
    title: requireString(value.title, `${path}.title`),
  };

  if (value.summary !== undefined) {
    card.summary = requireString(value.summary, `${path}.summary`);
  }
  if (value.approach !== undefined) {
    card.approach = requireString(value.approach, `${path}.approach`);
  }
  if (value.keyTakeaway !== undefined) {
    card.keyTakeaway = requireString(value.keyTakeaway, `${path}.keyTakeaway`);
  }
  if (value.designImplications !== undefined) {
    card.designImplications = requireString(
      value.designImplications,
      `${path}.designImplications`,
    );
  }
  if (value.overview !== undefined) {
    card.overview = parseStringArray(value.overview, `${path}.overview`);
  }
  if (value.keyInsights !== undefined) {
    card.keyInsights = parseStringArray(value.keyInsights, `${path}.keyInsights`);
  }
  if (value.paragraphs !== undefined) {
    card.paragraphs = parseStringArray(value.paragraphs, `${path}.paragraphs`);
  }
  if (value.bulletpoints !== undefined) {
    if (!Array.isArray(value.bulletpoints)) {
      throw new Error(`Invalid ${path}.bulletpoints: expected array`);
    }
    card.bulletpoints = value.bulletpoints.map((item, index) =>
      parseBulletPointItem(item, `${path}.bulletpoints[${index}]`),
    );
  }
  if (value.sectionImages !== undefined) {
    card.sectionImages = parseStringArray(
      value.sectionImages,
      `${path}.sectionImages`,
    );
  }

  return card;
}

function parseUserResearchJourney(
  value: unknown,
  path: string,
): UserResearchJourney {
  if (!isRecord(value)) {
    throw new Error(`Invalid ${path}: expected object`);
  }

  const journey: UserResearchJourney = {
    title: requireString(value.title, `${path}.title`),
    paragraphs: parseStringArray(value.paragraphs, `${path}.paragraphs`),
    alt: requireString(value.alt, `${path}.alt`),
    imagesDescription: requireString(
      value.imagesDescription,
      `${path}.imagesDescription`,
    ),
    images: parseStringArray(value.images, `${path}.images`),
  };

  if (value.methods !== undefined) {
    if (!Array.isArray(value.methods)) {
      throw new Error(`Invalid ${path}.methods: expected array`);
    }
    journey.methods = value.methods.map((item, index) =>
      parseResearchMethodCard(item, `${path}.methods[${index}]`),
    );
  }

  return journey;
}

function parseStoryboardSlide(
  value: unknown,
  path: string,
): StoryboardSlideInput {
  if (!isRecord(value)) {
    throw new Error(`Invalid ${path}: expected object`);
  }
  return {
    alt: requireString(value.alt, `${path}.alt`),
    title: requireString(value.title, `${path}.title`),
    image: requireString(value.image, `${path}.image`),
    description: requireString(value.description, `${path}.description`),
  };
}

function parseStoryboarding(value: unknown, path: string): Storyboarding {
  if (!isRecord(value)) {
    throw new Error(`Invalid ${path}: expected object`);
  }
  return {
    title: requireString(value.title, `${path}.title`),
  };
}

function parseScenarioBaseDesign(
  value: unknown,
  path: string,
): ScenarioBaseDesign {
  if (!isRecord(value)) {
    throw new Error(`Invalid ${path}: expected object`);
  }
  return {
    title: requireString(value.title, `${path}.title`),
    paragraphs: parseStringArray(value.paragraphs, `${path}.paragraphs`),
    storyboarding: parseStoryboarding(
      value.storyboarding,
      `${path}.storyboarding`,
    ),
    images: parseStringArray(value.images, `${path}.images`),
    alt: requireString(value.alt, `${path}.alt`),
  };
}

function parseEnvisionUseCase(value: unknown, path: string): EnvisionUseCase {
  if (!isRecord(value)) {
    throw new Error(`Invalid ${path}: expected object`);
  }

  const envision: EnvisionUseCase = {
    title: requireString(value.title, `${path}.title`),
  };

  if (value.paragraphs !== undefined) {
    envision.paragraphs = parseStringArray(value.paragraphs, `${path}.paragraphs`);
  }

  if (value.storyboard !== undefined) {
    if (!isRecord(value.storyboard)) {
      throw new Error(`Invalid ${path}.storyboard: expected object`);
    }
    const storyboard = value.storyboard;
    if (!Array.isArray(storyboard.storyboardSlides)) {
      throw new Error(`Invalid ${path}.storyboard.storyboardSlides: expected array`);
    }
    envision.storyboard = {
      title: requireString(storyboard.title, `${path}.storyboard.title`),
      storyboardSlides: storyboard.storyboardSlides.map((slide, index) =>
        parseStoryboardSlide(slide, `${path}.storyboard.storyboardSlides[${index}]`),
      ),
    };
  }

  return envision;
}

function parsePrototypingImage(value: unknown, path: string): PrototypingImage {
  if (!isRecord(value)) {
    throw new Error(`Invalid ${path}: expected object`);
  }
  const image: PrototypingImage = {
    objectPath: requireString(value.objectPath, `${path}.objectPath`),
    alt: requireString(value.alt, `${path}.alt`),
  };
  if (value.annotation !== undefined) {
    image.annotation = requireString(value.annotation, `${path}.annotation`);
  }
  if (value.annotationInstruction !== undefined) {
    image.annotationInstruction = requireString(
      value.annotationInstruction,
      `${path}.annotationInstruction`,
    );
  }
  return image;
}

function parsePrototypingMethod(value: unknown, path: string): PrototypingMethod {
  if (!isRecord(value)) {
    throw new Error(`Invalid ${path}: expected object`);
  }
  if (!Array.isArray(value.images)) {
    throw new Error(`Invalid ${path}.images: expected array`);
  }
  return {
    title: requireString(value.title, `${path}.title`),
    alt: requireString(value.alt, `${path}.alt`),
    paragraphs:
      value.paragraphs !== undefined
        ? parseStringArray(value.paragraphs, `${path}.paragraphs`)
        : undefined,
    images: value.images.map((img, index) =>
      parsePrototypingImage(img, `${path}.images[${index}]`),
    ),
  };
}

function parsePrototyping(value: unknown, path: string): Prototyping {
  if (!isRecord(value)) {
    throw new Error(`Invalid ${path}: expected object`);
  }
  const prototyping: Prototyping = {
    title: requireString(value.title, `${path}.title`),
  };
  if (value.paragraphs !== undefined) {
    prototyping.paragraphs = parseStringArray(value.paragraphs, `${path}.paragraphs`);
  }
  if (value.methods !== undefined) {
    if (!Array.isArray(value.methods)) {
      throw new Error(`Invalid ${path}.methods: expected array`);
    }
    prototyping.methods = value.methods.map((method, index) =>
      parsePrototypingMethod(method, `${path}.methods[${index}]`),
    );
  }
  return prototyping;
}

function parseSoftwarePrototypes(
  value: unknown,
  path: string,
): SoftwarePrototypes {
  if (!isRecord(value)) {
    throw new Error(`Invalid ${path}: expected object`);
  }
  const software: SoftwarePrototypes = {
    title: requireString(value.title, `${path}.title`),
    paragraphs: parseStringArray(value.paragraphs, `${path}.paragraphs`),
  };

  if (value.prototypeVideos !== undefined) {
    if (!isRecord(value.prototypeVideos)) {
      throw new Error(`Invalid ${path}.prototypeVideos: expected object`);
    }
    const videosBlock = value.prototypeVideos;
    software.prototypeVideos = {
      title: requireString(videosBlock.title, `${path}.prototypeVideos.title`),
      paragraphs:
        videosBlock.paragraphs !== undefined
          ? parseStringArray(
              videosBlock.paragraphs,
              `${path}.prototypeVideos.paragraphs`,
            )
          : undefined,
      videos: Array.isArray(videosBlock.videos)
        ? videosBlock.videos.map((video, index) => {
            if (!isRecord(video)) {
              throw new Error(
                `Invalid ${path}.prototypeVideos.videos[${index}]: expected object`,
              );
            }
            return {
              title: optionalString(
                video.title,
                `${path}.prototypeVideos.videos[${index}].title`,
              ),
              width: optionalString(
                video.width,
                `${path}.prototypeVideos.videos[${index}].width`,
              ),
              height: optionalString(
                video.height,
                `${path}.prototypeVideos.videos[${index}].height`,
              ),
              description: optionalString(
                video.description,
                `${path}.prototypeVideos.videos[${index}].description`,
              ),
              srcVideo: optionalString(
                video.srcVideo,
                `${path}.prototypeVideos.videos[${index}].srcVideo`,
              ),
            };
          })
        : undefined,
    };
  }

  return software;
}

function parseProcessSection(value: unknown, path: string): ProcessSection {
  if (!isRecord(value)) {
    throw new Error(`Invalid ${path}: expected object`);
  }
  const section: ProcessSection = {
    title: requireString(value.title, `${path}.title`),
  };
  if (value.bulletpoints !== undefined) {
    section.bulletpoints = parseProcessBullets(
      value.bulletpoints,
      `${path}.bulletpoints`,
    );
  }
  return section;
}

function parseUsabilityInsight(value: unknown, path: string): UsabilityInsight {
  if (!isRecord(value)) {
    throw new Error(`Invalid ${path}: expected object`);
  }
  return {
    insightTitle: requireString(value.insightTitle, `${path}.insightTitle`),
    insightDescription: requireString(
      value.insightDescription,
      `${path}.insightDescription`,
    ),
  };
}

function parseFindingsInsights(value: unknown, path: string): FindingsInsights {
  if (!isRecord(value)) {
    throw new Error(`Invalid ${path}: expected object`);
  }
  const findings: FindingsInsights = {
    title: requireString(value.title, `${path}.title`),
  };
  if (value.insights !== undefined) {
    if (!Array.isArray(value.insights)) {
      throw new Error(`Invalid ${path}.insights: expected array`);
    }
    findings.insights = value.insights.map((item, index) =>
      parseUsabilityInsight(item, `${path}.insights[${index}]`),
    );
  }
  return findings;
}

function parseUsabilityTesting(value: unknown, path: string): UsabilityTesting {
  if (!isRecord(value)) {
    throw new Error(`Invalid ${path}: expected object`);
  }
  const testing: UsabilityTesting = {
    title: requireString(value.title, `${path}.title`),
  };
  if (value.paragraphs !== undefined) {
    testing.paragraphs = parseStringArray(value.paragraphs, `${path}.paragraphs`);
  }
  if (value.theProcess !== undefined) {
    testing.theProcess = parseProcessSection(value.theProcess, `${path}.theProcess`);
  }
  if (value.FindingsInsights !== undefined) {
    testing.FindingsInsights = parseFindingsInsights(
      value.FindingsInsights,
      `${path}.FindingsInsights`,
    );
  }
  if (value.dataAnalysis !== undefined) {
    testing.dataAnalysis = parseProcessSection(
      value.dataAnalysis,
      `${path}.dataAnalysis`,
    );
  }
  return testing;
}

function parseDesignSystem(value: unknown, path = "caseStudy.designSystem"): DesignSystem {
  if (!isRecord(value)) {
    throw new Error(`Invalid ${path}: expected object`);
  }

  const designSystem: DesignSystem = {
    title: requireString(value.title, `${path}.title`),
    paragraphs: parseStringArray(value.paragraphs, `${path}.paragraphs`),
    alt: requireString(value.alt, `${path}.alt`),
    imageTitle: requireString(value.imageTitle, `${path}.imageTitle`),
    imageDescription: requireString(
      value.imageDescription,
      `${path}.imageDescription`,
    ),
    images: parseStringArray(value.images, `${path}.images`),
    description: requireString(value.description, `${path}.description`),
    userResearchJourney: parseUserResearchJourney(
      value.userResearchJourney,
      `${path}.userResearchJourney`,
    ),
    developingSpecs: parseDevelopingSpecs(
      value.developingSpecs,
      `${path}.developingSpecs`,
    ),
    softwarePrototypes: parseSoftwarePrototypes(
      value.softwarePrototypes,
      `${path}.softwarePrototypes`,
    ),
  };

  if (value.scenarioBaseDesign !== undefined) {
    designSystem.scenarioBaseDesign = parseScenarioBaseDesign(
      value.scenarioBaseDesign,
      `${path}.scenarioBaseDesign`,
    );
  }

  if (value.prototyping !== undefined) {
    designSystem.prototyping = parsePrototyping(value.prototyping, `${path}.prototyping`);
  }

  if (value.usabilityTesting !== undefined) {
    designSystem.usabilityTesting = parseUsabilityTesting(
      value.usabilityTesting,
      `${path}.usabilityTesting`,
    );
  }

  if (value.researchMethods !== undefined) {
    if (!Array.isArray(value.researchMethods)) {
      throw new Error(`Invalid ${path}.researchMethods: expected array`);
    }
    designSystem.researchMethods = value.researchMethods.map((item, index) =>
      parseResearchMethodCard(item, `${path}.researchMethods[${index}]`),
    );
  }

  if (value.envisionUseCase !== undefined) {
    designSystem.envisionUseCase = parseEnvisionUseCase(
      value.envisionUseCase,
      `${path}.envisionUseCase`,
    );
  }

  return designSystem;
}
