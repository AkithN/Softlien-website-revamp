import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { ProjectFeedback } from "@/lib/types";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { projectId, name, email, rating, message } = body;

    if (!projectId || !name || !email || !rating || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const feedback: ProjectFeedback = {
      projectId,
      name,
      email,
      rating: Number(rating),
      message,
      status: "pending",
      createdAt: new Date(),
    };

    const db = await getDb();
    const result = await db.collection("feedbacks").insertOne(feedback);

    return NextResponse.json(
      { message: "Feedback submitted successfully", id: result.insertedId },
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
