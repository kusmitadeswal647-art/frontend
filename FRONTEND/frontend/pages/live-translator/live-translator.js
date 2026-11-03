/**
 * SignConnect Live ISL Camera Translator Controller
 */
(function initLiveTranslator() {
  document.addEventListener('DOMContentLoaded', () => {
    const btnPause = document.getElementById('btn-pause-rec');
    const pauseIcon = document.getElementById('pause-icon');
    const pauseLabel = document.getElementById('pause-label');
    const btnStop = document.getElementById('btn-stop-cam');
    const btnFlip = document.getElementById('btn-flip');
    const btnSwitchCam = document.getElementById('btn-switch-cam');
    const btnFocusLock = document.getElementById('btn-focus-lock');
    const btnTts = document.getElementById('btn-tts');
    const btnEdit = document.getElementById('btn-edit');
    const btnCopy = document.getElementById('btn-copy');
    const copyIcon = document.getElementById('copy-icon');
    const copyLabel = document.getElementById('copy-label');
    const btnClear = document.getElementById('btn-clear');
    const captionText = document.getElementById('live-caption-text');
    const btnLight = document.getElementById('btn-toggle-light');
    const lightIcon = document.getElementById('light-icon');
    const rightHand = document.getElementById('right-hand-mesh');
    const leftHand = document.getElementById('left-hand-mesh');
    const cameraViewport = document.getElementById('camera-feed-bg');

    let isPaused = false;
    let lightActive = false;
    let isFlipped = false;
    let isLocked = true;

    // Toggle Pause / Resume
    btnPause?.addEventListener('click', () => {
      isPaused = !isPaused;
      if (isPaused) {
        if (pauseIcon) pauseIcon.textContent = 'play_circle';
        if (pauseLabel) pauseLabel.textContent = 'Resume';
        btnPause.classList.add('text-primary');
        if (rightHand) rightHand.style.opacity = '0.2';
        if (leftHand) leftHand.style.opacity = '0.2';
        window.SignConnectToast?.show('Recognition paused', 'pause');
      } else {
        if (pauseIcon) pauseIcon.textContent = 'pause_circle';
        if (pauseLabel) pauseLabel.textContent = 'Pause';
        btnPause.classList.remove('text-primary');
        if (rightHand) rightHand.style.opacity = '0.95';
        if (leftHand) leftHand.style.opacity = '0.95';
        window.SignConnectToast?.show('Live recognition resumed', 'play_arrow');
      }
    });

    // Stop Camera
    btnStop?.addEventListener('click', () => {
      isPaused = true;
      if (pauseIcon) pauseIcon.textContent = 'play_circle';
      if (pauseLabel) pauseLabel.textContent = 'Start';
      if (rightHand) rightHand.style.opacity = '0';
      if (leftHand) leftHand.style.opacity = '0';
      window.SignConnectToast?.show('Camera feed stopped', 'videocam_off');
    });

    // Flip Camera
    function toggleFlip() {
      isFlipped = !isFlipped;
      if (cameraViewport) {
        cameraViewport.style.transform = isFlipped ? 'scaleX(-1)' : 'scaleX(1)';
      }
      window.SignConnectToast?.show(isFlipped ? 'Switched to front selfie camera' : 'Switched to rear world camera', 'cameraswitch');
    }
    btnFlip?.addEventListener('click', toggleFlip);
    btnSwitchCam?.addEventListener('click', toggleFlip);

    // Focus Lock
    btnFocusLock?.addEventListener('click', () => {
      isLocked = !isLocked;
      if (isLocked) {
        btnFocusLock.className = 'flex flex-col items-center justify-center p-2 rounded-lg bg-primary-container text-on-primary active:scale-95 transition-all min-h-[52px]';
        btnFocusLock.innerHTML = '<span class="material-symbols-outlined text-[22px]">lock</span><span class="font-label-md text-label-md mt-0.5">Locked</span>';
        window.SignConnectToast?.show('Autofocus locked on signing field', 'lock');
      } else {
        btnFocusLock.className = 'flex flex-col items-center justify-center p-2 rounded-lg bg-surface text-on-surface hover:bg-surface-container active:scale-95 transition-all min-h-[52px]';
        btnFocusLock.innerHTML = '<span class="material-symbols-outlined text-[22px] text-on-surface-variant">lock_open</span><span class="font-label-md text-label-md mt-0.5">Auto</span>';
        window.SignConnectToast?.show('Continuous tracking autofocus enabled', 'lock_open');
      }
    });

    // Lighting Assist Toggle
    btnLight?.addEventListener('click', () => {
      lightActive = !lightActive;
      if (lightActive) {
        if (lightIcon) lightIcon.textContent = 'flash_on';
        btnLight.classList.add('bg-amber-100');
        window.SignConnectToast?.show('Lighting boost active', 'flashlight_on');
      } else {
        if (lightIcon) lightIcon.textContent = 'lightbulb';
        btnLight.classList.remove('bg-amber-100');
        window.SignConnectToast?.show('Lighting assist disabled', 'flashlight_off');
      }
    });

    // Text to Speech
    btnTts?.addEventListener('click', () => {
      if ('speechSynthesis' in window && captionText) {
        const text = captionText.textContent.trim();
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.95;
        utterance.lang = 'hi-IN';
        window.speechSynthesis.speak(utterance);
        window.SignConnectToast?.show('Speaking translation aloud', 'volume_up');
      }
    });

    // Edit Caption
    btnEdit?.addEventListener('click', () => {
      if (captionText) {
        const current = captionText.textContent.trim();
        const updated = prompt('Edit detected transcript:', current);
        if (updated !== null && updated.trim() !== '') {
          captionText.textContent = updated.trim();
          window.SignConnectToast?.show('Transcript updated', 'check');
        }
      }
    });

    // Copy to Clipboard
    btnCopy?.addEventListener('click', () => {
      if (captionText) {
        navigator.clipboard?.writeText(captionText.textContent.trim()).then(() => {
          if (copyIcon) copyIcon.textContent = 'check';
          if (copyLabel) copyLabel.textContent = 'Copied';
          window.SignConnectToast?.show('Transcript copied to clipboard', 'content_copy');
          setTimeout(() => {
            if (copyIcon) copyIcon.textContent = 'content_copy';
            if (copyLabel) copyLabel.textContent = 'Copy';
          }, 1800);
        });
      }
    });

    // Clear Caption
    btnClear?.addEventListener('click', () => {
      if (captionText) {
        captionText.textContent = "Listening for signs...";
        captionText.classList.remove('font-bold');
        captionText.classList.add('font-normal', 'text-on-surface-variant');
        window.SignConnectToast?.show('Caption cleared', 'backspace');
      }
    });

    // Landmark pulsation animation
    let step = 0;
    function pulseLandmarks() {
      if (!isPaused && rightHand && leftHand) {
        step += 0.05;
        const offset = Math.sin(step) * 2;
        rightHand.setAttribute('transform', `translate(0, ${offset})`);
        leftHand.setAttribute('transform', `translate(0, ${-offset})`);
      }
      requestAnimationFrame(pulseLandmarks);
    }
    requestAnimationFrame(pulseLandmarks);
  });
})();

