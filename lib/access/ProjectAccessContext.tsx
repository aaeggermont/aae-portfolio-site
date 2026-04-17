"use client";

import React from "react";

export type ProjectAccessContextValue = {
  projectKey: string;
  visibility: "public" | "restricted";
};

export const ProjectAccessContext =
  React.createContext<ProjectAccessContextValue | null>(null);

export function useProjectAccess() {
  const ctx = React.useContext(ProjectAccessContext);

  if (!ctx) {
    throw new Error(
      "useProjectAccess must be used inside a ProjectAccessContext.Provider"
    );
  }

  return ctx;
}