"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import {
  AboutMeMoreCard,
  type AboutMeMoreCardType,
} from "@/app/aboutme/components/AboutMeMore/AboutMeMoreCard";
import { usePrefersReducedMotion } from "@/lib/hooks/usePrefersReducedMotion";

import styles from "./about-me-more-carousel.module.scss";

const SCROLL_EDGE_EPSILON = 8;

export type AboutMeMoreCarouselItem = {
  type: AboutMeMoreCardType;
  title: string;
  description?: string;
};

type AboutMeMoreCarouselProps = {
  items: readonly AboutMeMoreCarouselItem[];
  selected: AboutMeMoreCardType;
  onSelect: (type: AboutMeMoreCardType) => void;
};

function readScrollStepPx(track: HTMLDivElement): number {
  const first = track.querySelector<HTMLElement>("[data-carousel-card]");
  if (!first) return 304;
  const w = first.getBoundingClientRect().width;
  const marginEnd = Number.parseFloat(getComputedStyle(first).marginInlineEnd) || 0;
  const cardStep = w + marginEnd;
  const visibleCards = Math.max(1, Math.round(track.clientWidth / cardStep));
  return cardStep * visibleCards;
}

function cardsPeekOffscreen(track: HTMLDivElement): {
  peeksLeft: boolean;
  peeksRight: boolean;
} {
  const cards = track.querySelectorAll<HTMLElement>("[data-carousel-card]");
  if (!cards.length) return { peeksLeft: false, peeksRight: false };

  const trackRect = track.getBoundingClientRect();
  const firstRect = cards[0].getBoundingClientRect();
  const lastRect = cards[cards.length - 1].getBoundingClientRect();

  return {
    peeksLeft: firstRect.left < trackRect.left - SCROLL_EDGE_EPSILON,
    peeksRight: lastRect.right > trackRect.right + SCROLL_EDGE_EPSILON,
  };
}

function AnimatedCardShell({
  children,
  index,
}: {
  children: ReactNode;
  index: number;
}) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(prefersReducedMotion);

  useEffect(() => {
    if (prefersReducedMotion) {
      setInView(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        threshold: 0.15,
        rootMargin: "0px 0px -10% 0px",
      },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  return (
    <div
      ref={ref}
      data-carousel-card
      className={`${styles.cardShell} ${inView ? styles.cardInView : ""}`}
      style={{
        transitionDelay:
          inView && !prefersReducedMotion ? `${index * 90}ms` : "0ms",
      }}
    >
      {children}
    </div>
  );
}

export function AboutMeMoreCarousel({
  items,
  selected,
  onSelect,
}: AboutMeMoreCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [needsCarouselNav, setNeedsCarouselNav] = useState(false);

  const updateScrollHints = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;

    const { peeksLeft, peeksRight } = cardsPeekOffscreen(el);
    const overflow = peeksLeft || peeksRight;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    const nextPrev = peeksLeft || scrollLeft > SCROLL_EDGE_EPSILON;
    const nextNext =
      peeksRight ||
      scrollLeft + clientWidth < scrollWidth - SCROLL_EDGE_EPSILON;

    setNeedsCarouselNav((p) => (p === overflow ? p : overflow));
    setCanScrollPrev((p) => (p === nextPrev ? p : nextPrev));
    setCanScrollNext((p) => (p === nextNext ? p : nextNext));
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollLeft = 0;
    const id = requestAnimationFrame(() => updateScrollHints());
    return () => cancelAnimationFrame(id);
  }, [items.length, updateScrollHints]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onScroll = () => updateScrollHints();
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateScrollHints);

    const resizeObserver = new ResizeObserver(() => updateScrollHints());
    resizeObserver.observe(el);

    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateScrollHints);
      resizeObserver.disconnect();
    };
  }, [items.length, updateScrollHints]);

  const scrollByStep = (direction: 1 | -1) => {
    const track = scrollRef.current;
    if (!track) return;
    track.scrollBy({
      left: direction * readScrollStepPx(track),
      behavior: "smooth",
    });
  };

  if (!items.length) return null;

  return (
    <div
      className={styles.carousel}
      role="region"
      aria-label="Experience, education, and training topics"
    >
      <div ref={scrollRef} className={styles.track}>
        <div className={styles.gutterSpacer} aria-hidden="true" />
        {items.map((item, index) => (
          <AnimatedCardShell key={item.type} index={index}>
            <AboutMeMoreCard
              type={item.type}
              title={item.title}
              description={item.description}
              selected={item.type === selected}
              onClick={(type) => {
                if (type) onSelect(type);
              }}
            />
          </AnimatedCardShell>
        ))}
        <div className={styles.gutterSpacer} aria-hidden="true" />
      </div>

      {needsCarouselNav ? (
        <div className={styles.nav}>
          <button
            type="button"
            className={styles.navButton}
            aria-label="Show previous topics"
            disabled={!canScrollPrev}
            onClick={() => {
              if (canScrollPrev) scrollByStep(-1);
            }}
          >
            <ArrowBackIosNewIcon sx={{ fontSize: 16 }} />
          </button>
          <button
            type="button"
            className={`${styles.navButton} ${styles.navButtonNext}`}
            aria-label="Show more topics"
            disabled={!canScrollNext}
            onClick={() => {
              if (canScrollNext) scrollByStep(1);
            }}
          >
            <ArrowForwardIosIcon sx={{ fontSize: 16 }} />
          </button>
        </div>
      ) : null}
    </div>
  );
}

export default AboutMeMoreCarousel;
