document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header');
  const hero = document.querySelector('.hero-fullscreen');
  if (header && hero && document.body.classList.contains('page-home')) {
    const observer = new IntersectionObserver(
      ([entry]) => header.classList.toggle('is-scrolled', !entry.isIntersecting),
      { threshold: 0, rootMargin: '0px 0px -1px 0px' }
    );

    observer.observe(hero);
  }
});
