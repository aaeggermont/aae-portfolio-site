'use client';

import { useSyncExternalStore } from 'react';
import {
    ParallaxBanner,
    ParallaxBannerLayer,
} from 'react-scroll-parallax';

import ProjectImage from '@/lib/media/ProjectImage';
import { CASE_STUDY_BANNER_OBJECT_PATH } from '@/app/projects/ar-story-teller/lib/criticalAssets';

const CASE_STUDY_BANNER_ALT =
    'Hollywood Tower of Terror at night under a full moon';
const CASE_STUDY_BANNER_EYEBROW = 'Case Study';
const CASE_STUDY_BANNER_BADGE = '130 Min Standby';

/** Image lags behind scroll — reads as depth behind the copy. */
const CASE_STUDY_BANNER_IMAGE_SPEED = -16;
/** Keep titles in the crop so they aren’t pushed off the bottom edge. */
const CASE_STUDY_BANNER_COPY_SPEED = 0;

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

function subscribeReducedMotion(onStoreChange: () => void): () => void {
    const media = window.matchMedia(REDUCED_MOTION_QUERY);
    media.addEventListener('change', onStoreChange);
    return () => media.removeEventListener('change', onStoreChange);
}

function getReducedMotionSnapshot(): boolean {
    return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

type CaseStudyBannerProps = {
    title: string;
};

export function CaseStudyBanner({ title }: CaseStudyBannerProps) {
    const reducedMotion = useSyncExternalStore(
        subscribeReducedMotion,
        getReducedMotionSnapshot,
        () => false,
    );
    const imageSpeed = reducedMotion ? 0 : CASE_STUDY_BANNER_IMAGE_SPEED;
    const copySpeed = reducedMotion ? 0 : CASE_STUDY_BANNER_COPY_SPEED;

    return (
        <div className="case-study-banner">
            <ParallaxBanner className="case-study-banner__parallax">
                <ParallaxBannerLayer expanded speed={imageSpeed}>
                    <div className="case-study-banner__image-wrap">
                        <ProjectImage
                            objectPath={CASE_STUDY_BANNER_OBJECT_PATH}
                            alt={CASE_STUDY_BANNER_ALT}
                            fill
                            sizes="100vw"
                            className="case-study-banner__image"
                            priority
                        />
                    </div>
                </ParallaxBannerLayer>
                <ParallaxBannerLayer speed={0}>
                    <div className="case-study-banner__scrim" aria-hidden />
                </ParallaxBannerLayer>
                <ParallaxBannerLayer speed={copySpeed}>
                    <div className="case-study-banner__copy-layer">
                        <div className="case-study-banner__content">
                            <p className="case-study-banner__eyebrow">
                                {CASE_STUDY_BANNER_EYEBROW}
                            </p>
                            <h2 className="case-study-banner__title">{title}</h2>
                            <span className="case-study-banner__badge">
                                {CASE_STUDY_BANNER_BADGE}
                            </span>
                        </div>
                    </div>
                </ParallaxBannerLayer>
            </ParallaxBanner>
        </div>
    );
}
