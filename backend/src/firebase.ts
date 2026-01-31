import admin from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config();

// Check if app is already initialized
if (!admin.apps.length) {
    try {
        // In production/local if GOOGLE_APPLICATION_CREDENTIALS is set, or use serviceAccountKey.json
        // For this hackathon, we assume environment variables are set or generic initialization
        admin.initializeApp({
            credential: admin.credential.applicationDefault(),
            // If you have a specific database URL, add it here, but Firestore doesn't strictly need it if project ID is auto-detected
        });
        console.log('Firebase Admin Initialized');
    } catch (error) {
        console.error('Firebase Admin Initialization Error:', error);
    }
}

export const db = admin.firestore();
export const auth = admin.auth();
