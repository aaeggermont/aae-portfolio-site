'use client';
import Image from 'next/image';
import styles from './timeline.module.scss';
import { StaticImageData } from 'next/image';

export type PositionProps = {
  year?: string;
  location: string;
  position: string;
  details: string;
}

export type TimelinePeriodProps = {
  logo: StaticImageData;
  companyName?: string;
  year?: string;
  degree?: string;
  location?: string;
  school?: string;
  details?: string;
  positions?: PositionProps[];
}

export type TimelineProps = {
  data: TimelinePeriodProps[];
}

export function Timeline({ data }: TimelineProps) {
  return <div className={styles.timeline}>
    {
      (data || []).map((val, i) =>
        <div
          key={`${i}-experience`}
          className={styles.timelineContainer}
          data-aos="fade-up"
          data-aos-duration="700">
          <div className={styles.timelinePeriodMobile}>
            <div className={styles.timelinePeriod_startDot}></div>
            <div className={styles.timelinePeriod_line}></div>
            {/* <div className={styles.timelinePeriod--end-dot"></div> */}
          </div>
          <div className={styles.timelineImage}>
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
          </div>

          {
            val.positions?.map((position, indexPos) => (
              <div key={`experience-info${indexPos}`}>
                  {
                    indexPos > 0
                      ? <>
                        <div className={styles.timelinePeriodMobile}>
                          <div className={styles.timelinePeriod_startDot}></div>
                          <div className={styles.timelinePeriod_line}></div>
                          <div className={styles.timelinePeriod_endDot}></div>
                        </div>
                      </>
                      : null
                  }
                  <div
                    className={styles.timelineInfo}>
                    <div className={styles.timelineCompany}>
                      <h5 className={styles.timelineCompanyPosition}>{position.position}</h5>
                      <h5 className={styles.timelineCompanyName}>{val.companyName}</h5>
                      <h5 className={styles.timelineCompanyLocation}> {position.location}</h5>
                      <div>{position.year} </div>
                    </div>
                    <div className={styles.timelinePeriod}>
                      { (indexPos === 0) ? <div className={styles.timelinePeriod_startDot}></div> : null }
                      <div className={styles.timelinePeriod_line}></div>
                      <div className={styles.timelinePeriod_endDot}></div>
                    </div>
                    <div className={styles.timelineDetails}>
                      <p>{position.details}</p>
                    </div>
                  </div>
              </div>
            ))
          }
        </div>
      )
    }
  </div>;
}