"use client";
// Import your SCSS so classNames still work
import { HeaderMobile } from './HeaderMobile';
import { HeaderDesktop } from './HeaderDesktop';

export type HeaderProps = {
  isDark?: boolean;
  fontColor?: string;
  logoFontColor?: string;
};

export default function Header({
  isDark,
  fontColor: fontColorProp,
  logoFontColor: logoFontColorProp,
}: HeaderProps) {
  let fontColor = fontColorProp || "#074c5f";
  const logoFontColor = logoFontColorProp || "#074c5f";

  if (isDark) {
    fontColor = "#ffffff";
  }

  const resumeHref = "/resume/AntonioEggermontResume-2024.pdf";

  return (
    <header className="header_area">
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
