'use client';
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import './CaseStudyOverviewSection.scss';
import ParagraphBlock from '../ParagraphBlock';
import ArAsNarrative from '../ArAsNarrative';
import ContextualNotifications from '../ContextNotifications';
import { MagicExperiencesSection } from './MagicExperiencesSection';
import ProjectImage from '@/lib/media/ProjectImage';
import { CASE_STUDY_BANNER_OBJECT_PATH } from '@/app/projects/ar-story-teller/lib/criticalAssets';
import type { CaseStudyOverviewSectionData } from '@/app/projects/ar-story-teller/types/arStoryTellerContent';
import styles from '../../ArStoryTeller.module.scss';
import { SectionSubTitle } from '../SectionSubTitle';
import {
    LAYOUT_DIMENSIONS,
    PANEL_CONTENT_MAX_WIDTH_PX,
} from '../../layoutConfig';

// ─── Types ────────────────────────────────────────────────────────────────────

interface CaseStudyOverviewSectionProps {
    data: CaseStudyOverviewSectionData;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const CASE_STUDY_BANNER_ALT = 'Tower of Terror case study banner';

const CASE_STUDY_BANNER_INTRINSIC_WIDTH = 1920;
const CASE_STUDY_BANNER_INTRINSIC_HEIGHT = 720;
const CASE_STUDY_BANNER_MAX_WIDTH_PX = PANEL_CONTENT_MAX_WIDTH_PX;
const CASE_STUDY_BANNER_SIZES = `(max-width: ${LAYOUT_DIMENSIONS.desktop.maxWidth}) 100vw, ${CASE_STUDY_BANNER_MAX_WIDTH_PX}px`;

const caseStudyBannerStyle: CSSProperties = {
    ['--case-study-banner-max-width' as string]: `${CASE_STUDY_BANNER_MAX_WIDTH_PX}px`,
};

function CaseStudyBannerTitle({ title }: { title: string }) {
    return <h2 className="case-study-banner__title">{title}</h2>;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function CaseStudyOverviewSection({ data }: CaseStudyOverviewSectionProps) {
    const { caseStudy } = data;
    const { overview, ARAsNarrativeTool, notificationsAttrac } = caseStudy;

    const bannerRef = useRef<HTMLDivElement>(null);
    const [imageLoaded, setImageLoaded] = useState(false);

    useEffect(() => {
        const container = bannerRef.current;
        if (!container) return;
        const img = container.querySelector('img');
        if (!img) return;

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
            className={`${styles['project-container']} ${styles['panel-section-stack']} case-study-overview`}
            style={caseStudyBannerStyle}
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
                    <CaseStudyBannerTitle title={overview.title} />
                </div>
            </div>

            <ParagraphBlock
                paragraphs={overview.paragraphs}
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-anchor-placement="top-center"
            />

            {ARAsNarrativeTool ? (
                <div className={styles['panel-subsection']}>
                    <div className={styles['content-group']}>
                        <SectionSubTitle title={ARAsNarrativeTool.title} />
                    </div>
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
                <div className={styles['panel-subsection']}>
                    <div className={styles['content-group']}>
                        <SectionSubTitle title={notificationsAttrac.title} />
                    </div>
                    <ContextualNotifications
                        title={notificationsAttrac.title}
                        paragraphs={notificationsAttrac.paragraphs}
                        images={notificationsAttrac.images}
                        alt={notificationsAttrac.alt}
                    />
                </div>
            ) : null}
        </section>
    );
}
