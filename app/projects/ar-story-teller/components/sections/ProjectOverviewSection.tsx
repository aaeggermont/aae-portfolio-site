import ProjectOverview from '../ProjectOverview';
import styles from '../../ArStoryTeller.module.scss';

export function ProjectOverviewSection() {
    return (
        <section className={styles['project-container']}>
            <ProjectOverview 
               data-aos="fade-up"
               data-aos-duration="1000"
               data-aos-anchor-placement="top-center"
            />
        </section>
    );
}