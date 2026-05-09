'use client';
import TitleParagraph from './TitleParagraph';

interface SectionTitleProps {
    title: string;
    [key: string]: unknown;
}

export function SectionTitle({ title, ...props }: SectionTitleProps) {
    return (
        <div {...props}>
            <TitleParagraph title={title} />
        </div>
    );
}

export default SectionTitle;
