const fs = require('fs');
const cp = require('child_process');

const srcFile = 'tools/build-static-locales-v116.js';
const tmpFile = 'tools/.build-static-locales-v116-safe.tmp.js';
let src = fs.readFileSync(srcFile, 'utf8');

const needle = "    out = out.split(from).join(to);";
if (!src.includes(needle)) {
  throw new Error('Expected translation replacement line not found');
}

const replacement = [
  "    const singleToken = /^[\\p{L}\\p{M}'-]+$/u.test(from);",
  "    if (singleToken) {",
  "      const escaped = from.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&');",
  "      const re = new RegExp('(^|[^\\\\p{L}\\\\p{M}\\\'-])(' + escaped + ')(?=$|[^\\\\p{L}\\\\p{M}\\\'-])', 'gu');",
  "      out = out.replace(re, function(match, lead){ return lead + to; });",
  "    } else {",
  "      out = out.split(from).join(to);",
  "    }"
].join('\n');

src = src.replace(needle, replacement);
fs.writeFileSync(tmpFile, src, 'utf8');

try {
  cp.execFileSync(process.execPath, ['--check', tmpFile], { stdio: 'inherit' });
  cp.execFileSync(process.execPath, [tmpFile], { stdio: 'inherit' });
} finally {
  try { fs.unlinkSync(tmpFile); } catch (_) {}
}
