"use client";
import { HeaderMobile } from "./HeaderMobile";
import { HeaderDesktop } from "./HeaderDesktop";
import { headerState } from "./HeaderState";
import { useAtomValue } from "jotai";
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
  const { isDark, position, logoPrimaryColor, logoAccentColor } =
    useAtomValue(headerState);

  let fontColor = fontColorProp || "#074c5f";
  const resolvedLogoPrimary =
    logoPrimaryColor ??
    (isDark ? "#ffffff" : logoFontColorProp || "#074c5f");

  if (isDark) {
    fontColor = "#ffffff";
  }

  const logoColors: HeaderLogoColorProps = {
    logoPrimaryColor: resolvedLogoPrimary,
    logoAccentColor,
  };

  const resumeHref = "/resume/AntonioEggermontResume-2024.pdf";

  return (
    <header className={styles.header_area} style={{ position }}>
      <div className="global-container">
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
