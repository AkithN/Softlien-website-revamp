import { NextResponse } from "next/server";
import { addDoc, collection } from "firebase/firestore";
import { COLLECTIONS, getFirestoreDb } from "@/lib/firebase";
import type { ProjectFeedback } from "@/lib/types";

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

    const feedback: Omit<ProjectFeedback, "_id"> = {
      projectId,
      name,
      email,
      rating,
      message,
      // New feedback always requires admin review before becoming public.
      status: "pending",
      createdAt: new Date(),
    };

    const db = getFirestoreDb();
    const ref = await addDoc(collection(db, COLLECTIONS.feedbacks), feedback);

    return NextResponse.json(
      {
        message: "Feedback submitted successfully",
        id: ref.id,
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
