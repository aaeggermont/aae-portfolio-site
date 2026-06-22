'use client';

import { useLayoutEffect, type RefObject } from 'react';
import gsap from 'gsap';

import { playMainDemoTimelineOnScroll } from './mainDemoTimeline';

type MainDemoTimelineRefs = {
    canvasRef: RefObject<HTMLDivElement | null>;
    notificationRef: RefObject<HTMLDivElement | null>;
    windowGlowRef: RefObject<HTMLDivElement | null>;
    girlGhostRef: RefObject<HTMLDivElement | null>;
    iphoneDeviceRef: RefObject<HTMLDivElement | null>;
    iphoneVideoRef: RefObject<HTMLDivElement | null>;
};

export function useMainDemoTimeline({
    canvasRef,
    notificationRef,
    windowGlowRef,
    girlGhostRef,
    iphoneDeviceRef,
    iphoneVideoRef,
}: MainDemoTimelineRefs): void {
    useLayoutEffect(() => {
        const canvas = canvasRef.current;
        const notification = notificationRef.current;
        const windowGlow = windowGlowRef.current;
        const girlGhost = girlGhostRef.current;
        const iphoneDevice = iphoneDeviceRef.current;
        const iphoneVideo = iphoneVideoRef.current;
        if (
            !canvas ||
            !notification ||
            !windowGlow ||
            !girlGhost ||
            !iphoneDevice ||
            !iphoneVideo
        ) {
            return;
        }

        const reducedMotion = window.matchMedia(
            '(prefers-reduced-motion: reduce)',
        ).matches;

        let scrollCleanup: (() => void) | undefined;

        const ctx = gsap.context(() => {
            scrollCleanup = playMainDemoTimelineOnScroll(
                {
                    canvas,
                    notification,
                    windowGlow,
                    girlGhost,
                    iphoneDevice,
                    iphoneVideo,
                },
                { reducedMotion },
            );
        }, canvas);

        return () => {
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
    ]);
}
