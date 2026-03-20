import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { ProjectFeedback } from "@/lib/types";
import { ObjectId } from "mongodb";

// For MongoDB, `_id` is an ObjectId, but our shared `ProjectFeedback` type
// uses a string id shape for UI/API payloads. Keep DB insert typing correct.
type MongoProjectFeedback = Omit<ProjectFeedback, "_id"> & { _id?: ObjectId };

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const projectId = String(body.projectId ?? "").trim();
    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim();
    const message = String(body.message ?? "").trim();
    const rating = Number(body.rating);

    if (!projectId || !name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    if (!Number.isFinite(rating) || rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: "Rating must be between 1 and 5" },
        { status: 400 }
      );
    }

    // Match admin API: no ADMIN_SECRET = open/dev → show on site immediately;
    // with ADMIN_SECRET, require a publish action in /admin.
    const needsModeration = Boolean(process.env.ADMIN_SECRET?.trim());

    // `_id` is created by MongoDB, so we omit it here.
    const feedback: Omit<MongoProjectFeedback, "_id"> = {
      projectId,
      name,
      email,
      rating,
      message,
      status: needsModeration ? "pending" : "published",
      createdAt: new Date(),
    };

    const db = await getDb();
    const result = await db.collection<MongoProjectFeedback>("feedbacks").insertOne(feedback);

    return NextResponse.json(
      {
        message: "Feedback submitted successfully",
        id: result.insertedId.toString(),
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error submitting feedback:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
