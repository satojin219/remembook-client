import { adminDatabase } from "@/lib/firebase/adminConfig";
import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";

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

    const userRef = adminDatabase.ref(`users/${userId.value}`);
    await userRef.set({ fcmToken });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    console.error("Error saving FCM token:", error);
    return NextResponse.json(
      { errorMessage: "Failed to save FCM token." },
      { status: 500 }
    );
  }
}
