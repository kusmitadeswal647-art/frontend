/**
 * SignConnect Learn ISL Controller
 */
(function initLearnISL() {
  document.addEventListener('DOMContentLoaded', () => {
    // Category Tabs Filtering
    const categoryTabs = document.querySelectorAll('.category-tab');
    const moduleCards = document.querySelectorAll('.module-card');
    const searchInput = document.getElementById('isl-vocab-search');
    const clearSearchBtn = document.getElementById('clear-search-btn');

    function filterContent() {
      const activeTab = document.querySelector('.category-tab[aria-selected="true"]');
      const selectedCategory = activeTab ? activeTab.getAttribute('data-category') : 'all';
      const query = (searchInput?.value || '').toLowerCase().trim();

      if (clearSearchBtn) {
        if (query.length > 0) {
          clearSearchBtn.classList.remove('hidden');
        } else {
          clearSearchBtn.classList.add('hidden');
        }
      }

      moduleCards.forEach(card => {
        const cardCategory = card.getAttribute('data-card-category');
        const cardText = card.textContent.toLowerCase();

        const matchesCategory = selectedCategory === 'all' || cardCategory === selectedCategory;
        const matchesQuery = query === '' || cardText.includes(query);

        if (matchesCategory && matchesQuery) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    }

    categoryTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        categoryTabs.forEach(t => {
          t.setAttribute('aria-selected', 'false');
          t.classList.remove('bg-primary', 'text-on-primary', 'shadow-sm');
          t.classList.add('bg-surface-container', 'text-on-surface');
        });
        tab.setAttribute('aria-selected', 'true');
        tab.classList.remove('bg-surface-container', 'text-on-surface');
        tab.classList.add('bg-primary', 'text-on-primary', 'shadow-sm');

        filterContent();
      });
    });

    searchInput?.addEventListener('input', filterContent);
    clearSearchBtn?.addEventListener('click', () => {
      if (searchInput) {
        searchInput.value = '';
        filterContent();
        searchInput.focus();
      }
    });

    // Sandbox Toggle Interaction
    const startSandboxBtn = document.getElementById('start-sandbox-btn');
    const closeSandboxBtn = document.getElementById('close-sandbox-btn');
    const sandboxIdle = document.getElementById('sandbox-idle');
    const sandboxActive = document.getElementById('sandbox-active');

    if (startSandboxBtn && closeSandboxBtn && sandboxIdle && sandboxActive) {
      startSandboxBtn.addEventListener('click', () => {
        sandboxIdle.classList.add('hidden');
        sandboxActive.classList.remove('hidden');
        window.SignConnectToast?.show('Practice mirror sandbox started', 'videocam');
      });

      closeSandboxBtn.addEventListener('click', () => {
        sandboxActive.classList.add('hidden');
        sandboxIdle.classList.remove('hidden');
        window.SignConnectToast?.show('Sandbox session ended', 'check');
      });
    }

    // Detail Modal Drawer for Vocabulary Pills
    const modalBackdrop = document.getElementById('vocab-modal-backdrop');
    const modalSheet = document.getElementById('vocab-modal-sheet');
    const modalTitle = document.getElementById('modal-vocab-title');
    const modalDesc = document.getElementById('modal-vocab-desc');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const vocabPills = document.querySelectorAll('.vocab-pill');
    const modalTryCameraBtn = document.getElementById('modal-try-camera-btn');

    function openModal(phrase, desc) {
      if (modalTitle) modalTitle.textContent = phrase;
      if (modalDesc) modalDesc.textContent = desc;
      if (modalBackdrop && modalSheet) {
        modalBackdrop.classList.remove('hidden');
        modalBackdrop.classList.add('flex');
        setTimeout(() => {
          modalBackdrop.classList.remove('opacity-0');
          modalSheet.classList.remove('translate-y-full');
        }, 10);
      }
    }

    function closeModal() {
      if (modalBackdrop && modalSheet) {
        modalBackdrop.classList.add('opacity-0');
        modalSheet.classList.add('translate-y-full');
        setTimeout(() => {
          modalBackdrop.classList.remove('flex');
          modalBackdrop.classList.add('hidden');
        }, 300);
      }
    }

    vocabPills.forEach(pill => {
      pill.addEventListener('click', () => {
        const phrase = pill.getAttribute('data-phrase');
        const desc = pill.getAttribute('data-desc');
        openModal(phrase, desc);
      });
    });

    closeModalBtn?.addEventListener('click', closeModal);

    modalBackdrop?.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) closeModal();
    });

    modalTryCameraBtn?.addEventListener('click', () => {
      closeModal();
      const cameraBox = document.getElementById('camera-sandbox');
      if (cameraBox) {
        cameraBox.scrollIntoView({ behavior: 'smooth' });
        if (startSandboxBtn) startSandboxBtn.click();
      }
    });
  });
})();

