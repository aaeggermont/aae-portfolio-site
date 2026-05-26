import Team from '../Team';
import styles from '../../ArStoryTeller.module.scss';

import type { TeamSectionData } from '@/app/projects/ar-story-teller/types/arStoryTellerContent';

// ─── Types ────────────────────────────────────────────────────────────────────

interface TeamSectionProps {
    data: TeamSectionData;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function TeamSection({ data }: TeamSectionProps) {
    const { team } = data;

    return (
        <section className={styles['project-container']}>
            <Team
                title={team.title}
                members={team.members}
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-anchor-placement="top-center"
            />
        </section>
    );
}
