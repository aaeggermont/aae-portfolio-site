import Image, { StaticImageData } from 'next/image';
import certifications from './images/certifications.png';
import education from './images/education.png';
import personal from './images/personal.png';
import professional_experience from './images/professional_experience.png';
import styles from './about-me-card.module.scss'
import clsx from 'clsx';

export enum AboutMeMoreCardType {
  professional_experience = 'professional_experience',
  education = 'education',
  certifications = 'certifications',
  personal = 'personal',
};

const TypeCardImg: Record<AboutMeMoreCardType, StaticImageData> = {
  certifications,
  education,
  personal,
  professional_experience,
} as const;

export const availableCards = [
  {
    type: AboutMeMoreCardType.professional_experience,
    title: 'Professional Experience'
  },
  {
    type: AboutMeMoreCardType.education,
    title: 'Education'
  },
  {
    type: AboutMeMoreCardType.certifications,
    title: 'Certifications'
  },
  {
    type: AboutMeMoreCardType.personal,
    title: 'When I am not working...'
  },
] as const;

export type AboutMeMoreCardProps = {
  type: null | AboutMeMoreCardType;
  title: string;
  selected: boolean;
  onClick: (type: AboutMeMoreCardType | null) => void;
}

export function AboutMeMoreCard({
  type = null,
  title = '',
  selected = false,
  onClick
}: AboutMeMoreCardProps) {
  const typeCardSelected = (type && TypeCardImg[type]) ?? '';

  const aboutMeCardStyle = clsx([styles.aboutmeCard, selected ? styles.selected : ''])

  return <>
    <div
      className={aboutMeCardStyle}
      onClick={() => onClick(type)}>
      <div className={styles.aboutmeCardImage}>
        <Image
          src={typeCardSelected}
          alt={type as string}
        />
      </div>
      <h3 className={styles.aboutmeCardTitle}>
        {title}
      </h3>
    </div>
  </>
}