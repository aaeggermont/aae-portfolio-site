"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useMediaQuery } from "react-responsive";

type ResponsiveContextValue = {
  isDesktopOrLaptop: boolean;
  isTablet: boolean;
  isMobile: boolean;
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

  // Keep these in sync with your SCSS breakpoints in variables.scss
  const desktopMin = 1024;
  const desktopMax = 3800;

  const mobileMin = 360;
  const mobileMax = 767;

  const tabletMin = 768;
  const tabletMax = 1023;

  // ✅ ALWAYS call hooks (no conditional hooks)
  const mqDesktopOrLaptop = useMediaQuery({
    query: `(min-width: ${desktopMin}px) and (max-width: ${desktopMax}px)`,
  });

  const mqTablet = useMediaQuery({
    query: `(min-width: ${tabletMin}px) and (max-width: ${tabletMax}px)`,
  });

  const mqMobile = useMediaQuery({
    query: `(min-width: ${mobileMin}px) and (max-width: ${mobileMax}px)`,
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
        isPortrait: false,
        isRetina: false,
      };
    }

    return {
      isDesktopOrLaptop: mqDesktopOrLaptop,
      isTablet: mqTablet,
      isMobile: mqMobile,
      isPortrait: mqPortrait,
      isRetina: mqRetina,
    };
  }, [mounted, mqDesktopOrLaptop, mqTablet, mqMobile, mqPortrait, mqRetina]);

  return <ResponsiveContext.Provider value={screenDevice}>{children}</ResponsiveContext.Provider>;
}
