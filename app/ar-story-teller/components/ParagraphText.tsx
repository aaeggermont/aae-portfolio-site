'use client';
import './ParagraphText.scss';
import { useResponsive } from '@/app/lib/responsive/ResponsiveQueryProvider';

// ─── Types ────────────────────────────────────────────────────────────────────

interface ParagraphTextProps {
    text?: string;
    [key: string]: unknown;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function ParagraphText({ text = '', ...props }: ParagraphTextProps) {
    const screenDevice = useResponsive();

    return (
        <div className={screenDevice.isMobile ? 'storyteller-xsxm-paragraph-text' : 'st-paragraph-text'}>
            <p className="text-paragraph">{text}</p>
        </div>
    );
}

export default ParagraphText;
