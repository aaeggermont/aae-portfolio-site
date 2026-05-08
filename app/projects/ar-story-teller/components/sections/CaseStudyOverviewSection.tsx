'use client';
import './CaseStudyOverviewSection.scss';
import BlockTitle from '../BlockTitle';
import ParagraphBlock from '../ParagraphBlock';
import ParagraphImg from '../ParagraphImg';
import ProjectImage from '@/lib/media/ProjectImage';
import { StaticImageData } from 'next/image';
import styles from '../../ArStoryTeller.module.scss';

// ─── Types ────────────────────────────────────────────────────────────────────

interface CaseStudyOverview {
    title: string;
    paragraphs: string[];
}

interface CaseStudyData {
    overview: CaseStudyOverview;
    overviewImages: StaticImageData[];
    overviewImagesAlt: string;
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

// ─── Component ────────────────────────────────────────────────────────────────

export function CaseStudyOverviewSection({ data }: CaseStudyOverviewSectionProps) {
    const { caseStudy } = data;
    const { overview, overviewImages, overviewImagesAlt } = caseStudy;

    return (
        <section className={styles['project-container']}>
            <div
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
                    sizes="(max-width: 1920px) 100vw, 1920px"
                />
            </div>

            <BlockTitle
                title={overview.title}
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-anchor-placement="top-center"
            />

            <ParagraphBlock
                paragraphs={[overview.paragraphs[0]]}
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-anchor-placement="top-center"
            />

            <ParagraphImg
                imagesSrc={overviewImages}
                alt={overviewImagesAlt}
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-anchor-placement="top-center"
            />

            <ParagraphBlock
                paragraphs={[overview.paragraphs[1]]}
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-anchor-placement="top-center"
            />
        </section>
    );
}
