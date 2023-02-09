const DOMHandler = function (parentElement) {
  const parent = document.querySelector(parentElement);
  if (!parent) throw new Error("Parent not found");
  return {
    load(module) {
      parent.innerHTML = module;
      module.addListeners();
    },
  };
};

const App = DOMHandler("#root");

// create modules
function createHeader() {
  const template = "<h1>Header jejejej</h1>";
  const listenHeaderClick = () => {
    const h1 = document.querySelector("h1");
    h1.addEventListener("click", () => {
      console.log("click en el header(h1)");
    });
  };
  return {
    toString() {
      return template;
    },
    addListeners() {
      listenHeaderClick();
    },
  };
}

const Header = createHeader();
App.load(Header);
