'use client';

import ProjectImage from '@/lib/media/ProjectImage';

import styles from './MainDemo.module.scss';

const MAIN_DEMO_BACKGROUND_OBJECT_PATH =
    'projects/project_2/demo/TowerofTerrorFullShotParkImage.png';

/** Intrinsic dimensions from Storage (900×655); canvas uses 16:9 with cover crop. */
const MAIN_DEMO_BACKGROUND_INTRINSIC_WIDTH = 900;
const MAIN_DEMO_BACKGROUND_INTRINSIC_HEIGHT = 655;

const mainDemoImageSizes = [
    '100vw',
    '(min-width: 768px) 900px',
    '(min-width: 1024px) 1100px',
].join(', ');

export function MainDemo() {
    return (
        <div
            className={styles.canvas}
            aria-label="AR Magic Tours cinematic demo — Hollywood Tower Hotel"
        >
            <ProjectImage
                objectPath={MAIN_DEMO_BACKGROUND_OBJECT_PATH}
                alt="Hollywood Tower Hotel viewed from Hollywood Boulevard"
                width={MAIN_DEMO_BACKGROUND_INTRINSIC_WIDTH}
                height={MAIN_DEMO_BACKGROUND_INTRINSIC_HEIGHT}
                sizes={mainDemoImageSizes}
                className={styles.backgroundImage}
                priority
            />
        </div>
    );
}
