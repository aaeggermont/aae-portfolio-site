'use client';

import { Box, Typography } from '@mui/material';

import { breakpointMediaQuery } from '@/lib/responsive/breakpoints';

import {
    AR_STORY_TELLER_BODY_FONT,
    AR_STORY_TELLER_TEXT_COLOR,
    AR_STORY_TELLER_TITLE_FONT,
    bodyTypeSx,
} from '../../typography';
import styles from './MomentsChapter.module.scss';

type MomentIntroProps = {
    title: string;
    description: string;
    align?: 'left' | 'center';
};

/**
 * Moment title cards sit a step below the Solution opener (28/34/40).
 */
const MOMENT_TITLE_SX = {
    fontFamily: AR_STORY_TELLER_TITLE_FONT,
    fontWeight: 700,
    lineHeight: 1.15,
    color: AR_STORY_TELLER_TEXT_COLOR,
    fontSize: '26px',
    [breakpointMediaQuery.tabletUp]: {
        fontSize: '31px',
    },
    [breakpointMediaQuery.desktopUp]: {
        fontSize: '36px',
    },
} as const;

export function TitleWords({ title }: { title: string }) {
    const words = title.trim().split(/\s+/).filter(Boolean);

    return (
        <>
            {words.map((word, index) => (
                <span key={`${word}-${index}`} className={styles.titleWord}>
                    <span data-moment-word className={styles.titleWordInner}>
                        {word}
                    </span>
                    {index < words.length - 1 ? '\u00A0' : null}
                </span>
            ))}
        </>
    );
}

export function MomentIntro({
    title,
    description,
    align = 'center',
}: MomentIntroProps) {
    const titleSx = {
        ...MOMENT_TITLE_SX,
        textAlign: align,
        m: 0,
    };

    const descriptionSx = bodyTypeSx('bodyText', {
        textAlign: align,
        m: 0,
        maxWidth: '32em',
        fontFamily: AR_STORY_TELLER_BODY_FONT,
        fontSize: '19px',
        [breakpointMediaQuery.tabletUp]: {
            fontSize: '22px',
        },
        [breakpointMediaQuery.desktopUp]: {
            fontSize: '23px',
        },
    });

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: align === 'center' ? 'center' : 'flex-start',
                gap: 1.5,
            }}
        >
            <Typography component="h3" sx={titleSx} aria-label={title}>
                <TitleWords title={title} />
            </Typography>
            <Typography component="p" sx={descriptionSx} data-moment-desc>
                {description}
            </Typography>
        </Box>
    );
}
