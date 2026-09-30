document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('.main-nav');
  const menuButton = document.querySelector('.menu-btn');

  if (menuButton && nav) {
    const setMenuState = (isOpen) => {
      nav.classList.toggle('open', isOpen);
      menuButton.classList.toggle('active', isOpen);
      menuButton.setAttribute('aria-expanded', String(isOpen));
    };

    menuButton.addEventListener('click', () => {
      const isOpen = !nav.classList.contains('open');
      setMenuState(isOpen);
    });

    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => setMenuState(false));
    });

    document.addEventListener('click', (event) => {
      const clickedInsideNav = nav.contains(event.target);
      const clickedButton = menuButton.contains(event.target);

      if (!clickedInsideNav && !clickedButton && nav.classList.contains('open')) {
        setMenuState(false);
      }
    });
  }

  const revealItems = document.querySelectorAll('.skill-card, .project-card, .about-panel, .profile-card');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.15 });

    revealItems.forEach(item => {
      item.classList.add('reveal');
      revealObserver.observe(item);
    });
  } else {
    revealItems.forEach(item => item.classList.add('visible'));
  }
});
