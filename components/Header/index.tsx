"use client";
// Import your SCSS so classNames still work
import { HeaderMobile } from './HeaderMobile';
import { HeaderDesktop } from './HeaderDesktop';
import { headerState } from './HeaderState';
import { useAtomValue } from 'jotai';
import styles from './header.module.scss';

export type HeaderProps = {
  isDark?: boolean;
  fontColor?: string;
  logoFontColor?: string;
};

export default function Header({
  fontColor: fontColorProp,
  logoFontColor: logoFontColorProp,
}: HeaderProps) {
  const { isDark, position } = useAtomValue(headerState);
  let fontColor = fontColorProp || "#074c5f";
  let logoFontColor = logoFontColorProp || "#074c5f";

  if (isDark) {
    fontColor = "#ffffff";
    logoFontColor = "#ffffff";
  }

  const resumeHref = "/resume/AntonioEggermontResume-2024.pdf";

  return (
    <header
      className={styles.header_area}
      style={{ position }}>
      <div className="global-container">
        {/* Mobile header */}
        <HeaderMobile
          isDark={isDark}
          logoFontColor={logoFontColor}
          resumeHref={resumeHref}
        />

        {/* Desktop header */}
        <HeaderDesktop
          isDark={isDark}
          fontColor={fontColor}
          logoFontColor={logoFontColor}
          resumeHref={resumeHref}
        />
      </div>
    </header>
  );
}
