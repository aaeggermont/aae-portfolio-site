import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import {
    MAIN_DEMO_AR_VIDEO_TIMING,
    MAIN_DEMO_COACHING_HOLD_SEC,
    MAIN_DEMO_GIRL_GHOST_TIMING,
    MAIN_DEMO_IPHONE_FRAME_TIMING,
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
    iphoneDevice: HTMLElement;
    iphoneVideo: HTMLElement;
    coachingOverlay: HTMLElement;
};

export type BuildMainDemoTimelineOptions = {
    reducedMotion?: boolean;
    /** Fires when the timeline begins playing (scroll enter or replay). */
    onStarted?: () => void;
};

const LABELS = MAIN_DEMO_TIMELINE_LABELS;

/**
 * Master timeline for the cinematic demo.
 *
 * Sequence:
 * 1. Component visible → static pause
 * 2. Notification fades in
 * 3. Window glow fades in and stays visible
 * 4. Girl ghost fades in
 * 5. iPhone frame reveals (coaching overlay + phone sway visible on screen)
 * 6. Coaching overlay fades out; AR video fades into the device screen
 * 7. Camera zoom (placeholder — syncs to `cameraZoom` label)
 */
export function buildMainDemoTimeline(
    elements: MainDemoTimelineElements,
    options: BuildMainDemoTimelineOptions = {},
): gsap.core.Timeline {
    const {
        notification,
        windowGlow,
        girlGhost,
        iphoneDevice,
        iphoneVideo,
        coachingOverlay,
    } = elements;
    const { reducedMotion = false } = options;
    const {
        fadeInDuration,
        fadeOutDuration,
        fadeOutYOffset,
        fadeOutEase,
        fadeInEase,
        fadeInYOffset,
        fadeInInitialScale,
        restingScale,
        initialBlurPx,
    } = MAIN_DEMO_NOTIFICATION_TIMING;
    const { initialDelay, windowGlowDuration } = MAIN_DEMO_PHASE_TIMING;
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
    const {
        delayAfterGirlVisible,
        revealDuration: iphoneRevealDuration,
        revealEase: iphoneRevealEase,
        initialScale: iphoneInitialScale,
        initialYOffset: iphoneInitialYOffset,
    } = MAIN_DEMO_IPHONE_FRAME_TIMING;
    const {
        fadeInDuration: arVideoFadeInDuration,
        fadeInEase: arVideoFadeInEase,
    } = MAIN_DEMO_AR_VIDEO_TIMING;

    gsap.set(notification, {
        opacity: 0,
        y: fadeInYOffset,
        scale: fadeInInitialScale,
        transformOrigin: 'center top',
        '--notification-blur': `${initialBlurPx}px`,
    });
    gsap.set(windowGlow, {
        opacity: 0,
        scale: glowInitialScale,
        transformOrigin: 'center center',
    });
    gsap.set(girlGhost, { opacity: 0, y: girlFadeInYOffset });
    gsap.set(iphoneDevice, {
        opacity: 0,
        scale: iphoneInitialScale,
        y: iphoneInitialYOffset,
        transformOrigin: 'center center',
    });
    gsap.set(coachingOverlay, { opacity: 1 });
    gsap.set(iphoneVideo, { opacity: 0 });

    const tl = gsap.timeline({ paused: true });

    if (reducedMotion) {
        return tl;
    }

    const glowStart = `${LABELS.notificationVisible}+=${delayAfterNotification}`;
    const glowFullyVisible = `${LABELS.windowGlow}+=${glowEntranceDuration}`;
    const girlGhostStart = `${glowFullyVisible}+=${delayAfterGlowVisible}`;
    const iphoneFrameStart = `${LABELS.girlGhost}+=${girlFadeInDuration + delayAfterGirlVisible}`;
    const iphoneFrameFullyVisible = `${LABELS.iphoneFrame}+=${iphoneRevealDuration}`;
    const arVideoStart = `${iphoneFrameFullyVisible}+=${MAIN_DEMO_COACHING_HOLD_SEC}`;
    const cameraZoomStart = `${LABELS.notificationVisible}+=${delayAfterNotification + windowGlowDuration}`;

    tl.to({}, { duration: initialDelay })
        .addLabel(LABELS.notificationEnter)
        .to(notification, {
            opacity: 1,
            y: 0,
            scale: restingScale,
            '--notification-blur': '0px',
            duration: fadeInDuration,
            ease: fadeInEase,
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
        .addLabel(LABELS.iphoneFrame, iphoneFrameStart)
        .addLabel(LABELS.deviceReveal, iphoneFrameStart)
        .to(
            iphoneDevice,
            {
                opacity: 1,
                scale: 1,
                y: 0,
                duration: iphoneRevealDuration,
                ease: iphoneRevealEase,
            },
            LABELS.iphoneFrame,
        )
        .to(
            notification,
            {
                opacity: 0,
                y: fadeOutYOffset,
                duration: fadeOutDuration,
                ease: fadeOutEase,
                overwrite: 'auto',
            },
            LABELS.deviceReveal,
        )
        .addLabel(LABELS.arVideo, arVideoStart)
        .to(
            coachingOverlay,
            {
                opacity: 0,
                duration: arVideoFadeInDuration,
                ease: arVideoFadeInEase,
            },
            LABELS.arVideo,
        )
        .to(
            iphoneVideo,
            {
                opacity: 1,
                duration: arVideoFadeInDuration,
                ease: arVideoFadeInEase,
            },
            LABELS.arVideo,
        )
        .addLabel(LABELS.cameraZoom, cameraZoomStart);

    return tl;
}

export function playMainDemoTimelineOnScroll(
    elements: MainDemoTimelineElements,
    options: BuildMainDemoTimelineOptions = {},
): { cleanup: () => void; restart: () => void } {
    const { onStarted } = options;
    const tl = buildMainDemoTimeline(elements, options);

    const playFromStart = () => {
        tl.restart(true, false);
        onStarted?.();
    };

    const trigger = ScrollTrigger.create({
        trigger: elements.canvas,
        start: MAIN_DEMO_SCROLL_TRIGGER_START,
        once: true,
        onEnter: () => {
            tl.play();
            onStarted?.();
        },
    });

    return {
        cleanup: () => {
            trigger.kill();
            tl.kill();
        },
        restart: playFromStart,
    };
}
