const idGenerator = (() => {
  let id = 0;
  return {
    next() {
      return ++id;
    },
  };
})();

const Store = (function () {
  // Data Store
  const initialExpenses = [
    {
      id: idGenerator.next(),
      category: "Shopping",
      description: "Nintendo Switch",
      amount: "450",
    },
    {
      id: idGenerator.next(),
      category: "Shopping",
      description: "Playstation 5",
      amount: "600",
    },
  ];

  return {
    expenses: JSON.parse(localStorage.getItem("expenses")) || initialExpenses,
    deleteExpense(id) {
      const index = this.expenses.findIndex((expense) => expense.id == id);
      this.expenses.splice(index, 1);
      localStorage.setItem("expenses", JSON.stringify(this.expenses));
      Main.load(ExpenseView)
    },
    createExpense(expense) {
      expense.id = idGenerator.next();
      this.expenses.push(expense);
      localStorage.setItem("expenses", JSON.stringify(this.expenses));
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

const ExpenseView = (function () {
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
        <a data-id="${expense.id}"class="js-delete">Delete</a>
      </div>
    </li>
    `;
  };
  const template = () => `
    <ul class="expenses js-expenses">
      ${Store.expenses.map((expense) => renderExpens(expense)).join("")}
    </ul>
  `;

  const listenDelete = () => {
    const expensesList = document.querySelector(".js-expenses");
    expensesList.addEventListener("click", (event) => {
      event.preventDefault();
      if (!event.target.classList.contains("js-delete")) return;
      const id = event.target.dataset.id;
      Store.deleteExpense(id);
    });
  };
  return {
    toString() {
      return template();
    },
    addListeners() {
      listenDelete();
    },
  };
})();

// footer
const Footer = (function () {
  const template = `
  <footer class="footer">
    <p>Codeable 2023</p>
  </footer>
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
  ${Footer}
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

const createInput = ({ id, label, placeholder = "", type = "text" }) => {
  return `
  <div class="input">
    <label for="${id}" class="content-xs overline">${label}</label>
    <div class="input__container">
      <input type="${type}"
        name="${id}"
        id="${id}"
        class="input__content"
        placeholder="${placeholder}">
    </div>
  </div>
  `;
};

// new expense view
const NewExpenseView = (function () {
  const template = `
  <h2 class="heading-sm mb-4 text-center">Add new Expense</h2>
  <form action="#" class="flex flex-column gap-4 js-expense-form">
    ${createInput({
      id: "category",
      label: "category",
      placeholder: "Example: Shopping",
    })}
    ${createInput({
      id: "description",
      label: "description",
      placeholder: "Example: Description Shopping",
    })}
    ${createInput({ id: "amount", label: "amount", type: "number" })}
    <button type="submit" class="button button--primary button--lg full-width">Add expense</button>
  </form>
  `;

  const listenSubmit = () => {
    const form = document.querySelector(".js-expense-form");
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      console.log("submit!!");
      const { category, description, amount } = event.target.elements;
      const newExpense = {
        category: category.value,
        description: description.value,
        amount: amount.value,
      };

      Store.createExpense(newExpense);

      // para ir a la vista de lista o index
      Main.load(ExpenseView);
    });
  };

  return {
    toString() {
      return template;
    },
    addListeners() {
      listenSubmit();
    },
  };
})();

// Llamada
const App = DOMHandler("#root");
App.load(Layout);

const Main = DOMHandler(".js-main");
Main.load(ExpenseView);
