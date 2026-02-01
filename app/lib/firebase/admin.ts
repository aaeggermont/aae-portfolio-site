import { getApps, initializeApp, applicationDefault } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

export function getAdmin() {
  if (!getApps().length) {
    // In Firebase/Google hosting environments, applicationDefault() typically works.
    // Locally, set GOOGLE_APPLICATION_CREDENTIALS or use a service account JSON.
    initializeApp({ credential: applicationDefault() });
  }

  return {
    auth: getAuth(),
    db: getFirestore(),
  };
}
