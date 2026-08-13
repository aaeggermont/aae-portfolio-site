'use client';

import { useEffect, useRef, useState } from 'react';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';

import ProjectImage from '@/lib/media/ProjectImage';

import { DemoVideo } from '../demo-video/DemoVideo';
import styles from './MainDemo.module.scss';
import { useMainDemoTimeline } from './useMainDemoTimeline';
import { MAIN_DEMO_CANVAS } from '../../layoutConfig';
import { MAIN_DEMO_DURATION_MS } from './mainDemoTiming';

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
    `(min-width: 768px) ${MAIN_DEMO_CANVAS.tablet.width}px`,
    `(min-width: 1024px) ${MAIN_DEMO_CANVAS.desktop.width}px`,
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
    const iphoneDeviceRef = useRef<HTMLDivElement>(null);
    const iphoneVideoRef = useRef<HTMLDivElement>(null);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const [isPlaying, setIsPlaying] = useState(true);
    const [runId, setRunId] = useState(0);
    /** Bumps when the cinematic sequence actually starts (scroll enter or replay). */
    const [playCycle, setPlayCycle] = useState(0);

    const startDemo = () => {
        setRunId((n) => n + 1);
        setIsPlaying(true);
        setPlayCycle((n) => n + 1);
    };

    useEffect(() => {
        if (!isPlaying) return;
        timerRef.current = setTimeout(
            () => setIsPlaying(false),
            MAIN_DEMO_DURATION_MS,
        );
        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, [isPlaying, runId, playCycle]);

    useMainDemoTimeline({
        canvasRef,
        notificationRef,
        windowGlowRef,
        girlGhostRef,
        iphoneDeviceRef,
        iphoneVideoRef,
        runId,
        onStarted: () => {
            setIsPlaying(true);
            setPlayCycle((n) => n + 1);
        },
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

            <div className={styles.iphoneDeviceWrap}>
                <div
                    ref={iphoneDeviceRef}
                    className={styles.iphoneDevice}
                    aria-hidden="true"
                >
                    <div ref={iphoneVideoRef} className={styles.iphoneScreen}>
                        <DemoVideo
                            key={runId}
                            className={styles.iphoneScreenVideoRoot}
                            videoClassName={styles.iphoneScreenVideo}
                        />
                    </div>
                    <div className={styles.iphoneFrameImageWrap}>
                        <ProjectImage
                            objectPath={MAIN_DEMO_IPHONE_FRAME_OBJECT_PATH}
                            alt=""
                            width={MAIN_DEMO_IPHONE_FRAME_INTRINSIC_WIDTH}
                            height={MAIN_DEMO_IPHONE_FRAME_INTRINSIC_HEIGHT}
                            sizes={mainDemoIphoneFrameSizes}
                            className={styles.iphoneFrameImage}
                        />
                    </div>
                </div>
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

            <button
                type="button"
                onClick={startDemo}
                aria-label="Replay AR demo"
                className={`${styles.replayButton} ${
                    isPlaying ? styles.replayButtonHidden : ''
                }`}
            >
                <PlayArrowRoundedIcon
                    className={styles.replayIcon}
                    aria-hidden
                />
                <span className={styles.replayLabel}>Replay demo</span>
            </button>
        </div>
    );
}
