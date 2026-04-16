/* ============================================================
   MITV NETWORK — Firebase Config + Core Utilities
   Project: MUSLIM ISLAM | Founder: Muaaz Iqbal (Kasur)
   ============================================================

   SETUP: Firebase config apni project ki values se replace karo
   Firebase Console → Project Settings → Web App → Config
   ============================================================ */

// ── FIREBASE CONFIG ─────────────────────────────────────────
// ⚠️ APNI CONFIG YAHAN DAALO — console.firebase.google.com
export const firebaseConfig = {
  apiKey:            "YOUR_FIREBASE_API_KEY",
  authDomain:        "ramadan-2385b.firebaseapp.com",
  databaseURL:       "https://ramadan-2385b-default-rtdb.firebaseio.com",
  projectId:         "ramadan-2385b",
  storageBucket:     "ramadan-2385b.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId:             "YOUR_APP_ID"
};

// ── GROQ API KEYS (3 keys — auto rotation) ─────────────────
// Keys rotate automatically if one hits rate limit
export const GROQ_KEYS = [
  "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",
  // Add 2nd key here:  "gsk_...",
  // Add 3rd key here:  "gsk_...",
];
export const GROQ_MODEL  = "llama3-70b-8192";
export const GROQ_MODEL2 = "llama3-8b-8192"; // ultra-fast fallback

// ── APP CONSTANTS ───────────────────────────────────────────
export const VERCEL_BASE    = "https://mitv-tan.vercel.app/api/m3u?user=";
export const APP_LINK       = "https://mitvnet.vercel.app/mitvnet.apk";
export const LOGO_URL       = "https://i.ibb.co/Xxpt0B54/IMG-20260415-223746-removebg-preview.png";
export const ADMIN_PIN      = "1234"; // Change this! Admin PIN lock
export const RESELLER_PIN   = "0000"; // Default reseller PIN (each reseller sets own)

// ── PRICING CONFIG ──────────────────────────────────────────
export const PRICING = {
  monthly_rs: 300,   // Rs per client per month
  setup_rs:   100,   // One-time setup per client
};

// ── Toast Utility ───────────────────────────────────────────
export function showToast(msg, type = 'info', duration = 3500) {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    document.body.appendChild(container);
  }
  const t = document.createElement('div');
  t.className = `toast ${type}`;
  const icons = { success:'✅', error:'❌', info:'ℹ️', warn:'⚠️' };
  t.innerHTML = `<span>${icons[type]||'•'}</span> <span>${msg}</span>`;
  container.appendChild(t);
  playSound('notify');
  setTimeout(() => { t.classList.add('removing'); setTimeout(() => t.remove(), 350); }, duration);
}

// ── Escape HTML ─────────────────────────────────────────────
export function esc(str) {
  const d = document.createElement('div');
  d.appendChild(document.createTextNode(String(str || '')));
  return d.innerHTML;
}

// ── Format timestamp ─────────────────────────────────────────
export function formatTs(ms) {
  if (!ms) return '—';
  try {
    return new Date(ms).toLocaleString('en-PK', {
      day:'2-digit', month:'short', year:'numeric',
      hour:'2-digit', minute:'2-digit', hour12:true
    });
  } catch { return '—'; }
}

// ── Short time ago ──────────────────────────────────────────
export function timeAgo(ms) {
  if (!ms) return '—';
  const diff = Date.now() - ms;
  const m = Math.floor(diff / 60000);
  const h = Math.floor(diff / 3600000);
  const d = Math.floor(diff / 86400000);
  if (m < 1)  return 'Abhi abhi';
  if (m < 60) return `${m} min pehle`;
  if (h < 24) return `${h} ghante pehle`;
  return `${d} din pehle`;
}

// ── Generate UID ─────────────────────────────────────────────
export function genUID(prefix = 'MITV') {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 5; i++) result += chars[Math.floor(Math.random() * chars.length)];
  return `${prefix}-${result}`;
}

// ── Copy to clipboard ────────────────────────────────────────
export function copyText(text, btnEl = null) {
  navigator.clipboard.writeText(text).then(() => {
    showToast('Clipboard mein copy ho gaya! 📋', 'success', 2000);
    if (btnEl) {
      const orig = btnEl.innerHTML;
      btnEl.innerHTML = '✅ Copied!';
      btnEl.classList.add('copied');
      setTimeout(() => { btnEl.innerHTML = orig; btnEl.classList.remove('copied'); }, 2000);
    }
  }).catch(() => {
    // Fallback
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.focus(); ta.select();
    document.execCommand('copy');
    ta.remove();
    showToast('Copied! 📋', 'success', 2000);
  });
}

// ── Modal Controls ───────────────────────────────────────────
export function openModal(id)  { document.getElementById(id)?.classList.add('show'); }
export function closeModal(id) { document.getElementById(id)?.classList.remove('show'); }

// ── Show / Hide Page ─────────────────────────────────────────
export function showPage(name, titles = {}) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  const page = document.getElementById(`page-${name}`);
  if (page) { page.classList.add('active'); page.style.animation = 'none'; page.offsetHeight; page.style.animation = ''; }
  document.querySelectorAll('.nav-item').forEach(n => {
    if (n.dataset.page === name) n.classList.add('active');
  });
  const t = document.getElementById('pageTitle');
  if (t) t.textContent = (titles[name] || name).toUpperCase();
}

// ── Live Clock ───────────────────────────────────────────────
export function startClock(elId = 'clockBadge') {
  const el = document.getElementById(elId);
  if (!el) return;
  const tick = () => {
    const now = new Date();
    el.textContent = now.toLocaleTimeString('en-US', { hour:'2-digit', minute:'2-digit', second:'2-digit', hour12:true });
  };
  tick(); return setInterval(tick, 1000);
}

// ── WhatsApp activation post generator ──────────────────────
export function generateActivationPost(name, phone, m3u, uid) {
  return `🌟 MITV NETWORK 🌟
🚀 Account Activation Successful! 🚀

Assalam o Alaikum! ✨
*${name}*, aapka MITV account active ho gaya! 🎉

📝 Account Details:
👤 Name   : ${name}
📞 Number : ${phone}
🆔 UID    : ${uid}
🔗 M3U Link:
${m3u}

📲 App Download:
${APP_LINK}

🏢 Project Of: MUSLIM ISLAM
👑 Founder: Muaaz Iqbal (Kasur, Punjab, Pakistan)

Humse judne ka shukriya! ❤️
Koi masla ho to rabta karein.`;
}

// ── Cost Calculator ─────────────────────────────────────────
export function calcRevenue(clients = {}) {
  const paid    = Object.values(clients).filter(c => c.status === 'Paid').length;
  const blocked = Object.values(clients).filter(c => c.status === 'Blocked').length;
  const total   = Object.keys(clients).length;
  const monthly = paid * PRICING.monthly_rs;
  const setup   = total * PRICING.setup_rs;
  const total_earned = monthly + setup;
  return { paid, blocked, total, monthly, setup, total_earned };
}

// ── PWA: Register Service Worker ────────────────────────────
export function registerSW() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').then(reg => {
      console.log('[PWA] SW registered:', reg.scope);
    }).catch(err => console.warn('[PWA] SW failed:', err));
  }
}

// ── PWA: Install prompt ──────────────────────────────────────
let deferredPrompt = null;
window.addEventListener('beforeinstallprompt', e => {
  e.preventDefault();
  deferredPrompt = e;
  const banner = document.getElementById('pwaBanner');
  if (banner) setTimeout(() => banner.classList.add('show'), 3000);
});

export function installPWA() {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then(result => {
      if (result.outcome === 'accepted') showToast('✅ MITV App install ho gaya!', 'success');
      deferredPrompt = null;
      const banner = document.getElementById('pwaBanner');
      if (banner) banner.classList.remove('show');
    });
  }
}

// ── Expose install to global scope ──────────────────────────
window.installPWA = installPWA;
