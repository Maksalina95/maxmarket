function toggleFavorite(productId) {
  let favs = JSON.parse(localStorage.getItem('favorites') || '[]');
  if (favs.includes(productId)) {
    favs = favs.filter(id => id !== productId);
  } else {
    favs.push(productId);
  }
  localStorage.setItem('favorites', JSON.stringify(favs));
  alert('Обновлено избранное');
}

async function renderFavoritesPage(container) {
  const favs = JSON.parse(localStorage.getItem('favorites') || '[]');
  if (favs.length === 0) {
    container.innerHTML = '<p>Пока нет избранных товаров.</p>';
    return;
  }

  const res = await fetch(`${baseUrl}/products`);
  const products = await res.json();
  const favProducts = products.filter(p => favs.includes(p.id));
  favProducts.forEach(p => {
    const card = createProductCard(p);
    container.appendChild(card);
  });
}
