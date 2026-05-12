(function () {
  'use strict';

  /* ---------- LUXURY GALLERY DATA ---------- */
  const GALLERY_IMAGES = [
    { src: 'assets/resin-art/img_1.png', category: 'resin', title: 'Oceanic Essence', tag: 'Resin Art' },
    { src: 'assets/resin-art/img_2.png', category: 'resin', title: 'Marble Mystique', tag: 'Resin Art' },
    { src: 'assets/resin-art/img_3.png', category: 'resin', title: 'Crystal Flow', tag: 'Resin Art' },
    { src: 'assets/resin-art/img_4.png', category: 'resin', title: 'Ethereal Pour', tag: 'Resin Art' },
    { src: 'assets/gift-hampers/img_1.png', category: 'hamper', title: 'Royal Celebration', tag: 'Gift Hamper' },
    { src: 'assets/gift-hampers/img_2.png', category: 'hamper', title: 'Artisan Selection', tag: 'Gift Hamper' },
    { src: 'assets/gift-hampers/img_3.png', category: 'hamper', title: 'Golden Festive', tag: 'Gift Hamper' },
    { src: 'assets/gift-hampers/img_4.png', category: 'hamper', title: 'Classic Elegance', tag: 'Gift Hamper' },
    { src: 'assets/gift-hampers/img_5.png', category: 'hamper', title: 'Premium Curations', tag: 'Gift Hamper' },
    { src: 'assets/gift-hampers/img_6.png', category: 'hamper', title: 'Luxury Hamper', tag: 'Gift Hamper' },
    { src: 'assets/gift-hampers/img_7.png', category: 'hamper', title: 'Floral Delight', tag: 'Gift Hamper' },
    { src: 'assets/gift-hampers/img_8.jpeg', category: 'hamper', title: 'Festive Pack', tag: 'Gift Hamper' },
    { src: 'assets/gift-hampers/img_9.jpeg', category: 'hamper', title: 'Sweet Curation', tag: 'Gift Hamper' },
    { src: 'assets/gift-hampers/img_10.jpeg', category: 'hamper', title: 'Gift Ensemble', tag: 'Gift Hamper' },
    { src: 'assets/gift-hampers/img_11.jpeg', category: 'hamper', title: 'Grand Selection', tag: 'Gift Hamper' },
    { src: 'assets/rangoli/img_1.png', category: 'rangoli', title: 'Sacred Mandala', tag: 'Rangoli' },
    { src: 'assets/rangoli/img_2.png', category: 'rangoli', title: 'Floral Symphony', tag: 'Rangoli' },
    { src: 'assets/rangoli/img_3.png', category: 'rangoli', title: 'Vibrant Harmony', tag: 'Rangoli' },
    { src: 'assets/rangoli/img_4.png', category: 'rangoli', title: 'Peacock Bloom', tag: 'Rangoli' },
    { src: 'assets/rangoli/img_5.png', category: 'rangoli', title: 'Celestial Pattern', tag: 'Rangoli' }
  ];

  const DISPLAY_LIMIT = 6;
  let currentFilter = 'all';

  /* ---------- DYNAMIC GALLERY BUILDER ---------- */
  function initDynamicGallery() {
    const grid = document.getElementById('galleryGrid');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (!grid) return;

    GALLERY_IMAGES.forEach((img, i) => {
      const card = document.createElement('div');
      card.className = 'gallery-card reveal';
      card.dataset.category = img.category;
      
      card.innerHTML = `
        <img src="${img.src}" alt="${img.title}" loading="lazy">
        <div class="card-overlay">
          <span class="card-tag">${img.tag}</span>
          <h3>${img.title}</h3>
        </div>
      `;
      grid.appendChild(card);
    });

    loadMoreBtn.addEventListener('click', () => {
      const hidden = document.querySelectorAll('.gallery-card.limit-hidden');
      hidden.forEach((card, i) => {
        setTimeout(() => {
          card.classList.remove('limit-hidden');
          card.style.display = 'block';
          setTimeout(() => card.classList.add('visible'), 50);
        }, i * 100);
      });
      document.getElementById('loadMoreContainer').style.display = 'none';
    });

    refreshGalleryDisplay();
    initLightbox();
  }

  function refreshGalleryDisplay() {
    const cards = document.querySelectorAll('.gallery-card');
    const loadMoreContainer = document.getElementById('loadMoreContainer');
    let count = 0;

    cards.forEach(card => {
      card.classList.remove('visible', 'limit-hidden');
      card.style.display = 'none';
      
      const match = currentFilter === 'all' || card.dataset.category === currentFilter;
      if (match) {
        count++;
        if (count <= DISPLAY_LIMIT) {
          card.style.display = 'block';
          setTimeout(() => card.classList.add('visible'), 100);
        } else {
          card.classList.add('limit-hidden');
        }
      }
    });

    loadMoreContainer.style.display = (count > DISPLAY_LIMIT) ? 'flex' : 'none';
  }

  /* ---------- LUXURY FILTER SYSTEM ---------- */
  function initGalleryFilter() {
    const btns = document.querySelectorAll('.filter-btn');
    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        btns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.filter;
        refreshGalleryDisplay();
      });
    });
  }

  /* ---------- NAVIGATION REFINEMENT ---------- */
  function initNavbar() {
    const nav = document.getElementById('mainNav');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    });
  }

  /* ---------- CINEMATIC REVEAL ---------- */
  function initReveal() {
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });
    reveals.forEach(el => observer.observe(el));
  }

  /* ---------- LIGHTBOX ---------- */
  function initLightbox() {
    const lb = document.getElementById('lightbox');
    const lbImg = document.getElementById('lightboxImg');
    const lbClose = document.getElementById('lightboxClose');

    document.querySelectorAll('.gallery-card').forEach(card => {
      card.addEventListener('click', () => {
        lbImg.src = card.querySelector('img').src;
        lb.classList.add('open');
      });
    });

    lbClose.addEventListener('click', () => lb.classList.remove('open'));
    lb.addEventListener('click', (e) => {
      if (e.target === lb) lb.classList.remove('open');
    });
  }

  /* ---------- INIT MASTERPIECE ---------- */
  document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initDynamicGallery();
    initGalleryFilter();
    initReveal();
  });

})();
