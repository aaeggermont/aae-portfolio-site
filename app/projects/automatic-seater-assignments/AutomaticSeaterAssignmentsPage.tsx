"use client";

import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";

import styles from "./automatic-seater-assignments.module.scss";
import TestSignOutButton from "./components/Signout";
import ImageBanner from "./components/ImageBanner";
import OverviewSection from "./components/OverviewSection";
import PreviewDemo from "./components/PreviewDemo";
import MainSolutionParagraph from "./components/MainSolutionParagraph";
import ProjectOverviewCard from "./components/ProjectOverviewCard";
import KeyBenefitsCard from "./components/KeyBenefitsCard";
import StandardParagraphBlock from "./components/StandardParagraphBlock";
import ResearchMethod from "./components/ResearchMethod";
import { ResearchMethodImageBlock } from "./components/ResearchMethodImageBlock";
import FullBleedBand from "./components/FullBleedBand";
import type { AutomaticSeaterAssignmentsProjectDocument } from "./lib/automatic-seater-assignments.firestore";
import {
  FULL_BLEED_BAND_PADDINGS,
  layoutContentContainerSx,
  PANEL_CONTENT_MAX_WIDTH_PX,
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
        <FullBleedBand withVerticalPadding={false}>
          <ImageBanner data={project.imageBanner} />
        </FullBleedBand>

        <FullBleedBand backgroundColor={project.overviewSection.background}>
          <OverviewSection data={project.overviewSection} />
        </FullBleedBand>

        <FullBleedBand backgroundColor="#ffffff">
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
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                alignItems: "center",
                gap: 6,
                justifyContent: "center",
                width: "100%",
                maxWidth: PANEL_CONTENT_MAX_WIDTH_PX,
                mx: "auto",
              }}
            >
              <ProjectOverviewCard data={project.projectOverviewCard} />
              <KeyBenefitsCard data={project.keyBenefitsCard} />
            </Box>
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
            paragraphs={project.narrative.starToursIntroParagraphs}
            paragraphReadMore={project.narrative.starToursIntroReadMore}
          />

          <Container maxWidth={false} sx={{ ...layoutContentContainerSx, py: 2 }}>
            <ResearchMethodImageBlock
              block={project.figures.humanCenteredDesignIllustration}
            />
          </Container>

          <StandardParagraphBlock
            title={project.narrative.userResearchSectionTitle}
            paragraphs={project.narrative.userResearchLeadInParagraphs}
            paragraphReadMore={project.narrative.userResearchLeadInReadMore}
            paddingTop={{ xs: 4, sm: 4, md: 4, lg: 4 }}
            paddingBottom={{ xs: 0, sm: 0, md: 0, lg: 0 }}
          />

          <Stack
            spacing={8}
            sx={{
              width: "100%",
              alignItems: "stretch",
            }}
          >
            {project.researchMethods.map((block) => (
              <ResearchMethod
                key={block.id}
                data={block}
              />
            ))}
          </Stack>

          <StandardParagraphBlock
            title={project.sections.finalResultsKeyMetrics.title}
            bullets={project.sections.finalResultsKeyMetrics.contentBlocks.flatMap(
              (block) => (block.type === "bullets" ? block.items : []),
            )}
            paddingTop={{ xs: 8, sm: 8, md: 10, lg: 12 }}
            paddingBottom={{ xs: 0, sm: 0, md: 0, lg: 0 }}
          />

          <StandardParagraphBlock
            title={project.sections.nextSteps.title}
            bullets={project.sections.nextSteps.contentBlocks.flatMap((block) =>
              block.type === "bullets" ? block.items : [],
            )}
            paddingTop={{ xs: 4, sm: 4, md: 4, lg: 12 }}
            paddingBottom={{ xs: 0, sm: 0, md: 0, lg: 0 }}
          />
        </FullBleedBand>

        <div className={styles.container}>
          <TestSignOutButton />
        </div>
      </div>
    </div>
  );
}
