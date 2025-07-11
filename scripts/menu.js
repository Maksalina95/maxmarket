document.addEventListener('DOMContentLoaded', () => {
  const burgerBtn = document.getElementById('burgerBtn');
  const menu = document.getElementById('menu');

  <li>
  <button onclick="toggleCategoryMenu()">Каталог ▼</button>
  <ul id="dynamicCategoryMenu" class="hidden"></ul>
</li>
                          
  burgerBtn.addEventListener('click', () => {
    menu.classList.toggle('active'); // Показываем или скрываем меню
  });

  document.addEventListener('click', (e) => {
    if (!menu.contains(e.target) && !burgerBtn.contains(e.target)) {
      menu.classList.remove('active'); // Скрываем меню при клике вне его
    }
  });
});
