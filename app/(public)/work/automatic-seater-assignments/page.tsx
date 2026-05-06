"use client";

import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import styles from "./automatic-seater-assignments.module.scss";
import ProjectAccessGate from "@/lib/access/ProjectAccessGate";
import { useResponsive } from "@/lib/responsive/ResponsiveQueryProvider";
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
import { automaticSeaterAssignmentsDataProject } from "@/scripts/automatic-seater-assignments.data";
import {
  subscribeAutomaticSeaterAssignmentsProject,
  type AutomaticSeaterAssignmentsProjectDocument,
} from "./automatic-seater-assignments.firestore";
import { breakpointPx } from "@/lib/responsive/breakpoints";

export default function AutomaticSeaterAssignmentsPage() {
  const { isDesktopOrLaptop, isTablet, isMobile } = useResponsive();
  const [project, setProject] = React.useState<AutomaticSeaterAssignmentsProjectDocument>(
    automaticSeaterAssignmentsDataProject,
  );
  const [snapshotVersion, setSnapshotVersion] = React.useState(0);

  React.useEffect(() => {
    const unsubscribe = subscribeAutomaticSeaterAssignmentsProject(
      (projectFromDb) => {
        setProject(projectFromDb);
        setSnapshotVersion((prev) => prev + 1);
      },
      (error) => {
        console.warn(
          "[automatic-seater-assignments] Firestore realtime read failed; using local fallback data.",
          error,
        );
      },
    );

    return unsubscribe;
  }, []);

  const viewportBand =
    isMobile ? "mobile" : isTablet ? "tablet" : isDesktopOrLaptop ? "desktop" : "unknown";

  return (
    <ProjectAccessGate
      projectId={project.project.projectId}
      projectKey={project.project.projectKey}
      title={project.gateTitle}
    >
      <div className={styles.pageClipViewport}>
        <div
          key={snapshotVersion}
          className={styles.page}
          data-viewport-band={viewportBand}
        >
        <div className={`${styles.banner} ${styles.bannerFullBleed}`}>
          <ImageBanner data={project.imageBanner} />
        </div>
        <div className={styles.overviewFullBleed}>
          <OverviewSection data={project.overviewSection} />
        </div>
        <div className={styles.previewDemoFullBleed}>
          <Box 
            sx={{ 
              width: "100%", 
              mx: "auto",
              px: 2, 
              py: 4,
              paddingTop: 8,
              paddingBottom: 8,
              [`@media (min-width: ${breakpointPx.tabletMin}px)`]: {
                paddingTop: 10,
                paddingBottom: 10,
              },
              [`@media (min-width: ${breakpointPx.desktopMin}px)`]: {
                paddingTop: 16,
                paddingBottom: 16,
              },
              backgroundColor: "white",
              borderRadius: "16px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              alignContent: "center",
              gap: 6,
              justifyContent: "center",
            }}>
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
                maxWidth: 1100,
                mx: "auto",
                px: 2,
                py: 4,
              }}
            >
              <ProjectOverviewCard data={project.projectOverviewCard} />
              <KeyBenefitsCard data={project.keyBenefitsCard} />
            </Box>
          </Box>
          
            <Box
              sx={{
                background:
                  "linear-gradient(180deg, rgba(64,126,192,1) 0%, rgba(3,4,5,1) 10%)",
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                mx: "auto",
                py: 4,
                paddingTop: 8,
                paddingBottom: 8,
                gap: {xs: 2, sm: 2, md: 2, lg: 3},
                [`@media (min-width: ${breakpointPx.tabletMin}px)`]: {
                  paddingTop: 10,
                  paddingBottom: 10,
                },
                [`@media (min-width: ${breakpointPx.desktopMin}px)`]: {
                  paddingTop: 16,
                  paddingBottom: 16,
                },
              }}>
              <StandardParagraphBlock
                title={project.narrative.starToursCaseStudyTitle}
                paragraphs={project.narrative.starToursIntroParagraphs}
                paragraphReadMore={project.narrative.starToursIntroReadMore}
              />

              <Container maxWidth="lg" sx={{ py: 2 }}>
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
                  <ResearchMethod key={block.id} data={block} />
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
            </Box>
        </div>
        <div className={styles.container}>
          <TestSignOutButton />
        </div>
        </div>
      </div>
    </ProjectAccessGate>
  );
}
