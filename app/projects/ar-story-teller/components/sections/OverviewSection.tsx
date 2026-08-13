import React from 'react';
import { Box, Typography } from '@mui/material';
import OverviewParagraphBlock from '../OverviewParagraphBlock';
import ParagraphText from '../ParagraphText';
import styles from '../../ArStoryTeller.module.scss';
import { MainDemo } from '../main-demo/MainDemo';
import { overviewNarrativeBlockSx } from '../../overviewNarrativeLayout';
import { titleTypeSx } from '../../typography';

import type { OverviewSectionData } from '@/app/projects/ar-story-teller/types/arStoryTellerContent';

const PROJECT_OVERVIEW_EYEBROW = 'Project Overview';
const PROJECT_OVERVIEW_TITLE =
    'From innovation initiative to graduate research';
const PROJECT_OVERVIEW_COPY =
    'This project originated as an innovation initiative at Disney to explore how emerging technologies could transform the theme park environment itself into an interactive attraction. Recognizing the opportunity to investigate the challenge through a human-centered design lens, I partnered with my faculty advisor in the University of Washington\'s Human Centered Design & Engineering program to develop the concept as a graduate research project. This collaboration allowed me to combine Disney\'s real-world guest experience challenges with academic research methods to explore how augmented reality could create meaningful storytelling experiences during attraction wait times.';

const SOLUTION_EYEBROW_DEFAULT = 'Solution';
const SOLUTION_TITLE_DEFAULT = 'The queue becomes the story';

/** Eyebrow above the Project Overview headline (matches case-study mock). */
const PROJECT_OVERVIEW_EYEBROW_SX = titleTypeSx('eyebrow', {
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
    color: '#1B3C90',
    textAlign: 'left',
    m: 0,
});

const PROJECT_OVERVIEW_TITLE_SX = titleTypeSx('sectionTitle', {
    textAlign: 'left',
    m: 0,
});

const SOLUTION_HEADING_GAP = 1.5;

// ─── Types ────────────────────────────────────────────────────────────────────

interface OverviewSectionProps {
    data: OverviewSectionData;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function OverviewSection({ data }: OverviewSectionProps) {
    const { designChallenge, theProblem, solution } = data;
    const solutionEyebrow =
        solution.eyebrow?.trim() || SOLUTION_EYEBROW_DEFAULT;
    const solutionTitle = solution.title?.trim() || SOLUTION_TITLE_DEFAULT;

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

            <Box className={styles['content-group']} sx={overviewNarrativeBlockSx}>
                <Box
                    data-aos="fade-up"
                    data-aos-duration="1000"
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        gap: SOLUTION_HEADING_GAP,
                        mb: { xs: 3, md: 4, lg: 5 },
                    }}
                >
                    <Typography component="p" sx={PROJECT_OVERVIEW_EYEBROW_SX}>
                        {solutionEyebrow}
                    </Typography>
                    <Typography component="h2" sx={PROJECT_OVERVIEW_TITLE_SX}>
                        {solutionTitle}
                    </Typography>
                </Box>
                <MainDemo />
            </Box>

            <Box
                className={styles['content-group']}
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-once="true"
                sx={overviewNarrativeBlockSx}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        gap: 1.5,
                    }}
                >
                    <Typography component="p" sx={PROJECT_OVERVIEW_EYEBROW_SX}>
                        {PROJECT_OVERVIEW_EYEBROW}
                    </Typography>
                    <Typography component="h2" sx={PROJECT_OVERVIEW_TITLE_SX}>
                        {PROJECT_OVERVIEW_TITLE}
                    </Typography>
                </Box>
                <ParagraphText text={PROJECT_OVERVIEW_COPY} />
            </Box>
        </section>
    );
}
