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
    /** Time the Nearby phone stays at rest before zoom. */
    nearbyMockupHoldSec: 2,
    nearbyMockupZoomDuration: 1.25,
    nearbyMockupZoomScale: 1.48,
    nearbyMockupZoomEase: 'power2.inOut',
    /** Extra beat at the zoomed-in phone before fade-out. */
    nearbyMockupZoomHoldSec: 2.2,
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
    /** Brief beat after the caption lands, before park fade + zoom. */
    mainDemoStoryHoldSec: 0.55,
    mainDemoBgFadeDuration: 0.9,
    mainDemoBgFadeEase: 'power2.inOut',
    mainDemoZoomDuration: 1.25,
    mainDemoZoomScale: 1.48,
    mainDemoZoomEase: 'power2.inOut',
    /** Reading time on the zoomed, frozen phone with story caption. */
    mainDemoZoomHoldSec: 5,
    mainDemoFadeOutDuration: 0.85,
    mainDemoFadeOutEase: 'power2.inOut',
} as const;

export const MOMENTS_JOURNEY_SCROLL_TRIGGER_START = 'top 75%';
