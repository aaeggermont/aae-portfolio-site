'use client';

import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import AirOutlinedIcon from '@mui/icons-material/AirOutlined';
import DevicesOutlinedIcon from '@mui/icons-material/DevicesOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import Collapse from '@mui/material/Collapse';
import type { SvgIconComponent } from '@mui/icons-material';

import {
  biographyChaptersFallback,
  type BiographyChapterIcon,
  type BiographyChaptersData,
} from '../../data/biography-chapters-data';
import { subscribeBiographyChaptersData } from '../../lib/biography-chapters.firestore';
import { BiographyChapterFigureBlock } from './BiographyChapterFigure';
import styles from './biographyChapters.module.scss';

const CHAPTER_ICONS: Record<BiographyChapterIcon, SvgIconComponent> = {
  menuBook: MenuBookOutlinedIcon,
  school: SchoolOutlinedIcon,
  lightbulb: LightbulbOutlinedIcon,
  devices: DevicesOutlinedIcon,
  air: AirOutlinedIcon,
  mail: MailOutlineIcon,
};

/** Fallback if the sticky header isn't measurable yet. */
const CHAPTER_SCROLL_OFFSET_FALLBACK_PX = 104;

/** Small air between the sticky header and the active chapter card. */
const CHAPTER_SCROLL_GAP_PX = 8;

const COLLAPSE_TIMEOUT = { enter: 280, exit: 180 } as const;

/** Gentler than native `behavior: 'smooth'` — ease-out scroll for first open. */
const CHAPTER_SCROLL_DURATION_MS = 700;

/** Keep the destination card pinned while a previous chapter collapses. */
const CHAPTER_SWITCH_PIN_MS =
  COLLAPSE_TIMEOUT.exit + COLLAPSE_TIMEOUT.enter + 80;

let activeChapterScrollFrame: number | null = null;

function easeOutCubic(t: number): number {
  return 1 - (1 - t) ** 3;
}

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Offset from the viewport top so the active chapter sits just under the
 * sticky site header — not so low that the previous card peeks through.
 */
function getChapterScrollOffsetPx(): number {
  const header = document.querySelector('header');
  if (header) {
    const bottom = header.getBoundingClientRect().bottom;
    if (Number.isFinite(bottom) && bottom > 0) {
      return Math.ceil(bottom) + CHAPTER_SCROLL_GAP_PX;
    }
  }
  return CHAPTER_SCROLL_OFFSET_FALLBACK_PX;
}

function cancelActiveChapterScroll() {
  if (activeChapterScrollFrame !== null) {
    window.cancelAnimationFrame(activeChapterScrollFrame);
    activeChapterScrollFrame = null;
  }
}

/** Instantly place a chapter card under the sticky header. */
function snapChapterUnderHeader(element: HTMLElement) {
  const offset = getChapterScrollOffsetPx();
  let delta = element.getBoundingClientRect().top - offset;

  // If the previous card still peeks below the header, scroll until it's gone.
  const previous = element.previousElementSibling;
  if (previous instanceof HTMLElement) {
    const peek = previous.getBoundingClientRect().bottom - offset;
    if (peek > 0) {
      delta += peek;
    }
  }

  if (Math.abs(delta) >= 1) {
    window.scrollBy({ top: delta, left: 0, behavior: 'auto' });
  }
}

function scrollChapterToPageTop(element: HTMLElement) {
  const offset = getChapterScrollOffsetPx();
  const targetTop = Math.max(
    0,
    window.scrollY + element.getBoundingClientRect().top - offset,
  );
  const startTop = window.scrollY;
  const distance = targetTop - startTop;

  if (Math.abs(distance) < 2) return;

  if (prefersReducedMotion()) {
    window.scrollTo({ top: targetTop, behavior: 'auto' });
    return;
  }

  cancelActiveChapterScroll();

  const startTime = performance.now();

  const step = (now: number) => {
    const elapsed = now - startTime;
    const progress = Math.min(1, elapsed / CHAPTER_SCROLL_DURATION_MS);
    window.scrollTo({
      top: startTop + distance * easeOutCubic(progress),
      behavior: 'auto',
    });

    if (progress < 1) {
      activeChapterScrollFrame = window.requestAnimationFrame(step);
    } else {
      activeChapterScrollFrame = null;
    }
  };

  activeChapterScrollFrame = window.requestAnimationFrame(step);
}

/** Hold `element` under the sticky header while accordion heights change. */
function pinChapterUnderHeader(
  element: HTMLElement,
  durationMs: number,
): () => void {
  let frame: number | null = null;
  let stopped = false;

  const tick = () => {
    if (stopped) return;
    snapChapterUnderHeader(element);
    frame = window.requestAnimationFrame(tick);
  };

  if (prefersReducedMotion()) {
    snapChapterUnderHeader(element);
    return () => {
      stopped = true;
    };
  }

  frame = window.requestAnimationFrame(tick);
  const timer = window.setTimeout(() => {
    stopped = true;
    if (frame !== null) window.cancelAnimationFrame(frame);
    frame = null;
    snapChapterUnderHeader(element);
  }, durationMs);

  return () => {
    stopped = true;
    window.clearTimeout(timer);
    if (frame !== null) window.cancelAnimationFrame(frame);
  };
}

export function BiographyChapters() {
  const baseId = useId();
  const [data, setData] = useState<BiographyChaptersData>(
    biographyChaptersFallback,
  );
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const expandedIdRef = useRef<string | null>(null);
  expandedIdRef.current = expandedId;
  /** Previous chapter id when switching; null when opening from a closed state. */
  const switchFromIdRef = useRef<string | null>(null);
  const stopPinRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    return subscribeBiographyChaptersData(setData);
  }, []);

  useEffect(() => {
    return () => {
      cancelActiveChapterScroll();
      stopPinRef.current?.();
      stopPinRef.current = null;
    };
  }, []);

  // Keep the destination card under the header while the previous panel
  // collapses above the viewport (so you never watch that collapse on screen).
  useLayoutEffect(() => {
    if (!expandedId || switchFromIdRef.current === null) return;

    const element = document.getElementById(`${baseId}-${expandedId}`);
    if (!element) return;

    snapChapterUnderHeader(element);
    stopPinRef.current?.();
    stopPinRef.current = pinChapterUnderHeader(element, CHAPTER_SWITCH_PIN_MS);

    return () => {
      stopPinRef.current?.();
      stopPinRef.current = null;
    };
  }, [expandedId, baseId]);

  const chapters = data.chapters;

  const openChapter = (id: string) => {
    const current = expandedIdRef.current;

    if (current === id) {
      switchFromIdRef.current = null;
      stopPinRef.current?.();
      stopPinRef.current = null;
      setExpandedId(null);
      return;
    }

    // Switching chapters: jump to the destination *before* collapsing the
    // previous panel, so Harvard (etc.) collapses off-screen above the fold.
    if (current !== null) {
      cancelActiveChapterScroll();
      const element = document.getElementById(`${baseId}-${id}`);
      if (element) snapChapterUnderHeader(element);
      switchFromIdRef.current = current;
    } else {
      switchFromIdRef.current = null;
    }

    setExpandedId(id);
  };

  const handleChapterEntered = (id: string) => {
    // Chapter-to-chapter switches are handled by snap + pin above.
    if (switchFromIdRef.current !== null) {
      switchFromIdRef.current = null;
      return;
    }

    // First open from a closed accordion: ease the card under the header.
    const settleMs = COLLAPSE_TIMEOUT.exit + 80;

    window.setTimeout(() => {
      if (expandedIdRef.current !== id) return;
      const element = document.getElementById(`${baseId}-${id}`);
      if (element) scrollChapterToPageTop(element);
    }, settleMs);
  };

  return (
    <section
      className={styles.biographyChapters}
      aria-label="Biography chapters"
    >
      <div className={styles.biographyChaptersLayout}>
        <nav className={styles.biographyChaptersToc} aria-label="Contents">
          <p className={styles.biographyChaptersTocHeading}>Contents</p>
          <ul className={styles.biographyChaptersTocList}>
            {chapters.map((chapter) => {
              const isActive = expandedId === chapter.id;
              return (
                <li key={`toc-${chapter.id}`}>
                  <button
                    type="button"
                    className={`${styles.biographyChaptersTocLink}${
                      isActive ? ` ${styles.biographyChaptersTocLinkActive}` : ''
                    }`}
                    aria-current={isActive ? 'true' : undefined}
                    aria-controls={`${baseId}-${chapter.id}-panel`}
                    onClick={() => openChapter(chapter.id)}
                  >
                    {chapter.tocLabel}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <ul className={styles.biographyChaptersPanels}>
          {chapters.map((chapter) => {
            const isExpanded = expandedId === chapter.id;
            const Icon = CHAPTER_ICONS[chapter.icon];
            const panelId = `${baseId}-${chapter.id}-panel`;
            const triggerId = `${baseId}-${chapter.id}-trigger`;

            return (
              <li
                key={chapter.id}
                id={`${baseId}-${chapter.id}`}
                className={`${styles.biographyChaptersCard}${
                  isExpanded ? ` ${styles.biographyChaptersCardExpanded}` : ''
                }`}
              >
                <button
                  type="button"
                  id={triggerId}
                  className={styles.biographyChaptersTrigger}
                  aria-expanded={isExpanded}
                  aria-controls={panelId}
                  onClick={() => openChapter(chapter.id)}
                >
                  <span className={styles.biographyChaptersIcon} aria-hidden>
                    <Icon />
                  </span>
                  <span className={styles.biographyChaptersTriggerText}>
                    {chapter.eyebrow ? (
                      <span className={styles.biographyChaptersEyebrow}>
                        {chapter.eyebrow}
                      </span>
                    ) : null}
                    <span className={styles.biographyChaptersTitle}>
                      {chapter.title}
                    </span>
                  </span>
                  <ExpandMoreIcon
                    className={`${styles.biographyChaptersChevron}${
                      isExpanded
                        ? ` ${styles.biographyChaptersChevronExpanded}`
                        : ''
                    }`}
                    aria-hidden
                  />
                </button>

                <Collapse
                  in={isExpanded}
                  timeout={COLLAPSE_TIMEOUT}
                  unmountOnExit
                  onEntered={() => handleChapterEntered(chapter.id)}
                >
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={triggerId}
                    className={styles.biographyChaptersBody}
                  >
                    {chapter.blocks.map((block, blockIndex) => {
                      if (block.type === "copy") {
                        return (
                          <div
                            key={`${chapter.id}-copy-${blockIndex}`}
                            className={styles.biographyChaptersCopy}
                          >
                            {block.paragraphs.map((paragraph, index) => (
                              <p key={`${chapter.id}-p-${blockIndex}-${index}`}>
                                {paragraph}
                              </p>
                            ))}
                          </div>
                        );
                      }

                      if (block.type === "figure") {
                        return (
                          <BiographyChapterFigureBlock
                            key={`${chapter.id}-figure-${blockIndex}`}
                            figure={block.figure}
                            lightboxId={`${chapter.id}-figure-${blockIndex}`}
                          />
                        );
                      }

                      if (block.type === "mediaText") {
                        return (
                          <div
                            key={`${chapter.id}-mediaText-${blockIndex}`}
                            className={styles.biographyChaptersMediaText}
                          >
                            <BiographyChapterFigureBlock
                              figure={block.figure}
                              lightboxId={`${chapter.id}-mediaText-${blockIndex}`}
                            />
                            <div className={styles.biographyChaptersMediaTextCopy}>
                              {block.heading ? (
                                <h3
                                  className={
                                    styles.biographyChaptersMediaTextHeading
                                  }
                                >
                                  {block.heading}
                                </h3>
                              ) : null}
                              {block.paragraphs.map((paragraph, index) => (
                                <p
                                  key={`${chapter.id}-mediaText-p-${blockIndex}-${index}`}
                                >
                                  {paragraph}
                                </p>
                              ))}
                            </div>
                          </div>
                        );
                      }

                      return (
                        <div
                          key={`${chapter.id}-section-${blockIndex}`}
                          className={styles.biographyChaptersSection}
                        >
                          <h3 className={styles.biographyChaptersSectionHeading}>
                            {block.heading}
                          </h3>
                          {block.paragraphs?.length ? (
                            <div className={styles.biographyChaptersSectionBody}>
                              {block.paragraphs.map((paragraph, index) => (
                                <p
                                  key={`${chapter.id}-section-p-${blockIndex}-${index}`}
                                >
                                  {paragraph}
                                </p>
                              ))}
                            </div>
                          ) : null}
                        </div>
                      );
                    })}
                  </div>
                </Collapse>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
