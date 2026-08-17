const fs = require('fs');
const path = require('path');
const cp = require('child_process');

const LOCALES = ['fr','en','de','es','it','pt'];
const ROOT_FILE = 'index.html';
const CURRENT_I18N_FILE = 'bcl-i18n-v115-master.js';
const AUTO_I18N_FILE = 'bcl-static-prepared-translations-v116.json';
const LEGACY_V113_REF = '03ed2d779fc4a0327e87f88700c0b9e905670983';
const LEGACY_V113_PATH = 'bcl-full-ui-i18n-v113.js';
const BUILD_REASON = 'visible-html-only-safe-build';

function extractObjectLiteral(js, marker, fromIndex = 0) {
  const start = js.indexOf(marker, fromIndex);
  if (start < 0) throw new Error('Unable to find marker: ' + marker);
  const objectStart = js.indexOf('{', start + marker.length);
  if (objectStart < 0) throw new Error('Unable to find object start for ' + marker);
  let depth = 0, quote = null, escaped = false;
  for (let i = objectStart; i < js.length; i++) {
    const ch = js[i];
    if (quote) {
      if (escaped) { escaped = false; continue; }
      if (ch === '\\') { escaped = true; continue; }
      if (ch === quote) quote = null;
      continue;
    }
    if (ch === '"' || ch === "'" || ch === '`') { quote = ch; continue; }
    if (ch === '{') depth++;
    else if (ch === '}') {
      depth--;
      if (depth === 0) return { text: js.slice(objectStart, i + 1), end: i + 1 };
    }
  }
  throw new Error('Unable to find object end for ' + marker);
}

function evalObject(text) {
  return Function('"use strict"; return (' + text + ');')();
}

function loadCurrentMaps() {
  const js = fs.readFileSync(CURRENT_I18N_FILE, 'utf8');
  return evalObject(extractObjectLiteral(js, 'const maps=').text);
}

function loadLegacyV113Exact() {
  const js = cp.execFileSync('git', ['show', `${LEGACY_V113_REF}:${LEGACY_V113_PATH}`], {
    encoding: 'utf8', maxBuffer: 20 * 1024 * 1024
  });
  const exactObj = extractObjectLiteral(js, 'const exact=');
  const exact = evalObject(exactObj.text);

  let pos = exactObj.end;
  const stop = js.indexOf('const fallbackWords=', pos);
  const limit = stop >= 0 ? stop : js.length;
  while (pos < limit) {
    const idx = js.indexOf('Object.assign(exact.', pos);
    if (idx < 0 || idx >= limit) break;
    const localeStart = idx + 'Object.assign(exact.'.length;
    const comma = js.indexOf(',', localeStart);
    if (comma < 0 || comma >= limit) break;
    const locale = js.slice(localeStart, comma).trim();
    if (!LOCALES.includes(locale) || locale === 'fr') { pos = comma + 1; continue; }
    const obj = extractObjectLiteral(js, ',', comma);
    Object.assign(exact[locale] || (exact[locale] = {}), evalObject(obj.text));
    pos = obj.end;
  }
  return exact;
}

function loadAutoMaps() {
  if (!fs.existsSync(AUTO_I18N_FILE)) return {};
  try {
    const parsed = JSON.parse(fs.readFileSync(AUTO_I18N_FILE, 'utf8'));
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch (e) {
    throw new Error('Invalid ' + AUTO_I18N_FILE + ': ' + e.message);
  }
}

function loadMaps() {
  const current = loadCurrentMaps();
  const legacy = loadLegacyV113Exact();
  const auto = loadAutoMaps();
  const merged = {};
  for (const locale of LOCALES) {
    if (locale === 'fr') continue;
    merged[locale] = Object.assign({}, current[locale] || {}, legacy[locale] || {}, auto[locale] || {});
  }
  return merged;
}

function removeDynamicI18n(html) {
  return html
    .replace(/<script[^>]*src=["'][^"']*bcl-full-ui-i18n-v113\.js[^"']*["'][^>]*><\/script>\s*/gi, '')
    .replace(/<script[^>]*src=["'][^"']*bcl-i18n-v114\.js[^"']*["'][^>]*><\/script>\s*/gi, '')
    .replace(/<script[^>]*src=["'][^"']*bcl-i18n-v115-master\.js[^"']*["'][^>]*><\/script>\s*/gi, '');
}

const PROTECTED = [
  'Down Smash','Air Smash','Super Armor','Forward Guard',
  'Knockdown','Knockback','Stiffness','Invincible','Iframe','Freeze','Stun','Bound','Float','Grab',
  'Shift','Space','LMB','RMB'
];

function protect(text) {
  const values = [];
  let out = String(text || '');
  PROTECTED.forEach((value, i) => {
    const token = `§§BCLKEEP${i}§§`;
    if (out.includes(value)) {
      values.push([token, value]);
      out = out.split(value).join(token);
    }
  });
  return { out, values };
}

function restore(text, values) {
  let out = text;
  for (const [token, value] of values) out = out.split(token).join(value);
  return out;
}

function escapeRegex(s) {
  return String(s).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function translateText(text, dict) {
  if (!text || !dict) return text;
  const protectedText = protect(text);
  let out = protectedText.out;

  for (const [fromRaw, toRaw] of Object.entries(dict).sort((a,b) => b[0].length - a[0].length)) {
    if (!fromRaw || fromRaw === toRaw) continue;
    const fromProtected = protect(fromRaw).out;
    const toProtected = protect(toRaw).out;
    if (!out.includes(fromProtected)) continue;

    const singleToken = /^[\p{L}\p{M}'-]+$/u.test(fromRaw);
    if (singleToken) {
      const escaped = escapeRegex(fromProtected);
      const re = new RegExp('(^|[^\\p{L}\\p{M}\\\'-])(' + escaped + ')(?=$|[^\\p{L}\\p{M}\\\'-])', 'gu');
      out = out.replace(re, (match, lead) => lead + toProtected);
    } else {
      out = out.split(fromProtected).join(toProtected);
    }
  }

  return restore(out, protectedText.values);
}

function translateVisibleHtml(source, locale, maps) {
  if (locale === 'fr') return source;
  const dict = maps[locale] || maps.en || {};

  const blocks = [];
  let html = source.replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, block => {
    const token = `§§BCLCODEBLOCK${blocks.length}§§`;
    blocks.push([token, block]);
    return token;
  });

  html = html.replace(/<[^>]+>|[^<]+/g, chunk => {
    if (!chunk) return chunk;
    if (chunk[0] !== '<') return translateText(chunk, dict);

    return chunk.replace(/\b(title|placeholder|aria-label|alt)\s*=\s*(["'])([\s\S]*?)\2/gi,
      (whole, attr, quote, value) => `${attr}=${quote}${translateText(value, dict)}${quote}`);
  });

  for (const [token, block] of blocks) html = html.split(token).join(block);
  return html;
}

function translateSource(source, locale, maps) {
  return translateVisibleHtml(source, locale, maps);
}

function addStaticRouter(html, locale) {
  html = html.replace(/<script id=["']bcl-static-locale-router["'][\s\S]*?<\/script>\s*/gi, '');
  const script = `\n<script id="bcl-static-locale-router">\n(function(){\n  'use strict';\n  var current=${JSON.stringify(locale)};\n  document.documentElement.lang=current;\n  try { localStorage.setItem('bcl_language', current); localStorage.setItem('bclLanguage', current); } catch(e) {}\n  function bind(){\n    var select=document.getElementById('bclLanguageSelect');\n    if(!select) return;\n    select.value=current;\n    select.addEventListener('change',function(ev){\n      var next=ev.target.value;\n      if(!/^(fr|en|de|es|it|pt)$/.test(next) || next===current) return;\n      try { localStorage.setItem('bcl_language', next); localStorage.setItem('bclLanguage', next); } catch(e) {}\n      location.href='/' + next + '/' + (location.search||'') + (location.hash||'');\n    }, true);\n  }\n  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',bind,{once:true}); else bind();\n})();\n</script>\n`;
  return html.replace(/<\/body>/i, script + '</body>');
}

function setVersionAndLang(html, locale) {
  html = html.replace(/<html([^>]*)lang=["'][^"']*["']([^>]*)>/i, `<html$1lang="${locale}"$2>`);
  if (!/<html[^>]*lang=/i.test(html)) html = html.replace(/<html([^>]*)>/i, `<html$1 lang="${locale}">`);
  html = html.replace(/BDO Combos Labs · V\d+/g, 'BDO Combos Labs · V116');
  html = html.replace(/>V\d+</g, '>V116<');
  return html;
}

function validate(page, locale) {
  if (page.includes('__BCL_PROTECTED_') || page.includes('§§BCLKEEP') || page.includes('§§BCLCODEBLOCK')) throw new Error(locale + ': unrecovered protection token');
  if (/bcl-(?:full-ui-i18n-v113|i18n-v114|i18n-v115-master)\.js/i.test(page)) throw new Error(locale + ': dynamic i18n script still present');
  if (!page.includes('bcl-static-locale-router')) throw new Error(locale + ': static router missing');
  if (!/<html[^>]*lang=["'](?:fr|en|de|es|it|pt)["']/i.test(page)) throw new Error(locale + ': html language missing');
  if (page.length < 500000) throw new Error(locale + ': generated application unexpectedly small');
  if (/\b(?:transición|transizione|transição)\s*:/i.test(page)) throw new Error(locale + ': translated CSS/JS transition keyword detected');
  if (/\bfuente\s*:\s*transition/i.test(page)) throw new Error(locale + ': translated JS property detected');
}

function sourceApplication() {
  const candidates = [path.join('fr','index.html'), ROOT_FILE];
  for (const file of candidates) {
    if (!fs.existsSync(file)) continue;
    const html = fs.readFileSync(file, 'utf8');
    if (html.length > 500000) return removeDynamicI18n(html);
  }
  throw new Error('No full application source found (expected fr/index.html or index.html)');
}

function main() {
  if (!fs.existsSync(CURRENT_I18N_FILE)) throw new Error('Missing ' + CURRENT_I18N_FILE);
  const maps = loadMaps();
  const base = sourceApplication();

  for (const locale of LOCALES) {
    let page = translateSource(base, locale, maps);
    page = setVersionAndLang(page, locale);
    page = addStaticRouter(page, locale);
    validate(page, locale);
    fs.mkdirSync(locale, { recursive: true });
    fs.writeFileSync(path.join(locale, 'index.html'), page, 'utf8');
  }

  const root = `<!doctype html>\n<html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>BDO Combos Labs · V116</title></head><body><script>(function(){var l='fr';try{var s=localStorage.getItem('bcl_language')||localStorage.getItem('bclLanguage');if(/^(fr|en|de|es|it|pt)$/.test(s))l=s;}catch(e){}location.replace('/'+l+'/'+(location.search||'')+(location.hash||''));})();</script><noscript><a href="/fr/">Ouvrir BDO Combos Labs</a></noscript></body></html>\n`;
  fs.writeFileSync(ROOT_FILE, root, 'utf8');
  console.log('V116 static locales rebuilt safely:', LOCALES.join(', '), BUILD_REASON);
}

main();
