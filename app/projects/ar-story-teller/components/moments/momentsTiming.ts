/** Master journey labels — extend with Selfie / Artifacts later. */
export const MOMENTS_JOURNEY_LABELS = {
    solutionOpenerEnter: 'solutionOpenerEnter',
    solutionOpenerExit: 'solutionOpenerExit',
    nearbyIntroEnter: 'nearbyIntroEnter',
    nearbyIntroExit: 'nearbyIntroExit',
    nearbyMockupEnter: 'nearbyMockupEnter',
    nearbyMockupZoom: 'nearbyMockupZoom',
    nearbyMockupExit: 'nearbyMockupExit',
    storyIntroEnter: 'storyIntroEnter',
    storyCrossfade: 'storyCrossfade',
    mainDemoActive: 'mainDemoActive',
    mainDemoFreeze: 'mainDemoFreeze',
    mainDemoStoryEnter: 'mainDemoStoryEnter',
    mainDemoZoom: 'mainDemoZoom',
    mainDemoExit: 'mainDemoExit',
    selfieIntroEnter: 'selfieIntroEnter',
    selfieIntroExit: 'selfieIntroExit',
    selfieMockupEnter: 'selfieMockupEnter',
    selfieMockupZoom: 'selfieMockupZoom',
    selfieMockupExit: 'selfieMockupExit',
    artifactsIntroEnter: 'artifactsIntroEnter',
    artifactsIntroExit: 'artifactsIntroExit',
    artifactsMockupEnter: 'artifactsMockupEnter',
    artifactsMockupZoom: 'artifactsMockupZoom',
    artifactsMockupExit: 'artifactsMockupExit',
} as const;

/**
 * Single-stage Solution journey timing (Nearby → Story Details / MainDemo).
 * Storybook text motion knobs live here for easy experimentation.
 */
export const MOMENTS_JOURNEY_TIMING = {
    // ── Solution opener (eyebrow + section title) ───────────────────────────
    eyebrowYOffset: 10,
    eyebrowFadeInDuration: 0.5,
    eyebrowFadeInEase: 'power2.out',
    eyebrowFadeOutDuration: 0.4,
    eyebrowFadeOutEase: 'power2.in',
    /** Headline words — a beat slower than moment cards. */
    openerWordFadeInDuration: 0.88,
    openerWordStaggerSec: 0.11,
    /** Readable beat after the Solution title card lands. */
    solutionOpenerHoldSec: 1.6,

    // ── Storybook title words ───────────────────────────────────────────────
    wordYOffset: 22,
    wordBlurPx: 10,
    wordFadeInDuration: 0.72,
    wordStaggerSec: 0.09,
    /** Soft overshoot — storybook settle. */
    wordFadeInEase: 'back.out(1.35)',
    wordFadeOutDuration: 0.42,
    wordExitStaggerSec: 0.035,
    wordExitYOffset: 14,
    wordExitBlurPx: 6,
    wordFadeOutEase: 'power2.in',

    // ── Supporting line ─────────────────────────────────────────────────────
    descYOffset: 14,
    descFadeInDuration: 0.6,
    descFadeInEase: 'power2.out',
    /** How much the line overlaps the last title words (seconds pulled back). */
    descOverlapSec: 0.38,
    descFadeOutDuration: 0.4,
    descExitYOffset: 10,
    descFadeOutEase: 'power2.in',

    // ── Legacy whole-block offsets (mockup / MainDemo layers) ───────────────
    textYOffset: 16,
    textFadeOutDuration: 0.55,
    textFadeEase: 'power2.out',

    /** Readable beat after Nearby intro finishes animating in. */
    nearbyIntroHoldSec: 1.35,
    mockupFadeInDuration: 0.8,
    mockupFadeOutDuration: 0.65,
    mockupFadeEase: 'power2.out',
    mockupYOffset: 20,
    /** Time the Nearby / Selfie / Artifacts phones stay at rest before zoom. */
    nearbyMockupHoldSec: 1,
    nearbyMockupZoomDuration: 1.25,
    nearbyMockupZoomScale: 1.25,
    nearbyMockupZoomEase: 'power2.inOut',
    /** Extra beat at the zoomed-in phone before fade-out. */
    nearbyMockupZoomHoldSec: 1,
    /** Readable beat after Story Details intro before crossfade. */
    storyIntroHoldSec: 1.2,
    /** Text out + MainDemo in overlap. */
    storyCrossfadeDuration: 0.9,
    storyCrossfadeEase: 'power2.inOut',
    /**
     * Watch the looping AR video after MainDemo’s intro finishes,
     * before freezing the last frame and zooming the phone.
     */
    mainDemoHoldAfterSec: 3.5,
    mainDemoStoryFadeInDuration: 0.7,
    mainDemoStoryFadeInEase: 'power2.out',
    /** Boost the frozen AR frame so Sally + glow stay vivid under the caption. */
    mainDemoStoryVideoFilterRest: 'brightness(1) contrast(1) saturate(1)',
    mainDemoStoryVideoFilter:
        'brightness(1.28) contrast(1.16) saturate(1.45)',
    mainDemoStoryVideoFilterEase: 'power2.out',
    /** Living glow while the Sally Shine caption is on screen. */
    mainDemoStoryGlowRestOpacity: 0.34,
    mainDemoStoryGlowPeakOpacity: 0.62,
    /** One half of a breath (rest → peak); yoyo makes the full pulse. */
    mainDemoStoryGlowPulseSec: 1.35,
    mainDemoStoryGlowPulseEase: 'sine.inOut',
    mainDemoStoryTextGlowRest: 0.42,
    mainDemoStoryTextGlowPeak: 0.95,
    /** Brief beat after the caption lands, before park fade + zoom. */
    mainDemoStoryHoldSec: 1,
    mainDemoBgFadeDuration: 0.9,
    mainDemoBgFadeEase: 'power2.inOut',
    mainDemoZoomDuration: 1.0,
    mainDemoZoomScale: 1.25,
    mainDemoZoomEase: 'power2.inOut',
    /** Reading time on the zoomed, frozen phone with story caption. */
    mainDemoZoomHoldSec: 5,
    mainDemoFadeOutDuration: 0.85,
    mainDemoFadeOutEase: 'power2.inOut',
    /** Readable beat after Selfie intro (same language as Nearby). */
    selfieIntroHoldSec: 1.35,
    /** Readable beat after Collecting Artifacts intro (same language as Nearby). */
    artifactsIntroHoldSec: 1.35,
} as const;

/** Play when the stage center meets the viewport center. */
export const MOMENTS_JOURNEY_SCROLL_TRIGGER_START = 'center center';

/** Pause looping when the stage fully leaves the viewport. */
export const MOMENTS_JOURNEY_SCROLL_TRIGGER_END = 'bottom top';

/**
 * Auto-center the demo as it approaches mid-viewport (from below / from above).
 * Stage center crossing these lines triggers a smooth scroll to viewport center.
 */
export const MOMENTS_JOURNEY_SNAP_START = 'center 72%';
export const MOMENTS_JOURNEY_SNAP_END = 'center 28%';
export const MOMENTS_JOURNEY_SNAP_DURATION_SEC = 0.7;
export const MOMENTS_JOURNEY_SNAP_EASE = 'power2.inOut';
/** Skip the snap if already this close to centered (px). */
export const MOMENTS_JOURNEY_SNAP_THRESHOLD_PX = 10;

/** Breath between the last beat and the next loop of the film. */
export const MOMENTS_JOURNEY_LOOP_GAP_SEC = 1.2;
