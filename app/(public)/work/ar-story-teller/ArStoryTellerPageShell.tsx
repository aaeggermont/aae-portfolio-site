'use client';

import { useLayoutEffect, type ReactNode } from 'react';
import { AR_STORY_TELLER_PAGE_CANVAS } from '@/app/projects/ar-story-teller/pageCanvas';
import { PAGE_CANVAS } from '@/lib/theme/pageCanvas';

/**
 * Applies route-local canvas color: `--page-canvas` on `<html>` for SCSS using the token, and
 * `body` background (MUI `CssBaseline` pins body to `palette.background.default`, not the var).
 */
export function ArStoryTellerPageShell({ children }: { children: ReactNode }) {
  useLayoutEffect(() => {
    document.documentElement.style.setProperty(
      '--page-canvas',
      AR_STORY_TELLER_PAGE_CANVAS,
    );
    document.body.style.backgroundColor = AR_STORY_TELLER_PAGE_CANVAS;
    return () => {
      document.documentElement.style.setProperty('--page-canvas', PAGE_CANVAS);
      document.body.style.backgroundColor = '';
    };
  }, []);

  return children;
}
