const searchInput = document.getElementById('searchInput');
const applyBtn = document.getElementById('applySearchBtn');
const clearBtn = document.getElementById('clearSearch');
const suggestions = document.getElementById('suggestions');
let allProducts = [];

function renderProducts(products) {
  const list = document.getElementById("productList");
  list.innerHTML = "";
  products.forEach(p => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${p.фото}" alt="${p.название}">
      <h3>${p.название}</h3>
      <p>${p.описание || ""}</p>
      <p><strong>${p.цена} ₽</strong></p>
      <a href="https://wa.me/798376280080" target="_blank">WhatsApp</a>
      <button class="fav-btn" data-fav-id="${p.id}" onclick="toggleFavorite('${p.id}')">☆</button>
    `;
    list.appendChild(card);
  });
}

function filterSuggestions(query) {
  const matches = allProducts.filter(p => p.название.toLowerCase().includes(query.toLowerCase()));
  suggestions.innerHTML = "";
  matches.slice(0, 5).forEach(p => {
    const li = document.createElement("li");
    li.textContent = p.название;
    li.onclick = () => {
      searchInput.value = p.название;
      suggestions.innerHTML = "";
    };
    suggestions.appendChild(li);
  });
}

searchInput.addEventListener("input", e => {
  const query = e.target.value;
  if (query.length > 0) {
    filterSuggestions(query);
  } else {
    suggestions.innerHTML = "";
  }
});

applyBtn.addEventListener("click", () => {
  const query = searchInput.value.toLowerCase();
  const result = allProducts.filter(p => p.название.toLowerCase().includes(query));
  renderProducts(result);
});

clearBtn.addEventListener("click", () => {
  searchInput.value = "";
  suggestions.innerHTML = "";
  renderProducts(allProducts); // вернуть всё
});

fetch(`${baseUrl}/Товары`)
  .then(res => res.json())
  .then(data => {
    allProducts = data.reverse(); // новинки сверху
    renderProducts(allProducts);
  });
