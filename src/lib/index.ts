import App from "./App.svelte";
import type { App as KasifApp } from "@kasif-apps/app";

export function init(app: KasifApp) {
  app.notificationManager.success("Hello from svelte plugin", "Hello");

  app.viewManager.pushView({
    view: {
      id: "svelte-plugin",
      title: "Svelte Plugin",
      icon: {
        type: "icon",
        render: "brand-svelte",
        props: {
          size: 18
        }
      },
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
