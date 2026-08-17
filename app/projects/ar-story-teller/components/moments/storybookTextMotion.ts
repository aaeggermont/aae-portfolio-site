import gsap from 'gsap';

import { MOMENTS_JOURNEY_TIMING } from './momentsTiming';

type StorybookTiming = typeof MOMENTS_JOURNEY_TIMING;

export type MomentIntroParts = {
    words: NodeListOf<Element>;
    description: Element | null;
};

export function getMomentIntroParts(root: HTMLElement): MomentIntroParts {
    return {
        words: root.querySelectorAll('[data-moment-word]'),
        description: root.querySelector('[data-moment-desc]'),
    };
}

/** Initial storybook state — container visible; words & line wait offstage. */
export function prepareStorybookIntro(
    root: HTMLElement,
    timing: StorybookTiming = MOMENTS_JOURNEY_TIMING,
): MomentIntroParts {
    const parts = getMomentIntroParts(root);
    gsap.set(root, { opacity: 1, y: 0, clearProps: 'filter' });
    gsap.set(parts.words, {
        opacity: 0,
        y: timing.wordYOffset,
        filter: `blur(${timing.wordBlurPx}px)`,
    });
    if (parts.description) {
        gsap.set(parts.description, {
            opacity: 0,
            y: timing.descYOffset,
            filter: 'blur(0px)',
        });
    }
    return parts;
}

/**
 * Storybook title card — words rise, sharpen, and settle; description follows.
 * Appends to `tl` at the current end (or at `position` if provided).
 */
export function addStorybookIntroEnter(
    tl: gsap.core.Timeline,
    root: HTMLElement,
    timing: StorybookTiming = MOMENTS_JOURNEY_TIMING,
    position?: gsap.Position,
): gsap.core.Timeline {
    const { words, description } = getMomentIntroParts(root);

    tl.to(
        words,
        {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: timing.wordFadeInDuration,
            stagger: timing.wordStaggerSec,
            ease: timing.wordFadeInEase,
        },
        position,
    );

    if (description) {
        tl.to(
            description,
            {
                opacity: 1,
                y: 0,
                duration: timing.descFadeInDuration,
                ease: timing.descFadeInEase,
            },
            `-=${timing.descOverlapSec}`,
        );
    }

    return tl;
}

/** Soft dissolve — words thin upward while the line fades with them. */
export function addStorybookIntroExit(
    tl: gsap.core.Timeline,
    root: HTMLElement,
    timing: StorybookTiming = MOMENTS_JOURNEY_TIMING,
    position?: gsap.Position,
): gsap.core.Timeline {
    const { words, description } = getMomentIntroParts(root);

    tl.to(
        words,
        {
            opacity: 0,
            y: -timing.wordExitYOffset,
            filter: `blur(${timing.wordExitBlurPx}px)`,
            duration: timing.wordFadeOutDuration,
            stagger: timing.wordExitStaggerSec,
            ease: timing.wordFadeOutEase,
        },
        position,
    );

    if (description) {
        tl.to(
            description,
            {
                opacity: 0,
                y: -timing.descExitYOffset,
                duration: timing.descFadeOutDuration,
                ease: timing.descFadeOutEase,
            },
            '<',
        );
    }

    return tl;
}

export type SolutionOpenerParts = {
    eyebrow: Element | null;
    words: NodeListOf<Element>;
};

export function getSolutionOpenerParts(root: HTMLElement): SolutionOpenerParts {
    return {
        eyebrow: root.querySelector('[data-moment-eyebrow]'),
        words: root.querySelectorAll('[data-moment-word]'),
    };
}

export function prepareSolutionOpener(
    root: HTMLElement,
    timing: StorybookTiming = MOMENTS_JOURNEY_TIMING,
): SolutionOpenerParts {
    const parts = getSolutionOpenerParts(root);
    gsap.set(root, { opacity: 1, y: 0, clearProps: 'filter' });
    if (parts.eyebrow) {
        gsap.set(parts.eyebrow, {
            opacity: 0,
            y: timing.eyebrowYOffset,
        });
    }
    gsap.set(parts.words, {
        opacity: 0,
        y: timing.wordYOffset,
        filter: `blur(${timing.wordBlurPx}px)`,
    });
    return parts;
}

/** Eyebrow fades in first; headline words follow with a slower storybook stagger. */
export function addSolutionOpenerEnter(
    tl: gsap.core.Timeline,
    root: HTMLElement,
    timing: StorybookTiming = MOMENTS_JOURNEY_TIMING,
    position?: gsap.Position,
): gsap.core.Timeline {
    const { eyebrow, words } = getSolutionOpenerParts(root);

    if (eyebrow) {
        tl.to(
            eyebrow,
            {
                opacity: 1,
                y: 0,
                duration: timing.eyebrowFadeInDuration,
                ease: timing.eyebrowFadeInEase,
            },
            position,
        );
    }

    tl.to(words, {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: timing.openerWordFadeInDuration,
        stagger: timing.openerWordStaggerSec,
        ease: timing.wordFadeInEase,
    });

    return tl;
}

export function addSolutionOpenerExit(
    tl: gsap.core.Timeline,
    root: HTMLElement,
    timing: StorybookTiming = MOMENTS_JOURNEY_TIMING,
    position?: gsap.Position,
): gsap.core.Timeline {
    const { eyebrow, words } = getSolutionOpenerParts(root);

    tl.to(
        words,
        {
            opacity: 0,
            y: -timing.wordExitYOffset,
            filter: `blur(${timing.wordExitBlurPx}px)`,
            duration: timing.wordFadeOutDuration,
            stagger: timing.wordExitStaggerSec,
            ease: timing.wordFadeOutEase,
        },
        position,
    );

    if (eyebrow) {
        tl.to(
            eyebrow,
            {
                opacity: 0,
                y: -timing.eyebrowYOffset * 0.5,
                duration: timing.eyebrowFadeOutDuration,
                ease: timing.eyebrowFadeOutEase,
            },
            '<',
        );
    }

    return tl;
}
