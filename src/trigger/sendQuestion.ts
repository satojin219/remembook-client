import { adminDatabase, adminMessage } from "@/lib/firebase/adminConfig";
import { task } from "@trigger.dev/sdk/v3";
import { NextResponse } from "next/server";

type Payload = {
  userId: string;
  bookId: string;
  summaryId: string;
  body: string;
};

export const sendQuestionTask = task({
  id: "send-question-task",
  run: async (payload: Payload) => {
    const { userId, bookId, summaryId, body } = payload;

    const userRef = adminDatabase.ref(`users/${userId}`);
    const snapshot = await userRef
      .once("value")
      .then((snap) => snap.toJSON() as { fcmToken: string });

    const fcmToken = snapshot.fcmToken || null;

    if (!fcmToken) {
      throw new Error("FCM token not found for the user.");
    }
    
    adminMessage.send({
      webpush: {
        notification: {
          title: "復習の時間ですよ！",
          body: body,
        },
        fcmOptions: {
          link: `${process.env.NEXT_PUBLIC_API_BASE_URL}/summary/${bookId}/question/${summaryId}`,
        },
      },
      token: fcmToken,
    });
  },
});
