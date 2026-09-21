"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useMediaQuery } from "react-responsive";

import { breakpointPx } from "./breakpoints";

type ResponsiveContextValue = {
  isDesktopOrLaptop: boolean;
  isTablet: boolean;
  isMobile: boolean;
  /** True from tablet breakpoint up (no upper bound). */
  isTabletUp: boolean;
  isPortrait: boolean;
  isRetina: boolean;
};

const ResponsiveContext = createContext<ResponsiveContextValue | undefined>(undefined);

export function useResponsive() {
  const ctx = useContext(ResponsiveContext);
  if (!ctx) {
    throw new Error("useResponsive must be used within ResponsiveQueryProvider");
  }
  return ctx;
}

export function ResponsiveQueryProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // ✅ ALWAYS call hooks (no conditional hooks)
  const mqDesktopOrLaptop = useMediaQuery({
    query: `(min-width: ${breakpointPx.desktopMin}px) and (max-width: ${breakpointPx.desktopMax}px)`,
  });

  const mqTablet = useMediaQuery({
    query: `(min-width: ${breakpointPx.tabletMin}px) and (max-width: ${breakpointPx.tabletMax}px)`,
  });

  const mqTabletUp = useMediaQuery({
    query: `(min-width: ${breakpointPx.tabletMin}px)`,
  });

  const mqMobile = useMediaQuery({
    query: `(min-width: ${breakpointPx.mobileMin}px) and (max-width: ${breakpointPx.mobileMax}px)`,
  });

  const mqPortrait = useMediaQuery({ query: "(orientation: portrait)" });
  const mqRetina = useMediaQuery({ query: "(min-resolution: 2dppx)" });

  // ✅ During SSR + hydration, force stable values.
  // After mount, use the real media query results.
  const screenDevice = useMemo<ResponsiveContextValue>(() => {
    if (!mounted) {
      return {
        isDesktopOrLaptop: false,
        isTablet: false,
        isMobile: false,
        isTabletUp: false,
        isPortrait: false,
        isRetina: false,
      };
    }

    return {
      isDesktopOrLaptop: mqDesktopOrLaptop,
      isTablet: mqTablet,
      isMobile: mqMobile,
      isTabletUp: mqTabletUp,
      isPortrait: mqPortrait,
      isRetina: mqRetina,
    };
  }, [mounted, mqDesktopOrLaptop, mqTablet, mqMobile, mqTabletUp, mqPortrait, mqRetina]);

  return <ResponsiveContext.Provider value={screenDevice}>{children}</ResponsiveContext.Provider>;
}
