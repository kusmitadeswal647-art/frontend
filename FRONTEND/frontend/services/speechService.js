/**
 * SignConnect Speech & Audio Service
 * Web Speech API wrapper for both SpeechSynthesis (TTS) and SpeechRecognition (STT).
 */
export const SpeechService = {
  isSupported() {
    return 'speechSynthesis' in window;
  },

  speak(text, lang = 'hi-IN') {
    if (!('speechSynthesis' in window)) {
      console.warn('Speech synthesis not supported');
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.95;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;
    window.speechSynthesis.speak(utterance);
  },

  stop() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  },

  createRecognizer(onResult, onError) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      return null;
    }
    const recognizer = new SpeechRecognition();
    recognizer.continuous = false;
    recognizer.interimResults = false;
    recognizer.lang = 'en-IN';
    recognizer.onresult = (e) => {
      if (e.results && e.results[0]) {
        onResult(e.results[0][0].transcript);
      }
    };
    recognizer.onerror = onError;
    return recognizer;
  }
};

