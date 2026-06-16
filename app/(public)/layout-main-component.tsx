"use client";

import { useAtomValue } from "jotai";
import { layoutState } from "./layout-state";
import { ReactNode } from 'react';

export function LayoutMainComponent({ children }: { children: ReactNode }) {
    const { isFullWidth } = useAtomValue(layoutState);

    return (
        <main
          className={`${isFullWidth ? "" : "global-container"} flex-1 w-full min-w-0`}
        >
          {children}
        </main>
    );
}