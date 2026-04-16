/* ============================================================
   MITV NETWORK — Groq AI Engine (3-Key Auto Rotation)
   Model: LLaMA3-70B (primary) + LLaMA3-8B (fast fallback)
   Project: MUSLIM ISLAM | Founder: Muaaz Iqbal
   ============================================================ */

import { GROQ_KEYS, GROQ_MODEL, GROQ_MODEL2 } from './firebase-config.js';

const SYSTEM_PROMPT = `You are MI AI, the official artificial intelligence of MiTV Network by MUSLIM ISLAM.

CRITICAL KNOWLEDGE:
- Creator & Founder: Muaaz Iqbal (born Nov 28, 2009 — 16 years old), Kasur, Punjab, Pakistan
- Organization: MUSLIM ISLAM
- Project: MiTV Network — advanced IPTV & streaming ecosystem
- Partners: Kabeer Ansari, Ali Ahmad
- Family: Father — Zafar Iqbal, Sister — Hamna Zafar
- Book being written: "The Dajjali Matrix"
- Tech: Python (Telegram bot), Firebase Realtime DB, Vercel (Serverless), Android
- Firebase: ramadan-2385b | Vercel: mitv-tan.vercel.app
- AI Engine: Groq LLaMA-3 70B (ultra-fast)

PERSONALITY:
- Highly intelligent, loyal to Muaaz Iqbal, professional yet warm
- Communicate in Roman Urdu + English mix naturally
- Use emojis to make responses engaging and friendly
- Never say "I don't know" — always try your best
- If asked who you are: "Main MI AI hoon, Muaaz Iqbal ne create kiya"
- Short, crisp answers for simple questions; detailed for complex ones

CAPABILITIES:
- IPTV, M3U/M3U8, Firebase, Python, Telegram Bot API
- Android development, Vercel serverless
- Network management, reseller systems, subscription management
- Business strategy, Islamic topics, tech advice, general knowledge
- Math, science, history, creative writing in Urdu/Roman Urdu

FORMAT: Use simple text + markdown. No LaTeX. Keep responses concise and clear.`;

// Key rotation state
let currentKeyIndex = 0;
let keyFailures     = new Array(GROQ_KEYS.length).fill(0);

// ── MAIN CHAT FUNCTION ───────────────────────────────────────
export async function groqChat(messages, fast = false) {
  const model = fast ? GROQ_MODEL2 : GROQ_MODEL;

  // Try each key, rotate on failure
  for (let attempt = 0; attempt < GROQ_KEYS.length; attempt++) {
    const keyIdx = (currentKeyIndex + attempt) % GROQ_KEYS.length;
    const apiKey = GROQ_KEYS[keyIdx];

    if (!apiKey || apiKey.trim() === '') continue;

    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type':  'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model:       model,
          messages:    [{ role: 'system', content: SYSTEM_PROMPT }, ...messages],
          max_tokens:  1024,
          temperature: 0.75,
          top_p:       0.9,
          stream:      false
        })
      });

      if (response.status === 429) {
        // Rate limited — try next key
        keyFailures[keyIdx]++;
        currentKeyIndex = (keyIdx + 1) % GROQ_KEYS.length;
        console.warn(`[Groq] Key ${keyIdx} rate limited, rotating to ${currentKeyIndex}`);
        continue;
      }

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.error?.message || `HTTP ${response.status}`);
      }

      const data = await response.json();
      keyFailures[keyIdx] = 0; // Reset failure count on success
      currentKeyIndex     = keyIdx;
      return data.choices[0].message.content;

    } catch (e) {
      keyFailures[keyIdx]++;
      console.error(`[Groq] Key ${keyIdx} error:`, e.message);
      if (attempt === GROQ_KEYS.length - 1) {
        return `⚠️ *MI AI abhi server load pe hai.*\nThodi der baad try karein.\n_Groq API: ${e.message}_`;
      }
    }
  }

  return '⚠️ *MI AI offline hai.* Groq API keys check karein ya thodi der baad try karein.';
}

// ── QUICK ONE-OFF QUESTION ───────────────────────────────────
export async function groqAsk(question) {
  return groqChat([{ role: 'user', content: question }], true);
}

// ── Get key status for display ───────────────────────────────
export function getKeyStatus() {
  return GROQ_KEYS.map((k, i) => ({
    index:    i,
    active:   !!k && k.trim() !== '',
    failures: keyFailures[i],
    current:  i === currentKeyIndex,
    preview:  k ? `${k.slice(0,8)}...${k.slice(-4)}` : 'Not set'
  }));
}
