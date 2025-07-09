let currentSlide = 0;

function showSlide(index) {
  const slides = document.querySelectorAll('.slider img');
  slides.forEach((slide, i) => {
    slide.classList.remove('active');
    if (i === index) {
      slide.classList.add('active');
    }
  });
}

function startSlider() {
  const slides = document.querySelectorAll('.slider img');
  if (slides.length === 0) return;

  showSlide(currentSlide);
  setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }, 5000);
}

document.addEventListener('DOMContentLoaded', startSlider);
