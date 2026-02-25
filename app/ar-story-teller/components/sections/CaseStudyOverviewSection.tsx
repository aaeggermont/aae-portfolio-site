'use client';
import SectionImg from '../SectionImg';
import BlockTitle from '../BlockTitle';
import ParagraphBlock from '../ParagraphBlock';
import ParagraphImg from '../ParagraphImg';
import { StaticImageData } from 'next/image';
import styles from '../../ArStoryTeller.module.scss';

// ─── Types ────────────────────────────────────────────────────────────────────

interface CaseStudyOverview {
    title: string;
    paragraphs: string[];
}

interface CaseStudyData {
    caseStudySectionImages: StaticImageData[];
    overview: CaseStudyOverview;
    overviewImages: StaticImageData[];
    overviewImagesAlt: string;
}

interface CaseStudyOverviewSectionProps {
    data: {
        caseStudy: CaseStudyData;
    };
}

// ─── Component ────────────────────────────────────────────────────────────────

export function CaseStudyOverviewSection({ data }: CaseStudyOverviewSectionProps) {
    const { caseStudy } = data;
    const { overview, overviewImages, overviewImagesAlt, caseStudySectionImages } = caseStudy;

    return (
        <section className={styles['project-container']}>
            <SectionImg
                imagesSrc={caseStudySectionImages}
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-anchor-placement="top-center"
            />

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
