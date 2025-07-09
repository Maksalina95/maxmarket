async function fetchProducts() {
  const res = await fetch(`${baseUrl}/products`);
  return await res.json();
}

function createProductCard(p) {
  const card = document.createElement('div');
  card.className = 'product-card';

  card.innerHTML = `
    <img src="${p.photo}" alt="${p.name}" />
    <h3>${p.name}</h3>
    <p>${p.description || ''}</p>
    <p><strong>${p.price} ₽</strong></p>
    <button class="fav-btn" data-fav-id="${p.id}" onclick="toggleFavorite('${p.id}')">☆</button>
    <a href="https://wa.me/89376280080" class="whatsapp-btn" target="_blank">WhatsApp</a>
    <a href="product.html?id=${p.id}" class="details-btn">Подробнее</a>
  `;
  return card;
}

async function renderProducts(container) {
  const products = await fetchProducts();
  container.innerHTML = '';
  products.reverse().forEach(p => {
    const card = createProductCard(p);
    container.appendChild(card);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const productList = document.getElementById('productList');
  if (productList) renderProducts(productList);
});
