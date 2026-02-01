import admin from "firebase-admin";
import fs from "fs";

const serviceAccount = JSON.parse(
  fs.readFileSync("./secrets/mainportfolio-d3604-firebase-adminsdk-cgr3y-71e75ebdab.json", "utf8")
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

async function main() {
  const email = process.argv[2];
  if (!email) {
    console.error("Usage: node scripts/set-admin.mjs <email>");
    process.exit(1);
  }

  let user;
  try {
    user = await admin.auth().getUserByEmail(email);
  } catch (err) {
    if (err?.code === "auth/user-not-found") {
      // ✅ Create a user record so you can set claims (useful for email/password invites)
      user = await admin.auth().createUser({
        email,
        emailVerified: false,
        disabled: false,
      });
      console.log(`Created user: ${email} (uid: ${user.uid})`);
    } else {
      throw err;
    }
  }

  await admin.auth().setCustomUserClaims(user.uid, { admin: true });

  console.log(`✅ Set admin claim for: ${email}`);
  console.log("➡️ User must sign out/in to refresh token (or force refresh).");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
