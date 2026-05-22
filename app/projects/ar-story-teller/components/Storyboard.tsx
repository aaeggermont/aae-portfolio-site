"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Box } from "@mui/material";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import type { EmblaCarouselType } from "embla-carousel";
import ProjectImage from "@/lib/media/ProjectImage";
import {
  breakpointMediaQuery,
  breakpointPx,
} from "@/lib/responsive/breakpoints";
import {
  cssLengthToPx,
  getPanelInnerWidthPx,
  LAYOUT_DIMENSIONS,
  PANEL_BLOCK_PADDINGS,
  PANEL_CONTENT_MAX_WIDTH_PX,
  STORYBOARD_SLIDE_GAP,
} from "../layoutConfig";
import type { StoryboardSlide } from "../sections/DesignSystemSection";
import styles from "./Storyboard.module.scss";

const MAIN_IMAGE_INTRINSIC_WIDTH = 960;
const MAIN_IMAGE_INTRINSIC_HEIGHT = 540;
const THUMB_IMAGE_SIZE = 144;

const MAIN_IMAGE_SIZES = [
  `(max-width: ${breakpointPx.mobileMax}px) calc(100vw - ${
    cssLengthToPx(LAYOUT_DIMENSIONS.mobile.margin) * 2 +
    cssLengthToPx(PANEL_BLOCK_PADDINGS.x.mobile) * 2
  }px)`,
  `(max-width: ${breakpointPx.tabletMax}px) min(calc(100vw - ${
    cssLengthToPx(LAYOUT_DIMENSIONS.tablet.margin) * 2 +
    cssLengthToPx(PANEL_BLOCK_PADDINGS.x.tablet) * 2
  }px), ${getPanelInnerWidthPx("tablet")}px)`,
  `${getPanelInnerWidthPx("desktop")}px`,
].join(", ");

/** Max rendered height at desktop inner width (16:9), capped for viewport comfort. */
const MAIN_IMAGE_MAX_HEIGHT_DESKTOP_PX = Math.min(
  540,
  Math.round((getPanelInnerWidthPx("desktop") * 9) / 16),
);

const THUMB_IMAGE_SIZES = `(max-width: ${breakpointPx.tabletMax}px) 72px, 72px`;

/** Auto Scroll: continuous motion; pauses on interaction (arrows, thumbs, keyboard). */
const AUTO_SCROLL_OPTIONS = {
  speed: 0.65,
  startDelay: 1200,
  stopOnInteraction: true,
  stopOnMouseEnter: true,
  stopOnFocusIn: true,
} as const;

export interface StoryboardProps {
  title: string;
  slides: StoryboardSlide[];
}

export function Storyboard({ title, slides }: StoryboardProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const thumbRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "center", duration: 28 },
    [AutoScroll(AUTO_SCROLL_OPTIONS)],
  );

  const onSelect = useCallback((api: EmblaCarouselType | undefined) => {
    if (!api) return;
    setSelectedIndex(api.selectedScrollSnap());
  }, []);

  const scrollTo = useCallback(
    (index: number) => {
      emblaApi?.scrollTo(index);
    },
    [emblaApi],
  );

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect(emblaApi);
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("reInit", onSelect).on("select", onSelect);

    return () => {
      emblaApi.off("reInit", onSelect).off("select", onSelect);
    };
  }, [emblaApi, onSelect, slides.length]);

  useEffect(() => {
    const thumb = thumbRefs.current[selectedIndex];
    thumb?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [selectedIndex]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        scrollPrev();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        scrollNext();
      }
    };

    root.addEventListener("keydown", onKeyDown);
    return () => root.removeEventListener("keydown", onKeyDown);
  }, [scrollNext, scrollPrev]);

  if (!slides.length) {
    return null;
  }

  const slideCount = scrollSnaps.length || slides.length;

  return (
    <Box
      ref={rootRef}
      component="section"
      className={styles.root}
      aria-roledescription="carousel"
      aria-label={title}
      tabIndex={0}
      sx={{
        width: "100%",
        maxWidth: PANEL_CONTENT_MAX_WIDTH_PX,
        mx: "auto",
      }}
    >
      <h3 className={styles.heading}>{title}</h3>

      <div className={styles.viewportWrap}>
        <button
          type="button"
          className={`${styles.navButton} ${styles.navButtonPrev}`}
          aria-label="Previous storyboard slide"
          onClick={scrollPrev}
        >
          <ArrowBackIosNewIcon sx={{ fontSize: 18 }} aria-hidden />
        </button>

        <Box
          ref={emblaRef}
          className={styles.embla}
          sx={{
            px: PANEL_BLOCK_PADDINGS.x.mobile,
            py: PANEL_BLOCK_PADDINGS.y.mobile,
            ["--storyboard-slide-gap" as string]: STORYBOARD_SLIDE_GAP.mobile,
            [breakpointMediaQuery.tabletUp]: {
              px: PANEL_BLOCK_PADDINGS.x.tablet,
              py: PANEL_BLOCK_PADDINGS.y.tablet,
              ["--storyboard-slide-gap" as string]: STORYBOARD_SLIDE_GAP.tablet,
            },
            [breakpointMediaQuery.desktopUp]: {
              px: PANEL_BLOCK_PADDINGS.x.desktop,
              py: PANEL_BLOCK_PADDINGS.y.desktop,
              ["--storyboard-slide-gap" as string]: STORYBOARD_SLIDE_GAP.desktop,
            },
          }}
        >
          <div className={styles.embla__container}>
            {slides.map((slide, index) => (
              <div
                className={styles.embla__slide}
                key={`${slide.image.objectPath}-${index}`}
                role="group"
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${slideCount}: ${slide.title}`}
              >
                <div className={styles.slideInner}>
                  <div className={styles.slideImageFrame}>
                    <ProjectImage
                      objectPath={slide.image.objectPath}
                      alt={slide.image.alt}
                      width={MAIN_IMAGE_INTRINSIC_WIDTH}
                      height={MAIN_IMAGE_INTRINSIC_HEIGHT}
                      unoptimized={false}
                      sizes={MAIN_IMAGE_SIZES}
                      priority={index === 0}
                      style={{
                        display: "block",
                        width: "100%",
                        height: "auto",
                        maxWidth: "100%",
                        maxHeight: `min(56vh, ${MAIN_IMAGE_MAX_HEIGHT_DESKTOP_PX}px)`,
                        objectFit: "contain",
                      }}
                    />
                  </div>
                  <div className={styles.slideCaption}>
                    <p className={styles.slideTitle}>{slide.title}</p>
                    <p className={styles.slideDescription}>{slide.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Box>

        <button
          type="button"
          className={`${styles.navButton} ${styles.navButtonNext}`}
          aria-label="Next storyboard slide"
          onClick={scrollNext}
        >
          <ArrowForwardIosIcon sx={{ fontSize: 18 }} aria-hidden />
        </button>
      </div>

      <div className={styles.thumbsRegion} aria-label="Storyboard thumbnails">
        <div className={styles.thumbsViewport}>
          <div className={styles.thumbsList} role="tablist">
            {slides.map((slide, index) => {
              const isSelected = index === selectedIndex;

              return (
                <button
                  key={`thumb-${slide.image.objectPath}-${index}`}
                  ref={(el) => {
                    thumbRefs.current[index] = el;
                  }}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  aria-label={`Go to slide ${index + 1}: ${slide.title}`}
                  className={`${styles.thumbButton} ${
                    isSelected ? styles.thumbButtonSelected : ""
                  }`}
                  onClick={() => scrollTo(index)}
                >
                  <ProjectImage
                    objectPath={slide.image.objectPath}
                    alt=""
                    width={THUMB_IMAGE_SIZE}
                    height={THUMB_IMAGE_SIZE}
                    unoptimized={false}
                    sizes={THUMB_IMAGE_SIZES}
                    style={{
                      display: "block",
                      width: "100%",
                      height: "auto",
                    }}
                    className={styles.thumbImage}
                  />
                </button>
              );
            })}
          </div>
        </div>
        <p className={styles.srOnly} aria-live="polite">
          Slide {selectedIndex + 1} of {slideCount}: {slides[selectedIndex]?.title}
        </p>
      </div>
    </Box>
  );
}

export default Storyboard;
