document.addEventListener("DOMContentLoaded", () => {  
  fetch(`${baseUrl}/Лист1`) // если твой лист называется "Лист1"  
    .then(res => res.json())  
    .then(data => {  
      const container = document.getElementById("productList");  
      if (!container) return;  
  
      const items = data.reverse();  
      items.forEach(p => {  
        const card = document.createElement("div");  
        card.className = "product-card";  
  
        const isFavorite = getFavorites().includes(p.id);  
  
        card.innerHTML = `  
          <img src="${p.фото}" alt="${p.название}">  
          <h3>${p.название}</h3>  
          <p>${p.описание || ""}</p>  
          <p><strong>${p.цена} ₽</strong></p>  
          <a href="https://wa.me/798376280080" target="_blank">WhatsApp</a>  
        `;  
  
        const favBtn = document.createElement("button");  
        favBtn.className = "fav-btn";  
        favBtn.innerHTML = isFavorite ? "❤️" : "🤍";  
        favBtn.onclick = () => toggleFavorite(p.id, favBtn);  
        card.appendChild(favBtn);  
  
        container.appendChild(card);  
      });  
    });  
  
  // Автослайдер  
  const slides = document.querySelectorAll(".slide");  
  let currentSlide = 0;  
  
  if (slides.length > 0) {  
    slides[currentSlide].classList.add("active");  
  
    setInterval(() => {  
      slides[currentSlide].classList.remove("active");  
      currentSlide = (currentSlide + 1) % slides.length;  
      slides[currentSlide].classList.add("active");  
    }, 5000);  
  }  
});  
  
// 🌟 Функции избранного  
function getFavorites() {  
  return JSON.parse(localStorage.getItem("favorites") || "[]");  
}  
  
function toggleFavorite(id, button) {  
  let favorites = getFavorites();  
  if (favorites.includes(id)) {  
    favorites = favorites.filter(favId => favId !== id);  
    button.innerHTML = "🤍"; // не добавлено  
  } else {  
    favorites.push(id);  
    button.innerHTML = "❤️"; // добавлено  
  }  
  localStorage.setItem("favorites", JSON.stringify(favorites));  
}
