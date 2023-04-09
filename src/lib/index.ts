import App from "./App.svelte";
import type { App as KasifApp } from "@kasif-apps/app";

export function init(app: KasifApp) {
  app.notificationManager.success("Hello World");

  app.viewManager.pushView({
    view: {
      id: "svelte-plugin",
      title: "Svelte Plugin",
      icon: null,
      render: {
        render(parent) {
          new App({
            target: parent,
          });

          const instance = document.querySelector("#svelte-plugin");
          return () => {
            if (instance) {
              parent.removeChild(instance);
            }
          };
        },
      },
    },
  });
}
