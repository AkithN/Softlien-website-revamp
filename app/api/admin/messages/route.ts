import { NextResponse } from "next/server";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { COLLECTIONS, getFirestoreDb, messageFromDoc } from "@/lib/firebase";
import { checkAdminAuth } from "@/lib/admin-auth";

export async function GET(request: Request) {
  if (!checkAdminAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const db = getFirestoreDb();
    const snap = await getDocs(
      query(collection(db, COLLECTIONS.messages), orderBy("createdAt", "desc"))
    );

    const list = snap.docs.map((d) => messageFromDoc(d.id, d.data()));

    return NextResponse.json(list);
  } catch (err) {
    console.error("Admin messages API error:", err);
    return NextResponse.json(
      { error: "Failed to fetch messages." },
      { status: 500 }
    );
  }
}
