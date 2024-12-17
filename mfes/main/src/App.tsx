import { useEffect, useRef } from "react";

const importHeaderFuncs = (): Promise<{
  default: { mount: (el: HTMLElement) => void; unmount: () => void };
  /* @ts-ignore */
}> => import("header/render");

function App() {
  const headerRef = useRef<{
    mount: (el: HTMLElement) => void;
    unmount: () => void;
  }>(null);

  useEffect(() => {
    importHeaderFuncs().then(({ default: { mount, unmount } }) => {
      headerRef.current = { mount, unmount };
    });
  }, []);

  const handleMount = () =>
    headerRef.current?.mount(document.getElementById("header")!);

  const handleUnmount = () => headerRef.current?.unmount();

  return (
    <>
      <div id="header"></div>
      <button onClick={handleMount}>mount</button>
      <button onClick={handleUnmount}>unmount</button>
    </>
  );
}

export default App;
