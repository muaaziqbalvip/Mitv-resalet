====================================================================
  MITV NETWORK PORTAL v6.0 — ULTRA SMOOTH PWA
  Project: MUSLIM ISLAM | Muaaz Iqbal (Kasur, Punjab, Pakistan)
====================================================================

FILES:
  index.html      — Login + Register (Google Sign-In support)
  dashboard.html  — Reseller App (6-tab bottom nav)
  admin.html      — Admin Panel (6-tab + Google Login)
  manifest.json   — PWA App Manifest
  sw.js           — Service Worker (Offline)
  robots.txt      — SEO
  README.txt      — Yeh file

====================================================================
SETUP — 2 STEPS
====================================================================

STEP 1: FIREBASE CONFIG
─────────────────────────
Teen files mein "YOUR_FIREBASE_API_KEY" replace karo:
  index.html, dashboard.html, admin.html

  apiKey:            "YOUR_FIREBASE_API_KEY"
  messagingSenderId: "YOUR_SENDER_ID"
  appId:             "YOUR_APP_ID"

Firebase Console: console.firebase.google.com
  → Project: ramadan-2385b
  → Settings → General → Your Apps → Web → Config

FIREBASE AUTH SETUP (Google Login ke liye):
  → Authentication → Sign-in method → Google → Enable
  → Authorized domains mein apna Vercel URL add karo

FIREBASE STORAGE RULES (image/voice upload ke liye):
  rules_version = '2';
  service firebase.storage {
    match /b/{bucket}/o {
      match /{allPaths=**} {
        allow read, write: if true;
      }
    }
  }

STEP 2: VERCEL DEPLOY
──────────────────────
  1. vercel.com par account banao
  2. New Project → Upload karo sara folder
  3. Live URL milega instantly
  4. Done! 🎉

====================================================================
NEW FEATURES v6.0
====================================================================

✅ 5 BEAUTIFUL THEMES:
   • Dark Gold (default)   — Classic MITV look
   • Royal Purple          — Premium vibes
   • Deep Ocean            — Cool blue
   • Rose Fire             — Hot red/orange
   • Forest Green          — Fresh green
   Theme login se hi remember hoti hai localStorage se

✅ GOOGLE LOGIN (Admin):
   • muaaziqbal@gmail.com se direct Google login
   • PIN bhi kaam karta hai as backup
   • Firebase Auth integration

✅ ADMIN PANEL UPGRADES:
   • Full reseller detail: Name, Phone, Password, Email, City, Credits
   • Reseller editing (naam, phone, email, city, password, credits)
   • M3U link per reseller detail mein
   • Client list per reseller detail mein
   • Top Resellers monitoring page
   • Live stats with progress bars
   • Image send in chat (Firebase Storage)
   • Voice messages in chat (MediaRecorder API)
   • Reseller search filter
   • Settings: PIN change + Theme

✅ RESELLER DASHBOARD UPGRADES:
   • Email add karna profile se
   • Profile edit (email + password)
   • Client filter tabs: All / Paid / Block
   • Notes field per client
   • Credits display
   • Image send in chat
   • Theme switcher in profile tab
   • Better M3U copy buttons

✅ AI IMPROVEMENTS:
   • Groq llama-3.3-70b-versatile (latest)
   • Streaming with animated cursor
   • 14-message conversation history
   • Admin-aware system prompt

✅ PERFORMANCE:
   • GPU-only animations (transform, opacity)
   • Firebase ES modules (no conflicts)
   • Lazy imports
   • PWA offline support

====================================================================
ADMIN LOGIN OPTIONS:
  1. PIN: 1234 (changeable in Settings ⚙️)
  2. Google: muaaziqbal@gmail.com

FIREBASE NODES:
  /resellers/{RES-ID}         — Reseller accounts
  /reseller_requests/{id}     — Join requests
  /clients/{RES-ID}/{UID}     — Client data
  /master_users/{UID}         — Master user list
  /active_playlists/{UID}     — M3U engine
  /playlist_library/{id}      — Global M3U sources
  /chats/{RES-ID}/{msg-id}    — Chat messages

====================================================================
MUAAZ IQBAL — KASUR, PUNJAB, PAKISTAN
MUSLIM ISLAM — MiTV Network v6.0
====================================================================
