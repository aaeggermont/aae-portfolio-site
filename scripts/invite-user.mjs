import admin from "firebase-admin";
import crypto from "crypto";

const [,, email, slug] = process.argv;

if (!email || !slug) {
  console.log("Usage: node scripts/invite-user.mjs reviewer@company.com automatic-seater-assignments");
  process.exit(1);
}

// Use a service account JSON locally (recommended):
// export GOOGLE_APPLICATION_CREDENTIALS="/absolute/path/serviceAccount.json"
admin.initializeApp({ credential: admin.credential.applicationDefault() });

const auth = admin.auth();
const db = admin.firestore();

function randomPassword() {
  return crypto.randomBytes(18).toString("base64url");
}

async function main() {
  let user;
  try {
    user = await auth.getUserByEmail(email);
    console.log("User exists:", user.uid);
  } catch {
    user = await auth.createUser({
      email,
      password: randomPassword(),
      emailVerified: false,
      disabled: false,
    });
    console.log("User created:", user.uid);
  }

  // Add to allowlist
  const ref = db.collection("access_allowlist").doc(slug);
  await ref.set(
    {
      enabled: true,
      allowedEmails: admin.firestore.FieldValue.arrayUnion(email.toLowerCase()),
      revokedEmails: admin.firestore.FieldValue.arrayRemove(email.toLowerCase()),
    },
    { merge: true }
  );

  // Generate reset link (optional to copy/paste)
  const resetLink = await auth.generatePasswordResetLink(email);
  console.log("Reset link:", resetLink);

  console.log("✅ Invited:", email, "for slug:", slug);
  console.log("Tell the user they can also click 'Forgot password' on the sign-in page.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
