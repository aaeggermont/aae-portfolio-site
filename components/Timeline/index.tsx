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

export function splitDetailParagraphs(details: string): string[] {
  return details
    .split(/\n\s*\n/)
    .map((part) => part.replace(/\s+/g, ' ').trim())
    .filter(Boolean);
}

export function Timeline({ data }: TimelineProps) {
  return (
    <div className={styles.timeline}>
      {(data || []).map((val, i) => {
        const positions = val.positions ?? [];
        const lastPosIndex = positions.length - 1;

        return (
          <div
            key={`${i}-experience`}
            className={styles.timelineContainer}
            data-aos="fade-up"
            data-aos-duration="700"
          >
            {positions.map((position, indexPos) => {
              const isFirst = indexPos === 0;
              const isLast = indexPos === lastPosIndex;

              return (
                <div
                  key={`experience-info${indexPos}`}
                  className={styles.timelineRow}
                >
                  <div className={styles.timelineRail}>
                    {isFirst ? (
                      <div className={styles.timelineImage}>
                        <Image
                          src={val.logo}
                          alt={
                            val.companyName
                              ? `${val.companyName} logo`
                              : 'Company logo'
                          }
                          width={64}
                          height={64}
                          className={styles.timelineLogoImg}
                        />
                      </div>
                    ) : (
                      <div className={styles.timelinePeriod_startDot} />
                    )}
                    <div className={styles.timelinePeriod_line} />
                    {isLast ? (
                      <div className={styles.timelinePeriod_endDot} />
                    ) : null}
                  </div>

                  <div className={styles.timelineContent}>
                    <div className={styles.timelineCompany}>
                      <h5 className={styles.timelineCompanyPosition}>
                        {position.position}
                      </h5>
                      <h5 className={styles.timelineCompanyName}>
                        {val.companyName}
                      </h5>
                      <h5 className={styles.timelineCompanyLocation}>
                        {position.location}
                      </h5>
                      {position.year ? (
                        <div className={styles.timelineCompanyYear}>
                          {position.year}
                        </div>
                      ) : null}
                    </div>
                    <div className={styles.timelineDetails}>
                      {splitDetailParagraphs(position.details).map(
                        (paragraph, paragraphIndex) => (
                          <p key={`details-${indexPos}-${paragraphIndex}`}>
                            {paragraph}
                          </p>
                        ),
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
