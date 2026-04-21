"use client";

import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
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
import { researchMethodSectionData } from "./researchMethodSectionData";
import { breakpointPx } from "@/lib/responsive/breakpoints";

const PROJECT_ID = 4;
const PROJECT_KEY = "project_4";

const STAR_TOURS_CASE_STUDY_TITLE = "Star Tours Case Study";

const STAR_TOURS_CASE_STUDY_PARAGRAPHS = [
  "Star Tours is a motion simulator attraction available at several Disney theme parks, based on the original Star Wards film series created by George Lucas. Set in the Star Wars universe, the attraction sends Guests on a turbulent trip across the galaxy, as droids C-3PO and R2-D2 attempt to safely return a spy to the Rebel Alliance.",
  "The Star Tours attraction was the best fit to test the inception and adoption of the Automatic Seater. This attraction was chosen because of the very high guest attendance with long waiting times and a desire of a seating more than one party per row. The complexity for Cast Member of seating manually at such locations with added social-distancing constraints can be very complex and time consuming.",
  "A Human Centered Design approach was employed during the design, development and implementation phases where Human Computer Interaction(HCI) was a essential methodology during the initial analysis phase.",
];

export default function AutomaticSeaterAssignmentsPage() {
  const { isDesktopOrLaptop, isTablet, isMobile } = useResponsive();

  const viewportBand =
    isMobile ? "mobile" : isTablet ? "tablet" : isDesktopOrLaptop ? "desktop" : "unknown";

  return (
    <ProjectAccessGate
      projectId={PROJECT_ID}
      projectKey={PROJECT_KEY}
      title="Automatic Seating Assignments"
    >
      <div className={styles.pageClipViewport}>
        <div className={styles.page} data-viewport-band={viewportBand}>
        <div className={`${styles.banner} ${styles.bannerFullBleed}`}>
          <ImageBanner />
        </div>
        <div className={styles.overviewFullBleed}>
          <OverviewSection />
         
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
            <MainSolutionParagraph />
            <PreviewDemo />
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
              <ProjectOverviewCard />
              <KeyBenefitsCard />
            </Box>
          </Box>
          
            <Box
              sx={{
                background:
                  "linear-gradient(180deg, rgba(64,126,192,1) 0%, rgba(3,4,5,1) 77%)",
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
              }}>
              <StandardParagraphBlock
                title={STAR_TOURS_CASE_STUDY_TITLE}
                paragraphs={STAR_TOURS_CASE_STUDY_PARAGRAPHS}
              />
              <ResearchMethod data={researchMethodSectionData} />
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
