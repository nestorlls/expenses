renderExpenses(expenses);

function createExpenseEle(expense) {
  // create elements
  const li = document.createElement("li");
  const expenseDetail = document.createElement("div");
  const container = document.createElement("div");
  const category = document.createElement("p");
  const description = document.createElement("p");
  const amount = document.createElement("p");
  const actions = document.createElement("div");
  const deleteLink = document.createElement("a");

  // Properties of the elements (class, content)
  li.classList.add("expense");
  expenseDetail.classList.add("expense__detail");
  category.classList.add("heading-sx", "bold");
  category.textContent = expense.category;
  description.classList.add("content-sm", "gray-300");
  description.textContent = expense.description;
  amount.classList.add("content-xl", "bold");
  amount.textContent = `$${expense.amount}`;
  actions.classList.add("expense__actions");
  deleteLink.textContent = "Delete";

  // Build template
  container.append(category, description);
  actions.append(deleteLink);
  expenseDetail.append(container, amount);
  li.append(expenseDetail, actions);

  // add Event listeners
  deleteLink.addEventListener("click", (event) => {
    event.preventDefault();
    deleteExpense(expense);
    renderExpenses(expenses);
  });
  return li;
}


// const expense = createExpenseEle(expenses[0]);
// const expenseList = document.querySelector(".js-expenses");
// expenseList.append(expense);

function renderExpenses(expenses) {
  const expenseList = document.querySelector(".js-expenses");
  expenseList.innerHTML = "";
  expenses.forEach((expense) => {
    const expenseElem = createExpenseEle(expense);
    expenseList.append(expenseElem);
  });
}

// // Local Storage
// const peaple = [{ name: "testino" }, { name: "Juan" }, { name: "Angelo" }];
// localStorage.setItem("peaple", JSON.stringify(peaple));

// // recuperar datos de local Stogare # JSON.parse convierte en Array[{},{},{}]
// const peapleFromStorage = JSON.parse(localStorage.getItem("peaple"));
// console.log(peapleFromStorage);
