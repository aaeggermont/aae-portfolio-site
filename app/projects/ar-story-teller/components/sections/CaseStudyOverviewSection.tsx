import './CaseStudyOverviewSection.scss';
import ParagraphBlock from '../ParagraphBlock';
import ArAsNarrative from '../ArAsNarrative';
import ContextualNotifications from '../ContextNotifications';
import { MagicExperiencesSection } from './MagicExperiencesSection';
import GameplayMechanics from './GameplayMechanics';
import ProjectImage from '@/lib/media/ProjectImage';
import { CASE_STUDY_BANNER_OBJECT_PATH } from '@/app/projects/ar-story-teller/lib/criticalAssets';
import type { CaseStudyOverviewSectionData } from '@/app/projects/ar-story-teller/types/arStoryTellerContent';
import styles from '../../ArStoryTeller.module.scss';
import { SectionSubTitle } from '../SectionSubTitle';
import { Box, Typography } from '@mui/material';
import { titleTypeSx } from '../../typography';

// ─── Types ────────────────────────────────────────────────────────────────────

interface CaseStudyOverviewSectionProps {
    data: CaseStudyOverviewSectionData;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const CASE_STUDY_BANNER_ALT =
    'Hollywood Tower of Terror at night under a full moon';
const CASE_STUDY_BANNER_EYEBROW = 'Case Study';
const CASE_STUDY_BANNER_BADGE = '130 Min Standby';
const AR_AS_NARRATIVE_EYEBROW = 'Narrative in AR';

const sectionEyebrowSx = titleTypeSx('eyebrow', {
    m: 0,
    mb: 1.5,
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
    color: '#1B3C90',
    textAlign: 'left',
});

// ─── Component ────────────────────────────────────────────────────────────────

export function CaseStudyOverviewSection({ data }: CaseStudyOverviewSectionProps) {
    const { caseStudy } = data;
    const { overview, ARAsNarrativeTool, notificationsAttrac } = caseStudy;

    return (
        <section
            className={`${styles['panel-section-stack']} case-study-overview`}
        >
            <div className="case-study-banner">
                <ProjectImage
                    objectPath={CASE_STUDY_BANNER_OBJECT_PATH}
                    alt={CASE_STUDY_BANNER_ALT}
                    fill
                    sizes="100vw"
                    className="case-study-banner__image"
                    priority
                />
                <div className="case-study-banner__scrim" aria-hidden />
                <div
                    className="case-study-banner__rail case-study-banner__rail--left"
                    aria-hidden
                />
                <div
                    className="case-study-banner__rail case-study-banner__rail--right"
                    aria-hidden
                />
                <div className="case-study-banner__content">
                    <p className="case-study-banner__eyebrow">
                        {CASE_STUDY_BANNER_EYEBROW}
                    </p>
                    <h2 className="case-study-banner__title">{overview.title}</h2>
                    <span className="case-study-banner__badge">
                        {CASE_STUDY_BANNER_BADGE}
                    </span>
                </div>
            </div>

            <div
                className={`${styles['project-container']} ${styles['panel-section-stack']}`}
            >
                <ParagraphBlock paragraphs={overview.paragraphs} />

                {ARAsNarrativeTool ? (
                    <div className={styles['panel-subsection']}>
                        <Box>
                            <Typography component="p" sx={sectionEyebrowSx}>
                                {AR_AS_NARRATIVE_EYEBROW}
                            </Typography>
                            <SectionSubTitle title={ARAsNarrativeTool.title} />
                        </Box>
                        <ArAsNarrative
                            title={ARAsNarrativeTool.title}
                            paragraphs={ARAsNarrativeTool.paragraphs.map((paragraph) =>
                                paragraph.replaceAll('StoryScape AR', 'AR Magic Tours'),
                            )}
                            imageSrc={ARAsNarrativeTool.imageSrc}
                            alt={ARAsNarrativeTool.alt}
                        />
                    </div>
                ) : null}

                <GameplayMechanics />

                {notificationsAttrac ? (
                    <div className={styles['panel-subsection']}>
                        <ContextualNotifications
                            title={notificationsAttrac.title}
                            paragraphs={notificationsAttrac.paragraphs}
                            images={notificationsAttrac.images}
                            alt={notificationsAttrac.alt}
                        />
                    </div>
                ) : null}

                <MagicExperiencesSection data={{ caseStudy }} />
            </div>
        </section>
    );
}
