'use client';

import './MagicExperiencesSection.scss';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Box, Typography } from '@mui/material';
import ARMobileScreen from '../ARMobileScreen';
import MagicExperiencesViewer from '../MagicExperiencesViewer';
import styles from '../../ArStoryTeller.module.scss';
import { useResponsive } from '@/lib/responsive/ResponsiveQueryProvider';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import type {
    MagicExperience,
    MagicExperiences,
} from '@/app/projects/ar-story-teller/types/arStoryTellerContent';
import {
    DEFAULT_MAGIC_EXPERIENCES,
    DEFAULT_MAGIC_EXPERIENCES_COPY,
    type MagicExperienceDefault,
} from '../../lib/magicExperiencesDefaults';
import { bodyTypeSx, titleTypeSx } from '../../typography';

// ─── Types ────────────────────────────────────────────────────────────────────

interface MagicExperiencesSectionProps {
    data: {
        caseStudy: {
            magicExperiences: MagicExperiences;
        };
    };
}

type ResolvedExperience = MagicExperienceDefault & {
    id: string;
};

// ─── Constants ────────────────────────────────────────────────────────────────

const EYEBROW_COLOR = '#1B3C90';
const TITLE_COLOR = '#111A27';
const BODY_COLOR = '#3F5266';

/** Sub-pixel rounding can leave the "next" button enabled at the very end of a scroll
 *  range; use a small epsilon when comparing scroll positions. */
const SCROLL_EDGE_EPSILON = 2;

const NEW_ASSET_MARKERS = [
    'ARNearbyAttractions',
    'ARDicoveringStoryDetails',
    'ARTakingSelfie',
    'ARCollectingArtifacts',
] as const;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function cmsImagePath(experience: MagicExperience | undefined): string | undefined {
    const path = experience?.images?.[0]?.trim();
    return path || undefined;
}

function isUpdatedAssetPath(path: string | undefined): boolean {
    if (!path) return false;
    return NEW_ASSET_MARKERS.some((marker) => path.includes(marker));
}

function resolveExperiences(cmsExperiences: MagicExperience[]): ResolvedExperience[] {
    return DEFAULT_MAGIC_EXPERIENCES.map((defaults, index) => {
        const cms = cmsExperiences.find((item) => item.title === defaults.title);
        const cmsPath = cmsImagePath(cms);
        const objectPath = isUpdatedAssetPath(cmsPath) ? cmsPath! : defaults.objectPath;
        const shortDescription =
            cms?.description?.trim() &&
            (Boolean(cms.longDescription?.trim()) || isUpdatedAssetPath(cmsPath))
                ? cms.description.trim()
                : defaults.description;
        const longDescription =
            cms?.longDescription?.trim() || defaults.longDescription;

        return {
            ...defaults,
            alt: cms?.alt?.trim() || defaults.alt,
            description: shortDescription,
            longDescription,
            objectPath,
            id: `ar-magic-experience-${index}`,
        };
    });
}

// ─── Component ────────────────────────────────────────────────────────────────

export function MagicExperiencesSection({ data }: MagicExperiencesSectionProps) {
    const { magicExperiences } = data.caseStudy;
    const { isMobile } = useResponsive();
    const headingId = 'magic-experiences-heading';

    const eyebrow =
        magicExperiences.eyebrow?.trim() || DEFAULT_MAGIC_EXPERIENCES_COPY.eyebrow;
    const title =
        magicExperiences.title?.trim() || DEFAULT_MAGIC_EXPERIENCES_COPY.title;
    const description =
        magicExperiences.paragraphs?.[0]?.trim() ||
        DEFAULT_MAGIC_EXPERIENCES_COPY.description;
    const experiences = resolveExperiences(magicExperiences.experiences ?? []);

    const [viewerOpen, setViewerOpen] = useState(false);
    const [viewerIndex, setViewerIndex] = useState(0);

    const openViewer = useCallback((index: number) => {
        setViewerIndex(index);
        setViewerOpen(true);
    }, []);

    const closeViewer = useCallback(() => {
        setViewerOpen(false);
    }, []);

    /* Carousel-mode plumbing — only meaningful on the mobile breakpoint where the row
       becomes a horizontal scroll-snap container. On tablet/desktop the ref is still
       attached but the listeners are inert (see `useEffect` below). */
    const rowRef = useRef<HTMLDivElement>(null);
    const [canScrollPrev, setCanScrollPrev] = useState(false);
    const [canScrollNext, setCanScrollNext] = useState(false);

    const updateNavState = useCallback(() => {
        const el = rowRef.current;
        if (!el) return;
        const { scrollLeft, scrollWidth, clientWidth } = el;
        setCanScrollPrev(scrollLeft > SCROLL_EDGE_EPSILON);
        setCanScrollNext(scrollLeft + clientWidth < scrollWidth - SCROLL_EDGE_EPSILON);
    }, []);

    useEffect(() => {
        if (!isMobile) return;
        const el = rowRef.current;
        if (!el) return;
        updateNavState();
        el.addEventListener('scroll', updateNavState, { passive: true });
        window.addEventListener('resize', updateNavState);
        return () => {
            el.removeEventListener('scroll', updateNavState);
            window.removeEventListener('resize', updateNavState);
        };
    }, [isMobile, updateNavState]);

    /* Scrolls by one "slot" — defined as the width of the first card plus the row's gap.
       Anchoring the step to the actual rendered card width keeps the prev/next buttons in
       sync with `scroll-snap-align` even if the slot width is expressed in `vw` units. */
    const scrollByOneSlot = useCallback((direction: 1 | -1) => {
        const el = rowRef.current;
        if (!el) return;
        const firstCard = el.querySelector<HTMLElement>('.ar-mobile-screen-container');
        const cardWidth = firstCard?.offsetWidth ?? el.clientWidth;
        const gapValue = getComputedStyle(el).columnGap || getComputedStyle(el).gap;
        const gap = parseFloat(gapValue) || 0;
        el.scrollBy({ left: direction * (cardWidth + gap), behavior: 'smooth' });
    }, []);

    return (
        <section
            className={`${styles['project-container']} ${styles['panel-section-stack']} magic-experiences`}
            aria-labelledby={headingId}
        >
            <Box
                className="magic-experiences__header"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    gap: 1.5,
                    maxWidth: { xs: '100%', md: '52rem' },
                }}
            >
                <Typography
                    component="p"
                    sx={titleTypeSx('eyebrow', {
                        m: 0,
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                        color: EYEBROW_COLOR,
                        textAlign: 'left',
                    })}
                >
                    {eyebrow}
                </Typography>
                <Typography
                    id={headingId}
                    component="h2"
                    sx={titleTypeSx('sectionTitle', {
                        m: 0,
                        color: TITLE_COLOR,
                        textAlign: 'left',
                    })}
                >
                    {title}
                </Typography>
                <Typography
                    component="p"
                    sx={bodyTypeSx('bodyText', {
                        m: 0,
                        color: BODY_COLOR,
                        textAlign: 'left',
                    })}
                >
                    {description}
                </Typography>
            </Box>

            <div
                className="magic-experiences__row"
                ref={rowRef}
                /* `aria-roledescription` tells assistive tech "this is a carousel"; the
                   role itself stays as a region so users can still tab the inner buttons. */
                role={isMobile ? 'region' : undefined}
                aria-roledescription={isMobile ? 'carousel' : undefined}
                aria-label={isMobile ? title : undefined}
            >
                {experiences.map((experience, index) => (
                    <ARMobileScreen
                        key={experience.id}
                        alt={experience.alt}
                        objectPath={experience.objectPath}
                        title={experience.title}
                        description={experience.description}
                        onExpand={() => openViewer(index)}
                    />
                ))}
            </div>

            {isMobile && (
                <div className="magic-experiences__nav" aria-label="Carousel navigation">
                    <button
                        type="button"
                        className="magic-experiences__nav-button"
                        onClick={() => scrollByOneSlot(-1)}
                        disabled={!canScrollPrev}
                        aria-label="Previous experience"
                    >
                        <KeyboardArrowLeftIcon fontSize="small" />
                    </button>
                    <button
                        type="button"
                        className="magic-experiences__nav-button"
                        onClick={() => scrollByOneSlot(1)}
                        disabled={!canScrollNext}
                        aria-label="Next experience"
                    >
                        <KeyboardArrowRightIcon fontSize="small" />
                    </button>
                </div>
            )}

            <MagicExperiencesViewer
                open={viewerOpen}
                onClose={closeViewer}
                slides={experiences}
                activeIndex={viewerIndex}
                onActiveIndexChange={setViewerIndex}
            />
        </section>
    );
}
