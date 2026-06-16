"use client";

import { useEffect } from "react";
import { useSetAtom } from "jotai";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import ContentCard, {
  CHALLENGES_CARD_HEIGHT_PX,
  PRIMARY_USERS_CARD_HEIGHT_PX,
  PRIMARY_USERS_CARD_WIDTH_PX,
} from "@/app/projects/finding-nemo/components/ContentCard";
import FullBleedBand from "@/app/projects/finding-nemo/components/FullBleedBand";
import MobileExperienceMockup from "@/app/projects/finding-nemo/components/MobileExperienceMockup";
import MyContributions from "@/app/projects/finding-nemo/components/MyContributions";
import Overview from "@/app/projects/finding-nemo/components/Overview";
import PanelSection from "@/app/projects/finding-nemo/components/PanelSection";
import Persona from "@/app/projects/finding-nemo/components/Persona";
import ProjectHeader from "@/app/projects/finding-nemo/components/ProjectHeader";
import SectionParagraph from "@/app/projects/finding-nemo/components/SectionParagraph";
import { bodyTypeSx, titleTypeSx } from "@/app/projects/finding-nemo/typography";
import {
  BAND_COLORS,
  LAYOUT_DIMENSIONS,
  MOBILE_EXPERIENCE_MOCKUP_GAPS,
  PANEL_COLORS,
  PANEL_SECTION_GAPS,
  PANEL_SHELL_SX,
  SECTION_GAPS,
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

const personaCardsRowSx = {
  width: "100%",
  display: "flex",
  flexDirection: { xs: "column", md: "row" },
  flexWrap: { xs: "nowrap", md: "wrap" },
  justifyContent: "center",
  alignItems: { xs: "center", md: "stretch" },
  gap: { xs: 3, md: 3, lg: 4 },
} as const;

const mobileExperienceMockupsRowSx = {
  width: "100%",
  display: "flex",
  flexDirection: { xs: "column", md: "row" },
  flexWrap: { xs: "nowrap", md: "wrap" },
  justifyContent: "center",
  alignItems: { xs: "center", md: "stretch" },
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
          <MyContributions data={project.myContributions} />
          <FullBleedBand backgroundColor={BAND_COLORS.businessOpportunities}>
            <Stack spacing={{ xs: 4, md: 6 }}>
              <SectionParagraph
                title={project.businessOpportunities.title}
                body={project.businessOpportunities.paragraphs}
              />
              <Box sx={challengeCardsRowSx}>
                {project.businessOpportunities.cards.map((card) => (
                  <ContentCard
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
                  <ContentCard
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
          <FullBleedBand backgroundColor={BAND_COLORS.businessOpportunities}>
            <Stack spacing={{ xs: 4, md: 6 }}>
              <SectionParagraph
                title={project.primaryUsers.title}
                body={project.primaryUsers.paragraphs}
              />
              <Box sx={challengeCardsRowSx}>
                {project.primaryUsers.cards.map((card) => (
                  <ContentCard
                    key={card.title}
                    title={card.title}
                    description={card.description}
                    widthPx={PRIMARY_USERS_CARD_WIDTH_PX}
                    heightPx={PRIMARY_USERS_CARD_HEIGHT_PX}
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
              <SectionParagraph title={project.personas.title} />
              <Box sx={personaCardsRowSx}>
                {project.personas.items.map((persona) => (
                  <Persona key={persona.title} {...persona} />
                ))}
              </Box>
            </Stack>
          </FullBleedBand>
          <FullBleedBand backgroundColor={BAND_COLORS.neutralPanel}>
            <Stack spacing={{ xs: 4, md: 6 }}>
              <SectionParagraph
                title={project.mobileExperienceConcepts.title}
                body={project.mobileExperienceConcepts.paragraphs}
              />
              <Box sx={mobileExperienceMockupsRowSx}>
                {project.mobileExperienceConcepts.mockups.map((mockup) => (
                  <MobileExperienceMockup key={mockup.title} {...mockup} />
                ))}
              </Box>
            </Stack>
          </FullBleedBand>
          <FullBleedBand backgroundColor={BAND_COLORS.businessOpportunities}>
            <Stack sx={panelSectionStackSx}>
              <SectionParagraph
                title={project.conceptEvolution.title}
                body={project.conceptEvolution.paragraphs}
              />
              {project.conceptEvolution.panels.map((panel) => (
                <PanelSection key={panel.title} {...panel} />
              ))}
            </Stack>
          </FullBleedBand>
          <FullBleedBand backgroundColor={BAND_COLORS.neutralPanel}>
            <Stack sx={panelSectionStackSx}>
              <SectionParagraph
                title={project.systemWorkflowArchitecture.title}
                body={project.systemWorkflowArchitecture.paragraphs}
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
                        color: "common.black",
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
                          color: "common.black",
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
                panelBackgroundColor={PANEL_COLORS.coreMvpComponents}
              />
              <SectionParagraph
                title={
                  project.systemWorkflowArchitecture.conceptualMvpArchitecture.title
                }
                body={
                  project.systemWorkflowArchitecture.conceptualMvpArchitecture
                    .paragraphs
                }
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
                  <Stack alignItems="center" spacing="6px" sx={{ width: "100%" }}>
                    <Typography
                      component="p"
                      sx={bodyTypeSx("smallCaption", {
                        color: "common.black",
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
                          color: "common.black",
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
            </Stack>
          </FullBleedBand>
          <FullBleedBand backgroundColor={BAND_COLORS.businessOpportunities}>
            <Stack sx={panelSectionStackSx}>
              <SectionParagraph title={project.expectedImpact.title} />
              <Box
                component="section"
                sx={{
                  ...PANEL_SHELL_SX,
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
                          color: "common.black",
                          "&:first-of-type": { pt: 0 },
                        }}
                      >
                        <Stack spacing={1} sx={{ width: "100%" }}>
                          <Typography
                            component="h3"
                            sx={titleTypeSx("personaSectionTitle", {
                              fontWeight: 700,
                              lineHeight: 1.2,
                              color: "common.black",
                            })}
                          >
                            {item.subtitle}
                          </Typography>
                          <Typography
                            component="p"
                            sx={bodyTypeSx("sectionDescription", {
                              color: "common.black",
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
