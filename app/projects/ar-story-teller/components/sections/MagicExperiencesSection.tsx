'use client';
import './MagicExperiencesSection.scss';
import SectionTitle from '../SectionTitle';
import MockupIllustration from '../MockupIllustration';
import { StaticImageData } from 'next/image';
import styles from '../../ArStoryTeller.module.scss';

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

// ─── Component ────────────────────────────────────────────────────────────────

export function MagicExperiencesSection({ data }: MagicExperiencesSectionProps) {
    const { magicExperiences } = data.caseStudy;

    return (
        <section className={styles['project-container']}>

            <SectionTitle
                title={magicExperiences.title}
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-anchor-placement="top-center"
            />

            <div className="magic-experiences__row">
                {EXPERIENCE_ORDER.map((index) => {
                    const experience = magicExperiences.experiences[index];
                    return (
                        <MockupIllustration
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
        </section>
    );
}
