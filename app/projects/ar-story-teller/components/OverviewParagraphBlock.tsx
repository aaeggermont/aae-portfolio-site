'use client';

import React from 'react';
import './OverviewParagraphBlock.scss';
import { SectionTitle } from './SectionTitle';
import ParagraphText from './ParagraphText';
import { OVERVIEW_WAITING_PEOPLE_OBJECT_PATHS } from '../lib/projectHeaderAssets';
import { useProjectMediaUrl } from '@/lib/media/useProjectMediaUrl';
import { useResponsive } from '@/lib/responsive/ResponsiveQueryProvider';

// ─── Types ────────────────────────────────────────────────────────────────────

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

function overviewBackgroundStyle(url: string | null): React.CSSProperties | undefined {
    if (!url) return undefined;

    return {
        ['--overview-bg-image' as string]: `url(${url})`,
    };
}

// ─── Component ────────────────────────────────────────────────────────────────

export function OverviewParagraphBlock({
    title1, title2,
    paragraph1 = [], paragraph2 = [],
    ...props
}: OverviewParagraphBlockProps) {
    const screenDevice = useResponsive();
    const backgroundObjectPath = screenDevice.isMobile
        ? OVERVIEW_WAITING_PEOPLE_OBJECT_PATHS.mobile
        : screenDevice.isTablet
          ? OVERVIEW_WAITING_PEOPLE_OBJECT_PATHS.tablet
          : OVERVIEW_WAITING_PEOPLE_OBJECT_PATHS.desktop;
    const { url: backgroundUrl } = useProjectMediaUrl(backgroundObjectPath);
    const backgroundStyle = overviewBackgroundStyle(backgroundUrl);

    if (screenDevice.isDesktopOrLaptop) {
        return (
            <div
                {...props}
                className="overview-paragraph-block overview-paragraph-block--desktop"
                style={backgroundStyle}
            >
                <div className="project-summary-container">
                    <div className="storyteller-laptoplg-content-left">
                        {title1 ? <SectionTitle title={title1} /> : null}
                        <OverviewBody paragraphs={paragraph1} />
                    </div>
                </div>
                <div className="project-summary-container">
                    <div className="storyteller-laptoplg-content-right">
                        {title2 ? <SectionTitle title={title2} /> : null}
                        <OverviewBody paragraphs={paragraph2} />
                    </div>
                </div>
            </div>
        );
    } else if (screenDevice.isTablet) {
        return (
            <div
                {...props}
                className="overview-paragraph-block overview-paragraph-block--tablet"
                style={backgroundStyle}
            >
                <div className="project-summary-container">
                    <div className="content">
                        {title1 ? <SectionTitle title={title1} /> : null}
                        <OverviewBody paragraphs={paragraph1} />
                    </div>
                </div>
                <div className="project-summary-container">
                    <div className="content">
                        {title2 ? <SectionTitle title={title2} /> : null}
                        <OverviewBody paragraphs={paragraph2} />
                    </div>
                </div>
            </div>
        );
    } else if (screenDevice.isMobile) {
        return (
            <div
                {...props}
                className="overview-paragraph-block overview-paragraph-block--mobile"
                style={backgroundStyle}
            >
                <div className="storyteller-mobile-paragraph-container">
                    <div className="storyteller-mobile-content">
                        {title1 ? <SectionTitle title={title1} /> : null}
                        <OverviewBody paragraphs={paragraph1} />
                    </div>
                </div>
                <div className="storyteller-mobile-paragraph-container">
                    <div className="storyteller-mobile-content">
                        {title2 ? <SectionTitle title={title2} /> : null}
                        <OverviewBody paragraphs={paragraph2} />
                    </div>
                </div>
            </div>
        );
    }

    return null;
}

export default OverviewParagraphBlock;
