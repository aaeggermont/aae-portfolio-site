'use client';

import { useCallback, useRef, useState, type MouseEvent } from 'react';
import { SlideshowLightbox } from 'lightbox.js-react';

import {
  lightboxIconColorForModalBackground,
  PROJECT_IMAGE_LIGHTBOX_MODAL_BG_WHITE,
} from '@/lib/media/lightboxModal';
import { buildPublicStorageUrl } from '@/lib/firebase/publicStorageUrl';
import type { BiographyChapterFigure } from '../../data/biography-chapters-data';
import { BiographyChapterCompareMedia } from './BiographyChapterCompareMedia';
import { BiographyChapterFullPageDialog } from './BiographyChapterFullPageDialog';
import { BiographyChapterShotCarousel } from './BiographyChapterShotCarousel';
import { BiographyChapterVimeoPoster } from './BiographyChapterVimeoPoster';
import styles from './biographyChapters.module.scss';

type BiographyChapterFigureProps = {
  figure: BiographyChapterFigure;
  /** Stable id for lightbox.js (unique per figure on the page). */
  lightboxId: string;
};

export function BiographyChapterFigureBlock({
  figure,
  lightboxId,
}: BiographyChapterFigureProps) {
  const src = buildPublicStorageUrl(figure.imageObjectPath);
  const carousel = figure.compareCarousel;
  const pairs = carousel?.pairs ?? [];
  const slides = figure.shotCarousel?.slides ?? [];
  const hasVimeo = Boolean(figure.vimeo?.videoId);

  const modalBg = PROJECT_IMAGE_LIGHTBOX_MODAL_BG_WHITE;
  const hasColumnCaptions = figure.captions.length > 0;
  const hasPublicationCaption = Boolean(
    figure.captionTitle?.length || figure.captionCredit,
  );
  const hasAnnotation = Boolean(figure.annotation);
  const fullPagePreview = figure.fullPagePreview;
  const [fullPageOpen, setFullPageOpen] = useState(false);
  const openerRef = useRef<HTMLElement | null>(null);

  const openFullPage = (event: MouseEvent<HTMLElement>) => {
    openerRef.current = event.currentTarget;
    setFullPageOpen(true);
  };

  const closeFullPage = useCallback(() => {
    setFullPageOpen(false);
    openerRef.current?.focus();
  }, []);

  return (
    <figure className={styles.biographyChaptersFigure}>
      {pairs.length > 0 && carousel ? (
        <BiographyChapterCompareMedia
          pairs={pairs}
          holdMs={carousel.holdMs ?? 3000}
          durationMs={carousel.durationMs ?? 1400}
        />
      ) : slides.length > 0 ? (
        <BiographyChapterShotCarousel slides={slides} lightboxId={lightboxId} />
      ) : hasVimeo ? (
        <BiographyChapterVimeoPoster figure={figure} />
      ) : fullPagePreview ? (
        <div className={styles.biographyChaptersFigureMedia}>
          <button
            type="button"
            className={styles.biographyChaptersFigurePreview}
            aria-haspopup="dialog"
            onClick={openFullPage}
          >
            <img
              src={src}
              alt={figure.alt}
              width={1600}
              height={900}
              className={styles.biographyChaptersFigureImage}
            />
          </button>
        </div>
      ) : (
        <div className={styles.biographyChaptersFigureMedia}>
          <SlideshowLightbox
            framework="next"
            images={[{ src, alt: figure.alt }]}
            lightboxIdentifier={lightboxId}
            showThumbnails={false}
            showSlideshowIcon={false}
            showNavigationDots={false}
            backgroundColor={modalBg}
            iconColor={lightboxIconColorForModalBackground(modalBg)}
            modalClose="clickOutside"
          >
            <img
              src={src}
              alt={figure.alt}
              data-lightboxjs={lightboxId}
              width={1600}
              height={900}
              className={styles.biographyChaptersFigureImage}
            />
          </SlideshowLightbox>
        </div>
      )}
      {hasPublicationCaption ? (
        <figcaption className={styles.biographyChaptersFigurePublicationCaption}>
          {figure.captionTitle?.map((line, index) => (
            <span
              key={`caption-title-${index}`}
              className={styles.biographyChaptersFigureCaptionTitle}
            >
              {line}
            </span>
          ))}
          {figure.captionCredit ? (
            <span className={styles.biographyChaptersFigureCaptionCredit}>
              {figure.captionCredit}
            </span>
          ) : null}
        </figcaption>
      ) : null}
      {hasAnnotation ? (
        <figcaption className={styles.biographyChaptersFigureAnnotation}>
          {figure.annotation}
        </figcaption>
      ) : null}
      {hasColumnCaptions ? (
        <figcaption className={styles.biographyChaptersFigureCaptions}>
          {figure.captions.map((column, columnIndex) => (
            <div
              key={`caption-col-${columnIndex}`}
              className={
                column.boldFirstLine
                  ? `${styles.biographyChaptersFigureCaptionColumn} ${styles.biographyChaptersFigureCaptionAnnotationSize}`
                  : styles.biographyChaptersFigureCaptionColumn
              }
            >
              {column.lines.map((line, lineIndex) => (
                <span
                  key={`caption-line-${columnIndex}-${lineIndex}`}
                  className={
                    column.boldFirstLine && lineIndex === 0
                      ? styles.biographyChaptersFigureCaptionLead
                      : undefined
                  }
                >
                  {line}
                </span>
              ))}
            </div>
          ))}
        </figcaption>
      ) : null}
      {fullPagePreview ? (
        <button
          type="button"
          className={styles.biographyChaptersExplorePage}
          aria-haspopup="dialog"
          onClick={openFullPage}
        >
          {fullPagePreview.label}
        </button>
      ) : null}
      {fullPagePreview ? (
        <BiographyChapterFullPageDialog
          open={fullPageOpen}
          src={src}
          alt={figure.alt}
          onClose={closeFullPage}
        />
      ) : null}
    </figure>
  );
}
