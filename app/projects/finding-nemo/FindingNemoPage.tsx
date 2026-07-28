"use client";

import { useEffect } from "react";
import { useSetAtom } from "jotai";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import DesigningHumanCenteredAiSection from "@/app/projects/finding-nemo/components/DesigningHumanCenteredAiSection";
import IdentifyAiOpportunitySection from "@/app/projects/finding-nemo/components/IdentifyAiOpportunitySection";
import StageSectionHeader from "@/app/projects/finding-nemo/components/StageSectionHeader";
import StageInfoCardsRow from "@/app/projects/finding-nemo/components/StageInfoCardsRow";
import FullBleedBand from "@/app/projects/finding-nemo/components/FullBleedBand";
import MobileExperienceMockup from "@/app/projects/finding-nemo/components/MobileExperienceMockup";
import MyContributions from "@/app/projects/finding-nemo/components/MyContributions";
import Overview from "@/app/projects/finding-nemo/components/Overview";
import ProblemDemoPanel from "@/app/projects/finding-nemo/components/ProbleDemoCarousel";
import PanelSection from "@/app/projects/finding-nemo/components/PanelSection";
import PersonasRow from "@/app/projects/finding-nemo/components/PersonasRow";
import ProjectHeader from "@/app/projects/finding-nemo/components/ProjectHeader";
import SectionParagraph from "@/app/projects/finding-nemo/components/SectionParagraph";
import { interactiveCardHoverSx } from "@/app/projects/finding-nemo/components/interactiveCardStyles";
import { bodyTypeSx, FINDING_NEMO_HEADLINE_COLOR, titleTypeSx } from "@/app/projects/finding-nemo/typography";
import {
  BAND_COLORS,
  LAYOUT_DIMENSIONS,
  MOBILE_EXPERIENCE_MOCKUP_GAPS,
  PANEL_CONTENT_MAX_WIDTH_PX,
  PANEL_COLORS,
  PANEL_SECTION_GAPS,
  PANEL_SHELL_SX,
  PRIMARY_USERS_CARD,
  SECTION_GAPS,
  SECTION_TITLE_CONTENT_GAP,
  sectionTitleContentGapMtSx,
  SOLUTION_OVERVIEW_IMAGE_DISPLAY,
  SYSTEM_WORKFLOW_ILLUSTRATION_DISPLAY,
  CONCEPTUAL_MVP_ARCHITECTURE_ILLUSTRATION_DISPLAY,
} from "@/app/projects/finding-nemo/layoutConfig";
import { FINDING_NEMO_HEADER_LOGO } from "@/app/projects/finding-nemo/headerTheme";
import type { FindingNemoProjectDocument } from "@/app/projects/finding-nemo/lib/finding-nemo.firestore";
import { layoutState } from "@/app/(public)/layout-state";
import {
  defaultHeaderState,
  headerState,
} from "@/components/Header/HeaderState";
import { breakpointMediaQuery } from "@/lib/responsive/breakpoints";
import ProjectImage from "@/lib/media/ProjectImage";
import ProjectImageLightbox from "@/lib/media/ProjectImageLightbox";

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

const mobileExperienceMockupsRowSx = {
  width: "100%",
  maxWidth: `${PANEL_CONTENT_MAX_WIDTH_PX}px`,
  mx: "auto",
  display: "flex",
  flexDirection: { xs: "column", md: "row" },
  flexWrap: "wrap",
  justifyContent: "center",
  alignItems: { xs: "center", md: "flex-start" },
  gap: MOBILE_EXPERIENCE_MOCKUP_GAPS.mobile,
  [breakpointMediaQuery.tabletUp]: {
    gap: MOBILE_EXPERIENCE_MOCKUP_GAPS.tablet,
  },
  [breakpointMediaQuery.desktopUp]: {
    gap: MOBILE_EXPERIENCE_MOCKUP_GAPS.desktop,
  },
} as const;

const SYSTEM_WORKFLOW_LIGHTBOX_ID = "finding-nemo-system-workflow";
const ARCHITECTURE_TECHNOLOGY_LIGHTBOX_ID =
  "finding-nemo-architecture-technology";

const systemWorkflowImageBoxSx = {
  width: `${SYSTEM_WORKFLOW_ILLUSTRATION_DISPLAY.mobile.width}px`,
  maxWidth: "100%",
  [breakpointMediaQuery.tabletUp]: {
    width: `${SYSTEM_WORKFLOW_ILLUSTRATION_DISPLAY.tablet.width}px`,
  },
  [breakpointMediaQuery.desktopUp]: {
    width: `${SYSTEM_WORKFLOW_ILLUSTRATION_DISPLAY.desktop.width}px`,
  },
} as const;

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
  const hasProject = project != null;

  useEffect(() => {
    setLayoutState({ isFullWidth: true });
    setHeaderState({
      position: "absolute",
      isDark: false,
      logoPrimaryColor: FINDING_NEMO_HEADER_LOGO.primary,
      logoAccentColor: FINDING_NEMO_HEADER_LOGO.accent,
    });

    return () => {
      setLayoutState({ isFullWidth: false });
      setHeaderState({ ...defaultHeaderState });
    };
  }, [setLayoutState, setHeaderState]);

  return (
    <Box component="main">
      {hasProject ? (
        <>
          <ProjectHeader
            data={project.projectHeader}
            onReady={onProjectHeaderReady}
          />
          <Overview data={project.overview} />
          {project.problemDemoPanel ? (
            <ProblemDemoPanel data={project.problemDemoPanel} />
          ) : null}
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
            <Stack
              spacing={{ xs: 4, md: 6 }}
              sx={sectionTitleContentGapMtSx}
            >
              <SectionParagraph
                title={project.primaryUsers.title}
                body={project.primaryUsers.paragraphs}
                titleVariant="subtitle"
              />
              <StageInfoCardsRow
                cards={project.primaryUsers.cards}
                widthPx={PRIMARY_USERS_CARD.widthPx}
                centered
              />
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
                title={project.personas.title}
                body={project.personas.paragraphs}
                titleVariant="subtitle"
              />
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
              <SectionParagraph
                title={project.solutionOverview.subtitle}
                body={project.solutionOverview.paragraphs}
                titleVariant="subtitle"
              />
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
                  sx={solutionOverviewImageBoxSx}
                >
                  <Box sx={{ width: "100%" }}>
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
                  {project.solutionOverview.image.annotation ? (
                    <Typography
                      component="p"
                      sx={bodyTypeSx("smallCaption", {
                        fontWeight: 400,
                        lineHeight: 1.5,
                        textAlign: "center",
                        m: 0,
                        width: "100%",
                      })}
                    >
                      {project.solutionOverview.image.annotation}
                    </Typography>
                  ) : null}
                </Stack>
              </Box>
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
                  title={project.systemWorkflowArchitecture.subtitle}
                  body={project.systemWorkflowArchitecture.paragraphs}
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
                  sx={systemWorkflowImageBoxSx}
                >
                  <ProjectImageLightbox
                    objectPath={
                      project.systemWorkflowArchitecture.illustration.objectPath
                    }
                    alt={project.systemWorkflowArchitecture.illustration.alt}
                    lightboxId={SYSTEM_WORKFLOW_LIGHTBOX_ID}
                    width={
                      project.systemWorkflowArchitecture.illustration.width
                    }
                    height={
                      project.systemWorkflowArchitecture.illustration.height
                    }
                    style={{
                      display: "block",
                      width: "100%",
                      height: "auto",
                      maxWidth: "100%",
                    }}
                  />
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
                      {project.systemWorkflowArchitecture.illustration.annotation}
                    </Typography>
                    {project.systemWorkflowArchitecture.illustration
                      .annotationInstruction ? (
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
                          project.systemWorkflowArchitecture.illustration
                            .annotationInstruction
                        }
                      </Typography>
                    ) : null}
                  </Stack>
                </Stack>
              </Box>
              <PanelSection
                type="principles-image"
                title={project.systemWorkflowArchitecture.coreMvpComponents.title}
                principles={
                  project.systemWorkflowArchitecture.coreMvpComponents.principles
                }
                image={project.systemWorkflowArchitecture.coreMvpComponents.image}
              />
              <SectionParagraph
                title={
                  project.systemWorkflowArchitecture.conceptualMvpArchitecture.title
                }
                body={
                  project.systemWorkflowArchitecture.conceptualMvpArchitecture
                    .paragraphs
                }
                titleVariant="subtitle"
              />
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
                <PanelSection
                  {...project.systemWorkflowArchitecture.definingSuccessPanel}
                  panelBackgroundColor="#FFFFFF"
                />
              ) : null}
            </Stack>
          </FullBleedBand>
          <FullBleedBand backgroundColor={BAND_COLORS.designDecisionSupportExperience}>
            <StageSectionHeader
              sectionLabel={project.mobileExperienceConcepts.sectionLabel}
              title={project.mobileExperienceConcepts.title}
            />
            {project.mobileExperienceConcepts.paragraphAfterSubtitle ? (
              <Stack sx={sectionTitleContentGapMtSx}>
                <SectionParagraph
                  body={project.mobileExperienceConcepts.paragraphAfterSubtitle}
                />
              </Stack>
            ) : null}
            {project.mobileExperienceConcepts.conceptEvolutionPanel ? (
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
                <PanelSection
                  {...project.mobileExperienceConcepts.conceptEvolutionPanel}
                />
              </Stack>
            ) : null}
            {project.mobileExperienceConcepts.corePrinciplesPanel ? (
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
                <PanelSection
                  {...project.mobileExperienceConcepts.corePrinciplesPanel}
                  panelBackgroundColor={PANEL_COLORS.default}
                />
              </Stack>
            ) : null}
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
                title={project.mobileExperienceConcepts.subtitle}
                body={project.mobileExperienceConcepts.paragraphs}
                titleVariant="subtitle"
              />
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
          <FullBleedBand backgroundColor={BAND_COLORS.expectedImpactAndReflections}>
            <SectionParagraph title={project.expectedImpact.title} />
            <Stack sx={{ ...panelSectionStackSx, ...sectionTitleContentGapMtSx }}>
              <Box
                component="section"
                sx={{
                  ...PANEL_SHELL_SX,
                  pt: 0,
                  bgcolor: PANEL_COLORS.default,
                }}
              >
                <SectionParagraph body={project.expectedImpact.paragraphs} />
              </Box>
              <Stack spacing={{ xs: 4, md: 6 }}>
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
            </Stack>
          </FullBleedBand>
        </>
      ) : null}
    </Box>
  );
}
