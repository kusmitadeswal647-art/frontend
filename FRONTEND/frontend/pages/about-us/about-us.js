/**
 * SignConnect About Us & Advocacy Controller
 */
(function initAboutUs() {
  document.addEventListener('DOMContentLoaded', () => {
    const feedbackBtn = document.getElementById('feedback-btn');
    const feedbackDrawer = document.getElementById('feedback-drawer');
    const feedbackClose = document.getElementById('feedback-close');

    if (feedbackBtn && feedbackDrawer && feedbackClose) {
      feedbackBtn.addEventListener('click', function() {
        const isHidden = feedbackDrawer.classList.contains('hidden');
        if (isHidden) {
          feedbackDrawer.classList.remove('hidden');
          feedbackDrawer.classList.add('flex');
          feedbackBtn.setAttribute('aria-expanded', 'true');
        } else {
          feedbackDrawer.classList.add('hidden');
          feedbackDrawer.classList.remove('flex');
          feedbackBtn.setAttribute('aria-expanded', 'false');
        }
      });

      feedbackClose.addEventListener('click', function() {
        feedbackDrawer.classList.add('hidden');
        feedbackDrawer.classList.remove('flex');
        feedbackBtn.setAttribute('aria-expanded', 'false');
      });
    }

    // Modal modes simulation
    const modeButtons = feedbackDrawer?.querySelectorAll('button');
    modeButtons?.forEach(btn => {
      btn.addEventListener('click', () => {
        if (btn !== feedbackClose) {
          feedbackDrawer.classList.add('hidden');
          feedbackDrawer.classList.remove('flex');
          feedbackBtn.setAttribute('aria-expanded', 'false');
          window.SignConnectToast?.show('Thank you! Community session recorder opened.', 'videocam');
        }
      });
    });
  });
})();

