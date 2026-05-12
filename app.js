/* ============================================
   PALAK KATARIYA PORTFOLIO — APP.JS v2
   Crystal Hero · Advanced UI/UX · Polished
   ============================================ */

(function () {
  'use strict';

  /* ---------- CUSTOM CURSOR ---------- */
  function initCursor() {
    const dot = document.getElementById('cursorDot');
    const ring = document.getElementById('cursorRing');
    if (!dot || !ring) return;

    let mx = 0, my = 0;
    let cx = 0, cy = 0;
    let rx = 0, ry = 0;

    document.addEventListener('mousemove', (e) => {
      mx = e.clientX;
      my = e.clientY;
    });

    function tick() {
      cx += (mx - cx) * 0.25;
      cy += (my - cy) * 0.25;
      rx += (mx - rx) * 0.08;
      ry += (my - ry) * 0.08;
      dot.style.transform = `translate(${cx}px, ${cy}px)`;
      ring.style.transform = `translate(${rx}px, ${ry}px)`;
      requestAnimationFrame(tick);
    }
    tick();

    // Hover states
    const hoverEls = document.querySelectorAll('a, button, .gallery-card, .filter-btn, .process-card');
    hoverEls.forEach(el => {
      el.addEventListener('mouseenter', () => {
        dot.classList.add('cursor-hover');
        ring.classList.add('cursor-hover');
      });
      el.addEventListener('mouseleave', () => {
        dot.classList.remove('cursor-hover');
        ring.classList.remove('cursor-hover');
      });
    });
  }

  /* ---------- THREE.JS HERO — GOLDEN WIREFRAME DIAMOND ---------- */
  function initHeroScene() {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas || typeof THREE === 'undefined') return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 7;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    /* --- Main Group (everything rotates together) --- */
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    /* --- Central Diamond (Icosahedron wireframe with golden glow) --- */
    const diamondGeo = new THREE.IcosahedronGeometry(1.6, 1);

    // Glowing wireframe
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0xC9A96E,
      wireframe: true,
      transparent: true,
      opacity: 0.7,
    });
    const wireframe = new THREE.Mesh(diamondGeo, wireMat);
    mainGroup.add(wireframe);

    // Inner wireframe (smaller, brighter, counter-rotating)
    const innerGeo = new THREE.IcosahedronGeometry(1.0, 1);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0xE8D5A8,
      wireframe: true,
      transparent: true,
      opacity: 0.4,
    });
    const innerWire = new THREE.Mesh(innerGeo, innerMat);
    mainGroup.add(innerWire);

    // Core glow sphere
    const coreGeo = new THREE.SphereGeometry(0.3, 20, 20);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0xC9A96E,
      transparent: true,
      opacity: 0.35,
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    mainGroup.add(core);



    /* --- Vertex Points (bright dots at diamond vertices) --- */
    const vertexPositions = diamondGeo.getAttribute('position');
    const uniqueVerts = [];
    const seen = new Set();
    for (let i = 0; i < vertexPositions.count; i++) {
      const key = `${vertexPositions.getX(i).toFixed(2)},${vertexPositions.getY(i).toFixed(2)},${vertexPositions.getZ(i).toFixed(2)}`;
      if (!seen.has(key)) {
        seen.add(key);
        uniqueVerts.push(vertexPositions.getX(i), vertexPositions.getY(i), vertexPositions.getZ(i));
      }
    }
    const vertGeo = new THREE.BufferGeometry();
    vertGeo.setAttribute('position', new THREE.Float32BufferAttribute(uniqueVerts, 3));
    const vertMat = new THREE.PointsMaterial({
      color: 0xE8D5A8,
      size: 0.06,
      transparent: true,
      opacity: 0.9,
      sizeAttenuation: true,
    });
    const vertexPoints = new THREE.Points(vertGeo, vertMat);
    mainGroup.add(vertexPoints);

    /* --- Floating Star Particles --- */
    const starCount = 300;
    const starGeo = new THREE.BufferGeometry();
    const starPos = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 4 + Math.random() * 8;
      starPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      starPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      starPos[i * 3 + 2] = r * Math.cos(phi);
    }
    starGeo.setAttribute('position', new THREE.Float32BufferAttribute(starPos, 3));
    const starMat = new THREE.PointsMaterial({
      color: 0xE8D5A8,
      size: 0.015,
      transparent: true,
      opacity: 0.5,
      sizeAttenuation: true,
    });
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    /* --- Orbit Dots (particles along the rings) --- */
    const orbitGroup = new THREE.Group();
    mainGroup.add(orbitGroup);
    const orbitDotCount = 40;
    const orbitDotGeo = new THREE.BufferGeometry();
    const orbitDotPos = new Float32Array(orbitDotCount * 3);
    for (let i = 0; i < orbitDotCount; i++) {
      const angle = (i / orbitDotCount) * Math.PI * 2;
      const r = 2.4 + Math.random() * 1.2;
      orbitDotPos[i * 3] = Math.cos(angle) * r;
      orbitDotPos[i * 3 + 1] = (Math.random() - 0.5) * 0.8;
      orbitDotPos[i * 3 + 2] = Math.sin(angle) * r;
    }
    orbitDotGeo.setAttribute('position', new THREE.Float32BufferAttribute(orbitDotPos, 3));
    const orbitDotMat = new THREE.PointsMaterial({
      color: 0xC9A96E,
      size: 0.035,
      transparent: true,
      opacity: 0.7,
      sizeAttenuation: true,
    });
    const orbitDots = new THREE.Points(orbitDotGeo, orbitDotMat);
    orbitGroup.add(orbitDots);

    /* --- Mouse tracking --- */
    let mouseX = 0, mouseY = 0;
    let smoothX = 0, smoothY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = (e.clientY / window.innerHeight) * 2 - 1;
    });

    /* --- Animation Loop --- */
    function animate() {
      requestAnimationFrame(animate);
      const t = performance.now() * 0.001;

      smoothX += (mouseX - smoothX) * 0.04;
      smoothY += (mouseY - smoothY) * 0.04;

      // Main group rotation (mouse-reactive)
      mainGroup.rotation.y = t * 0.12 + smoothX * 0.5;
      mainGroup.rotation.x = smoothY * 0.3;

      // Inner wireframe counter-rotates
      innerWire.rotation.y = -t * 0.18;
      innerWire.rotation.x = t * 0.1;

      // Vertex points follow outer wireframe
      vertexPoints.rotation.copy(wireframe.rotation);

      // Floating animation
      mainGroup.position.y = Math.sin(t * 0.4) * 0.12;



      // Orbit dots spin
      orbitGroup.rotation.y = t * 0.08;
      orbitGroup.rotation.x = Math.sin(t * 0.2) * 0.1;

      // Core pulse
      const pulse = 0.3 + Math.sin(t * 1.5) * 0.12;
      coreMat.opacity = pulse;
      const s = 0.9 + Math.sin(t * 1.5) * 0.15;
      core.scale.set(s, s, s);

      // Wireframe opacity breathe
      wireMat.opacity = 0.55 + Math.sin(t * 0.6) * 0.15;

      // Background stars drift
      stars.rotation.y = t * 0.008;
      stars.rotation.x = t * 0.003;

      renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }

  /* ---------- NAVBAR ---------- */
  function initNavbar() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const mobileNav = document.getElementById('mobileNav');
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    });

    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileNav.classList.toggle('open');
      document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
    });

    document.querySelectorAll('.mobile-nav a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          document.querySelectorAll('#navLinks a').forEach(a => {
            a.classList.toggle('active', a.getAttribute('href') === '#' + id);
          });
        }
      });
    }, { threshold: 0.3 });
    sections.forEach(s => observer.observe(s));
  }

  /* ---------- DYNAMIC GALLERY DATA ---------- */
  const GALLERY_IMAGES = [
    // Resin Art
    { src: 'assets/resin-art/img_1.png', category: 'resin', title: 'Oceanic Essence', tag: 'Resin Art' },
    { src: 'assets/resin-art/img_2.png', category: 'resin', title: 'Marble Mystique', tag: 'Resin Art' },
    { src: 'assets/resin-art/img_3.png', category: 'resin', title: 'Crystal Flow', tag: 'Resin Art' },
    { src: 'assets/resin-art/img_4.png', category: 'resin', title: 'Ethereal Pour', tag: 'Resin Art' },
    
    // Gift Hampers
    { src: 'assets/gift-hampers/img_1.png', category: 'hamper', title: 'Royal Celebration', tag: 'Gift Hamper' },
    { src: 'assets/gift-hampers/img_2.png', category: 'hamper', title: 'Artisan Selection', tag: 'Gift Hamper' },
    { src: 'assets/gift-hampers/img_3.png', category: 'hamper', title: 'Golden Festive', tag: 'Gift Ham hamper' },
    { src: 'assets/gift-hampers/img_4.png', category: 'hamper', title: 'Classic Elegance', tag: 'Gift Hamper' },
    { src: 'assets/gift-hampers/img_5.png', category: 'hamper', title: 'Premium Curations', tag: 'Gift Ham hamper' },
    { src: 'assets/gift-hampers/img_6.png', category: 'hamper', title: 'Luxury Hamper', tag: 'Gift Hamper' },
    { src: 'assets/gift-hampers/img_7.png', category: 'hamper', title: 'Floral Delight', tag: 'Gift Hamper' },
    { src: 'assets/gift-hampers/img_8.jpeg', category: 'hamper', title: 'Festive Pack', tag: 'Gift Hamper' },
    { src: 'assets/gift-hampers/img_9.jpeg', category: 'hamper', title: 'Sweet Curation', tag: 'Gift Hamper' },
    { src: 'assets/gift-hampers/img_10.jpeg', category: 'hamper', title: 'Gift Ensemble', tag: 'Gift Hamper' },
    { src: 'assets/gift-hampers/img_11.jpeg', category: 'hamper', title: 'Grand Selection', tag: 'Gift Hamper' },

    // Rangoli
    { src: 'assets/rangoli/img_1.png', category: 'rangoli', title: 'Sacred Mandala', tag: 'Rangoli' },
    { src: 'assets/rangoli/img_2.png', category: 'rangoli', title: 'Floral Symphony', tag: 'Rangoli' },
    { src: 'assets/rangoli/img_3.png', category: 'rangoli', title: 'Vibrant Harmony', tag: 'Rangoli' },
    { src: 'assets/rangoli/img_4.png', category: 'rangoli', title: 'Peacock Bloom', tag: 'Rangoli' },
    { src: 'assets/rangoli/img_5.png', category: 'rangoli', title: 'Celestial Pattern', tag: 'Rangoli' }
  ];

  const DISPLAY_LIMIT = 6;
  let currentFilter = 'all';

  function initDynamicGallery() {
    const grid = document.getElementById('galleryGrid');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (!grid) return;

    GALLERY_IMAGES.forEach((img, i) => {
      const card = document.createElement('div');
      const isTall = i % 3 === 0 || i % 7 === 0;
      card.className = `gallery-card ${isTall ? 'tall' : ''} reveal`;
      card.dataset.category = img.category;
      card.dataset.delay = i * 40;

      card.innerHTML = `
        <img src="${img.src}" alt="${img.title}" loading="lazy">
        <div class="card-shine"></div>
        <div class="card-overlay">
          <h3>${img.title}</h3>
          <span class="card-tag">${img.tag}</span>
        </div>
      `;
      grid.appendChild(card);
    });

    // Magnetic Button Effect
    loadMoreBtn.addEventListener('mousemove', (e) => {
      const rect = loadMoreBtn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      loadMoreBtn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });

    loadMoreBtn.addEventListener('mouseleave', () => {
      loadMoreBtn.style.transform = '';
    });

    // Load More Button Listener
    loadMoreBtn.addEventListener('click', () => {
      const targetCards = (currentFilter === 'all') 
        ? document.querySelectorAll('.gallery-card.limit-hidden')
        : document.querySelectorAll(`.gallery-card.limit-hidden[data-category="${currentFilter}"]`);
      
      targetCards.forEach((card, i) => {
        card.classList.remove('limit-hidden');
        card.style.position = 'relative';
        card.style.visibility = 'visible';
        card.style.display = 'block';
        
        // Waterfall animation
        setTimeout(() => {
          card.classList.add('waterfall-in');
        }, i * 60);
      });
      document.getElementById('loadMoreContainer').classList.add('hidden');
    });

    refreshGalleryDisplay();

    // Init dependencies
    setTimeout(() => {
      initTiltEffect();
      initLightbox();
    }, 200);
  }

  function refreshGalleryDisplay() {
    const cards = document.querySelectorAll('.gallery-card');
    const loadMoreContainer = document.getElementById('loadMoreContainer');
    let totalInFilter = 0;

    // Reset button visibility
    loadMoreContainer.classList.remove('hidden');

    cards.forEach((card) => {
      card.classList.remove('waterfall-in'); // Reset animation
      const match = currentFilter === 'all' || card.dataset.category === currentFilter;
      
      if (match) {
        totalInFilter++;
        if (totalInFilter <= DISPLAY_LIMIT) {
          card.classList.remove('limit-hidden', 'hidden');
          card.style.position = 'relative';
          card.style.visibility = 'visible';
          card.style.display = 'block';
          setTimeout(() => card.classList.add('visible'), 50);
        } else {
          card.classList.add('limit-hidden');
          card.classList.remove('visible');
          card.style.position = 'absolute';
          card.style.visibility = 'hidden';
          card.style.display = 'none';
        }
      } else {
        card.classList.add('hidden');
        card.classList.remove('visible', 'limit-hidden');
        card.style.display = 'none';
      }
    });

    // Show/Hide load more button
    if (totalInFilter > DISPLAY_LIMIT) {
      loadMoreContainer.style.display = 'flex';
      setTimeout(() => loadMoreContainer.classList.remove('hidden'), 50);
    } else {
      loadMoreContainer.classList.add('hidden');
      setTimeout(() => loadMoreContainer.style.display = 'none', 400);
    }
  }

  /* ---------- GALLERY FILTER ---------- */
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

  /* ---------- STAGGERED REVEAL ---------- */
  function initReveal() {
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const delay = entry.target.dataset.delay || 0;
          setTimeout(() => entry.target.classList.add('visible'), Number(delay));
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach((el, i) => {
      if (!el.dataset.delay) el.dataset.delay = i * 60;
      observer.observe(el);
    });
  }

  /* ---------- 3D TILT + SHINE ON GALLERY CARDS ---------- */
  function initTiltEffect() {
    const cards = document.querySelectorAll('.gallery-card');

    cards.forEach(card => {
      const shine = card.querySelector('.card-shine');

      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const cx = rect.width / 2;
        const cy = rect.height / 2;
        const rotY = ((x - cx) / cx) * 10;
        const rotX = ((cy - y) / cy) * 10;

        card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.03)`;
        card.style.boxShadow = `${-rotY * 2}px ${rotX * 2}px 50px rgba(201,169,110,0.18)`;

        // Shine glare effect
        if (shine) {
          const px = (x / rect.width) * 100;
          const py = (y / rect.height) * 100;
          shine.style.background = `radial-gradient(circle at ${px}% ${py}%, rgba(255,255,255,0.25) 0%, transparent 60%)`;
        }
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.boxShadow = '';
        if (shine) shine.style.background = 'transparent';
      });
    });
  }

  /* ---------- LIGHTBOX ---------- */
  function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxClose = document.getElementById('lightboxClose');

    document.querySelectorAll('.gallery-card').forEach(card => {
      card.addEventListener('click', () => {
        const img = card.querySelector('img');
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    });

    function close() {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
    }
    lightboxClose.addEventListener('click', close);
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) close(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
  }

  /* ---------- PROCESS — WHEEL→HORIZONTAL SCROLL ---------- */
  function initProcessScroll() {
    const section = document.getElementById('process');
    const wrapper = document.getElementById('processTrack');
    const bar = document.getElementById('processProgressBar');
    if (!section || !wrapper || !bar) return;

    // Convert wheel to horizontal scroll
    wrapper.addEventListener('wheel', (e) => {
      const maxScroll = wrapper.scrollWidth - wrapper.clientWidth;
      if (maxScroll <= 0) return;

      const atStart = wrapper.scrollLeft <= 0 && e.deltaY < 0;
      const atEnd = wrapper.scrollLeft >= maxScroll - 1 && e.deltaY > 0;

      if (!atStart && !atEnd) {
        e.preventDefault();
        wrapper.scrollLeft += e.deltaY * 1.5;
      }
    }, { passive: false });

    // Progress bar
    wrapper.addEventListener('scroll', () => {
      const maxScroll = wrapper.scrollWidth - wrapper.clientWidth;
      const pct = maxScroll > 0 ? (wrapper.scrollLeft / maxScroll) * 100 : 0;
      bar.style.width = pct + '%';
    });

    // Drag to scroll
    let isDragging = false, startX, scrollLeft;
    wrapper.addEventListener('mousedown', (e) => {
      isDragging = true;
      startX = e.pageX - wrapper.offsetLeft;
      scrollLeft = wrapper.scrollLeft;
      wrapper.style.cursor = 'grabbing';
    });
    wrapper.addEventListener('mouseup', () => { isDragging = false; wrapper.style.cursor = 'grab'; });
    wrapper.addEventListener('mouseleave', () => { isDragging = false; wrapper.style.cursor = ''; });
    wrapper.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX - wrapper.offsetLeft;
      wrapper.scrollLeft = scrollLeft - (x - startX) * 1.5;
    });
  }

  /* ---------- HERO PARALLAX ---------- */
  function initHeroParallax() {
    const heroContent = document.querySelector('.hero-content');
    const scrollInd = document.querySelector('.scroll-indicator');
    if (!heroContent) return;

    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      const h = window.innerHeight;
      if (y < h) {
        const r = y / h;
        heroContent.style.transform = `translateY(${y * 0.35}px)`;
        heroContent.style.opacity = 1 - r * 1.3;
        if (scrollInd) scrollInd.style.opacity = Math.max(0, 1 - r * 3);
      }
    });
  }

  /* ---------- MAGNETIC BUTTONS ---------- */
  function initMagnetic() {
    document.querySelectorAll('.filter-btn, .contact-item').forEach(el => {
      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const dx = e.clientX - (rect.left + rect.width / 2);
        const dy = e.clientY - (rect.top + rect.height / 2);
        el.style.transform = `translate(${dx * 0.15}px, ${dy * 0.15}px)`;
      });
      el.addEventListener('mouseleave', () => {
        el.style.transform = '';
        el.style.transition = 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
        setTimeout(() => el.style.transition = '', 500);
      });
    });
  }

  /* ---------- TEXT SPLIT ANIMATION ---------- */
  function initTextSplit() {
    document.querySelectorAll('.split-text').forEach(el => {
      const text = el.textContent;
      el.textContent = '';
      el.style.visibility = 'visible';
      [...text].forEach((char, i) => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.style.animationDelay = `${0.6 + i * 0.035}s`;
        span.className = 'split-char';
        el.appendChild(span);
      });
    });
  }

  /* ---------- SMOOTH COUNTER ---------- */
  function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    if (!counters.length) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.count, 10);
          let current = 0;
          const step = Math.max(1, Math.floor(target / 60));
          const tick = () => {
            current += step;
            if (current >= target) { el.textContent = target + '+'; return; }
            el.textContent = current + '+';
            requestAnimationFrame(tick);
          };
          tick();
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(c => observer.observe(c));
  }

  /* ---------- INIT ---------- */
  document.addEventListener('DOMContentLoaded', () => {
    initCursor();
    initHeroScene();
    initNavbar();
    initReveal();
    initDynamicGallery();
    initTiltEffect();
    initLightbox();
    initProcessScroll();
    initHeroParallax();
    initMagnetic();
    initTextSplit();
    initCounters();
  });

})();
