'use client';

import React, { useSyncExternalStore } from 'react';
import { Parallax } from 'react-scroll-parallax';

import './OverviewParagraphBlock.scss';
import { SectionTitle } from './SectionTitle';
import ParagraphText from './ParagraphText';
import { OVERVIEW_WAITING_PEOPLE_OBJECT_PATHS } from '../lib/projectHeaderAssets';
import { useResponsive } from '@/lib/responsive/ResponsiveQueryProvider';
import ProjectImage from '@/lib/media/ProjectImage';

/** Silhouette lags behind the copy so the two columns float over it. */
const OVERVIEW_BG_PARALLAX_SPEED = -10;
const OVERVIEW_COPY_PARALLAX_SPEED = 4;

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

function subscribeReducedMotion(onStoreChange: () => void): () => void {
    const media = window.matchMedia(REDUCED_MOTION_QUERY);
    media.addEventListener('change', onStoreChange);
    return () => media.removeEventListener('change', onStoreChange);
}

function getReducedMotionSnapshot(): boolean {
    return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

interface OverviewParagraphBlockProps {
    title1?: string;
    title2?: string;
    paragraph1?: string[];
    paragraph2?: string[];
    [key: string]: unknown;
}

function OverviewBody({ paragraphs }: { paragraphs: string[] }) {
    return (
        <>
            {paragraphs.map((text, index) => (
                <ParagraphText key={index} text={text} />
            ))}
        </>
    );
}

function OverviewBackground({ objectPath }: { objectPath: string }) {
    return (
        <div className="overview-paragraph-block__bg-frame">
            <ProjectImage
                objectPath={objectPath}
                alt=""
                fill
                sizes="(max-width: 767px) 80vw, 60vw"
                className="overview-paragraph-block__bg-image"
            />
        </div>
    );
}

export function OverviewParagraphBlock({
    title1,
    title2,
    paragraph1 = [],
    paragraph2 = [],
    ...props
}: OverviewParagraphBlockProps) {
    const screenDevice = useResponsive();
    const reducedMotion = useSyncExternalStore(
        subscribeReducedMotion,
        getReducedMotionSnapshot,
        () => false,
    );
    const bgSpeed = reducedMotion ? 0 : OVERVIEW_BG_PARALLAX_SPEED;
    const copySpeed = reducedMotion ? 0 : OVERVIEW_COPY_PARALLAX_SPEED;

    const backgroundObjectPath = screenDevice.isMobile
        ? OVERVIEW_WAITING_PEOPLE_OBJECT_PATHS.mobile
        : screenDevice.isTablet
          ? OVERVIEW_WAITING_PEOPLE_OBJECT_PATHS.tablet
          : OVERVIEW_WAITING_PEOPLE_OBJECT_PATHS.desktop;

    if (screenDevice.isDesktopOrLaptop) {
        return (
            <div
                {...props}
                className="overview-paragraph-block overview-paragraph-block--desktop"
            >
                <Parallax
                    speed={bgSpeed}
                    className="overview-paragraph-block__bg"
                >
                    <OverviewBackground objectPath={backgroundObjectPath} />
                </Parallax>
                <div className="overview-paragraph-block__copy">
                    <Parallax speed={copySpeed}>
                        <div className="project-summary-container">
                            <div className="storyteller-laptoplg-content-left">
                                {title1 ? <SectionTitle title={title1} /> : null}
                                <OverviewBody paragraphs={paragraph1} />
                            </div>
                        </div>
                    </Parallax>
                    <Parallax speed={copySpeed}>
                        <div className="project-summary-container">
                            <div className="storyteller-laptoplg-content-right">
                                {title2 ? <SectionTitle title={title2} /> : null}
                                <OverviewBody paragraphs={paragraph2} />
                            </div>
                        </div>
                    </Parallax>
                </div>
            </div>
        );
    }

    if (screenDevice.isTablet) {
        return (
            <div
                {...props}
                className="overview-paragraph-block overview-paragraph-block--tablet"
            >
                <Parallax
                    speed={bgSpeed}
                    className="overview-paragraph-block__bg"
                >
                    <OverviewBackground objectPath={backgroundObjectPath} />
                </Parallax>
                <div className="overview-paragraph-block__copy">
                    <Parallax speed={copySpeed}>
                        <div className="project-summary-container">
                            <div className="content">
                                {title1 ? <SectionTitle title={title1} /> : null}
                                <OverviewBody paragraphs={paragraph1} />
                            </div>
                        </div>
                    </Parallax>
                    <Parallax speed={copySpeed}>
                        <div className="project-summary-container">
                            <div className="content">
                                {title2 ? <SectionTitle title={title2} /> : null}
                                <OverviewBody paragraphs={paragraph2} />
                            </div>
                        </div>
                    </Parallax>
                </div>
            </div>
        );
    }

    if (screenDevice.isMobile) {
        return (
            <div
                {...props}
                className="overview-paragraph-block overview-paragraph-block--mobile"
            >
                <Parallax
                    speed={bgSpeed}
                    className="overview-paragraph-block__bg"
                >
                    <OverviewBackground objectPath={backgroundObjectPath} />
                </Parallax>
                <div className="overview-paragraph-block__copy">
                    <Parallax speed={copySpeed}>
                        <div className="storyteller-mobile-paragraph-container">
                            <div className="storyteller-mobile-content">
                                {title1 ? <SectionTitle title={title1} /> : null}
                                <OverviewBody paragraphs={paragraph1} />
                            </div>
                        </div>
                    </Parallax>
                    <Parallax speed={copySpeed}>
                        <div className="storyteller-mobile-paragraph-container">
                            <div className="storyteller-mobile-content">
                                {title2 ? <SectionTitle title={title2} /> : null}
                                <OverviewBody paragraphs={paragraph2} />
                            </div>
                        </div>
                    </Parallax>
                </div>
            </div>
        );
    }

    return null;
}

export default OverviewParagraphBlock;
