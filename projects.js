(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const portals = document.querySelectorAll('[data-portal]');

  window.addEventListener('pageshow', () => {
    document.body.classList.remove('project-page-leaving');
    document.querySelectorAll('.project-portal-transition').forEach((transition) => transition.remove());
  });

  portals.forEach((portal) => {
    portal.addEventListener('click', (event) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const destination = portal.href;
      const theme = portal.dataset.portal || 'current';
      sessionStorage.setItem('lynk-project-portal', theme);

      if (reduceMotion) return;

      event.preventDefault();
      const rect = portal.getBoundingClientRect();
      const clone = portal.cloneNode(true);
      const scale = Math.max(window.innerWidth / rect.width, window.innerHeight / rect.height) * 1.18;
      const translateX = window.innerWidth / 2 - (rect.left + rect.width / 2);
      const translateY = window.innerHeight / 2 - (rect.top + rect.height / 2);

      clone.classList.add('project-portal-transition');
      clone.removeAttribute('href');
      clone.setAttribute('aria-hidden', 'true');
      Object.assign(clone.style, {
        left: `${rect.left}px`,
        top: `${rect.top}px`,
        width: `${rect.width}px`,
        height: `${rect.height}px`
      });

      document.body.appendChild(clone);
      document.body.classList.add('project-page-leaving');

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          clone.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
          clone.classList.add('is-expanding');
        });
      });

      window.setTimeout(() => {
        window.location.href = destination;
      }, 680);
    });
  });

  const detailPage = document.querySelector('[data-project-theme]');
  if (detailPage) {
    const expectedTheme = detailPage.dataset.projectTheme;
    const arrivedFromPortal = sessionStorage.getItem('lynk-project-portal') === expectedTheme;
    sessionStorage.removeItem('lynk-project-portal');

    if (arrivedFromPortal && !reduceMotion) {
      detailPage.classList.add('project-page-arriving');
      requestAnimationFrame(() => {
        requestAnimationFrame(() => detailPage.classList.add('is-ready'));
      });
    } else {
      detailPage.classList.add('is-ready');
    }
  }
})();
