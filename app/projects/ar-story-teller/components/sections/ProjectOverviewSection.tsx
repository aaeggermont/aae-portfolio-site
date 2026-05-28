import ProjectOverview from '../ProjectOverview';
import styles from '../../ArStoryTeller.module.scss';
import type { ProjectOverviewSectionData } from '@/app/projects/ar-story-teller/types/arStoryTellerContent';

interface ProjectOverviewSectionProps {
    data: ProjectOverviewSectionData;
}

export function ProjectOverviewSection({ data }: ProjectOverviewSectionProps) {
    return (
        <section className={styles['project-container']}>
            <ProjectOverview data={data.projectOverview} />
        </section>
    );
}
