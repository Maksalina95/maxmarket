document.addEventListener('DOMContentLoaded', () => {
  const burgerBtn = document.getElementById('burgerBtn');
  const menu = document.getElementById('menu');

  <li>
  <button onclick="toggleCategoryMenu()">Каталог ▼</button>
  <ul id="dynamicCategoryMenu" class="hidden"></ul>
</li>
                          async function toggleCategoryMenu() {
  const menu = document.getElementById("dynamicCategoryMenu");
  if (menu.classList.contains("loaded")) {
    menu.classList.toggle("hidden");
    return;
  }
async function filterFromMenu(category, subcategory) {
  const res = await fetch(`${baseUrl}/Лист1`);
  const data = await res.json();

  const filtered = data.filter(p =>
    p.категория === category &&
    p.подкатегория === subcategory
  );

  const container = document.getElementById("productList");
  container.innerHTML = "";
  filtered.forEach(p => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${p.фото}" alt="${p.название}">
      <h3>${p.название}</h3>
      <p>${p.описание || ""}</p>
      <p><strong>${p.цена} ₽</strong></p>
      <a href="https://wa.me/798376280080" target="_blank">WhatsApp</a>
    `;
    container.appendChild(card);
  });

  // Закрыть меню после выбора
  document.getElementById("menu").classList.add("hidden");
}
  const res = await fetch(`${baseUrl}/Лист1`);
  const data = await res.json();

  const categories = [...new Set(data.map(p => p.категория).filter(Boolean))];

  menu.innerHTML = categories.map(cat => `
    <li>
      <button onclick="showMenuSubcategories('${cat}', this)">📁 ${cat}</button>
      <ul class="subcat hidden" id="subcat-${cat}"></ul>
    </li>
  `).join('');

  menu.classList.add("loaded");
  menu.classList.remove("hidden");
}
                          
  burgerBtn.addEventListener('click', () => {
    menu.classList.toggle('active'); // Показываем или скрываем меню
  });

  document.addEventListener('click', (e) => {
    if (!menu.contains(e.target) && !burgerBtn.contains(e.target)) {
      menu.classList.remove('active'); // Скрываем меню при клике вне его
    }
  });
});
