'use client';

import { useEffect } from 'react';
import { useSetAtom } from 'jotai';

import { layoutState } from '@/app/(public)/layout-state';
import { BiographyChapters } from './components/BiographyChapters';
import { BiographyIntro } from './components/BiographyIntro';
import styles from './biography.module.scss';

export default function BiographyPage() {
  const setLayoutState = useSetAtom(layoutState);

  useEffect(() => {
    setLayoutState({ isFullWidth: true });
    return () => setLayoutState({ isFullWidth: false });
  }, [setLayoutState]);

  return (
    <div className={styles.biographyPage}>
      <div className={styles.biographyPageContent}>
        <div className={styles.biographyJourney}>
          <BiographyIntro />
          <BiographyChapters />
        </div>
      </div>
    </div>
  );
}
