'use client';
import './MagicExperiencesSection.scss';
import { useCallback, useEffect, useRef, useState } from 'react';
import SectionTitle from '../SectionTitle';
import ARMobileScreen from '../ARMobileScreen';
import styles from '../../ArStoryTeller.module.scss';
import { useResponsive } from '@/lib/responsive/ResponsiveQueryProvider';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

// ─── Types ────────────────────────────────────────────────────────────────────

interface MagicExperience {
    title: string;
    alt: string;
    description: string;
    images: string[];
}

interface MagicExperiences {
    title: string;
    paragraphs: string[];
    experiences: MagicExperience[];
}

interface MagicExperiencesSectionProps {
    data: {
        caseStudy: {
            magicExperiences: MagicExperiences;
        };
    };
}

// ─── Constants ────────────────────────────────────────────────────────────────

/** Orden de las experiencias tal como aparecen en los views originales */
const EXPERIENCE_ORDER = [3, 0, 1, 2] as const;

/** Sub-pixel rounding can leave the "next" button enabled at the very end of a scroll
 *  range; use a small epsilon when comparing scroll positions. */
const SCROLL_EDGE_EPSILON = 2;

// ─── Component ────────────────────────────────────────────────────────────────

export function MagicExperiencesSection({ data }: MagicExperiencesSectionProps) {
    const { magicExperiences } = data.caseStudy;
    const { isMobile } = useResponsive();

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
        <section className={styles['project-container']}>

            <SectionTitle
                title={magicExperiences.title}
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-anchor-placement="top-center"
            />

            <div
                className="magic-experiences__row"
                ref={rowRef}
                /* `aria-roledescription` tells assistive tech "this is a carousel"; the
                   role itself stays as a region so users can still tab the inner buttons. */
                role={isMobile ? 'region' : undefined}
                aria-roledescription={isMobile ? 'carousel' : undefined}
                aria-label={isMobile ? magicExperiences.title : undefined}
            >
                {EXPERIENCE_ORDER.map((index) => {
                    const experience = magicExperiences.experiences[index];
                    return (
                        <ARMobileScreen
                            key={index}
                            alt={experience.alt ?? ''}
                            imagesSrc={experience.images}
                            title={experience.title}
                            description={experience.description}
                            data-aos="fade-up"
                            data-aos-duration="1000"
                            data-aos-anchor-placement="top-center"
                        />
                    );
                })}
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
        </section>
    );
}
