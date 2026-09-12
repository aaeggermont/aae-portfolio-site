import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { MAIN_DEMO_DURATION_MS } from '../main-demo/mainDemoTiming';
import {
    freezeMainDemoVideo,
    getMainDemoArVideo,
    getMainDemoAtmosphereElements,
    getMainDemoStoryGlow,
    getMainDemoStoryOverlay,
    getMainDemoStoryText,
    unfreezeMainDemoVideo,
} from './mainDemoFinale';
import {
    MOMENTS_JOURNEY_LABELS,
    MOMENTS_JOURNEY_LOOP_GAP_SEC,
    MOMENTS_JOURNEY_SCROLL_TRIGGER_END,
    MOMENTS_JOURNEY_SCROLL_TRIGGER_START,
    MOMENTS_JOURNEY_SNAP_DURATION_SEC,
    MOMENTS_JOURNEY_SNAP_EASE,
    MOMENTS_JOURNEY_SNAP_END,
    MOMENTS_JOURNEY_SNAP_START,
    MOMENTS_JOURNEY_SNAP_THRESHOLD_PX,
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
    artifactsIntro: HTMLElement;
    artifactsMockup: HTMLElement;
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
        artifactsIntro,
        artifactsMockup,
    } = elements;
    const { reducedMotion = false, onMainDemoPlay } = options;
    const t = MOMENTS_JOURNEY_TIMING;
    const mainDemoDurationSec = MAIN_DEMO_DURATION_MS / 1000;
    const atmosphere = getMainDemoAtmosphereElements(mainDemo);
    const storyOverlay = getMainDemoStoryOverlay(mainDemo);
    const storyGlow = getMainDemoStoryGlow(mainDemo);
    const storyText = getMainDemoStoryText(mainDemo);
    const arVideo = getMainDemoArVideo(mainDemo);

    gsap.set([nearbyMockup, mainDemo, selfieMockup, artifactsMockup], {
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
    gsap.set(artifactsMockup, {
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
    if (storyGlow) {
        gsap.set(storyGlow, { opacity: 0 });
    }
    if (storyText) {
        gsap.set(storyText, {
            '--story-text-glow': t.mainDemoStoryTextGlowRest,
        });
    }
    if (arVideo) {
        gsap.set(arVideo, { filter: t.mainDemoStoryVideoFilterRest });
    }
    prepareSolutionOpener(solutionOpener, t);
    prepareStorybookIntro(nearbyIntro, t);
    prepareStorybookIntro(storyIntro, t);
    prepareStorybookIntro(selfieIntro, t);
    prepareStorybookIntro(artifactsIntro, t);

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
                ...artifactsIntro.querySelectorAll('[data-moment-word]'),
                artifactsIntro.querySelector('[data-moment-desc]'),
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
        .to({}, { duration: t.nearbyMockupHoldSec }, '<')
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
        });
        if (storyGlow) {
            tl.to(
                storyGlow,
                {
                    opacity: t.mainDemoStoryGlowRestOpacity,
                    duration: t.mainDemoStoryFadeInDuration,
                    ease: t.mainDemoStoryFadeInEase,
                },
                '<',
            );
        }
        if (arVideo) {
            tl.to(
                arVideo,
                {
                    filter: t.mainDemoStoryVideoFilter,
                    duration: t.mainDemoStoryFadeInDuration,
                    ease: t.mainDemoStoryVideoFilterEase,
                },
                '<',
            );
        }
        tl.to({}, { duration: t.mainDemoStoryHoldSec });
        if (atmosphere.length) {
            tl.to(
                atmosphere,
                {
                    opacity: 0,
                    duration: t.mainDemoBgFadeDuration,
                    ease: t.mainDemoBgFadeEase,
                },
                `<+=${Math.max(0, t.mainDemoStoryHoldSec - t.mainDemoBgFadeDuration)}`,
            );
        }
    } else if (atmosphere.length) {
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
        .to({}, { duration: t.nearbyMockupHoldSec }, '<')
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

    // ── Artifacts intro → mockup zoom (same language as Nearby / Selfie) ──────
    tl.addLabel(LABELS.artifactsIntroEnter);
    addStorybookIntroEnter(tl, artifactsIntro, t);
    tl.to({}, { duration: t.artifactsIntroHoldSec }).addLabel(
        LABELS.artifactsIntroExit,
    );
    addStorybookIntroExit(tl, artifactsIntro, t);

    tl.addLabel(LABELS.artifactsMockupEnter)
        .to(artifactsMockup, {
            opacity: 1,
            y: 0,
            duration: t.mockupFadeInDuration,
            ease: t.mockupFadeEase,
        })
        .to({}, { duration: t.nearbyMockupHoldSec }, '<')
        .addLabel(LABELS.artifactsMockupZoom)
        .to(artifactsMockup, {
            scale: t.nearbyMockupZoomScale,
            duration: t.nearbyMockupZoomDuration,
            ease: t.nearbyMockupZoomEase,
        })
        .to({}, { duration: t.nearbyMockupZoomHoldSec })
        .addLabel(LABELS.artifactsMockupExit)
        .to(artifactsMockup, {
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
        artifactsIntro,
        artifactsMockup,
    } = elements;
    const t = MOMENTS_JOURNEY_TIMING;
    const tl = buildMomentsJourneyTimeline(elements, options);

    const resetLayers = () => {
        prepareSolutionOpener(solutionOpener, t);
        prepareStorybookIntro(nearbyIntro, t);
        prepareStorybookIntro(storyIntro, t);
        prepareStorybookIntro(selfieIntro, t);
        prepareStorybookIntro(artifactsIntro, t);
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
        gsap.set(artifactsMockup, {
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
        const storyGlow = getMainDemoStoryGlow(mainDemo);
        if (storyGlow) {
            gsap.set(storyGlow, { opacity: 0 });
        }
        const storyText = getMainDemoStoryText(mainDemo);
        if (storyText) {
            storyText.style.setProperty(
                '--story-text-glow',
                String(t.mainDemoStoryTextGlowRest),
            );
        }
        const arVideo = getMainDemoArVideo(mainDemo);
        if (arVideo) {
            gsap.set(arVideo, { filter: t.mainDemoStoryVideoFilterRest });
        }
        unfreezeMainDemoVideo(mainDemo);
    };

    let loopCall: gsap.core.Tween | undefined;
    let livingGlow: gsap.core.Timeline | undefined;

    const stopLivingGlow = () => {
        livingGlow?.kill();
        livingGlow = undefined;
        const storyGlow = getMainDemoStoryGlow(mainDemo);
        if (storyGlow) {
            gsap.set(storyGlow, { opacity: 0 });
        }
        const storyText = getMainDemoStoryText(mainDemo);
        if (storyText) {
            storyText.style.setProperty(
                '--story-text-glow',
                String(t.mainDemoStoryTextGlowRest),
            );
        }
    };

    const startLivingGlow = () => {
        livingGlow?.kill();
        livingGlow = undefined;
        const storyGlow = getMainDemoStoryGlow(mainDemo);
        const storyText = getMainDemoStoryText(mainDemo);
        if (!storyGlow && !storyText) return;

        const glowState = {
            overlay: t.mainDemoStoryGlowRestOpacity,
            caption: t.mainDemoStoryTextGlowRest,
        };
        livingGlow = gsap.timeline({
            repeat: -1,
            yoyo: true,
            defaults: {
                duration: t.mainDemoStoryGlowPulseSec,
                ease: t.mainDemoStoryGlowPulseEase,
            },
        });
        livingGlow.to(glowState, {
            overlay: t.mainDemoStoryGlowPeakOpacity,
            caption: t.mainDemoStoryTextGlowPeak,
            onUpdate: () => {
                if (storyGlow) {
                    gsap.set(storyGlow, { opacity: glowState.overlay });
                }
                if (storyText) {
                    storyText.style.setProperty(
                        '--story-text-glow',
                        String(glowState.caption),
                    );
                }
            },
        });
    };

    const playFromStart = () => {
        loopCall?.kill();
        stopLivingGlow();
        resetLayers();
        tl.restart(true, false);
    };

    const resumePlayback = () => {
        if (tl.progress() === 1 && !tl.isActive()) {
            playFromStart();
            return;
        }
        livingGlow?.resume();
        tl.play();
    };

    if (!options.reducedMotion) {
        tl.add(
            startLivingGlow,
            `${LABELS.mainDemoStoryEnter}+=${t.mainDemoStoryFadeInDuration}`,
        );
        tl.add(stopLivingGlow, LABELS.mainDemoExit);
        tl.eventCallback('onComplete', () => {
            loopCall?.kill();
            stopLivingGlow();
            loopCall = gsap.delayedCall(
                MOMENTS_JOURNEY_LOOP_GAP_SEC,
                playFromStart,
            );
        });
    }

    const pausePlayback = () => {
        loopCall?.kill();
        livingGlow?.pause();
        snapTween?.kill();
        isSnapping = false;
        tl.pause();
    };

    const trigger = ScrollTrigger.create({
        trigger: elements.stage,
        start: MOMENTS_JOURNEY_SCROLL_TRIGGER_START,
        end: MOMENTS_JOURNEY_SCROLL_TRIGGER_END,
        onEnter: resumePlayback,
        onEnterBack: resumePlayback,
        onLeave: pausePlayback,
        onLeaveBack: pausePlayback,
    });

    let snapTween: gsap.core.Tween | undefined;
    let isSnapping = false;

    const snapStageToViewportCenter = () => {
        if (isSnapping) return;
        const rect = elements.stage.getBoundingClientRect();
        const delta = rect.top + rect.height / 2 - window.innerHeight / 2;
        if (Math.abs(delta) <= MOMENTS_JOURNEY_SNAP_THRESHOLD_PX) return;

        isSnapping = true;
        const proxy = { y: window.scrollY };
        snapTween?.kill();
        snapTween = gsap.to(proxy, {
            y: window.scrollY + delta,
            duration: MOMENTS_JOURNEY_SNAP_DURATION_SEC,
            ease: MOMENTS_JOURNEY_SNAP_EASE,
            overwrite: true,
            onUpdate: () => {
                window.scrollTo(0, proxy.y);
            },
            onComplete: () => {
                isSnapping = false;
                ScrollTrigger.refresh();
                resumePlayback();
            },
            onInterrupt: () => {
                isSnapping = false;
            },
        });
    };

    const interruptSnap = () => {
        if (!isSnapping) return;
        snapTween?.kill();
        isSnapping = false;
    };

    const snapTrigger = options.reducedMotion
        ? undefined
        : ScrollTrigger.create({
              trigger: elements.stage,
              start: MOMENTS_JOURNEY_SNAP_START,
              end: MOMENTS_JOURNEY_SNAP_END,
              onEnter: snapStageToViewportCenter,
              onEnterBack: snapStageToViewportCenter,
          });

    if (snapTrigger) {
        window.addEventListener('wheel', interruptSnap, { passive: true });
        window.addEventListener('touchmove', interruptSnap, { passive: true });
        window.addEventListener('keydown', interruptSnap);
    }

    return {
        cleanup: () => {
            loopCall?.kill();
            snapTween?.kill();
            if (snapTrigger) {
                window.removeEventListener('wheel', interruptSnap);
                window.removeEventListener('touchmove', interruptSnap);
                window.removeEventListener('keydown', interruptSnap);
            }
            stopLivingGlow();
            snapTrigger?.kill();
            trigger.kill();
            tl.kill();
        },
        restart: playFromStart,
    };
}
