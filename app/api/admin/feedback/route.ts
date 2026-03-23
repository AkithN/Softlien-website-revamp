import { NextResponse } from "next/server";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { COLLECTIONS, feedbackFromDoc, getFirestoreDb } from "@/lib/firebase";
import { checkAdminAuth } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  if (!checkAdminAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const db = getFirestoreDb();
    const snap = await getDocs(
      query(collection(db, COLLECTIONS.feedbacks), orderBy("createdAt", "desc"))
    );

    const list = snap.docs.map((d) => feedbackFromDoc(d.id, d.data()));

    return NextResponse.json(list);
  } catch (err) {
    console.error("Admin feedbacks API error:", err);
    return NextResponse.json(
      { error: "Failed to fetch feedbacks." },
      { status: 500 }
    );
  }
}
