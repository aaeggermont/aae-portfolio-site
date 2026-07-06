"use client";

import { HeaderMobile } from "./HeaderMobile";
import { HeaderDesktop } from "./HeaderDesktop";
import { defaultHeaderState, headerState } from "./HeaderState";
import { useAtomValue } from "jotai";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";
import styles from "./header.module.scss";

export type HeaderProps = {
  isDark?: boolean;
  fontColor?: string;
  logoFontColor?: string;
};

export type HeaderLogoColorProps = {
  logoPrimaryColor: string;
  logoAccentColor?: string;
};

export default function Header({
  fontColor: fontColorProp,
  logoFontColor: logoFontColorProp,
}: HeaderProps) {
  const pathname = usePathname();
  const { isDark, position, logoPrimaryColor, logoAccentColor } =
    useAtomValue(headerState);

  let fontColor = fontColorProp || "#064c5f";
  const resolvedLogoPrimary =
    logoPrimaryColor ??
    (isDark ? "#ffffff" : logoFontColorProp || "#064c5f");

  if (isDark) {
    fontColor = "#ffffff";
  }

  const logoColors: HeaderLogoColorProps = {
    logoPrimaryColor: resolvedLogoPrimary,
    logoAccentColor,
  };

  const resumeHref = "/resume/AntonioEggermontResume-2024.pdf";
  const useStickyHomeHeader =
    pathname === "/" && position === defaultHeaderState.position;

  return (
    <header
      className={clsx(styles.header_area, useStickyHomeHeader && styles.header_sticky)}
      style={{ position: useStickyHomeHeader ? "sticky" : position }}
    >
      <div className={styles.headerContentCap}>
        <HeaderMobile
          isDark={isDark}
          resumeHref={resumeHref}
          {...logoColors}
        />
        <HeaderDesktop
          isDark={isDark}
          fontColor={fontColor}
          resumeHref={resumeHref}
          {...logoColors}
        />
      </div>
    </header>
  );
}
