'use client';

import { useLayoutEffect, useRef, type RefObject } from 'react';
import gsap from 'gsap';

import { playMomentsJourneyOnScroll } from './buildMomentsJourneyTimeline';

type MomentsJourneyTimelineRefs = {
    stageRef: RefObject<HTMLElement | null>;
    solutionOpenerRef: RefObject<HTMLElement | null>;
    nearbyIntroRef: RefObject<HTMLElement | null>;
    storyIntroRef: RefObject<HTMLElement | null>;
    nearbyMockupRef: RefObject<HTMLElement | null>;
    mainDemoRef: RefObject<HTMLElement | null>;
    selfieIntroRef: RefObject<HTMLElement | null>;
    selfieMockupRef: RefObject<HTMLElement | null>;
    /** Bumps on Replay — restarts the full journey from the beginning. */
    runId: number;
    onMainDemoPlay?: () => void;
};

export function useMomentsJourneyTimeline({
    stageRef,
    solutionOpenerRef,
    nearbyIntroRef,
    storyIntroRef,
    nearbyMockupRef,
    mainDemoRef,
    selfieIntroRef,
    selfieMockupRef,
    runId,
    onMainDemoPlay,
}: MomentsJourneyTimelineRefs): void {
    const restartRef = useRef<(() => void) | null>(null);
    const onMainDemoPlayRef = useRef(onMainDemoPlay);
    onMainDemoPlayRef.current = onMainDemoPlay;

    useLayoutEffect(() => {
        const stage = stageRef.current;
        const solutionOpener = solutionOpenerRef.current;
        const nearbyIntro = nearbyIntroRef.current;
        const storyIntro = storyIntroRef.current;
        const nearbyMockup = nearbyMockupRef.current;
        const mainDemo = mainDemoRef.current;
        const selfieIntro = selfieIntroRef.current;
        const selfieMockup = selfieMockupRef.current;
        if (
            !stage ||
            !solutionOpener ||
            !nearbyIntro ||
            !storyIntro ||
            !nearbyMockup ||
            !mainDemo ||
            !selfieIntro ||
            !selfieMockup
        ) {
            return;
        }

        const reducedMotion = window.matchMedia(
            '(prefers-reduced-motion: reduce)',
        ).matches;

        let scrollCleanup: (() => void) | undefined;

        const ctx = gsap.context(() => {
            const result = playMomentsJourneyOnScroll(
                {
                    stage,
                    solutionOpener,
                    nearbyIntro,
                    storyIntro,
                    nearbyMockup,
                    mainDemo,
                    selfieIntro,
                    selfieMockup,
                },
                {
                    reducedMotion,
                    onMainDemoPlay: () => onMainDemoPlayRef.current?.(),
                },
            );
            scrollCleanup = result.cleanup;
            restartRef.current = result.restart;
        }, stage);

        return () => {
            restartRef.current = null;
            scrollCleanup?.();
            ctx.revert();
        };
    }, [
        stageRef,
        solutionOpenerRef,
        nearbyIntroRef,
        storyIntroRef,
        nearbyMockupRef,
        mainDemoRef,
        selfieIntroRef,
        selfieMockupRef,
    ]);

    useLayoutEffect(() => {
        if (runId === 0) return;
        restartRef.current?.();
    }, [runId]);
}
