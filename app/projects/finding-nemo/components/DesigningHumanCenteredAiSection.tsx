import { Box, Container, Stack, Typography } from "@mui/material";

import ContentCardsRow from "@/app/projects/finding-nemo/components/ContentCardsRow";
import {
  HUMAN_CENTERED_AI_FRAMEWORK_CARD,
  HUMAN_CENTERED_AI_FRAMEWORK_CARD_GAP,
  INTRO_SECTIONS_BACKGROUND,
  INTRO_NARRATIVE_MAX_WIDTH_PX,
  LAYOUT_DIMENSIONS,
  MY_CONTRIBUTIONS_CARD,
  sectionTitleContentGapMbSx,
} from "@/app/projects/finding-nemo/layoutConfig";
import { bodyTypeSx, titleTypeSx } from "@/app/projects/finding-nemo/typography";
import { breakpointMediaQuery } from "@/lib/responsive/breakpoints";
import type { FindingNemoDataProjectDocument } from "@/scripts/project-2.data";

type DesigningHumanCenteredAiSectionProps = {
  data: FindingNemoDataProjectDocument["designingHumanCenteredAi"];
};

export default function DesigningHumanCenteredAiSection({
  data,
}: DesigningHumanCenteredAiSectionProps) {
  return (
    <Box
      component="section"
      sx={{
        bgcolor: INTRO_SECTIONS_BACKGROUND,
        py: { xs: 8, md: 10, lg: 12 },
        px: LAYOUT_DIMENSIONS.mobile.margin,
        [breakpointMediaQuery.tabletUp]: {
          px: LAYOUT_DIMENSIONS.tablet.margin,
        },
        [breakpointMediaQuery.desktopUp]: {
          px: LAYOUT_DIMENSIONS.desktop.margin,
        },
      }}
    >
      <Container
        maxWidth={false}
        sx={{
          maxWidth: {
            xs: LAYOUT_DIMENSIONS.mobile.maxWidth,
            md: LAYOUT_DIMENSIONS.tablet.maxWidth,
            lg: LAYOUT_DIMENSIONS.desktop.maxWidth,
          },
        }}
      >
        <Stack
          spacing={{ xs: 5, md: 6, lg: 8 }}
          alignItems="center"
          sx={{ width: "100%" }}
        >
          <Box
            sx={{
              maxWidth: INTRO_NARRATIVE_MAX_WIDTH_PX,
              width: "100%",
              mx: "auto",
              textAlign: "center",
            }}
          >
            <Typography
              component="h2"
              align="center"
              sx={titleTypeSx("sectionTitle", {
                fontWeight: 700,
                color: "text.primary",
                lineHeight: 1.2,
                ...sectionTitleContentGapMbSx,
              })}
            >
              {data.title}
            </Typography>
            <Box component="article">
              {data.paragraphs.map((paragraph, index) => (
                <Typography
                  key={index}
                  component="p"
                  align="center"
                  sx={bodyTypeSx("sectionDescription", {
                    color: "text.primary",
                    fontWeight: 400,
                    lineHeight: 1.5,
                    mb: index === data.paragraphs.length - 1 ? 0 : 3.5,
                  })}
                >
                  {paragraph}
                </Typography>
              ))}
            </Box>
          </Box>

          <ContentCardsRow
            layout="grid"
            cardBackgroundColor={MY_CONTRIBUTIONS_CARD.background}
            centeredFixedGrid={{
              gaps: HUMAN_CENTERED_AI_FRAMEWORK_CARD_GAP,
              cardWidths: {
                mobile: HUMAN_CENTERED_AI_FRAMEWORK_CARD.mobile.width,
                tablet: HUMAN_CENTERED_AI_FRAMEWORK_CARD.tablet.width,
                desktop: HUMAN_CENTERED_AI_FRAMEWORK_CARD.desktop.width,
              },
            }}
            cards={data.cards.map((card) => ({
              title: card.title,
              description: card.description,
              responsiveDimensions: HUMAN_CENTERED_AI_FRAMEWORK_CARD,
              descriptionTextAlign: "center",
            }))}
          />
        </Stack>
      </Container>
    </Box>
  );
}
