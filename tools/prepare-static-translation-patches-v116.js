const fs = require('fs');
const path = require('path');

const locales = ['en','de','es','it','pt'];
const sourceCache = 'bcl-static-auto-translations-v116.json';
const outputCache = 'bcl-static-prepared-translations-v116.json';

function readJson(file, fallback = {}) {
  if (!fs.existsSync(file)) return fallback;
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function looksLikeCode(text) {
  const s = String(text || '');
  return /(?:\bfunction\b|\bconst\b|\blet\b|\bvar\b|\breturn\b|document\.|window\.|localStorage|querySelector|innerHTML|textContent|addEventListener|Math\.|JSON\.|Object\.|Array\.|\.map\(|\.filter\(|\.forEach\(|=>|\?\.|sourceTag|timingSeconds|cancelAt|className|<\/?(?:div|span|script|style|table|tr|td|th)\b|class=|style=)/i.test(s);
}

function unsafePair(from, to) {
  if (!from || !to) return true;
  if (looksLikeCode(from) || looksLikeCode(to)) return true;
  if ((from.match(/[{}]/g) || []).length > 8) return true;
  if ((to.match(/[{}]/g) || []).length > 8) return true;
  return false;
}

const existing = readJson(sourceCache, {});
const safe = {};
for (const locale of locales) {
  safe[locale] = {};
  for (const [from, to] of Object.entries(existing[locale] || {})) {
    if (!unsafePair(from, to)) safe[locale][from] = to;
  }

  const patchFile = path.join('translations', `${locale}.json`);
  const patch = readJson(patchFile, {});
  for (const [from, to] of Object.entries(patch)) {
    if (from.startsWith('_')) continue;
    if (!from || !to) continue;
    safe[locale][from] = to;
  }

  console.log(`${locale}: ${Object.keys(safe[locale]).length} safe translations (${Object.keys(patch).filter(k=>!k.startsWith('_')).length} explicit patch entries)`);
}

fs.writeFileSync(outputCache, JSON.stringify(safe, null, 2), 'utf8');
console.log('Prepared temporary V116 translation cache with explicit patches applied last.');
