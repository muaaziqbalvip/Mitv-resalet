====================================================================
   MITV NETWORK — WEB PORTAL v3.0 (PWA)
   Project: MUSLIM ISLAM | Founder: Muaaz Iqbal (Kasur, Punjab)
====================================================================

FILES:
  index.html           — Login + Reseller Registration
  dashboard.html       — Reseller Full Dashboard
  admin.html           — Admin Panel (Muaaz Only)
  manifest.json        — PWA Manifest
  sw.js                — Service Worker (Offline Support)
  css/shared.css       — Design System (3D Glassmorphism)
  js/firebase-config.js — Firebase + Core Utilities
  js/groq-ai.js        — Groq AI (3-Key Auto Rotation)
  js/sounds.js         — Click Sounds (Web Audio API)

====================================================================
SETUP — STEP BY STEP
====================================================================

STEP 1: FIREBASE CONFIG
────────────────────────
js/firebase-config.js mein yeh block update karo:

  export const firebaseConfig = {
    apiKey:            "YOUR_FIREBASE_API_KEY",   ← apna key
    authDomain:        "ramadan-2385b.firebaseapp.com",
    databaseURL:       "https://ramadan-2385b-default-rtdb.firebaseio.com",
    projectId:         "ramadan-2385b",
    storageBucket:     "ramadan-2385b.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",          ← apna
    appId:             "YOUR_APP_ID"              ← apna
  };

Firebase Console → console.firebase.google.com
  → ramadan-2385b project
  → Project Settings → General → Your Apps
  → Web App config copy karo

STEP 2: GROQ API KEY (ALREADY SET)
────────────────────────────────────
js/groq-ai.js mein pehle se 1 key hai:
  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

2 aur keys add karne ke liye:
  export const GROQ_KEYS = [
    "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",
    "gsk_...",   ← 2nd key
    "gsk_...",   ← 3rd key
  ];

Groq keys: console.groq.com → API Keys

STEP 3: ADMIN PIN
──────────────────
js/firebase-config.js mein:
  export const ADMIN_PIN = "1234";   ← Admin ke liye change karo

STEP 4: PRICING (OPTIONAL)
────────────────────────────
js/firebase-config.js mein:
  export const PRICING = {
    monthly_rs: 300,   ← Rs per client per month
    setup_rs:   100,   ← One-time setup per client
  };

STEP 5: DEPLOY
──────────────
Option A — Vercel (BEST FREE):
  1. vercel.com account banao
  2. New Project → Upload Folder
  3. Saari files upload karo
  4. Live URL milega (e.g. mitv-portal.vercel.app)

Option B — Netlify:
  1. netlify.com → Sites → Deploy manually
  2. Folder drag & drop
  3. Free live URL milega

Option C — Local Testing:
  VS Code ka "Live Server" extension use karo
  Ya: python -m http.server 8080

====================================================================
FEATURES — COMPLETE LIST
====================================================================

LOGIN PAGE (index.html):
  ✅ Reseller login (Firebase verify)
  ✅ Reseller registration form (admin approval required)
  ✅ Session memory — bar bar login nahi
  ✅ 3D logo animation + gold shimmer
  ✅ Animated background grid + floating orbs
  ✅ PWA install prompt
  ✅ Click sounds

RESELLER DASHBOARD (dashboard.html):
  ✅ Stats: Total, Paid, Blocked, Monthly Revenue
  ✅ Revenue calculator (Rs 300/month × clients)
  ✅ Real-time client list (Firebase onValue)
  ✅ Add client — auto UID, Firebase deploy, M3U inject
  ✅ Client detail modal
  ✅ Block/Unblock client
  ✅ Delete client
  ✅ Copy M3U link
  ✅ WhatsApp activation message auto-generate
  ✅ Search clients (naam/phone/uid)
  ✅ Chat with Admin (Muaaz) — realtime Firebase
  ✅ MI AI chat (Groq 3-key rotation)
  ✅ PIN lock security
  ✅ Session save — no re-login
  ✅ Mobile responsive + sidebar
  ✅ Click sounds everywhere

ADMIN PANEL (admin.html):
  ✅ PIN lock (4-digit)
  ✅ Dashboard stats — all resellers, clients, revenue
  ✅ Revenue estimates
  ✅ All resellers list
  ✅ Add reseller manually
  ✅ Approve/Reject join requests (from index.html register)
  ✅ Toggle reseller (enable/disable)
  ✅ Delete reseller
  ✅ All clients list + search + block/unblock
  ✅ Real-time chat with each reseller
  ✅ Playlist library (add/delete M3U sources)
  ✅ MI AI (admin mode)
  ✅ Realtime updates (Firebase onValue)
  ✅ Mobile responsive

PWA:
  ✅ manifest.json
  ✅ Service Worker (offline support)
  ✅ Install prompt banner
  ✅ App icon (MITV logo)
  ✅ Standalone app mode

DESIGN:
  ✅ 3D Glassmorphism
  ✅ Gold + Dark futuristic theme
  ✅ Orbitron + Exo 2 + Fira Code fonts
  ✅ Animated background grid + orbs + particles
  ✅ 3D card hover effects
  ✅ Smooth page transitions
  ✅ Staggered list animations
  ✅ Custom cursor
  ✅ Click sound feedback (Web Audio API)
  ✅ Loading ring animation
  ✅ PIN keypad with sounds

AI:
  ✅ Groq LLaMA-3 70B (primary)
  ✅ Groq LLaMA-3 8B (fast fallback)
  ✅ 3-key auto rotation (rate limit se bachao)
  ✅ Thinking animation (dots)
  ✅ Conversation history (last 12 messages)
  ✅ Custom system prompt (MITV/Muaaz context)

====================================================================
FIREBASE DATABASE NODES USED
====================================================================

/resellers/{RES-ID}
  name, number, city, password, active, created_at

/reseller_requests/{push-id}
  name, phone, city, password, reference, status, requested_at

/clients/{RES-ID}/{MITV-ID}
  uid, name, phone, m3u, status, time

/master_users/{MITV-ID}
  name, phone, status, reseller_id, created_at, updated_at

/active_playlists/{MITV-ID}
  sources[], warningVideo, assigned_by, lastUpdate

/playlist_library/{push-id}
  name, url, added

/chats/{RES-ID}/{push-id}
  text, from, ts

====================================================================
SUPPORT — MUAAZ IQBAL (KASUR, PUNJAB, PAKISTAN)
Project: MUSLIM ISLAM — MiTV Network
====================================================================
