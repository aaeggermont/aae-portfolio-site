import Image from 'next/image';
import styles from './education.module.scss';
import { splitDetailParagraphs, type TimelineProps } from '@/components/Timeline';

export function Education ({ data = [] }: TimelineProps) {
  return <div className={styles.educationContainer}>
      {data.map((val, i) => (
        <div
          key={`education-${i}`}
          data-aos="fade-up"
          data-aos-duration="700"
          className={styles.educationWrapper}>
          <div className={styles.educationLogo}>
            <Image
              src={val.logo}
              alt={val.school ? `${val.school} logo` : 'School logo'}
              width={64}
              height={64}
              className={styles.educationLogoImg}
            />
          </div>

          <div className={styles.educationInfo}>
            <h5 className={styles.educationDegreeTitle}> {val.degree} </h5>
            <span className={styles.educationSchoolName}>{val.school}</span>
            <h5 className={styles.educationLocation}> {val.location}</h5>
            <div className={styles.educationDetails}>
              {splitDetailParagraphs(val.details ?? '').map((paragraph, paragraphIndex) => (
                <p key={`education-details-${i}-${paragraphIndex}`}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      ))}
  </div>
}
