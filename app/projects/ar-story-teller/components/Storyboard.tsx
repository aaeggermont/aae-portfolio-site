"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Box } from "@mui/material";
import useEmblaCarousel from "embla-carousel-react";
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
  STORYBOARD_MAIN_IMAGE_DESKTOP,
} from "../layoutConfig";
import type { StoryboardSlide } from "../types/designSystemTypes";
import styles from "./Storyboard.module.scss";

const MAIN_IMAGE_INTRINSIC_WIDTH = STORYBOARD_MAIN_IMAGE_DESKTOP.maxWidthPx;
const MAIN_IMAGE_INTRINSIC_HEIGHT = STORYBOARD_MAIN_IMAGE_DESKTOP.maxHeightPx;
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
  `${STORYBOARD_MAIN_IMAGE_DESKTOP.maxWidthPx}px`,
].join(", ");

const THUMB_IMAGE_SIZES = `(max-width: ${breakpointPx.tabletMax}px) 72px, 72px`;

export interface StoryboardProps {
  title: string;
  slides: StoryboardSlide[];
}

export function Storyboard({ title, slides }: StoryboardProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [thumbsCanScrollPrev, setThumbsCanScrollPrev] = useState(false);
  const [thumbsCanScrollNext, setThumbsCanScrollNext] = useState(false);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    duration: 28,
  });

  const [thumbsEmblaRef, thumbsEmblaApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    align: "center",
    dragFree: false,
  });

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

  const updateThumbsNavState = useCallback((api: EmblaCarouselType | undefined) => {
    if (!api) return;
    setThumbsCanScrollPrev(api.canScrollPrev());
    setThumbsCanScrollNext(api.canScrollNext());
  }, []);

  const scrollThumbsPrev = useCallback(() => {
    thumbsEmblaApi?.scrollPrev();
  }, [thumbsEmblaApi]);

  const scrollThumbsNext = useCallback(() => {
    thumbsEmblaApi?.scrollNext();
  }, [thumbsEmblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    const snapToFirstSlide = () => {
      emblaApi.scrollTo(0, true);
      onSelect(emblaApi);
      setScrollSnaps(emblaApi.scrollSnapList());
    };

    snapToFirstSlide();
    emblaApi.on("init", snapToFirstSlide).on("reInit", snapToFirstSlide);
    emblaApi.on("select", onSelect);

    return () => {
      emblaApi.off("init", snapToFirstSlide);
      emblaApi.off("reInit", snapToFirstSlide);
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect, slides.length]);

  useEffect(() => {
    if (!thumbsEmblaApi) return;

    updateThumbsNavState(thumbsEmblaApi);
    thumbsEmblaApi.on("reInit", updateThumbsNavState).on("select", updateThumbsNavState);

    return () => {
      thumbsEmblaApi.off("reInit", updateThumbsNavState);
      thumbsEmblaApi.off("select", updateThumbsNavState);
    };
  }, [thumbsEmblaApi, updateThumbsNavState, slides.length]);

  useEffect(() => {
    if (!thumbsEmblaApi) return;
    thumbsEmblaApi.scrollTo(selectedIndex);
  }, [selectedIndex, thumbsEmblaApi]);

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
          className={styles.emblaPanel}
          sx={{
            px: PANEL_BLOCK_PADDINGS.x.mobile,
            py: PANEL_BLOCK_PADDINGS.y.mobile,
            [breakpointMediaQuery.tabletUp]: {
              px: PANEL_BLOCK_PADDINGS.x.tablet,
              py: PANEL_BLOCK_PADDINGS.y.tablet,
            },
            [breakpointMediaQuery.desktopUp]: {
              px: PANEL_BLOCK_PADDINGS.x.desktop,
              py: PANEL_BLOCK_PADDINGS.y.desktop,
              ["--storyboard-image-max-width" as string]: `${STORYBOARD_MAIN_IMAGE_DESKTOP.maxWidthPx}px`,
              ["--storyboard-image-max-height" as string]: `${STORYBOARD_MAIN_IMAGE_DESKTOP.maxHeightPx}px`,
            },
          }}
        >
          <div ref={emblaRef} className={styles.emblaViewport}>
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
                    <div className={styles.slideImageWrap}>
                      <ProjectImage
                        objectPath={slide.image.objectPath}
                        alt={slide.image.alt}
                        width={MAIN_IMAGE_INTRINSIC_WIDTH}
                        height={MAIN_IMAGE_INTRINSIC_HEIGHT}
                        unoptimized
                        sizes={MAIN_IMAGE_SIZES}
                        priority={index === 0}
                        className={styles.slideImage}
                      />
                    </div>
                  </div>
                  <div className={styles.slideCaption}>
                    <p className={styles.slideTitle}>{slide.title}</p>
                    <p className={styles.slideDescription}>{slide.description}</p>
                  </div>
                </div>
              </div>
            ))}
            </div>
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
        <div className={styles.thumbsCarouselWrap}>
          <button
            type="button"
            className={`${styles.thumbsNavButton} ${styles.thumbsNavButtonPrev}`}
            aria-label="Scroll thumbnails back"
            onClick={scrollThumbsPrev}
            disabled={!thumbsCanScrollPrev}
          >
            <ArrowBackIosNewIcon sx={{ fontSize: 16 }} aria-hidden />
          </button>

          <div ref={thumbsEmblaRef} className={styles.thumbsEmbla}>
            <div className={styles.thumbsEmbla__container} role="tablist">
              {slides.map((slide, index) => {
                const isSelected = index === selectedIndex;

                return (
                  <div
                    key={`thumb-${slide.image.objectPath}-${index}`}
                    className={styles.thumbsEmbla__slide}
                  >
                    <button
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
                  </div>
                );
              })}
            </div>
          </div>

          <button
            type="button"
            className={`${styles.thumbsNavButton} ${styles.thumbsNavButtonNext}`}
            aria-label="Scroll thumbnails forward"
            onClick={scrollThumbsNext}
            disabled={!thumbsCanScrollNext}
          >
            <ArrowForwardIosIcon sx={{ fontSize: 16 }} aria-hidden />
          </button>
        </div>
        <p className={styles.srOnly} aria-live="polite">
          Slide {selectedIndex + 1} of {slideCount}: {slides[selectedIndex]?.title}
        </p>
      </div>
    </Box>
  );
}

export default Storyboard;
