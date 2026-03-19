import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { ProjectFeedback } from "@/lib/types";

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
    const updates: Partial<ProjectFeedback> = {};
    if (["pending", "published", "rejected"].includes(body.status)) {
      updates.status = body.status;
    }

    const db = await getDb();
    const result = await db
      .collection("feedbacks")
      .updateOne({ _id: new ObjectId(id) }, { $set: updates });

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Feedback not found" }, { status: 404 });
    }
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
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }
    const db = await getDb();
    const result = await db
      .collection("feedbacks")
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Feedback not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Admin feedback delete error:", err);
    return NextResponse.json({ error: "Failed to delete." }, { status: 500 });
  }
}
