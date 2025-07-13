// menu.js
document.addEventListener("DOMContentLoaded", () => {
  const menu = document.createElement("div");
  menu.className = "bottom-icons";
  menu.innerHTML = `
    <button onclick="openPanel('Каталог', 'catalog.html')" aria-label="Каталог">🛒<span class="tooltip">Каталог</span></button>
    <button onclick="openPanel('Контакты', 'contacts.html')" aria-label="Контакты">📞<span class="tooltip">Контакты</span></button>
    <button onclick="openPanel('Доставка', 'delivery.html')" aria-label="Доставка">🚖<span class="tooltip">Доставка</span></button>
    <button onclick="openPanel('Избранное', 'favorites.html')" aria-label="Избранное">❤️<span class="tooltip">Избранное</span></button>
    <button onclick="openPanel('Адрес', 'adress.html')" aria-label="Адрес">📍<span class="tooltip">Адрес</span></button>
    <button onclick="openPanel('Условия', 'rules.html')" aria-label="Условия">📝<span class="tooltip">Условия</span></button>
    <button onclick="openPanel('Отзывы', 'reviews.html')" aria-label="Отзывы">🏆<span class="tooltip">Отзывы</span></button>
    <button onclick="location.reload()" aria-label="Обновить">🔄<span class="tooltip">Обновить</span></button>
  `;
  document.body.appendChild(menu);
});
