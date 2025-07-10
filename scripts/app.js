document.addEventListener("DOMContentLoaded", () => {
  fetch(`${baseUrl}/Товары`)
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById("productList");
      if (!container) return;

      const items = data.reverse(); // Последние сверху
      items.forEach(p => {
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
        container.appendChild(card);
      });
    });

  // Автослайдер
  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;
  if (slides.length) {
    slides[currentSlide].classList.add("active");
    setInterval(() => {
      slides[currentSlide].classList.remove("active");
      currentSlide = (currentSlide + 1) % slides.length;
      slides[currentSlide].classList.add("active");
    }, 5000);
  }
});
