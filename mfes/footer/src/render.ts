import { App, createApp } from "vue";
import MyApp from "./MyApp.vue";

let app: App<Element>;

const mount = (el: Element) => {
  app = createApp(MyApp);
  app.mount(el);
};

const unmount = () => {
  app.unmount();
};

export { mount, unmount };
