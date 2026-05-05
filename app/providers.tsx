// app/providers.tsx
"use client";

import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { initLightboxJS } from "lightbox.js-react";
import { ResponsiveQueryProvider } from "../lib/responsive/ResponsiveQueryProvider";
import { PAGE_CANVAS } from "@/lib/theme/pageCanvas";

const theme = createTheme({
  palette: {
    /* CssBaseline sets `body` from this; without it, edges stay white over globals.scss */
    background: {
      default: PAGE_CANVAS,
      paper: "#ffffff",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 360, // mobile-min
      md: 768, // tablet-min
      lg: 1024, // desktop-min
      xl: 1440, // large desktop start
    },
  },
});

export function AppProviders({ children }: { children: React.ReactNode }) {
  React.useEffect(() => {
    const key = process.env.NEXT_PUBLIC_LIGHTBOXJS_LICENSE;
    if (!key) return;
    const plan =
      process.env.NEXT_PUBLIC_LIGHTBOXJS_PLAN === "team" ? "team" : "individual";
    initLightboxJS(key, plan);
  }, []);

  return (
    <AppRouterCacheProvider options={{ key: "mui" }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ResponsiveQueryProvider>{children}</ResponsiveQueryProvider>
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
