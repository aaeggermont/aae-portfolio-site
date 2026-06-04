"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Box, IconButton, Stack } from "@mui/material";
import UserResearchMethodCard from "./UserResearchMethodCard";
import type { ResearchMethodCardData } from "../types/researchMethodCard";

/** Matches `ContextualNotifications` — shared prev/next control styling. */
const navigationButtons = [
  {
    key: "previous",
    label: "Show previous research methods",
    icon: <ArrowBackIosNewIcon sx={{ fontSize: 16 }} />,
  },
  {
    key: "next",
    label: "Show more research methods",
    icon: <ArrowForwardIosIcon sx={{ fontSize: 16 }} />,
  },
] as const;

const SCROLL_EDGE_EPSILON = 4;

export interface UserResearchMethodsCarouselProps {
  methods: ResearchMethodCardData[];
}

function readScrollStepPx(track: HTMLDivElement): number {
  const first = track.querySelector<HTMLElement>("[data-carousel-card]");
  if (!first) return 400;
  const w = first.getBoundingClientRect().width;
  const styles = getComputedStyle(track);
  const raw = styles.columnGap || styles.gap || "0";
  const gap = Number.parseFloat(raw) || 0;
  return (w + gap) * 3;
}

export function UserResearchMethodsCarousel({
  methods,
}: UserResearchMethodsCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const updateScrollHints = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    const nextPrev = scrollLeft > SCROLL_EDGE_EPSILON;
    const nextNext =
      scrollLeft + clientWidth < scrollWidth - SCROLL_EDGE_EPSILON;
    setCanScrollPrev((p) => (p === nextPrev ? p : nextPrev));
    setCanScrollNext((p) => (p === nextNext ? p : nextNext));
  }, []);

  useEffect(() => {
    updateScrollHints();
  }, [methods, updateScrollHints]);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.scrollLeft = 0;
    }
    updateScrollHints();
  }, [methods.length, updateScrollHints]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onScroll = () => updateScrollHints();
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateScrollHints);

    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateScrollHints);
    };
  }, [methods.length, updateScrollHints]);

  const scrollByStep = (direction: 1 | -1) => {
    const track = scrollRef.current;
    if (!track) return;
    const step = readScrollStepPx(track);
    track.scrollBy({ left: direction * step, behavior: "smooth" });
  };

  const handlePrevious = () => {
    if (!canScrollPrev) return;
    scrollByStep(-1);
  };

  const handleNext = () => {
    if (!canScrollNext) return;
    scrollByStep(1);
  };

  if (!methods.length) {
    return null;
  }

  return (
    <Box
      role="region"
      aria-label="Research methods"
      sx={{
        width: "100vw",
        maxWidth: "none",
        marginLeft: "calc(50% - 50vw)",
        boxSizing: "border-box",
      }}
    >
      <Stack spacing={3} alignItems="stretch" sx={{ width: "100%" }}>
        {/* Leading gutter matches `--guest-needs-content-gutter` on `.guestNeedsCarouselStrip`
           / `.guestNeedsBleed` (see `DesignSystemSection.module.scss`). First-card alignment
           with the copy column can be revisited with a small layout pass if needed. */}
        <Box
          ref={scrollRef}
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "nowrap",
            alignItems: "stretch",
            gap: { xs: 2, sm: 3 },
            overflowX: "auto",
            overflowY: "hidden",
            width: "100%",
            minWidth: 0,
            boxSizing: "border-box",
            scrollBehavior: "smooth",
            WebkitOverflowScrolling: "touch",
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": {
              display: "none",
            },
            scrollSnapType: "x proximity",
            pb: 0.5,
            paddingInline: "var(--guest-needs-content-gutter, var(--layout-margin))",
            scrollPaddingInline: "var(--guest-needs-content-gutter, var(--layout-margin))",
          }}
        >
          {methods.map((method, index) => (
            <Box
              key={`${method.title}-${index}`}
              data-carousel-card
              sx={{
                flex: "0 0 auto",
                width: {
                  xs: "calc(100vw - 2 * var(--guest-needs-content-gutter, var(--layout-margin)))",
                  sm: "calc((100vw - 2 * var(--guest-needs-content-gutter, var(--layout-margin)) - 48px) / 3)",
                  md: "calc((100vw - 2 * var(--guest-needs-content-gutter, var(--layout-margin)) - 48px) / 3)",
                },
                maxWidth: "100%",
                scrollSnapAlign: "start",
                display: "flex",
              }}
            >
              <UserResearchMethodCard method={method} />
            </Box>
          ))}
        </Box>
        <Stack
          direction="row"
          spacing={1}
          justifyContent="flex-end"
          sx={{
            width: "100%",
            boxSizing: "border-box",
            paddingInline:
              "var(--guest-needs-content-gutter, var(--layout-margin))",
          }}
        >
          {navigationButtons.map((button) => (
            <IconButton
              key={button.key}
              aria-label={button.label}
              disabled={
                button.key === "previous" ? !canScrollPrev : !canScrollNext
              }
              onClick={
                button.key === "previous" ? handlePrevious : handleNext
              }
              size="small"
              sx={{
                width: 30,
                height: 30,
                bgcolor:
                  button.key === "next" ? "#142257" : "#f1f1f3",
                color: button.key === "next" ? "#ffffff" : "#11255f",
                "&.Mui-disabled": {
                  bgcolor: "#f1f1f3",
                  color: "rgba(17, 37, 95, 0.28)",
                },
                "&:hover": {
                  bgcolor:
                    button.key === "next" ? "#1d317a" : "#e8e8ec",
                },
              }}
            >
              {button.icon}
            </IconButton>
          ))}
        </Stack>
      </Stack>
    </Box>
  );
}

export default UserResearchMethodsCarousel;
