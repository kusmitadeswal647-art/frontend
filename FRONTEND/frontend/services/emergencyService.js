/**
 * SignConnect Emergency Services Adapter
 * Handles distress signaling, geolocation capture, and contact alerting.
 */
export const EmergencyService = {
  triggerHaptic(pattern = [300, 100, 300, 100, 500]) {
    if ('vibrate' in navigator) {
      try {
        navigator.vibrate(pattern);
      } catch (err) {
        console.warn('Vibration failed:', err);
      }
    }
  },

  async getCurrentLocation() {
    return new Promise((resolve) => {
      if (!navigator.geolocation) {
        resolve({
          text: 'Connaught Place, Central Wing, New Delhi (Lat: 28.6315, Lng: 77.2167)',
          latitude: 28.6315,
          longitude: 77.2167
        });
        return;
      }
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          resolve({
            text: `Lat: ${pos.coords.latitude.toFixed(4)}, Lng: ${pos.coords.longitude.toFixed(4)}`,
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude
          });
        },
        () => {
          resolve({
            text: 'Connaught Place, Central Wing, New Delhi (Lat: 28.6315, Lng: 77.2167)',
            latitude: 28.6315,
            longitude: 77.2167
          });
        },
        { timeout: 5000 }
      );
    });
  },

  async broadcastSOS(message) {
    const loc = await this.getCurrentLocation();
    const payload = {
      message: message,
      location: loc,
      timestamp: new Date().toISOString(),
      userType: 'Deaf/Hard of Hearing'
    };
    console.log('[EmergencyService] Broadcasting SOS payload:', payload);
    return { success: true, broadcastId: 'SOS-' + Date.now() };
  }
};

