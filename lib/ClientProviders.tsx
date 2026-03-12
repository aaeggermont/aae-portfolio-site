"use client";

import React from "react";
import { ResponsiveQueryProvider } from "./responsive/ResponsiveQueryProvider";

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ResponsiveQueryProvider>
      {children}
    </ResponsiveQueryProvider>
  );
}
