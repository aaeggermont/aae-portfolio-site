import "dotenv/config";
import admin from "firebase-admin";

import {
  accessCodeHint,
  DEFAULT_ACCESS_CODE_TTL_SECONDS,
  generateSixDigitAccessCode,
  hashAccessCode,
  PROJECT_ACCESS_CODES_COLLECTION,
} from "../lib/auth/projectAccessCodeSession";

/**
 * Create a multi-project 6-digit access code.
 *
 *   npx tsx scripts/create-project-access-code.ts --projects project_1,project_4 --label "Acme Corp"
 *   npx tsx scripts/create-project-access-code.ts --projects project_4 --label "Stripe" --days 14 --write
 */

function argValue(flag: string): string | undefined {
  const idx = process.argv.indexOf(flag);
  if (idx === -1) return undefined;
  return process.argv[idx + 1];
}

function hasFlag(flag: string): boolean {
  return process.argv.includes(flag);
}

async function main() {
  if (
    !process.env.GOOGLE_APPLICATION_CREDENTIALS &&
    process.env.AAE_GOOGLE_APPLICATION_CREDENTIALS
  ) {
    process.env.GOOGLE_APPLICATION_CREDENTIALS =
      process.env.AAE_GOOGLE_APPLICATION_CREDENTIALS;
  }

  const projectsRaw = argValue("--projects") ?? argValue("--project") ?? "project_4";
  const projectKeys = Array.from(
    new Set(
      projectsRaw
        .split(",")
        .map((k) => k.trim())
        .filter(Boolean),
    ),
  );
  const label = argValue("--label") ?? "Reviewer access";
  const daysRaw = argValue("--days");
  const days = daysRaw ? Number(daysRaw) : DEFAULT_ACCESS_CODE_TTL_SECONDS / (24 * 60 * 60);
  const shouldWrite = hasFlag("--write");

  if (projectKeys.length === 0) {
    throw new Error("Provide at least one project via --projects project_1,project_4");
  }
  if (!Number.isFinite(days) || days <= 0) {
    throw new Error("Invalid --days value");
  }

  const firebaseProjectId =
    process.env.FIREBASE_PROJECT_ID || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  if (!firebaseProjectId) {
    throw new Error(
      "Missing project id: set FIREBASE_PROJECT_ID or NEXT_PUBLIC_FIREBASE_PROJECT_ID in .env",
    );
  }

  let code = generateSixDigitAccessCode();
  let codeHash = hashAccessCode(code);

  const expiresAt = admin.firestore.Timestamp.fromMillis(
    Date.now() + days * 24 * 60 * 60 * 1000,
  );

  const doc = {
    projectKeys,
    projectKey: projectKeys[0],
    label,
    reference: label,
    codeHash,
    codeHint: accessCodeHint(code),
    accessCode: code,
    enabled: true,
    expiresAt,
    maxRedemptions: null as number | null,
    redemptionCount: 0,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    lastRedeemedAt: null,
    revokedAt: null,
  };

  console.log("Access code preview");
  console.log({
    projectKeys,
    label,
    days,
    codeHint: doc.codeHint,
    expiresAt: expiresAt.toDate().toISOString(),
    write: shouldWrite,
  });

  if (!shouldWrite) {
    console.log("\n🧪 Dry run only (no Firestore writes).");
    console.log("Generated code (save this — it is only shown once):", code);
    console.log("Pass --write to store the hashed code in Firestore.");
    return;
  }

  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.applicationDefault(),
      projectId: firebaseProjectId,
    });
  }

  const db = admin.firestore();

  for (let attempt = 0; attempt < 5; attempt += 1) {
    const ref = db.collection(PROJECT_ACCESS_CODES_COLLECTION).doc(codeHash);
    const existing = await ref.get();
    if (!existing.exists) {
      await ref.set(doc);
      console.log(`\n✅ Stored ${PROJECT_ACCESS_CODES_COLLECTION}/${codeHash}`);
      console.log("Access code (save this — it is only shown once):", code);
      console.log(`Projects: ${projectKeys.join(", ")}`);
      return;
    }
    code = generateSixDigitAccessCode();
    codeHash = hashAccessCode(code);
    doc.codeHash = codeHash;
    doc.codeHint = accessCodeHint(code);
  }

  throw new Error("Could not allocate a unique access code after several attempts");
}

main().catch((err) => {
  console.error("❌ Failed to create access code:", err);
  process.exit(1);
});
