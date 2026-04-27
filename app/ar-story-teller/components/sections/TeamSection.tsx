import Team from '../Team';
import styles from '../../ArStoryTeller.module.scss';

// ─── Types ────────────────────────────────────────────────────────────────────

interface TeamMember {
    name: string;
    role: string;
}

interface TeamData {
    title: string;
    members: TeamMember[];
}

interface TeamSectionProps {
    data: {
        team: TeamData;
    };
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
