const navBarMenu = document.querySelector(".js-navbar-menu");
const navBar = document.querySelector(".js-navbar");
navBarMenu.addEventListener("click", () => {
  navBar.classList.toggle("navbar--open");
})