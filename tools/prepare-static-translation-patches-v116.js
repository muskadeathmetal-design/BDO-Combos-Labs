const fs = require('fs');
const path = require('path');

const locales = ['en','de','es','it','pt'];
const sourceCache = 'bcl-static-auto-translations-v116.json';
const autoCompleteFile = path.join('translations','auto-complete-visible-v116.json');
const curatedPatchFiles = [
  path.join('translations','common-v116.json'),
  path.join('translations','common-v116-dynamic.json')
];
const outputCache = 'bcl-static-prepared-translations-v116.json';

function readJson(file, fallback = {}) {
  if (!fs.existsSync(file)) return fallback;
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

const existing = readJson(sourceCache, {});
const autoComplete = readJson(autoCompleteFile, {});
const curatedPatches = curatedPatchFiles.map(file => readJson(file, {}));
const prepared = {};

for (const locale of locales) {
  prepared[locale] = {};

  // Base cache first.
  for (const [from, to] of Object.entries(existing[locale] || {})) {
    if (!from || !to) continue;
    prepared[locale][from] = to;
  }

  // Generated residual translations fill gaps, but never outrank curated wording.
  for (const [from, translations] of Object.entries(autoComplete)) {
    const to = translations && translations[locale];
    if (!from || !to) continue;
    prepared[locale][from] = to;
  }

  let curatedCount = 0;
  for (const curated of curatedPatches) {
    for (const [from, translations] of Object.entries(curated)) {
      const to = translations && translations[locale];
      if (!from || !to) continue;
      prepared[locale][from] = to;
      curatedCount++;
    }
  }

  // Locale-specific human patch has final priority.
  const patchFile = path.join('translations', `${locale}.json`);
  const patch = readJson(patchFile, {});
  for (const [from, to] of Object.entries(patch)) {
    if (from.startsWith('_') || !from || !to) continue;
    prepared[locale][from] = to;
  }

  console.log(`${locale}: ${Object.keys(prepared[locale]).length} prepared visible-UI translations (${Object.keys(autoComplete).length} auto-complete + ${curatedCount} curated + ${Object.keys(patch).filter(k=>!k.startsWith('_')).length} locale entries)`);
}

fs.writeFileSync(outputCache, JSON.stringify(prepared, null, 2), 'utf8');
console.log('Prepared V116 visible-UI cache: base -> auto-complete -> curated -> locale-specific. Final residual batch included.');
