/**
 * https://www.epossu.fi/ - Ilmoitukset 1.0.0 - Service Worker
 * @version 1.0.0
 * @license MIT
 */

// handle push event
self.addEventListener("push", (event) => {
  const notification = event.data.json();
  const backend_options = notification.options;

  event.waitUntil(self.registration.showNotification(notification.title, {
    body: notification.body,
    ...backend_options,
  }));
});

// handle notification click
self.addEventListener("notificationclick", (event) => {
  event.preventDefault();
  event.waitUntil(self.clients.openWindow("https://www.epossu.fi/"));
  event.notification.close();
});
