const fs=require('fs');
const path=require('path');
const locales=['en','de','es','it','pt'];
const patchFiles=[
  path.join('translations','post-visible-v116.json'),
  path.join('translations','post-visible-final-v116.json'),
  path.join('translations','post-visible-tutorial-v116.json')
];
const patches=patchFiles.map(file=>JSON.parse(fs.readFileSync(file,'utf8')));

function escapeRegex(s){
  return String(s).replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
}
function flexibleWhitespaceRegex(s){
  const parts=String(s).trim().split(/\s+/).map(escapeRegex);
  return new RegExp(parts.join('\\s+'),'g');
}

// This pass runs AFTER the main translation build and only uses curated,
// human-reviewed visible UI phrases. First try exact matching, then a whitespace-
// tolerant match so phrases split across HTML lines are still translated.
for(const locale of locales){
  const file=path.join(locale,'index.html');
  let html=fs.readFileSync(file,'utf8');
  let applied=0;
  for(const patch of patches){
    for(const [from,map] of Object.entries(patch)){
      const to=map&&map[locale];
      if(!from||!to) continue;
      if(html.includes(from)){
        html=html.split(from).join(to);
        applied++;
        continue;
      }
      const re=flexibleWhitespaceRegex(from);
      if(re.test(html)){
        re.lastIndex=0;
        html=html.replace(re,to);
        applied++;
      }
    }
  }
  fs.writeFileSync(file,html,'utf8');
  console.log(locale+': post-visible translations applied:',applied);
}
