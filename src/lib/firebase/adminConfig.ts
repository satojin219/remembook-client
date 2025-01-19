import { credential } from "firebase-admin";
import { initializeApp, getApps, getApp } from "firebase-admin/app";
import { getDatabase } from "firebase-admin/database";
import { getMessaging } from "firebase-admin/messaging";

const adminApp =
  getApps().length > 0
    ? getApp()
    : initializeApp({
        credential: credential.cert({
          projectId: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_PROJECT_ID,
          clientEmail: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_CLIENT_EMAIL,
          privateKey:
            process.env.NEXT_PUBLIC_FIREBASE_ADMIN_PRIVATE_KEY?.replace(
              /\\n/g,
              "\n"
            ),
        }),
        databaseURL: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_DATABASE_URL,
      });

export const adminMessage = getMessaging(adminApp);
export const adminDatabase = getDatabase(adminApp);
