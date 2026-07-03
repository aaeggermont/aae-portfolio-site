import React from "react";
import { Box, Container, Stack, Typography } from "@mui/material";
import type { ResponsiveStyleValue } from "@mui/system";
import type { ReadMoreWordConfig } from "../researchMethodTypes";

import {
  layoutContentContainerSx,
} from "../layoutConfig";
import { useResponsive } from "@/lib/responsive/ResponsiveQueryProvider";
import { breakpointMediaQuery } from "@/lib/responsive/breakpoints";
import { bodyTypeSx, mergeSx, titleTypeSx } from "../typography";

const narrativeBodySx = bodyTypeSx("narrativeBody", { m: 0 });

export type StandardParagraphBlockProps = {
  title?: string;
  subtitle?: string;
  paragraphs?: string[];
  paragraphReadMore?: ReadMoreWordConfig;
  bullets?: string[];
  /** Optional color overrides (e.g. per-panel theming). */
  titleColor?: string;
  subtitleColor?: string;
  paragraphColor?: string;
  /** When true, omits the outer `Container` for embedding inside `ResearchMethod` panels. */
  embedded?: boolean;
  /** Defaults to square markers (current design). */
  bulletMarker?: "square" | "dot" | "dash";
  /** Optional extra spacing above the block wrapper. */
  paddingTop?: ResponsiveStyleValue<number | string>;
  /** Optional extra spacing below the block wrapper. */
  paddingBottom?: ResponsiveStyleValue<number | string>;
  /** Optional max width (px or CSS length) for the block content. */
  maxWidth?: number | string;
};

export function StandardParagraphBlock({
  title,
  subtitle,
  paragraphs,
  paragraphReadMore,
  bullets,
  bulletMarker = "square",
  titleColor,
  subtitleColor,
  paragraphColor,
  paddingTop,
  paddingBottom,
  maxWidth,
  embedded = false,
}: StandardParagraphBlockProps) {
  const { isMobile } = useResponsive();
  /** Read-more truncation applies on mobile only; tablet/desktop show full copy. */
  const activeParagraphReadMore = isMobile ? paragraphReadMore : undefined;

  const [expandedParagraphs, setExpandedParagraphs] = React.useState(false);

  React.useEffect(() => {
    setExpandedParagraphs(false);
  }, [paragraphs, paragraphReadMore, isMobile]);

  const getLimitForParagraphIndex = (index: number): number | undefined => {
    if (!activeParagraphReadMore) return undefined;
    const mapLimit = activeParagraphReadMore.wordLimitsByParagraphIndex?.[index];
    if (typeof mapLimit === "number") return mapLimit;
    if (index === 0) return activeParagraphReadMore.firstParagraphWords;
    if (index === 1) return activeParagraphReadMore.secondParagraphWords;
    return undefined;
  };

  const truncateAtWordLimit = (text: string, limit: number): string => {
    const words = text.trim().split(/\s+/);
    if (words.length <= limit) return text;
    return words.slice(0, limit).join(" ");
  };

  const displayedParagraphs = React.useMemo(() => {
    if (!paragraphs) return [];
    if (expandedParagraphs || !activeParagraphReadMore) return paragraphs;
    const triggerIndex = activeParagraphReadMore.expandTriggerParagraphIndex;
    const collapsedSource =
      typeof triggerIndex === "number" && triggerIndex >= 0
        ? paragraphs.slice(0, Math.min(triggerIndex + 1, paragraphs.length))
        : paragraphs;
    return collapsedSource.map((paragraph, index) => {
      const limit = getLimitForParagraphIndex(index);
      if (!limit || limit < 1) return paragraph;
      return truncateAtWordLimit(paragraph, limit);
    });
  }, [paragraphs, expandedParagraphs, activeParagraphReadMore]);

  const hasTruncatedParagraphs = React.useMemo(() => {
    if (!paragraphs || !activeParagraphReadMore) return false;
    const triggerIndex = activeParagraphReadMore.expandTriggerParagraphIndex;
    const hasHiddenParagraphs =
      typeof triggerIndex === "number" &&
      triggerIndex >= 0 &&
      triggerIndex < paragraphs.length - 1;
    return paragraphs.some((paragraph, index) => {
      const limit = getLimitForParagraphIndex(index);
      if (!limit || limit < 1) return false;
      return paragraph.trim().split(/\s+/).length > limit;
    }) || hasHiddenParagraphs;
  }, [paragraphs, activeParagraphReadMore]);

  const truncatedParagraphFlags = React.useMemo(() => {
    if (!paragraphs || !activeParagraphReadMore) return [] as boolean[];
    return paragraphs.map((paragraph, index) => {
      const limit = getLimitForParagraphIndex(index);
      if (!limit || limit < 1) return false;
      return paragraph.trim().split(/\s+/).length > limit;
    });
  }, [paragraphs, activeParagraphReadMore]);

  const expandTriggerParagraphIndex = React.useMemo(() => {
    if (!activeParagraphReadMore) return -1;
    if (typeof activeParagraphReadMore.expandTriggerParagraphIndex === "number") {
      const paragraphCount = paragraphs?.length ?? 0;
      if (paragraphCount === 0) return -1;
      return Math.max(
        0,
        Math.min(activeParagraphReadMore.expandTriggerParagraphIndex, paragraphCount - 1),
      );
    }
    return truncatedParagraphFlags.findIndex(Boolean);
  }, [activeParagraphReadMore, truncatedParagraphFlags, paragraphs?.length]);

  const readToggleColor = activeParagraphReadMore?.textColor ?? "#ffffff";
  const readToggleFontFamily = activeParagraphReadMore?.fontFamily ?? "'Poppins', Helvetica";
  const readToggleFontWeight = activeParagraphReadMore?.fontWeight ?? 600;
  const readToggleFontSize = activeParagraphReadMore?.fontSize ?? "inherit";
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

  const content = (
    <Stack
      alignItems="flex-start"
      spacing={4}
      sx={{
        width: "100%",
        ...(maxWidth ? { maxWidth, mx: "auto" } : {}),
        pb: embedded ? (paddingBottom ?? 0) : 8,
        pt: paddingTop ?? 0,
      }}
    >
      {title || subtitle ? (
        <Stack spacing={1} alignSelf="stretch" alignItems="stretch">
          {title ? (
            <Typography
              component="h2"
              textAlign="center"
              sx={titleTypeSx("sectionTitle", {
                [breakpointMediaQuery.desktopUp]: { fontSize: "34px" },
                ...(titleColor ? { color: titleColor } : {}),
              })}
            >
              {title}
            </Typography>
          ) : null}
          {subtitle ? (
            <Typography
              component="p"
              sx={mergeSx(
                titleTypeSx("sectionSubtitle", {
                  m: 0,
                  ...(subtitleColor ? { color: subtitleColor } : {}),
                }),
                embedded
                  ? {
                      textAlign: "center",
                      [breakpointMediaQuery.tabletUp]: { textAlign: "left" },
                    }
                  : { textAlign: "center" },
              )}
            >
              {subtitle}
            </Typography>
          ) : null}
        </Stack>
      ) : null}
      {paragraphs?.length ? (
        <Box sx={{ display: "flex", flexDirection: "column", flexWrap: "wrap", width: "100%", gap: 3 }}>
          {displayedParagraphs.map((text, index) => (
            <Typography
              key={index}
              component="p"
              sx={paragraphColor ? mergeSx(narrativeBodySx, { color: paragraphColor }) : narrativeBodySx}
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
                    {activeParagraphReadMore?.buttonLabel ?? "Read more"}
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
              {activeParagraphReadMore?.readLessButtonLabel ?? "Read less"}
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
                ...narrativeBodySx,
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
                    ...narrativeBodySx,
                    minWidth: "1em",
                    mt: "0.2em",
                  }}
                >
                  —
                </Typography>
              )}

              <Typography sx={{ ...narrativeBodySx, minWidth: 0 }}>
                {text}
              </Typography>
            </Box>
          ))}
        </Stack>
      ) : null}
    </Stack>
  );

  if (embedded) {
    return content;
  }

  return (
    <Container maxWidth={false} sx={{ ...layoutContentContainerSx, pt: paddingTop, pb: paddingBottom }}>
      {content}
    </Container>
  );
}

export default StandardParagraphBlock;
