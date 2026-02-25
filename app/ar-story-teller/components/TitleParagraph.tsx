'use client';
import './TitleParagraph.scss';
import { useResponsive } from '@/app/lib/responsive/ResponsiveQueryProvider';

// ─── Types ────────────────────────────────────────────────────────────────────

interface TitleParagraphProps {
    title: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function TitleParagraph({ title }: TitleParagraphProps) {
    const screenDevice = useResponsive();

    if (screenDevice.isDesktopOrLaptop) {
        return (
            <>
                <div className="storyteller-laptop-paragraph-title">
                    <div className="title-paragraph">{title}</div>
                </div>
            </>
        );
    } else if (screenDevice.isTablet) {
        return (
            <>
                <div className="storyteller-lgmd-paragraph-title">
                    <div className="title-paragraph">{title}</div>
                </div>
            </>
        );
    } else if (screenDevice.isMobile) {
        return (
            <>
                <div className="storyteller-xsxm-paragraph-title">
                    <div className="title-paragraph">{title}</div>
                </div>
            </>
        );
    }
    return null;
}

export default TitleParagraph;
