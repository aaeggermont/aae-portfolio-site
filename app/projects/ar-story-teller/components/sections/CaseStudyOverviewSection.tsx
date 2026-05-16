'use client';
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import './CaseStudyOverviewSection.scss';
import ParagraphBlock from '../ParagraphBlock';
import ParagraphImg from '../ParagraphImg';
import ArAsNarrative from '../ArAsNarrative';
import ContextualNotifications from '../ContextNotifications';
import {
    MagicExperiencesSection,
    type MagicExperiences,
} from './MagicExperiencesSection';
import ProjectImage from '@/lib/media/ProjectImage';
import { StaticImageData } from 'next/image';
import styles from '../../ArStoryTeller.module.scss';
import { SectionSubTitle} from '../SectionSubTitle';
import { LAYOUT_DIMENSIONS } from '../../layoutConfig';

// ─── Types ────────────────────────────────────────────────────────────────────

interface CaseStudyOverview {
    title: string;
    paragraphs: string[];
}

interface ARAsNarrativeTool {
    title: string;
    paragraphs: string[];
    imageSrc: string;
    alt: string;
}

interface NotificationsAttrac {
    title: string;
    paragraphs: string[];
    images: string[];
    alt: string;
}

interface CaseStudyData {
    overview: CaseStudyOverview;
    overviewImages: StaticImageData[];
    overviewImagesAlt: string;
    ARAsNarrativeTool: ARAsNarrativeTool;
    notificationsAttrac: NotificationsAttrac;
    magicExperiences: MagicExperiences;
}


interface CaseStudyOverviewSectionProps {
    data: {
        caseStudy: CaseStudyData;
    };
}

// ─── Constants ────────────────────────────────────────────────────────────────

/** Firestore Storage object path for the case study banner. */
const CASE_STUDY_BANNER_OBJECT_PATH =
    'projects/project_4/TowerOfTerrorCaseStudyBanner.png';
const CASE_STUDY_BANNER_ALT = 'Tower of Terror case study banner';

/* Intrinsic ratio for the banner — used by `next/image` to reserve space and avoid layout
   shift. Update if the actual asset's aspect differs significantly. */
const CASE_STUDY_BANNER_INTRINSIC_WIDTH = 1920;
const CASE_STUDY_BANNER_INTRINSIC_HEIGHT = 720;
const CASE_STUDY_BANNER_SIZES = `(max-width: ${LAYOUT_DIMENSIONS.desktop.maxWidth}) 100vw, ${LAYOUT_DIMENSIONS.desktop.maxWidth}`;

/**
 * Default vertical spacing between direct children of `CaseStudyOverviewSection`
 * (banner → paragraph block → optional `ArAsNarrative`).
 *
 * Defaults are `0rem` to preserve the current layout: the banner already owns its own
 * `padding-top: 3rem`, so introducing a gap here without zeroing those would double-space
 * the area. Tune these to dial the internal rhythm of this section without touching the
 * page-level `SECTION_GAPS` in `ArStoryTellerPage.tsx`.
 *
 * Breakpoints follow `styles/variables.scss`:
 *   - `mobile`  ➝ 360 – 767px
 *   - `tablet`  ➝ 768 – 1023px
 *   - `desktop` ➝ 1024px +
 *
 * To override a single internal gap (e.g. tighter between paragraph block and
 * `ArAsNarrative`), set `--case-study-overview-gap-self` inline on that child.
 */
const CASE_STUDY_OVERVIEW_GAPS = {
    mobile: '3rem',
    tablet: '6rem',
    desktop: '8rem',
} as const;

const caseStudyOverviewGapStyle: CSSProperties = {
    ['--case-study-overview-gap-mobile' as string]: CASE_STUDY_OVERVIEW_GAPS.mobile,
    ['--case-study-overview-gap-tablet' as string]: CASE_STUDY_OVERVIEW_GAPS.tablet,
    ['--case-study-overview-gap-desktop' as string]: CASE_STUDY_OVERVIEW_GAPS.desktop,
} as CSSProperties;

function CaseStudyBannerTitle({ title }: { title: string }) {
    return <h2 className="case-study-banner__title">{title}</h2>;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function CaseStudyOverviewSection({ data }: CaseStudyOverviewSectionProps) {
    const { caseStudy } = data;
    console.log('--------------------------------');
    console.log(caseStudy, 'caseStudy');
    console.log('--------------------------------');
    const { overview, overviewImages, overviewImagesAlt, ARAsNarrativeTool, notificationsAttrac } = caseStudy;
    console.log('--------------------------------');
    console.log(overview, 'overview');
    console.log('--------------------------------');

    /* Title overlay fades in only once the banner image's `load` event fires, so the title
       never appears over a still-loading background. We watch the underlying `<img>` rendered
       by `ProjectImage` rather than extending the shared component's prop surface. */
    const bannerRef = useRef<HTMLDivElement>(null);
    const [imageLoaded, setImageLoaded] = useState(false);

    useEffect(() => {
        const container = bannerRef.current;
        if (!container) return;
        const img = container.querySelector('img');
        if (!img) return;

        /* Cached images are already `.complete` by the time the effect runs and would never
           emit a `load` event, so flip the flag immediately for that case. */
        if (img.complete && img.naturalWidth > 0) {
            setImageLoaded(true);
            return;
        }

        const handleLoad = () => setImageLoaded(true);
        img.addEventListener('load', handleLoad);
        return () => img.removeEventListener('load', handleLoad);
    }, []);

    const overlayClassName = [
        'case-study-banner__title-overlay',
        imageLoaded && 'case-study-banner__title-overlay--loaded',
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <section
            className={`${styles['project-container']} case-study-overview`}
            style={caseStudyOverviewGapStyle}
        >
            <div
                ref={bannerRef}
                className="case-study-banner"
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-anchor-placement="top-center"
            >
                <ProjectImage
                    objectPath={CASE_STUDY_BANNER_OBJECT_PATH}
                    alt={CASE_STUDY_BANNER_ALT}
                    width={CASE_STUDY_BANNER_INTRINSIC_WIDTH}
                    height={CASE_STUDY_BANNER_INTRINSIC_HEIGHT}
                    className="case-study-banner__image"
                    sizes={CASE_STUDY_BANNER_SIZES}
                    borderRadius="30px"
                />
                <div 
                    className={overlayClassName}
                    data-aos="fade-down"
                    data-aos-duration="3000"
                    data-aos-anchor-placement="top-center"
                    data-aos-delay="10000"
                    >
                    <CaseStudyBannerTitle 
                      
                    title={overview.title} />
                </div>
            </div>

            <ParagraphBlock
                paragraphs={overview.paragraphs}
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-anchor-placement="top-center"
            />

            {ARAsNarrativeTool ? (
                <div>
                    <SectionSubTitle
                        title={ARAsNarrativeTool.title}
                        paddingTop="2rem"
                        paddingBottom="2rem"
                    />
                    <ArAsNarrative
                        title={ARAsNarrativeTool.title}
                        paragraphs={ARAsNarrativeTool.paragraphs}
                        imageSrc={ARAsNarrativeTool.imageSrc}
                        alt={ARAsNarrativeTool.alt}
                    />
                </div>
            ) : null}

            <MagicExperiencesSection data={{ caseStudy }} />

            {notificationsAttrac ? (
                <ContextualNotifications
                    title={notificationsAttrac.title}
                    paragraphs={notificationsAttrac.paragraphs}
                    images={notificationsAttrac.images}
                    alt={notificationsAttrac.alt}
                />
            ) : null}
        </section>
    );
}
