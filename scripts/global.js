document.addEventListener("DOMContentLoaded", () => {
  // Ищем контейнер, куда вставим кнопку
  const container = document.getElementById("close-button-container");
  if (container) {
    container.innerHTML = `
      <button class="close-button" onclick="location.href='index.html'" aria-label="Закрыть">✕</button>
    `;
  }
});
