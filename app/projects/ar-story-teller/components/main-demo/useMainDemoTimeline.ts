'use client';

import { useLayoutEffect, useRef, type RefObject } from 'react';
import gsap from 'gsap';

import { playMainDemoTimelineOnScroll } from './mainDemoTimeline';

type MainDemoTimelineRefs = {
    canvasRef: RefObject<HTMLDivElement | null>;
    notificationRef: RefObject<HTMLDivElement | null>;
    windowGlowRef: RefObject<HTMLDivElement | null>;
    girlGhostRef: RefObject<HTMLDivElement | null>;
    iphoneDeviceRef: RefObject<HTMLDivElement | null>;
    iphoneVideoRef: RefObject<HTMLDivElement | null>;
    coachingOverlayRef: RefObject<HTMLDivElement | null>;
    /** Bumps on Replay — restarts the cinematic timeline from the beginning. */
    runId: number;
    /** Called when the timeline begins (first scroll enter or replay restart). */
    onStarted?: () => void;
    /** When false, wait for `runId` / restart instead of scroll enter. */
    autoPlayOnScroll?: boolean;
};

export function useMainDemoTimeline({
    canvasRef,
    notificationRef,
    windowGlowRef,
    girlGhostRef,
    iphoneDeviceRef,
    iphoneVideoRef,
    coachingOverlayRef,
    runId,
    onStarted,
    autoPlayOnScroll = true,
}: MainDemoTimelineRefs): void {
    const restartRef = useRef<(() => void) | null>(null);
    const onStartedRef = useRef(onStarted);
    onStartedRef.current = onStarted;

    useLayoutEffect(() => {
        const canvas = canvasRef.current;
        const notification = notificationRef.current;
        const windowGlow = windowGlowRef.current;
        const girlGhost = girlGhostRef.current;
        const iphoneDevice = iphoneDeviceRef.current;
        const iphoneVideo = iphoneVideoRef.current;
        const coachingOverlay = coachingOverlayRef.current;
        if (
            !canvas ||
            !notification ||
            !windowGlow ||
            !girlGhost ||
            !iphoneDevice ||
            !iphoneVideo ||
            !coachingOverlay
        ) {
            return;
        }

        const reducedMotion = window.matchMedia(
            '(prefers-reduced-motion: reduce)',
        ).matches;

        let scrollCleanup: (() => void) | undefined;

        const ctx = gsap.context(() => {
            const result = playMainDemoTimelineOnScroll(
                {
                    canvas,
                    notification,
                    windowGlow,
                    girlGhost,
                    iphoneDevice,
                    iphoneVideo,
                    coachingOverlay,
                },
                {
                    reducedMotion,
                    autoPlayOnScroll,
                    onStarted: () => onStartedRef.current?.(),
                },
            );
            scrollCleanup = result.cleanup;
            restartRef.current = result.restart;
        }, canvas);

        return () => {
            restartRef.current = null;
            scrollCleanup?.();
            ctx.revert();
        };
    }, [
        canvasRef,
        notificationRef,
        windowGlowRef,
        girlGhostRef,
        iphoneDeviceRef,
        iphoneVideoRef,
        coachingOverlayRef,
        autoPlayOnScroll,
    ]);

    useLayoutEffect(() => {
        if (runId === 0) return;
        restartRef.current?.();
    }, [runId]);
}
