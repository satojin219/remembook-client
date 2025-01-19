

self.addEventListener("notificationclick", (event) => {
  console.log("click", event.notification.data.url);
  event.notification.close();
  const urlToOpen = event.notification.data.url;
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url === urlToOpen && 'focus' in client) {
          return client.focus();
        }
      }

      if (self.clients.openWindow) {
        return self.clients.openWindow(urlToOpen);
      }
    })
  );
});



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
