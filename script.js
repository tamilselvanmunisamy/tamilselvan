/* ==========================================================================
   PORTFOLIO SCRIPT — Tamilselvan M
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- LOADING ANIMATION ---------- */
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => {
    setTimeout(() => loader.classList.add('hide'), 500);
  });

  /* ---------- CURRENT YEAR ---------- */
  document.getElementById('year').textContent = new Date().getFullYear();

  /* ---------- DARK / LIGHT MODE TOGGLE ---------- */
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = themeToggle.querySelector('i');
  const root = document.documentElement;

  // Restore saved theme preference (defaults to dark)
  const savedTheme = localStorage.getItem('portfolio-theme');
  if (savedTheme === 'light') {
    root.setAttribute('data-theme', 'light');
    themeIcon.className = 'fa-solid fa-moon';
  }

  themeToggle.addEventListener('click', () => {
    const isLight = root.getAttribute('data-theme') === 'light';
    if (isLight) {
      root.removeAttribute('data-theme');
      localStorage.setItem('portfolio-theme', 'dark');
      themeIcon.className = 'fa-solid fa-sun';
    } else {
      root.setAttribute('data-theme', 'light');
      localStorage.setItem('portfolio-theme', 'light');
      themeIcon.className = 'fa-solid fa-moon';
    }
  });

  /* ---------- MOBILE HAMBURGER MENU ---------- */
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  // Close mobile menu when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });

  /* ---------- ACTIVE NAV LINK ON SCROLL ---------- */
  const sections = document.querySelectorAll('main section[id], .hero[id]');
  const navAnchors = document.querySelectorAll('.nav-link');

  const setActiveLink = () => {
    let current = '';
    const scrollY = window.scrollY + 120;

    sections.forEach(section => {
      if (scrollY >= section.offsetTop) {
        current = section.getAttribute('id');
      }
    });

    navAnchors.forEach(link => {
      link.classList.remove('active-link');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active-link');
      }
    });
  };
  window.addEventListener('scroll', setActiveLink);
  setActiveLink();

  /* ---------- TYPING ANIMATION (Hero role) ---------- */
  const typedTextEl = document.getElementById('typedText');
  const roles = [
    'Final Year CSE Student',
    'Aspiring Software Engineer',
    'Java & Python Developer',
    'Problem Solver'
  ];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  const typeLoop = () => {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      charIndex--;
    } else {
      charIndex++;
    }

    typedTextEl.textContent = currentRole.substring(0, charIndex);

    let speed = isDeleting ? 40 : 90;

    if (!isDeleting && charIndex === currentRole.length) {
      speed = 1500; // pause at full word
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      speed = 400;
    }

    setTimeout(typeLoop, speed);
  };
  typeLoop();

  /* ---------- SCROLL REVEAL (fade-in / slide-up) ---------- */
  const revealEls = document.querySelectorAll('.fade-in, .slide-up');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => revealObserver.observe(el));

  /* ---------- SKILL PROGRESS BAR ANIMATION ---------- */
  const skillBars = document.querySelectorAll('.skill-progress');
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        bar.style.width = `${bar.dataset.width}%`;
        skillObserver.unobserve(bar);
      }
    });
  }, { threshold: 0.4 });
  skillBars.forEach(bar => skillObserver.observe(bar));

  /* ---------- COUNTER ANIMATION ---------- */
  const counters = document.querySelectorAll('.counter');
  const animateCounter = (el) => {
    const target = parseInt(el.dataset.target, 10);
    let current = 0;
    const step = Math.max(1, Math.ceil(target / 60));

    const tick = () => {
      current += step;
      if (current >= target) {
        el.textContent = target;
      } else {
        el.textContent = current;
        requestAnimationFrame(tick);
      }
    };
    tick();
  };

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(counter => counterObserver.observe(counter));

  /* ---------- PROJECT FILTERING (ready for future use) ---------- */
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      projectCards.forEach(card => {
        const category = card.dataset.category;
        const match = filter === 'all' || category === filter || category === 'all';
        card.style.display = match ? '' : 'none';
      });
    });
  });

  /* ---------- BACK TO TOP BUTTON ---------- */
  const backToTop = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('show', window.scrollY > 400);
  });
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------- STICKY HEADER SHADOW ON SCROLL ---------- */
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    header.style.boxShadow = window.scrollY > 20 ? '0 6px 24px rgba(0,0,0,0.25)' : 'none';
  });

  /* ---------- CONTACT FORM (placeholder handling) ----------
     Replace this section with a real submission handler
     (e.g. EmailJS, Formspree, or a backend endpoint) when ready. */
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    formStatus.textContent = 'Sending...';

    setTimeout(() => {
      formStatus.textContent = 'Thanks! Your message has been noted (connect a form service to send it for real).';
      contactForm.reset();
    }, 900);
  });

});
