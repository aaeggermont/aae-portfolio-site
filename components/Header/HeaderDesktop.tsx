'use client';

import type { HeaderLogoColorProps, HeaderProps } from ".";
import Link from 'next/link';
import { HeaderLogo } from './HeaderLogo';
import { HEADER_NAV_ITEMS } from './navConfig';
import { useHeaderNav } from './useHeaderNav';

import styles from './header.module.scss';

export function HeaderDesktop({
  fontColor,
  logoPrimaryColor,
  logoAccentColor,
  resumeHref,
}: HeaderProps & HeaderLogoColorProps & { resumeHref: string }) {
  const { getHref, isActive } = useHeaderNav(resumeHref);

  return <>
    <div className={styles.site_menu}>
      <div className={styles.menu_wrapper}>
        <div className={styles.brand_logo}>
          <Link href='/'>
            <HeaderLogo
              width="140"
              height="37"
              primaryColor={logoPrimaryColor}
              accentColor={logoAccentColor}
            />
          </Link>
        </div>

        <div className={styles.primary_menu} id="menu">
          <nav className={styles.main_menu} aria-label="Main navigation">
            <ul>
              {HEADER_NAV_ITEMS.map((item) => {
                const href = getHref(item);
                const active = isActive(item.key);
                const linkStyle = { color: fontColor };

                if (item.download) {
                  return (
                    <li key={item.key} className={styles.menu_item}>
                      <a
                        href={href}
                        download="AAEResume"
                        target="_blank"
                        rel="noreferrer"
                        style={linkStyle}
                      >
                        {item.label}
                      </a>
                    </li>
                  );
                }

                return (
                  <li key={item.key} className={styles.menu_item}>
                    <Link
                      href={href}
                      className={active ? styles.active_link : ''}
                      style={linkStyle}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </>
}
