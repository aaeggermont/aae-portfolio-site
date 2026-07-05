'use client'

import IconButton from '@mui/material/IconButton';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

import { useResponsive } from '@/lib/responsive/ResponsiveQueryProvider';
import { HeaderLogo } from '@/components/Header/HeaderLogo';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { clsx } from 'clsx';
import {
  getFooterThemeStyle,
  resolveFooterLogoColors,
} from './footerTheme';
import styles from './footer.module.scss';

type FooterProps = {
  isDark?: boolean;
  logoFontColor?: string;
  logoAccentColor?: string;
  fontColor?: string;
  backgroundColor?: string;
};

export function Footer(props: FooterProps = {}) {
    const screenDevice = useResponsive();
    const pathname = usePathname();

    const footerThemeStyle = getFooterThemeStyle({
      isDark: props.isDark,
      fontColor: props.fontColor,
      backgroundColor: props.backgroundColor,
    });
    const { primary: logoPrimaryColor, accent: logoAccentColor } =
      resolveFooterLogoColors({
        isDark: props.isDark,
        logoFontColor: props.logoFontColor,
        logoAccentColor: props.logoAccentColor,
      });

    const MenuLinks = [
        { path: '/', name: 'Home' },
        { path: '/aboutme', name: 'About Me' },
        { path: '/mywork', name: 'My Work' },
        { path: '/contact', name: 'Contact' },
    ].map((link, index) =>
        <span key={`menu-link-${index}`}>
            <Link
                className={pathname === link.path
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
              accentColor={logoAccentColor}
            />
          </Link>
          {!screenDevice.isMobile ? (
            <div className={styles.footer_linkedin}>
              <IconButton color="primary" component="label" onClick={handleLinkedIn}>
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
        );
    }

    return (
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
    );
}
