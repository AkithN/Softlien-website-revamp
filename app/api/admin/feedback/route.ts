import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { ProjectFeedback } from "@/lib/types";

function checkAdminAuth(request: Request): boolean {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) return true;
  const authHeader = request.headers.get("authorization");
  const token = authHeader?.replace(/^Bearer\s+/i, "") ?? "";
  return token === secret;
}

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  if (!checkAdminAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const db = await getDb();
    const feedbacks = await db
      .collection<ProjectFeedback>("feedbacks")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    const list = feedbacks.map((f) => ({
      _id: f._id?.toString(),
      projectId: f.projectId,
      name: f.name,
      email: f.email,
      rating: f.rating,
      message: f.message,
      status: f.status,
      createdAt: f.createdAt,
    }));

    return NextResponse.json(list);
  } catch (err) {
    console.error("Admin feedbacks API error:", err);
    return NextResponse.json(
      { error: "Failed to fetch feedbacks." },
      { status: 500 }
    );
  }
}
