'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from "next/link";
import { usePathname } from 'next/navigation';

import styles from './header.module.scss';

// MUI icons (same as before)
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import WorkIcon from "@mui/icons-material/Work";
import MailIcon from "@mui/icons-material/Mail";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { HeaderProps } from '.';
import { HeaderLogo } from './HeaderLogo';
import { clsx } from 'clsx';

export function HeaderMobile({
  isDark,
  logoFontColor: logoFontColorProp,
  resumeHref,
}: HeaderProps & { resumeHref: string }) {
  const pathname = usePathname();

  const [toggleMobileMenu, setToggleMobileMenu] = useState(false);

  let menuButtonBackground = "#496A8A";
  let hambMenuColor = "#ffffff";
  const logoFontColor = logoFontColorProp || "#496A8A";

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

  const isActive = (href: string) => {
    // adjust if you want "startsWith" instead of exact match
    return pathname === href;
  };

  return <>
    <div className={styles.mobile_wrapper}>
      <div className={styles.mobile_header}>
        <div className={styles.brand_logo}>
          <HeaderLogo
            width='120'
            height='20'
            color={logoFontColor}
          />
        </div>
        <div
          className={styles.menu_button}
          style={{ background: menuButtonBackground }}
          onClick={controlMobileMenu}
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
        </div>
      </div>

      {/* Side nav mobile menu */}
      <div
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
            width='60'
            height='20'
            color='#FFFFFF'
          />
          <p>Antonio Aranda Eggermont</p>
        </div>

        <ul className={styles.sidebar_menu}>
          <li className="menu-item">
            <Link
              href="/"
              className={isActive("/") ? styles.active_link : ''}
              onClick={closeMenu}
            >
              <span className={styles.menu_icon}>
                <HomeIcon style={{ height: "28px" }} />
              </span>
              Home
            </Link>
          </li>

          <li className="menu-item">
            <Link
              href="/aboutme"
              className={isActive("/aboutme") ? styles.active_link : ''}
              onClick={closeMenu}
            >
              <span className={styles.menu_icon}>
                <AccountCircleIcon style={{ height: "26px" }} />
              </span>
              About Me
            </Link>
          </li>

          <li className="menu-item">
            <Link
              href="/mywork"
              className={isActive("/mywork") ? styles.active_link : ''}
              onClick={closeMenu}
            >
              <span className={styles.menu_icon}>
                <WorkIcon />
              </span>
              My Work
            </Link>
          </li>

          <li className="menu-item">
            <a
              href={resumeHref}
              download="AAEResume"
              target="_blank"
              rel="noreferrer"
              onClick={closeMenu}
            >
              <span className={styles.menu_icon}>
                <Image
                  src="/icons/resume.svg"
                  alt="Resume icon"
                  width={24}
                  height={24}
                />
              </span>
              Resume
            </a>
          </li>

          <li className="menu-item">
            <Link
              href="/contact"
              className={isActive("/contact") ? styles.active_link : ''}
              onClick={closeMenu}
            >
              <span className={styles.menu_icon}>
                <MailIcon />
              </span>
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </div>
  </>
}