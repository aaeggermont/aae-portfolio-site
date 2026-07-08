import React from 'react';
import { Box } from '@mui/material';
import OverviewParagraphBlock from '../OverviewParagraphBlock';
import SectionTitle from '../SectionTitle';
import ParagraphText from '../ParagraphText';
import styles from '../../ArStoryTeller.module.scss';
import { MainDemo } from '../main-demo/MainDemo';
import { OVERVIEW_PROJECT_OVERVIEW_MAX_WIDTH_PX } from '../../layoutConfig';
import { breakpointMediaQuery } from '@/lib/responsive/breakpoints';

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
                sx={{
                    width: '100%',
                    maxWidth: '100%',
                    mx: 'auto',
                    [breakpointMediaQuery.tabletUp]: {
                        maxWidth: `${OVERVIEW_PROJECT_OVERVIEW_MAX_WIDTH_PX.tablet}px`,
                    },
                    [breakpointMediaQuery.desktopUp]: {
                        maxWidth: `${OVERVIEW_PROJECT_OVERVIEW_MAX_WIDTH_PX.desktop}px`,
                    },
                }}
            >
                <SectionTitle title="Project Overview" />
                <ParagraphText text={PROJECT_OVERVIEW_COPY} />
            </Box>

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
