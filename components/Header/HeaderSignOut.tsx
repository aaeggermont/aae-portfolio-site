"use client";

import { signOutEverywhere, useHeaderSignOutVisibility } from "./useHeaderSignOut";

type HeaderSignOutProps = {
  /** Match desktop nav link color (project overlay themes). */
  color?: string;
  /** Called after click starts (e.g. close mobile drawer). */
  onClick?: () => void;
  className?: string;
};

/** Renders nothing unless Firebase and/or access-code session is active. */
export function HeaderSignOut({ color, onClick, className }: HeaderSignOutProps) {
  const { ready, showSignOut } = useHeaderSignOutVisibility();

  if (!ready || !showSignOut) {
    return null;
  }

  return (
    <button
      type="button"
      className={className}
      style={color ? { color } : undefined}
      onClick={() => {
        onClick?.();
        void signOutEverywhere();
      }}
    >
      Sign out
    </button>
  );
}
