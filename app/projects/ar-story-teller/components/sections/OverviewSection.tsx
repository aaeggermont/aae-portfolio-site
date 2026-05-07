import React from 'react';
import OverviewParagraphBlock from '../OverviewParagraphBlock';
import ParagraphImg from '../ParagraphImg';
import { StaticImageData } from 'next/image';
import styles from '../../ArStoryTeller.module.scss';
import { SolutionDemo } from '../demo/SolutionDemo';
import { ProjectOverview } from '../ProjectOverview';

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

            {/* SSR-stable wrapper so AOS can register at `init()` even though
                `OverviewParagraphBlock` only renders content after `useResponsive` mounts.
                Using default anchor-placement (`top-bottom`): triggers when wrapper top
                enters viewport bottom — robust when the element sits just below the hero. */}
            <div
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-once="true"
            >
                <OverviewParagraphBlock
                    title1={designChallenge.title}
                    paragraph1={designChallenge.paragraphs}
                    title2={theProblem.title}
                    paragraph2={theProblem.paragraphs}
                />
            </div>

            <SolutionDemo
                title={solution.title}
                paragraphs={solution.paragraphs}
            />

        </section>
    );
}
