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

  createExpense(newExpense);

  // para ir a la vista de lista o index
  location.assign("/");
});

