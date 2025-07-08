async function fetchProducts() {
  try {
    const response = await fetch(`${baseUrl}/products`);
    return await response.json();
  } catch (e) {
    console.error('Ошибка загрузки товаров:', e);
    return [];
  }
}

function createProductCard(p) {
  return `
    <div class="product-card">
      <img src="${p.photo}" alt="${p.title}">
      <h3>${p.title}</h3>
      <p>${p.price} ₽</p>
      <p>${p.description || ''}</p>
      <a href="https://wa.me/79376280080" target="_blank">Связаться</a>
      <button class="fav-btn" data-fav-id="${p.id}" onclick="toggleFavorite('${p.id}')">☆</button>
    </div>
  `;
}

async function renderProductList(container) {
  const products = await fetchProducts();
  container.innerHTML = products.map(createProductCard).join('');
}

function toggleFavorite(id) {
  let favs = JSON.parse(localStorage.getItem('favorites') || '[]');
  if (favs.includes(id)) {
    favs = favs.filter(f => f !== id);
  } else {
    favs.push(id);
  }
  localStorage.setItem('favorites', JSON.stringify(favs));
}
