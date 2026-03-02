// app/providers.tsx
"use client";

import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { ResponsiveQueryProvider } from "./lib/responsive/ResponsiveQueryProvider";
import { ParallaxProvider } from "react-scroll-parallax";
import { Provider as JotaiProvider } from 'jotai';

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 360,  // mobile-min
      md: 768,  // tablet-min
      lg: 1024, // desktop-min
      xl: 1440, // large desktop start
    },
  },
});

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <JotaiProvider>
      <AppRouterCacheProvider options={{ key: "mui" }}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <ResponsiveQueryProvider>
            <ParallaxProvider>
              {children}
            </ParallaxProvider>
          </ResponsiveQueryProvider>
        </ThemeProvider>
      </AppRouterCacheProvider>
    </JotaiProvider>
  );
}
