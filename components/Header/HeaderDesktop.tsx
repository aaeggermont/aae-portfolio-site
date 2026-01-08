import { usePathname } from 'next/navigation';
import { HeaderProps } from '.';
import Link from 'next/link';
import { HeaderLogo } from './HeaderLogo';

import styles from './header.module.scss';

export function HeaderDesktop({
  fontColor,
  logoFontColor,
  resumeHref,
}: HeaderProps & { resumeHref: string }) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    // adjust if you want "startsWith" instead of exact match
    return pathname === href;
  };

  return <>
    <div className={styles.site_menu}>
      <div className={styles.menu_wrapper}>
        <div className={styles.brand_logo}>
          <Link href='/'>
            <HeaderLogo
              width='100'
              height='30'
              color={logoFontColor || ''}
            />
          </Link>
        </div>

        <div className="primary_menu" id="menu">
          <nav className={styles.main_menu}>
            <ul>
              <li className={styles.menu_item}>
                <Link
                  href="/"
                  className={isActive("/") ? styles.active_link : ''}
                  style={{ color: fontColor }}
                >
                  Home
                </Link>
              </li>

              <li className={styles.menu_item}>
                <Link
                  href="/aboutme"
                  className={
                    isActive("/aboutme") ? styles.active_link : ''
                  }
                  style={{ color: fontColor }}
                >
                  About Me
                </Link>
              </li>

              <li className={styles.menu_item}>
                <Link
                  href="/mywork"
                  className={
                    isActive("/mywork") ? styles.active_link : ''
                  }
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
                  href="/contact"
                  className={
                    isActive("/contact") ? styles.active_link : ''
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
  </>
}