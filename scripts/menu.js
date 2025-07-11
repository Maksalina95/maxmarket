document.addEventListener('DOMContentLoaded', () => {
  const burgerBtn = document.getElementById('burgerBtn');
  const menu = document.getElementById('menu');
  const catalogBtn = document.getElementById('catalogBtn');
  const dynamicCategoryMenu = document.getElementById('dynamicCategoryMenu');
  const productList = document.getElementById('productList');

  // 🍔 Открытие/закрытие меню
  burgerBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    menu.classList.toggle('active');
  });

  // Закрытие при клике вне меню
  document.addEventListener('click', (e) => {
    if (!menu.contains(e.target) && !burgerBtn.contains(e.target)) {
      menu.classList.remove('active');
      dynamicCategoryMenu.classList.add('hidden');
    }
  });

  // 📁 Открытие Каталога
  catalogBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    dynamicCategoryMenu.classList.toggle('hidden');
    if (!dynamicCategoryMenu.dataset.loaded) {
      loadCategories();
      dynamicCategoryMenu.dataset.loaded = 'true';
    }
  });
});

// 📦 Загрузка категорий
async function loadCategories() {
  const dynamicCategoryMenu = document.getElementById('dynamicCategoryMenu');
  try {
    const res = await fetch(`${baseUrl}/Лист1`);
    const data = await res.json();

    const categories = [...new Set(data.map(p => p.категория).filter(Boolean))];

    dynamicCategoryMenu.innerHTML = categories.map(cat =>
      `<li><button class="category-btn" data-category="${cat}">${cat}</button></li>`
    ).join('');

    dynamicCategoryMenu.querySelectorAll('.category-btn').forEach(btn => {
      btn.addEventListener('click', () => showSubcategories(btn.dataset.category));
    });
  } catch (err) {
    console.error('Ошибка загрузки категорий:', err);
  }
}

// 📁 Подкатегории
async function showSubcategories(category) {
  const dynamicCategoryMenu = document.getElementById('dynamicCategoryMenu');
  try {
    const res = await fetch(`${baseUrl}/Лист1`);
    const data = await res.json();

    const subcategories = [...new Set(
      data.filter(p => p.категория === category)
          .map(p => p.подкатегория)
          .filter(Boolean)
    )];

    if (subcategories.length === 0) {
      showProducts(category, null, null);
      dynamicCategoryMenu.classList.add('hidden');
      return;
    }

    dynamicCategoryMenu.innerHTML = `
      <li><button id="backToCategories">← Назад</button></li>
      ${subcategories.map(sub =>
        `<li><button class="subcategory-btn" data-category="${category}" data-subcategory="${sub}">${sub}</button></li>`
      ).join('')}
    `;

    document.getElementById('backToCategories').addEventListener('click', loadCategories);

    dynamicCategoryMenu.querySelectorAll('.subcategory-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        showSubsubcategories(btn.dataset.category, btn.dataset.subcategory);
      });
    });

  } catch (err) {
    console.error('Ошибка подкатегорий:', err);
  }
}

// 📁 Подподкатегории
async function showSubsubcategories(category, subcategory) {
  const dynamicCategoryMenu = document.getElementById('dynamicCategoryMenu');
  try {
    const res = await fetch(`${baseUrl}/Лист1`);
    const data = await res.json();

    const subsubs = [...new Set(
      data.filter(p => p.категория === category && p.подкатегория === subcategory)
          .map(p => p.подподкатегория)
          .filter(Boolean)
    )];

    if (subsubs.length === 0) {
      showProducts(category, subcategory, null);
      dynamicCategoryMenu.classList.add('hidden');
      return;
    }

    dynamicCategoryMenu.innerHTML = `
      <li><button id="backToSubcategories">← Назад</button></li>
      ${subsubs.map(sub =>
        `<li><button class="subsubcategory-btn" data-category="${category}" data-subcategory="${subcategory}" data-subsubcategory="${sub}">${sub}</button></li>`
      ).join('')}
    `;

    document.getElementById('backToSubcategories').addEventListener('click', () => {
      showSubcategories(category);
    });

    dynamicCategoryMenu.querySelectorAll('.subsubcategory-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        showProducts(btn.dataset.category, btn.dataset.subcategory, btn.dataset.subsubcategory);
        dynamicCategoryMenu.classList.add('hidden');
      });
    });

  } catch (err) {
    console.error('Ошибка подподкатегорий:', err);
  }
}

// 🎯 Показ товаров
async function showProducts(category, subcategory, subsubcategory) {
  try {
    const res = await fetch(`${baseUrl}/Лист1`);
    const data = await res.json();

    let filtered = data.filter(p => p.категория === category);
    if (subcategory) filtered = filtered.filter(p => p.подкатегория === subcategory);
    if (subsubcategory) filtered = filtered.filter(p => p.подподкатегория === subsubcategory);

    renderProductList(filtered, document.getElementById('productList'));

  } catch (err) {
    console.error('Ошибка отображения товаров:', err);
  }
}
