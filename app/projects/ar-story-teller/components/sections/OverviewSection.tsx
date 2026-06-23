import React from 'react';
import OverviewParagraphBlock from '../OverviewParagraphBlock';
import SectionTitle from '../SectionTitle';
import styles from '../../ArStoryTeller.module.scss';
import { MainDemo } from '../main-demo/MainDemo';

import type { OverviewSectionData } from '@/app/projects/ar-story-teller/types/arStoryTellerContent';

// ─── Types ────────────────────────────────────────────────────────────────────

interface OverviewSectionProps {
    data: OverviewSectionData;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function OverviewSection({ data }: OverviewSectionProps) {
    const { designChallenge, theProblem, solution } = data;

    return (
        <section
            className={`${styles['project-container']} ${styles['panel-section-stack']} overviewSection`}
        >
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

            <div className={styles['content-group']}>
                {solution.title ? (
                    <SectionTitle
                        title={solution.title}
                        data-aos="fade-up"
                        data-aos-duration="1000"
                    />
                ) : null}
                <MainDemo />
            </div>
        </section>
    );
}
