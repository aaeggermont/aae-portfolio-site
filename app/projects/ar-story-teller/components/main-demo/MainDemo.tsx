'use client';

import { useRef } from 'react';

import ProjectImage from '@/lib/media/ProjectImage';

import styles from './MainDemo.module.scss';
import { useMainDemoTimeline } from './useMainDemoTimeline';

const MAIN_DEMO_BACKGROUND_OBJECT_PATH =
    'projects/project_2/demo/TowerofTerrorFullShotParkImage.png';

const MAIN_DEMO_NOTIFICATION_OBJECT_PATH =
    'projects/project_2/demo/ARMagicToursNotification.png';

const MAIN_DEMO_GIRL_GHOST_OBJECT_PATH =
    'projects/project_2/demo/GirlGhost.png';

const MAIN_DEMO_IPHONE_FRAME_OBJECT_PATH =
    'projects/project_2/demo/IPhoneFrame.png';

/** Intrinsic dimensions from Storage (900×655); canvas uses 16:9 with cover crop. */
const MAIN_DEMO_BACKGROUND_INTRINSIC_WIDTH = 900;
const MAIN_DEMO_BACKGROUND_INTRINSIC_HEIGHT = 655;

/** Notification artwork — update if Storage metadata differs. */
const MAIN_DEMO_NOTIFICATION_INTRINSIC_WIDTH = 360;
const MAIN_DEMO_NOTIFICATION_INTRINSIC_HEIGHT = 120;

/** Girl ghost — 3000×3000 artboard; visible figure is ~7% of canvas (see crop vars in SCSS). */
const MAIN_DEMO_GIRL_GHOST_INTRINSIC_WIDTH = 3000;
const MAIN_DEMO_GIRL_GHOST_INTRINSIC_HEIGHT = 3000;

/** iPhone frame — transparent screen area preserved for future AR content. */
const MAIN_DEMO_IPHONE_FRAME_INTRINSIC_WIDTH = 785;
const MAIN_DEMO_IPHONE_FRAME_INTRINSIC_HEIGHT = 1617;

const mainDemoImageSizes = [
    '100vw',
    '(min-width: 768px) 900px',
    '(min-width: 1024px) 1100px',
].join(', ');

const mainDemoNotificationSizes = [
    'min(42vw, 280px)',
    '(min-width: 768px) min(32vw, 300px)',
    '(min-width: 1024px) min(28vw, 320px)',
].join(', ');

const mainDemoGirlGhostSizes = '1750px';

const mainDemoIphoneFrameSizes = [
    'min(28vw, 160px)',
    '(min-width: 768px) min(22vw, 200px)',
    '(min-width: 1024px) min(20vw, 220px)',
].join(', ');

export function MainDemo() {
    const canvasRef = useRef<HTMLDivElement>(null);
    const notificationRef = useRef<HTMLDivElement>(null);
    const windowGlowRef = useRef<HTMLDivElement>(null);
    const girlGhostRef = useRef<HTMLDivElement>(null);
    const iphoneFrameRef = useRef<HTMLDivElement>(null);

    useMainDemoTimeline({
        canvasRef,
        notificationRef,
        windowGlowRef,
        girlGhostRef,
        iphoneFrameRef,
    });

    return (
        <div
            ref={canvasRef}
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

            <div
                ref={windowGlowRef}
                className={styles.windowGlowWrap}
                aria-hidden="true"
            >
                <div className={styles.windowGlow} />
            </div>

            <div
                ref={girlGhostRef}
                className={styles.girlGhostWrap}
                aria-hidden="true"
            >
                <div className={styles.girlGhostClip}>
                    <div className={styles.girlGhostStage}>
                        <ProjectImage
                            objectPath={MAIN_DEMO_GIRL_GHOST_OBJECT_PATH}
                            alt=""
                            width={MAIN_DEMO_GIRL_GHOST_INTRINSIC_WIDTH}
                            height={MAIN_DEMO_GIRL_GHOST_INTRINSIC_HEIGHT}
                            sizes={mainDemoGirlGhostSizes}
                            className={styles.girlGhost}
                        />
                    </div>
                </div>
            </div>

            <div
                ref={iphoneFrameRef}
                className={styles.iphoneFrameWrap}
                aria-hidden="true"
            >
                <ProjectImage
                    objectPath={MAIN_DEMO_IPHONE_FRAME_OBJECT_PATH}
                    alt=""
                    width={MAIN_DEMO_IPHONE_FRAME_INTRINSIC_WIDTH}
                    height={MAIN_DEMO_IPHONE_FRAME_INTRINSIC_HEIGHT}
                    sizes={mainDemoIphoneFrameSizes}
                    className={styles.iphoneFrameImage}
                />
            </div>

            <div
                ref={notificationRef}
                className={styles.notification}
                aria-hidden="true"
            >
                <ProjectImage
                    objectPath={MAIN_DEMO_NOTIFICATION_OBJECT_PATH}
                    alt=""
                    width={MAIN_DEMO_NOTIFICATION_INTRINSIC_WIDTH}
                    height={MAIN_DEMO_NOTIFICATION_INTRINSIC_HEIGHT}
                    sizes={mainDemoNotificationSizes}
                    className={styles.notificationImage}
                />
            </div>
        </div>
    );
}
