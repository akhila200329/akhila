/**
 * Akhila Boddu - AI/ML Portfolio
 * Production Single-Page Interaction Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNavigation();
  initActiveNavHighlight();
  initScrollTopHandler();
  initDynamicYear();
  initSmoothScrollOffsets();
});

/**
 * Mobile Navigation Toggle and Auto-close
 */
function initMobileNavigation() {
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link, .btn-outline-nav');

  if (!menuToggle || !navMenu) return;

  menuToggle.addEventListener('click', () => {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!isExpanded));
    navMenu.classList.toggle('open');

    // Morph hamburger icon
    menuToggle.classList.toggle('is-active');
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      menuToggle.setAttribute('aria-expanded', 'false');
      navMenu.classList.remove('open');
      menuToggle.classList.remove('is-active');
    });
  });

  // Close when clicking outside of navbar
  document.addEventListener('click', (event) => {
    const isInsideNav = event.target.closest('#navbar');
    if (!isInsideNav && navMenu.classList.contains('open')) {
      menuToggle.setAttribute('aria-expanded', 'false');
      navMenu.classList.remove('open');
      menuToggle.classList.remove('is-active');
    }
  });
}

/**
 * Dynamic Active Navigation Section Highlighting via IntersectionObserver
 */
function initActiveNavHighlight() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!('IntersectionObserver' in window)) return;

  const observerOptions = {
    root: null,
    rootMargin: '-30% 0px -60% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const activeId = entry.target.getAttribute('id');
        navLinks.forEach((link) => {
          const hrefTarget = link.getAttribute('href').replace('#', '');
          if (hrefTarget === activeId) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach((section) => observer.observe(section));
}

/**
 * Scroll to Top Visibility & Action
 */
function initScrollTopHandler() {
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  if (!scrollTopBtn) return;

  const toggleScrollBtn = () => {
    if (window.scrollY > 400) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  };

  window.addEventListener('scroll', toggleScrollBtn, { passive: true });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/**
 * Set Dynamic Copyright Year
 */
function initDynamicYear() {
  const yearElement = document.getElementById('currentYear');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

/**
 * Anchor Smooth Scroll Fallback & Navbar Offset Handling
 */
function initSmoothScrollOffsets() {
  const internalAnchors = document.querySelectorAll('a[href^="#"]');

  internalAnchors.forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 76;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });

        // Update URL hash smoothly without jump
        if (history.pushState) {
          history.pushState(null, null, targetId);
        }
      }
    });
  });
}