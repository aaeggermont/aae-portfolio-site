"use client";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import BusinessChallengeCard from "@/app/projects/finding-nemo/components/BusinessChallengeCard";
import FullBleedBand from "@/app/projects/finding-nemo/components/FullBleedBand";
import MyContributions from "@/app/projects/finding-nemo/components/MyContributions";
import Overview from "@/app/projects/finding-nemo/components/Overview";
import ProjectHeader from "@/app/projects/finding-nemo/components/ProjectHeader";
import SectionParagraph from "@/app/projects/finding-nemo/components/SectionParagraph";
import { BAND_COLORS } from "@/app/projects/finding-nemo/layoutConfig";
import type { FindingNemoProjectDocument } from "@/app/projects/finding-nemo/lib/finding-nemo.firestore";

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
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  flexWrap: { xs: "nowrap", md: "wrap" },
                  justifyContent: "center",
                  alignItems: { xs: "center", md: "stretch" },
                  gap: { xs: 3, md: 3, lg: 4 },
                }}
              >
                {project.businessOpportunities.cards.map((card) => (
                  <BusinessChallengeCard
                    key={card.title}
                    title={card.title}
                    description={card.description}
                  />
                ))}
              </Box>
            </Stack>
          </FullBleedBand>
        </>
      ) : null}
    </Box>
  );
}
