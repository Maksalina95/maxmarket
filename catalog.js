async function loadCatalogData() {
  const response = await fetch(`${baseUrl}/товары`);
  const data = await response.json();

  const categories = [...new Set(data.map(p => p.категория).filter(Boolean))];
  const container = document.getElementById("categoryList");

  container.innerHTML = categories.map(cat =>
    `<button onclick="showSubcategories('${cat}')">${cat}</button>`
  ).join('');
}

function showSubcategories(category) {
  fetch(`${baseUrl}/товары`)
    .then(r => r.json())
    .then(data => {
      const subcategories = [...new Set(data
        .filter(p => p.категория === category)
        .map(p => p.подкатегория)
        .filter(Boolean)
      )];

      const subcatContainer = document.getElementById("subcategoryList");
      subcatContainer.innerHTML = subcategories.map(sub =>
        `<button onclick="showSubsubcategories('${category}','${sub}')">${sub}</button>`
      ).join('');
    });
}

function showSubsubcategories(category, subcategory) {
  fetch(`${baseUrl}/товары`)
    .then(r => r.json())
    .then(data => {
      const subsub = [...new Set(data
        .filter(p => p.категория === category && p.подкатегория === subcategory)
        .map(p => p.подподкатегория)
        .filter(Boolean)
      )];

      const subsubContainer = document.getElementById("subsubcategoryList");
      subsubContainer.innerHTML = subsub.map(sub =>
        `<button onclick="showProducts('${category}', '${subcategory}', '${sub}')">${sub}</button>`
      ).join('');
    });
}

function showProducts(category, subcategory, subsubcategory) {
  fetch(`${baseUrl}/товары`)
    .then(r => r.json())
    .then(data => {
      const filtered = data.filter(p =>
        p.категория === category &&
        p.подкатегория === subcategory &&
        (p.подподкатегория === subsubcategory || !p.подподкатегория)
      );

      renderProductList(filtered, document.getElementById('productList'));
    });
}

loadCatalogData();
