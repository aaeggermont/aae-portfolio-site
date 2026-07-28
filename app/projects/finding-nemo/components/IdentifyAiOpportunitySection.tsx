"use client";

import { Box, Stack, Typography } from "@mui/material";

import {
  BAND_COLORS,
  IDENTIFY_AI_OPPORTUNITY_CARD,
  PANEL_CONTENT_MAX_WIDTH_PX,
  SECTION_GAPS,
  sectionTitleContentGapMbSx,
  sectionTitleContentGapMtSx,
} from "@/app/projects/finding-nemo/layoutConfig";
import FullBleedBand from "@/app/projects/finding-nemo/components/FullBleedBand";
import StageInfoCardsRow from "@/app/projects/finding-nemo/components/StageInfoCardsRow";
import { bodyTypeSx, titleTypeSx } from "@/app/projects/finding-nemo/typography";
import { breakpointMediaQuery } from "@/lib/responsive/breakpoints";
import type { FindingNemoDataProjectDocument } from "@/scripts/project-2.data";

type IdentifyAiOpportunitySectionProps = {
  framing: FindingNemoDataProjectDocument["problemSpaceFraming"];
  challenges: FindingNemoDataProjectDocument["challenges"];
  businessOpportunities: FindingNemoDataProjectDocument["businessOpportunities"];
};

const sectionLabelSx = [
  titleTypeSx("heroSubtitle", {
    fontWeight: 500,
    color: "#0B6E9F",
    lineHeight: 1.2,
    mb: 1.5,
    textTransform: "uppercase",
    letterSpacing: "0.04em",
  }),
  {
    [breakpointMediaQuery.desktopUp]: {
      fontSize: "22px",
    },
  },
] as const;

const sectionHeadlineSx = titleTypeSx("sectionTitle", {
  fontWeight: 700,
  color: "#073B5E",
  lineHeight: 1.2,
});

const subsectionTitleSx = titleTypeSx("sectionSubtitle", {
  fontWeight: 700,
  color: "#073B5E",
  lineHeight: 1.2,
});

const sectionStackGapSx = {
  mt: SECTION_GAPS.mobile,
  [breakpointMediaQuery.tabletUp]: {
    mt: SECTION_GAPS.tablet,
  },
  [breakpointMediaQuery.desktopUp]: {
    mt: SECTION_GAPS.desktop,
  },
} as const;

export default function IdentifyAiOpportunitySection({
  framing,
  challenges,
  businessOpportunities,
}: IdentifyAiOpportunitySectionProps) {
  const introParagraphs = framing.paragraphs ?? [];

  return (
    <FullBleedBand backgroundColor={BAND_COLORS.identifyAiOpportunity}>
      <Stack spacing={0} sx={{ width: "100%" }}>
        <Box sx={{ width: "100%", maxWidth: PANEL_CONTENT_MAX_WIDTH_PX }}>
          <Stack sx={sectionTitleContentGapMbSx}>
            {framing.sectionLabel ? (
              <Typography component="p" align="left" sx={sectionLabelSx}>
                {framing.sectionLabel}
              </Typography>
            ) : null}
            <Typography component="h2" align="left" sx={sectionHeadlineSx}>
              {framing.title}
            </Typography>
          </Stack>
          {introParagraphs.length > 0 ? (
            <Box component="article">
              {introParagraphs.map((paragraph, index) => (
                <Typography
                  key={index}
                  component="p"
                  sx={bodyTypeSx("sectionDescription", {
                    fontWeight: 400,
                    lineHeight: 1.5,
                    textAlign: "left",
                    mb: index === introParagraphs.length - 1 ? 0 : 3.5,
                  })}
                >
                  {paragraph}
                </Typography>
              ))}
            </Box>
          ) : null}
        </Box>

        <StageInfoCardsRow
          cards={challenges.cards}
          titleColor={IDENTIFY_AI_OPPORTUNITY_CARD.opportunityTitleColor}
          sx={sectionTitleContentGapMtSx}
        />

        <Stack spacing={{ xs: 3, md: 4 }} sx={sectionStackGapSx}>
          <Typography component="h3" align="left" sx={subsectionTitleSx}>
            {businessOpportunities.title}
          </Typography>
          <StageInfoCardsRow
            cards={businessOpportunities.cards}
            titleColor={IDENTIFY_AI_OPPORTUNITY_CARD.opportunityTitleColor}
          />
        </Stack>
      </Stack>
    </FullBleedBand>
  );
}
