import React from 'react';
import './OverviewParagraphBlock.scss';
import { SectionTitle } from './SectionTitle';
import ParagraphText from './ParagraphText';
import WaitingPeopleDesktop from '../Images/WaitingPeople-DesktopLg.png';
import WaitingPeopleLgMd from '../Images/WaitingPeople-LgMd.png';
import WaitingPeopleSMSX from '../Images/WaitingPeople-SMSX.png';
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

// ─── Component ────────────────────────────────────────────────────────────────

export function OverviewParagraphBlock({
    title1, title2,
    paragraph1 = [], paragraph2 = [],
    ...props
}: OverviewParagraphBlockProps) {
    const screenDevice = useResponsive();

    if (screenDevice.isDesktopOrLaptop) {
        return (
            <div
                {...props}
                className="project-summary"
                style={{
                    backgroundImage: `url(${WaitingPeopleDesktop.src})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center top 10%',
                    backgroundSize: '60%',
                }}
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
                style={{
                    backgroundImage: `url(${WaitingPeopleLgMd.src})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center center',
                }}
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
                style={{
                    backgroundImage: `url(${WaitingPeopleSMSX.src})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'auto',
                }}
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
