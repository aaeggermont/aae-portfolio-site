'use client';

import { useEffect, useRef, useState } from 'react';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';

import ProjectImage from '@/lib/media/ProjectImage';

import { DemoVideo } from '../demo-video/DemoVideo';
import { ArkitCoachingOverlay } from './ArkitCoachingOverlay';
import styles from './MainDemo.module.scss';
import { useMainDemoTimeline } from './useMainDemoTimeline';
import { MAIN_DEMO_CANVAS } from '../../layoutConfig';
import {
    MAIN_DEMO_COACHING_SWAY_END_MS,
    MAIN_DEMO_IPHONE_VISIBLE_MS,
} from './mainDemoTiming';

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
    'min(46vw, 360px)',
    '(min-width: 768px) min(42vw, 400px)',
    '(min-width: 1024px) min(42vw, 400px)',
].join(', ');

const mainDemoGirlGhostSizes = '1750px';

const mainDemoIphoneFrameSizes = [
    'min(28vw, 160px)',
    '(min-width: 768px) min(22vw, 200px)',
    '(min-width: 1024px) min(20vw, 220px)',
].join(', ');

export type MainDemoProps = {
    /**
     * When true (default), play once when the canvas scrolls into view.
     * Set false when a parent chapter drives playback via `playRequestId`.
     */
    autoPlayOnScroll?: boolean;
    /** Bump from a parent to start or restart the cinematic (chapter demoEnter). */
    playRequestId?: number;
    /** When false, hide the built-in Replay control (parent owns replay). */
    showReplay?: boolean;
    className?: string;
};

export function MainDemo({
    autoPlayOnScroll = true,
    playRequestId = 0,
    showReplay = true,
    className = '',
}: MainDemoProps = {}) {
    const canvasRef = useRef<HTMLDivElement>(null);
    const notificationRef = useRef<HTMLDivElement>(null);
    const windowGlowRef = useRef<HTMLDivElement>(null);
    const girlGhostRef = useRef<HTMLDivElement>(null);
    const iphoneDeviceRef = useRef<HTMLDivElement>(null);
    const iphoneVideoRef = useRef<HTMLDivElement>(null);
    const coachingOverlayRef = useRef<HTMLDivElement>(null);

    const [runId, setRunId] = useState(0);
    /** Bumps when the cinematic sequence actually starts (scroll enter or replay). */
    const [playCycle, setPlayCycle] = useState(0);
    /**
     * Phone sway starts when the iPhone is fully on screen, together with the
     * coaching fade-in — so the overlay is already moving as it appears.
     */
    const [coachingSwayActive, setCoachingSwayActive] = useState(false);

    const startDemo = () => {
        setRunId((n) => n + 1);
        setCoachingSwayActive(false);
    };

    useEffect(() => {
        if (playRequestId <= 0) return;
        setRunId(playRequestId);
        setCoachingSwayActive(false);
    }, [playRequestId]);

    useMainDemoTimeline({
        canvasRef,
        notificationRef,
        windowGlowRef,
        girlGhostRef,
        iphoneDeviceRef,
        iphoneVideoRef,
        coachingOverlayRef,
        runId,
        autoPlayOnScroll,
        onStarted: () => {
            setPlayCycle((n) => n + 1);
            setCoachingSwayActive(false);
        },
    });

    useEffect(() => {
        // Wait for the first scroll/replay start so timers sync to the GSAP timeline.
        if (playCycle === 0) return;

        setCoachingSwayActive(false);
        const startSwayTimer = setTimeout(() => {
            setCoachingSwayActive(true);
        }, MAIN_DEMO_IPHONE_VISIBLE_MS);
        // Keep sway through the AR video crossfade (ends with the last loop).
        const stopSwayTimer = setTimeout(() => {
            setCoachingSwayActive(false);
        }, MAIN_DEMO_COACHING_SWAY_END_MS);
        return () => {
            clearTimeout(startSwayTimer);
            clearTimeout(stopSwayTimer);
        };
    }, [playCycle]);

    return (
        <div
            ref={canvasRef}
            className={[styles.canvas, className].filter(Boolean).join(' ')}
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
                    <div className={styles.iphoneScreen}>
                        <div
                            ref={coachingOverlayRef}
                            className={styles.coachingOverlay}
                        >
                            <ArkitCoachingOverlay
                                key={`coaching-${playCycle}-${coachingSwayActive ? 'sway' : 'still'}`}
                                swayActive={coachingSwayActive}
                            />
                        </div>
                        <div
                            ref={iphoneVideoRef}
                            className={styles.iphoneScreenVideoLayer}
                        >
                            <DemoVideo
                                key={runId}
                                className={styles.iphoneScreenVideoRoot}
                                videoClassName={styles.iphoneScreenVideo}
                            />
                        </div>
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

            <div className={styles.notificationSlot}>
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

            {showReplay ? (
                <button
                    type="button"
                    onClick={startDemo}
                    aria-label="Replay AR demo"
                    className={styles.replayButton}
                >
                    <PlayArrowRoundedIcon
                        className={styles.replayIcon}
                        aria-hidden
                    />
                    <span className={styles.replayLabel}>Replay demo</span>
                </button>
            ) : null}
        </div>
    );
}
