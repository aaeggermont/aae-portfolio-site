'use client';

import { Box, Typography } from '@mui/material';

import { titleTypeSx } from '../../typography';
import { TitleWords } from './MomentIntro';

type SolutionOpenerProps = {
    eyebrow: string;
    title: string;
};

const eyebrowSx = titleTypeSx('eyebrow', {
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
    color: '#1B3C90',
    textAlign: 'center',
    m: 0,
});

const titleSx = titleTypeSx('sectionTitle', {
    textAlign: 'center',
    m: 0,
    maxWidth: '16em',
});

/** Opening title card for the Solution journey — eyebrow, then storybook headline. */
export function SolutionOpener({ eyebrow, title }: SolutionOpenerProps) {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 1.5,
            }}
        >
            <Typography component="p" sx={eyebrowSx} data-moment-eyebrow>
                {eyebrow}
            </Typography>
            <Typography
                component="h2"
                sx={titleSx}
                aria-label={title}
            >
                <TitleWords title={title} />
            </Typography>
        </Box>
    );
}
