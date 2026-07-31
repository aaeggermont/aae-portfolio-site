import { Box, Stack, Typography } from "@mui/material";

import { interactiveCardHoverSx } from "@/app/projects/finding-nemo/components/interactiveCardStyles";
import { IDENTIFY_AI_OPPORTUNITY_CARD } from "@/app/projects/finding-nemo/layoutConfig";
import {
  bodyTypeSx,
  FINDING_NEMO_HEADLINE_COLOR,
  titleTypeSx,
} from "@/app/projects/finding-nemo/typography";
import { breakpointMediaQuery } from "@/lib/responsive/breakpoints";
import ProjectImage from "@/lib/media/ProjectImage";
import type { FindingNemoDataProjectDocument } from "@/scripts/project-2.data";

type ComputerVisionPipelineCardProps = {
  data: FindingNemoDataProjectDocument["systemWorkflowArchitecture"];
};

export default function ComputerVisionPipelineCard({
  data,
}: ComputerVisionPipelineCardProps) {
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
      <Stack spacing={{ xs: 4, md: 5 }}>
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
            {data.subtitle}
          </Typography>
          <Typography
            component="h3"
            sx={titleTypeSx("contentCardTitle", {
              color: FINDING_NEMO_HEADLINE_COLOR,
              fontWeight: 700,
              lineHeight: 1.2,
              m: 0,
            })}
          >
            {data.illustration.title}
          </Typography>
        </Stack>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr",
            alignItems: "center",
            gap: { xs: 4, md: 6 },
            [breakpointMediaQuery.desktopUp]: {
              gridTemplateColumns: "minmax(0, 1fr) minmax(360px, 1fr)",
              gap: 7,
            },
          }}
        >
          <Stack spacing={{ xs: 2.5, md: 3 }}>
            {data.illustration.paragraphs?.map((paragraph) => (
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

          <Box
            sx={{
              width: "100%",
              maxWidth: 440,
              mx: "auto",
            }}
          >
            <ProjectImage
              objectPath={data.illustration.objectPath}
              alt={data.illustration.alt}
              width={data.illustration.width}
              height={data.illustration.height}
              style={{
                display: "block",
                width: "100%",
                height: "auto",
                maxWidth: "100%",
              }}
            />
          </Box>
        </Box>

        <Box
          sx={{
            width: "100%",
            borderTop: `1px solid ${IDENTIFY_AI_OPPORTUNITY_CARD.border}`,
            pt: { xs: 2, md: 2.5 },
          }}
        >
          <Typography
            component="p"
            sx={bodyTypeSx("smallCaption", {
              fontWeight: 400,
              lineHeight: 1.5,
              textAlign: "center",
              m: 0,
            })}
          >
            {data.illustration.annotation}
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
}
