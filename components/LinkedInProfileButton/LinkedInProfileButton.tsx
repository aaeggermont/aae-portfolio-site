"use client";

import styles from "./linkedin-profile-button.module.scss";

type LinkedInProfileButtonProps = {
  onClick: () => void;
  ariaLabel?: string;
};

export function LinkedInProfileButton({
  onClick,
  ariaLabel = "Visit my LinkedIn profile",
}: LinkedInProfileButtonProps) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
      className={styles.linkedinButton}
    >
      <span className={styles.linkedinIcon} aria-hidden="true">
        <svg
          viewBox="0 0 24 24"
          role="img"
          focusable="false"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="0"
            y="0"
            width="24"
            height="24"
            rx="4"
            ry="4"
            fill="none"
          />
          <path
            fill="#ffffff"
            d="M6.5 7.5C5.67 7.5 5 6.83 5 6s.67-1.5 1.5-1.5S8 5.17 8 6s-.67 1.5-1.5 1.5zM6 9h3v9H6zM10.5 9h2.8v1.23h.04c.39-.74 1.35-1.52 2.78-1.52 2.97 0 3.52 1.96 3.52 4.51V18h-3v-4.04c0-.96-.02-2.19-1.34-2.19-1.34 0-1.55 1.05-1.55 2.12V18h-3z"
          />
        </svg>
      </span>
    </button>
  );
}
