====================================================================
  MITV NETWORK PORTAL v7.0 — FULL CONTROL
  Project: MUSLIM ISLAM | Muaaz Iqbal (Kasur, Punjab, Pakistan)
====================================================================

FILES:
  index.html      — Login + Register + Google Sign-In
  dashboard.html  — Reseller App (6 tabs)
  admin.html      — Admin Panel (6 tabs) — FULL CONTROL
  manifest.json   — PWA
  sw.js           — Service Worker (Offline)
  robots.txt      — SEO

====================================================================
SETUP — 2 STEPS
====================================================================

STEP 1: Firebase Config (3 jagah replace karein):
  index.html, dashboard.html, admin.html
  Search: "YOUR_FIREBASE_API_KEY"
  Replace with apna actual Firebase config

STEP 2: Vercel Deploy
  vercel.com → New Project → Upload folder → Done!

FIREBASE AUTH (Google Login ke liye):
  Firebase Console → Authentication → Google → Enable
  Authorized domains mein Vercel URL add karein

FIREBASE STORAGE RULES (image upload):
  rules_version = '2';
  service firebase.storage {
    match /b/{bucket}/o {
      match /{allPaths=**} { allow read, write: if true; }
    }
  }

====================================================================
v7.0 NEW FEATURES
====================================================================

✅ CHAT SYSTEM — FULLY REBUILT:
  • Admin → Reseller: Admin ke saath real-time chat
  • Reseller → Reseller (R2R): "Resellers" tab se doosre
    resellers ke saath bhi chat — WhatsApp style
  • IMAGE SEND: 🖼️ button se photo send
  • MESSAGE EDIT: Admin kisi bhi message ko edit kar sakta hai
  • MESSAGE DELETE: Admin koi bhi message delete kar sakta hai
  • EDITED tag message pe show hota hai
  • Chat badge (unread count) bottom nav pe
  • Voice support: Admin panel mein voice messages
  • Smooth animations, no lag, no errors

✅ ADMIN FULL CONTROL:
  • Har reseller ki POORI detail: Name, Phone, PASSWORD,
    Email, City, ID, Credits, Client List, Revenue
  • Reseller editing: Sab kuch edit — naam, phone, email,
    city, password, credits, status (active/block)
  • Client list per reseller ke detail mein (6 dikhte hain)
  • Revenue calculation per reseller
  • Chat mein har message edit/delete karo
  • Google Login: muaaziqbal@gmail.com se direct access
  • PIN change settings mein
  • Theme change settings mein

✅ CLIENT DEEP EDITING (Dashboard):
  • Client ka naam edit
  • Phone number edit
  • Notes edit
  • Status change (Paid/Blocked)
  • Yeh sab clients mein "✏️ Edit" button se

✅ PROFILE EDIT (Dashboard):
  • Email add/update
  • Password change
  • App PIN change
  • Sab ek modal mein

✅ CLIENT TRACKING / ACTIVITY LOG:
  • Har add/delete/edit ka record Firebase mein
  • Activity log Home page pe dikhta hai
  • Client add hone pe log: "New client: NAME (UID)"
  • Delete pe: "Client deleted: NAME"
  • Status change pe: "Status: PAID/BLOCKED"

✅ PERFORMANCE SCORE:
  • Paid rate % dikhai deta hai
  • Progress bar with color
  • "Excellent / Acha / Aur clients add karo!" labels

✅ 5 THEMES:
  Dark Gold | Royal Purple | Deep Ocean | Rose Fire | Forest

====================================================================
FIREBASE NODES:
  /resellers/{RES-ID}       — Reseller accounts (full data)
  /reseller_requests/{id}   — Join requests
  /clients/{RES-ID}/{UID}   — Client data
  /master_users/{UID}       — Master client list
  /active_playlists/{UID}   — M3U sources
  /chats/{RES-ID}/{msg-id}  — Admin-Reseller chat
  /r2r_chats/{ID1_ID2}/{}   — Reseller-to-Reseller chat
  /activity/{RES-ID}/{}     — Activity tracking log

====================================================================
MUAAZ IQBAL — KASUR, PUNJAB, PAKISTAN
MUSLIM ISLAM — MiTV Network v7.0
====================================================================
