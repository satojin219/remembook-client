import { adminDatabase, adminMessage } from "@/lib/firebase/adminConfig";
import { task } from "@trigger.dev/sdk/v3";

type Payload = {
  userId: string;
  bookId: string;
  memoId: string;
  body: string;
};

export const sendQuestionTask = task({
  id: "send-question-task",
  run: async (payload: Payload) => {
    const { userId, bookId, memoId, body } = payload;

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
          link: `${process.env.NEXT_PUBLIC_API_BASE_URL}/memo/${bookId}/question/${memoId}`,
        },
      },
      token: fcmToken,
    });
  },
});
