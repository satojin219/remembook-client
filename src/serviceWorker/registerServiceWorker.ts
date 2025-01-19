export async function registerServiceWorker() {
  const registration = await window.navigator.serviceWorker
    .register("/firebase-messaging-sw.js")
    .then(() => window.navigator.serviceWorker.ready);

  await new Promise<void>((resolve) => {
    const activeServiceWorker = registration.active;
    if (activeServiceWorker?.state === "activated") {
      resolve();
    }
    activeServiceWorker?.addEventListener("statechange", (ev) => {
      if (
        ev.target instanceof ServiceWorker &&
        ev.target.state === "activated"
      ) {
        resolve();
      }
    });
  });

}
