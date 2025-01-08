import { App, createApp } from "vue";
import MyApp from "./app/MyApp.vue";

let app: App<Element>;

const mount = (el: Element) => {
  app = createApp(MyApp);
  app.mount(el);
};

const unmount = () => {
  app.unmount();
};

export { mount, unmount };
