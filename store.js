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

const expensesFromStorage = JSON.parse(localStorage.getItem("expenses")); // values || null
const expenses = expensesFromStorage || initialExpenses;

function createExpense(expense) {
  expenses.push(expense);
  localStorage.setItem("expenses", JSON.stringify(expenses));
}

function deleteExpense(expense) {
  const index = expenses.indexOf(expense);
  expenses.splice(index, 1);
  localStorage.setItem("expenses", JSON.stringify(expenses));
}