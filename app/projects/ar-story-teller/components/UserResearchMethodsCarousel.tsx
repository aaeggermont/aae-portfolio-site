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
    setCanScrollPrev(scrollLeft > SCROLL_EDGE_EPSILON);
    setCanScrollNext(
      scrollLeft + clientWidth < scrollWidth - SCROLL_EDGE_EPSILON,
    );
  }, []);

  useEffect(() => {
    updateScrollHints();
  }, [methods, updateScrollHints]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    el.addEventListener("scroll", updateScrollHints, { passive: true });
    const ro = new ResizeObserver(() => updateScrollHints());
    ro.observe(el);

    window.addEventListener("resize", updateScrollHints);

    return () => {
      el.removeEventListener("scroll", updateScrollHints);
      ro.disconnect();
      window.removeEventListener("resize", updateScrollHints);
    };
  }, [methods.length, updateScrollHints]);

  const handlePrevious = () => {
    const track = scrollRef.current;
    if (!track || !canScrollPrev) return;

    const view = track.getBoundingClientRect();
    const cards = Array.from(
      track.querySelectorAll<HTMLElement>("[data-carousel-card]"),
    ).reverse();

    for (const card of cards) {
      const r = card.getBoundingClientRect();
      if (r.left < view.left - SCROLL_EDGE_EPSILON) {
        card.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "end",
        });
        return;
      }
    }
  };

  const handleNext = () => {
    const track = scrollRef.current;
    if (!track || !canScrollNext) return;

    const view = track.getBoundingClientRect();
    const cards = track.querySelectorAll<HTMLElement>("[data-carousel-card]");

    for (const card of cards) {
      const r = card.getBoundingClientRect();
      if (r.right > view.right + SCROLL_EDGE_EPSILON) {
        card.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "start",
        });
        return;
      }
    }
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
