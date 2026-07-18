"use client";

import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import { useSetAtom } from "jotai";

import styles from "./automatic-seater-assignments.module.scss";
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
import StarFieldAtmosphere from "./components/StarFieldAtmosphere";
import StarToursCaseStudyLogo from "./components/StarToursCaseStudyLogo";
import type { AutomaticSeaterAssignmentsProjectDocument } from "./lib/automatic-seater-assignments.firestore";
import {
  FULL_BLEED_BAND_PADDINGS,
  INTRO_SECTIONS_BACKGROUND,
  layoutContentContainerSx,
  sectionGapSx,
  sectionRowGapSx,
} from "./layoutConfig";
import { AUTOMATIC_SEATER_HEADER_THEME } from "./headerTheme";
import { AUTOMATIC_SEATER_FOOTER_THEME } from "./footerTheme";
import { useResponsive } from "@/lib/responsive/ResponsiveQueryProvider";
import { breakpointMediaQuery } from "@/lib/responsive/breakpoints";
import { layoutState } from "@/app/(public)/layout-state";
import {
  defaultHeaderState,
  headerState,
} from "@/components/Header/HeaderState";
import {
  defaultFooterState,
  footerState,
} from "@/components/Footer/FooterState";

type AutomaticSeaterAssignmentsPageProps = {
  project: AutomaticSeaterAssignmentsProjectDocument;
};

export function AutomaticSeaterAssignmentsPage({
  project,
}: AutomaticSeaterAssignmentsPageProps) {
  const { isDesktopOrLaptop, isTablet, isMobile } = useResponsive();
  const setLayoutState = useSetAtom(layoutState);
  const setHeaderState = useSetAtom(headerState);
  const setFooterState = useSetAtom(footerState);

  const viewportBand =
    isMobile ? "mobile" : isTablet ? "tablet" : isDesktopOrLaptop ? "desktop" : "unknown";

  useEffect(() => {
    setLayoutState({ isFullWidth: true });
    setHeaderState({ ...AUTOMATIC_SEATER_HEADER_THEME });
    setFooterState({ ...AUTOMATIC_SEATER_FOOTER_THEME });

    return () => {
      setLayoutState({ isFullWidth: false });
      setHeaderState({ ...defaultHeaderState });
      setFooterState({ ...defaultFooterState });
    };
  }, [setLayoutState, setHeaderState, setFooterState]);

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
          <Stack
            alignItems="center"
            sx={{ ...sectionRowGapSx, width: "100%" }}
          >
            <OverviewSection data={project.overviewSection} />
            <MyContributions data={project.myContributions} />
            <ChallengeCard data={project.challengeCard} />
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
          </Stack>
        </FullBleedBand>

        <FullBleedBand
          constrainContent={false}
          withVerticalPadding={false}
          sx={{
            position: "relative",
            isolation: "isolate",
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
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <StarFieldAtmosphere />

          <Box
            sx={{
              position: "relative",
              zIndex: 1,
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: { xs: 2, sm: 2, md: 2, lg: 3 },
            }}
          >
          <StarToursCaseStudyLogo />

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
            <Container maxWidth={false} sx={{ ...layoutContentContainerSx, pt: 2 }}>
              <ResearchMethodImageBlock
                block={project.figures.humanCenteredDesignIllustration}
              />
            </Container>

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
          </Box>
        </FullBleedBand>
      </div>
    </div>
  );
}
