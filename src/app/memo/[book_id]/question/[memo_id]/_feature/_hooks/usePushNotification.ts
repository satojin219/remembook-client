import { useState, useEffect } from "react";
import { getToken } from "firebase/messaging";
import { messaging } from "@/lib/firebase/config";

export const usePushNotification = () => {
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const enablePushNotification = async () => {
      if (!("Notification" in window)) {
        setError("このブラウザーはデスクトップ通知には対応していません。");
        return;
      }

      try {
        const permission = await Notification.requestPermission();
        const message = await messaging();

        if (!message) {
          setError("メッセージングサービスの初期化に失敗しました。");
          return;
        }

        const currentToken = await getToken(message, {
          vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
        });

        if (!currentToken) {
          setError("通知の許可が必要です。");
          return;
        }

        const response = await fetch(
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

        if (!response.ok) {
          throw new Error("トークンの登録に失敗しました。");
        }

        setIsNotificationEnabled(true);
        setError(null);
      } catch (err) {
        console.error("An error occurred while retrieving token. ", err);
        setError("通知の設定に失敗しました。");
      }
    };

    enablePushNotification();
  }, []);

  return { isNotificationEnabled, error };
};
