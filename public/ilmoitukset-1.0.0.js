/**
 * https://www.epossu.fi/ - Ilmoitukset 1.0.0 - Service Worker
 * @version 1.0.0
 * @license MIT
 */

// handle push event
self.addEventListener("push", (event) => {
  const notification = event.data.json();
  event.waitUntil(self.registration.showNotification(notification.title, {
    body: notification.body,
    data: { url: "https://epossu.fi/" },
    badge: "https://epossu.fi/apple-touch-icon.png",
    icon: "https://epossu.fi/apple-touch-icon.png",
    vibrate: [100, 50, 100],
    actions: [{ action: "open", title: "Avaa" }, { action: "close", title: "Sulje" }]
  }));
});

// handle notification click
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(self.clients.openWindow(event.notification.data.url));
});