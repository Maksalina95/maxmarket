let allProducts = [];

async function loadAllProductNames() {
  const res = await fetch(`${baseUrl}/products`);
  allProducts = await res.json();
}

function showSuggestions(query) {
  const suggestionsEl = document.getElementById('suggestions');
  suggestionsEl.innerHTML = '';
  const suggestions = allProducts.filter(p => p.name.toLowerCase().includes(query.toLowerCase()));
  suggestions.slice(0, 5).forEach(p => {
    const li = document.createElement('li');
    li.textContent = p.name;
    li.onclick = () => {
      document.getElementById('searchInput').value = p.name;
      applySearch(p.name);
    };
    suggestionsEl.appendChild(li);
  });
}

function applySearch(name) {
  const container = document.getElementById('productList');
  if (!container || allProducts.length === 0) return;
  container.innerHTML = '';
  const results = allProducts.filter(p => p.name.toLowerCase().includes(name.toLowerCase()));
  results.forEach(p => {
    const card = createProductCard(p);
    container.appendChild(card);
  });
}

function clearSearch() {
  document.getElementById('searchInput').value = '';
  document.getElementById('suggestions').innerHTML = '';
  const container = document.getElementById('productList');
  if (container) renderProducts(container);
}

document.addEventListener('DOMContentLoaded', async () => {
  await loadAllProductNames();

  const input = document.getElementById('searchInput');
  input.addEventListener('input', () => {
    const query = input.value.trim();
    if (query) showSuggestions(query);
    else clearSearch();
  });

  document.getElementById('applySearchBtn').addEventListener('click', () => {
    const query = input.value.trim();
    if (query) applySearch(query);
  });

  document.getElementById('clearSearch').addEventListener('click', clearSearch);
});
