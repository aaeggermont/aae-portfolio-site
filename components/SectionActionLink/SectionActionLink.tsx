import Link from "next/link";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import styles from "./section-action-link.module.scss";

type SectionActionLinkProps = {
  href: string;
  label: string;
  tone: "amber" | "navy";
};

export function SectionActionLink({ href, label, tone }: SectionActionLinkProps) {
  const toneClass = tone === "amber" ? styles.amber : styles.navy;

  return (
    <Link href={href} className={`${styles.link} ${toneClass}`}>
      <span>{label}</span>
      <ArrowForwardIcon aria-hidden className={styles.icon} />
    </Link>
  );
}
