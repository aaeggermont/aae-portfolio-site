import admin from "firebase-admin";
import fs from "fs";

const serviceAccount = JSON.parse(
  fs.readFileSync("/Users/antonioeggermont/Documents/aae-portfolio-site/scripts/secrets/mainportfolio-d3604-firebase-adminsdk-cgr3y-71e75ebdab.json", "utf8")
);

const [,, email] = process.argv;
if (!email) {
  console.log("Usage: node scripts/set-admin.mjs you@email.com");
  process.exit(1);
}

// export GOOGLE_APPLICATION_CREDENTIALS="/path/serviceAccount.json"
// admin.initializeApp({ credential: admin.credential.applicationDefault() });

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const auth = admin.auth();

async function main() {
  const user = await auth.getUserByEmail(email);
  await auth.setCustomUserClaims(user.uid, { admin: true });
  console.log("✅ Set admin claim for:", email);

  // IMPORTANT: user must sign out + sign back in to refresh token
  console.log("Tell the user to sign out/in to refresh claims.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
