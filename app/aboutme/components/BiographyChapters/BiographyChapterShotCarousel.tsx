'use client';

import { useEffect, useState } from 'react';
import { SlideshowLightbox } from 'lightbox.js-react';

import { buildPublicStorageUrl } from '@/lib/firebase/publicStorageUrl';
import {
  lightboxIconColorForModalBackground,
  PROJECT_IMAGE_LIGHTBOX_MODAL_BG_WHITE,
} from '@/lib/media/lightboxModal';
import type { BiographyChapterShot } from '../../data/biography-chapters-data';
import styles from './biographyChapters.module.scss';

type BiographyChapterShotCarouselProps = {
  slides: BiographyChapterShot[];
  lightboxId: string;
};

function preloadImage(src: string) {
  const image = new Image();
  image.src = src;
}

/**
 * Stills carousel with the same previous, next, counter, and dot controls
 * as the Chapter 2 compare carousel.
 */
export function BiographyChapterShotCarousel({
  slides,
  lightboxId,
}: BiographyChapterShotCarouselProps) {
  const [index, setIndex] = useState(0);
  const total = slides.length;
  const slide = slides[index];
  const modalBg = PROJECT_IMAGE_LIGHTBOX_MODAL_BG_WHITE;

  useEffect(() => {
    const neighbors = [slides[index - 1], slides[index], slides[index + 1]].filter(
      (item): item is BiographyChapterShot => Boolean(item),
    );
    for (const neighbor of neighbors) {
      preloadImage(buildPublicStorageUrl(neighbor.imageObjectPath));
    }
  }, [index, slides]);

  if (!slide) return null;

  const src = buildPublicStorageUrl(slide.imageObjectPath);
  const shotLabel = String(index + 1).padStart(2, '0');
  const totalLabel = String(total).padStart(2, '0');

  const goTo = (nextIndex: number) => {
    if (nextIndex < 0 || nextIndex >= total || nextIndex === index) return;
    setIndex(nextIndex);
  };

  return (
    <div className={styles.biographyChaptersCompareCarousel}>
      <div className={styles.biographyChaptersFigureMedia}>
        <SlideshowLightbox
          framework="next"
          images={[{ src, alt: slide.alt }]}
          lightboxIdentifier={`${lightboxId}-shot-${index}`}
          showThumbnails={false}
          showSlideshowIcon={false}
          showNavigationDots={false}
          backgroundColor={modalBg}
          iconColor={lightboxIconColorForModalBackground(modalBg)}
          modalClose="clickOutside"
        >
          <img
            key={slide.imageObjectPath}
            src={src}
            alt={slide.alt}
            data-lightboxjs={`${lightboxId}-shot-${index}`}
            width={1600}
            height={900}
            className={styles.biographyChaptersFigureImage}
          />
        </SlideshowLightbox>
      </div>

      {total > 1 ? (
        <div className={styles.biographyChaptersCompareCarouselFooter}>
          <span className={styles.biographyChaptersCompareCounter}>
            {shotLabel} / {totalLabel}
          </span>
          <div className={styles.biographyChaptersCompareNavRow}>
            <button
              type="button"
              className={styles.biographyChaptersCompareNav}
              aria-label="Previous shot"
              disabled={index === 0}
              onClick={() => goTo(index - 1)}
            >
              <span aria-hidden>‹</span>
            </button>
            <div
              className={styles.biographyChaptersCompareDots}
              role="tablist"
              aria-label="Shots"
            >
              {slides.map((item, dotIndex) => (
                <button
                  key={item.imageObjectPath}
                  type="button"
                  role="tab"
                  aria-label={`Shot ${dotIndex + 1}`}
                  aria-selected={dotIndex === index}
                  className={`${styles.biographyChaptersCompareDot} ${
                    dotIndex === index
                      ? styles.biographyChaptersCompareDotActive
                      : ''
                  }`}
                  onClick={() => goTo(dotIndex)}
                />
              ))}
            </div>
            <button
              type="button"
              className={styles.biographyChaptersCompareNav}
              aria-label="Next shot"
              disabled={index === total - 1}
              onClick={() => goTo(index + 1)}
            >
              <span aria-hidden>›</span>
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
