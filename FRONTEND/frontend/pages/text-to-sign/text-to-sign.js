/**
 * SignConnect Text & Voice to ISL Controller
 */
(function initTextToSign() {
  document.addEventListener('DOMContentLoaded', () => {
    const phraseInput = document.getElementById('phrase-input');
    const charCounter = document.getElementById('char-counter');
    const clearBtn = document.getElementById('clear-btn');
    const voiceBtn = document.getElementById('voice-btn');
    const micIcon = document.getElementById('mic-icon');
    const langEn = document.getElementById('lang-en');
    const langHi = document.getElementById('lang-hi');
    const presetChips = document.querySelectorAll('.preset-chip');
    const translateBtn = document.getElementById('translate-btn');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const playIcon = document.getElementById('play-icon');
    const replayBtn = document.getElementById('replay-btn');
    const progressContainer = document.getElementById('progress-container');
    const progressBar = document.getElementById('progress-bar');
    const speedButtons = document.querySelectorAll('.speed-btn');
    const speedIndicator = document.getElementById('speed-indicator');
    const angleFront = document.getElementById('angle-front');
    const angleSide = document.getElementById('angle-side');
    const angleIndicator = document.getElementById('angle-indicator');
    const handIndicator = document.getElementById('hand-indicator');
    const avatarImg = document.getElementById('avatar-img');

    let isPlaying = true;
    let isListening = false;
    let currentSpeed = 1.0;
    let progressPercent = 0;
    let animInterval = null;

    // Character counter
    function updateCounter() {
      if (phraseInput && charCounter) {
        const len = phraseInput.value.length;
        charCounter.textContent = `${len} / 120 chars`;
        if (len > 120) {
          charCounter.classList.add('text-error');
        } else {
          charCounter.classList.remove('text-error');
        }
      }
    }

    phraseInput?.addEventListener('input', updateCounter);

    // Clear input
    clearBtn?.addEventListener('click', () => {
      if (phraseInput) {
        phraseInput.value = '';
        updateCounter();
        phraseInput.focus();
        window.SignConnectToast?.show('Input cleared', 'backspace');
      }
    });

    // Preset chips
    presetChips.forEach(chip => {
      chip.addEventListener('click', () => {
        presetChips.forEach(c => {
          c.classList.remove('bg-surface-container-high', 'text-primary');
          c.classList.add('bg-surface-container', 'text-on-surface');
        });
        chip.classList.add('bg-surface-container-high', 'text-primary');
        chip.classList.remove('bg-surface-container', 'text-on-surface');

        if (phraseInput) {
          phraseInput.value = chip.dataset.phrase || chip.textContent.trim();
          updateCounter();
          triggerTranslateFeedback();
        }
      });
    });

    // Voice dictation
    voiceBtn?.addEventListener('click', () => {
      isListening = !isListening;
      if (isListening) {
        voiceBtn.classList.add('bg-error', 'text-on-error', 'animate-pulse');
        voiceBtn.classList.remove('bg-surface-container-high', 'text-primary');
        micIcon.textContent = 'mic_active';
        window.SignConnectToast?.show('Listening to voice input...', 'mic');

        // Check Web Speech API
        const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRec) {
          const recognizer = new SpeechRec();
          recognizer.lang = langHi.classList.contains('bg-surface-container-lowest') ? 'hi-IN' : 'en-IN';
          recognizer.onresult = (e) => {
            const transcript = e.results[0][0].transcript;
            if (phraseInput) {
              phraseInput.value = transcript;
              updateCounter();
              triggerTranslateFeedback();
            }
          };
          recognizer.onerror = () => {
            simulateVoiceFallback();
          };
          recognizer.onend = () => {
            isListening = false;
            resetVoiceBtn();
          };
          try {
            recognizer.start();
          } catch (e) {
            simulateVoiceFallback();
          }
        } else {
          simulateVoiceFallback();
        }
      } else {
        resetVoiceBtn();
      }
    });

    function resetVoiceBtn() {
      voiceBtn.classList.remove('bg-error', 'text-on-error', 'animate-pulse');
      voiceBtn.classList.add('bg-surface-container-high', 'text-primary');
      micIcon.textContent = 'mic';
    }

    function simulateVoiceFallback() {
      setTimeout(() => {
        if (phraseInput && isListening) {
          phraseInput.value = langHi.classList.contains('bg-surface-container-lowest') 
            ? "दवाखाना कहाँ है?" 
            : "Where is the pharmacy?";
          updateCounter();
          triggerTranslateFeedback();
          window.SignConnectToast?.show('Dictation recognized', 'record_voice_over');
        }
        isListening = false;
        resetVoiceBtn();
      }, 2000);
    }

    // Language Toggle
    langEn?.addEventListener('click', () => {
      langEn.classList.add('bg-surface-container-lowest', 'text-primary', 'shadow-sm');
      langEn.classList.remove('text-on-surface-variant');
      langHi.classList.remove('bg-surface-container-lowest', 'text-primary', 'shadow-sm');
      langHi.classList.add('text-on-surface-variant');
      if (phraseInput) {
        phraseInput.placeholder = "Type a sentence or common greeting (e.g. 'Where is the pharmacy?')";
      }
    });

    langHi?.addEventListener('click', () => {
      langHi.classList.add('bg-surface-container-lowest', 'text-primary', 'shadow-sm');
      langHi.classList.remove('text-on-surface-variant');
      langEn.classList.remove('bg-surface-container-lowest', 'text-primary', 'shadow-sm');
      langEn.classList.add('text-on-surface-variant');
      if (phraseInput) {
        phraseInput.placeholder = "एक वाक्य या अभिवादन टाइप करें (जैसे 'दवाखाना कहाँ है?')";
      }
    });

    // Playback Progress Loop Simulation
    function startProgressLoop() {
      if (animInterval) clearInterval(animInterval);
      animInterval = setInterval(() => {
        if (!isPlaying) return;
        progressPercent = (progressPercent + (1 * currentSpeed)) % 100;
        if (progressBar) progressBar.style.width = progressPercent + '%';

        if (handIndicator) {
          if (progressPercent < 35) {
            handIndicator.innerHTML = '<span class="material-symbols-outlined text-[18px] text-secondary-fixed-dim">medication</span><span>Signing: [PHARMACY]</span>';
          } else if (progressPercent < 70) {
            handIndicator.innerHTML = '<span class="material-symbols-outlined text-[18px] text-secondary-fixed-dim">location_on</span><span>Signing: [WHERE]</span>';
          } else {
            handIndicator.innerHTML = '<span class="material-symbols-outlined text-[18px] text-secondary-fixed-dim">contact_support</span><span>Signing: [QUESTION]</span>';
          }
        }
      }, 50);
    }
    startProgressLoop();

    // Play/Pause Action
    playPauseBtn?.addEventListener('click', () => {
      isPlaying = !isPlaying;
      if (playIcon) playIcon.textContent = isPlaying ? 'pause' : 'play_arrow';
      playPauseBtn.setAttribute('aria-label', isPlaying ? 'Pause animation' : 'Play animation');
    });

    // Replay Action
    replayBtn?.addEventListener('click', () => {
      progressPercent = 0;
      if (progressBar) progressBar.style.width = '0%';
      isPlaying = true;
      if (playIcon) playIcon.textContent = 'pause';
      window.SignConnectToast?.show('Replaying sign demonstration', 'replay');
    });

    // Seek Click
    progressContainer?.addEventListener('click', (e) => {
      const rect = progressContainer.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      progressPercent = Math.max(0, Math.min(100, (clickX / rect.width) * 100));
      if (progressBar) progressBar.style.width = progressPercent + '%';
    });

    // Speed Controls
    speedButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        speedButtons.forEach(b => {
          b.classList.remove('bg-primary-container', 'text-on-primary', 'font-bold');
          b.classList.add('text-surface-variant');
        });
        btn.classList.add('bg-primary-container', 'text-on-primary', 'font-bold');
        btn.classList.remove('text-surface-variant');
        currentSpeed = parseFloat(btn.dataset.speed);
        if (speedIndicator) speedIndicator.textContent = `${currentSpeed}x Speed`;
        window.SignConnectToast?.show(`Speed set to ${currentSpeed}x`, 'speed');
      });
    });

    // Angle Toggles
    angleFront?.addEventListener('click', () => {
      angleFront.className = 'px-2 py-1 rounded font-label-md text-label-md bg-secondary text-on-secondary transition-colors focus:outline-none';
      angleSide.className = 'px-2 py-1 rounded font-label-md text-label-md text-surface-variant hover:text-surface-bright transition-colors focus:outline-none';
      if (angleIndicator) angleIndicator.textContent = "Front View (0°)";
      if (avatarImg) avatarImg.style.transform = 'none';
    });

    angleSide?.addEventListener('click', () => {
      angleSide.className = 'px-2 py-1 rounded font-label-md text-label-md bg-secondary text-on-secondary transition-colors focus:outline-none';
      angleFront.className = 'px-2 py-1 rounded font-label-md text-label-md text-surface-variant hover:text-surface-bright transition-colors focus:outline-none';
      if (angleIndicator) angleIndicator.textContent = "Side View (45° Handshape Depth)";
      if (avatarImg) avatarImg.style.transform = 'perspective(800px) rotateY(-18deg) scale(1.04)';
    });

    // Translate Feedback
    function triggerTranslateFeedback() {
      if (!translateBtn) return;
      const originalText = translateBtn.innerHTML;
      translateBtn.innerHTML = '<span class="material-symbols-outlined text-[20px] animate-spin">sync</span><span>Translating grammar...</span>';
      setTimeout(() => {
        translateBtn.innerHTML = originalText;
        progressPercent = 0;
        isPlaying = true;
        if (playIcon) playIcon.textContent = 'pause';
        window.SignConnectToast?.show('ISL gesture sequence generated', 'sign_language');
      }, 600);
    }
    translateBtn?.addEventListener('click', triggerTranslateFeedback);

    updateCounter();
  });
})();

