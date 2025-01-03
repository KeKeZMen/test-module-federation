import { createApp } from "vue";
import App from "./App.vue";

const app = createApp(App);

const mount = (el: Element) => {
  app.mount(el);
};

const unmount = () => {
  app.unmount();
};

export { mount, unmount };
