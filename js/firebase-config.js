/* ============================================================
   MITV NETWORK v4.0 — Firebase Config + Utilities
   MUSLIM ISLAM | Muaaz Iqbal (Kasur, Punjab)
   ============================================================ */

// ⚠️ Replace with your Firebase Console values
export const firebaseConfig = {
  apiKey:            "YOUR_FIREBASE_API_KEY",
  authDomain:        "ramadan-2385b.firebaseapp.com",
  databaseURL:       "https://ramadan-2385b-default-rtdb.firebaseio.com",
  projectId:         "ramadan-2385b",
  storageBucket:     "ramadan-2385b.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId:             "YOUR_APP_ID"
};

export const GROQ_KEYS  = ["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"];
export const GROQ_MODEL  = "llama3-70b-8192";
export const GROQ_MODEL2 = "llama3-8b-8192";

export const APP_LINK  = "https://mitvnet.vercel.app/mitvnet.apk";
export const LOGO_URL  = "https://i.ibb.co/Xxpt0B54/IMG-20260415-223746-removebg-preview.png";
export const ADMIN_PIN = "1234";

export const PRICING = { monthly: 300, setup: 100 };

/* ── Toast ── */
export function showToast(msg, type='info', ms=3400) {
  let box = document.getElementById('toastBox');
  if (!box) { box=document.createElement('div'); box.id='toastBox'; document.body.appendChild(box); }
  const t = document.createElement('div');
  t.className = `toast ${type}`;
  const ico = {success:'✅',error:'❌',info:'ℹ️',warn:'⚠️'};
  t.innerHTML = `<span>${ico[type]||'•'}</span><span style="flex:1">${msg}</span>`;
  box.appendChild(t);
  if (typeof playSound!=='undefined') try{playSound('notify')}catch(e){}
  const close = () => { t.classList.add('out'); setTimeout(()=>t.remove(),300); };
  const tid = setTimeout(close, ms);
  t.onclick = () => { clearTimeout(tid); close(); };
}

/* ── Escape ── */
export function esc(s) {
  const d=document.createElement('div');
  d.appendChild(document.createTextNode(String(s||'')));
  return d.innerHTML;
}

/* ── Format timestamp ── */
export function formatTs(ms) {
  if (!ms) return '—';
  try { return new Date(ms).toLocaleString('en-PK',{day:'2-digit',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit',hour12:true}); }
  catch { return '—'; }
}

/* ── Time ago ── */
export function timeAgo(ms) {
  if (!ms) return '—';
  const diff=Date.now()-ms, m=Math.floor(diff/60000), h=Math.floor(diff/3600000), d=Math.floor(diff/86400000);
  if (m<1) return 'Abhi abhi';
  if (m<60) return `${m}m pehle`;
  if (h<24) return `${h}h pehle`;
  if (d<30) return `${d}d pehle`;
  return formatTs(ms);
}

/* ── UID generator ── */
export function genUID(pre='MITV') {
  const c='ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  return pre+'-'+Array.from({length:6},()=>c[Math.floor(Math.random()*c.length)]).join('');
}

/* ── Copy text ── */
export function copyText(text, btn=null) {
  const done = () => {
    showToast('Copied! 📋','success',2000);
    if (btn) { const o=btn.innerHTML; btn.innerHTML='✅ Copied!'; btn.classList.add('copied'); setTimeout(()=>{btn.innerHTML=o;btn.classList.remove('copied')},2000); }
  };
  if (navigator.clipboard) navigator.clipboard.writeText(text).then(done).catch(()=>fallback());
  else fallback();
  function fallback(){const t=document.createElement('textarea');t.value=text;t.style='position:fixed;opacity:0';document.body.appendChild(t);t.focus();t.select();document.execCommand('copy');t.remove();done();}
}

/* ── Modal ── */
export function openModal(id)  { document.getElementById(id)?.classList.add('show'); try{playSound('click')}catch(e){} }
export function closeModal(id) { document.getElementById(id)?.classList.remove('show'); }

/* ── Clock ── */
export function startClock(id='clock') {
  const el=document.getElementById(id); if(!el) return;
  const t=()=>{ el.textContent=new Date().toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:true}); };
  t(); return setInterval(t,1000);
}

/* ── WA activation post ── */
export function waPost(name,phone,m3u,uid) {
  return `🌟 *MITV NETWORK* 🌟\n🚀 *Account Activation!* 🚀\n\nAssalam o Alaikum! ✨\n*${name}*, aapka MITV account active ho gaya! 🎉\n\n📝 *Details:*\n👤 Name   : ${name}\n📞 Number : ${phone}\n🆔 UID    : ${uid}\n🔗 M3U:\n${m3u}\n\n📲 App: ${APP_LINK}\n\n🏢 MUSLIM ISLAM\n👑 Muaaz Iqbal (Kasur, Punjab)\n\nShukriya! ❤️`;
}

/* ── Revenue ── */
export function revenue(clients={}) {
  const v=Object.values(clients);
  const paid=v.filter(c=>c.status==='Paid').length;
  const total=Object.keys(clients).length;
  return { paid, blocked:total-paid, total, monthly:paid*PRICING.monthly, setup:total*PRICING.setup, earned:(paid*PRICING.monthly)+(total*PRICING.setup) };
}

/* ── SW Register ── */
export function regSW() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load',()=>{
      navigator.serviceWorker.register('/sw.js')
        .then(r=>console.log('[SW]',r.scope))
        .catch(e=>console.warn('[SW]',e));
    });
  }
}

/* ── PWA Install ── */
let _prompt=null;
window.addEventListener('beforeinstallprompt', e => {
  e.preventDefault(); _prompt=e;
  setTimeout(()=>document.getElementById('pwaBanner')?.classList.add('show'), 4000);
});
window.addEventListener('appinstalled',()=>showToast('✅ MITV App installed!','success',4000));

export function installPWA() {
  if (_prompt) { _prompt.prompt(); _prompt.userChoice.then(r=>{ if(r.outcome==='accepted') showToast('✅ Installing...','success'); _prompt=null; document.getElementById('pwaBanner')?.classList.remove('show'); }); }
  else showToast('ℹ️ Already installed or not supported','info');
}
window.installPWA=installPWA;
