/**
 * SignConnect Home Page Controller
 */
(function initSignConnectHome() {
  document.addEventListener('DOMContentLoaded', () => {
    // Quick phrases demo logic
    const phrasePills = document.querySelectorAll('.phrase-pill');
    const phraseTitle = document.getElementById('phrase-title');
    const phraseDesc = document.getElementById('phrase-desc');
    const btnSpeakPhrase = document.getElementById('btn-speak-phrase');

    let currentPhrase = "🙏 नमस्ते (Namaste)";

    phrasePills.forEach(pill => {
      pill.addEventListener('click', () => {
        phrasePills.forEach(p => {
          p.classList.remove('bg-primary', 'text-on-primary');
          p.classList.add('bg-surface-container-lowest', 'text-primary');
        });
        pill.classList.remove('bg-surface-container-lowest', 'text-primary');
        pill.classList.add('bg-primary', 'text-on-primary');

        const title = pill.getAttribute('data-phrase') || pill.textContent.trim();
        const desc = pill.getAttribute('data-meaning') || 'Indian Sign Language standardized sign';

        currentPhrase = title;
        if (phraseTitle) phraseTitle.textContent = title;
        if (phraseDesc) phraseDesc.textContent = desc;

        if (window.SignConnectToast) {
          window.SignConnectToast.show(`Selected sign: ${title}`, 'sign_language');
        }
      });
    });

    if (btnSpeakPhrase) {
      btnSpeakPhrase.addEventListener('click', (e) => {
        e.stopPropagation();
        if ('speechSynthesis' in window) {
          window.speechSynthesis.cancel();
          const utterance = new SpeechSynthesisUtterance(currentPhrase);
          utterance.lang = 'hi-IN';
          window.speechSynthesis.speak(utterance);
        }
        if (window.SignConnectToast) {
          window.SignConnectToast.show(`Speaking: "${currentPhrase}"`, 'volume_up');
        }
      });
    }

    // Hero Action Buttons
    const btnHeroTranslate = document.getElementById('btn-hero-translate');
    const btnHeroLearn = document.getElementById('btn-hero-learn');

    if (btnHeroTranslate) {
      btnHeroTranslate.addEventListener('click', () => {
        window.location.href = '../live-translator/index.html';
      });
    }

    if (btnHeroLearn) {
      btnHeroLearn.addEventListener('click', () => {
        window.location.href = '../learn-isl/index.html';
      });
    }

    // Feature Tiles Navigation
    const tileTranslate = document.getElementById('tile-live-translator');
    const tileTextToSign = document.getElementById('tile-text-to-sign');
    const tileEmergency = document.getElementById('tile-emergency');
    const tileLearn = document.getElementById('tile-learn-isl');

    if (tileTranslate) {
      tileTranslate.addEventListener('click', () => {
        window.location.href = '../live-translator/index.html';
      });
    }
    if (tileTextToSign) {
      tileTextToSign.addEventListener('click', () => {
        window.location.href = '../text-to-sign/index.html';
      });
    }
    if (tileEmergency) {
      tileEmergency.addEventListener('click', () => {
        window.location.href = '../emergency-help/index.html';
      });
    }
    if (tileLearn) {
      tileLearn.addEventListener('click', () => {
        window.location.href = '../learn-isl/index.html';
      });
    }
  });
})();

