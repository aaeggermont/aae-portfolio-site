"use client";

import { createContext, useContext } from "react";
import { useMediaQuery } from "react-responsive";

type ResponsiveContextValue = {
  isDesktopOrLaptop: boolean;
  isTablet: boolean;
  isMobile: boolean;
  isPortrait: boolean;
  isRetina: boolean;
  xs: boolean;
  sm: boolean;
  md: boolean;
  lg: boolean;
  laptop: boolean;
  desktop: boolean;
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
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px) and (max-width: 4600px)",
  });
  const isTablet = useMediaQuery({
    query: "(min-width: 1024px) and (max-width: 1366px)",
  });
  const isMobile = useMediaQuery({
    query: "(min-width: 360px) and (max-width: 428px)",
  });
  const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });
  const isRetina = useMediaQuery({ query: "(min-resolution: 2dppx)" });

  const xs = useMediaQuery({ query: "(max-width: 767px)" });
  const sm = useMediaQuery({ query: "only screen and (max-width: 767px)" });
  const md = useMediaQuery({
    query: "only screen and (min-width: 768px) and (max-width: 991px)",
  });
  const lg = useMediaQuery({ query: "only screen and (min-width: 992px)" });
  const laptop = useMediaQuery({ query: "only screen and (min-width: 992px)" });
  const desktop = useMediaQuery({ query: "only screen and (min-width: 992px)" });

  const screenDevice: ResponsiveContextValue = {
    isDesktopOrLaptop,
    isTablet,
    isMobile,
    isPortrait,
    isRetina,
    xs,
    sm,
    md,
    lg,
    laptop,
    desktop,
  };

  return (
    <ResponsiveContext.Provider value={screenDevice}>
      {children}
    </ResponsiveContext.Provider>
  );
}
