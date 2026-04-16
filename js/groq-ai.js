/* MITV v4.0 — Groq AI (LLaMA-3 70B) with auto key rotation */
import { GROQ_KEYS, GROQ_MODEL, GROQ_MODEL2 } from './firebase-config.js';

let ki=0, slow=false;
const SYS=`You are MI AI — official assistant of MITV Network by Muaaz Iqbal (MUSLIM ISLAM, Kasur, Punjab, Pakistan).

Help resellers with: IPTV/M3U issues, client management, billing, Firebase, app setup, general tech.
Be concise, friendly, professional. Mix of Urdu/Roman Urdu + English is fine.
If asked about MITV: it's an IPTV reseller platform for Pakistan, managed via web portal.
MITV Network founder: Muaaz Iqbal, Kasur, Punjab. Organization: MUSLIM ISLAM.`;

export async function groqChat(history, opts={}) {
  const model=slow?GROQ_MODEL2:(opts.model||GROQ_MODEL);
  const maxTry=Math.max(GROQ_KEYS.length*2,4);
  for(let i=0;i<maxTry;i++){
    const key=GROQ_KEYS[ki%GROQ_KEYS.length];
    try {
      const r=await fetch('https://api.groq.com/openai/v1/chat/completions',{
        method:'POST',
        headers:{'Content-Type':'application/json','Authorization':'Bearer '+key},
        body:JSON.stringify({
          model, max_tokens:opts.max_tokens||1200, temperature:opts.temperature||0.72,
          messages:[{role:'system',content:SYS},...history]
        })
      });
      if(r.status===429){ki=(ki+1)%GROQ_KEYS.length;slow=i>=GROQ_KEYS.length;await sleep(700);continue}
      if(!r.ok){const e=await r.json().catch(()=>({}));throw new Error(e.error?.message||`HTTP ${r.status}`)}
      const d=await r.json();slow=false;
      return d.choices?.[0]?.message?.content||'⚠️ Empty response.';
    } catch(e) {
      if(e.message?.includes('429')||e.message?.includes('rate')){ki=(ki+1)%GROQ_KEYS.length;await sleep(800);continue}
      if(i>=maxTry-1)return `⚠️ AI unavailable: ${e.message}. Thodi der baad try karein.`;
      ki=(ki+1)%GROQ_KEYS.length;await sleep(400);
    }
  }
  return '⚠️ Sab keys rate limited hain. 1 minute baad try karein.';
}

function sleep(ms){return new Promise(r=>setTimeout(r,ms))}
