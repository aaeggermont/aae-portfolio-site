'use client';
import './TitleParagraph.scss';
import type { CSSProperties } from 'react';
import { useResponsive } from '@/lib/responsive/ResponsiveQueryProvider';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface TitleParagraphProps {
    title: string;
    paddingTop?: CSSProperties['paddingTop'];
    paddingBottom?: CSSProperties['paddingBottom'];
}

// ─── Component ────────────────────────────────────────────────────────────────

export function TitleParagraph({
    title,
    paddingTop,
    paddingBottom,
}: TitleParagraphProps) {
    const screenDevice = useResponsive();
    const containerStyle: CSSProperties = {
        ...(paddingTop !== undefined ? { paddingTop } : {}),
        ...(paddingBottom !== undefined ? { paddingBottom } : {}),
    };

    if (screenDevice.isDesktopOrLaptop) {
        return (
            <>
                <div
                    className="storyteller-laptop-paragraph-title"
                    style={containerStyle}
                >
                    <div className="title-paragraph">{title}</div>
                </div>
            </>
        );
    } else if (screenDevice.isTablet) {
        return (
            <>
                <div
                    className="storyteller-lgmd-paragraph-title"
                    style={containerStyle}
                >
                    <div className="title-paragraph">{title}</div>
                </div>
            </>
        );
    } else if (screenDevice.isMobile) {
        return (
            <>
                <div
                    className="storyteller-xsxm-paragraph-title"
                    style={containerStyle}
                >
                    <div className="title-paragraph">{title}</div>
                </div>
            </>
        );
    }
    return null;
}

export default TitleParagraph;
