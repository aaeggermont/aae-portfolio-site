import { Box, Container, Stack, Typography } from "@mui/material";

import {
  INTRO_SECTIONS_BACKGROUND,
  PROJECT_CONTENT_CONTAINER_SX,
  SOLUTION_OVERVIEW_IMAGE_DISPLAY,
  sectionTitleContentGapMbSx,
} from "@/app/projects/finding-nemo/layoutConfig";
import {
  bodyTypeSx,
  FINDING_NEMO_HEADLINE_COLOR,
  FINDING_NEMO_TITLE_FONT,
  TYPOGRAPHY,
  titleTypeSx,
} from "@/app/projects/finding-nemo/typography";
import { breakpointMediaQuery } from "@/lib/responsive/breakpoints";
import ProjectImageLightbox from "@/lib/media/ProjectImageLightbox";
import type { FindingNemoDataProjectDocument } from "@/scripts/project-2.data";

type SolutionOverviewSectionProps = {
  data: FindingNemoDataProjectDocument["solutionOverview"];
};

const SOLUTION_OVERVIEW_LIGHTBOX_ID = "finding-nemo-solution-overview";
const SOLUTION_OVERVIEW_LIGHTBOX_SIDEBAR_WIDTH_PX = 520;

const sectionLabelSx = {
  fontFamily: FINDING_NEMO_TITLE_FONT,
  fontSize: TYPOGRAPHY.heroSubtitle.mobile,
  fontWeight: 500,
  color: "#0B6E9F",
  lineHeight: 1.2,
  mb: 1.5,
  textTransform: "uppercase",
  letterSpacing: "0.04em",
  [breakpointMediaQuery.tabletUp]: {
    fontSize: TYPOGRAPHY.heroSubtitle.tablet,
  },
  [breakpointMediaQuery.desktopUp]: {
    fontSize: "22px",
  },
} as const;

export default function SolutionOverviewSection({
  data,
}: SolutionOverviewSectionProps) {
  return (
    <Box
      component="section"
      sx={{
        bgcolor: INTRO_SECTIONS_BACKGROUND,
        pb: { xs: 8, md: 10, lg: 12 },
      }}
    >
      <Container maxWidth={false} sx={PROJECT_CONTENT_CONTAINER_SX}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr",
            alignItems: "center",
            gap: { xs: 6, md: 8 },
            [breakpointMediaQuery.desktopUp]: {
              gridTemplateColumns: "minmax(0, 3fr) minmax(280px, 2fr)",
              gap: 8,
            },
          }}
        >
          <Box sx={{ width: "100%", minWidth: 0 }}>
            <Stack sx={sectionTitleContentGapMbSx}>
              <Typography component="p" align="left" sx={sectionLabelSx}>
                {data.subtitle}
              </Typography>
              <Typography
                component="h2"
                align="left"
                sx={titleTypeSx("sectionTitle", {
                  color: FINDING_NEMO_HEADLINE_COLOR,
                  fontWeight: 700,
                  lineHeight: 1.2,
                })}
              >
                {data.overviewTitle}
              </Typography>
            </Stack>
            <Stack spacing={{ xs: 2.5, md: 3 }}>
              {data.paragraphs.map((paragraph) => (
                <Typography
                  key={paragraph}
                  component="p"
                  sx={bodyTypeSx("sectionDescription", {
                    fontWeight: 400,
                    lineHeight: 1.5,
                    m: 0,
                  })}
                >
                  {paragraph}
                </Typography>
              ))}
            </Stack>
          </Box>

          <Stack
            component="figure"
            alignItems="center"
            spacing={{ xs: 2, md: 2.5 }}
            sx={{ m: 0, width: "100%" }}
          >
            <Box
              sx={{
                width: `${SOLUTION_OVERVIEW_IMAGE_DISPLAY.mobile.width}px`,
                maxWidth: "100%",
                [breakpointMediaQuery.tabletUp]: {
                  width: `${SOLUTION_OVERVIEW_IMAGE_DISPLAY.tablet.width}px`,
                },
                [breakpointMediaQuery.desktopUp]: {
                  width: `${SOLUTION_OVERVIEW_IMAGE_DISPLAY.desktop.width}px`,
                },
              }}
            >
              <ProjectImageLightbox
                objectPath={data.image.objectPath}
                alt={data.image.alt}
                lightboxId={SOLUTION_OVERVIEW_LIGHTBOX_ID}
                width={data.image.width}
                height={data.image.height}
                lightboxSidebarPlacement="left"
                lightboxSidebarWidthPx={SOLUTION_OVERVIEW_LIGHTBOX_SIDEBAR_WIDTH_PX}
                lightboxSidebar={
                  data.image.lightboxAnnotation ? (
                    <Box
                      component="aside"
                      sx={{
                        width: "100%",
                        boxSizing: "border-box",
                        display: "flex",
                        justifyContent: "flex-end",
                        px: { xs: 4, lg: 5 },
                      }}
                    >
                      <Stack
                        sx={{
                          width: 400,
                          maxWidth: "100%",
                        }}
                      >
                        <Stack sx={sectionTitleContentGapMbSx}>
                          <Typography
                            component="p"
                            align="left"
                            sx={sectionLabelSx}
                          >
                            {data.subtitle}
                          </Typography>
                          <Typography
                            component="h2"
                            align="left"
                            sx={titleTypeSx("sectionTitle", {
                              color: FINDING_NEMO_HEADLINE_COLOR,
                              fontWeight: 700,
                              lineHeight: 1.2,
                            })}
                          >
                            {data.overviewTitle}
                          </Typography>
                        </Stack>
                        <Typography
                          component="p"
                          sx={bodyTypeSx("contentCardBody", {
                            color: FINDING_NEMO_HEADLINE_COLOR,
                            fontWeight: 400,
                            lineHeight: 1.6,
                            textAlign: "left",
                            m: 0,
                          })}
                        >
                          {data.image.lightboxAnnotation}
                        </Typography>
                      </Stack>
                    </Box>
                  ) : undefined
                }
                style={{
                  display: "block",
                  width: "100%",
                  height: "auto",
                  maxWidth: "100%",
                }}
              />
            </Box>
            {data.image.annotation ? (
              <Typography
                component="figcaption"
                sx={bodyTypeSx("smallCaption", {
                  fontWeight: 400,
                  lineHeight: 1.5,
                  textAlign: "center",
                  m: 0,
                  maxWidth: 440,
                })}
              >
                {data.image.annotation}
              </Typography>
            ) : null}
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
