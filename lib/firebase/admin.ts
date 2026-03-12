// lib/firebase/admin.ts
import { getApps, initializeApp, applicationDefault } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";

const BUCKET = process.env.AAE_FIREBASE_STORAGE_BUCKET; 
const PROJECT_ID = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || process.env.AAE_GOOGLE_CLOUD_PROJECT  || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;

function applyEnvBridge() {
  // Project id
  if (!process.env.GOOGLE_CLOUD_PROJECT && process.env.AAE_GOOGLE_CLOUD_PROJECT) {
    process.env.GOOGLE_CLOUD_PROJECT = process.env.AAE_GOOGLE_CLOUD_PROJECT;
  }

  // Credentials path (LOCAL ONLY usually)
  if (!process.env.GOOGLE_APPLICATION_CREDENTIALS && process.env.AAE_GOOGLE_APPLICATION_CREDENTIALS) {
    process.env.GOOGLE_APPLICATION_CREDENTIALS = process.env.AAE_GOOGLE_APPLICATION_CREDENTIALS;
  }
}

export function getAdmin() {
  if (!getApps().length) {

    applyEnvBridge();
    if (!PROJECT_ID) {
      throw new Error(
        "Missing projectId. Set NEXT_PUBLIC_FIREBASE_PROJECT_ID or AAE_GOOGLE_CLOUD_PROJECT in .env.local"
      );
    }

    initializeApp({
      credential: applicationDefault(),
      projectId: PROJECT_ID,
      ...(BUCKET ? { storageBucket: BUCKET } : {}),
    });
  }

  const storage = getStorage();
  const bucket = BUCKET ? storage.bucket(BUCKET) : storage.bucket(); // default bucket if set

  return {
    auth: getAuth(),
    db: getFirestore(),
    bucket,
    storage
  };
}
