import { NextResponse } from "next/server";
import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { COLLECTIONS, getFirestoreDb, isValidFirestoreDocId } from "@/lib/firebase";
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
    const body = await request.json();
    const updates: Record<string, boolean> = {};
    if (typeof body.read === "boolean") updates.read = body.read;
    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ error: "No valid fields to update" }, { status: 400 });
    }

    const db = getFirestoreDb();
    const ref = doc(db, COLLECTIONS.messages, id);
    const existing = await getDoc(ref);
    if (!existing.exists()) {
      return NextResponse.json({ error: "Message not found" }, { status: 404 });
    }
    await updateDoc(ref, updates);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Admin message update error:", err);
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
    const ref = doc(db, COLLECTIONS.messages, id);
    const existing = await getDoc(ref);
    if (!existing.exists()) {
      return NextResponse.json({ error: "Message not found" }, { status: 404 });
    }
    await deleteDoc(ref);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Admin message delete error:", err);
    return NextResponse.json({ error: "Failed to delete." }, { status: 500 });
  }
}
