"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

// MUI icons (same as before)
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import WorkIcon from "@mui/icons-material/Work";
import MailIcon from "@mui/icons-material/Mail";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

// Import your SCSS so classNames still work
import "./header.scss";

type HeaderProps = {
  isDark?: boolean;
  fontColor?: string;
  logoFontColor?: string;
};

export default function Header({
  isDark,
  fontColor: fontColorProp,
  logoFontColor: logoFontColorProp,
}: HeaderProps) {
  const [toggleMobileMenu, setToggleMobileMenu] = useState(false);
  const pathname = usePathname();

  let logoFontColor = logoFontColorProp || "#496A8A";
  let fontColor = fontColorProp || "#496A8A";
  let menuButtonBackground = "#496A8A";
  let hambMenuColor = "#ffffff";

  if (isDark) {
    menuButtonBackground = "#ffffff";
    hambMenuColor = "#496A8A";
    fontColor = "#ffffff";
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

  const resumeHref = "/resume/AntonioEggermontResume-2024.pdf";

  return (
    <header className="header_area transparent_header">
      <div className="container">
        {/* Mobile header */}
        <div className="mobile_wrapper">
          <div className="mobile_header">
            <div className="row align-items-center">
              <div className="col-6">
                <div className="brand_logo">
                  <Image
                    src="/images/topbar-header/AAELogo.svg"
                    alt="AAE Logo"
                    width={120}
                    height={20}
                    style={{ height: "20px", width: "auto", color: logoFontColor }}
                  />
                </div>
              </div>
              <div className="col-6">
                <div
                  className="menu_button"
                  style={{ background: menuButtonBackground }}
                >
                  <div
                    className={
                      toggleMobileMenu ? "menu_icon active" : "menu_icon"
                    }
                    onClick={controlMobileMenu}
                  >
                    <span style={{ background: hambMenuColor }} />
                    <span style={{ background: hambMenuColor }} />
                    <span style={{ background: hambMenuColor }} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Side nav mobile menu */}
          <div
            className={
              toggleMobileMenu ? "sidenav_menu active" : "sidenav_menu"
            }
          >
            <div className="close_icon" onClick={closeMenu}>
              <ChevronLeftIcon className="close_btn" />
              <Image
                src="/shapes/close_button_bg.svg"
                alt="Close background"
                width={70}
                height={70}
                className="close_bg"
              />
            </div>

            <div className="sidenav_header">
              <Image
                src="/images/topbar-header/AAELogo.svg"
                alt="AAE Logo"
                width={120}
                height={20}
                style={{ height: "20px", width: "auto" }}
              />
              <p>Antonio Aranda Eggermont</p>
            </div>

            <ul className="sidebar-menu">
              <li className="menu-item">
                <Link
                  href="/"
                  className={isActive("/") ? "active_link" : "none"}
                  onClick={closeMenu}
                >
                  <span className="menu-icon">
                    <HomeIcon style={{ height: "28px" }} />
                  </span>
                  Home
                </Link>
              </li>

              <li className="menu-item">
                <Link
                  href="/aboutme"
                  className={isActive("/aboutme") ? "active_link" : "none"}
                  onClick={closeMenu}
                >
                  <span className="menu-icon">
                    <AccountCircleIcon style={{ height: "26px" }} />
                  </span>
                  About Me
                </Link>
              </li>

              <li className="menu-item">
                <Link
                  href="/mywork"
                  className={isActive("/mywork") ? "active_link" : "none"}
                  onClick={closeMenu}
                >
                  <span className="menu-icon">
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
                  <span className="menu-icon">
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
                  className={isActive("/contact") ? "active_link" : "none"}
                  onClick={closeMenu}
                >
                  <span className="menu-icon">
                    <MailIcon />
                  </span>
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Desktop header */}
        <div className="site_menu">
          <div className="row align-items-center">
            <div className="row align-items-center">
              <div className="col-lg-2">
                <div className="brand_logo">
                  <Image
                    src="/images/topbar-header/AAELogo.svg"
                    alt="AAE Logo"
                    width={150}
                    height={30}
                    style={{ color: logoFontColor }}
                  />
                </div>
              </div>

              <div className="col-lg-10">
                <div className="primary_menu" id="menu">
                  <nav className="main_menu">
                    <ul>
                      <li className="menu-item">
                        <Link
                          href="/"
                          className={isActive("/") ? "active_link" : "none"}
                          style={{ color: fontColor }}
                        >
                          Home
                        </Link>
                      </li>

                      <li className="menu-item">
                        <Link
                          href="/aboutme"
                          className={
                            isActive("/aboutme") ? "active_link" : "none"
                          }
                          style={{ color: fontColor }}
                        >
                          About Me
                        </Link>
                      </li>

                      <li className="menu-item">
                        <Link
                          href="/mywork"
                          className={
                            isActive("/mywork") ? "active_link" : "none"
                          }
                          style={{ color: fontColor }}
                        >
                          My Work
                        </Link>
                      </li>

                      <li className="menu-item">
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

                      <li className="menu-item">
                        <Link
                          href="/contact"
                          className={
                            isActive("/contact") ? "active_link" : "none"
                          }
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
          </div>
        </div>
      </div>
    </header>
  );
}
