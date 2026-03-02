'use client';
import ParagraphBlock from '../ParagraphBlock';
import ParagraphImg from '../ParagraphImg';
import { StaticImageData } from 'next/image';
import styles from '../../ArStoryTeller.module.scss';

// ─── Types ────────────────────────────────────────────────────────────────────

interface ImageGroup {
    images: StaticImageData[];
    alt: string;
}

interface LearningAboutAttrac {
    title: string;
    paragraphs: string[];
}

interface NotificationsAttrac {
    title?: string;
    images?: StaticImageData[];
    description?: string;
    paragraphs?: string[];
}

interface NotificationsSectionProps {
    data: {
        caseStudy: {
            learningAboutAttrac: LearningAboutAttrac;
            notificationsAttrac: NotificationsAttrac;
        };
    };
}

// ─── Component ────────────────────────────────────────────────────────────────

export function NotificationsSection({ data }: NotificationsSectionProps) {
    const { caseStudy } = data;
    const { learningAboutAttrac, notificationsAttrac } = caseStudy;

    const notifImages =
        notificationsAttrac.images ??
        [];

    return (
        <section className={styles['project-container']}>
            <ParagraphBlock
                title={learningAboutAttrac.title}
                paragraphs={learningAboutAttrac.paragraphs}
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-anchor-placement="top-center"
            />

            {/* {notificationsAttrac.title && (
                <ParagraphBlock
                    title={notificationsAttrac.title}
                    paragraphs={notificationsAttrac.paragraphs ?? []}
                    data-aos="fade-up"
                    data-aos-duration="1000"
                    data-aos-anchor-placement="top-center"
                />
            )} */}

            <ParagraphImg
                imagesSrc={notifImages}
                alt="Notifications"
                description={notificationsAttrac.description}
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-anchor-placement="top-center"
            />
        </section>
    );
}
