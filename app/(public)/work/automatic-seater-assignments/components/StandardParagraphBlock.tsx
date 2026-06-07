import React from "react";
import { Box, Container, Stack, Typography } from "@mui/material";
import type { ResponsiveStyleValue } from "@mui/system";
import type { ReadMoreWordConfig } from "../researchMethodTypes";

import {
  CASE_STUDY_CONTAINER_MAX_WIDTH,
  caseStudyContainerSx,
  caseStudySectionGutterSx,
} from "../caseStudyLayout";
import { aosFadeUp } from "../aosProps";

export type StandardParagraphBlockProps = {
  title?: string;
  paragraphs?: string[];
  paragraphReadMore?: ReadMoreWordConfig;
  bullets?: string[];
  /** Defaults to square markers (current design). */
  bulletMarker?: "square" | "dot" | "dash";
  /** Optional extra spacing above the block wrapper. */
  paddingTop?: ResponsiveStyleValue<number | string>;
  /** Optional extra spacing below the block wrapper. */
  paddingBottom?: ResponsiveStyleValue<number | string>;
};

export function StandardParagraphBlock({
  title,
  paragraphs,
  paragraphReadMore,
  bullets,
  bulletMarker = "square",
  paddingTop,
  paddingBottom,
}: StandardParagraphBlockProps) {
  const [expandedParagraphs, setExpandedParagraphs] = React.useState(false);

  React.useEffect(() => {
    setExpandedParagraphs(false);
  }, [paragraphs, paragraphReadMore]);

  const getLimitForParagraphIndex = (index: number): number | undefined => {
    if (!paragraphReadMore) return undefined;
    const mapLimit = paragraphReadMore.wordLimitsByParagraphIndex?.[index];
    if (typeof mapLimit === "number") return mapLimit;
    if (index === 0) return paragraphReadMore.firstParagraphWords;
    if (index === 1) return paragraphReadMore.secondParagraphWords;
    return undefined;
  };

  const truncateAtWordLimit = (text: string, limit: number): string => {
    const words = text.trim().split(/\s+/);
    if (words.length <= limit) return text;
    return words.slice(0, limit).join(" ");
  };

  const displayedParagraphs = React.useMemo(() => {
    if (!paragraphs) return [];
    if (expandedParagraphs || !paragraphReadMore) return paragraphs;
    const triggerIndex = paragraphReadMore.expandTriggerParagraphIndex;
    const collapsedSource =
      typeof triggerIndex === "number" && triggerIndex >= 0
        ? paragraphs.slice(0, Math.min(triggerIndex + 1, paragraphs.length))
        : paragraphs;
    return collapsedSource.map((paragraph, index) => {
      const limit = getLimitForParagraphIndex(index);
      if (!limit || limit < 1) return paragraph;
      return truncateAtWordLimit(paragraph, limit);
    });
  }, [paragraphs, expandedParagraphs, paragraphReadMore]);

  const hasTruncatedParagraphs = React.useMemo(() => {
    if (!paragraphs || !paragraphReadMore) return false;
    const triggerIndex = paragraphReadMore.expandTriggerParagraphIndex;
    const hasHiddenParagraphs =
      typeof triggerIndex === "number" &&
      triggerIndex >= 0 &&
      triggerIndex < paragraphs.length - 1;
    return paragraphs.some((paragraph, index) => {
      const limit = getLimitForParagraphIndex(index);
      if (!limit || limit < 1) return false;
      return paragraph.trim().split(/\s+/).length > limit;
    }) || hasHiddenParagraphs;
  }, [paragraphs, paragraphReadMore]);

  const truncatedParagraphFlags = React.useMemo(() => {
    if (!paragraphs || !paragraphReadMore) return [] as boolean[];
    return paragraphs.map((paragraph, index) => {
      const limit = getLimitForParagraphIndex(index);
      if (!limit || limit < 1) return false;
      return paragraph.trim().split(/\s+/).length > limit;
    });
  }, [paragraphs, paragraphReadMore]);

  const expandTriggerParagraphIndex = React.useMemo(() => {
    if (!paragraphReadMore) return -1;
    if (typeof paragraphReadMore.expandTriggerParagraphIndex === "number") {
      const paragraphCount = paragraphs?.length ?? 0;
      if (paragraphCount === 0) return -1;
      return Math.max(
        0,
        Math.min(paragraphReadMore.expandTriggerParagraphIndex, paragraphCount - 1),
      );
    }
    return truncatedParagraphFlags.findIndex(Boolean);
  }, [paragraphReadMore, truncatedParagraphFlags, paragraphs?.length]);

  const readToggleColor = paragraphReadMore?.textColor ?? "#ffffff";
  const readToggleFontFamily = paragraphReadMore?.fontFamily ?? "'Poppins', Helvetica";
  const readToggleFontWeight = paragraphReadMore?.fontWeight ?? 600;
  const readToggleFontSize = paragraphReadMore?.fontSize ?? "inherit";
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
    <Box
      {...aosFadeUp()}
      sx={{ ...caseStudySectionGutterSx, pt: paddingTop, pb: paddingBottom }}
    >
      <Container maxWidth={CASE_STUDY_CONTAINER_MAX_WIDTH} sx={caseStudyContainerSx}>
        <Stack alignItems="flex-start" spacing={4} sx={{ pb: 8 }}>
          {title ? (
            <Typography
              component="h2"
              variant="h4"
              fontFamily="'Poppins', Helvetica"
              fontWeight="bold"
              color="white"
              textAlign="center"
              alignSelf="stretch"
            >
              {title}
            </Typography>
          ) : null}
          {paragraphs?.length ? (
            <Box sx={{ display: "flex", flexDirection: "column", flexWrap: "wrap", width: "100%", gap: 3 }}>
              {displayedParagraphs.map((text, index) => (
                <Typography
                  key={index}
                  component="p"
                  fontFamily="'Poppins', Helvetica"
                  fontWeight={500}
                  color="#cfcccc"
                  fontSize={{ xs: "1rem", md: "1.1rem", lg: "1.2rem" }}
                  sx={{ m: 0, lineHeight: "1.6" }}
                >
                  {text}
                  {!expandedParagraphs &&
                  hasTruncatedParagraphs &&
                  index === expandTriggerParagraphIndex ? (
                    <>
                      {truncatedParagraphFlags[index] ? "... " : " "}
                      <Box
                        component="button"
                        type="button"
                        onClick={() => setExpandedParagraphs(true)}
                        sx={readToggleTextSx}
                      >
                        {paragraphReadMore?.buttonLabel ?? "Read more"}
                      </Box>
                    </>
                  ) : null}
                </Typography>
              ))}
              {expandedParagraphs && hasTruncatedParagraphs ? (
                <Box
                  component="button"
                  type="button"
                  onClick={() => setExpandedParagraphs((prev) => !prev)}
                  sx={{
                    alignSelf: "flex-start",
                    ...readToggleTextSx,
                  }}
                >
                  {paragraphReadMore?.readLessButtonLabel ?? "Read less"}
                </Box>
              ) : null}
            </Box>
          ) : null}

          {bullets?.length ? (
            <Stack spacing={1.5} sx={{ width: "100%" }}>
              {bullets.map((text, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "auto 1fr",
                    columnGap: "13px",
                    alignItems: "start",
                    fontSize: { xs: "1rem", md: "1.1rem", lg: "1.2rem" },
                  }}
                >
                  {bulletMarker === "square" ? (
                    <Box
                      sx={{
                        width: 12,
                        height: 12,
                        minWidth: 12,
                        bgcolor: "#e2e3e8",
                        borderRadius: "4px",
                        mt: "0.35em",
                      }}
                    />
                  ) : bulletMarker === "dot" ? (
                    <Box
                      component="span"
                      sx={{
                        width: 8,
                        height: 8,
                        minWidth: 8,
                        borderRadius: "50%",
                        bgcolor: "#e2e3e8",
                        mt: "0.45em",
                      }}
                    />
                  ) : (
                    <Typography
                      component="span"
                      sx={{
                        color: "#cfcccc",
                        fontFamily: "'Poppins', Helvetica",
                        minWidth: "1em",
                        mt: "0.2em",
                        lineHeight: 1.6,
                      }}
                    >
                      —
                    </Typography>
                  )}

                  <Typography
                    sx={{
                      color: "#cfcccc",
                      lineHeight: 1.6,
                      fontFamily: "'Poppins', Helvetica",
                      fontSize: "inherit",
                      minWidth: 0,
                    }}
                  >
                    {text}
                  </Typography>
                </Box>
              ))}
            </Stack>
          ) : null}
        </Stack>
      </Container>
    </Box>
  );
}

export default StandardParagraphBlock;
