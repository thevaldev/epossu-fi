/**
 * https://www.epossu.fi/ - Ilmoitukset 1.0.0 - Service Worker
 * @version 1.0.0
 * @license MIT
 */

self.addEventListener("push", (event) => {
  const notification = event.data.json();
  event.waitUntil(self.registration.showNotification(notification.title, {
    body: notification.body,
    data: { url: "https://www.epossu.fi/" },
    badge: "https://www.epossu.fi/apple-touch-icon.png",
    icon: "https://www.epossu.fi/apple-touch-icon.png",
  }));
});
