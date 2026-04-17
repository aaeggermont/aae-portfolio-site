"use client";

import React from "react";
import Box from "@mui/material/Box";
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
import { breakpointPx } from "@/lib/responsive/breakpoints";

const PROJECT_ID = 4;
const PROJECT_KEY = "project_4";

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
        </div>
        <div className={styles.container}>
          <TestSignOutButton />
        </div>
      </div>
    </ProjectAccessGate>
  );
}
