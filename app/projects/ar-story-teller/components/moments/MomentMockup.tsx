'use client';

import ProjectImage from '@/lib/media/ProjectImage';

import styles from './MomentsChapter.module.scss';

type MomentMockupProps = {
    objectPath: string;
    alt: string;
    intrinsicWidth: number;
    intrinsicHeight: number;
};

const mockupSizes = [
    'min(62vw, 240px)',
    '(min-width: 768px) min(40vw, 260px)',
    '(min-width: 1024px) min(28vw, 280px)',
].join(', ');

/** Static phone screen for moments that are not the cinematic MainDemo. */
export function MomentMockup({
    objectPath,
    alt,
    intrinsicWidth,
    intrinsicHeight,
}: MomentMockupProps) {
    return (
        <div className={styles.mockupWrap}>
            <ProjectImage
                objectPath={objectPath}
                alt={alt}
                width={intrinsicWidth}
                height={intrinsicHeight}
                sizes={mockupSizes}
                className={styles.mockupImage}
            />
        </div>
    );
}
