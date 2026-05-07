import React from 'react';
import './OverviewParagraphBlock.scss';
import WaitingPeopleDesktop from '../Images/WaitingPeople-DesktopLg.png';
import WaitingPeopleLgMd from '../Images/WaitingPeople-LgMd.png';
import WaitingPeopleSMSX from '../Images/WaitingPeople-SMSX.png';
import { useResponsive } from '@/lib/responsive/ResponsiveQueryProvider';

// ─── Types ────────────────────────────────────────────────────────────────────

interface OverviewParagraphBlockProps {
    title1?: string;
    title2?: string;
    paragraph1?: React.ReactNode;
    paragraph2?: React.ReactNode;
    [key: string]: unknown;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function OverviewParagraphBlock({
    title1, title2,
    paragraph1, paragraph2,
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
                        <span>{title1}</span>
                        <p>{paragraph1}</p>
                    </div>
                </div>
                <div className="project-summary-container">
                    <div className="storyteller-laptoplg-content-right">
                        <span>{title2}</span>
                        <p>{paragraph2}</p>
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
                        <span>{title1}</span>
                        <p>{paragraph1}</p>
                    </div>
                </div>
                <div className="project-summary-container">
                    <div className="content">
                        <span>{title2}</span>
                        <p>{paragraph2}</p>
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
                        <div className="storyteller-mobile-paragraph-title">{title1}</div>
                        <p className="storyteller-mobile-paragraph-text">{paragraph1}</p>
                    </div>
                </div>
                <div className="storyteller-mobile-paragraph-container">
                    <div className="storyteller-mobile-content">
                        <div className="storyteller-mobile-paragraph-title">{title2}</div>
                        <p className="storyteller-mobile-paragraph-text">{paragraph2}</p>
                    </div>
                </div>
            </div>
        );
    }

    return null;
}

export default OverviewParagraphBlock;
