import React from 'react';
import OverviewParagraphBlock from '../OverviewParagraphBlock';
import SectionTitle from '../SectionTitle';
import styles from '../../ArStoryTeller.module.scss';
import { MainDemo } from '../main-demo/MainDemo';
import './OverviewSection.scss';

import type { OverviewSectionData } from '@/app/projects/ar-story-teller/types/arStoryTellerContent';

// ─── Types ────────────────────────────────────────────────────────────────────

interface OverviewSectionProps {
    data: OverviewSectionData;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function OverviewSection({ data }: OverviewSectionProps) {
    const { designChallenge, theProblem, solution } = data;

    return (
        <section className={`${styles['project-container']} overviewSection`}>

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

            <div className="overviewSection__solution">
                {solution.title ? (
                    <SectionTitle
                        title={solution.title}
                        data-aos="fade-up"
                        data-aos-duration="1000"
                        paddingTop="1.5rem"
                        paddingBottom="2rem"
                    />
                ) : null}

                <MainDemo />
            </div>

        </section>
    );
}
