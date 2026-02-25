import React from 'react';
import OverviewParagraphBlock from '../OverviewParagraphBlock';
import ParagraphImg from '../ParagraphImg';
import { StaticImageData } from 'next/image';
import styles from '../../ArStoryTeller.module.scss';

// ─── Types ────────────────────────────────────────────────────────────────────

interface OverviewBlock {
    title: string;
    paragraphs: string[];
}

interface SolutionData extends OverviewBlock {
    images?: StaticImageData[];
    alt?: string;
}

interface OverviewSectionProps {
    data: {
        designChallenge: OverviewBlock;
        theProblem: OverviewBlock;
        solution: SolutionData;
    };
}

// ─── Component ────────────────────────────────────────────────────────────────

export function OverviewSection({ data }: OverviewSectionProps) {
    const { designChallenge, theProblem, solution } = data;

    return (
        <section className={styles['project-container']}>
            <OverviewParagraphBlock
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-anchor-placement="top-center"
                title1={designChallenge.title}
                paragraph1={designChallenge.paragraphs}
                title2={theProblem.title}
                paragraph2={theProblem.paragraphs}
                title3={solution.title}
                paragraph3={solution.paragraphs}
            />

            {solution.images && (
                <ParagraphImg
                    imagesSrc={solution.images}
                    alt={solution.alt}
                    data-aos="fade-up"
                    data-aos-duration="1000"
                    data-aos-anchor-placement="top-center"
                />
            )}
        </section>
    );
}
