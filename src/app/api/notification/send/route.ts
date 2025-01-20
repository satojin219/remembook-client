import { adminMessage } from "@/lib/firebase/adminConfig";
import { NextResponse, type NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { userId, bookId, summaryId, body, _score } = await req.json();
  const tokenResponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/notification/token?userId=${userId}`
  ).then(
    (res) =>
      res.json() as unknown as {
        fcmToken: string | null;
      }
  );

  if (!tokenResponse.fcmToken) {
    return NextResponse.json(
      { ok: false, errorMessage: "FCM token not found for the user." },
      { status: 500 }
    );
  }

  try {
    await adminMessage
      .send({
        webpush: {
          notification: {
            title: "復習の時間ですよ！",
            body: body,
          },
          fcmOptions: {
            link: `${process.env.NEXT_PUBLIC_API_BASE_URL}/summary/${bookId}/question/${summaryId}`,
          },
        },
        token: tokenResponse.fcmToken,
      })
      .catch((error) => {
        console.error("Error sending notification:", error);
        throw new Error("Failed to send notification.");
      });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    console.error("Error sending notification:", error);
    return NextResponse.json(
      { ok: false, errorMessage: "Failed to send notification." },
      { status: 500 }
    );
  }
}
