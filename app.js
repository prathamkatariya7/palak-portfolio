(function () {
  'use strict';

  /* ---------- FULL ASSET LIBRARY (PRODUCTION READY) ---------- */
  const GALLERY_IMAGES = [
    // RESIN ART (4)
    { src: 'assets/resin-art/img_1.png', category: 'resin', title: 'Oceanic Essence', tag: 'Resin Art' },
    { src: 'assets/resin-art/img_2.png', category: 'resin', title: 'Marble Mystique', tag: 'Resin Art' },
    { src: 'assets/resin-art/img_3.png', category: 'resin', title: 'Crystal Flow', tag: 'Resin Art' },
    { src: 'assets/resin-art/img_4.png', category: 'resin', title: 'Ethereal Pour', tag: 'Resin Art' },
    
    // GIFT HAMPERS (11)
    { src: 'assets/gift-hampers/img_1.png', category: 'hamper', title: 'Royal Celebration', tag: 'Gift Hamper' },
    { src: 'assets/gift-hampers/img_2.png', category: 'hamper', title: 'Artisan Selection', tag: 'Gift Hamper' },
    { src: 'assets/gift-hampers/img_3.png', category: 'hamper', title: 'Golden Festive', tag: 'Gift Hamper' },
    { src: 'assets/gift-hampers/img_4.png', category: 'hamper', title: 'Classic Elegance', tag: 'Gift Hamper' },
    { src: 'assets/gift-hampers/img_5.png', category: 'hamper', title: 'Premium Curations', tag: 'Gift Hamper' },
    { src: 'assets/gift-hampers/img_6.png', category: 'hamper', title: 'Elite Gifting', tag: 'Gift Hamper' },
    { src: 'assets/gift-hampers/img_7.png', category: 'hamper', title: 'Grand Festive', tag: 'Gift Hamper' },
    { src: 'assets/gift-hampers/img_8.jpeg', category: 'hamper', title: 'Floral Delight', tag: 'Gift Hamper' },
    { src: 'assets/gift-hampers/img_9.jpeg', category: 'hamper', title: 'Sweet Sensations', tag: 'Gift Hamper' },
    { src: 'assets/gift-hampers/img_10.jpeg', category: 'hamper', title: 'Luxe Selection', tag: 'Gift Hamper' },
    { src: 'assets/gift-hampers/img_11.jpeg', category: 'hamper', title: 'Chic Celebration', tag: 'Gift Hamper' },

    // RANGOLI (5)
    { src: 'assets/rangoli/img_1.png', category: 'rangoli', title: 'Sacred Mandala', tag: 'Rangoli' },
    { src: 'assets/rangoli/img_2.png', category: 'rangoli', title: 'Floral Symphony', tag: 'Rangoli' },
    { src: 'assets/rangoli/img_3.png', category: 'rangoli', title: 'Vibrant Harmony', tag: 'Rangoli' },
    { src: 'assets/rangoli/img_4.png', category: 'rangoli', title: 'Peacock Bloom', tag: 'Rangoli' },
    { src: 'assets/rangoli/img_5.png', category: 'rangoli', title: 'Celestial Pattern', tag: 'Rangoli' }
  ];

  /* ---------- DESIGNER AURA ENGINE ---------- */
  function initDesignerAura() {
    const aura = document.getElementById('cursorAura');
    if (!aura) return;
    window.addEventListener('mousemove', (e) => {
      const x = e.clientX - 200;
      const y = e.clientY - 200;
      aura.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    });
  }

  /* ---------- GENERATIVE 3D BACKGROUND ---------- */
  function initLiquidEngine() {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    const geometry = new THREE.TorusKnotGeometry(1.5, 0.4, 200, 32);
    const material = new THREE.MeshNormalMaterial({ wireframe: true, transparent: true, opacity: 0.15 });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    camera.position.z = 5;
    function animate() {
      requestAnimationFrame(animate);
      mesh.rotation.y += 0.002;
      mesh.rotation.x += 0.001;
      const time = Date.now() * 0.001;
      mesh.scale.setScalar(1 + Math.sin(time) * 0.05);
      renderer.render(scene, camera);
    }
    animate();
    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }

  /* ---------- BENTO GALLERY SYSTEM ---------- */
  let currentFilter = 'all';

  function initBentoGallery() {
    const grid = document.getElementById('galleryGrid');
    const filterBtns = document.querySelectorAll('.filter-btn');
    if (!grid) return;

    function renderCards() {
      grid.innerHTML = '';
      const filtered = GALLERY_IMAGES.filter(img => currentFilter === 'all' || img.category === currentFilter);

      filtered.forEach((img, i) => {
        const card = document.createElement('div');
        // Add special bento class based on index
        let bentoClass = '';
        if (i % 7 === 0) bentoClass = 'bento-tall';
        else if (i % 7 === 3) bentoClass = 'bento-wide';

        card.className = `gallery-card reveal ${bentoClass}`;
        card.innerHTML = `
          <img src="${img.src}" alt="${img.title}" loading="lazy">
          <div class="card-overlay">
            <span class="card-tag">${img.tag}</span>
            <h3>${img.title}</h3>
          </div>
        `;
        grid.appendChild(card);
      });
      setTimeout(initReveal, 100);
    }

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.filter;
        renderCards();
      });
    });

    renderCards();
  }

  /* ---------- CORE UTILS ---------- */
  function initReveal() {
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add('visible'); }
      });
    }, { threshold: 0.1 });
    reveals.forEach(el => observer.observe(el));
  }

  /* ---------- NAV PILL LOGIC ---------- */
  function initNavPill() {
    const nav = document.querySelector('.nav-pill-container');
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;
      if (currentScroll > lastScroll && currentScroll > 200) {
        nav.style.transform = 'translateY(-150%)';
      } else {
        nav.style.transform = 'translateY(0)';
      }
      lastScroll = currentScroll;
    });
  }

  /* ---------- LIGHTBOX ---------- */
  function initLightbox() {
    const lb = document.getElementById('lightbox');
    const lbImg = document.getElementById('lightboxImg');
    const lbClose = document.getElementById('lightboxClose');
    document.addEventListener('click', (e) => {
      const card = e.target.closest('.gallery-card');
      if (card) {
        lbImg.src = card.querySelector('img').src;
        lb.classList.add('open');
      }
    });
    lbClose?.addEventListener('click', () => lb.classList.remove('open'));
    lb?.addEventListener('click', (e) => { if (e.target === lb) lb.classList.remove('open'); });
  }

  /* ---------- INIT MASTERPIECE ---------- */
  document.addEventListener('DOMContentLoaded', () => {
    initDesignerAura();
    initLiquidEngine();
    initBentoGallery();
    initNavPill();
    initReveal();
    initLightbox();
    document.body.style.cursor = 'default';
  });

})();
