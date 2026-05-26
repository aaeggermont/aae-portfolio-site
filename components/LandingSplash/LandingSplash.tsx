"use client";

import Image from "next/image";
import splashStyles from "./landing-splash.module.scss";
import { SPLASH_LOGO_SRC } from "@/lib/home/splashLogo";

export type LandingSplashPhase = "loading" | "fading";

type LandingSplashProps = {
  phase: LandingSplashPhase;
  onFadeEnd: () => void;
  label?: string;
  logoSrc?: string;
};

/**
 * Full-viewport cover while route content initializes and key assets preload.
 * Fades out once `phase` becomes `fading`; parent sets `done` after transition.
 * Swap artwork by replacing `public/images/splash/logo.svg`.
 */
export function LandingSplash({
  phase,
  onFadeEnd,
  label = "Loading",
  logoSrc = SPLASH_LOGO_SRC,
}: LandingSplashProps) {
  return (
    <div
      className={`${splashStyles.splash} ${
        phase === "fading" ? splashStyles.splash_fading : ""
      }`}
      role="status"
      aria-live="polite"
      aria-busy={phase === "loading"}
      onTransitionEnd={(e) => {
        if (e.target !== e.currentTarget) return;
        if (e.propertyName === "opacity" && phase === "fading") {
          onFadeEnd();
        }
      }}
    >
      <div className={splashStyles.cluster}>
        <Image
          className={splashStyles.logo}
          src={logoSrc}
          alt="Antonio Aranda Eggermont"
          width={640}
          height={242}
          unoptimized
          priority
        />
        <div className={splashStyles.loaderRow}>
          <div className={splashStyles.spinner} aria-hidden />
          <span className={splashStyles.label}>{label}</span>
        </div>
      </div>
    </div>
  );
}
