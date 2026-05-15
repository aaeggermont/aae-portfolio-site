"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Box, IconButton, Stack } from "@mui/material";
import UserResearchMethodCard from "./UserResearchMethodCard";

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

export interface UserResearchMethodsCarouselItem {
  title: string;
  summary?: string;
}

export interface UserResearchMethodsCarouselProps {
  methods: UserResearchMethodsCarouselItem[];
}

function readScrollStepPx(track: HTMLDivElement): number {
  const first = track.querySelector<HTMLElement>("[data-carousel-card]");
  if (!first) return 400;
  const w = first.getBoundingClientRect().width;
  const styles = getComputedStyle(track);
  const raw = styles.columnGap || styles.gap || "0";
  const gap = Number.parseFloat(raw) || 0;
  return w + gap;
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
      sx={{ width: "100%" }}
    >
      <Stack spacing={3} alignItems="stretch" sx={{ width: "100%" }}>
        {/* Apple-style: stay in the padded column for a stable layout; only cancel the
           inner’s right padding so the row can scroll flush to the grey band’s right edge.
           Avoid `50vw` width math here — it was widening the document and fighting
           ResizeObserver-driven state updates (freeze on large screens). */}
        <Box
          sx={{
            boxSizing: "border-box",
            minWidth: 0,
            marginRight: "calc(-1 * var(--layout-margin))",
            width: "calc(100% + var(--layout-margin))",
          }}
        >
          <Box
            ref={scrollRef}
            sx={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "nowrap",
              gap: { xs: 2, sm: 3 },
              overflowX: "auto",
              overflowY: "hidden",
              width: "100%",
              scrollBehavior: "smooth",
              WebkitOverflowScrolling: "touch",
              scrollbarWidth: "thin",
              pb: 0.5,
            }}
          >
            {methods.map((method, index) => (
              <Box
                key={`${method.title}-${index}`}
                data-carousel-card
                sx={{
                  flex: "0 0 auto",
                  width: { xs: 300, sm: 360, md: 400 },
                  maxWidth: "100%",
                }}
              >
                <UserResearchMethodCard
                  title={method.title}
                  summary={method.summary}
                />
              </Box>
            ))}
          </Box>
        </Box>
        <Stack
          direction="row"
          spacing={1}
          justifyContent="flex-end"
          sx={{ width: "100%" }}
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
