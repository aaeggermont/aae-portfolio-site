import { Box, Container, Stack, Typography } from "@mui/material";

import ContentCardsRow from "@/app/projects/finding-nemo/components/ContentCardsRow";
import {
  HUMAN_CENTERED_AI_FRAMEWORK_CARD,
  HUMAN_CENTERED_AI_FRAMEWORK_CARD_GAP,
  INTRO_SECTIONS_BACKGROUND,
  MY_CONTRIBUTIONS_CARD,
  PROJECT_CONTENT_CONTAINER_SX,
  sectionTitleContentGapMbSx,
} from "@/app/projects/finding-nemo/layoutConfig";
import { bodyTypeSx, titleTypeSx } from "@/app/projects/finding-nemo/typography";
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
      }}
    >
      <Container maxWidth={false} sx={PROJECT_CONTENT_CONTAINER_SX}>
        <Stack spacing={{ xs: 5, md: 6, lg: 8 }} sx={{ width: "100%" }}>
          <Box sx={{ width: "100%" }}>
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
                  sx={bodyTypeSx("sectionDescription", {
                    color: "text.primary",
                    fontWeight: 400,
                    lineHeight: 1.5,
                    textAlign: "left",
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

          {data.paragraphAfterCards ? (
            <Typography
              component="p"
              sx={bodyTypeSx("sectionDescription", {
                color: "text.primary",
                fontWeight: 400,
                lineHeight: 1.5,
                textAlign: "left",
                m: 0,
              })}
            >
              {data.paragraphAfterCards}
            </Typography>
          ) : null}
        </Stack>
      </Container>
    </Box>
  );
}
