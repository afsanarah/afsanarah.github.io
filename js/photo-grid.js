document.addEventListener('DOMContentLoaded', () => {
  /* =========================
     CONFIG
  ========================= */
  const TOTAL_PHOTOS = 38;
  const PHOTO_PATH = 'assets/photoTab/';

  const grid = document.getElementById('photoGrid');

  /* =========================
     BUILD GRID
  ========================= */
  for (let i = 1; i <= TOTAL_PHOTOS; i++) {
    const wrapper = document.createElement('div');
    wrapper.className = 'photo-item';

    const img = document.createElement('img');
    img.src = `${PHOTO_PATH}photo${i}.png`;
    img.alt = `Photography ${i}`;
    img.loading = 'lazy';

    wrapper.appendChild(img);
    grid.appendChild(wrapper);
  }

  /* =========================
     SIZE TOGGLE
  ========================= */
  const buttons = document.querySelectorAll('.photo-controls button');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      grid.classList.remove('small', 'medium', 'large');
      grid.classList.add(btn.dataset.size);
    });
  });

  /* =========================
     SCROLL REVEAL
  ========================= */
  const photos = document.querySelectorAll('.photo-item');

  const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  {
    rootMargin: '0px 0px -120px 0px',
    threshold: 0.1
  }
);


  photos.forEach(photo => observer.observe(photo));
});
