import { NextResponse } from "next/server";
import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { COLLECTIONS, getFirestoreDb, isValidFirestoreDocId } from "@/lib/firebase";
import type { ProjectFeedback } from "@/lib/types";
import { checkAdminAuth } from "@/lib/admin-auth";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!checkAdminAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const { id } = await params;
    if (!isValidFirestoreDocId(id)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }
    const body = (await request.json()) as { status?: string };
    const updates: Partial<Pick<ProjectFeedback, "status">> = {};
    const s = body.status;
    if (s === "pending" || s === "published" || s === "rejected") {
      updates.status = s;
    }
    if (!updates.status) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    const db = getFirestoreDb();
    const ref = doc(db, COLLECTIONS.feedbacks, id);
    const existing = await getDoc(ref);
    if (!existing.exists()) {
      return NextResponse.json({ error: "Feedback not found" }, { status: 404 });
    }
    await updateDoc(ref, { status: updates.status });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Admin feedback update error:", err);
    return NextResponse.json({ error: "Failed to update." }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!checkAdminAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const { id } = await params;
    if (!isValidFirestoreDocId(id)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }
    const db = getFirestoreDb();
    const ref = doc(db, COLLECTIONS.feedbacks, id);
    const existing = await getDoc(ref);
    if (!existing.exists()) {
      return NextResponse.json({ error: "Feedback not found" }, { status: 404 });
    }
    await deleteDoc(ref);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Admin feedback delete error:", err);
    return NextResponse.json({ error: "Failed to delete." }, { status: 500 });
  }
}
