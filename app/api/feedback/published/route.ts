import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import type { ProjectFeedback } from "@/lib/types";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const db = await getDb();
    const feedbacks = await db
      .collection<ProjectFeedback>("feedbacks")
      .find({ status: "published" })
      .sort({ createdAt: -1 })
      .limit(10)
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
  } catch (error) {
    console.error("Error fetching published feedback:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
