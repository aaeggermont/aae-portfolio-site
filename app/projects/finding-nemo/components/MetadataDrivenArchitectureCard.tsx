import { Box, Stack, Typography } from "@mui/material";

import { interactiveCardHoverSx } from "@/app/projects/finding-nemo/components/interactiveCardStyles";
import { IDENTIFY_AI_OPPORTUNITY_CARD } from "@/app/projects/finding-nemo/layoutConfig";
import {
  bodyTypeSx,
  FINDING_NEMO_HEADLINE_COLOR,
  titleTypeSx,
} from "@/app/projects/finding-nemo/typography";
import { breakpointMediaQuery } from "@/lib/responsive/breakpoints";
import type { FindingNemoDataProjectDocument } from "@/scripts/project-2.data";

type MetadataDrivenArchitectureCardProps = {
  data: NonNullable<
    FindingNemoDataProjectDocument["mobileExperienceConcepts"]["metadataDrivenArchitecture"]
  >;
};

const metadataFieldsGridSx = {
  width: "100%",
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: 1.5,
  [breakpointMediaQuery.tabletUp]: {
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  },
  [breakpointMediaQuery.desktopUp]: {
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
  },
} as const;

export default function MetadataDrivenArchitectureCard({
  data,
}: MetadataDrivenArchitectureCardProps) {
  return (
    <Box
      component="section"
      sx={{
        width: "100%",
        boxSizing: "border-box",
        borderRadius: `${IDENTIFY_AI_OPPORTUNITY_CARD.borderRadiusPx}px`,
        border: `1px solid ${IDENTIFY_AI_OPPORTUNITY_CARD.border}`,
        bgcolor: IDENTIFY_AI_OPPORTUNITY_CARD.background,
        backgroundColor: IDENTIFY_AI_OPPORTUNITY_CARD.background,
        px: { xs: 2.5, md: 3, lg: 4 },
        py: { xs: 3, md: 4 },
        ...interactiveCardHoverSx,
        "&:hover": {
          ...interactiveCardHoverSx["&:hover"],
          bgcolor: IDENTIFY_AI_OPPORTUNITY_CARD.background,
          backgroundColor: IDENTIFY_AI_OPPORTUNITY_CARD.background,
        },
      }}
    >
      <Stack spacing={{ xs: 3, md: 3.5 }}>
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
            {data.eyebrow}
          </Typography>
          <Typography
            component="h3"
            sx={titleTypeSx("personaSectionTitle", {
              color: FINDING_NEMO_HEADLINE_COLOR,
              fontWeight: 700,
              lineHeight: 1.2,
              m: 0,
            })}
          >
            {data.title}
          </Typography>
        </Stack>

        <Typography
          component="p"
          sx={bodyTypeSx("contentCardBody", {
            fontWeight: 400,
            lineHeight: 1.6,
            m: 0,
          })}
        >
          {data.intro}
        </Typography>

        <Box sx={metadataFieldsGridSx}>
          {data.fields.map((field) => (
            <Box
              key={field}
              sx={{
                minHeight: 42,
                boxSizing: "border-box",
                display: "flex",
                alignItems: "center",
                gap: 1.25,
                borderRadius: "8px",
                border: `1px solid ${IDENTIFY_AI_OPPORTUNITY_CARD.border}`,
                bgcolor: "#EEF2F6",
                px: 2,
                py: 1.25,
              }}
            >
              <Box
                aria-hidden="true"
                sx={{
                  width: 6,
                  height: 6,
                  flexShrink: 0,
                  borderRadius: "50%",
                  bgcolor:
                    IDENTIFY_AI_OPPORTUNITY_CARD.opportunityTitleColor,
                }}
              />
              <Typography
                component="span"
                sx={bodyTypeSx("smallCaption", {
                  color: FINDING_NEMO_HEADLINE_COLOR,
                  fontWeight: 600,
                  lineHeight: 1.3,
                })}
              >
                {field}
              </Typography>
            </Box>
          ))}
        </Box>

        <Stack spacing={{ xs: 2.5, md: 3 }}>
          {data.paragraphs.map((paragraph) => (
            <Typography
              key={paragraph}
              component="p"
              sx={bodyTypeSx("contentCardBody", {
                fontWeight: 400,
                lineHeight: 1.6,
                m: 0,
              })}
            >
              {paragraph}
            </Typography>
          ))}
        </Stack>
      </Stack>
    </Box>
  );
}
