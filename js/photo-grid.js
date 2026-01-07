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

const previewGrid = document.querySelector(".preview-grid");

if (previewGrid) {
  const ROW_SIZE = 4;
  let currentRow;

  for (let i = 1; i <= 16; i++) {
    // start a new row every 4 photos
    if ((i - 1) % ROW_SIZE === 0) {
      currentRow = document.createElement("div");
      currentRow.className = "preview-row";
      previewGrid.appendChild(currentRow);
    }

    const photo = document.createElement("div");
    photo.className = "photo-item";

    const img = document.createElement("img");
    img.src = `assets/photoTab/photo${i}.png`;
    img.alt = `Photo ${i}`;
    img.loading = "lazy";

    photo.appendChild(img);
    currentRow.appendChild(photo);
  }

  // observe rows
  const rowObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          rowObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2
    }
  );

  document.querySelectorAll(".preview-row").forEach(row => {
    rowObserver.observe(row);
  });
}
