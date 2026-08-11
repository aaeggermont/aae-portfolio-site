"use client";

import { Box } from "@mui/material";
import ProjectImage from "@/lib/media/ProjectImage";
import { breakpointMediaQuery, breakpointPx } from "@/lib/responsive/breakpoints";
import {
  cssLengthToPx,
  getPanelInnerWidthPx,
  LAYOUT_DIMENSIONS,
} from "../layoutConfig";
import styles from "./ArExperienceWireframeSpec.module.scss";

const DESKTOP_UP_MQ = breakpointMediaQuery.desktopUp;
const TABLET_UP_MQ = breakpointMediaQuery.tabletUp;

/** Legend badge — circle + white numeral (yellow markers live on the phone asset). */
const BADGE_BG = "#2F6C9D";
const BADGE_TEXT = "#ffffff";

/** Phone + numbered markers asset (callout copy is rendered in code). */
const PHONE_INTRINSIC_WIDTH = 780;
const PHONE_INTRINSIC_HEIGHT = 1600;

const PHONE_SIZES = [
  `(max-width: ${breakpointPx.mobileMax}px) calc(100vw - ${
    cssLengthToPx(LAYOUT_DIMENSIONS.mobile.margin) * 2
  }px - 48px)`,
  `(max-width: ${breakpointPx.tabletMax}px) min(42vw, 280px)`,
  `${Math.min(300, getPanelInnerWidthPx("desktop") * 0.28)}px`,
].join(", ");

export type AnnotatedPhoneCallout = {
  number: string;
  title: string;
  description: string;
};

function CalloutBadge({ number }: { number: string }) {
  return (
    <span
      aria-hidden
      className={styles.badge}
      style={{ backgroundColor: BADGE_BG, color: BADGE_TEXT }}
    >
      {number}
    </span>
  );
}

function CalloutItem({ callout }: { callout: AnnotatedPhoneCallout }) {
  return (
    <li className={styles.callout}>
      <div className={styles.calloutHeader}>
        <CalloutBadge number={callout.number} />
        <h4 className={styles.title}>{callout.title}</h4>
      </div>
      <p className={styles.description}>{callout.description}</p>
    </li>
  );
}

function CalloutColumn({
  callouts,
  side,
}: {
  callouts: AnnotatedPhoneCallout[];
  side: "left" | "right";
}) {
  return (
    <Box
      component="ul"
      className={`${styles.column} ${styles[`column--${side}`]}`}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: { xs: 2.75, md: 3.25, lg: 3.75 },
        [TABLET_UP_MQ]: {
          flex: "1 1 0",
          minWidth: 0,
        },
        [DESKTOP_UP_MQ]: {
          flex: "1 1 0",
          minWidth: 0,
          maxWidth: 280,
        },
      }}
    >
      {callouts.map((callout) => (
        <CalloutItem key={callout.number} callout={callout} />
      ))}
    </Box>
  );
}

export type AnnotatedPhoneSpecProps = {
  objectPath: string;
  alt: string;
  leftCallouts: AnnotatedPhoneCallout[];
  rightCallouts: AnnotatedPhoneCallout[];
  ariaLabel?: string;
};

/**
 * Phone mockup with numbered markers (in the asset) plus HTML callout labels.
 */
export function AnnotatedPhoneSpec({
  objectPath,
  alt,
  leftCallouts,
  rightCallouts,
  ariaLabel = "Annotated phone mockup",
}: AnnotatedPhoneSpecProps) {
  return (
    <Box className={styles.root} aria-label={ariaLabel}>
      <Box
        className={styles.layout}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          gap: { xs: 3.5, md: 2.5 },
          [TABLET_UP_MQ]: {
            flexDirection: "row",
            alignItems: "center",
            gap: 3.5,
          },
          [DESKTOP_UP_MQ]: {
            gap: 4.5,
            alignItems: "center",
          },
        }}
      >
        <CalloutColumn callouts={leftCallouts} side="left" />

        <Box
          className={styles.phone}
          sx={{
            flex: "0 0 auto",
            width: "100%",
            maxWidth: { xs: 240, sm: 260, md: 250, lg: 280 },
            mx: "auto",
            [TABLET_UP_MQ]: {
              mx: 0,
            },
          }}
        >
          <ProjectImage
            objectPath={objectPath}
            alt={alt}
            width={PHONE_INTRINSIC_WIDTH}
            height={PHONE_INTRINSIC_HEIGHT}
            unoptimized
            sizes={PHONE_SIZES}
            style={{
              display: "block",
              width: "100%",
              height: "auto",
            }}
          />
        </Box>

        <CalloutColumn callouts={rightCallouts} side="right" />
      </Box>
    </Box>
  );
}

export default AnnotatedPhoneSpec;
