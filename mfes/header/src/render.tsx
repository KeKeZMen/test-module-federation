import { createRoot, Root } from "react-dom/client";

import Header from "./app";

let root: Root;

const mount = (el: Element) => {
  root = createRoot(el);
  root.render(<Header />);
};

const unmount = () => {
  root.unmount();
};

export { mount, unmount };
