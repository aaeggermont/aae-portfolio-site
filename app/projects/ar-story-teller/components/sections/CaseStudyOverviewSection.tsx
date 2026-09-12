import './CaseStudyOverviewSection.scss';
import ParagraphBlock from '../ParagraphBlock';
import ArAsNarrative from '../ArAsNarrative';
import ContextualNotifications from '../ContextNotifications';
import { MagicExperiencesSection } from './MagicExperiencesSection';
import GameplayMechanics from './GameplayMechanics';
import { CaseStudyBanner } from './CaseStudyBanner';
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
            <CaseStudyBanner title={overview.title} />

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
