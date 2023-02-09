const Store = (function () {
  // Data Store
  const initialExpenses = [
    {
      category: "Shopping",
      description: "Nintendo Switch",
      amount: "450",
    },
    {
      category: "Shopping",
      description: "Playstation 5",
      amount: "600",
    },
  ];

  return {
    expenses: JSON.parse(localStorage.getItem("expenses")) || initialExpenses,
    deleteExpense(expense) {
      const index = expenses.indexOf(expense);
      expenses.splice(index, 1);
      localStorage.setItem("expenses", JSON.stringify(expenses));
    },
    createExpense(expense) {
      expenses.push(expense);
      localStorage.setItem("expenses", JSON.stringify(expenses));
    },
  };
})();

// DOM Handler
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

// create modules --> modelo
// function createHeader() {
//   const template = "<h1>Header jejejej</h1>";
//   const listenHeaderClick = () => {
//     const h1 = document.querySelector("h1");
//     h1.addEventListener("click", () => {
//       console.log("click en el header(h1)");
//     });
//   };
//   return {
//     toString() {
//       return template;
//     },
//     addListeners() {
//       listenHeaderClick();
//     },
//   };
// }

// Create Module IIFE
const Header = (function () {
  const template = `
  <header class="header">
    <div class="container navbar js-navbar">
      <h2>Expenses Tracker</h2>
      <nav>
        <ul class="navbar-links js-navbar-links" role="list">
          <li><a data-ref="expenses">List Expenses</a></li>
          <li><a data-ref="add-expense">Add Expenses</a></li>
        </ul>
      </nav>
      <div class="navbar-icons js-navbar-menu">
        <img src="./images/icons/menu.svg" class="navbar__menu-icon" alt="" />
        <img
          src="./images/icons/close.svg"
          class="navbar__menu-icon-close"
          alt="" />
      </div>
    </div>
  </header>
  `;

  const listenMenu = () => {
    const navBarMenu = document.querySelector(".js-navbar-menu");
    const navBar = document.querySelector(".js-navbar");
    navBarMenu.addEventListener("click", () => {
      navBar.classList.toggle("navbar--open");
    });
  };

  const listenNavigation = () => {
    const ul = document.querySelector(".js-navbar-links");
    const navbar = document.querySelector(".js-navbar");
    ul.addEventListener("click", (event) => {
      const ref = event.target.dataset.ref;
      console.log(ref);
      switch (ref) {
        case "expenses":
          Main.load(ExpenseView);
          navbar.classList.toggle("navbar--open");
          break;
        case "add-expense":
          Main.load(NewExpenseView);
          navbar.classList.toggle("navbar--open");
        default:
          break;
      }
    });
  };

  return {
    toString() {
      return template;
    },
    addListeners() {
      listenMenu();
      listenNavigation();
    },
  };
})();

const renderExpens = (expense) => {
  return `
  <li class="expense">
    <div class="expense__detail">
      <div>
        <p class="heading-sx bold">${expense.category}</p>
        <p class="content-sm gray-300">${expense.description}</p>
      </div>
      <p class="content-xl bold">$${expense.amount}</p>
    </div>
    <div class="expense__actions">
      <a href="#">Delete</a>
    </div>
  </li>
  `;
};

const ExpenseView = (function () {
  const template = `
    <ul class="expenses js-expenses">
      ${Store.expenses.map((expense) => renderExpens(expense)).join("")}
    </ul>
  `;
  return {
    toString() {
      return template;
    },
    addListeners() {},
  };
})();

// layout para mostrar todos
const Layout = (function () {
  const template = `
  ${Header}
  <main class="section">
    <div class="container js-main">
    </div>
  </main>
  `;

  return {
    toString() {
      return template;
    },
    addListeners() {
      Header.addListeners();
    },
  };
})();

// new expense view
const NewExpenseView = (function () {
  const template = `<h2 class="heading-sm text-center mb-4">Add New Expense</h2>`;

  return {
    toString() {
      return template;
    },
    addListeners() {},
  };
})();

// Llamada
const App = DOMHandler("#root");
App.load(Layout);

const Main = DOMHandler(".js-main");
Main.load(ExpenseView);
