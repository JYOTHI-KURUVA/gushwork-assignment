

document.addEventListener('DOMContentLoaded', () => {

  
  const stickyBar = document.getElementById('stickyBar');
  const mainNav   = document.getElementById('mainNav');
  const hero      = document.querySelector('.hero');

  let ticking = false;

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollY        = window.scrollY;
        const heroHeight     = hero ? hero.offsetHeight : window.innerHeight;
        const stickyBarH     = stickyBar.offsetHeight;

        if (scrollY > heroHeight * 0.6) {
          // Show sticky bar
          stickyBar.classList.add('show');
          // Push nav below sticky bar
          mainNav.classList.add('pushed');
          mainNav.style.top = stickyBarH + 'px';
        } else {
          // Hide sticky bar
          stickyBar.classList.remove('show');
          // Reset nav position
          mainNav.classList.remove('pushed');
          mainNav.style.top = '0';
        }

        // Add scrolled class for nav shadow
        if (scrollY > 20) {
          mainNav.classList.add('scrolled');
        } else {
          mainNav.classList.remove('scrolled');
        }

        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });


 
  const thumbTrack  = document.getElementById('thumbTrack');
  const thumbItems  = document.querySelectorAll('.thumb-item');
  const mainImg     = document.getElementById('mainImg');
  const tPrev       = document.getElementById('tPrev');
  const tNext       = document.getElementById('tNext');
  const pipeBody    = document.querySelector('.pipe-body');
  const coilRings   = document.querySelectorAll('.coil-ring');

  let thumbIndex = 0;

  // Color themes for each thumbnail
  const colorThemes = [
    { pipe: 'linear-gradient(180deg, #f07a45 0%, #e8571a 50%, #c94810 100%)',
      coil: '#e8571a', bg: 'linear-gradient(135deg, #fff5f0, #fff)', shadow: 'rgba(232,87,26,0.3)' },
    { pipe: 'linear-gradient(180deg, #4590f0 0%, #1a6be8 50%, #1558c9 100%)',
      coil: '#1a6be8', bg: 'linear-gradient(135deg, #f0f5ff, #fff)', shadow: 'rgba(26,107,232,0.3)' },
    { pipe: 'linear-gradient(180deg, #3a3a5e 0%, #1a1a2e 50%, #0f0f1e 100%)',
      coil: '#1a1a2e', bg: 'linear-gradient(135deg, #f0f0f5, #fff)', shadow: 'rgba(26,26,46,0.3)' },
    { pipe: 'linear-gradient(180deg, #35b85a 0%, #1a8c3a 50%, #126b2a 100%)',
      coil: '#1a8c3a', bg: 'linear-gradient(135deg, #f0fff4, #fff)', shadow: 'rgba(26,140,58,0.3)' },
    { pipe: 'linear-gradient(180deg, #999 0%, #666 50%, #444 100%)',
      coil: '#666', bg: 'linear-gradient(135deg, #f5f5f5, #fff)', shadow: 'rgba(100,100,100,0.3)' },
  ];

  // Apply color theme to main display
  function applyTheme(index) {
    const theme = colorThemes[index];
    if (pipeBody) {
      pipeBody.style.background = theme.pipe;
      pipeBody.style.boxShadow  = `0 8px 30px ${theme.shadow}, inset 0 2px 0 rgba(255,255,255,0.3)`;
    }
    if (coilRings.length) {
      coilRings.forEach(ring => { ring.style.borderColor = theme.coil; });
    }
    if (mainImg) {
      mainImg.parentElement.style.background = theme.bg;
    }
  }

  // Handle thumbnail click
  thumbItems.forEach((item, i) => {
    item.addEventListener('click', () => {
      thumbItems.forEach(t => t.classList.remove('active'));
      item.classList.add('active');
      applyTheme(i);
    });
  });

  // Scroll thumbnail track
  function scrollThumbs(dir) {
    const itemW = thumbItems[0]?.offsetWidth + 10 || 70;
    thumbIndex = Math.max(0, Math.min(thumbIndex + dir, thumbItems.length - 1));
    const offset = thumbIndex * itemW;
    thumbTrack.style.transform = `translateX(-${offset}px)`;
  }

  tPrev?.addEventListener('click', () => scrollThumbs(-1));
  tNext?.addEventListener('click', () => scrollThumbs(1));

  // ZOOM EFFECT on main image hover
  if (mainImg) {
    mainImg.style.cursor = 'zoom-in';

    mainImg.addEventListener('mousemove', (e) => {
      const rect   = mainImg.getBoundingClientRect();
      const xPct   = ((e.clientX - rect.left) / rect.width  - 0.5) * 2;
      const yPct   = ((e.clientY - rect.top)  / rect.height - 0.5) * 2;
      const tiltX  = yPct * -8;
      const tiltY  = xPct * 8;
      mainImg.style.transform = `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.04)`;
    });

    mainImg.addEventListener('mouseleave', () => {
      mainImg.style.transform = '';
      mainImg.style.transition = 'transform 0.4s ease';
      setTimeout(() => { mainImg.style.transition = ''; }, 400);
    });
  }


 
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  hamburger?.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    const spans  = hamburger.querySelectorAll('span');

    // Animate to X shape
    if (isOpen) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity   = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity   = '';
      spans[2].style.transform = '';
    }
  });

  // Close on link click
  mobileMenu?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      const spans = hamburger.querySelectorAll('span');
      spans[0].style.transform = '';
      spans[1].style.opacity   = '';
      spans[2].style.transform = '';
    });
  });


  const revealEls = document.querySelectorAll(
    '.feat-card, .spec-col, .quick-specs, .price-block, .trust-row, .quote-form, .contact-left'
  );

  // Add reveal class
  revealEls.forEach(el => el.classList.add('reveal'));

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, i * 80);
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -30px 0px'
  });

  revealEls.forEach(el => revealObserver.observe(el));


  
  const quoteForm = document.getElementById('quoteForm');

  quoteForm?.addEventListener('submit', (e) => {
    e.preventDefault();

    const btn         = quoteForm.querySelector('.form-btn');
    const originalTxt = btn.textContent;

    // Show loading
    btn.textContent  = 'Submitting...';
    btn.disabled     = true;
    btn.style.opacity = '0.7';

    // Simulate API call
    setTimeout(() => {
      btn.textContent   = '✓ Quote Request Sent!';
      btn.style.opacity = '1';
      btn.style.background = '#16a34a';

      // Clear inputs
      quoteForm.querySelectorAll('input').forEach(inp => inp.value = '');

      // Reset after 3s
      setTimeout(() => {
        btn.textContent      = originalTxt;
        btn.disabled         = false;
        btn.style.background = '';
      }, 3000);
    }, 1200);
  });


 
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href   = anchor.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();

      // Calculate offset: nav height + sticky bar height if visible
      const navH      = mainNav.offsetHeight;
      const stickyH   = stickyBar.classList.contains('show') ? stickyBar.offsetHeight : 0;
      const offset    = navH + stickyH + 16;
      const targetTop = target.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({ top: targetTop, behavior: 'smooth' });
    });
  });


  
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  function highlightNav() {
    const scrollMid = window.scrollY + window.innerHeight / 2;
    sections.forEach(sec => {
      if (scrollMid >= sec.offsetTop && scrollMid < sec.offsetTop + sec.offsetHeight) {
        navLinks.forEach(link => {
          link.style.color = '';
          if (link.getAttribute('href') === `#${sec.id}`) {
            link.style.color = '#e8571a';
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightNav, { passive: true });

});