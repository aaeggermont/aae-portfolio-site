// app/providers.tsx
"use client";

import { ResponsiveQueryProvider } from "./lib/responsive/ResponsiveQueryProvider";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ResponsiveQueryProvider>
      {children}
    </ResponsiveQueryProvider>
  );
}