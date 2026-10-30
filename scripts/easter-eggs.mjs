// Encrypts the Go to menu's easter eggs. The plain phrases and messages live only in scripts/easter-eggs.local.json
// (git-ignored), shaped [{ "phrases": ["..."], "message": "...", "then": [...same shape] }]. Each phrase is the key to
// its message: the site ships only ciphertext (src/data/easter-eggs.json), and typing the phrase is the only way to
// decrypt it. An egg with `then` asks a question: its answers are keyed by the whole chain of phrases ("ada\nalo"), so
// an answer typed on its own decrypts nothing.
// Run after editing the local file: node scripts/easter-eggs.mjs
import { readFileSync, writeFileSync } from 'node:fs';

const { subtle } = globalThis.crypto;
const ITERATIONS = 600_000; // OWASP's PBKDF2-SHA256 count: each guess costs an attacker this many hashes
const b64 = (bytes) => Buffer.from(bytes).toString('base64');
// keep in sync with Shortcuts.astro: case, accents and extra spaces don't matter
const normalize = (s) => s.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase().trim().replace(/\s+/g, ' ');

const local = JSON.parse(readFileSync(new URL('easter-eggs.local.json', import.meta.url), 'utf8'));
const salt = crypto.getRandomValues(new Uint8Array(16));
const eggs = [];

async function seal(keyText, payload) {
  const base = await subtle.importKey('raw', new TextEncoder().encode(keyText), 'PBKDF2', false, ['deriveKey']);
  const key = await subtle.deriveKey(
    { name: 'PBKDF2', hash: 'SHA-256', salt, iterations: ITERATIONS },
    base,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt'],
  );
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const data = await subtle.encrypt({ name: 'AES-GCM', iv }, key, new TextEncoder().encode(JSON.stringify(payload)));
  return { iv: b64(iv), data: b64(new Uint8Array(data)) };
}

async function encrypt(list, chain) {
  for (const { phrases, message, then } of list) {
    for (const phrase of phrases) {
      const keyText = chain ? `${chain}\n${normalize(phrase)}` : normalize(phrase);
      eggs.push(await seal(keyText, { message, ask: Boolean(then) }));
      if (then) await encrypt(then, keyText);
    }
  }
}

await encrypt(local);
// shuffled, so the order doesn't tell which phrases share a message or which answer follows which question
eggs.sort(() => Math.random() - 0.5);

writeFileSync(
  new URL('../src/data/easter-eggs.json', import.meta.url),
  JSON.stringify({ salt: b64(salt), iterations: ITERATIONS, eggs }) + '\n',
);
console.log(`${eggs.length} phrases encrypted`);
