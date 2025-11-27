"use client";

import React, { createContext, useContext } from "react";
import { useMediaQuery } from "react-responsive";

type ResponsiveContextValue = {
  isDesktopOrLaptop: boolean;
  isTablet: boolean;
  isMobile: boolean;
  isPortrait: boolean;
  isRetina: boolean;
};

const ResponsiveContext = createContext<ResponsiveContextValue | undefined>(
  undefined
);

export function useResponsive() {
  const ctx = useContext(ResponsiveContext);
  if (!ctx) {
    throw new Error("useResponsive must be used within ResponsiveQueryProvider");
  }
  return ctx;
}

export function ResponsiveQueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // Keep these in sync with your SCSS breakpoints in variables.scss
  const desktopMin = 1024;
  const desktopMax = 3800;

  const mobileMin = 360;
  const mobileMax = 767;

  const tabletMin = 768;
  const tabletMax = 1023;

  const isDesktopOrLaptop = useMediaQuery({
    query: `(min-width: ${desktopMin}px) and (max-width: ${desktopMax}px)`,
  });

  const isTablet = useMediaQuery({
    query: `(min-width: ${tabletMin}px) and (max-width: ${tabletMax}px)`,
  });

  const isMobile = useMediaQuery({
    query: `(min-width: ${mobileMin}px) and (max-width: ${mobileMax}px)`,
  });

  const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });
  const isRetina = useMediaQuery({ query: "(min-resolution: 2dppx)" });

  const screenDevice: ResponsiveContextValue = {
    isDesktopOrLaptop,
    isTablet,
    isMobile,
    isPortrait,
    isRetina,
  };

  return (
    <ResponsiveContext.Provider value={screenDevice}>
      {children}
    </ResponsiveContext.Provider>
  );
}
