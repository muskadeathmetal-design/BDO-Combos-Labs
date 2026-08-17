const cp = require('child_process');

const srcFile = 'tools/build-static-locales-v116.js';

cp.execFileSync(process.execPath, ['--check', srcFile], { stdio: 'inherit' });
cp.execFileSync(process.execPath, [srcFile], { stdio: 'inherit' });
