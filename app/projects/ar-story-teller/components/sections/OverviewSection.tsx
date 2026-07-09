import React from 'react';
import { Box } from '@mui/material';
import OverviewParagraphBlock from '../OverviewParagraphBlock';
import SectionTitle from '../SectionTitle';
import ParagraphText from '../ParagraphText';
import styles from '../../ArStoryTeller.module.scss';
import { MainDemo } from '../main-demo/MainDemo';
import { overviewNarrativeBlockSx } from '../../overviewNarrativeLayout';

import type { OverviewSectionData } from '@/app/projects/ar-story-teller/types/arStoryTellerContent';

const PROJECT_OVERVIEW_COPY =
    'This project originated as an innovation initiative at Disney to explore how emerging technologies could transform the theme park environment itself into an interactive attraction. Recognizing the opportunity to investigate the challenge through a human-centered design lens, I partnered with my faculty advisor in the University of Washington\'s Human Centered Design & Engineering program to develop the concept as a graduate research project. This collaboration allowed me to combine Disney\'s real-world guest experience challenges with academic research methods to explore how augmented reality could create meaningful storytelling experiences during attraction wait times.';

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

            <Box
                className={styles['content-group']}
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-once="true"
                sx={overviewNarrativeBlockSx}
            >
                <SectionTitle title="Project Overview" />
                <ParagraphText text={PROJECT_OVERVIEW_COPY} />
            </Box>

            <Box className={styles['content-group']} sx={overviewNarrativeBlockSx}>
                {solution.title ? (
                    <SectionTitle
                        title={solution.title}
                        data-aos="fade-up"
                        data-aos-duration="1000"
                    />
                ) : null}
                <MainDemo />
            </Box>
        </section>
    );
}
