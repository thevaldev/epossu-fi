import { subscriptionJSON } from "../types";

const NotificationsHandle = {
  verifyDeviceSupport() {
    return (
      "serviceWorker" in navigator &&
      "PushManager" in window &&
      "Notification" in window
    );
  },
  async registerSW() {
    await navigator.serviceWorker.register("/ilmoitukset-1.0.0.js", {
      scope: "/",
    });

    const subscription = await navigator.serviceWorker.ready.then(
      async (sw) => {
        return sw.pushManager
          .subscribe({
            userVisibleOnly: true,
            applicationServerKey:
              "BFCt2K5UkRQ9LsnL4aOvEz1O5tgDhO4qZCXv191OqO3K5aFEhatZaSJNsnPOu6-T7JJDvae8v9gNRij6L21zQSw",
          })
          .then((subscription: PushSubscription) => {
            return subscription.toJSON();
          })
          .catch((error) => {
            console.error("Failed to subscribe the user: ", error);
          });
      }
    );

    return subscription;
  },
  checkForSW() {
    return navigator.serviceWorker.controller;
  },
  async recoverSubscription() {
    if (!navigator.serviceWorker.controller) return null;

    const subscription = await navigator.serviceWorker.ready.then(
      async (sw) => {
        return sw.pushManager.getSubscription().then((subscription) => {
          return subscription?.toJSON();
        });
      }
    );

    if (subscription) {
      const response = await fetch(
        "https://api.epossu.fi/v2/recoverSubscription",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            subscription: subscription,
          }),
        }
      );

      const data = await response.json();
      if (data.success) localStorage.setItem("subscriptionId", data.data.id);
      return data;
    }

    return null;
  },
  async Subscribe(content: string, when: string) {
    const subscription = await this.registerSW();

    if (Notification.permission === "denied") {
      return {
        error:
          "Ilmoituksien tilaaminen epäonnistui, olet estänyt ilmoitukset selaimen asetuksista.",
      };
    }

    if (!subscription) return;

    const response = await fetch("https://api.epossu.fi/v2/subscribe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        subscription: subscription,
        type: {
          content: content,
          when: when,
        },
      }),
    });

    const data = await response.json();
    if (data.success) localStorage.setItem("subscriptionId", data.data.id);

    return data;
  },
  async unregisterToAPI(subscription: subscriptionJSON) {
    const response = await fetch("https://api.epossu.fi/v2/subscribe", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        subscription,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success == true) {
          localStorage.removeItem("subscriptionId");
          return true;
        } else return false;
      });

    return response;
  },
  async requestTestNotification(subscription: subscriptionJSON) {
    const response = await fetch("https://api.epossu.fi/v2/testNotification", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        subscription,
      }),
    }).then((response) => response.json());

    return response;
  },
};

export default NotificationsHandle;
