import ProjectOverview from '../ProjectOverview';
import styles from '../../ArStoryTeller.module.scss';
import type { ProjectOverviewSectionData } from '@/app/projects/ar-story-teller/types/arStoryTellerContent';

interface ProjectOverviewSectionProps {
    data: ProjectOverviewSectionData;
}

export function ProjectOverviewSection({ data }: ProjectOverviewSectionProps) {
    return (
        <section className={styles['project-container']}>
            <ProjectOverview
                data={data.projectOverview}
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-anchor-placement="top-center"
            />
        </section>
    );
}
