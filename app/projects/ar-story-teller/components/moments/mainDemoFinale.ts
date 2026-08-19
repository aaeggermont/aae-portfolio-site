/** Pause the AR demo video on its last frame (for the Story Details zoom finale). */
export function freezeMainDemoVideo(root: HTMLElement): void {
    const video = root.querySelector('video');
    if (!(video instanceof HTMLVideoElement)) return;

    const snapToEnd = () => {
        if (Number.isFinite(video.duration) && video.duration > 0) {
            video.currentTime = Math.max(0, video.duration - 0.04);
        }
        video.pause();
    };

    video.loop = false;
    if (video.readyState >= 1) {
        snapToEnd();
        return;
    }

    video.addEventListener('loadedmetadata', snapToEnd, { once: true });
}

export function getMainDemoAtmosphereElements(root: HTMLElement): HTMLElement[] {
    return [
        root.querySelector('[data-main-demo-bg]'),
        root.querySelector('[data-main-demo-wash]'),
        root.querySelector('[data-main-demo-glow]'),
        root.querySelector('[data-main-demo-ghost]'),
    ].filter((el): el is HTMLElement => el instanceof HTMLElement);
}

export function getMainDemoStoryOverlay(root: HTMLElement): HTMLElement | null {
    const el = root.querySelector('[data-main-demo-story]');
    return el instanceof HTMLElement ? el : null;
}
