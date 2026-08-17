const fs = require('fs');
const path = require('path');

const locales = ['en','de','es','it','pt'];
const sourceCache = 'bcl-static-auto-translations-v116.json';
const sharedPatchFiles = [
  path.join('translations','common-v116.json'),
  path.join('translations','common-v116-dynamic.json')
];
const outputCache = 'bcl-static-prepared-translations-v116.json';

function readJson(file, fallback = {}) {
  if (!fs.existsSync(file)) return fallback;
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

const existing = readJson(sourceCache, {});
const sharedPatches = sharedPatchFiles.map(file => readJson(file, {}));
const prepared = {};

for (const locale of locales) {
  prepared[locale] = {};

  // V116 now translates only visible HTML text/attributes. Script/style code is
  // protected by the builder, so the old code-shaped-entry filter is no longer
  // needed for this UI cache and was discarding many valid translations.
  for (const [from, to] of Object.entries(existing[locale] || {})) {
    if (!from || !to) continue;
    prepared[locale][from] = to;
  }

  let sharedCount = 0;
  for (const shared of sharedPatches) {
    for (const [from, translations] of Object.entries(shared)) {
      const to = translations && translations[locale];
      if (!from || !to) continue;
      prepared[locale][from] = to;
      sharedCount++;
    }
  }

  const patchFile = path.join('translations', `${locale}.json`);
  const patch = readJson(patchFile, {});
  for (const [from, to] of Object.entries(patch)) {
    if (from.startsWith('_') || !from || !to) continue;
    prepared[locale][from] = to;
  }

  console.log(`${locale}: ${Object.keys(prepared[locale]).length} prepared visible-UI translations (${sharedCount} shared + ${Object.keys(patch).filter(k=>!k.startsWith('_')).length} locale patch entries)`);
}

fs.writeFileSync(outputCache, JSON.stringify(prepared, null, 2), 'utf8');
console.log('Prepared V116 visible-UI translation cache with full auto cache + shared + locale patches.');
