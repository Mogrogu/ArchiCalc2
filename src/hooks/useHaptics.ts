import { useState, useCallback, useEffect } from 'react';

// Singleton AudioContext with interactive low-latency configuration
let sharedAudioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  try {
    if (!sharedAudioCtx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        sharedAudioCtx = new AudioCtx({ latencyHint: 'interactive' });
      }
    }
    if (sharedAudioCtx && sharedAudioCtx.state === 'suspended') {
      sharedAudioCtx.resume().catch(() => {});
    }
  } catch {}
  return sharedAudioCtx;
}

// Global user interaction listener to pre-warm the audio hardware immediately
if (typeof window !== 'undefined') {
  const preWarmAudio = () => {
    getAudioContext();
  };
  window.addEventListener('pointerdown', preWarmAudio, { passive: true, capture: true });
  window.addEventListener('touchstart', preWarmAudio, { passive: true, capture: true });
  window.addEventListener('keydown', preWarmAudio, { passive: true, capture: true });
}

export function useHaptics() {
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('archicalc_sound');
      return saved === null ? false : saved === 'true';
    } catch {
      return false;
    }
  });

  const [hapticsEnabled, setHapticsEnabled] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('archicalc_haptics');
      return saved === null ? true : saved === 'true';
    } catch {
      return true;
    }
  });

  const toggleSound = useCallback(() => {
    setSoundEnabled((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('archicalc_sound', String(next));
      } catch {}
      if (next) {
        getAudioContext();
      }
      return next;
    });
  }, []);

  const toggleHaptics = useCallback(() => {
    setHapticsEnabled((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('archicalc_haptics', String(next));
      } catch {}
      return next;
    });
  }, []);

  // Pre-warm audio context when sound is enabled
  useEffect(() => {
    if (soundEnabled) {
      getAudioContext();
    }
  }, [soundEnabled]);

  const triggerFeedback = useCallback(
    (type: 'standard' | 'operator' | 'equals' | 'error' = 'standard') => {
      // 1. Android & mobile tactile vibration
      if (hapticsEnabled && typeof navigator !== 'undefined' && 'vibrate' in navigator) {
        try {
          if (type === 'equals') {
            navigator.vibrate([15, 30, 20]);
          } else if (type === 'error') {
            navigator.vibrate([50, 50, 50]);
          } else {
            navigator.vibrate(10);
          }
        } catch {}
      }

      // 2. Instantaneous Web Audio tactile click feedback
      if (!soundEnabled) return;

      try {
        const ctx = getAudioContext();
        if (!ctx) return;

        // Ensure active state
        if (ctx.state === 'suspended') {
          ctx.resume().catch(() => {});
        }

        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        let freq = 800;
        let duration = 0.015;

        if (type === 'operator') {
          freq = 1100;
        } else if (type === 'equals') {
          freq = 1400;
          duration = 0.03;
        } else if (type === 'error') {
          freq = 240;
          duration = 0.07;
        }

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now);

        // Immediate crisp click ramp without latency
        gain.gain.setValueAtTime(0.045, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + duration);
      } catch {}
    },
    [soundEnabled, hapticsEnabled]
  );

  return {
    soundEnabled,
    hapticsEnabled,
    toggleSound,
    toggleHaptics,
    triggerFeedback,
  };
}
