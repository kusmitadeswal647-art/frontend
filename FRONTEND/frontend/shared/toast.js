/**
 * SignConnect Global Toast Notification Utility
 */
window.SignConnectToast = (function() {
  let toastElement = null;
  let toastTimeout = null;

  function ensureToastContainer() {
    if (!toastElement) {
      toastElement = document.getElementById('global-toast');
      if (!toastElement) {
        toastElement = document.createElement('div');
        toastElement.id = 'global-toast';
        toastElement.className = 'fixed bottom-20 left-1/2 -translate-x-1/2 bg-inverse-surface text-inverse-on-surface px-4 py-2.5 rounded-full font-label-md text-label-md shadow-xl transition-all duration-300 opacity-0 pointer-events-none translate-y-3 z-50 flex items-center gap-2 max-w-[90vw]';
        toastElement.innerHTML = `
          <span class="material-symbols-outlined text-secondary text-[18px]">info</span>
          <span id="global-toast-text">Notification</span>
        `;
        document.body.appendChild(toastElement);
      }
    }
  }

  function show(message, icon = 'info') {
    ensureToastContainer();
    const textSpan = toastElement.querySelector('#global-toast-text');
    const iconSpan = toastElement.querySelector('.material-symbols-outlined');
    
    if (textSpan) textSpan.textContent = message;
    if (iconSpan) iconSpan.textContent = icon;

    toastElement.classList.remove('opacity-0', 'translate-y-3', 'pointer-events-none');
    toastElement.classList.add('opacity-100', 'translate-y-0');

    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toastElement.classList.add('opacity-0', 'translate-y-3', 'pointer-events-none');
      toastElement.classList.remove('opacity-100', 'translate-y-0');
    }, 2800);
  }

  return {
    show: show
  };
})();

