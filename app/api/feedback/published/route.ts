import { NextResponse } from "next/server";
import { collection, getDocs, query, where } from "firebase/firestore";
import { COLLECTIONS, feedbackFromDoc, getFirestoreDb } from "@/lib/firebase";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const db = getFirestoreDb();
    const snap = await getDocs(
      query(collection(db, COLLECTIONS.feedbacks), where("status", "==", "published"))
    );

    const list = snap.docs
      .map((d) => feedbackFromDoc(d.id, d.data()))
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, 10);

    return NextResponse.json(list);
  } catch (error) {
    console.error("Error fetching published feedback:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
