/** Timeline labels — anchor future layers (glow, zoom, device) without reordering the sequence. */
export const MAIN_DEMO_TIMELINE_LABELS = {
    notificationEnter: 'notificationEnter',
    notificationVisible: 'notificationVisible',
    windowGlow: 'windowGlow',
    windowGlowVisible: 'windowGlowVisible',
    girlGhost: 'girlGhost',
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
    fadeInDuration: 1,
    fadeOutDuration: 1,
    /** Minimum fully-visible beat before fade-out at device reveal (5–6s target). */
    minVisibleDuration: 5.5,
    /** Subtle upward entrance offset in px — calm, cinematic drift. */
    fadeInYOffset: 14,
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

/** ScrollTrigger start — plays the timeline once when the canvas enters view. */
export const MAIN_DEMO_SCROLL_TRIGGER_START = 'top 85%';
