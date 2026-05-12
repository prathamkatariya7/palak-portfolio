(function () {
  'use strict';

  /* ---------- PRODUCTION ASSET DATA ---------- */
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
    { src: 'assets/gift-hampers/img_6.png', category: 'hamper', title: 'Elite Gifting', tag: 'Gift Hamper' },
    { src: 'assets/gift-hampers/img_7.png', category: 'hamper', title: 'Grand Festive', tag: 'Gift Hamper' },
    { src: 'assets/gift-hampers/img_8.jpeg', category: 'hamper', title: 'Floral Delight', tag: 'Gift Hamper' },
    { src: 'assets/gift-hampers/img_9.jpeg', category: 'hamper', title: 'Sweet Sensations', tag: 'Gift Hamper' },
    { src: 'assets/gift-hampers/img_10.jpeg', category: 'hamper', title: 'Luxe Selection', tag: 'Gift Hamper' },
    { src: 'assets/gift-hampers/img_11.jpeg', category: 'hamper', title: 'Chic Celebration', tag: 'Gift Hamper' },
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
    document.addEventListener('mousemove', (e) => {
      const x = e.clientX - 200;
      const y = e.clientY - 200;
      aura.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    });
  }

  /* ---------- GENERATIVE 3D LIQUID BACKGROUND ---------- */
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
      mesh.scale.setScalar(1 + Math.sin(Date.now() * 0.001) * 0.05);
      renderer.render(scene, camera);
    }
    animate();
    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }

  /* ---------- ADVANCED BENTO GALLERY ---------- */
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
        let bentoClass = '';
        if (i % 5 === 0) bentoClass = 'bento-tall';
        else if (i % 5 === 2) bentoClass = 'bento-wide';
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
      refreshReveal();
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

  /* ---------- DYNAMIC 3D TILT EFFECT ---------- */
  function initBentoTilt() {
    document.addEventListener('mousemove', (e) => {
      const cards = document.querySelectorAll('.gallery-card');
      cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        if (x > 0 && x < rect.width && y > 0 && y < rect.height) {
          const xc = rect.width / 2;
          const yc = rect.height / 2;
          card.style.transform = `perspective(1000px) rotateY(${(x - xc) / 20}deg) rotateX(${-(y - yc) / 20}deg) scale(0.98)`;
        } else {
          card.style.transform = '';
        }
      });
    });
  }

  /* ---------- CORE UTILS ---------- */
  function refreshReveal() {
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add('visible'); }
      });
    }, { threshold: 0.1 });
    reveals.forEach(el => observer.observe(el));
  }

  function initNavPill() {
    const nav = document.querySelector('.nav-pill-container');
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;
      if (currentScroll > lastScroll && currentScroll > 200) nav.style.transform = 'translateY(-150%)';
      else nav.style.transform = 'translateY(0)';
      lastScroll = currentScroll;
    });
  }

  function initLightbox() {
    const lb = document.getElementById('lightbox');
    const lbImg = document.getElementById('lightboxImg');
    document.addEventListener('click', (e) => {
      const card = e.target.closest('.gallery-card');
      if (card) {
        lbImg.src = card.querySelector('img').src;
        lb.classList.add('open');
      }
      if (e.target.id === 'lightbox' || e.target.id === 'lightboxClose') lb.classList.remove('open');
    });
  }

  /* ---------- FINAL PRODUCTION INIT ---------- */
  document.addEventListener('DOMContentLoaded', () => {
    initDesignerAura();
    initLiquidEngine();
    initBentoGallery();
    initBentoTilt();
    initNavPill();
    initLightbox();
    document.body.style.cursor = 'default';
  });

})();
