(function () {
  'use strict';

  /* ---------- GALLERY DATA (PRODUCTION READY) ---------- */
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
    { src: 'assets/rangoli/img_1.png', category: 'rangoli', title: 'Sacred Mandala', tag: 'Rangoli' },
    { src: 'assets/rangoli/img_2.png', category: 'rangoli', title: 'Floral Symphony', tag: 'Rangoli' },
    { src: 'assets/rangoli/img_3.png', category: 'rangoli', title: 'Vibrant Harmony', tag: 'Rangoli' },
    { src: 'assets/rangoli/img_4.png', category: 'rangoli', title: 'Peacock Bloom', tag: 'Rangoli' },
    { src: 'assets/rangoli/img_5.png', category: 'rangoli', title: 'Celestial Pattern', tag: 'Rangoli' }
  ];

  /* ---------- 3D HERO ENGINE (THREE.JS) ---------- */
  function init3DEngine() {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Create Golden Wireframe Crystal
    const geometry = new THREE.IcosahedronGeometry(2, 0);
    const material = new THREE.MeshBasicMaterial({ 
      color: 0xD4AF37, 
      wireframe: true, 
      transparent: true, 
      opacity: 0.3 
    });
    const crystal = new THREE.Mesh(geometry, material);
    scene.add(crystal);

    camera.position.z = 5;

    function animate() {
      requestAnimationFrame(animate);
      crystal.rotation.y += 0.003;
      crystal.rotation.x += 0.002;
      
      // Floating effect
      crystal.position.y = Math.sin(Date.now() * 0.001) * 0.2;
      
      renderer.render(scene, camera);
    }

    animate();

    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }

  /* ---------- BENTO GALLERY BUILDER ---------- */
  function initBentoGallery() {
    const grid = document.getElementById('galleryGrid');
    if (!grid) return;

    GALLERY_IMAGES.forEach((img, i) => {
      const card = document.createElement('div');
      card.className = 'gallery-card reveal';
      card.innerHTML = `
        <img src="${img.src}" alt="${img.title}" loading="lazy">
        <div class="card-overlay">
          <span class="card-tag">${img.tag}</span>
          <h3>${img.title}</h3>
        </div>
      `;
      grid.appendChild(card);
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
    lb?.addEventListener('click', (e) => {
      if (e.target === lb) lb.classList.remove('open');
    });
  }

  /* ---------- INIT MASTERPIECE ---------- */
  document.addEventListener('DOMContentLoaded', () => {
    init3DEngine();
    initBentoGallery();
    initReveal();
    initNavPill();
    initLightbox();
    
    // ENSURE SYSTEM CURSOR IS ALWAYS VISIBLE
    document.body.style.cursor = 'default';
  });

})();
