"use client";

import { Box, Typography } from "@mui/material";

import type { ConclusionsAndImpactSectionData } from "@/app/projects/ar-story-teller/types/arStoryTellerContent";
import { breakpointMediaQuery } from "@/lib/responsive/breakpoints";
import { bodyTypeSx, titleTypeSx } from "../../typography";
import dsSectionStyles from "../../sections/DesignSystemSection.module.scss";
import styles from "./ConclusionsAndImpactSection.module.scss";

const DESKTOP_UP_MQ = breakpointMediaQuery.desktopUp;
const TABLET_UP_MQ = breakpointMediaQuery.tabletUp;

const EYEBROW_COLOR = "#1B3C90";
const TITLE_COLOR = "#111A27";
const METRIC_ACCENT = "#E8910F";
const METRIC_REST = "#3F5266";
const BODY_COLOR = "#3F5266";

const WRAP_UP_EYEBROW = "Wrap-up";
const SECTION_TITLE = "Conclusion & Impact";
const METRIC_EMPHASIS = "Millions";
const METRIC_REST_COPY = " of guests potentially to be reached";

interface ConclusionsAndImpactSectionProps {
  data: ConclusionsAndImpactSectionData;
}

export function ConclusionsAndImpactSection({
  data,
}: ConclusionsAndImpactSectionProps) {
  const items = data.caseStudy?.conclusionsAndImpact ?? [];
  if (!items.length) {
    return null;
  }

  const primary =
    items.find((item) =>
      /conclusion/i.test(item.title.replace(/\.$/, "").trim()),
    ) ?? items[0];
  const paragraphs = primary.paragraphs ?? [];

  return (
    <div
      className={dsSectionStyles.conclusionsImpactBleed}
      aria-label="Conclusion and Impact"
    >
      <div className={dsSectionStyles.conclusionsImpactBleedInner}>
        <Box
          className={styles.layout}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: { xs: 4, md: 5 },
            [DESKTOP_UP_MQ]: {
              flexDirection: "row",
              alignItems: "flex-start",
              gap: 8,
            },
          }}
        >
          <Box
            className={styles.lede}
            sx={{
              width: "100%",
              [DESKTOP_UP_MQ]: {
                flex: "0 0 38%",
                maxWidth: 420,
              },
            }}
          >
            <Typography
              component="p"
              sx={titleTypeSx("eyebrow", {
                m: 0,
                mb: 1.5,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                color: EYEBROW_COLOR,
                textAlign: "left",
              })}
            >
              {WRAP_UP_EYEBROW}
            </Typography>
            <Typography
              component="h2"
              sx={titleTypeSx("sectionTitle", {
                m: 0,
                mb: { xs: 3, md: 4 },
                color: TITLE_COLOR,
                textAlign: "left",
              })}
            >
              {SECTION_TITLE}
            </Typography>
            <Typography
              component="p"
              sx={{
                m: 0,
                display: "flex",
                flexWrap: "wrap",
                alignItems: "baseline",
                columnGap: 1,
                rowGap: 0.5,
              }}
            >
              <Box
                component="span"
                sx={titleTypeSx("panelHeading", {
                  m: 0,
                  color: METRIC_ACCENT,
                  fontWeight: 700,
                  fontSize: { xs: "32px", md: "40px", lg: "48px" },
                  lineHeight: 1.05,
                })}
              >
                {METRIC_EMPHASIS}
              </Box>
              <Box
                component="span"
                sx={bodyTypeSx("panelBody", {
                  m: 0,
                  color: METRIC_REST,
                  fontWeight: 500,
                })}
              >
                {METRIC_REST_COPY.trimStart()}
              </Box>
            </Typography>
          </Box>

          <Box
            className={styles.copy}
            sx={{
              flex: 1,
              minWidth: 0,
              display: "flex",
              flexDirection: "column",
              gap: { xs: 2.5, md: 3 },
            }}
          >
            {paragraphs.map((paragraph) => (
              <Typography
                key={paragraph}
                component="p"
                sx={bodyTypeSx("bodyText", {
                  m: 0,
                  color: BODY_COLOR,
                  textAlign: "left",
                  [TABLET_UP_MQ]: {
                    maxWidth: "40rem",
                  },
                })}
              >
                {paragraph}
              </Typography>
            ))}
          </Box>
        </Box>
      </div>
    </div>
  );
}

export default ConclusionsAndImpactSection;
