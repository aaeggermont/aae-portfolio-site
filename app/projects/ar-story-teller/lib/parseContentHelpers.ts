export function isRecord(value: unknown): value is Record<string, unknown> {
  return value != null && typeof value === "object" && !Array.isArray(value);
}

export function requireString(value: unknown, path: string): string {
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`Invalid ${path}: expected non-empty string`);
  }
  return value;
}

/** Optional string — allows empty values (e.g. unused video metadata in seed). */
export function optionalString(value: unknown, path: string): string | undefined {
  if (value === undefined || value === null) {
    return undefined;
  }
  if (typeof value !== "string") {
    throw new Error(`Invalid ${path}: expected string`);
  }
  return value;
}

export function parseStringArray(value: unknown, path: string): string[] {
  if (!Array.isArray(value)) {
    throw new Error(`Invalid ${path}: expected string array`);
  }
  return value.map((item, index) => requireString(item, `${path}[${index}]`));
}
