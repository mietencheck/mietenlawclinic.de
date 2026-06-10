async function loadComponent(name) {
  const base = document.documentElement.dataset.base ?? '';
  const placeholder = document.querySelector(`[data-component="${name}"]`);

  if (!placeholder) return;

  const response = await fetch(`${base}components/${name}.html`);

  if (!response.ok) return;

  const html = (await response.text()).replaceAll('{{BASE}}', base);
  placeholder.outerHTML = html;
}

function setActiveNavLink() {
  const navPage = document.documentElement.dataset.navPage;

  if (!navPage) return;

  const activeLink = document.querySelector(`[data-nav="${navPage}"]`);

  if (!activeLink) return;

  activeLink.classList.add('is-active');
  activeLink.setAttribute('aria-current', 'page');
}

function initSiteNav() {
  const header = document.querySelector('.site-header');
  const navToggle = document.querySelector('.site-nav-toggle');
  const nav = document.querySelector('.site-nav');

  if (!navToggle || !nav) return;

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

function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  const hero = document.querySelector('.hero-fullscreen');

  if (!header || !hero || !document.body.classList.contains('page-home')) return;

  const observer = new IntersectionObserver(
    ([entry]) => header.classList.toggle('is-scrolled', !entry.isIntersecting),
    { threshold: 0, rootMargin: '0px 0px -1px 0px' }
  );

  observer.observe(hero);
}

document.addEventListener('DOMContentLoaded', async () => {
  await Promise.all([
    loadComponent('navbar'),
    loadComponent('footer'),
  ]);

  setActiveNavLink();
  initSiteNav();
  initHeaderScroll();
});
