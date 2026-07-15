import { db } from "@/firebase";
import { doc, onSnapshot } from "firebase/firestore";

import {
  experienceTrainingFallback,
  type EducationEntryData,
  type ExperienceEntryData,
  type ExperienceLogoKey,
  type ExperiencePositionData,
  type ExperienceTrainingData,
} from "@/app/aboutme/data/experience-training-data";

export const ABOUT_PAGE_COLLECTION = "about_page";
export const EXPERIENCE_TRAINING_DOC_ID = "experience_training";

const LOGO_KEYS = new Set<ExperienceLogoKey>([
  "disney",
  "akamai",
  "cbs",
  "sony",
  "harvard",
  "uw",
  "emerson",
  "mit",
]);

function asString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function asNumber(value: unknown, fallback = 0): number {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}

function asLogoKey(value: unknown, fallback: ExperienceLogoKey): ExperienceLogoKey {
  const key = asString(value) as ExperienceLogoKey;
  return LOGO_KEYS.has(key) ? key : fallback;
}

function parsePosition(raw: unknown): ExperiencePositionData | null {
  if (!raw || typeof raw !== "object") return null;
  const record = raw as Record<string, unknown>;
  const position = asString(record.position);
  const location = asString(record.location);
  const details = asString(record.details);
  if (!position || !location || !details) return null;

  const year = asString(record.year);
  return {
    ...(year ? { year } : {}),
    position,
    location,
    details,
  };
}

function parseExperienceEntry(raw: unknown): ExperienceEntryData | null {
  if (!raw || typeof raw !== "object") return null;
  const record = raw as Record<string, unknown>;
  const companyName = asString(record.companyName);
  if (!companyName) return null;

  const positionsRaw = Array.isArray(record.positions) ? record.positions : [];
  const positions = positionsRaw
    .map(parsePosition)
    .filter((p): p is ExperiencePositionData => p !== null);

  if (positions.length === 0) return null;

  const year = asString(record.year);
  return {
    logoKey: asLogoKey(record.logoKey, "disney"),
    companyName,
    ...(year ? { year } : {}),
    positions,
  };
}

function parseEducationEntry(raw: unknown): EducationEntryData | null {
  if (!raw || typeof raw !== "object") return null;
  const record = raw as Record<string, unknown>;

  const degree = asString(record.degree);
  const school = asString(record.school);
  const location = asString(record.location);
  const year = asString(record.year);
  const details = asString(record.details);
  if (!degree || !school || !location || !year || !details) return null;

  return {
    logoKey: asLogoKey(record.logoKey, "uw"),
    year,
    degree,
    location,
    school,
    details,
  };
}

export function parseExperienceTrainingDocument(
  data: Record<string, unknown>,
): ExperienceTrainingData {
  const sectionTitle =
    asString(data.sectionTitle) || experienceTrainingFallback.sectionTitle;

  const experienceRaw = Array.isArray(data.experience) ? data.experience : [];
  const educationRaw = Array.isArray(data.education) ? data.education : [];
  const certificationRaw = Array.isArray(data.certification)
    ? data.certification
    : [];

  const experience = experienceRaw
    .map(parseExperienceEntry)
    .filter((e): e is ExperienceEntryData => e !== null);
  const education = educationRaw
    .map(parseEducationEntry)
    .filter((e): e is EducationEntryData => e !== null);
  const certification = certificationRaw
    .map(parseEducationEntry)
    .filter((e): e is EducationEntryData => e !== null);

  if (experience.length === 0 && education.length === 0 && certification.length === 0) {
    throw new Error(
      "Experience training document has no valid experience, education, or certification entries",
    );
  }

  return {
    version: asNumber(data.version, 1),
    sectionTitle,
    experience:
      experience.length > 0
        ? experience
        : experienceTrainingFallback.experience,
    education:
      education.length > 0 ? education : experienceTrainingFallback.education,
    certification:
      certification.length > 0
        ? certification
        : experienceTrainingFallback.certification,
  };
}

/**
 * Subscribes to `about_page/experience_training`.
 * Falls back to local data when the document is missing or invalid.
 */
export function subscribeExperienceTrainingData(
  onData: (data: ExperienceTrainingData) => void,
  onError?: (error: Error) => void,
): () => void {
  const docRef = doc(db, ABOUT_PAGE_COLLECTION, EXPERIENCE_TRAINING_DOC_ID);

  onData(experienceTrainingFallback);

  return onSnapshot(
    docRef,
    (snap) => {
      try {
        if (!snap.exists()) {
          throw new Error(
            `Missing Firestore document: ${ABOUT_PAGE_COLLECTION}/${EXPERIENCE_TRAINING_DOC_ID}`,
          );
        }

        const raw = snap.data() as Record<string, unknown> | undefined;
        if (!raw) {
          throw new Error(
            `Empty document: ${ABOUT_PAGE_COLLECTION}/${EXPERIENCE_TRAINING_DOC_ID}`,
          );
        }

        onData(parseExperienceTrainingDocument(raw));
      } catch (err) {
        const error =
          err instanceof Error
            ? err
            : new Error("Unknown snapshot parsing error");
        onError?.(error);
        console.warn(
          "[experience-training] Firestore realtime read failed; using local fallback.",
          error,
        );
        onData(experienceTrainingFallback);
      }
    },
    (firestoreError) => {
      const error =
        firestoreError instanceof Error
          ? firestoreError
          : new Error("Firestore subscription failed");
      onError?.(error);
      console.warn(
        "[experience-training] Firestore subscription failed; using local fallback.",
        error,
      );
      onData(experienceTrainingFallback);
    },
  );
}
