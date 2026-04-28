import React from "react";
import { Box, Stack, Typography } from "@mui/material";

import { breakpointPx } from "@/lib/responsive/breakpoints";
import { caseStudySectionGutterSx } from "../caseStudyLayout";
import type { ResearchMethodBlockData } from "../researchMethodTypes";
import { ResearchMethodCardShell } from "./ResearchMethodCardShell";

type Props = {
  /** One item from `automaticSeaterAssignmentsDataProject.researchMethods` (static today; Firestore later). */
  data: ResearchMethodBlockData;
};

export const ResearchMethod = ({ data }: Props) => {
  const {
    kicker,
    title,
    background,
    textColors,
    introParagraphReadMore,
    introParagraphs,
    cards,
  } = data;
  const [expandedIntroParagraphs, setExpandedIntroParagraphs] = React.useState(false);

  React.useEffect(() => {
    setExpandedIntroParagraphs(false);
  }, [introParagraphs, introParagraphReadMore]);

  const getLimitForParagraphIndex = (index: number): number | undefined => {
    if (!introParagraphReadMore) return undefined;
    const mapLimit = introParagraphReadMore.wordLimitsByParagraphIndex?.[index];
    if (typeof mapLimit === "number") return mapLimit;
    if (index === 0) return introParagraphReadMore.firstParagraphWords;
    if (index === 1) return introParagraphReadMore.secondParagraphWords;
    return undefined;
  };

  const truncateAtWordLimit = (text: string, limit: number): string => {
    const words = text.trim().split(/\s+/);
    if (words.length <= limit) return text;
    return words.slice(0, limit).join(" ");
  };

  const displayedIntroParagraphs = React.useMemo(() => {
    if (expandedIntroParagraphs || !introParagraphReadMore) return introParagraphs;
    const triggerIndex = introParagraphReadMore.expandTriggerParagraphIndex;
    const collapsedSource =
      typeof triggerIndex === "number" && triggerIndex >= 0
        ? introParagraphs.slice(0, Math.min(triggerIndex + 1, introParagraphs.length))
        : introParagraphs;
    return collapsedSource.map((paragraph, index) => {
      const limit = getLimitForParagraphIndex(index);
      if (!limit || limit < 1) return paragraph;
      return truncateAtWordLimit(paragraph, limit);
    });
  }, [expandedIntroParagraphs, introParagraphReadMore, introParagraphs]);

  const hasTruncatedIntroParagraphs = React.useMemo(() => {
    if (!introParagraphReadMore) return false;
    const triggerIndex = introParagraphReadMore.expandTriggerParagraphIndex;
    const hasHiddenParagraphs =
      typeof triggerIndex === "number" &&
      triggerIndex >= 0 &&
      triggerIndex < introParagraphs.length - 1;
    return introParagraphs.some((paragraph, index) => {
      const limit = getLimitForParagraphIndex(index);
      if (!limit || limit < 1) return false;
      return paragraph.trim().split(/\s+/).length > limit;
    }) || hasHiddenParagraphs;
  }, [introParagraphReadMore, introParagraphs]);

  const truncatedIntroParagraphFlags = React.useMemo(() => {
    if (!introParagraphReadMore) return [] as boolean[];
    return introParagraphs.map((paragraph, index) => {
      const limit = getLimitForParagraphIndex(index);
      if (!limit || limit < 1) return false;
      return paragraph.trim().split(/\s+/).length > limit;
    });
  }, [introParagraphReadMore, introParagraphs]);

  const expandTriggerParagraphIndex = React.useMemo(() => {
    if (!introParagraphReadMore) return -1;
    if (typeof introParagraphReadMore.expandTriggerParagraphIndex === "number") {
      return Math.max(
        0,
        Math.min(introParagraphReadMore.expandTriggerParagraphIndex, introParagraphs.length - 1),
      );
    }
    return truncatedIntroParagraphFlags.findIndex(Boolean);
  }, [introParagraphReadMore, truncatedIntroParagraphFlags, introParagraphs.length]);

  const readToggleColor = introParagraphReadMore?.textColor ?? textColors.title;
  const readToggleFontFamily =
    introParagraphReadMore?.fontFamily ?? "'Poppins', Helvetica";
  const readToggleFontWeight = introParagraphReadMore?.fontWeight ?? 600;
  const readToggleFontSize = introParagraphReadMore?.fontSize ?? "inherit";
  const readToggleTextSx = {
    border: "none",
    background: "transparent",
    p: 0,
    m: 0,
    cursor: "pointer",
    fontFamily: readToggleFontFamily,
    fontWeight: readToggleFontWeight,
    color: readToggleColor,
    fontSize: readToggleFontSize,
    textTransform: "none",
    lineHeight: 1.6,
  } as const;

  return (
    <Box sx={caseStudySectionGutterSx}>
      <Box
        sx={{
          width: "100%",
          maxWidth: { xs: 655, md: 815, lg: 960, xl: 960 },
          minWidth: breakpointPx.mobileMin,
          mx: "auto",
          borderRadius: "32px",
          overflow: "hidden",
          borderTop: "1px solid #a8a8a8",
          background,
          py: { xs: 3, md: 6, lg: 8 },
          px: { xs: 3, md: 6, lg: 8 },
        }}
      >
        <Stack spacing={0} mb={2} px={2}>
          <Typography
            variant="subtitle1"
            sx={{
              fontFamily: "'Poppins', Helvetica",
              fontWeight: "bold",
              color: textColors.kicker,
              fontSize: { xs: "1.1rem", md: "1.2rem", lg: "1.4rem" },
              lineHeight: "normal",
              textAlign: { xs: "center", md: "left", lg: "left" },
            }}
          >
            {kicker}
          </Typography>
          <Typography
            variant="h3"
            sx={{
              fontFamily: "'Poppins', Helvetica",
              fontWeight: "bold",
              color: textColors.title,
              fontSize: { xs: "1.1rem", md: "1.8rem", lg: "2rem" },
              textAlign: { xs: "center", md: "left", lg: "left" },
              lineHeight: "normal",
            }}
          >
            {title}
          </Typography>
        </Stack>

        <Box p={2}>
          <Stack spacing={2}>
            {displayedIntroParagraphs.map((paragraph, i) => (
              <Typography
                key={`intro-${i}`}
                sx={{
                  color: textColors.introParagraph,
                  fontSize: { xs: "1rem", md: "1.1rem", lg: "1.2rem" },
                  lineHeight: 1.6,
                  fontFamily: "'Poppins', Helvetica",
                }}
              >
                {paragraph}
                {!expandedIntroParagraphs &&
                hasTruncatedIntroParagraphs &&
                i === expandTriggerParagraphIndex ? (
                  <>
                    {truncatedIntroParagraphFlags[i] ? "... " : " "}
                    <Box
                      component="button"
                      type="button"
                      onClick={() => setExpandedIntroParagraphs(true)}
                      sx={readToggleTextSx}
                    >
                      {introParagraphReadMore?.buttonLabel ?? "Read more"}
                    </Box>
                  </>
                ) : null}
              </Typography>
            ))}
            {expandedIntroParagraphs && hasTruncatedIntroParagraphs ? (
              <Box
                component="button"
                type="button"
                onClick={() => setExpandedIntroParagraphs((prev) => !prev)}
                sx={{
                  alignSelf: "flex-start",
                  ...readToggleTextSx,
                }}
              >
                {introParagraphReadMore?.readLessButtonLabel ?? "Read less"}
              </Box>
            ) : null}
          </Stack>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", lg: "row" },
            gap: 2,
            mt: 1,
            px: 2,
            justifyContent: "space-between",
          }}
        >
          {cards.map((card) => (
            <Box
              key={card.id}
              sx={{ flex: { xs: "1 1 auto", lg: "1 1 0" }, minWidth: 0 }}
            >
              <ResearchMethodCardShell card={card} />
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default ResearchMethod;
