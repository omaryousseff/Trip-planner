// Device haptic feedback helper
export type HapticType = 'light' | 'medium' | 'strong' | 'success';

export const triggerHaptic = (type: HapticType = 'light') => {
  if (typeof window === 'undefined' || !('vibrate' in navigator)) {
    return;
  }

  try {
    switch (type) {
      case 'light':
        // Soft tactile tap for card lifts / hover / minor buttons
        navigator.vibrate(12);
        break;
      case 'medium':
        // Satisfying button tap or drag pick-up
        navigator.vibrate(30);
        break;
      case 'strong':
        // Card drop / drag reorder / navigation change
        navigator.vibrate([45, 25, 45]);
        break;
      case 'success':
        // Passport stamp, item completed celebration
        navigator.vibrate([25, 40, 60]);
        break;
    }
  } catch {
    // Ignore unsupported environments
  }
};
