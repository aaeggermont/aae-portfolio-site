import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import {
    MAIN_DEMO_GIRL_GHOST_TIMING,
    MAIN_DEMO_NOTIFICATION_TIMING,
    MAIN_DEMO_PHASE_TIMING,
    MAIN_DEMO_SCROLL_TRIGGER_START,
    MAIN_DEMO_TIMELINE_LABELS,
    MAIN_DEMO_WINDOW_GLOW_TIMING,
} from './mainDemoTiming';

gsap.registerPlugin(ScrollTrigger);

export type MainDemoTimelineElements = {
    canvas: HTMLElement;
    notification: HTMLElement;
    windowGlow: HTMLElement;
    girlGhost: HTMLElement;
};

export type BuildMainDemoTimelineOptions = {
    reducedMotion?: boolean;
};

const LABELS = MAIN_DEMO_TIMELINE_LABELS;

/**
 * Master timeline for the cinematic demo.
 *
 * Sequence:
 * 1. Component visible → static pause
 * 2. Notification fades in
 * 3. Window glow fades in and stays visible
 * 4. Girl ghost fades in (1s after glow is fully visible)
 * 5. Camera zoom (placeholder — syncs to `cameraZoom` label)
 * 6. Device reveal → notification fades out
 * 7. AR experience active (future)
 */
export function buildMainDemoTimeline(
    { notification, windowGlow, girlGhost }: MainDemoTimelineElements,
    options: BuildMainDemoTimelineOptions = {},
): gsap.core.Timeline {
    const { reducedMotion = false } = options;
    const { fadeInDuration, fadeOutDuration, fadeInYOffset } =
        MAIN_DEMO_NOTIFICATION_TIMING;
    const {
        initialDelay,
        windowGlowDuration,
        cameraZoomDuration,
    } = MAIN_DEMO_PHASE_TIMING;
    const {
        delayAfterNotification,
        entranceDuration: glowEntranceDuration,
        entranceEase: glowEntranceEase,
        initialScale: glowInitialScale,
    } = MAIN_DEMO_WINDOW_GLOW_TIMING;
    const {
        delayAfterGlowVisible,
        fadeInDuration: girlFadeInDuration,
        fadeInEase: girlFadeInEase,
        visibleOpacity: girlVisibleOpacity,
        fadeInYOffset: girlFadeInYOffset,
    } = MAIN_DEMO_GIRL_GHOST_TIMING;

    gsap.set(notification, { opacity: 0, y: fadeInYOffset });
    gsap.set(windowGlow, {
        opacity: 0,
        scale: glowInitialScale,
        transformOrigin: 'center center',
    });
    gsap.set(girlGhost, { opacity: 0, y: girlFadeInYOffset });

    const tl = gsap.timeline({ paused: true });

    if (reducedMotion) {
        return tl;
    }

    const glowStart = `${LABELS.notificationVisible}+=${delayAfterNotification}`;
    const glowFullyVisible = `${LABELS.windowGlow}+=${glowEntranceDuration}`;
    const girlGhostStart = `${glowFullyVisible}+=${delayAfterGlowVisible}`;
    const cameraZoomStart = `${LABELS.notificationVisible}+=${delayAfterNotification + windowGlowDuration}`;
    const deviceRevealStart = `${LABELS.notificationVisible}+=${delayAfterNotification + windowGlowDuration + cameraZoomDuration}`;

    tl.to({}, { duration: initialDelay })
        .addLabel(LABELS.notificationEnter)
        .to(notification, {
            opacity: 1,
            y: 0,
            duration: fadeInDuration,
            ease: 'power2.out',
        })
        .addLabel(LABELS.notificationVisible)
        .addLabel(LABELS.windowGlow, glowStart)
        .to(
            windowGlow,
            {
                opacity: 1,
                scale: 1,
                duration: glowEntranceDuration,
                ease: glowEntranceEase,
            },
            LABELS.windowGlow,
        )
        .addLabel(LABELS.windowGlowVisible, glowFullyVisible)
        .addLabel(LABELS.girlGhost, girlGhostStart)
        .to(
            girlGhost,
            {
                opacity: girlVisibleOpacity,
                y: 0,
                duration: girlFadeInDuration,
                ease: girlFadeInEase,
            },
            LABELS.girlGhost,
        )
        .addLabel(LABELS.cameraZoom, cameraZoomStart)
        .addLabel(LABELS.deviceReveal, deviceRevealStart)
        .to(
            notification,
            {
                opacity: 0,
                duration: fadeOutDuration,
                ease: 'power2.inOut',
            },
            LABELS.deviceReveal,
        );

    return tl;
}

export function playMainDemoTimelineOnScroll(
    elements: MainDemoTimelineElements,
    options: BuildMainDemoTimelineOptions = {},
): () => void {
    const tl = buildMainDemoTimeline(elements, options);

    const trigger = ScrollTrigger.create({
        trigger: elements.canvas,
        start: MAIN_DEMO_SCROLL_TRIGGER_START,
        once: true,
        onEnter: () => tl.play(),
    });

    return () => {
        trigger.kill();
        tl.kill();
    };
}
