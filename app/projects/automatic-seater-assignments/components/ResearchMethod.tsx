import React from "react";
import { Box, Container, Stack, Typography } from "@mui/material";

import { breakpointPx, breakpointMediaQuery } from "@/lib/responsive/breakpoints";
import { useResponsive } from "@/lib/responsive/ResponsiveQueryProvider";
import { layoutContentContainerSx } from "../layoutConfig";
import type { ResearchMethodBlockData } from "../researchMethodTypes";
import { MethodologyCard } from "./MethodologyCard";
import { ResearchMethodCardShell } from "./ResearchMethodCardShell";

type Props = {
  /** One item from `automaticSeaterAssignmentsDataProject.researchMethods` (static today; Firestore later). */
  data: ResearchMethodBlockData;
};

export const ResearchMethod = ({ data }: Props) => {
  const {
    title,
    background,
    textColors,
    introParagraphReadMore,
    introParagraphs,
    cards,
    methodologyCards,
  } = data;
  const { isMobile } = useResponsive();
  /** Read-more truncation applies on mobile only; tablet/desktop show full copy. */
  const activeIntroParagraphReadMore = isMobile ? introParagraphReadMore : undefined;
  const [expandedIntroParagraphs, setExpandedIntroParagraphs] = React.useState(false);

  React.useEffect(() => {
    setExpandedIntroParagraphs(false);
  }, [introParagraphs, introParagraphReadMore, isMobile]);

  const getLimitForParagraphIndex = (index: number): number | undefined => {
    if (!activeIntroParagraphReadMore) return undefined;
    const mapLimit = activeIntroParagraphReadMore.wordLimitsByParagraphIndex?.[index];
    if (typeof mapLimit === "number") return mapLimit;
    if (index === 0) return activeIntroParagraphReadMore.firstParagraphWords;
    if (index === 1) return activeIntroParagraphReadMore.secondParagraphWords;
    return undefined;
  };

  const truncateAtWordLimit = (text: string, limit: number): string => {
    const words = text.trim().split(/\s+/);
    if (words.length <= limit) return text;
    return words.slice(0, limit).join(" ");
  };

  const displayedIntroParagraphs = React.useMemo(() => {
    if (expandedIntroParagraphs || !activeIntroParagraphReadMore) return introParagraphs;
    const triggerIndex = activeIntroParagraphReadMore.expandTriggerParagraphIndex;
    const collapsedSource =
      typeof triggerIndex === "number" && triggerIndex >= 0
        ? introParagraphs.slice(0, Math.min(triggerIndex + 1, introParagraphs.length))
        : introParagraphs;
    return collapsedSource.map((paragraph, index) => {
      const limit = getLimitForParagraphIndex(index);
      if (!limit || limit < 1) return paragraph;
      return truncateAtWordLimit(paragraph, limit);
    });
  }, [expandedIntroParagraphs, activeIntroParagraphReadMore, introParagraphs]);

  const hasTruncatedIntroParagraphs = React.useMemo(() => {
    if (!activeIntroParagraphReadMore) return false;
    const triggerIndex = activeIntroParagraphReadMore.expandTriggerParagraphIndex;
    const hasHiddenParagraphs =
      typeof triggerIndex === "number" &&
      triggerIndex >= 0 &&
      triggerIndex < introParagraphs.length - 1;
    return introParagraphs.some((paragraph, index) => {
      const limit = getLimitForParagraphIndex(index);
      if (!limit || limit < 1) return false;
      return paragraph.trim().split(/\s+/).length > limit;
    }) || hasHiddenParagraphs;
  }, [activeIntroParagraphReadMore, introParagraphs]);

  const truncatedIntroParagraphFlags = React.useMemo(() => {
    if (!activeIntroParagraphReadMore) return [] as boolean[];
    return introParagraphs.map((paragraph, index) => {
      const limit = getLimitForParagraphIndex(index);
      if (!limit || limit < 1) return false;
      return paragraph.trim().split(/\s+/).length > limit;
    });
  }, [activeIntroParagraphReadMore, introParagraphs]);

  const expandTriggerParagraphIndex = React.useMemo(() => {
    if (!activeIntroParagraphReadMore) return -1;
    if (typeof activeIntroParagraphReadMore.expandTriggerParagraphIndex === "number") {
      return Math.max(
        0,
        Math.min(activeIntroParagraphReadMore.expandTriggerParagraphIndex, introParagraphs.length - 1),
      );
    }
    return truncatedIntroParagraphFlags.findIndex(Boolean);
  }, [activeIntroParagraphReadMore, truncatedIntroParagraphFlags, introParagraphs.length]);

  const readToggleColor = activeIntroParagraphReadMore?.textColor ?? textColors.title;
  const readToggleFontFamily =
    activeIntroParagraphReadMore?.fontFamily ?? "'Poppins', Helvetica";
  const readToggleFontWeight = activeIntroParagraphReadMore?.fontWeight ?? 600;
  const readToggleFontSize = activeIntroParagraphReadMore?.fontSize ?? "inherit";
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
    <Container maxWidth={false} sx={layoutContentContainerSx}>
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
                      {activeIntroParagraphReadMore?.buttonLabel ?? "Read more"}
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
                {activeIntroParagraphReadMore?.readLessButtonLabel ?? "Read less"}
              </Box>
            ) : null}
          </Stack>
        </Box>

        {methodologyCards && methodologyCards.length > 0 ? (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: 2,
              mt: 1,
              px: 2,
              justifyItems: "center",
              [breakpointMediaQuery.tabletUp]: {
                gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
              },
            }}
          >
            {methodologyCards.map((card) => (
              <MethodologyCard
                key={card.id}
                title={card.title}
                description={card.description}
                readInsightsLabel={card.readInsightsLabel}
              />
            ))}
          </Box>
        ) : null}

        {cards.length > 0 ? (
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
        ) : null}
      </Box>
    </Container>
  );
};

export default ResearchMethod;
