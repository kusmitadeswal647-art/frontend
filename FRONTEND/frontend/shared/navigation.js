/**
 * SignConnect Universal Navigation Handler
 * Connects all page navigation tabs, header accessibility triggers,
 * and maintains active state across frontend routes.
 */
(function() {
  function getRelativeRoot() {
    const path = window.location.pathname;
    if (path.includes('/pages/')) {
      return '../../';
    }
    return './';
  }

  function initNavigation() {
    const root = getRelativeRoot();
    const navLinks = document.querySelectorAll('nav a[data-path]');
    
    // Map paths to actual route URLs
    const routes = {
      'home': `${root}pages/home/index.html`,
      'translate': `${root}pages/live-translator/index.html`,
      'learn': `${root}pages/learn-isl/index.html`,
      'emergency': `${root}pages/emergency-help/index.html`,
      'more': `${root}pages/privacy-accessibility/index.html`,
      'about': `${root}pages/about-us/index.html`,
      'text-to-sign': `${root}pages/text-to-sign/index.html`
    };

    navLinks.forEach(link => {
      const pathKey = link.getAttribute('data-path');
      if (routes[pathKey]) {
        link.href = routes[pathKey];
      }
    });

    // Setup Header Accessibility Button
    const a11yBtns = document.querySelectorAll('button[aria-label*="Accessibility"], button[aria-label*="Contrast"]');
    a11yBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        // If not already on accessibility preferences, navigate there
        if (!window.location.pathname.includes('privacy-accessibility')) {
          window.location.href = `${root}pages/privacy-accessibility/index.html`;
        }
      });
    });

    // Check Local Storage for active visual accessibility settings
    applyStoredAccessibility();
  }

  function applyStoredAccessibility() {
    try {
      const savedScale = localStorage.getItem('signconnect_font_scale');
      if (savedScale && savedScale !== '100') {
        document.body.classList.add(`font-scale-${savedScale}`);
      }
      const savedContrast = localStorage.getItem('signconnect_contrast');
      if (savedContrast === 'high') {
        document.body.classList.add('high-contrast-mode');
      }
    } catch (e) {
      // Storage access blocked or sandbox environment
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNavigation);
  } else {
    initNavigation();
  }
})();

