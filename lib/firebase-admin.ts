import admin from 'firebase-admin';

// This check prevents the app from crashing in environments where the variables are not set,
// and prevents re-initialization during hot-reloads in development.
if (!admin.apps.length) {
  const serviceAccountKeyString = process.env.MY_FIREBASE_ADMIN_SERVICE_ACCOUNT_KEY;

  if (serviceAccountKeyString) {
    try {
      // The key in the .env file might be wrapped in single quotes, so we remove them.
      const cleanedKeyString = serviceAccountKeyString.replace(/^'|'$/g, '');
      const serviceAccount = JSON.parse(cleanedKeyString);
      
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      });
      console.log("Firebase Admin SDK successfully initialized.");
    } catch (error: any) {
      console.error("Firebase Admin SDK initialization failed. This is often due to an improperly formatted service account key in the .env file. Ensure the entire JSON object is copied correctly.", error.message);
    }
  } else {
    console.warn("FIREBASE_ADMIN_SERVICE_ACCOUNT_KEY environment variable not found. Firebase Admin SDK will not be initialized. Server-side API routes depending on it will fail.");
  }
}

// Export the admin database and storage instances, which will be null if initialization failed.
const adminDb = admin.apps.length ? admin.firestore() : null;
const adminStorage = admin.apps.length ? admin.storage() : null;

export { adminDb, adminStorage };
