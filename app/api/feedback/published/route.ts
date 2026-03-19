import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const db = await getDb();
    const feedbacks = await db
      .collection("feedbacks")
      .find({ status: "published" })
      .sort({ createdAt: -1 })
      .limit(10)
      .toArray();

    return NextResponse.json(feedbacks);
  } catch (error) {
    console.error("Error fetching published feedback:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
