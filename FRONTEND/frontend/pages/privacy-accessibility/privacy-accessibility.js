/**
 * SignConnect Privacy & Accessibility Preferences Controller
 */
(function initAccessibilitySettings() {
  document.addEventListener('DOMContentLoaded', () => {
    const previewBox = document.getElementById('live-preview-box');
    const previewInner = document.getElementById('preview-inner');
    const previewBadge = document.getElementById('preview-badge');
    const previewTitle = document.getElementById('preview-title');
    const previewText = document.getElementById('preview-text');
    const fontScaleReadout = document.getElementById('font-scale-readout');

    let currentScale = '100';
    let currentContrast = 'default';

    // Retrieve saved settings
    try {
      const savedScale = localStorage.getItem('signconnect_font_scale');
      if (savedScale) currentScale = savedScale;
      const savedContrast = localStorage.getItem('signconnect_contrast');
      if (savedContrast) currentContrast = savedContrast;
    } catch (e) {}

    // Font Scale Buttons
    const fontButtons = document.querySelectorAll('.font-scale-opt');
    fontButtons.forEach(btn => {
      const scale = btn.getAttribute('data-scale');
      if (scale === currentScale) {
        btn.setAttribute('aria-checked', 'true');
        btn.classList.add('bg-primary', 'text-on-primary', 'shadow-sm');
        btn.classList.remove('bg-surface-container', 'text-on-surface');
      } else {
        btn.setAttribute('aria-checked', 'false');
        btn.classList.remove('bg-primary', 'text-on-primary', 'shadow-sm');
        btn.classList.add('bg-surface-container', 'text-on-surface');
      }

      btn.addEventListener('click', () => {
        fontButtons.forEach(b => {
          b.setAttribute('aria-checked', 'false');
          b.classList.remove('bg-primary', 'text-on-primary', 'shadow-sm');
          b.classList.add('bg-surface-container', 'text-on-surface');
        });
        btn.setAttribute('aria-checked', 'true');
        btn.classList.add('bg-primary', 'text-on-primary', 'shadow-sm');
        btn.classList.remove('bg-surface-container', 'text-on-surface');

        currentScale = btn.getAttribute('data-scale');
        try {
          localStorage.setItem('signconnect_font_scale', currentScale);
        } catch (e) {}

        // Apply to body immediately
        document.body.classList.remove('font-scale-120', 'font-scale-150');
        if (currentScale !== '100') {
          document.body.classList.add(`font-scale-${currentScale}`);
        }

        updatePreview();
        window.SignConnectToast?.show(`Text scale set to ${currentScale}%`, 'format_size');
      });
    });

    // Contrast Buttons
    const contrastButtons = document.querySelectorAll('.contrast-opt');
    contrastButtons.forEach(btn => {
      const contrast = btn.getAttribute('data-contrast');
      if (contrast === currentContrast) {
        btn.setAttribute('aria-checked', 'true');
        btn.classList.add('bg-surface-container-high', 'shadow-sm');
        btn.classList.remove('bg-surface-container');
      } else {
        btn.setAttribute('aria-checked', 'false');
        btn.classList.remove('bg-surface-container-high', 'shadow-sm');
        btn.classList.add('bg-surface-container');
      }

      btn.addEventListener('click', () => {
        contrastButtons.forEach(b => {
          b.setAttribute('aria-checked', 'false');
          b.classList.remove('bg-surface-container-high', 'shadow-sm');
          b.classList.add('bg-surface-container');
        });
        btn.setAttribute('aria-checked', 'true');
        btn.classList.add('bg-surface-container-high', 'shadow-sm');
        btn.classList.remove('bg-surface-container');

        currentContrast = btn.getAttribute('data-contrast');
        try {
          localStorage.setItem('signconnect_contrast', currentContrast);
        } catch (e) {}

        if (currentContrast === 'black-yellow') {
          document.body.classList.add('high-contrast-mode');
        } else {
          document.body.classList.remove('high-contrast-mode');
        }

        updatePreview();
        window.SignConnectToast?.show(`Appearance: ${currentContrast}`, 'contrast');
      });
    });

    function updatePreview() {
      if (!previewTitle || !previewText || !previewInner || !previewBadge || !fontScaleReadout) return;

      // Font Scale adjustment
      if (currentScale === '100') {
        previewTitle.style.fontSize = '1.125rem';
        previewText.style.fontSize = '1rem';
        previewText.style.lineHeight = '1.625rem';
        fontScaleReadout.textContent = '100% (Standard)';
      } else if (currentScale === '120') {
        previewTitle.style.fontSize = '1.35rem';
        previewText.style.fontSize = '1.2rem';
        previewText.style.lineHeight = '1.85rem';
        fontScaleReadout.textContent = '120% (Large)';
      } else if (currentScale === '150') {
        previewTitle.style.fontSize = '1.68rem';
        previewText.style.fontSize = '1.5rem';
        previewText.style.lineHeight = '2.2rem';
        fontScaleReadout.textContent = '150% (Extra Large)';
      }

      // Contrast adjustment
      if (currentContrast === 'default') {
        previewInner.style.backgroundColor = '';
        previewInner.style.color = '';
        previewTitle.style.color = '';
        previewText.style.color = '';
        previewBadge.textContent = `${currentScale}% • Default`;
        previewBadge.className = 'font-label-md text-label-md px-2 py-0.5 rounded-full bg-surface-container text-primary';
      } else if (currentContrast === 'black-yellow') {
        previewInner.style.backgroundColor = '#000000';
        previewTitle.style.color = '#facc15';
        previewText.style.color = '#fef08a';
        previewBadge.textContent = `${currentScale}% • High Viz Yellow`;
        previewBadge.className = 'font-label-md text-label-md px-2 py-0.5 rounded-full bg-black text-yellow-300 font-bold';
      } else if (currentContrast === 'oled') {
        previewInner.style.backgroundColor = '#05070e';
        previewTitle.style.color = '#ffffff';
        previewText.style.color = '#cbd5e1';
        previewBadge.textContent = `${currentScale}% • OLED Pitch`;
        previewBadge.className = 'font-label-md text-label-md px-2 py-0.5 rounded-full bg-inverse-surface text-inverse-on-surface font-bold';
      }
    }

    // Reset Preferences
    const resetBtn = document.getElementById('reset-a11y-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        fontButtons[0]?.click();
        contrastButtons[0]?.click();
        const motionToggle = document.getElementById('reduce-motion-toggle');
        if (motionToggle) motionToggle.checked = false;
        const capToggle = document.getElementById('captions-toggle');
        if (capToggle) capToggle.checked = true;
        try {
          localStorage.removeItem('signconnect_font_scale');
          localStorage.removeItem('signconnect_contrast');
        } catch (e) {}
        window.SignConnectToast?.show('Preferences reset to default', 'restart_alt');
      });
    }

    // Offline Pack Download Simulation
    const downloadBtn = document.getElementById('download-model-btn');
    const progressBar = document.getElementById('model-progress-bar');
    const progressPercent = document.getElementById('model-progress-percent');
    const statusText = document.getElementById('model-status-text');
    const btnIcon = document.getElementById('download-btn-icon');
    const btnLabel = document.getElementById('download-btn-label');
    let downloading = false;

    if (downloadBtn) {
      downloadBtn.addEventListener('click', () => {
        if (downloading) return;
        downloading = true;
        downloadBtn.disabled = true;
        downloadBtn.classList.add('opacity-75');
        if (btnIcon) {
          btnIcon.textContent = 'sync';
          btnIcon.classList.add('animate-spin');
        }
        if (btnLabel) btnLabel.textContent = 'Downloading ISL Model...';
        if (statusText) statusText.textContent = 'Installing Pack (48MB)';

        let progress = 0;
        const interval = setInterval(() => {
          progress += 10;
          if (progress > 100) progress = 100;
          if (progressBar) progressBar.style.width = progress + '%';
          if (progressPercent) progressPercent.textContent = progress + '%';

          if (progress === 100) {
            clearInterval(interval);
            if (btnIcon) {
              btnIcon.classList.remove('animate-spin');
              btnIcon.textContent = 'check_circle';
            }
            if (btnLabel) btnLabel.textContent = 'Pack Installed & Offline Ready';
            if (statusText) statusText.textContent = 'Installed (Offline Active)';
            downloadBtn.classList.remove('bg-primary', 'opacity-75');
            downloadBtn.classList.add('bg-secondary', 'text-on-secondary');
            window.SignConnectToast?.show('Offline ISL neural pack installed (48MB)', 'offline_pin');
          }
        }, 180);
      });
    }

    updatePreview();
  });
})();

