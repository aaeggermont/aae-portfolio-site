// lib/firebaseAdmin.ts

/*
import admin from "firebase-admin";

export function getAdmin() {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      }),
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET, 
      // e.g. "mainportfolio-d3604.firebasestorage.app"
    });
  }

  return {
    auth: admin.auth(),
    db: admin.firestore(),
    bucket: admin.storage().bucket(), // uses storageBucket above
  };
}
*/