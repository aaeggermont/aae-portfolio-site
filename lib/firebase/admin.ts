// lib/firebase/admin.ts
import {
  getApp,
  initializeApp,
  applicationDefault,
  type App as FirebaseAdminApp,
} from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";

const isCloudRuntime = !!process.env.K_SERVICE || !!process.env.FUNCTION_TARGET;

const PROJECT_ID = isCloudRuntime
  ? process.env.FIREBASE_PROJECT_ID ||
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ||
    process.env.GOOGLE_CLOUD_PROJECT ||
    process.env.GCLOUD_PROJECT
  : process.env.FIREBASE_PROJECT_ID ||
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ||
    process.env.GOOGLE_CLOUD_PROJECT;

const BUCKET = isCloudRuntime
  ? process.env.FIREBASE_STORAGE_BUCKET || process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
  : process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || process.env.FIREBASE_STORAGE_BUCKET;

function applyEnvBridge() {
  // Project id
  if (
    !isCloudRuntime &&
    !process.env.GOOGLE_CLOUD_PROJECT &&
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
  ) {
    process.env.GOOGLE_CLOUD_PROJECT = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  }

  // Credentials path: local development only.
  // In Cloud Run / Functions, rely on workload identity (application default credentials).
  if (
    !isCloudRuntime &&
    !process.env.GOOGLE_APPLICATION_CREDENTIALS &&
    process.env.AAE_GOOGLE_APPLICATION_CREDENTIALS
  ) {
    process.env.GOOGLE_APPLICATION_CREDENTIALS = process.env.AAE_GOOGLE_APPLICATION_CREDENTIALS;
  }

  // If cloud runtime has a local path configured by env, clear it to avoid ENOENT.
  if (isCloudRuntime && process.env.GOOGLE_APPLICATION_CREDENTIALS?.startsWith("./")) {
    delete process.env.GOOGLE_APPLICATION_CREDENTIALS;
  }
}

export function getAdmin() {
  applyEnvBridge();
  const projectId = isCloudRuntime
    ? process.env.FIREBASE_PROJECT_ID ||
      process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ||
      process.env.GOOGLE_CLOUD_PROJECT ||
      process.env.GCLOUD_PROJECT ||
      PROJECT_ID
    : process.env.FIREBASE_PROJECT_ID ||
      process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ||
      process.env.GOOGLE_CLOUD_PROJECT ||
      PROJECT_ID;

  if (!projectId) {
    throw new Error("Missing Firebase project id in server environment.");
  }

  let app: FirebaseAdminApp;
  try {
    // Reuse default app when available.
    app = getApp();
  } catch {
    // If only named apps exist (or no app exists), create the default app explicitly.
    app = initializeApp({
      credential: applicationDefault(),
      projectId,
      ...(BUCKET ? { storageBucket: BUCKET } : {}),
    });
  }

  const storage = getStorage(app);
  const bucket = BUCKET ? storage.bucket(BUCKET) : storage.bucket();

  return {
    auth: getAuth(app),
    db: getFirestore(app),
    bucket,
    storage,
  };
}
