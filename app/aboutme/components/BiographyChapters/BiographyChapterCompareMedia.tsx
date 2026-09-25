'use client';

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from 'react';

import { buildPublicStorageUrl } from '@/lib/firebase/publicStorageUrl';
import type { BiographyChapterComparePair } from '../../data/biography-chapters-data';
import styles from './biographyChapters.module.scss';

type BiographyChapterCompareMediaProps = {
  pairs: BiographyChapterComparePair[];
  holdMs: number;
  /** Duration of the auto wipe from right → left. */
  durationMs: number;
};

type Phase = 'hold' | 'slider';

/** Rest slightly off the left edge so the handle stays easy to grab. */
const REST_POSITION = 6;
const SLIDER_CHROME_FADE_MS = 450;
/** Shorter hold when moving between pairs so navigation stays snappy. */
const SUBSEQUENT_HOLD_MS = 500;

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function preloadImage(src: string) {
  const image = new Image();
  image.src = src;
}

type ComparePairStageProps = {
  fromSrc: string;
  fromAlt: string;
  toSrc: string;
  toAlt: string;
  holdMs: number;
  durationMs: number;
  showHint: boolean;
  onInteracted: () => void;
  onRevealLockChange: (locked: boolean) => void;
};

function ComparePairStage({
  fromSrc,
  fromAlt,
  toSrc,
  toAlt,
  holdMs,
  durationMs,
  showHint,
  onInteracted,
  onRevealLockChange,
}: ComparePairStageProps) {
  const labelId = useId();
  const rootRef = useRef<HTMLDivElement | null>(null);
  const draggingRef = useRef(false);

  const [phase, setPhase] = useState<Phase>(() =>
    prefersReducedMotion() ? 'slider' : 'hold',
  );
  const [position, setPosition] = useState(() =>
    prefersReducedMotion() ? REST_POSITION : 100,
  );
  const [sliderChromeVisible, setSliderChromeVisible] = useState(() =>
    prefersReducedMotion(),
  );
  const [positionTransition, setPositionTransition] = useState(false);
  const [autoRevealDone, setAutoRevealDone] = useState(() =>
    prefersReducedMotion(),
  );

  useEffect(() => {
    onRevealLockChange(!prefersReducedMotion());
  }, [onRevealLockChange]);

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;

    const syncFrameWidth = () => {
      node.style.setProperty(
        '--compare-frame-width',
        `${node.getBoundingClientRect().width}px`,
      );
    };

    syncFrameWidth();
    const observer = new ResizeObserver(syncFrameWidth);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setPhase('slider');
      setPosition(REST_POSITION);
      setSliderChromeVisible(true);
      setAutoRevealDone(true);
      onRevealLockChange(false);
      return;
    }

    const node = rootRef.current;
    if (!node) return;

    let holdTimer: number | undefined;
    let wipeStartTimer: number | undefined;
    let wipeDoneTimer: number | undefined;
    let frameA = 0;
    let frameB = 0;
    let cancelled = false;

    const startReveal = () => {
      if (cancelled) return;
      setPhase('slider');
      setPosition(100);
      setSliderChromeVisible(false);
      setPositionTransition(false);
      setAutoRevealDone(false);
      onRevealLockChange(true);

      frameA = window.requestAnimationFrame(() => {
        frameB = window.requestAnimationFrame(() => {
          if (cancelled) return;
          setSliderChromeVisible(true);
          wipeStartTimer = window.setTimeout(() => {
            if (cancelled) return;
            setPositionTransition(true);
            setPosition(REST_POSITION);
            wipeDoneTimer = window.setTimeout(() => {
              if (cancelled) return;
              setPositionTransition(false);
              setAutoRevealDone(true);
              onRevealLockChange(false);
            }, durationMs);
          }, SLIDER_CHROME_FADE_MS);
        });
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting || cancelled) return;
        observer.disconnect();
        holdTimer = window.setTimeout(startReveal, holdMs);
      },
      { threshold: 0.35 },
    );

    observer.observe(node);

    return () => {
      cancelled = true;
      observer.disconnect();
      if (holdTimer !== undefined) window.clearTimeout(holdTimer);
      if (wipeStartTimer !== undefined) window.clearTimeout(wipeStartTimer);
      if (wipeDoneTimer !== undefined) window.clearTimeout(wipeDoneTimer);
      window.cancelAnimationFrame(frameA);
      window.cancelAnimationFrame(frameB);
    };
  }, [holdMs, durationMs, onRevealLockChange]);

  const updateFromClientX = useCallback((clientX: number) => {
    const node = rootRef.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    if (rect.width <= 0) return;
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, next)));
  }, []);

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (phase !== 'slider' || !autoRevealDone) return;
    event.preventDefault();
    draggingRef.current = true;
    onInteracted();
    setPositionTransition(false);
    event.currentTarget.setPointerCapture(event.pointerId);
    updateFromClientX(event.clientX);
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current || phase !== 'slider') return;
    updateFromClientX(event.clientX);
  };

  const onPointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (phase !== 'slider' || !autoRevealDone) return;
    const step = event.shiftKey ? 10 : 2;
    const isSliderKey =
      event.key === 'ArrowLeft' ||
      event.key === 'ArrowRight' ||
      event.key === 'ArrowUp' ||
      event.key === 'ArrowDown' ||
      event.key === 'Home' ||
      event.key === 'End';
    if (!isSliderKey) return;

    onInteracted();
    setPositionTransition(false);
    if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') {
      event.preventDefault();
      setPosition((value) => Math.max(0, value - step));
    } else if (event.key === 'ArrowRight' || event.key === 'ArrowUp') {
      event.preventDefault();
      setPosition((value) => Math.min(100, value + step));
    } else if (event.key === 'Home') {
      event.preventDefault();
      setPosition(0);
    } else if (event.key === 'End') {
      event.preventDefault();
      setPosition(100);
    }
  };

  const isSlider = phase === 'slider';
  const positionTransitionStyle = positionTransition
    ? {
        transitionProperty: 'width, left',
        transitionDuration: `${durationMs}ms`,
        transitionTimingFunction: 'ease-in-out',
      }
    : undefined;

  return (
    <div
      ref={rootRef}
      className={`${styles.biographyChaptersFigureMedia} ${styles.biographyChaptersFigureMediaCrossfade} ${
        isSlider ? styles.biographyChaptersFigureMediaCompare : ''
      } ${
        isSlider && !autoRevealDone
          ? styles.biographyChaptersFigureMediaCompareLocked
          : ''
      }`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      <img
        src={toSrc}
        alt=""
        width={1600}
        height={900}
        draggable={false}
        className={`${styles.biographyChaptersFigureImage} ${styles.biographyChaptersFigureCrossfadeLayer}`}
      />

      {isSlider ? (
        <div
          className={styles.biographyChaptersCompareClip}
          style={{ width: `${position}%`, ...positionTransitionStyle }}
          aria-hidden
        >
          <img
            src={fromSrc}
            alt=""
            width={1600}
            height={900}
            draggable={false}
            className={styles.biographyChaptersCompareClipImage}
          />
        </div>
      ) : (
        <img
          src={fromSrc}
          alt={fromAlt}
          width={1600}
          height={900}
          draggable={false}
          className={`${styles.biographyChaptersFigureImage} ${styles.biographyChaptersFigureCrossfadeLayer}`}
        />
      )}

      {isSlider ? (
        <div
          className={styles.biographyChaptersCompareChrome}
          style={{
            opacity: sliderChromeVisible ? 1 : 0,
            transition: `opacity ${SLIDER_CHROME_FADE_MS}ms ease-out`,
          }}
        >
          <div
            className={styles.biographyChaptersCompareDivider}
            style={{ left: `${position}%`, ...positionTransitionStyle }}
          >
            <div className={styles.biographyChaptersCompareHandle} />
          </div>
          <div
            className={styles.biographyChaptersCompareSlider}
            role="slider"
            tabIndex={autoRevealDone ? 0 : -1}
            aria-disabled={!autoRevealDone}
            aria-labelledby={labelId}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(position)}
            aria-valuetext={`${Math.round(position)} percent green screen plate visible`}
            onKeyDown={onKeyDown}
          />
          <p
            id={labelId}
            className={styles.biographyChaptersCompareHint}
            style={{
              opacity: autoRevealDone && showHint ? 1 : 0,
              transition: `opacity ${SLIDER_CHROME_FADE_MS}ms ease-out`,
            }}
          >
            Drag to compare green screen and final composite
          </p>
          <span
            className={styles.biographyChaptersCompareLabelBefore}
            style={{
              opacity: position > 12 ? 1 : 0,
              transition: 'opacity 180ms ease-out',
            }}
            aria-hidden={position <= 12}
          >
            On set
          </span>
          <span
            className={styles.biographyChaptersCompareLabelAfter}
            style={{
              opacity: position < 88 ? 1 : 0,
              transition: 'opacity 180ms ease-out',
            }}
            aria-hidden={position >= 88}
          >
            Final
          </span>
        </div>
      ) : null}

      <span className={styles.visuallyHidden}>
        {isSlider
          ? `${fromAlt}. ${toAlt}. ${
              autoRevealDone
                ? 'Use the slider to compare.'
                : 'Revealing the final composite.'
            }`
          : fromAlt}
      </span>
    </div>
  );
}

/**
 * Carousel of green-screen / composite pairs with wipe + scrubber per pair.
 */
export function BiographyChapterCompareMedia({
  pairs,
  holdMs,
  durationMs,
}: BiographyChapterCompareMediaProps) {
  const [index, setIndex] = useState(0);
  const [hintDismissed, setHintDismissed] = useState(false);
  const [navLocked, setNavLocked] = useState(true);

  const pair = pairs[index];
  const total = pairs.length;
  const canGoPrev = index > 0 && !navLocked;
  const canGoNext = index < total - 1 && !navLocked;

  useEffect(() => {
    if (!pair) return;
    // Preload current + neighbors for snappy prev/next.
    const neighbors = [pairs[index - 1], pair, pairs[index + 1]].filter(
      Boolean,
    ) as BiographyChapterComparePair[];
    for (const neighbor of neighbors) {
      preloadImage(buildPublicStorageUrl(neighbor.fromImageObjectPath));
      preloadImage(buildPublicStorageUrl(neighbor.toImageObjectPath));
    }
  }, [index, pair, pairs]);

  const goTo = (nextIndex: number) => {
    if (navLocked || nextIndex < 0 || nextIndex >= total || nextIndex === index) {
      return;
    }
    setNavLocked(true);
    setIndex(nextIndex);
  };

  if (!pair) return null;

  const fromSrc = buildPublicStorageUrl(pair.fromImageObjectPath);
  const toSrc = buildPublicStorageUrl(pair.toImageObjectPath);
  const fromAlt =
    pair.fromAlt ||
    `Garrick shot ${String(index + 1).padStart(2, '0')} green screen plate`;
  const toAlt =
    pair.toAlt ||
    `Garrick shot ${String(index + 1).padStart(2, '0')} finished composite`;
  const pairHoldMs = index === 0 ? holdMs : SUBSEQUENT_HOLD_MS;

  return (
    <div className={styles.biographyChaptersCompareCarousel}>
      <ComparePairStage
        key={index}
        fromSrc={fromSrc}
        fromAlt={fromAlt}
        toSrc={toSrc}
        toAlt={toAlt}
        holdMs={pairHoldMs}
        durationMs={durationMs}
        showHint={!hintDismissed}
        onInteracted={() => setHintDismissed(true)}
        onRevealLockChange={setNavLocked}
      />

      {total > 1 ? (
        <div className={styles.biographyChaptersCompareCarouselFooter}>
          <span className={styles.biographyChaptersCompareCounter}>
            {String(index + 1).padStart(2, '0')} /{' '}
            {String(total).padStart(2, '0')}
          </span>
          <div className={styles.biographyChaptersCompareNavRow}>
            <button
              type="button"
              className={styles.biographyChaptersCompareNav}
              aria-label="Previous shot pair"
              disabled={!canGoPrev}
              onClick={() => goTo(index - 1)}
            >
              <span aria-hidden>‹</span>
            </button>
            <div
              className={styles.biographyChaptersCompareDots}
              role="tablist"
              aria-label="Shot pairs"
            >
              {pairs.map((_, dotIndex) => (
                <button
                  key={`compare-dot-${dotIndex}`}
                  type="button"
                  role="tab"
                  aria-label={`Shot pair ${dotIndex + 1}`}
                  aria-selected={dotIndex === index}
                  disabled={navLocked && dotIndex !== index}
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
              aria-label="Next shot pair"
              disabled={!canGoNext}
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
