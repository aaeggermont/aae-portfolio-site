'use client'

import IconButton from '@mui/material/IconButton';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

import { useResponsive } from '@/lib/responsive/ResponsiveQueryProvider';
import { FooterLogo } from './FooterLogo';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './footer.module.scss';

type FooterProps = {
  isDark?: boolean;
  logoFontColor?: string;
  fontColor?: string;
  /** Less vertical padding when rendered under home ContactMe */
  dockedInPanel?: boolean;
};

export function Footer(props: FooterProps = {}) {
    const screenDevice = useResponsive();
    const pathname = usePathname();

    let logoFontColor = props.logoFontColor || '#496A8A';
    let fontColor = props.fontColor || '#496A8A';

    if (props.isDark) {
      fontColor = '#ffffff';
      logoFontColor = '#ffffff';
    }

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
                href={link.path}
                style={{
                    color: fontColor,
                }}>
                { link.name }
            </Link>
        </span>
    );

    const handleLinkedIn = () => {
        window.open('https://www.linkedin.com/in/antonio-aranda-eggermont-23aa7b8/', '_blank');
    };

    const docked = props.dockedInPanel === true;

    if (screenDevice.isMobile) {
        return (
            <div
              style={{ paddingTop: docked ? "1rem" : "5rem" }}
              className="container"
            >
                <div
                    className={styles['footer-container']}
                    style={{
                        borderTopColor: fontColor,
                        ...(docked
                          ? { marginTop: "0.35rem", marginBottom: "0.35rem" }
                          : {}),
                    }}
                >
                    <div className={styles['navigation-section']}>
                        <div
                            className={styles['navigation-title']}
                            style={{
                                color: fontColor,
                            }}>
                            Navigation
                        </div>
                        { MenuLinks }
                    </div>
                    <div className={styles['logo-section']}>
                        <FooterLogo color={logoFontColor} width="55px" height="20px" />
                    </div>
                    <div className={styles['copyright-section']}>
                        <span style={{
                            color: fontColor,
                        }}> Antonio Aranda Eggermont - All Rights Serserved </span>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div
              className="container"
              style={docked ? { paddingTop: "0.5rem" } : undefined}
            >
                <div
                  className={styles['footer-container']}
                  style={
                    docked
                      ? { marginTop: "0.35rem", marginBottom: "0.35rem" }
                      : undefined
                  }
                >
                    <div className={styles['logo-section']}>
                        <FooterLogo color={logoFontColor} width="55px" height="20px" />

                        <div className="contact-area">
                            <IconButton color="primary" component="label" onClick={handleLinkedIn}>
                                <LinkedInIcon />
                            </IconButton>
                        </div>
                    </div>
                    <div className={styles['copyright-section']}>
                        <span style={{
                            color: fontColor,
                        }}> Antonio Aranda Eggermont - All Rights Serserved </span>
                    </div>
                    <div className={styles['navigation-section']}>
                        <div className={styles['navigation-title']}> Navigation</div>
                        { MenuLinks }
                    </div>
                </div>
            </div>
        );
    }
}
