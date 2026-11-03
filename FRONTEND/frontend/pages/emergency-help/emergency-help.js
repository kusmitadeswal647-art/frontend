/**
 * SignConnect Emergency Help & Instant SOS Controller
 */
(function initEmergencyHelp() {
  let strobeInterval = null;
  let isStrobing = false;

  window.toggleStrobeBeacon = function() {
    const btn = document.getElementById('beaconBtn');
    if (!isStrobing) {
      isStrobing = true;
      btn?.classList.add('bg-on-error', 'text-error');
      btn?.classList.remove('bg-error', 'text-on-error');

      let flashState = false;
      strobeInterval = setInterval(() => {
        flashState = !flashState;
        document.body.style.backgroundColor = flashState ? '#ba1a1a' : '#faf8ff';
      }, 200);

      window.showQuickToast('Beacon Flashing: Point screen outward');
      window.triggerHaptics([100, 50, 100, 50]);
    } else {
      isStrobing = false;
      clearInterval(strobeInterval);
      document.body.style.backgroundColor = '';
      btn?.classList.remove('bg-on-error', 'text-error');
      btn?.classList.add('bg-error', 'text-on-error');
      window.showQuickToast('Beacon turned off');
    }
  };

  window.triggerUrgentSOS = function(engText, hindiText) {
    const primary = document.getElementById('modalPrimaryText');
    const secondary = document.getElementById('modalSecondaryText');
    const modal = document.getElementById('urgentFullscreenOverlay');

    if (primary) primary.innerText = engText;
    if (secondary) secondary.innerText = hindiText;
    if (modal) {
      modal.classList.remove('hidden');
      modal.classList.add('flex');
    }

    window.triggerHaptics([200, 100, 200, 100, 400]);

    const autoSpeak = document.getElementById('autoSpeakToggle')?.checked;
    if (autoSpeak) {
      window.speakAloud(engText + '. ' + hindiText);
    }
  };

  window.setCustomText = function(engText, hindiText) {
    const textarea = document.getElementById('customEmergencyMsg');
    if (textarea) {
      textarea.value = engText;
      textarea.focus();
    }
    window.showQuickToast('Preset selected. Tap Expand when ready.');
  };

  window.expandCustomDisplay = function() {
    const textarea = document.getElementById('customEmergencyMsg');
    const msg = textarea ? textarea.value.trim() : '';
    if (!msg) {
      window.showQuickToast('Please type or select an urgent message first.');
      textarea?.focus();
      return;
    }
    window.triggerUrgentSOS(msg, 'कृपया यह संदेश तुरंत पढ़ें और सहायता करें');
  };

  window.closeUrgentModal = function() {
    const modal = document.getElementById('urgentFullscreenOverlay');
    if (modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  };

  window.speakCurrentModalText = function() {
    const primary = document.getElementById('modalPrimaryText')?.innerText || '';
    const secondary = document.getElementById('modalSecondaryText')?.innerText || '';
    window.speakAloud(primary + '. ' + secondary);
  };

  window.speakAloud = function(text) {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;
      utterance.lang = 'hi-IN';
      window.speechSynthesis.speak(utterance);
    }
  };

  window.triggerHaptics = function(pattern) {
    if ('vibrate' in navigator) {
      try {
        navigator.vibrate(pattern);
      } catch (e) {
        // Safe failover
      }
    }
  };

  window.shareCurrentLocation = function() {
    const locationString = 'EMERGENCY SOS: My Current Location: Connaught Place, Central Wing, New Delhi (Lat: 28.6315, Lng: 77.2167). I am deaf and need immediate assistance.';
    if (navigator.share) {
      navigator.share({
        title: 'Emergency SOS - SignConnect',
        text: locationString,
      }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(locationString);
      window.showQuickToast('GPS Coordinates copied to clipboard!');
    }
  };

  window.triggerMedicalIDModal = function() {
    const modal = document.getElementById('medicalIdModal');
    if (modal) {
      modal.classList.remove('hidden');
      modal.classList.add('flex');
    }
  };

  window.closeMedicalIDModal = function() {
    const modal = document.getElementById('medicalIdModal');
    if (modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }
  };

  window.showQuickToast = function(msg) {
    if (window.SignConnectToast) {
      window.SignConnectToast.show(msg, 'emergency');
    } else {
      const toast = document.getElementById('sosToast');
      const toastText = document.getElementById('sosToastText');
      if (toast && toastText) {
        toastText.innerText = msg;
        toast.classList.remove('hidden');
        setTimeout(() => toast.classList.add('hidden'), 2800);
      }
    }
  };
})();

