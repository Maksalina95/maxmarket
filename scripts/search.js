let allProducts = [];

async function loadProductsForSearch() {
  try {
    const res = await fetch(`${baseUrl}/products`);
    allProducts = await res.json();
  } catch (err) {
    console.error("Ошибка загрузки данных для поиска:", err);
  }
}

function showSuggestions(value) {
  const suggestions = document.getElementById("suggestions");
  suggestions.innerHTML = "";

  const filtered = allProducts.filter(p => p.title.toLowerCase().includes(value.toLowerCase()));
  filtered.forEach(p => {
    const li = document.createElement("li");
    li.textContent = p.title;
    li.onclick = () => {
      document.getElementById("searchInput").value = p.title;
      suggestions.innerHTML = "";
    };
    suggestions.appendChild(li);
  });
}

function setupSearchInput() {
  const input = document.getElementById("searchInput");
  input.addEventListener("input", (e) => {
    showSuggestions(e.target.value);
  });
}

function applySearch() {
  const query = document.getElementById("searchInput").value.toLowerCase();
  const filtered = allProducts.filter(p => p.title.toLowerCase().includes(query));
  const container = document.getElementById("productList");
  container.innerHTML = filtered.map(createProductCard).join('');
}

function clearSearch() {
  document.getElementById("searchInput").value = "";
  document.getElementById("suggestions").innerHTML = "";
}
