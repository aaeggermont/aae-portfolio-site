import type { CSSProperties } from "react";

/** Selected Work project cards — single source of truth for dimensions. */
export const SELECTED_WORK_CARD = {
  widthPx: 294,
  heightPx: 390,
  contentPaddingPx: 20,
} as const;

/** Carousel — active slide full size; inactive slides scale down. */
export const SELECTED_WORK_CAROUSEL = {
  inactiveScale: 0.94,
  activeScale: 1,
} as const;

/** Space below the carousel track for pagination + consistent section gutter. */
export const SELECTED_WORK_CAROUSEL_GUTTER = {
  paddingBottomRem: 2.5,
} as const;

export const selectedWorkLayoutStyle = {
  "--selected-work-card-width": `${SELECTED_WORK_CARD.widthPx}px`,
  "--selected-work-card-height": `${SELECTED_WORK_CARD.heightPx}px`,
  "--selected-work-carousel-inactive-scale": String(
    SELECTED_WORK_CAROUSEL.inactiveScale,
  ),
  "--selected-work-carousel-active-scale": String(
    SELECTED_WORK_CAROUSEL.activeScale,
  ),
  "--selected-work-carousel-padding-bottom": `${SELECTED_WORK_CAROUSEL_GUTTER.paddingBottomRem}rem`,
} as CSSProperties;
