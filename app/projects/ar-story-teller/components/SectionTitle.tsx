'use client';
import type { ComponentPropsWithoutRef } from 'react';
import TitleParagraph from './TitleParagraph';
import type { TitleParagraphProps } from './TitleParagraph';

interface SectionTitleProps extends ComponentPropsWithoutRef<'div'> {
    title: string;
    paddingTop?: TitleParagraphProps['paddingTop'];
    paddingBottom?: TitleParagraphProps['paddingBottom'];
}

export function SectionTitle({
    title,
    paddingTop,
    paddingBottom,
    ...props
}: SectionTitleProps) {
    return (
        <div {...props}>
            <TitleParagraph
                title={title}
                paddingTop={paddingTop}
                paddingBottom={paddingBottom}
            />
        </div>
    );
}

export default SectionTitle;
