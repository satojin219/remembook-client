import { adminDatabase } from "@/lib/firebase/adminConfig"; // adminConfigでの初期化を確認
import type { APIResponse } from "@/types/common";
import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";

type GetResponse = {
  fcmToken: string | null;
};

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    console.log("ユーザーID", userId);
    if (!userId) {
      return NextResponse.json(
        { errorMessage: "User ID not found in query parameters." },
        { status: 200 }
      );
    }
    const userRef = adminDatabase.ref(`users/${userId}`);
    const snapshot = await userRef
      .once("value")
      .then((snap) => snap.toJSON() as { fcmToken: string });

    const fcmToken = snapshot.fcmToken || null;

    return NextResponse.json({ fcmToken }, { status: 200 });
  } catch (error) {
    console.error("Error fetching FCM token:", error);

    return NextResponse.json(
      { errorMessage: "Failed to fetch FCM token." },
      { status: 200 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { fcmToken } = await req.json();

    const cookieStore = await cookies();
    const userId = cookieStore.get("userId");
    console.log("ユーザーID", userId);
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
