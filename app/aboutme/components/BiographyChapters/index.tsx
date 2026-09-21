'use client';

import { useEffect, useId, useRef, useState } from 'react';
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

/** Clears sticky header when a chapter is scrolled into place. */
const CHAPTER_SCROLL_OFFSET_PX = 104;

const COLLAPSE_TIMEOUT = { enter: 280, exit: 180 } as const;

function scrollChapterToPageTop(element: HTMLElement) {
  const top =
    window.scrollY +
    element.getBoundingClientRect().top -
    CHAPTER_SCROLL_OFFSET_PX;
  // Instant scroll — smooth scrolling fights layout changes while accordions animate.
  window.scrollTo({ top: Math.max(0, top), behavior: 'auto' });
}

export function BiographyChapters() {
  const baseId = useId();
  const [data, setData] = useState<BiographyChaptersData>(
    biographyChaptersFallback,
  );
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const expandedIdRef = useRef<string | null>(null);
  expandedIdRef.current = expandedId;

  useEffect(() => {
    return subscribeBiographyChaptersData(setData);
  }, []);

  const chapters = data.chapters;

  const openChapter = (id: string) => {
    setExpandedId((current) => (current === id ? null : id));
  };

  const handleChapterEntered = (id: string) => {
    const settleMs = COLLAPSE_TIMEOUT.exit + 32;

    const attemptScroll = () => {
      if (expandedIdRef.current !== id) return;
      const element = document.getElementById(`${baseId}-${id}`);
      if (!element) return;
      scrollChapterToPageTop(element);
    };

    // First pass after sibling collapse; second pass after layout padding/height settles.
    window.setTimeout(attemptScroll, settleMs);
    window.setTimeout(attemptScroll, settleMs + 120);
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
