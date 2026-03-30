'use client';
import ParagraphImg from '../ParagraphImg';
import BlockTitle from '../BlockTitle';
import BulletPoints from '../BulletPoints';
import { StaticImageData } from 'next/image';
import styles from '../../ArStoryTeller.module.scss';

// ─── Types ────────────────────────────────────────────────────────────────────

interface BulletPointItem {
    icon: StaticImageData;
    text: string;
}

interface NextStepsData {
    title: string;
    sectionSeparatorImages: StaticImageData[];
    bulletpoints: BulletPointItem[];
}

interface WireframeMethod {
    alt: string;
}

interface NextStepsSectionProps {
    data: {
        nextSteps: NextStepsData;
        caseStudy?: {
            designSystem?: {
                wireframes?: {
                    methods?: WireframeMethod[];
                };
            };
        };
    };
}

// ─── Component ────────────────────────────────────────────────────────────────

export function NextStepsSection({ data }: NextStepsSectionProps) {
    const { nextSteps } = data;

    return (
        <section className={styles['project-container']}>
            <ParagraphImg
                alt='Next Steps'
                imagesSrc={nextSteps.sectionSeparatorImages}
                width="20%"
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-anchor-placement="top-center"
            />

            <BlockTitle
                title={nextSteps.title}
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-anchor-placement="top-center"
            />

            <BulletPoints
                bulletPoints={nextSteps.bulletpoints}
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-anchor-placement="top-center"
            />
        </section>
    );
}
