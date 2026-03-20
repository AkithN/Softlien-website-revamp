import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import type { ContactMessage } from "@/lib/types";

const COLLECTION = "messages";

function checkAdminAuth(request: Request): boolean {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) return true; // no secret set = allow in dev
  const authHeader = request.headers.get("authorization");
  const token = authHeader?.replace(/^Bearer\s+/i, "") ?? "";
  return token === secret;
}

export async function GET(request: Request) {
  if (!checkAdminAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const db = await getDb();
    const messages = await db
      .collection<ContactMessage>(COLLECTION)
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    const list = messages.map((m) => ({
      _id: m._id?.toString(),
      name: m.name,
      email: m.email,
      company: m.company,
      phone: m.phone,
      service: m.service,
      message: m.message,
      createdAt: m.createdAt,
      read: m.read ?? false,
    }));

    return NextResponse.json(list);
  } catch (err) {
    console.error("Admin messages API error:", err);
    return NextResponse.json(
      { error: "Failed to fetch messages." },
      { status: 500 }
    );
  }
}
