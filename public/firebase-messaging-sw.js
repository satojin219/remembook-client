importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js');

// Firebase 初期化
const app = firebase.initializeApp({
  apiKey: "AIzaSyCzpSEmTTz2UV-jnY58qiCo2faSW8YbA14",
  authDomain: "remembook-5c167.firebaseapp.com",
  projectId: "remembook-5c167",
  storageBucket: "remembook-5c167.firebasestorage.app",
  messagingSenderId: "1054988684033",
  appId: "1:1054988684033:web:d160f5bdc5b426fd856900",
  measurementId: "G-N04844P4XD",
});

const messaging = firebase.messaging();

// バックグラウンドメッセージを処理
// messaging.onBackgroundMessage((payload) => {
//   console.log("onBackgroundMessage", payload);

//   if (!payload.notification) return;
//   navigator.serviceWorker.ready.then((_registration) => {
//     const notificationTitle = payload.notification.title || "通知";
//     const notificationOptions = {
//       body: payload.notification.body || "新しいメッセージがあります。",
//       icon: payload.notification.image || "/default-icon.png",
//       data: {
//         link: payload.notification.click_action || "/",
//       },
//     };
//     console.log("notificationTitle", notificationTitle);
//     console.log("notificationOptions", notificationOptions);

//     self.registration.showNotification(notificationTitle, notificationOptions);
//   })
// });




self.addEventListener('push', (event) => {
  let data = {};
  if (event.data) {
    data = event.data.json();
  }
  console.log('Received a push message', data);
  const title = data.notification.title;
  const message = data.notification.body;
  const link = data.notification.click_action;
  event.waitUntil(
    self.registration.showNotification(title, {
      body: message,
      data: {
        url: link,
      },
    }))

});

self.addEventListener("notificationclick", (event) => {
  console.log("click", typeof event.notification.data.url);
  event.notification.close();

  event.waitUntil(
    clients
      .matchAll({
        type: "window",
        includeUncontrolled: true,
      })
      .then((clientList) => {
        console.log("clientList", clientList);

        if (clientList.length > 0) {
          const client = clientList[0];
          client.postMessage({
            action: 'redirect-from-notificationclick',
            url: event.notification.data.url,
          })
        }
      })
  );
});

