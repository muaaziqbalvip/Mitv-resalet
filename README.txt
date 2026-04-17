====================================================================
  MITV NETWORK PORTAL v5.0 — ULTRA SMOOTH PWA
  Project: MUSLIM ISLAM | Muaaz Iqbal (Kasur, Punjab, Pakistan)
====================================================================

FILES (FLAT — NO SUBFOLDERS):
  index.html      — Login + Reseller Register
  dashboard.html  — Reseller App (Bottom Nav)
  admin.html      — Admin Panel (Bottom Nav)
  manifest.json   — PWA App Manifest
  sw.js           — Service Worker (Offline)
  robots.txt      — Google Search Console
  sitemap.xml     — Google Sitemap
  README.txt      — Yeh file

====================================================================
SETUP — SIRF 2 STEPS
====================================================================

STEP 1: FIREBASE CONFIG
─────────────────────────
Teen files mein yeh replace karo (search: "YOUR_FIREBASE_API_KEY"):
  index.html, dashboard.html, admin.html

  apiKey:            "YOUR_FIREBASE_API_KEY"   ← apna
  messagingSenderId: "YOUR_SENDER_ID"           ← apna
  appId:             "YOUR_APP_ID"              ← apna

Firebase Console: console.firebase.google.com
  → Project: ramadan-2385b
  → Settings → General → Your Apps → Web → Config

STEP 2: VERCEL DEPLOY (FREE)
──────────────────────────────
  1. vercel.com par account banao
  2. New Project → Upload karo yeh sara folder
  3. Live URL milega instantly
  4. Done! 🎉

(Optional) Admin PIN change karo admin.html mein:
  const ADMIN_PIN="1234";  ← is line pe apna PIN set karo

====================================================================
GOOGLE SEARCH CONSOLE SETUP
====================================================================

1. search.google.com/search-console par jao
2. Property add karo (apna Vercel URL)
3. Verify karo (HTML tag method)
4. sitemap.xml submit karo:
   - Go to Sitemaps section
   - Enter: sitemap.xml
   - Click Submit
5. robots.txt check karo:
   - apni-site.vercel.app/robots.txt

   ⚠️ sitemap.xml mein apna actual URL daalo:
   Change "mitvnetwork.vercel.app" → apna actual domain

====================================================================
FEATURES v5.0
====================================================================

PERFORMANCE (No Hang):
  ✅ GPU-only animations (transform, opacity) — no layout thrash
  ✅ will-change: transform on animated elements
  ✅ overscroll-behavior: contain — smooth bounce
  ✅ -webkit-overflow-scrolling: touch — iOS native feel
  ✅ Lazy Firebase import — loads only when needed
  ✅ transform: translateZ(0) — force GPU composite layer
  ✅ No heavy CSS transitions on scroll

AI (Latest & Fastest):
  ✅ Groq Model: llama-3.3-70b-versatile (LATEST 2025)
  ✅ Streaming — words appear instantly as generated
  ✅ 3-color thinking dots (gold, cyan, purple)
  ✅ 3-key auto rotation on rate limit
  ✅ Conversation history (last 14 messages)

DESIGN:
  ✅ Bottom navigation (app style)
  ✅ No sidebar at all — zero clutter
  ✅ Glassmorphism cards (blur + saturation)
  ✅ Colorful gradient orbs background
  ✅ Animated logo (3D float + rotateY)
  ✅ Shimmer text animation
  ✅ Bottom sheet modals (slide up)
  ✅ Inter + Orbitron + Fira Code fonts
  ✅ Click sounds (Web Audio — no files, no lag)

RESELLER DASHBOARD:
  ✅ Home: stats, revenue, recent clients
  ✅ Clients: full list + instant search
  ✅ Add Client: deploy + cost preview + WA post
  ✅ Chat: Realtime Firebase with Admin
  ✅ AI: MI AI streaming chat
  ✅ About: profile, revenue, PWA install, MITV info

ADMIN PANEL:
  ✅ Home: stats, revenue, pending requests
  ✅ Resellers: list, add, block, delete, detail
  ✅ Requests: approve/reject join requests
  ✅ Chat: tap reseller name → chat instantly
  ✅ AI: streaming MI AI

SECURITY:
  ✅ PIN lock (admin: 1234, reseller: custom)
  ✅ Session storage (no re-login on refresh)
  ✅ localStorage session (auto re-login on return)

PWA:
  ✅ Install banner
  ✅ Install button in About page
  ✅ Service Worker (offline)
  ✅ manifest.json

SEO:
  ✅ robots.txt (Google crawlable)
  ✅ sitemap.xml (submit to Search Console)
  ✅ Meta tags (title, description, OG)
  ✅ Canonical URLs

FIREBASE NODES USED:
  /resellers/{RES-ID}        — Reseller accounts
  /reseller_requests/{id}    — Join requests
  /clients/{RES-ID}/{UID}    — Client data
  /master_users/{UID}        — Master user list
  /active_playlists/{UID}    — M3U engine
  /playlist_library/{id}     — Global M3U sources
  /chats/{RES-ID}/{msg-id}   — Chat messages

====================================================================
MUAAZ IQBAL — KASUR, PUNJAB, PAKISTAN
MUSLIM ISLAM — MiTV Network
====================================================================
