const fs = require('fs');
const path = require('path');

const LOCALES = ['fr','en','de','es','it','pt'];
const BASE_FILE = 'index.html';
const I18N_FILE = 'bcl-i18n-v115-master.js';

function loadMaps() {
  const js = fs.readFileSync(I18N_FILE, 'utf8');
  const marker = 'const maps=';
  const start = js.indexOf(marker);
  if (start < 0) throw new Error('Unable to find locale maps in ' + I18N_FILE);
  const objectStart = js.indexOf('{', start + marker.length);
  if (objectStart < 0) throw new Error('Unable to find locale map object start');
  let depth = 0, quote = null, escaped = false, objectEnd = -1;
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
      if (depth === 0) { objectEnd = i + 1; break; }
    }
  }
  if (objectEnd < 0) throw new Error('Unable to find locale map object end');
  return Function('"use strict"; return (' + js.slice(objectStart, objectEnd) + ');')();
}

function removeDynamicI18n(html) {
  return html
    .replace(/<script[^>]*src=["'][^"']*bcl-full-ui-i18n-v113\.js[^"']*["'][^>]*><\/script>\s*/gi, '')
    .replace(/<script[^>]*src=["'][^"']*bcl-i18n-v114\.js[^"']*["'][^>]*><\/script>\s*/gi, '')
    .replace(/<script[^>]*src=["'][^"']*bcl-i18n-v115-master\.js[^"']*["'][^>]*><\/script>\s*/gi, '');
}

// Preserve CC terminology and multi-character combat input labels only.
// Single letters are deliberately NOT protected because doing so would corrupt normal words.
const PROTECTED = [
  'Down Smash','Air Smash','Super Armor','Forward Guard',
  'Knockdown','Knockback','Stiffness','Invincible','Iframe','Freeze','Stun','Bound','Float','Grab',
  'Shift','Space','LMB','RMB'
];

function protect(text) {
  const values = [];
  let out = text;
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

function translateSource(source, locale, maps) {
  if (locale === 'fr') return source;
  const dict = maps[locale] || maps.en || {};
  const { out: protectedSource, values } = protect(source);
  let out = protectedSource;
  for (const [from, to] of Object.entries(dict).sort((a,b) => b[0].length - a[0].length)) {
    if (!from || from === to || !out.includes(from)) continue;
    out = out.split(from).join(to);
  }
  return restore(out, values);
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
  if (page.includes('__BCL_PROTECTED_') || page.includes('§§BCLKEEP')) throw new Error(locale + ': unrecovered protection token');
  if (/bcl-(?:full-ui-i18n-v113|i18n-v114|i18n-v115-master)\.js/i.test(page)) throw new Error(locale + ': dynamic i18n script still present');
  if (!page.includes('bcl-static-locale-router')) throw new Error(locale + ': static router missing');
  if (!page.includes('BDO Combos Labs')) throw new Error(locale + ': application signature missing');
}

function main() {
  if (!fs.existsSync(BASE_FILE)) throw new Error('Missing ' + BASE_FILE);
  if (!fs.existsSync(I18N_FILE)) throw new Error('Missing ' + I18N_FILE);
  const maps = loadMaps();
  const base = removeDynamicI18n(fs.readFileSync(BASE_FILE, 'utf8'));

  for (const locale of LOCALES) {
    let page = translateSource(base, locale, maps);
    page = setVersionAndLang(page, locale);
    page = addStaticRouter(page, locale);
    validate(page, locale);
    fs.mkdirSync(locale, { recursive: true });
    fs.writeFileSync(path.join(locale, 'index.html'), page, 'utf8');
  }

  const root = `<!doctype html>\n<html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>BDO Combos Labs · V116</title></head><body><script>(function(){var l='fr';try{var s=localStorage.getItem('bcl_language')||localStorage.getItem('bclLanguage');if(/^(fr|en|de|es|it|pt)$/.test(s))l=s;}catch(e){}location.replace('/'+l+'/'+(location.search||'')+(location.hash||''));})();</script><noscript><a href="/fr/">Ouvrir BDO Combos Labs</a></noscript></body></html>\n`;
  fs.writeFileSync(BASE_FILE, root, 'utf8');
  console.log('V116 static locales built and validated:', LOCALES.join(', '));
}

main();
