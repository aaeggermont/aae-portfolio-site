import { db } from "@/firebase";
import { doc, onSnapshot } from "firebase/firestore";

import {
  capabilityMapFallback,
  type CapabilityColorKey,
  type CapabilityDomain,
  type CapabilityExpertiseLevel,
  type CapabilityIconKey,
  type CapabilityMapData,
  type CapabilitySkill,
} from "@/app/aboutme/data/capability-map-data";

export const ABOUT_PAGE_COLLECTION = "about_page";
export const CAPABILITY_MAP_DOC_ID = "capability_map";

const COLOR_KEYS = new Set<CapabilityColorKey>([
  "domain-ai",
  "domain-engineering",
  "domain-strategy",
  "domain-design",
  "domain-data",
]);

const ICON_KEYS = new Set<CapabilityIconKey>([
  "brain",
  "code",
  "people",
  "person",
  "chart",
]);

function asString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function asNumber(value: unknown, fallback = 0): number {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}

function asExpertiseLevel(value: unknown): CapabilityExpertiseLevel {
  const n = asNumber(value, 3);
  if (n <= 1) return 1;
  if (n === 2) return 2;
  if (n === 3) return 3;
  return 4;
}

function parseSkill(raw: unknown, index: number): CapabilitySkill | null {
  if (!raw || typeof raw !== "object") return null;
  const record = raw as Record<string, unknown>;
  const id = asString(record.id) || `skill-${index}`;
  const label = asString(record.label);
  if (!label) return null;

  return {
    id,
    label,
    order: asNumber(record.order, index),
    level: asExpertiseLevel(record.level),
  };
}

function parseDomain(raw: unknown, index: number): CapabilityDomain | null {
  if (!raw || typeof raw !== "object") return null;
  const record = raw as Record<string, unknown>;

  const id = asString(record.id) || `domain-${index}`;
  const label = asString(record.label);
  if (!label) return null;

  const colorRaw = asString(record.color) as CapabilityColorKey;
  const iconRaw = asString(record.icon) as CapabilityIconKey;
  const color = COLOR_KEYS.has(colorRaw) ? colorRaw : "domain-engineering";
  const icon = ICON_KEYS.has(iconRaw) ? iconRaw : "code";

  const skillsRaw = Array.isArray(record.skills) ? record.skills : [];
  const skills = skillsRaw
    .map((skill, skillIndex) => parseSkill(skill, skillIndex))
    .filter((skill): skill is CapabilitySkill => skill !== null)
    .sort((a, b) => a.order - b.order);

  return {
    id,
    label,
    color,
    icon,
    order: asNumber(record.order, index),
    skills,
  };
}

export function parseCapabilityMapDocument(
  data: Record<string, unknown>,
): CapabilityMapData {
  const headerRaw =
    data.header && typeof data.header === "object"
      ? (data.header as Record<string, unknown>)
      : {};
  const hubRaw =
    data.hub && typeof data.hub === "object"
      ? (data.hub as Record<string, unknown>)
      : {};
  const footerRaw =
    data.footer && typeof data.footer === "object"
      ? (data.footer as Record<string, unknown>)
      : {};

  const title = asString(headerRaw.title);
  const tagline = asString(headerRaw.tagline);
  const description = asString(headerRaw.description);
  const name = asString(hubRaw.name);
  const footerTitle = asString(footerRaw.title);
  const footerDescription = asString(footerRaw.description);

  if (!title || !name) {
    throw new Error(
      "Missing required capability map fields: header.title and hub.name",
    );
  }

  const roles = Array.isArray(hubRaw.roles)
    ? hubRaw.roles.map(asString).filter(Boolean)
    : capabilityMapFallback.hub.roles;

  const domainsRaw = Array.isArray(data.domains) ? data.domains : [];
  const domains = domainsRaw
    .map((domain, index) => parseDomain(domain, index))
    .filter((domain): domain is CapabilityDomain => domain !== null)
    .sort((a, b) => a.order - b.order);

  if (domains.length === 0) {
    throw new Error("Capability map document has no valid domains");
  }

  return {
    version: asNumber(data.version, 1),
    header: {
      title,
      tagline: tagline || capabilityMapFallback.header.tagline,
      description: description || capabilityMapFallback.header.description,
    },
    hub: {
      name,
      roles,
    },
    footer: {
      title: footerTitle || capabilityMapFallback.footer.title,
      description: footerDescription || capabilityMapFallback.footer.description,
    },
    domains,
  };
}

/**
 * Subscribes to `about_page/capability_map`.
 * Falls back to local data when the document is missing or invalid.
 */
export function subscribeCapabilityMapData(
  onData: (data: CapabilityMapData) => void,
  onError?: (error: Error) => void,
): () => void {
  const docRef = doc(db, ABOUT_PAGE_COLLECTION, CAPABILITY_MAP_DOC_ID);

  onData(capabilityMapFallback);

  return onSnapshot(
    docRef,
    (snap) => {
      try {
        if (!snap.exists()) {
          throw new Error(
            `Missing Firestore document: ${ABOUT_PAGE_COLLECTION}/${CAPABILITY_MAP_DOC_ID}`,
          );
        }

        const raw = snap.data() as Record<string, unknown> | undefined;
        if (!raw) {
          throw new Error(
            `Empty document: ${ABOUT_PAGE_COLLECTION}/${CAPABILITY_MAP_DOC_ID}`,
          );
        }

        onData(parseCapabilityMapDocument(raw));
      } catch (err) {
        const error =
          err instanceof Error ? err : new Error("Unknown snapshot parsing error");
        console.warn(
          "[capability-map] Firestore read failed; using local fallback.",
          error,
        );
        onError?.(error);
        onData(capabilityMapFallback);
      }
    },
    (firestoreError) => {
      const error =
        firestoreError instanceof Error
          ? firestoreError
          : new Error("Firestore subscription failed");
      console.warn(
        "[capability-map] Firestore subscription failed; using local fallback.",
        error,
      );
      onError?.(error);
      onData(capabilityMapFallback);
    },
  );
}
