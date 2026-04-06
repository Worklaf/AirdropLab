export default function handler(req, res) {
  res.status(200).json({
    CF_API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    CF_AUTH_DOMAIN: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    CF_PROJECT_ID: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    CF_STORAGE_BUCKET: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    CF_MESSAGING_SENDER_ID: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    CF_APP_ID: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    ADMIN_UID: process.env.NEXT_PUBLIC_ADMIN_UID,
    debug: true
  });
}
