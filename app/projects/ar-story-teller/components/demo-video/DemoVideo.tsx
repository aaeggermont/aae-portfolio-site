'use client';

import type { ComponentPropsWithoutRef } from 'react';

import styles from './DemoVideo.module.scss';

export const AR_VIDEO_OVERLAY_DEMO_SRC =
    '/videos/ar-story-teller/ARVideoOverlayDemo-v2.mp4';

type DemoVideoProps = {
    src?: string;
    className?: string;
    videoClassName?: string;
    ariaLabel?: string;
} & Omit<
    ComponentPropsWithoutRef<'video'>,
    'src' | 'className' | 'children' | 'aria-label'
>;

export function DemoVideo({
    src = AR_VIDEO_OVERLAY_DEMO_SRC,
    className,
    videoClassName,
    ariaLabel = 'AR Magic Tours overlay demo video',
    autoPlay = true,
    muted = true,
    loop = true,
    playsInline = true,
    preload = 'metadata',
    ...videoProps
}: DemoVideoProps) {
    return (
        <div className={[styles.root, className].filter(Boolean).join(' ')}>
            <video
                {...videoProps}
                className={[styles.video, videoClassName].filter(Boolean).join(' ')}
                src={src}
                autoPlay={autoPlay}
                muted={muted}
                loop={loop}
                playsInline={playsInline}
                preload={preload}
                aria-label={ariaLabel}
            />
        </div>
    );
}
