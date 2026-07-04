'use client';

import { useHomeNav } from "@/lib/home/useHomeNav";
import type { HeaderLogoColorProps, HeaderProps } from ".";
import Link from "next/link";
import { HeaderLogo } from "./HeaderLogo";

import styles from "./header.module.scss";

export function HeaderDesktop({
  fontColor,
  logoPrimaryColor,
  logoAccentColor,
  resumeHref,
}: HeaderProps & HeaderLogoColorProps & { resumeHref: string }) {
  const { getHref, isActive } = useHomeNav();

  return <>
    <div className={styles.site_menu}>
      <div className={styles.menu_wrapper}>
        <div className={styles.brand_logo}>
          <Link href={getHref("home")}>
            <HeaderLogo
              width="190"
              height="50"
              primaryColor={logoPrimaryColor}
              accentColor={logoAccentColor}
            />
          </Link>
        </div>

        <div className="primary_menu" id="menu">
          <nav className={styles.main_menu}>
            <ul>
              <li className={styles.menu_item}>
                <Link
                  href={getHref("home")}
                  className={isActive("home") ? styles.active_link : ""}
                  style={{ color: fontColor }}
                >
                  Home
                </Link>
              </li>

              <li className={styles.menu_item}>
                <Link
                  href={getHref("about")}
                  className={isActive("about") ? styles.active_link : ""}
                  style={{ color: fontColor }}
                >
                  About Me
                </Link>
              </li>

              <li className={styles.menu_item}>
                <Link
                  href={getHref("work")}
                  className={isActive("work") ? styles.active_link : ""}
                  style={{ color: fontColor }}
                >
                  My Work
                </Link>
              </li>

              <li className={styles.menu_item}>
                <a
                  href={resumeHref}
                  download="AAEResume"
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: fontColor }}
                >
                  Resume
                </a>
              </li>

              <li className={styles.menu_item}>
                <Link
                  href={getHref("contact")}
                  className={isActive("contact") ? styles.active_link : ""}
                  style={{ color: fontColor }}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </>
}
