"use client";

import SearchIcon from "@mui/icons-material/Search";
import "./ARMobileScreen.scss";
import ProjectImage from "@/lib/media/ProjectImage";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ARMobileScreenProps {
  alt: string;
  objectPath: string;
  title: string;
  /** Short footer copy under the mockup. */
  description: string;
  onExpand: () => void;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const AR_MOBILE_SCREEN_INTRINSIC_WIDTH = 434;
const AR_MOBILE_SCREEN_INTRINSIC_HEIGHT = 884;

// ─── Component ────────────────────────────────────────────────────────────────

export function ARMobileScreen({
  alt,
  objectPath,
  title,
  description,
  onExpand,
}: ARMobileScreenProps) {
  return (
    <div className="ar-mobile-screen-container">
      <button
        type="button"
        className="ar-mobile-screen-container__trigger"
        onClick={onExpand}
        aria-label={`Expand ${title}`}
      >
        <ProjectImage
          objectPath={objectPath}
          alt={alt}
          width={AR_MOBILE_SCREEN_INTRINSIC_WIDTH}
          height={AR_MOBILE_SCREEN_INTRINSIC_HEIGHT}
          className="ar-mobile-screen-container__image"
          style={{
            alignSelf: "center",
            width: "75%",
            height: "auto",
            cursor: "zoom-in",
          }}
        />
      </button>
      <span className="title">{title}</span>
      <p className="description">{description}</p>
      <button type="button" className="tap-hint" onClick={onExpand}>
        <SearchIcon sx={{ fontSize: 16, mr: 0.5 }} aria-hidden />
        Tap to expand
      </button>
    </div>
  );
}

export default ARMobileScreen;
