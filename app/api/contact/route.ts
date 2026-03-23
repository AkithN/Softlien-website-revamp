import { NextResponse } from "next/server";
import { addDoc, collection } from "firebase/firestore";
import { COLLECTIONS, getFirestoreDb } from "@/lib/firebase";
import type { ContactMessage } from "@/lib/types";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, company, phone, service, message } = body;

    if (!name?.trim() || !email?.trim() || !service?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: "Name, email, service, and message are required." },
        { status: 400 }
      );
    }

    const doc: Omit<ContactMessage, "_id"> = {
      name: String(name).trim(),
      email: String(email).trim(),
      company: String(company || "").trim(),
      phone: String(phone || "").trim(),
      service: String(service).trim(),
      message: String(message).trim(),
      createdAt: new Date(),
      read: false,
    };

    const db = getFirestoreDb();
    const ref = await addDoc(collection(db, COLLECTIONS.messages), doc);

    return NextResponse.json(
      { success: true, id: ref.id },
      { status: 201 }
    );
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { error: "Failed to save message. Please try again." },
      { status: 500 }
    );
  }
}
