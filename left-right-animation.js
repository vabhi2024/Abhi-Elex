function animateOnScroll() {
  const boxes = document.querySelectorAll('.box');

  boxes.forEach(box => {
    const rect = box.getBoundingClientRect();
    const trigger = window.innerHeight * 0.8;

    if (rect.top < trigger) {
      box.classList.add('show');
    } else {
      box.classList.remove('show');   // Scroll upar karne par reset
    }
  });
}

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);