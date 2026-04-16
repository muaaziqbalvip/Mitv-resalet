/* ============================================================
   MITV NETWORK — Sound Effects (Web Audio API)
   Beautiful click sounds, notifications, success/error tones
   ============================================================ */

let audioCtx = null;
let soundEnabled = true;

// Lazy init AudioContext on first user interaction
function getCtx() {
  if (!audioCtx) {
    try {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) {
      return null;
    }
  }
  if (audioCtx.state === 'suspended') audioCtx.resume();
  return audioCtx;
}

// ── Core tone generator ──────────────────────────────────────
function playTone(freq, type = 'sine', duration = 0.1, gain = 0.3, delay = 0) {
  if (!soundEnabled) return;
  const ctx = getCtx();
  if (!ctx) return;

  const osc  = ctx.createOscillator();
  const gainN = ctx.createGain();

  osc.connect(gainN);
  gainN.connect(ctx.destination);

  osc.type      = type;
  osc.frequency.setValueAtTime(freq, ctx.currentTime + delay);

  gainN.gain.setValueAtTime(0, ctx.currentTime + delay);
  gainN.gain.linearRampToValueAtTime(gain, ctx.currentTime + delay + 0.01);
  gainN.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + duration);

  osc.start(ctx.currentTime + delay);
  osc.stop(ctx.currentTime + delay + duration + 0.05);
}

// ── Sound definitions ────────────────────────────────────────
const SOUNDS = {

  // Crisp button click
  click: () => {
    playTone(800, 'sine',     0.05, 0.2);
    playTone(600, 'sine',     0.05, 0.12, 0.03);
  },

  // Softer nav/menu click
  nav: () => {
    playTone(500, 'sine',     0.08, 0.15);
    playTone(700, 'triangle', 0.06, 0.08, 0.04);
  },

  // Success — ascending chime
  success: () => {
    playTone(523, 'sine',  0.12, 0.25);
    playTone(659, 'sine',  0.12, 0.25, 0.1);
    playTone(784, 'sine',  0.15, 0.3,  0.2);
    playTone(1047,'sine',  0.12, 0.2,  0.33);
  },

  // Error — descending low tone
  error: () => {
    playTone(300, 'sawtooth', 0.12, 0.2);
    playTone(220, 'sawtooth', 0.15, 0.25, 0.1);
  },

  // Notification ping
  notify: () => {
    playTone(880, 'sine',     0.08, 0.2);
    playTone(1100,'sine',     0.1,  0.18, 0.06);
  },

  // PIN key press
  pin: () => {
    playTone(700 + Math.random()*200, 'triangle', 0.06, 0.18);
  },

  // PIN confirmed
  pinOk: () => {
    playTone(784, 'sine', 0.1, 0.25);
    playTone(988, 'sine', 0.1, 0.25, 0.1);
  },

  // PIN wrong
  pinWrong: () => {
    playTone(200, 'sawtooth', 0.15, 0.3);
    playTone(150, 'sawtooth', 0.12, 0.25, 0.12);
  },

  // Message sent
  send: () => {
    playTone(600, 'sine', 0.08, 0.18);
    playTone(900, 'sine', 0.06, 0.15, 0.07);
  },

  // Logout / close
  logout: () => {
    playTone(400, 'triangle', 0.15, 0.2);
    playTone(300, 'triangle', 0.12, 0.15, 0.1);
  },

  // Deploy / create
  deploy: () => {
    [0, 0.08, 0.16, 0.26].forEach((d, i) => {
      playTone([440, 550, 660, 880][i], 'sine', 0.1, 0.2, d);
    });
  },

  // Hover subtle
  hover: () => {
    playTone(1000, 'sine', 0.03, 0.08);
  },

  // Message received
  receive: () => {
    playTone(880, 'sine',  0.07, 0.15);
    playTone(1100,'sine',  0.05, 0.12, 0.08);
  }
};

// ── Public play function ─────────────────────────────────────
window.playSound = function(name) {
  if (SOUNDS[name]) {
    try { SOUNDS[name](); } catch(e) {}
  }
};

// ── Toggle sound ─────────────────────────────────────────────
window.toggleSound = function() {
  soundEnabled = !soundEnabled;
  const btn = document.getElementById('soundToggle');
  if (btn) btn.textContent = soundEnabled ? '🔊' : '🔇';
  showToast(soundEnabled ? '🔊 Sound on' : '🔇 Sound off', 'info', 1500);
  return soundEnabled;
};

// ── Auto-attach to all buttons ───────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Initialize on first touch/click
  const initAudio = () => {
    getCtx();
    document.removeEventListener('click', initAudio);
    document.removeEventListener('touchstart', initAudio);
  };
  document.addEventListener('click', initAudio);
  document.addEventListener('touchstart', initAudio);

  // Attach click sounds
  document.addEventListener('click', e => {
    const btn = e.target.closest('.btn, button, .nav-item, .pin-key');
    if (!btn) return;
    if (btn.classList.contains('pin-key')) return; // handled separately
    if (btn.classList.contains('btn-gold'))    playSound('click');
    else if (btn.classList.contains('nav-item')) playSound('nav');
    else                                         playSound('click');
  });
});
