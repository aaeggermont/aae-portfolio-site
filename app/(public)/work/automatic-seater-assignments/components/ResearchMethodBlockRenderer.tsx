"use client";

import React from "react";
import { Box, Stack, Typography } from "@mui/material";

import type {
  ResearchCardContentBlock,
  RichParagraphSegment,
} from "../researchMethodTypes";
import { ResearchMethodImageBlock } from "./ResearchMethodImageBlock";
import { ReusableComponent } from "./ReusableComponent";
import UserPersonas from "./UserPersonas";

const bodyTextBaseSx = {
  color: "#ffffff",
  lineHeight: 1.6,
  fontFamily: "'Poppins', Helvetica",
} as const;

const paragraphSx = {
  ...bodyTextBaseSx,
  fontSize: { xs: "1rem", md: "1rem", lg: "1.2rem" },
} as const;

const bulletTextSx = {
  ...bodyTextBaseSx,
  fontSize: "inherit",
  minWidth: 0,
} as const;

const bulletRowFontSx = {
  fontSize: { xs: "1rem", md: "1rem", lg: "1.2rem" },
} as const;

type Props = {
  block: ResearchCardContentBlock;
};

const renderRichParagraphSegment = (
  segment: RichParagraphSegment,
  key: string,
  emphasisColor: string,
) => {
  const isEmphasis = segment.style === "emphasis";
  return (
    <Box
      key={key}
      component="span"
      sx={
        isEmphasis
          ? {
              color: emphasisColor,
              fontWeight: 600,
            }
          : undefined
      }
    >
      {segment.text}
    </Box>
  );
};

const wordsInText = (text: string): string[] => text.trim().split(/\s+/).filter(Boolean);

const wordCountForParagraphValue = (paragraph: string | RichParagraphSegment[]): number => {
  if (typeof paragraph === "string") return wordsInText(paragraph).length;
  return paragraph.reduce((total, segment) => total + wordsInText(segment.text).length, 0);
};

const truncatePlainParagraph = (text: string, limit: number): string => {
  const words = wordsInText(text);
  if (words.length <= limit) return text;
  return words.slice(0, limit).join(" ");
};

const truncateRichParagraph = (
  segments: RichParagraphSegment[],
  limit: number,
): RichParagraphSegment[] => {
  let remaining = limit;
  const result: RichParagraphSegment[] = [];

  for (const segment of segments) {
    if (remaining <= 0) break;
    const words = wordsInText(segment.text);
    if (words.length <= remaining) {
      result.push(segment);
      remaining -= words.length;
      continue;
    }
    result.push({
      ...segment,
      text: words.slice(0, remaining).join(" "),
    });
    remaining = 0;
    break;
  }

  return result;
};

export const ResearchMethodBlockRenderer = ({ block }: Props) => {
  switch (block.type) {
    case "paragraphs": {
      const paragraphColor = block.textColors?.paragraph ?? "#ffffff";
      const emphasisColor = block.textColors?.emphasis ?? "#EDD84A";
      const [expandedParagraphs, setExpandedParagraphs] = React.useState(false);

      React.useEffect(() => {
        setExpandedParagraphs(false);
      }, [block.id, block.readMore, block.paragraphs]);

      const getLimitForParagraphIndex = (index: number): number | undefined => {
        if (!block.readMore) return undefined;
        const mapLimit = block.readMore.wordLimitsByParagraphIndex?.[index];
        if (typeof mapLimit === "number") return mapLimit;
        if (index === 0) return block.readMore.firstParagraphWords;
        if (index === 1) return block.readMore.secondParagraphWords;
        return undefined;
      };

      const truncatedParagraphFlags = React.useMemo(() => {
        if (!block.readMore) return [] as boolean[];
        return block.paragraphs.map((paragraph, index) => {
          const limit = getLimitForParagraphIndex(index);
          if (!limit || limit < 1) return false;
          return wordCountForParagraphValue(paragraph) > limit;
        });
      }, [block.paragraphs, block.readMore]);

      const expandTriggerParagraphIndex = React.useMemo(() => {
        if (!block.readMore) return -1;
        if (typeof block.readMore.expandTriggerParagraphIndex === "number") {
          return Math.max(
            0,
            Math.min(block.readMore.expandTriggerParagraphIndex, block.paragraphs.length - 1),
          );
        }
        return truncatedParagraphFlags.findIndex(Boolean);
      }, [block.readMore, block.paragraphs.length, truncatedParagraphFlags]);

      const displayedParagraphs = React.useMemo(() => {
        if (expandedParagraphs || !block.readMore) return block.paragraphs;
        const collapsedSource =
          typeof block.readMore.expandTriggerParagraphIndex === "number" &&
          block.readMore.expandTriggerParagraphIndex >= 0
            ? block.paragraphs.slice(
                0,
                Math.min(
                  block.readMore.expandTriggerParagraphIndex + 1,
                  block.paragraphs.length,
                ),
              )
            : block.paragraphs;
        return collapsedSource.map((paragraph, index) => {
          const limit = getLimitForParagraphIndex(index);
          if (!limit || limit < 1) return paragraph;
          if (typeof paragraph === "string") return truncatePlainParagraph(paragraph, limit);
          return truncateRichParagraph(paragraph, limit);
        });
      }, [block.paragraphs, block.readMore, expandedParagraphs]);

      const hasTruncatedParagraphs = React.useMemo(() => {
        if (!block.readMore) return false;
        const hasHiddenParagraphs =
          typeof block.readMore.expandTriggerParagraphIndex === "number" &&
          block.readMore.expandTriggerParagraphIndex >= 0 &&
          block.readMore.expandTriggerParagraphIndex < block.paragraphs.length - 1;
        return truncatedParagraphFlags.some(Boolean) || hasHiddenParagraphs;
      }, [block.readMore, block.paragraphs.length, truncatedParagraphFlags]);

      const readToggleColor = block.readMore?.textColor ?? "#ffffff";
      const readToggleFontFamily = block.readMore?.fontFamily ?? "'Poppins', Helvetica";
      const readToggleFontWeight = block.readMore?.fontWeight ?? 600;
      const readToggleFontSize = block.readMore?.fontSize ?? "inherit";
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
        <Stack spacing={1.5} py={2}>
          {displayedParagraphs.map((paragraph, i) => (
            <Typography
              key={`${block.id}-p-${i}`}
              sx={{ ...paragraphSx, color: paragraphColor }}
            >
              {typeof paragraph === "string"
                ? paragraph
                : paragraph.map((segment, j) =>
                    renderRichParagraphSegment(
                      segment,
                      `${block.id}-p-${i}-seg-${j}`,
                      emphasisColor,
                    ),
                  )}
              {!expandedParagraphs &&
              hasTruncatedParagraphs &&
              i === expandTriggerParagraphIndex ? (
                <>
                  {truncatedParagraphFlags[i] ? "... " : " "}
                  <Box
                    component="button"
                    type="button"
                    onClick={() => setExpandedParagraphs(true)}
                    sx={readToggleTextSx}
                  >
                    {block.readMore?.buttonLabel ?? "Read more"}
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
              {block.readMore?.readLessButtonLabel ?? "Read less"}
            </Box>
          ) : null}
        </Stack>
      );
    }
    case "bullets": {
      const marker = block.marker ?? "square";
      return (
        <Stack spacing={1.5} px={0.5}>
          {block.items.map((text, index) => (
            <Box
              key={`${block.id}-b-${index}`}
              sx={{
                ...bulletRowFontSx,
                display: "grid",
                gridTemplateColumns: "auto 1fr",
                columnGap: "13px",
                alignItems: "start",
              }}
            >
              {marker === "square" ? (
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
              ) : marker === "dot" ? (
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
                  sx={{ ...bulletTextSx, minWidth: "1em", mt: "0.2em" }}
                >
                  —
                </Typography>
              )}
              <Typography
                sx={{
                  ...bulletTextSx,
                  fontSize: { xs: "0.9rem", md: "1rem", lg: "1rem" },
                }}
              >
                {text}
              </Typography>
            </Box>
          ))}
        </Stack>
      );
    }
    case "image":
      return <ResearchMethodImageBlock block={block} />;
    case "reusableComponent":
      return (
        <ReusableComponent
          title={block.title}
          description={block.description}
          objectPath={block.objectPath}
          alt={block.alt}
          projectKey={block.projectKey}
          sizes={block.sizes}
          textColors={block.textColors}
        />
      );
    case "userPersonas":
      return <UserPersonas personas={block.personas} />;
    case "custom":
      return <Box sx={{ px: 2 }}>{block.node}</Box>;
    default: {
      const _exhaustive: never = block;
      return _exhaustive;
    }
  }
};
