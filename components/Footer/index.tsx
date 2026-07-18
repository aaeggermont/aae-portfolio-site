'use client'

import IconButton from '@mui/material/IconButton';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { useAtomValue } from 'jotai';

import { useResponsive } from '@/lib/responsive/ResponsiveQueryProvider';
import { HeaderLogo } from '@/components/Header/HeaderLogo';
import { isHomeNavActive, type HomeNavKey } from '@/lib/home/homeAnchors';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { clsx } from 'clsx';
import {
  getFooterThemeStyle,
  resolveFooterLogoColors,
} from './footerTheme';
import { footerState } from './FooterState';
import styles from './footer.module.scss';

type FooterMenuLink = {
  path: string;
  name: string;
  navKey: HomeNavKey;
};

export function Footer() {
    const screenDevice = useResponsive();
    const pathname = usePathname();
    const {
      isDark,
      fontColor,
      background,
      backgroundColor,
      logoFontColor,
      logoAccentColor,
    } = useAtomValue(footerState);

    const footerThemeStyle = getFooterThemeStyle({
      isDark,
      fontColor,
      background,
      backgroundColor,
    });
    const { primary: logoPrimaryColor, accent: resolvedLogoAccent } =
      resolveFooterLogoColors({
        isDark,
        logoFontColor,
        logoAccentColor,
      });

    const menuLinks: FooterMenuLink[] = [
        { path: '/', name: 'Home', navKey: 'home' },
        { path: '/aboutme', name: 'About Me', navKey: 'about' },
        { path: '/mywork', name: 'My Work', navKey: 'work' },
        { path: '/contact', name: 'Contact', navKey: 'contact' },
    ];

    const MenuLinks = menuLinks.map((link, index) =>
        <span key={`menu-link-${index}`}>
            <Link
                className={isHomeNavActive(pathname, '', link.navKey)
                    ? styles['active_link']
                    : ''}
                href={link.path}>
                { link.name }
            </Link>
        </span>
    );

    const handleLinkedIn = () => {
        window.open('https://www.linkedin.com/in/antonio-aranda-eggermont-23aa7b8/', '_blank');
    };

    const wrapperClass = styles.footerContentCap;

    const logoBlock = (
      <div className={styles['logo-section']}>
        <div className={styles.logo_stack}>
          <Link href="/" className={styles.footer_logo_link}>
            <HeaderLogo
              width="140"
              height="37"
              primaryColor={logoPrimaryColor}
              accentColor={resolvedLogoAccent}
            />
          </Link>
          {!screenDevice.isMobile ? (
            <div className={styles.footer_linkedin}>
              <IconButton
                component="label"
                onClick={handleLinkedIn}
                sx={{ color: 'var(--footer-text-color)' }}
              >
                <LinkedInIcon />
              </IconButton>
            </div>
          ) : null}
        </div>
      </div>
    );

    const copyrightBlock = (
      <div className={styles['copyright-section']}>
        <div className={styles.copyright_text}>
          <span className={styles.copyright_name}>Antonio Aranda Eggermont</span>
          <span className={styles.copyright_rights}>© All Rights Serserved</span>
        </div>
      </div>
    );

    const navigationBlock = (
      <div className={styles['navigation-section']}>
        <div className={styles['navigation-title']}>Navigation</div>
        { MenuLinks }
      </div>
    );

    if (screenDevice.isMobile) {
        return (
            <div className={styles.footerShell} style={footerThemeStyle}>
                <div
                  className={clsx(wrapperClass, styles.footerMobileWrapper)}
                  style={footerThemeStyle}
                >
                    <div
                        className={styles['footer-container']}
                        style={footerThemeStyle}
                    >
                        {logoBlock}
                        {navigationBlock}
                        {copyrightBlock}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.footerShell} style={footerThemeStyle}>
            <div className={wrapperClass}>
                <div
                  className={styles['footer-container']}
                  style={footerThemeStyle}
                >
                    {logoBlock}
                    {copyrightBlock}
                    {navigationBlock}
                </div>
            </div>
        </div>
    );
}
