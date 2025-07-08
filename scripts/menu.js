function setupMenu() {
  const burgerBtn = document.querySelector(".menu-burger");
  const menu = document.querySelector(".burger-menu");

  burgerBtn.addEventListener("click", () => {
    menu.classList.toggle("active");
  });

  document.addEventListener("click", (e) => {
    if (!menu.contains(e.target) && !burgerBtn.contains(e.target)) {
      menu.classList.remove("active");
    }
  });
}

document.addEventListener("DOMContentLoaded", setupMenu);
