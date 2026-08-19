import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { MAIN_DEMO_DURATION_MS } from '../main-demo/mainDemoTiming';
import {
    freezeMainDemoVideo,
    getMainDemoAtmosphereElements,
    getMainDemoStoryOverlay,
} from './mainDemoFinale';
import {
    MOMENTS_JOURNEY_LABELS,
    MOMENTS_JOURNEY_SCROLL_TRIGGER_START,
    MOMENTS_JOURNEY_TIMING,
} from './momentsTiming';
import {
    addSolutionOpenerEnter,
    addSolutionOpenerExit,
    addStorybookIntroEnter,
    addStorybookIntroExit,
    prepareSolutionOpener,
    prepareStorybookIntro,
} from './storybookTextMotion';

gsap.registerPlugin(ScrollTrigger);

export type MomentsJourneyElements = {
    stage: HTMLElement;
    solutionOpener: HTMLElement;
    nearbyIntro: HTMLElement;
    storyIntro: HTMLElement;
    nearbyMockup: HTMLElement;
    mainDemo: HTMLElement;
    selfieIntro: HTMLElement;
    selfieMockup: HTMLElement;
};

export type BuildMomentsJourneyOptions = {
    reducedMotion?: boolean;
    /** Start (or restart) the cinematic MainDemo at the Story Details crossfade. */
    onMainDemoPlay?: () => void;
};

const LABELS = MOMENTS_JOURNEY_LABELS;

export function buildMomentsJourneyTimeline(
    elements: MomentsJourneyElements,
    options: BuildMomentsJourneyOptions = {},
): gsap.core.Timeline {
    const {
        solutionOpener,
        nearbyIntro,
        storyIntro,
        nearbyMockup,
        mainDemo,
        selfieIntro,
        selfieMockup,
    } = elements;
    const { reducedMotion = false, onMainDemoPlay } = options;
    const t = MOMENTS_JOURNEY_TIMING;
    const mainDemoDurationSec = MAIN_DEMO_DURATION_MS / 1000;
    const atmosphere = getMainDemoAtmosphereElements(mainDemo);
    const storyOverlay = getMainDemoStoryOverlay(mainDemo);

    gsap.set([nearbyMockup, mainDemo, selfieMockup], {
        opacity: 0,
        y: 0,
        scale: 1,
    });
    gsap.set(nearbyMockup, {
        y: t.mockupYOffset,
        transformOrigin: 'center center',
    });
    gsap.set(selfieMockup, {
        y: t.mockupYOffset,
        transformOrigin: 'center center',
    });
    gsap.set(mainDemo, { transformOrigin: 'center center' });
    if (atmosphere.length) {
        gsap.set(atmosphere, { opacity: 1 });
    }
    if (storyOverlay) {
        gsap.set(storyOverlay, { opacity: 0 });
    }
    prepareSolutionOpener(solutionOpener, t);
    prepareStorybookIntro(nearbyIntro, t);
    prepareStorybookIntro(storyIntro, t);
    prepareStorybookIntro(selfieIntro, t);

    const tl = gsap.timeline({ paused: true });

    if (reducedMotion) {
        gsap.set(mainDemo, { opacity: 1, y: 0, scale: 1 });
        gsap.set(
            [
                solutionOpener.querySelector('[data-moment-eyebrow]'),
                ...solutionOpener.querySelectorAll('[data-moment-word]'),
                ...nearbyIntro.querySelectorAll('[data-moment-word]'),
                nearbyIntro.querySelector('[data-moment-desc]'),
                ...storyIntro.querySelectorAll('[data-moment-word]'),
                storyIntro.querySelector('[data-moment-desc]'),
                ...selfieIntro.querySelectorAll('[data-moment-word]'),
                selfieIntro.querySelector('[data-moment-desc]'),
            ].filter(Boolean),
            { opacity: 1, y: 0, filter: 'blur(0px)' },
        );
        tl.add(() => {
            onMainDemoPlay?.();
        });
        return tl;
    }

    // ── Solution opener ───────────────────────────────────────────────────────
    tl.addLabel(LABELS.solutionOpenerEnter);
    addSolutionOpenerEnter(tl, solutionOpener, t);
    tl.to({}, { duration: t.solutionOpenerHoldSec }).addLabel(
        LABELS.solutionOpenerExit,
    );
    addSolutionOpenerExit(tl, solutionOpener, t);

    // ── Nearby intro (storybook) ──────────────────────────────────────────────
    tl.addLabel(LABELS.nearbyIntroEnter);
    addStorybookIntroEnter(tl, nearbyIntro, t);
    tl.to({}, { duration: t.nearbyIntroHoldSec })
        .addLabel(LABELS.nearbyIntroExit);
    addStorybookIntroExit(tl, nearbyIntro, t);

    // ── Nearby mockup ─────────────────────────────────────────────────────────
    tl.addLabel(LABELS.nearbyMockupEnter)
        .to(nearbyMockup, {
            opacity: 1,
            y: 0,
            duration: t.mockupFadeInDuration,
            ease: t.mockupFadeEase,
        })
        .to({}, { duration: t.nearbyMockupHoldSec })
        .addLabel(LABELS.nearbyMockupZoom)
        .to(nearbyMockup, {
            scale: t.nearbyMockupZoomScale,
            duration: t.nearbyMockupZoomDuration,
            ease: t.nearbyMockupZoomEase,
        })
        .to({}, { duration: t.nearbyMockupZoomHoldSec })
        .addLabel(LABELS.nearbyMockupExit)
        .to(nearbyMockup, {
            opacity: 0,
            duration: t.mockupFadeOutDuration,
            ease: t.mockupFadeEase,
        });

    // ── Story Details intro → crossfade into MainDemo ─────────────────────────
    tl.addLabel(LABELS.storyIntroEnter);
    addStorybookIntroEnter(tl, storyIntro, t);
    tl.to({}, { duration: t.storyIntroHoldSec }).addLabel(LABELS.storyCrossfade);

    addStorybookIntroExit(tl, storyIntro, t, LABELS.storyCrossfade);
    tl.add(
        () => {
            onMainDemoPlay?.();
        },
        LABELS.storyCrossfade,
    ).to(
        mainDemo,
        {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: t.storyCrossfadeDuration,
            ease: t.storyCrossfadeEase,
        },
        LABELS.storyCrossfade,
    );

    // ── MainDemo plays → freeze last frame → fade park → zoom phone ───────────
    tl.addLabel(LABELS.mainDemoActive)
        .to({}, { duration: mainDemoDurationSec + t.mainDemoHoldAfterSec })
        .addLabel(LABELS.mainDemoFreeze)
        .add(() => {
            freezeMainDemoVideo(mainDemo);
        })
        .addLabel(LABELS.mainDemoStoryEnter);

    if (storyOverlay) {
        tl.to(storyOverlay, {
            opacity: 1,
            duration: t.mainDemoStoryFadeInDuration,
            ease: t.mainDemoStoryFadeInEase,
        }).to({}, { duration: t.mainDemoStoryHoldSec });
    }

    if (atmosphere.length) {
        tl.to(atmosphere, {
            opacity: 0,
            duration: t.mainDemoBgFadeDuration,
            ease: t.mainDemoBgFadeEase,
        });
    } else {
        tl.to({}, { duration: t.mainDemoBgFadeDuration });
    }

    tl.addLabel(LABELS.mainDemoZoom)
        .to(mainDemo, {
            scale: t.mainDemoZoomScale,
            duration: t.mainDemoZoomDuration,
            ease: t.mainDemoZoomEase,
        })
        .to({}, { duration: t.mainDemoZoomHoldSec })
        .addLabel(LABELS.mainDemoExit)
        .to(mainDemo, {
            opacity: 0,
            duration: t.mainDemoFadeOutDuration,
            ease: t.mainDemoFadeOutEase,
        });

    // ── Selfie intro → mockup zoom (same language as Nearby) ──────────────────
    tl.addLabel(LABELS.selfieIntroEnter);
    addStorybookIntroEnter(tl, selfieIntro, t);
    tl.to({}, { duration: t.selfieIntroHoldSec }).addLabel(
        LABELS.selfieIntroExit,
    );
    addStorybookIntroExit(tl, selfieIntro, t);

    tl.addLabel(LABELS.selfieMockupEnter)
        .to(selfieMockup, {
            opacity: 1,
            y: 0,
            duration: t.mockupFadeInDuration,
            ease: t.mockupFadeEase,
        })
        .to({}, { duration: t.nearbyMockupHoldSec })
        .addLabel(LABELS.selfieMockupZoom)
        .to(selfieMockup, {
            scale: t.nearbyMockupZoomScale,
            duration: t.nearbyMockupZoomDuration,
            ease: t.nearbyMockupZoomEase,
        })
        .to({}, { duration: t.nearbyMockupZoomHoldSec })
        .addLabel(LABELS.selfieMockupExit)
        .to(selfieMockup, {
            opacity: 0,
            duration: t.mockupFadeOutDuration,
            ease: t.mockupFadeEase,
        });

    return tl;
}

export function playMomentsJourneyOnScroll(
    elements: MomentsJourneyElements,
    options: BuildMomentsJourneyOptions = {},
): { cleanup: () => void; restart: () => void } {
    const {
        solutionOpener,
        nearbyIntro,
        storyIntro,
        nearbyMockup,
        mainDemo,
        selfieIntro,
        selfieMockup,
    } = elements;
    const t = MOMENTS_JOURNEY_TIMING;
    const tl = buildMomentsJourneyTimeline(elements, options);

    const resetLayers = () => {
        prepareSolutionOpener(solutionOpener, t);
        prepareStorybookIntro(nearbyIntro, t);
        prepareStorybookIntro(storyIntro, t);
        prepareStorybookIntro(selfieIntro, t);
        gsap.set(nearbyMockup, {
            opacity: 0,
            y: t.mockupYOffset,
            scale: 1,
            transformOrigin: 'center center',
        });
        gsap.set(selfieMockup, {
            opacity: 0,
            y: t.mockupYOffset,
            scale: 1,
            transformOrigin: 'center center',
        });
        gsap.set(mainDemo, {
            opacity: 0,
            y: 0,
            scale: 1,
            transformOrigin: 'center center',
        });
        const atmosphere = getMainDemoAtmosphereElements(mainDemo);
        if (atmosphere.length) {
            gsap.set(atmosphere, { opacity: 1 });
        }
        const storyOverlay = getMainDemoStoryOverlay(mainDemo);
        if (storyOverlay) {
            gsap.set(storyOverlay, { opacity: 0 });
        }
    };

    const playFromStart = () => {
        resetLayers();
        tl.restart(true, false);
    };

    const trigger = ScrollTrigger.create({
        trigger: elements.stage,
        start: MOMENTS_JOURNEY_SCROLL_TRIGGER_START,
        once: true,
        onEnter: () => {
            tl.play();
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
