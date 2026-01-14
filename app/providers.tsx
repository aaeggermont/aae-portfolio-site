// app/providers.tsx
"use client";

import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { ResponsiveQueryProvider } from "./lib/responsive/ResponsiveQueryProvider";

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 360,  // mobile-min
      md: 768,  // tablet-min
      lg: 1024, // desktop-min
      xl: 1440, // large desktop start (you can raise this if you want)
    },
  },
});


export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ResponsiveQueryProvider>{children}</ResponsiveQueryProvider>
    </ThemeProvider>
  );
}