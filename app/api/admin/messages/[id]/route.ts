import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import type { ContactMessage } from "@/lib/types";

const COLLECTION = "messages";

function checkAdminAuth(request: Request): boolean {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) return true;
  const authHeader = request.headers.get("authorization");
  const token = authHeader?.replace(/^Bearer\s+/i, "") ?? "";
  return token === secret;
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!checkAdminAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const { id } = await params;
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }
    const body = await request.json();
    const updates: Partial<ContactMessage> = {};
    if (typeof body.read === "boolean") updates.read = body.read;

    const db = await getDb();
    const result = await db
      .collection<ContactMessage>(COLLECTION)
      .updateOne({ _id: new ObjectId(id) }, { $set: updates });

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Message not found" }, { status: 404 });
    }
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
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }
    const db = await getDb();
    const result = await db
      .collection<ContactMessage>(COLLECTION)
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Message not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Admin message delete error:", err);
    return NextResponse.json({ error: "Failed to delete." }, { status: 500 });
  }
}
