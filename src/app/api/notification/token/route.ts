import "server-only";

import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  try {
    const { fcmToken } = await req.json();

    const cookieStore = await cookies();
    const userId = cookieStore.get("userId");
    if (!userId) {
      return NextResponse.json(
        { ok: false, errorMessage: "User ID not found in cookies." },
        { status: 500 }
      );
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL}/users/${userId.value}.json`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fcmToken }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to save FCM token");
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    console.error("Error saving FCM token:", error);
    return NextResponse.json(
      { errorMessage: "Failed to save FCM token." },
      { status: 500 }
    );
  }
}
