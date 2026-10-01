'use client';

import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import styles from './biographyChapters.module.scss';

type BiographyChapterFullPageDialogProps = {
  open: boolean;
  src: string;
  alt: string;
  onClose: () => void;
};

/**
 * Full-screen, scrollable view of a tall page capture. The image keeps its
 * site width and the visitor scrolls the height, instead of panning a lightbox.
 */
export function BiographyChapterFullPageDialog({
  open,
  src,
  alt,
  onClose,
}: BiographyChapterFullPageDialogProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    scrollerRef.current?.scrollTo(0, 0);
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open, onClose]);

  if (!open || typeof document === 'undefined') return null;

  return createPortal(
    <div
      ref={scrollerRef}
      className={styles.biographyChaptersFullPage}
      role="dialog"
      aria-modal="true"
      aria-label={alt}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <button
        ref={closeRef}
        type="button"
        className={styles.biographyChaptersFullPageClose}
        onClick={onClose}
      >
        Close
      </button>
      <img src={src} alt={alt} className={styles.biographyChaptersFullPageImage} />
    </div>,
    document.body,
  );
}
