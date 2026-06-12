"use client";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import BusinessChallengeCard, {
  CHALLENGES_CARD_HEIGHT_PX,
} from "@/app/projects/finding-nemo/components/BusinessChallengeCard";
import FullBleedBand from "@/app/projects/finding-nemo/components/FullBleedBand";
import MyContributions from "@/app/projects/finding-nemo/components/MyContributions";
import Overview from "@/app/projects/finding-nemo/components/Overview";
import ProjectHeader from "@/app/projects/finding-nemo/components/ProjectHeader";
import SectionParagraph from "@/app/projects/finding-nemo/components/SectionParagraph";
import {
  BAND_COLORS,
  SECTION_GAPS,
  SOLUTION_OVERVIEW_IMAGE_DISPLAY,
} from "@/app/projects/finding-nemo/layoutConfig";
import type { FindingNemoProjectDocument } from "@/app/projects/finding-nemo/lib/finding-nemo.firestore";
import { breakpointMediaQuery } from "@/lib/responsive/breakpoints";
import ProjectImage from "@/lib/media/ProjectImage";

const challengeCardsRowSx = {
  width: "100%",
  display: "flex",
  flexDirection: { xs: "column", md: "row" },
  flexWrap: { xs: "nowrap", md: "wrap" },
  justifyContent: "center",
  alignItems: { xs: "center", md: "stretch" },
  gap: { xs: 3, md: 3, lg: 4 },
} as const;

const solutionOverviewImageSizes = [
  `(max-width: 767px) ${SOLUTION_OVERVIEW_IMAGE_DISPLAY.mobile.width}px`,
  `(max-width: 1023px) ${SOLUTION_OVERVIEW_IMAGE_DISPLAY.tablet.width}px`,
  `${SOLUTION_OVERVIEW_IMAGE_DISPLAY.desktop.width}px`,
].join(", ");

const solutionOverviewImageBoxSx = {
  width: `${SOLUTION_OVERVIEW_IMAGE_DISPLAY.mobile.width}px`,
  maxWidth: "100%",
  [breakpointMediaQuery.tabletUp]: {
    width: `${SOLUTION_OVERVIEW_IMAGE_DISPLAY.tablet.width}px`,
  },
  [breakpointMediaQuery.desktopUp]: {
    width: `${SOLUTION_OVERVIEW_IMAGE_DISPLAY.desktop.width}px`,
  },
} as const;

type FindingNemoPageProps = {
  project: FindingNemoProjectDocument | null;
  onProjectHeaderReady?: () => void;
};

export function FindingNemoPage({
  project,
  onProjectHeaderReady,
}: FindingNemoPageProps) {
  const hasProject = project != null;

  return (
    <Box component="main">
      {hasProject ? (
        <>
          <ProjectHeader
            data={project.projectHeader}
            onReady={onProjectHeaderReady}
          />
          <Overview data={project.overview} />
          <MyContributions data={project.myContributions} />
          <FullBleedBand backgroundColor={BAND_COLORS.businessOpportunities}>
            <Stack spacing={{ xs: 4, md: 6 }}>
              <SectionParagraph
                title={project.businessOpportunities.title}
                body={project.businessOpportunities.paragraphs}
              />
              <Box sx={challengeCardsRowSx}>
                {project.businessOpportunities.cards.map((card) => (
                  <BusinessChallengeCard
                    key={card.title}
                    title={card.title}
                    description={card.description}
                  />
                ))}
              </Box>
            </Stack>
            <Stack
              spacing={{ xs: 4, md: 6 }}
              sx={{
                mt: SECTION_GAPS.mobile,
                [breakpointMediaQuery.tabletUp]: {
                  mt: SECTION_GAPS.tablet,
                },
                [breakpointMediaQuery.desktopUp]: {
                  mt: SECTION_GAPS.desktop,
                },
              }}
            >
              <SectionParagraph
                title={project.challenges.title}
                body={project.challenges.paragraphs}
              />
              <Box sx={challengeCardsRowSx}>
                {project.challenges.cards.map((card) => (
                  <BusinessChallengeCard
                    key={card.title}
                    title={card.title}
                    description={card.description}
                    heightPx={CHALLENGES_CARD_HEIGHT_PX}
                  />
                ))}
              </Box>
            </Stack>
          </FullBleedBand>
          <FullBleedBand backgroundColor={BAND_COLORS.neutralPanel}>
            <Stack spacing={{ xs: 4, md: 6 }}>
              <SectionParagraph
                title={project.solutionOverview.title}
                body={project.solutionOverview.paragraphs}
              />
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Box sx={solutionOverviewImageBoxSx}>
                  <ProjectImage
                    objectPath={project.solutionOverview.image.objectPath}
                    alt={project.solutionOverview.image.alt}
                    width={project.solutionOverview.image.width}
                    height={project.solutionOverview.image.height}
                    sizes={solutionOverviewImageSizes}
                    style={{
                      display: "block",
                      width: "100%",
                      height: "auto",
                    }}
                  />
                </Box>
              </Box>
            </Stack>
          </FullBleedBand>
        </>
      ) : null}
    </Box>
  );
}
