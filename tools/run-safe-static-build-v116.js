const fs = require('fs');
const cp = require('child_process');

const srcFile = 'tools/build-static-locales-v116.js';
const tmpFile = 'tools/.build-static-locales-v116-safe.tmp.js';
let src = fs.readFileSync(srcFile, 'utf8');

const conditionNeedle = "    if (!from || from === to || !out.includes(from)) continue;";
const replaceNeedle = "    out = out.split(from).join(to);";
if (!src.includes(conditionNeedle) || !src.includes(replaceNeedle)) {
  throw new Error('Expected translation loop lines not found');
}

const protectedCondition = [
  "    const protectKey = function(text){",
  "      let s=String(text||'');",
  "      PROTECTED.forEach(function(value,i){ s=s.split(value).join('§§BCLKEEP'+i+'§§'); });",
  "      return s;",
  "    };",
  "    const fromProtected = protectKey(from);",
  "    const toProtected = protectKey(to);",
  "    if (!fromProtected || fromProtected === toProtected || !out.includes(fromProtected)) continue;"
].join('\n');

const safeReplacement = [
  "    const singleToken = /^[\\p{L}\\p{M}'-]+$/u.test(from);",
  "    if (singleToken) {",
  "      const escaped = fromProtected.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&');",
  "      const re = new RegExp('(^|[^\\\\p{L}\\\\p{M}\\\'-])(' + escaped + ')(?=$|[^\\\\p{L}\\\\p{M}\\\'-])', 'gu');",
  "      out = out.replace(re, function(match, lead){ return lead + toProtected; });",
  "    } else {",
  "      out = out.split(fromProtected).join(toProtected);",
  "    }"
].join('\n');

src = src.replace(conditionNeedle, protectedCondition);
src = src.replace(replaceNeedle, safeReplacement);
fs.writeFileSync(tmpFile, src, 'utf8');

try {
  cp.execFileSync(process.execPath, ['--check', tmpFile], { stdio: 'inherit' });
  cp.execFileSync(process.execPath, [tmpFile], { stdio: 'inherit' });
} finally {
  try { fs.unlinkSync(tmpFile); } catch (_) {}
}
