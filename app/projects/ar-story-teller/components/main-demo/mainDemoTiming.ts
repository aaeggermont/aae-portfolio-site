/** Timeline labels — anchor future layers (glow, zoom, device) without reordering the sequence. */
export const MAIN_DEMO_TIMELINE_LABELS = {
    notificationEnter: 'notificationEnter',
    notificationVisible: 'notificationVisible',
    windowGlow: 'windowGlow',
    windowGlowVisible: 'windowGlowVisible',
    girlGhost: 'girlGhost',
    iphoneFrame: 'iphoneFrame',
    /** iPhone fully settled — coaching sway window begins. */
    iphoneFrameVisible: 'iphoneFrameVisible',
    arVideo: 'arVideo',
    cameraZoom: 'cameraZoom',
    deviceReveal: 'deviceReveal',
} as const;

/**
 * Phase timing for the cinematic sequence. Placeholder gaps keep the notification
 * on screen until device reveal; replace gaps with real tweens as layers ship.
 */
export const MAIN_DEMO_PHASE_TIMING = {
    /** Static beat after scroll — user reads section copy and observes the tower image. */
    initialDelay: 3,
    /** Window glow (placeholder until glow layer is implemented). */
    windowGlowDuration: 2.5,
    /** Camera zoom toward illuminated windows (placeholder until zoom layer ships). */
    cameraZoomDuration: 3,
} as const;

export const MAIN_DEMO_NOTIFICATION_TIMING = {
    /** iPhone-banner entrance — slide + soft overshoot settle. */
    fadeInDuration: 0.75,
    /** Banner dismiss — slide up + fade (swipe-to-clear feel). */
    fadeOutDuration: 0.45,
    fadeOutYOffset: -56,
    fadeOutEase: 'power2.in',
    /** Minimum fully-visible beat before fade-out at device reveal (5–6s target). */
    minVisibleDuration: 5.5,
    /** Soft spring landing (overshoot then settle). */
    fadeInEase: 'back.out(1.4)',
    /** Starts further above rest — drops into place like a system banner. */
    fadeInYOffset: -100,
    /** Under-scale on entrance — expands to resting hero size as it lands. */
    fadeInInitialScale: 0.9,
    /** Resting size while visible — larger than 1 so the banner reads clearly. */
    restingScale: 1.12,
    /** Entrance defocus — resolves to sharp with the settle. */
    initialBlurPx: 8,
} as const;

/** First (left) window-pair glow — anchored to `windowGlow` timeline label. */
export const MAIN_DEMO_WINDOW_GLOW_TIMING = {
    /** Beat after notification is fully visible before glow begins. */
    delayAfterNotification: 0.3,
    entranceDuration: 1.2,
    entranceEase: 'power2.out',
    initialScale: 0.9,
} as const;

/** Girl ghost in the illuminated window — appears after glow is fully visible. */
export const MAIN_DEMO_GIRL_GHOST_TIMING = {
    /** Hold after window glow entrance completes before the ghost appears. */
    delayAfterGlowVisible: 1,
    fadeInDuration: 1,
    fadeInEase: 'power2.out',
    /** Resting opacity once visible (matches `--girl-ghost-opacity` in SCSS). */
    visibleOpacity: 0.5,
    fadeInYOffset: 6,
} as const;

/** iPhone frame portal — appears after the ghost girl reveal. */
export const MAIN_DEMO_IPHONE_FRAME_TIMING = {
    /** Beat after ghost fade-in completes before the device appears. */
    delayAfterGirlVisible: 0.5,
    revealDuration: 1.35,
    revealEase: 'power2.out',
    initialScale: 0.92,
    initialYOffset: 30,
} as const;

/**
 * AR coaching phone silhouette sway — adjust `loops` / `durationSec` to change
 * how long coaching plays. AR video crossfades in during the last loop.
 */
export const MAIN_DEMO_COACHING_SWAY = {
    /** Length of one full sway cycle (seconds). Keep in sync with CSS. */
    durationSec: 4,
    /** Number of full sway loops while coaching is on screen. */
    loops: 1,
} as const;

/** Total coaching sway after the iPhone is fully visible (sway loops × cycle length). */
export const MAIN_DEMO_COACHING_HOLD_SEC =
    MAIN_DEMO_COACHING_SWAY.durationSec * MAIN_DEMO_COACHING_SWAY.loops;

/** AR viewport video inside the iPhone screen — crossfades with coaching. */
export const MAIN_DEMO_AR_VIDEO_TIMING = {
    fadeInDuration: 1,
    fadeInEase: 'power2.out',
} as const;

/**
 * Coaching hold before AR video / coaching exit crossfade begins.
 * Timed so the exit fade runs through the end of the last sway loop.
 * Entrance uses the same fade duration at the start of the first loop.
 */
export const MAIN_DEMO_COACHING_BEFORE_VIDEO_SEC = Math.max(
    0,
    MAIN_DEMO_COACHING_HOLD_SEC - MAIN_DEMO_AR_VIDEO_TIMING.fadeInDuration,
);

/** ScrollTrigger start — plays the timeline once when the canvas enters view. */
export const MAIN_DEMO_SCROLL_TRIGGER_START = 'top 85%';

export const MAIN_DEMO_SEQUENCE_TO_IPHONE_VISIBLE_SEC =
    MAIN_DEMO_PHASE_TIMING.initialDelay +
    MAIN_DEMO_NOTIFICATION_TIMING.fadeInDuration +
    MAIN_DEMO_WINDOW_GLOW_TIMING.delayAfterNotification +
    MAIN_DEMO_WINDOW_GLOW_TIMING.entranceDuration +
    MAIN_DEMO_GIRL_GHOST_TIMING.delayAfterGlowVisible +
    MAIN_DEMO_GIRL_GHOST_TIMING.fadeInDuration +
    MAIN_DEMO_IPHONE_FRAME_TIMING.delayAfterGirlVisible +
    MAIN_DEMO_IPHONE_FRAME_TIMING.revealDuration;

/** When the iPhone is fully on screen — coaching fade-in + sway start here. */
export const MAIN_DEMO_IPHONE_VISIBLE_MS = Math.round(
    MAIN_DEMO_SEQUENCE_TO_IPHONE_VISIBLE_SEC * 1000,
);

/**
 * Finite demo length (ms) through AR video fade-in.
 * Used for the Replay button — the timeline’s notification float uses
 * infinite repeat so GSAP `duration()` / `onComplete` are not reliable.
 */
export const MAIN_DEMO_DURATION_MS = Math.round(
    (
        MAIN_DEMO_SEQUENCE_TO_IPHONE_VISIBLE_SEC +
        MAIN_DEMO_COACHING_HOLD_SEC
    ) * 1000,
);

/** When AR video / coaching crossfade begins (during the last sway loop). */
export const MAIN_DEMO_AR_VIDEO_START_MS = Math.round(
    (
        MAIN_DEMO_SEQUENCE_TO_IPHONE_VISIBLE_SEC +
        MAIN_DEMO_COACHING_BEFORE_VIDEO_SEC
    ) * 1000,
);

/** When CSS sway iterations finish — safe to drop the sway class after this. */
export const MAIN_DEMO_COACHING_SWAY_END_MS = Math.round(
    (
        MAIN_DEMO_SEQUENCE_TO_IPHONE_VISIBLE_SEC +
        MAIN_DEMO_COACHING_HOLD_SEC
    ) * 1000,
);
