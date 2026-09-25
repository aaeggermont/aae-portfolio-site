'use client';

import { useMemo, useState } from 'react';

import { buildPublicStorageUrl } from '@/lib/firebase/publicStorageUrl';
import type { BiographyChapterFigure } from '../../data/biography-chapters-data';
import styles from './biographyChapters.module.scss';

type BiographyChapterVimeoPosterProps = {
  figure: BiographyChapterFigure;
};

function buildVimeoEmbedSrc(
  videoId: string,
  options: { muted: boolean; loop: boolean },
): string {
  const params = new URLSearchParams({
    autoplay: '1',
    muted: options.muted ? '1' : '0',
    loop: options.loop ? '1' : '0',
    title: '0',
    byline: '0',
    portrait: '0',
    dnt: '1',
  });
  return `https://player.vimeo.com/video/${encodeURIComponent(videoId)}?${params.toString()}`;
}

export function BiographyChapterVimeoPoster({
  figure,
}: BiographyChapterVimeoPosterProps) {
  const vimeo = figure.vimeo;
  const posterSrc = buildPublicStorageUrl(figure.imageObjectPath);
  const [playing, setPlaying] = useState(false);

  const embedSrc = useMemo(() => {
    if (!vimeo) return null;
    return buildVimeoEmbedSrc(vimeo.videoId, {
      muted: vimeo.muted ?? true,
      loop: vimeo.loop ?? false,
    });
  }, [vimeo]);

  if (!vimeo || !embedSrc) return null;

  const playLabel = vimeo.title || `Play ${figure.alt}`;

  return (
    <div className={styles.biographyChaptersVimeo}>
      {playing ? (
        <iframe
          className={styles.biographyChaptersVimeoFrame}
          src={embedSrc}
          title={playLabel}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          className={styles.biographyChaptersVimeoPosterButton}
          onClick={() => setPlaying(true)}
          aria-label={playLabel}
        >
          <img
            src={posterSrc}
            alt={figure.alt}
            width={1600}
            height={900}
            className={styles.biographyChaptersVimeoPosterImage}
            draggable={false}
          />
          <span className={styles.biographyChaptersVimeoPlay} aria-hidden>
            <span className={styles.biographyChaptersVimeoPlayIcon} />
          </span>
        </button>
      )}
    </div>
  );
}
