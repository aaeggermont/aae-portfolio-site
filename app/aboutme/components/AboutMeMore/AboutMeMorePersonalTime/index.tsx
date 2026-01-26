import Image from 'next/image';
import styles from './aboutme-personal-time.module.scss';
import MyHobbies1 from './images/my-hobbies-1.jpg';
import MyHobbies2 from './images/my-hobbies-2.jpg';

export function AboutMeMorePersonalTime() {
  return <div className={styles.aboutmePersonalTime}>
    <div className={styles.aboutmePersonalTimeContent}>
      <div className={styles.aboutmePersonalTimeItem}>
        <div className={styles.aboutmePersonalTimeImg}>
          <Image src={MyHobbies1} alt='Technological Nature and Urbanism' />
        </div>
        <div>
          <h3 className={styles.aboutmePersonalTimeTitle}>Technological Nature and Urbanism</h3>
        </div>
      </div>
      <div className={styles.aboutmePersonalTimeItem}>
        <div className={styles.aboutmePersonalTimeImg}>
          <Image src={MyHobbies2} alt='Garrick, a film by Antonio Aranda Eggermont' />
        </div>
        <div>
          <h3 className={styles.aboutmePersonalTimeTitle}>Garrick, a film by Antonio Aranda Eggermont</h3>
        </div>
      </div>
    </div>
  </div>
}