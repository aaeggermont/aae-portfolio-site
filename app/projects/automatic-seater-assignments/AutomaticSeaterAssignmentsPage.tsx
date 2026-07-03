"use client";

import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";

import styles from "./automatic-seater-assignments.module.scss";
import TestSignOutButton from "./components/Signout";
import ImageBanner from "./components/ImageBanner";
import OverviewSection from "./components/OverviewSection";
import MyContributions from "./components/MyContributions";
import ChallengeCard from "./components/ChallengeCard";
import PreviewDemo from "./components/PreviewDemo";
import MainSolutionParagraph from "./components/MainSolutionParagraph";
import StandardParagraphBlock from "./components/StandardParagraphBlock";
import ResearchMethod from "./components/ResearchMethod";
import { ResearchMethodImageBlock } from "./components/ResearchMethodImageBlock";
import FullBleedBand from "./components/FullBleedBand";
import type { AutomaticSeaterAssignmentsProjectDocument } from "./lib/automatic-seater-assignments.firestore";
import {
  FULL_BLEED_BAND_PADDINGS,
  INTRO_SECTIONS_BACKGROUND,
  layoutContentContainerSx,
  sectionGapSx,
  sectionRowGapSx,
} from "./layoutConfig";
import { useResponsive } from "@/lib/responsive/ResponsiveQueryProvider";
import { breakpointMediaQuery } from "@/lib/responsive/breakpoints";

type AutomaticSeaterAssignmentsPageProps = {
  project: AutomaticSeaterAssignmentsProjectDocument;
};

export function AutomaticSeaterAssignmentsPage({
  project,
}: AutomaticSeaterAssignmentsPageProps) {
  const { isDesktopOrLaptop, isTablet, isMobile } = useResponsive();

  const viewportBand =
    isMobile ? "mobile" : isTablet ? "tablet" : isDesktopOrLaptop ? "desktop" : "unknown";

  return (
    <div className={styles.pageClipViewport}>
      <div
        className={styles.page}
        data-viewport-band={viewportBand}
      >
        <FullBleedBand withVerticalPadding={false} constrainContent={false}>
          <ImageBanner data={project.imageBanner} />
        </FullBleedBand>

        <FullBleedBand backgroundColor={INTRO_SECTIONS_BACKGROUND}>
          <Stack spacing={6} alignItems="center" sx={{ width: "100%" }}>
            <OverviewSection data={project.overviewSection} />
            <MyContributions data={project.myContributions} />
            <ChallengeCard data={project.challengeCard} />
          </Stack>
        </FullBleedBand>

        <FullBleedBand backgroundColor={INTRO_SECTIONS_BACKGROUND}>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 6,
              borderRadius: "16px",
            }}
          >
            <MainSolutionParagraph data={project.mainSolution} />
            <PreviewDemo data={project.previewDemo} />
          </Box>
        </FullBleedBand>

        <FullBleedBand
          constrainContent={false}
          withVerticalPadding={false}
          sx={{
            background:
              "linear-gradient(180deg, rgba(64,126,192,1) 0%, rgba(3,4,5,1) 10%)",
            minHeight: "100vh",
            py: FULL_BLEED_BAND_PADDINGS.y.mobile,
            [breakpointMediaQuery.tabletUp]: {
              py: FULL_BLEED_BAND_PADDINGS.y.tablet,
            },
            [breakpointMediaQuery.desktopUp]: {
              py: FULL_BLEED_BAND_PADDINGS.y.desktop,
            },
            gap: { xs: 2, sm: 2, md: 2, lg: 3 },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <StandardParagraphBlock
            title={project.narrative.starToursCaseStudyTitle}
            subtitle={project.narrative.starToursCaseStudySubtitle}
            paragraphs={project.narrative.starToursIntroParagraphs}
            paragraphReadMore={project.narrative.starToursIntroReadMore}
          />

          <StandardParagraphBlock
            subtitle={project.narrative.humanCenteredDesignProcessSubtitle}
            paragraphs={project.narrative.humanCenteredDesignProcessParagraphs}
          />

          <Container maxWidth={false} sx={{ ...layoutContentContainerSx, py: 2 }}>
            <ResearchMethodImageBlock
              block={project.figures.humanCenteredDesignIllustration}
            />
          </Container>
          {/* user research section 
          <StandardParagraphBlock
            title={project.narrative.userResearchSectionTitle}
            subtitle={project.narrative.userResearchSectionSubtitle}
            paragraphs={project.narrative.userResearchLeadInParagraphs}
            paragraphReadMore={project.narrative.userResearchLeadInReadMore}
            paddingTop={{ xs: 4, sm: 4, md: 4, lg: 4 }}
            paddingBottom={{ xs: 0, sm: 0, md: 0, lg: 0 }}
          />*/}

          <Box
            sx={{
              ...sectionGapSx,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Stack
              sx={{
                ...sectionRowGapSx,
                width: "100%",
                alignItems: "center",
              }}
            >
              {project.researchMethods.map((block) => (
                <ResearchMethod key={block.id} data={block} />
              ))}
            </Stack>

            <Container
              maxWidth={false}
              sx={layoutContentContainerSx}
            >
              <Stack
                sx={{
                  ...sectionRowGapSx,
                  width: "100%",
                  alignItems: "center",
                }}
              >
                <StandardParagraphBlock
                  embedded
                  title={project.sections.projectOutcomes.title}
                  paragraphs={project.sections.projectOutcomes.paragraphs}
                  maxWidth={660}
                />

                <StandardParagraphBlock
                  embedded
                  title={project.sections.finalResultsKeyMetrics.title}
                  subtitle={project.sections.finalResultsKeyMetrics.subtitle}
                  bullets={project.sections.finalResultsKeyMetrics.contentBlocks.flatMap(
                    (block) => (block.type === "bullets" ? block.items : []),
                  )}
                  maxWidth={660}
                />

                <StandardParagraphBlock
                  embedded
                  title={project.sections.nextSteps.title}
                  subtitle={project.sections.nextSteps.subtitle}
                  bullets={project.sections.nextSteps.contentBlocks.flatMap((block) =>
                    block.type === "bullets" ? block.items : [],
                  )}
                  maxWidth={660}
                />
              </Stack>
            </Container>
          </Box>
        </FullBleedBand>

        <div className={styles.container}>
          <TestSignOutButton />
        </div>
      </div>
    </div>
  );
}
