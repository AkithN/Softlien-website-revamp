import { getApp, getApps, initializeApp, type FirebaseApp } from "firebase/app";
import { getAnalytics, isSupported, type Analytics } from "firebase/analytics";
import {
  Timestamp,
  getFirestore,
  type Firestore,
  type DocumentData,
} from "firebase/firestore";
import type { ContactMessage, ProjectFeedback } from "@/lib/types";

export const COLLECTIONS = {
  messages: "messages",
  feedbacks: "feedbacks",
} as const;

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? "AIzaSyDV-4ZkZs9h_2W3ak89NQDcC--pMyZWtOA",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ?? "softlien.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? "softlien",
  storageBucket:
    process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ?? "softlien.firebasestorage.app",
  messagingSenderId:
    process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? "527290509326",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID ?? "1:527290509326:web:df945a57e67532a0d0345f",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID ?? "G-5CPFP4YJBK",
};

export function getFirebaseApp(): FirebaseApp {
  return getApps().length ? getApp() : initializeApp(firebaseConfig);
}

let firestoreInstance: Firestore | null = null;
export function getFirestoreDb(): Firestore {
  if (!firestoreInstance) {
    firestoreInstance = getFirestore(getFirebaseApp());
  }
  return firestoreInstance;
}

let analyticsInstance: Analytics | null = null;
export async function getFirebaseAnalytics(): Promise<Analytics | null> {
  if (typeof window === "undefined") return null;
  if (!(await isSupported())) return null;
  if (!analyticsInstance) {
    analyticsInstance = getAnalytics(getFirebaseApp());
  }
  return analyticsInstance;
}

export function timestampToDate(value: unknown): Date {
  if (value instanceof Timestamp) return value.toDate();
  if (value instanceof Date) return value;
  if (
    typeof value === "object" &&
    value !== null &&
    "seconds" in value &&
    typeof (value as { seconds: unknown }).seconds === "number"
  ) {
    return new Timestamp(
      (value as { seconds: number }).seconds,
      (value as { nanoseconds?: number }).nanoseconds ?? 0
    ).toDate();
  }
  return new Date();
}

export function messageFromDoc(id: string, data: DocumentData): ContactMessage {
  return {
    _id: id,
    name: String(data.name ?? ""),
    email: String(data.email ?? ""),
    company: String(data.company ?? ""),
    phone: String(data.phone ?? ""),
    service: String(data.service ?? ""),
    message: String(data.message ?? ""),
    createdAt: timestampToDate(data.createdAt),
    read: Boolean(data.read),
  };
}

export function feedbackFromDoc(id: string, data: DocumentData): ProjectFeedback {
  const status = data.status;
  const safeStatus =
    status === "pending" || status === "published" || status === "rejected"
      ? status
      : "pending";
  return {
    _id: id,
    projectId: String(data.projectId ?? ""),
    name: String(data.name ?? ""),
    email: String(data.email ?? ""),
    rating: Number(data.rating) || 0,
    message: String(data.message ?? ""),
    status: safeStatus,
    createdAt: timestampToDate(data.createdAt),
  };
}

export function isValidFirestoreDocId(id: string): boolean {
  if (!id || id.length > 1500) return false;
  if (id.includes("/")) return false;
  return true;
}
