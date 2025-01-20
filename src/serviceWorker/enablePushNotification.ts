import { getToken } from "firebase/messaging";
import { messaging } from "../lib/firebase/config";

export const enablePushNotification = async () => {
  if (!("Notification" in window)) {
    alert("このブラウザーはデスクトップ通知には対応していません。");
  } else {
    Notification.requestPermission().then(async (permission) => {
      const message = await messaging();

      if (!message) {
        return;
      }
      getToken(message, {
        vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
      })
        .then((currentToken) => {
          if (currentToken) {
            fetch(
              `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/notification/token`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  fcmToken: currentToken,
                }),
              }
            );
          } else {
            alert("通知の許可が必要です。");
          }
        })
        .catch((err) => {
          console.error("An error occurred while retrieving token. ", err);
          alert("トークンの取得に失敗しました。");
        });
    });
  }
};
