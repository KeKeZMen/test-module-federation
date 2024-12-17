import { createRoot, Root } from "react-dom/client";

import Header from "./Header";

let root: Root;

const mount = (el: HTMLElement) => {
  root = createRoot(el);

  root.render(<Header />);
};

const unmount = () => {
  root.unmount();
};

export default { mount, unmount };
