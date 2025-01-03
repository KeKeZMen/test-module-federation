type MFFunctions = {
  mount: (el: Element) => void;
  unmount: () => void;
};

const init = () => {
  const mainContainer = document.querySelector("#main-container");

  const headerContainer = document.querySelector("#header-container");
  const loadHeaderButton = document.querySelector(
    "#header-container button"
  ) as HTMLButtonElement;

  loadHeaderButton.addEventListener("click", () => {
    // @ts-ignore
    import("header/Header").then(({ mount, unmount }: MFFunctions) => {
      mount(headerContainer);

      const mountButton = document.createElement("button");
      mountButton.innerHTML = "Mount header";
      mountButton.addEventListener("click", () => {
        mount(headerContainer);
        mainContainer.appendChild(unmountButton);
      });

      const unmountButton = document.createElement("button");
      unmountButton.innerHTML = "Unmount header, check logs";
      unmountButton.addEventListener("click", () => {
        unmount();
        headerContainer.appendChild(mountButton);
        mainContainer.removeChild(unmountButton);
      });

      mainContainer.appendChild(unmountButton);
    });
  });

  const footerContainer = document.querySelector("#footer-container");
  const loadFooterButton = document.querySelector(
    "#footer-container button"
  ) as HTMLButtonElement;

  loadFooterButton.addEventListener("click", () => {
    // @ts-ignore
    import("footer/Footer").then(({ mount, unmount }: MFFunctions) => {
      mount(footerContainer);

      const mountButton = document.createElement("button");
      mountButton.innerHTML = "Mount footer";
      mountButton.addEventListener("click", () => {
        mount(footerContainer);
        mainContainer.appendChild(unmountButton);
      });

      const unmountButton = document.createElement("button");
      unmountButton.innerHTML = "Unmount footer, check logs";
      unmountButton.addEventListener("click", () => {
        unmount();
        footerContainer.appendChild(mountButton);
        mainContainer.removeChild(unmountButton);
      });

      mainContainer.appendChild(unmountButton);
    });
  });
};

init();
