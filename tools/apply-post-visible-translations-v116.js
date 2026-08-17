const fs=require('fs');
const path=require('path');
const locales=['en','de','es','it','pt'];
const patchFiles=[
  path.join('translations','post-visible-v116.json'),
  path.join('translations','post-visible-final-v116.json')
];
const patches=patchFiles.map(file=>JSON.parse(fs.readFileSync(file,'utf8')));

// This pass runs AFTER the main translation build. Its keys are exact strings
// observed in the generated pages, so literal replacement is the safest option.
// BDO terms, inputs and CC names are already preserved in every target value.
for(const locale of locales){
  const file=path.join(locale,'index.html');
  let html=fs.readFileSync(file,'utf8');
  let applied=0;
  for(const patch of patches){
    for(const [from,map] of Object.entries(patch)){
      const to=map&&map[locale];
      if(!from||!to||!html.includes(from)) continue;
      html=html.split(from).join(to);
      applied++;
    }
  }
  fs.writeFileSync(file,html,'utf8');
  console.log(locale+': post-visible exact translations applied:',applied);
}
