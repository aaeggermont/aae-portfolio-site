import { Stack, Typography } from "@mui/material";

import {
  PANEL_CONTENT_MAX_WIDTH_PX,
  sectionTitleContentGapMbSx,
} from "@/app/projects/finding-nemo/layoutConfig";
import { bodyTypeSx, titleTypeSx } from "@/app/projects/finding-nemo/typography";
import { breakpointMediaQuery } from "@/lib/responsive/breakpoints";

export type StageSectionHeaderProps = {
  sectionLabel?: string;
  title: string;
  paragraphs?: string[];
  /** Cap intro copy width (default 1100px). Set false for full content width. */
  constrainIntroWidth?: boolean;
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

/**
 * Shared stage header used across Finding Nemo numbered stages
 * (STAGE 01, STAGE 02, …): label + title + optional intro paragraphs.
 */
export default function StageSectionHeader({
  sectionLabel,
  title,
  paragraphs = [],
  constrainIntroWidth = true,
}: StageSectionHeaderProps) {
  return (
    <Stack
      sx={{
        width: "100%",
        maxWidth: constrainIntroWidth ? PANEL_CONTENT_MAX_WIDTH_PX : "none",
      }}
    >
      <Stack sx={sectionTitleContentGapMbSx}>
        {sectionLabel ? (
          <Typography component="p" align="left" sx={sectionLabelSx}>
            {sectionLabel}
          </Typography>
        ) : null}
        <Typography component="h2" align="left" sx={sectionHeadlineSx}>
          {title}
        </Typography>
      </Stack>
      {paragraphs.length > 0 ? (
        <Stack spacing={{ xs: 2.5, md: 3.5 }} component="article">
          {paragraphs.map((paragraph, index) => (
            <Typography
              key={index}
              component="p"
              sx={bodyTypeSx("sectionDescription", {
                fontWeight: 400,
                lineHeight: 1.5,
                textAlign: "left",
                m: 0,
              })}
            >
              {paragraph}
            </Typography>
          ))}
        </Stack>
      ) : null}
    </Stack>
  );
}
