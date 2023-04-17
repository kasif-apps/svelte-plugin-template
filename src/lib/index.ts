import App from "./App.svelte";
import type { App as KasifApp } from "@kasif-apps/app";
import { greet } from "../remote/index";

export async function init(app: KasifApp) {
  const message = await greet("from svelte plugin")
  app.notificationManager.success(message, "Hello");

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
        render(parent: HTMLElement) {
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
