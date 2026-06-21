'use client';

import { useLayoutEffect, type RefObject } from 'react';
import gsap from 'gsap';

import { playMainDemoTimelineOnScroll } from './mainDemoTimeline';

type MainDemoTimelineRefs = {
    canvasRef: RefObject<HTMLDivElement | null>;
    notificationRef: RefObject<HTMLDivElement | null>;
    windowGlowRef: RefObject<HTMLDivElement | null>;
    girlGhostRef: RefObject<HTMLDivElement | null>;
};

export function useMainDemoTimeline({
    canvasRef,
    notificationRef,
    windowGlowRef,
    girlGhostRef,
}: MainDemoTimelineRefs): void {
    useLayoutEffect(() => {
        const canvas = canvasRef.current;
        const notification = notificationRef.current;
        const windowGlow = windowGlowRef.current;
        const girlGhost = girlGhostRef.current;
        if (!canvas || !notification || !windowGlow || !girlGhost) return;

        const reducedMotion = window.matchMedia(
            '(prefers-reduced-motion: reduce)',
        ).matches;

        let scrollCleanup: (() => void) | undefined;

        const ctx = gsap.context(() => {
            scrollCleanup = playMainDemoTimelineOnScroll(
                { canvas, notification, windowGlow, girlGhost },
                { reducedMotion },
            );
        }, canvas);

        return () => {
            scrollCleanup?.();
            ctx.revert();
        };
    }, [canvasRef, notificationRef, windowGlowRef, girlGhostRef]);
}
