'use client';

import { useCallback, useRef, useState } from 'react';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';

import { MainDemo } from '../main-demo/MainDemo';
import { MomentIntro } from './MomentIntro';
import { MomentMockup } from './MomentMockup';
import { SolutionOpener } from './SolutionOpener';
import { AR_MOMENTS, STORY_DETAILS_CAPTURE_COPY } from './momentsContent';
import styles from './MomentsChapter.module.scss';
import { useMomentsJourneyTimeline } from './useMomentsJourneyTimeline';

const nearbyMoment = AR_MOMENTS.find((m) => m.id === 'nearby');
const storyMoment = AR_MOMENTS.find((m) => m.id === 'storyDetails');

type MomentsChapterProps = {
    solutionEyebrow: string;
    solutionTitle: string;
};

/**
 * Single-stage Solution journey:
 * opener → Nearby title → mockup → Story title → MainDemo.
 */
export function MomentsChapter({
    solutionEyebrow,
    solutionTitle,
}: MomentsChapterProps) {
    const stageRef = useRef<HTMLDivElement>(null);
    const solutionOpenerRef = useRef<HTMLDivElement>(null);
    const nearbyIntroRef = useRef<HTMLDivElement>(null);
    const storyIntroRef = useRef<HTMLDivElement>(null);
    const nearbyMockupRef = useRef<HTMLDivElement>(null);
    const mainDemoRef = useRef<HTMLDivElement>(null);

    const [journeyRunId, setJourneyRunId] = useState(0);
    const [mainDemoPlayRequestId, setMainDemoPlayRequestId] = useState(0);

    const handleMainDemoPlay = useCallback(() => {
        setMainDemoPlayRequestId((n) => n + 1);
    }, []);

    const restartJourney = () => {
        setJourneyRunId((n) => n + 1);
    };

    useMomentsJourneyTimeline({
        stageRef,
        solutionOpenerRef,
        nearbyIntroRef,
        storyIntroRef,
        nearbyMockupRef,
        mainDemoRef,
        runId: journeyRunId,
        onMainDemoPlay: handleMainDemoPlay,
    });

    if (!nearbyMoment?.mockup || !storyMoment) {
        return null;
    }

    return (
        <div ref={stageRef} className={styles.stage}>
            <div ref={solutionOpenerRef} className={styles.layer}>
                <SolutionOpener
                    eyebrow={solutionEyebrow}
                    title={solutionTitle}
                />
            </div>

            <div ref={nearbyIntroRef} className={styles.layer}>
                <MomentIntro
                    title={nearbyMoment.title}
                    description={nearbyMoment.description}
                />
            </div>

            <div ref={nearbyMockupRef} className={styles.layer}>
                <MomentMockup
                    objectPath={nearbyMoment.mockup.objectPath}
                    alt={nearbyMoment.mockup.alt}
                    intrinsicWidth={nearbyMoment.mockup.intrinsicWidth}
                    intrinsicHeight={nearbyMoment.mockup.intrinsicHeight}
                />
            </div>

            <div ref={storyIntroRef} className={styles.layer}>
                <MomentIntro
                    title={storyMoment.title}
                    description={storyMoment.description}
                />
            </div>

            <div ref={mainDemoRef} className={styles.mainDemoLayer}>
                <MainDemo
                    className={styles.mainDemoFill}
                    autoPlayOnScroll={false}
                    playRequestId={mainDemoPlayRequestId}
                    showReplay={false}
                    storyCaption={STORY_DETAILS_CAPTURE_COPY}
                />
            </div>

            <button
                type="button"
                onClick={restartJourney}
                aria-label="Replay AR journey"
                className={styles.replayButton}
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
