'use client';
import { useMemo, useState } from 'react';
import TitleParagraph from './TitleParagraph';
import ParagraphText from './ParagraphText';
import SubTitle1 from './SubTitle1';
import SubTitle2 from './SubTitle2';
import './ParagraphBlock.scss';
import { useResponsive } from '@/app/lib/responsive/ResponsiveQueryProvider';

// ─── Types ────────────────────────────────────────────────────────────────────

interface ReadMoreButtonProps {
    onClick: () => void;
    isShowingFull?: boolean;
}

interface ParagraphBlockProps {
    title?: string;
    subTitle1?: string;
    subTitle2?: string;
    paragraphs?: string[];
    wordsLimit?: number | null;
    showReadMore?: boolean;
    [key: string]: unknown;
}

// ─── Internal Components ──────────────────────────────────────────────────────

function ReadMoreButton({ onClick, isShowingFull = false }: ReadMoreButtonProps) {
    return (
        <button
            onClick={onClick}
            style={{ color: '#00577F', fontSize: '1rem' }}
        >
            {isShowingFull ? 'Show less' : 'Read more ...'}
        </button>
    );
}

// ─── Component ────────────────────────────────────────────────────────────────

export function ParagraphBlock({
    title,
    subTitle1,
    subTitle2,
    paragraphs = [],
    wordsLimit = null,
    showReadMore = false,
    ...props
}: ParagraphBlockProps) {
    const screenDevice = useResponsive();
    const [isShowingFull, setShowingFull] = useState(false);

    const textToShow = useMemo(() => {
        const paragraphReducer = (paragraphs: string[] = []) => {
            if (!wordsLimit || isShowingFull) return paragraphs;

            const text: string[] = [];
            let limit = wordsLimit;

            for (const paragraph of paragraphs) {
                if (typeof paragraph !== 'string') continue;

                const trimedParagraph = paragraph.trimEnd();
                const totalWords = trimedParagraph.split(' ').length;

                if (limit > totalWords) {
                    text.push(trimedParagraph);
                } else {
                    const trimedText = `${trimedParagraph
                        .split(' ')
                        .slice(0, limit)
                        .join(' ')
                        .replace(/\.?$/, '')}...`;
                    text.push(trimedText);
                    break;
                }

                limit -= totalWords;
            }
            return text;
        };

        return paragraphReducer(paragraphs);
    }, [paragraphs, isShowingFull, wordsLimit]);

    const paragraphsRender = textToShow.map((paragraph, index) => (
        <ParagraphText key={index} text={paragraph} screenDevice={screenDevice} />
    ));

    return (
        <div {...props}>
            {title === undefined ? null : <TitleParagraph title={title} />}
            {subTitle1 === undefined ? null : <SubTitle1 subTitle={subTitle1} />}
            {subTitle2 === undefined ? null : <SubTitle2 subTitle={subTitle2} />}
            {paragraphsRender}
            <div className={screenDevice.isMobile ? 'storyteller-xsxm-paragraph-block' : 'st-paragraph-block'}>
                {showReadMore ? (
                    <ReadMoreButton
                        onClick={() => setShowingFull(!isShowingFull)}
                        isShowingFull={isShowingFull}
                    />
                ) : null}
            </div>
        </div>
    );
}

export default ParagraphBlock;
