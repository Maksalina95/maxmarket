document.getElementById('burgerBtn').addEventListener('click', () => {
  const menu = document.getElementById('menu');
  menu.classList.toggle('hidden');
});

document.addEventListener('DOMContentLoaded', () => {
  const menu = document.getElementById('menu');
  menu.innerHTML = `
    <ul>
      <li><a href="catalog.html">Каталог</a></li>
      <li><a href="favorites.html">Избранное</a></li>
      <li><a href="delivery.html">Доставка</a></li>
      <li><a href="contacts.html">Контакты</a></li>
      <li><a href="rules.html">Условия</a></li>
    </ul>
  `;
});
