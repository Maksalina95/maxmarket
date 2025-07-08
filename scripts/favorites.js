async function renderFavoritesPage(container) {
  const favs = JSON.parse(localStorage.getItem('favorites') || '[]');
  const all = await fetchProducts();
  const filtered = all.filter(p => favs.includes(p.id));
  container.innerHTML = filtered.length
    ? filtered.map(createProductCard).join('')
    : "<p>Нет избранных товаров</p>";
}
