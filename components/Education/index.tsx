import Image from 'next/image';
import styles from './education.module.scss';
import { TimelineProps } from '@/components/Timeline';

export function Education ({ data = [] }: TimelineProps) {
  return <div className={styles.educationContainer}>
      {data.map((val, i) => (
        <div
          key={`education-${i}`}
          data-aos="fade-up"
          data-aos-duration="700"
          className={styles.educationWrapper}>
          <Image
            src={val.logo}
            alt="icon"
            style = {{
              width: '5rem',
              height: '5rem',
              paddingTop: '1px',
              borderRadius: '1rem'
            }}
          />

          <div className={styles.educationInfo}>
            <h5 className={styles.educationDegreeTitle}> {val.degree} </h5>
            <span className={styles.educationSchoolName}>{val.school}</span>
            <h5 className={styles.educationLocation}> {val.location}</h5>
            <div className={styles.educationPeriodBackground}>{val.year} </div>
            <p className='education-details'>{val.details}</p>
          </div>
        </div>
      ))}
  </div>
}
