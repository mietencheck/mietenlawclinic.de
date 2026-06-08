document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header');
  const hero = document.querySelector('.hero-fullscreen');
  const navToggle = document.querySelector('.site-nav-toggle');
  const nav = document.querySelector('.site-nav');

  if (header && hero && document.body.classList.contains('page-home')) {
    const observer = new IntersectionObserver(
      ([entry]) => header.classList.toggle('is-scrolled', !entry.isIntersecting),
      { threshold: 0, rootMargin: '0px 0px -1px 0px' }
    );

    observer.observe(hero);
  }

  if (navToggle && nav) {
    const closeNav = () => {
      nav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.setAttribute('aria-label', 'Menü öffnen');
      header?.classList.remove('nav-open');
    };

    navToggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
      navToggle.setAttribute('aria-label', isOpen ? 'Menü schließen' : 'Menü öffnen');
      header?.classList.toggle('nav-open', isOpen);
    });

    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeNav);
    });

    document.addEventListener('click', (event) => {
      if (!nav.classList.contains('is-open')) return;
      if (nav.contains(event.target) || navToggle.contains(event.target)) return;
      closeNav();
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && nav.classList.contains('is-open')) {
        closeNav();
        navToggle.focus();
      }
    });
  }
});
