'use client';

import { useEffect, useState, type ReactNode } from 'react';
import Image from 'next/image';
import Link from "next/link";

import styles from './header.module.scss';

import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import WorkIcon from "@mui/icons-material/Work";
import MailIcon from "@mui/icons-material/Mail";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import type { HeaderLogoColorProps, HeaderProps } from ".";
import { HeaderLogo } from './HeaderLogo';
import { clsx } from 'clsx';
import { HEADER_NAV_ITEMS, type HeaderNavKey } from './navConfig';
import { useHeaderNav } from './useHeaderNav';

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

  const [toggleMobileMenu, setToggleMobileMenu] = useState(false);

  let menuButtonBackground = "#496A8A";
  let hambMenuColor = "#ffffff";

  if (isDark) {
    menuButtonBackground = "#ffffff";
    hambMenuColor = "#496A8A";
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
          style={{ background: menuButtonBackground }}
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

      {/* Side nav mobile menu */}
      <div
        id="mobile-main-nav"
        className={clsx([
          styles.sidenav_menu,
          toggleMobileMenu ? styles.active : ''
        ])
        }
      >
        <div className={styles.close_icon} onClick={closeMenu}>
          <ChevronLeftIcon className={styles.close_btn} />
          <Image
            src="/images/topbar-header/close_button_bg.svg"
            alt="Close background"
            width={70}
            height={70}
            className={styles.close_bg}
          />
        </div>

        <div className={styles.sidenav_header}>
          <HeaderLogo
            width="140"
            height="37"
            primaryColor={logoPrimaryColor}
            accentColor={logoAccentColor}
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
        </ul>
      </div>
    </div>
  </>
}
