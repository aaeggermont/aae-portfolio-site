'use client';

import { SlideshowLightbox } from 'lightbox.js-react';

import {
  lightboxIconColorForModalBackground,
  PROJECT_IMAGE_LIGHTBOX_MODAL_BG_WHITE,
} from '@/lib/media/lightboxModal';
import { buildPublicStorageUrl } from '@/lib/firebase/publicStorageUrl';
import type { BiographyChapterFigure } from '../../data/biography-chapters-data';
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
  const modalBg = PROJECT_IMAGE_LIGHTBOX_MODAL_BG_WHITE;
  const hasColumnCaptions = figure.captions.length > 0;
  const hasPublicationCaption = Boolean(
    figure.captionTitle?.length || figure.captionCredit,
  );

  return (
    <figure className={styles.biographyChaptersFigure}>
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
      {hasColumnCaptions ? (
        <figcaption className={styles.biographyChaptersFigureCaptions}>
          {figure.captions.map((column, columnIndex) => (
            <div
              key={`caption-col-${columnIndex}`}
              className={styles.biographyChaptersFigureCaptionColumn}
            >
              {column.lines.map((line, lineIndex) => (
                <span key={`caption-line-${columnIndex}-${lineIndex}`}>
                  {line}
                </span>
              ))}
            </div>
          ))}
        </figcaption>
      ) : null}
    </figure>
  );
}
