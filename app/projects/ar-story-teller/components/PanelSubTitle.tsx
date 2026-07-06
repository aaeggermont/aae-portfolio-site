'use client';

import Typography from '@mui/material/Typography';
import type { ComponentPropsWithoutRef } from 'react';
import { breakpointMediaQuery } from '@/lib/responsive/breakpoints';
import { titleTypeSx } from '../typography';

const panelSubTitleSx = titleTypeSx('panelHeading', {
    m: 0,
    textAlign: 'center',
    [breakpointMediaQuery.tabletUp]: {
        textAlign: 'left',
    },
});

interface PanelSubTitleProps extends ComponentPropsWithoutRef<typeof Typography> {
    title: string;
}

/** Nested subtitle under a `SectionSubTitle` (e.g. wireframe method titles). */
export function PanelSubTitle({ title, ...props }: PanelSubTitleProps) {
    return (
        <Typography component="h3" sx={panelSubTitleSx} {...props}>
            {title}
        </Typography>
    );
}

export default PanelSubTitle;
