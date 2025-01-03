type MFFunctions = {
  mount: (el: Element) => void;
  unmount: () => void;
};

const init = () => {
  const headerContainer = document.querySelector("#header-container");
  const loadHeaderButton = document.querySelector(
    "#header-container button"
  ) as HTMLButtonElement;

  loadHeaderButton.addEventListener("click", () => {
    // @ts-ignore
    import("header/Header").then(({ mount }: MFFunctions) => {
      mount(headerContainer);
    });
  });

  // const mainContainer = document.querySelector("#main-container");

  // // @ts-ignore
  // import("main/Main").then(({ mount }: MFFunctions) => {
  //   mount(mainContainer);
  // });

  const footerContainer = document.querySelector("#footer-container");
  const loadFooterButton = document.querySelector(
    "#footer-container button"
  ) as HTMLButtonElement;

  loadFooterButton.addEventListener("click", () => {
    // @ts-ignore
    import("footer/Footer").then(({ mount }: MFFunctions) => {
      mount(footerContainer);
    });
  });
};

init();
