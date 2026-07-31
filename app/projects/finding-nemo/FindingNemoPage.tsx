"use client";

import { useEffect, useMemo, useState } from "react";
import { useSetAtom } from "jotai";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import DesigningHumanCenteredAiSection from "@/app/projects/finding-nemo/components/DesigningHumanCenteredAiSection";
import ComputerVisionPipelineCard from "@/app/projects/finding-nemo/components/ComputerVisionPipelineCard";
import IdentifyAiOpportunitySection from "@/app/projects/finding-nemo/components/IdentifyAiOpportunitySection";
import StageSectionHeader from "@/app/projects/finding-nemo/components/StageSectionHeader";
import StageInfoCardsRow from "@/app/projects/finding-nemo/components/StageInfoCardsRow";
import FullBleedBand from "@/app/projects/finding-nemo/components/FullBleedBand";
import MobileExperienceMockup from "@/app/projects/finding-nemo/components/MobileExperienceMockup";
import MetadataDrivenArchitectureCard from "@/app/projects/finding-nemo/components/MetadataDrivenArchitectureCard";
import MyContributions from "@/app/projects/finding-nemo/components/MyContributions";
import Overview from "@/app/projects/finding-nemo/components/Overview";
import ProblemDemoPanel from "@/app/projects/finding-nemo/components/ProbleDemoCarousel";
import PanelSection from "@/app/projects/finding-nemo/components/PanelSection";
import PersonasRow from "@/app/projects/finding-nemo/components/PersonasRow";
import ProjectHeader from "@/app/projects/finding-nemo/components/ProjectHeader";
import ProjectMetaBar from "@/app/projects/finding-nemo/components/ProjectMetaBar";
import RecognitionDialog from "@/app/projects/finding-nemo/components/RecognitionDialog";
import SectionParagraph from "@/app/projects/finding-nemo/components/SectionParagraph";
import SolutionOverviewSection from "@/app/projects/finding-nemo/components/SolutionOverviewSection";
import { interactiveCardHoverSx } from "@/app/projects/finding-nemo/components/interactiveCardStyles";
import { bodyTypeSx, FINDING_NEMO_HEADLINE_COLOR, titleTypeSx } from "@/app/projects/finding-nemo/typography";
import {
  BAND_COLORS,
  IDENTIFY_AI_OPPORTUNITY_CARD,
  LAYOUT_DIMENSIONS,
  MOBILE_EXPERIENCE_MOCKUP_GAPS,
  PANEL_CONTENT_MAX_WIDTH_PX,
  PANEL_COLORS,
  PANEL_SECTION_GAPS,
  PANEL_SHELL_SX,
  SECTION_GAPS,
  SECTION_TITLE_CONTENT_GAP,
  sectionTitleContentGapMtSx,
  CONCEPTUAL_MVP_ARCHITECTURE_ILLUSTRATION_DISPLAY,
} from "@/app/projects/finding-nemo/layoutConfig";
import { FINDING_NEMO_HEADER_THEME } from "@/app/projects/finding-nemo/headerTheme";
import { FINDING_NEMO_FOOTER_THEME } from "@/app/projects/finding-nemo/footerTheme";
import type { FindingNemoProjectDocument } from "@/app/projects/finding-nemo/lib/finding-nemo.firestore";
import { layoutState } from "@/app/(public)/layout-state";
import {
  defaultHeaderState,
  headerState,
} from "@/components/Header/HeaderState";
import {
  defaultFooterState,
  footerState,
} from "@/components/Footer/FooterState";
import { breakpointMediaQuery } from "@/lib/responsive/breakpoints";
import ProjectImageLightbox from "@/lib/media/ProjectImageLightbox";

const mobileExperienceMockupsRowSx = {
  width: "100%",
  maxWidth: `${PANEL_CONTENT_MAX_WIDTH_PX}px`,
  mx: "auto",
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  alignItems: "start",
  justifyItems: "center",
  columnGap: "12px",
  rowGap: MOBILE_EXPERIENCE_MOCKUP_GAPS.mobile,
  [breakpointMediaQuery.tabletUp]: {
    gap: MOBILE_EXPERIENCE_MOCKUP_GAPS.tablet,
  },
  [breakpointMediaQuery.desktopUp]: {
    gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
    gap: MOBILE_EXPERIENCE_MOCKUP_GAPS.desktop,
  },
} as const;

const ARCHITECTURE_TECHNOLOGY_LIGHTBOX_ID =
  "finding-nemo-architecture-technology";

const ARCHITECTURAL_PRINCIPLE_CARD_WIDTH = {
  mobile: 360,
  tablet: 360,
  desktop: 360,
} as const;

const ARCHITECTURAL_PRINCIPLE_WIDE_DESKTOP_WIDTH_PX = 257;

const conceptualMvpArchitectureImageBoxSx = {
  width: `${CONCEPTUAL_MVP_ARCHITECTURE_ILLUSTRATION_DISPLAY.mobile.width}px`,
  maxWidth: "100%",
  [breakpointMediaQuery.tabletUp]: {
    width: `${CONCEPTUAL_MVP_ARCHITECTURE_ILLUSTRATION_DISPLAY.tablet.width}px`,
  },
  [breakpointMediaQuery.desktopUp]: {
    width: `${CONCEPTUAL_MVP_ARCHITECTURE_ILLUSTRATION_DISPLAY.desktop.width}px`,
  },
} as const;

const panelSectionStackSx = {
  gap: PANEL_SECTION_GAPS.mobile,
  [breakpointMediaQuery.tabletUp]: {
    gap: PANEL_SECTION_GAPS.tablet,
  },
  [breakpointMediaQuery.desktopUp]: {
    gap: PANEL_SECTION_GAPS.desktop,
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
  const setLayoutState = useSetAtom(layoutState);
  const setHeaderState = useSetAtom(headerState);
  const setFooterState = useSetAtom(footerState);
  const [recognitionOpen, setRecognitionOpen] = useState(false);
  const hasProject = project != null;

  const recognitionDialogTitle = useMemo(() => {
    if (!project?.projectHeader) return "";
    const headline = project.projectHeader.awardLines.filter(
      (line) => !/view recognition/i.test(line),
    );
    return `🏆 ${headline.join(" ")}`;
  }, [project?.projectHeader]);

  useEffect(() => {
    setLayoutState({ isFullWidth: true });
    setHeaderState({ ...FINDING_NEMO_HEADER_THEME });
    setFooterState({ ...FINDING_NEMO_FOOTER_THEME });

    return () => {
      setLayoutState({ isFullWidth: false });
      setHeaderState({ ...defaultHeaderState });
      setFooterState({ ...defaultFooterState });
    };
  }, [setLayoutState, setHeaderState, setFooterState]);

  return (
    <Box component="main">
      {hasProject ? (
        <>
          <ProjectHeader
            data={project.projectHeader}
            onReady={onProjectHeaderReady}
          />
          <ProjectMetaBar
            items={project.projectMetaBar ?? []}
            onOpenRecognition={
              project.projectHeader.recognition
                ? () => setRecognitionOpen(true)
                : undefined
            }
          />
          {project.projectHeader.recognition ? (
            <RecognitionDialog
              open={recognitionOpen}
              onClose={() => setRecognitionOpen(false)}
              title={recognitionDialogTitle}
              data={project.projectHeader.recognition}
            />
          ) : null}
          <Overview data={project.overview} />
          {project.problemDemoPanel ? (
            <ProblemDemoPanel data={project.problemDemoPanel} />
          ) : null}
          <SolutionOverviewSection data={project.solutionOverview} />
          <MyContributions data={project.myContributions} />
          <DesigningHumanCenteredAiSection data={project.designingHumanCenteredAi} />
          <IdentifyAiOpportunitySection
            framing={project.problemSpaceFraming}
            challenges={project.challenges}
            businessOpportunities={project.businessOpportunities}
          />
          <FullBleedBand backgroundColor={BAND_COLORS.defineAiSolution}>
            <StageSectionHeader
              sectionLabel={project.solutionOverview.sectionLabel}
              title={project.solutionOverview.title}
            />
            {project.mobileExperienceConcepts.paragraphAfterSubtitle ? (
              <Stack sx={sectionTitleContentGapMtSx}>
                <SectionParagraph
                  body={[
                    project.mobileExperienceConcepts.paragraphAfterSubtitle,
                    ...project.primaryUsers.paragraphs,
                  ]}
                />
              </Stack>
            ) : null}
            {project.mobileExperienceConcepts.conceptEvolutionPanel ? (
              <Stack
                spacing={1}
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
                {project.mobileExperienceConcepts.conceptEvolutionLabel ? (
                  <Typography
                    component="p"
                    sx={titleTypeSx("smallCaption", {
                      color: "#0B6E9F",
                      fontWeight: 700,
                      lineHeight: 1.2,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      m: 0,
                    })}
                  >
                    {project.mobileExperienceConcepts.conceptEvolutionLabel}
                  </Typography>
                ) : null}
                <PanelSection
                  {...project.mobileExperienceConcepts.conceptEvolutionPanel}
                />
              </Stack>
            ) : null}
            {project.mobileExperienceConcepts.corePrinciplesPanel ? (
              <Stack
                spacing={1}
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
                {project.mobileExperienceConcepts.corePrinciplesLabel ? (
                  <Typography
                    component="p"
                    sx={titleTypeSx("smallCaption", {
                      color: "#0B6E9F",
                      fontWeight: 700,
                      lineHeight: 1.2,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      m: 0,
                    })}
                  >
                    {project.mobileExperienceConcepts.corePrinciplesLabel}
                  </Typography>
                ) : null}
                <PanelSection
                  {...project.mobileExperienceConcepts.corePrinciplesPanel}
                  panelBackgroundColor={PANEL_COLORS.default}
                />
              </Stack>
            ) : null}
            <Stack
              spacing={{ xs: 4, md: 6 }}
              sx={{
                mt: SECTION_TITLE_CONTENT_GAP.mobile,
                [breakpointMediaQuery.tabletUp]: {
                  mt: SECTION_TITLE_CONTENT_GAP.tablet,
                },
                [breakpointMediaQuery.desktopUp]: {
                  mt: SECTION_TITLE_CONTENT_GAP.desktop,
                },
              }}
            >
              <Stack spacing={1}>
                <Typography
                  component="p"
                  sx={titleTypeSx("smallCaption", {
                    color: "#0B6E9F",
                    fontWeight: 700,
                    lineHeight: 1.2,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    m: 0,
                  })}
                >
                  Who It Serves
                </Typography>
                <SectionParagraph
                  title={project.personas.title}
                  body={project.personas.paragraphs}
                  titleVariant="subtitle"
                />
              </Stack>
              <PersonasRow personas={project.personas.items} />
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
              <Stack spacing={{ xs: 2, md: 2.5 }}>
                <Stack spacing={1}>
                  <Typography
                    component="p"
                    sx={titleTypeSx("smallCaption", {
                      color: "#0B6E9F",
                      fontWeight: 700,
                      lineHeight: 1.2,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      m: 0,
                    })}
                  >
                    {project.mobileExperienceConcepts.subtitle}
                  </Typography>
                  <Typography
                    component="h3"
                    sx={titleTypeSx("sectionSubtitle", {
                      color: FINDING_NEMO_HEADLINE_COLOR,
                      fontWeight: 700,
                      lineHeight: 1.2,
                      m: 0,
                    })}
                  >
                    {project.mobileExperienceConcepts.experienceTitle}
                  </Typography>
                </Stack>
                <SectionParagraph
                  body={project.mobileExperienceConcepts.paragraphs}
                />
              </Stack>
              <Stack spacing={{ xs: 4, md: 6 }} sx={{ width: "100%" }}>
                {project.mobileExperienceConcepts.mockups[0] ? (
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <MobileExperienceMockup
                      {...project.mobileExperienceConcepts.mockups[0]}
                      variant="notification"
                    />
                  </Box>
                ) : null}
                {project.mobileExperienceConcepts.mockups.length > 1 ? (
                  <Box sx={mobileExperienceMockupsRowSx}>
                    {project.mobileExperienceConcepts.mockups
                      .slice(1)
                      .map((mockup) => (
                        <MobileExperienceMockup key={mockup.title} {...mockup} />
                      ))}
                  </Box>
                ) : null}
              </Stack>
            </Stack>
          </FullBleedBand>
          <FullBleedBand backgroundColor={BAND_COLORS.aiTechnologyMvpArchitecture}>
            <Stack sx={panelSectionStackSx}>
              <Stack
                sx={{
                  gap: SECTION_TITLE_CONTENT_GAP.mobile,
                  [breakpointMediaQuery.tabletUp]: {
                    gap: SECTION_TITLE_CONTENT_GAP.tablet,
                  },
                  [breakpointMediaQuery.desktopUp]: {
                    gap: SECTION_TITLE_CONTENT_GAP.desktop,
                  },
                }}
              >
                <StageSectionHeader
                  sectionLabel={project.systemWorkflowArchitecture.sectionLabel}
                  title={project.systemWorkflowArchitecture.title}
                />
                <SectionParagraph
                  body={project.systemWorkflowArchitecture.paragraphs}
                />
              </Stack>
              <Stack spacing={1}>
                {project.systemWorkflowArchitecture.coreMvpComponents.eyebrow ? (
                  <Typography
                    component="p"
                    sx={titleTypeSx("smallCaption", {
                      color: "#0B6E9F",
                      fontWeight: 700,
                      lineHeight: 1.2,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      m: 0,
                    })}
                  >
                    {
                      project.systemWorkflowArchitecture.coreMvpComponents
                        .eyebrow
                    }
                  </Typography>
                ) : null}
                <PanelSection
                  type="principles-image"
                  title={
                    project.systemWorkflowArchitecture.coreMvpComponents.title
                  }
                  principles={
                    project.systemWorkflowArchitecture.coreMvpComponents
                      .principles
                  }
                  image={
                    project.systemWorkflowArchitecture.coreMvpComponents.image
                  }
                />
              </Stack>
              <Stack spacing={1}>
                {project.systemWorkflowArchitecture.conceptualMvpArchitecture
                  .eyebrow ? (
                  <Typography
                    component="p"
                    sx={titleTypeSx("smallCaption", {
                      color: "#0B6E9F",
                      fontWeight: 700,
                      lineHeight: 1.2,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      m: 0,
                    })}
                  >
                    {
                      project.systemWorkflowArchitecture
                        .conceptualMvpArchitecture.eyebrow
                    }
                  </Typography>
                ) : null}
                <SectionParagraph
                  title={
                    project.systemWorkflowArchitecture.conceptualMvpArchitecture
                      .title
                  }
                  body={
                    project.systemWorkflowArchitecture.conceptualMvpArchitecture
                      .paragraphs
                  }
                  titleVariant="subtitle"
                />
              </Stack>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Stack
                  alignItems="center"
                  spacing={{ xs: 2, md: 2.5 }}
                  sx={conceptualMvpArchitectureImageBoxSx}
                >
                  <Box
                    sx={{
                      width: "100%",
                      ...interactiveCardHoverSx,
                      "&:hover": {
                        ...interactiveCardHoverSx["&:hover"],
                        bgcolor: "transparent",
                        backgroundColor: "transparent",
                      },
                    }}
                  >
                    <ProjectImageLightbox
                      objectPath={
                        project.systemWorkflowArchitecture.conceptualMvpArchitecture
                          .illustration.objectPath
                      }
                      alt={
                        project.systemWorkflowArchitecture.conceptualMvpArchitecture
                          .illustration.alt
                      }
                      lightboxId={ARCHITECTURE_TECHNOLOGY_LIGHTBOX_ID}
                      width={
                        project.systemWorkflowArchitecture.conceptualMvpArchitecture
                          .illustration.width
                      }
                      height={
                        project.systemWorkflowArchitecture.conceptualMvpArchitecture
                          .illustration.height
                      }
                      style={{
                        display: "block",
                        width: "100%",
                        height: "auto",
                        maxWidth: "100%",
                      }}
                    />
                  </Box>
                  <Stack alignItems="center" spacing="6px" sx={{ width: "100%" }}>
                    <Typography
                      component="p"
                      sx={bodyTypeSx("smallCaption", {
                        fontWeight: 400,
                        lineHeight: 1.5,
                        textAlign: "center",
                        m: 0,
                      })}
                    >
                      {
                        project.systemWorkflowArchitecture.conceptualMvpArchitecture
                          .illustration.annotation
                      }
                    </Typography>
                    {project.systemWorkflowArchitecture.conceptualMvpArchitecture
                      .illustration.annotationInstruction ? (
                      <Typography
                        component="p"
                        sx={bodyTypeSx("smallCaption", {
                          fontWeight: 400,
                          lineHeight: 1.5,
                          textAlign: "center",
                          m: 0,
                          opacity: 0.75,
                        })}
                      >
                        {
                          project.systemWorkflowArchitecture
                            .conceptualMvpArchitecture.illustration
                            .annotationInstruction
                        }
                      </Typography>
                    ) : null}
                  </Stack>
                </Stack>
              </Box>
              <SectionParagraph
                body={
                  project.systemWorkflowArchitecture.conceptualMvpArchitecture
                    .paragraphsAfterIllustration
                }
              />
              {project.systemWorkflowArchitecture.definingSuccessPanel ? (
                <Stack spacing={1}>
                  {project.systemWorkflowArchitecture.definingSuccessEyebrow ? (
                    <Typography
                      component="p"
                      sx={titleTypeSx("smallCaption", {
                        color: "#0B6E9F",
                        fontWeight: 700,
                        lineHeight: 1.2,
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        m: 0,
                      })}
                    >
                      {
                        project.systemWorkflowArchitecture
                          .definingSuccessEyebrow
                      }
                    </Typography>
                  ) : null}
                  <PanelSection
                    {...project.systemWorkflowArchitecture.definingSuccessPanel}
                    panelBackgroundColor="#FFFFFF"
                  />
                </Stack>
              ) : null}
            </Stack>
          </FullBleedBand>
          <FullBleedBand backgroundColor={BAND_COLORS.designDecisionSupportExperience}>
            <StageSectionHeader
              sectionLabel={project.mobileExperienceConcepts.sectionLabel}
              title={project.mobileExperienceConcepts.title}
              paragraphs={project.mobileExperienceConcepts.stageParagraphs}
            />
            <Stack sx={sectionTitleContentGapMtSx}>
              <ComputerVisionPipelineCard
                data={project.systemWorkflowArchitecture}
              />
            </Stack>
            {project.mobileExperienceConcepts.architecturalPrinciples ? (
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
                <Stack spacing={1}>
                  {project.mobileExperienceConcepts.architecturalPrinciples
                    .eyebrow ? (
                    <Typography
                      component="p"
                      sx={titleTypeSx("smallCaption", {
                        color: "#0B6E9F",
                        fontWeight: 700,
                        lineHeight: 1.2,
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        m: 0,
                      })}
                    >
                      {
                        project.mobileExperienceConcepts.architecturalPrinciples
                          .eyebrow
                      }
                    </Typography>
                  ) : null}
                  <SectionParagraph
                    title={
                      project.mobileExperienceConcepts.architecturalPrinciples
                        .title
                    }
                    body={
                      project.mobileExperienceConcepts.architecturalPrinciples
                        .intro
                    }
                    titleVariant="subtitle"
                  />
                </Stack>
                <StageInfoCardsRow
                  cards={project.mobileExperienceConcepts.architecturalPrinciples.principles.map(
                    (principle) => ({
                      title: principle.subtitle,
                      description: principle.description,
                    }),
                  )}
                  titleColor={
                    IDENTIFY_AI_OPPORTUNITY_CARD.opportunityTitleColor
                  }
                  widthPx={ARCHITECTURAL_PRINCIPLE_CARD_WIDTH}
                  centered
                  titleMinLines={2}
                  sx={{
                    [breakpointMediaQuery.tabletUp]: {
                      display: "grid",
                      gridTemplateColumns: `repeat(2, minmax(0, ${ARCHITECTURAL_PRINCIPLE_CARD_WIDTH.tablet}px))`,
                    },
                    [breakpointMediaQuery.desktopUp]: {
                      gridTemplateColumns: `repeat(2, ${ARCHITECTURAL_PRINCIPLE_CARD_WIDTH.desktop}px)`,
                    },
                    "@media (min-width: 1260px)": {
                      gridTemplateColumns: `repeat(4, ${ARCHITECTURAL_PRINCIPLE_WIDE_DESKTOP_WIDTH_PX}px)`,
                    },
                  }}
                />
              </Stack>
            ) : null}
            {project.mobileExperienceConcepts.businessRuleEvaluation ? (
              <Stack
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
                <Stack spacing={1}>
                  {project.mobileExperienceConcepts.businessRuleEvaluation
                    .eyebrow ? (
                    <Typography
                      component="p"
                      sx={titleTypeSx("smallCaption", {
                        color: "#0B6E9F",
                        fontWeight: 700,
                        lineHeight: 1.2,
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        m: 0,
                      })}
                    >
                      {
                        project.mobileExperienceConcepts.businessRuleEvaluation
                          .eyebrow
                      }
                    </Typography>
                  ) : null}
                  <SectionParagraph
                    title={
                      project.mobileExperienceConcepts.businessRuleEvaluation
                        .title
                    }
                    body={
                      project.mobileExperienceConcepts.businessRuleEvaluation
                        .paragraphs
                    }
                    titleVariant="subtitle"
                  />
                </Stack>
              </Stack>
            ) : null}
            {project.mobileExperienceConcepts.metadataDrivenArchitecture ? (
              <Stack
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
                <MetadataDrivenArchitectureCard
                  data={
                    project.mobileExperienceConcepts.metadataDrivenArchitecture
                  }
                />
              </Stack>
            ) : null}
            {project.mobileExperienceConcepts.eventDrivenOperationalDashboard ? (
              <Stack
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
                <Stack spacing={1}>
                  {project.mobileExperienceConcepts
                    .eventDrivenOperationalDashboard.eyebrow ? (
                    <Typography
                      component="p"
                      sx={titleTypeSx("smallCaption", {
                        color: "#0B6E9F",
                        fontWeight: 700,
                        lineHeight: 1.2,
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        m: 0,
                      })}
                    >
                      {
                        project.mobileExperienceConcepts
                          .eventDrivenOperationalDashboard.eyebrow
                      }
                    </Typography>
                  ) : null}
                  <SectionParagraph
                    title={
                      project.mobileExperienceConcepts
                        .eventDrivenOperationalDashboard.title
                    }
                    body={
                      project.mobileExperienceConcepts
                        .eventDrivenOperationalDashboard.paragraphs
                    }
                    titleVariant="subtitle"
                  />
                </Stack>
              </Stack>
            ) : null}
            {project.mobileExperienceConcepts.extendingTheExperience ? (
              <Stack
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
                <Stack spacing={1}>
                  {project.mobileExperienceConcepts.extendingTheExperience
                    .eyebrow ? (
                    <Typography
                      component="p"
                      sx={titleTypeSx("smallCaption", {
                        color: "#0B6E9F",
                        fontWeight: 700,
                        lineHeight: 1.2,
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        m: 0,
                      })}
                    >
                      {
                        project.mobileExperienceConcepts.extendingTheExperience
                          .eyebrow
                      }
                    </Typography>
                  ) : null}
                  <SectionParagraph
                    title={
                      project.mobileExperienceConcepts.extendingTheExperience
                        .title
                    }
                    body={
                      project.mobileExperienceConcepts.extendingTheExperience
                        .paragraphs
                    }
                    titleVariant="subtitle"
                  />
                </Stack>
              </Stack>
            ) : null}
          </FullBleedBand>
          <FullBleedBand backgroundColor={BAND_COLORS.expectedImpactAndReflections}>
            <SectionParagraph title={project.expectedImpact.title} />
            <Stack sx={sectionTitleContentGapMtSx}>
              <Box
                component="section"
                sx={{
                  ...PANEL_SHELL_SX,
                  bgcolor: PANEL_COLORS.default,
                }}
              >
                <SectionParagraph body={project.expectedImpact.paragraphs} />
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
                title={project.reflectionsAndKeyLearnings.title}
              />
              <Box
                sx={{
                  px: LAYOUT_DIMENSIONS.mobile.margin,
                  [breakpointMediaQuery.tabletUp]: {
                    px: LAYOUT_DIMENSIONS.tablet.margin,
                  },
                  [breakpointMediaQuery.desktopUp]: {
                    px: LAYOUT_DIMENSIONS.desktop.margin,
                  },
                }}
              >
                <List
                  sx={{
                    width: "100%",
                    my: 0,
                    p: 0,
                    listStyleType: "disc",
                    listStylePosition: "outside",
                    pl: { xs: 2.5, md: 3 },
                  }}
                >
                  {project.reflectionsAndKeyLearnings.items.map((item) => (
                    <ListItem
                      key={item.subtitle}
                      disableGutters
                      sx={{
                        display: "list-item",
                        py: { xs: 1.5, md: 2 },
                        "&:first-of-type": { pt: 0 },
                      }}
                    >
                      <Stack spacing={1} sx={{ width: "100%" }}>
                        <Typography
                          component="h3"
                          sx={titleTypeSx("personaSectionTitle", {
                            fontWeight: 700,
                            lineHeight: 1.2,
                            color: FINDING_NEMO_HEADLINE_COLOR,
                          })}
                        >
                          {item.subtitle}
                        </Typography>
                        <Typography
                          component="p"
                          sx={bodyTypeSx("sectionDescription", {
                            fontWeight: 400,
                            lineHeight: 1.5,
                            m: 0,
                          })}
                        >
                          {item.description}
                        </Typography>
                      </Stack>
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Stack>
          </FullBleedBand>
        </>
      ) : null}
    </Box>
  );
}
