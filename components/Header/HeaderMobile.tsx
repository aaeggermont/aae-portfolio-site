'use client';

import { useEffect, useState, type ReactNode } from 'react';
import Image from 'next/image';
import Link from "next/link";

import styles from './header.module.scss';

import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import WorkIcon from "@mui/icons-material/Work";
import MailIcon from "@mui/icons-material/Mail";
import LogoutIcon from "@mui/icons-material/Logout";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import type { HeaderLogoColorProps, HeaderProps } from ".";
import { HeaderLogo } from './HeaderLogo';
import { clsx } from 'clsx';
import { HEADER_NAV_ITEMS, type HeaderNavKey } from './navConfig';
import { useHeaderNav } from './useHeaderNav';
import {
  signOutEverywhere,
  useHeaderSignOutVisibility,
} from './useHeaderSignOut';
import {
  HEADER_MOBILE_NAVY,
  HEADER_SIDEBAR_LOGO_ACCENT,
  HEADER_SIDEBAR_LOGO_PRIMARY,
  headerSidebarTypographyStyle,
} from './headerTheme';

const CLOSE_TAB_PATH =
  "M15.249 12.7734V0H0V109H15.249V95.375C15.249 91.9688 18.6297 86.7397 21.1792 84.3047C23.8539 81.75 26.2688 80.3002 28.8037 77.4922C32.7806 73.0866 35.2187 69.4454 37.2753 63.8672C39.0601 59.0263 39.0605 56.2556 38.9696 51.0938C38.8844 46.2524 37.7177 43.5116 35.581 39.1719C33.585 35.118 31.7358 33.2358 28.8037 29.8047C26.0598 26.5939 21.1792 22.1406 21.1792 22.1406C21.1792 22.1406 15.249 17.1094 15.249 12.7734Z";

const MOBILE_NAV_ICONS: Record<HeaderNavKey, ReactNode> = {
  home: <HomeIcon style={{ height: "28px" }} />,
  about: <AccountCircleIcon style={{ height: "26px" }} />,
  work: <WorkIcon />,
  resume: (
    <Image
      src="/icons/resume.svg"
      alt=""
      width={24}
      height={24}
      aria-hidden
    />
  ),
  contact: <MailIcon />,
};

export function HeaderMobile({
  isDark,
  logoPrimaryColor,
  logoAccentColor,
  resumeHref,
}: HeaderProps & HeaderLogoColorProps & { resumeHref: string }) {
  const { getHref, isActive } = useHeaderNav(resumeHref);
  const { ready: signOutReady, showSignOut } = useHeaderSignOutVisibility();

  const [toggleMobileMenu, setToggleMobileMenu] = useState(false);

  let hambMenuColor = "#ffffff";

  if (isDark) {
    hambMenuColor = HEADER_MOBILE_NAVY;
  }

  const controlMobileMenu = () => {
    setToggleMobileMenu((prev) => !prev);
  };

  const closeMenu = () => {
    setToggleMobileMenu(false);
  };

  useEffect(() => {
    if (!toggleMobileMenu) {
      return;
    }

    const previousOverflow = document.body.style.overflow;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setToggleMobileMenu(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [toggleMobileMenu]);

  return <>
    <div className={styles.mobile_wrapper}>
      <div className={styles.mobile_header}>
        <div className={styles.brand_logo}>
          <Link href='/' onClick={closeMenu}>
            <HeaderLogo
              width="140"
              height="37"
              primaryColor={logoPrimaryColor}
              accentColor={logoAccentColor}
            />
          </Link>
        </div>
        <button
          type="button"
          className={styles.menu_button}
          data-menu-inverse={isDark ? "true" : undefined}
          onClick={controlMobileMenu}
          aria-expanded={toggleMobileMenu}
          aria-controls="mobile-main-nav"
          aria-label={toggleMobileMenu ? "Close menu" : "Open menu"}
        >
          <div
            className={clsx([
              styles.menu_icon,
              toggleMobileMenu
                ? styles.active
                : ''
            ])
            }
          >
            <span style={{ background: hambMenuColor }} />
            <span style={{ background: hambMenuColor }} />
            <span style={{ background: hambMenuColor }} />
          </div>
        </button>
      </div>

      {toggleMobileMenu && (
        <button
          type="button"
          className={styles.sidenav_backdrop}
          aria-label="Close menu"
          onClick={closeMenu}
        />
      )}

      <div
        id="mobile-main-nav"
        className={clsx([
          styles.sidenav_menu,
          toggleMobileMenu ? styles.active : ''
        ])}
        style={headerSidebarTypographyStyle}
      >
        <div className={styles.close_icon} onClick={closeMenu}>
          <ChevronLeftIcon className={styles.close_btn} />
          <svg
            viewBox="0 0 39 109"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={styles.close_bg}
            aria-hidden="true"
          >
            <path d={CLOSE_TAB_PATH} fill={HEADER_MOBILE_NAVY} />
          </svg>
        </div>

        <div className={styles.sidenav_body}>
          <div className={styles.sidenav_header}>
            <HeaderLogo
              width="140"
              height="37"
              primaryColor={HEADER_SIDEBAR_LOGO_PRIMARY}
              accentColor={HEADER_SIDEBAR_LOGO_ACCENT}
            />
            <p>Antonio Aranda Eggermont</p>
          </div>

          <ul className={styles.sidebar_menu}>
            {HEADER_NAV_ITEMS.map((item) => {
              const href = getHref(item);
              const active = isActive(item.key);
              const icon = MOBILE_NAV_ICONS[item.key];

              if (item.download) {
                return (
                  <li key={item.key} className="menu-item">
                    <a
                      href={href}
                      download="AAEResume"
                      target="_blank"
                      rel="noreferrer"
                      onClick={closeMenu}
                    >
                      <span className={styles.menu_icon}>{icon}</span>
                      {item.label}
                    </a>
                  </li>
                );
              }

              return (
                <li key={item.key} className="menu-item">
                  <Link
                    href={href}
                    className={active ? styles.active_link : ''}
                    onClick={closeMenu}
                  >
                    <span className={styles.menu_icon}>{icon}</span>
                    {item.label}
                  </Link>
                </li>
              );
            })}
            {signOutReady && showSignOut ? (
              <li className="menu-item">
                <button
                  type="button"
                  className={styles.header_sign_out_mobile}
                  onClick={() => {
                    closeMenu();
                    void signOutEverywhere();
                  }}
                >
                  <span className={styles.menu_icon} aria-hidden>
                    <LogoutIcon style={{ height: "26px" }} />
                  </span>
                  Sign out
                </button>
              </li>
            ) : null}
          </ul>
        </div>
      </div>
    </div>
  </>
}
