document.addEventListener('DOMContentLoaded', () => {
  const burgerBtn = document.getElementById('burgerBtn');
  const menu = document.getElementById('menu');

  burgerBtn.addEventListener('click', () => {
    menu.classList.toggle('hidden');
  });

  document.addEventListener('click', (e) => {
    if (!menu.contains(e.target) && !burgerBtn.contains(e.target)) {
      menu.classList.add('hidden');
    }
  });
});
