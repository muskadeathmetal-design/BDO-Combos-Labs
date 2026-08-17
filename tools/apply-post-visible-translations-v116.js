const fs=require('fs');
const path=require('path');
const locales=['en','de','es','it','pt'];
const patchFiles=[
  path.join('translations','post-visible-v116.json'),
  path.join('translations','post-visible-final-v116.json')
];
const patches=patchFiles.map(file=>JSON.parse(fs.readFileSync(file,'utf8')));
const protectedTerms=['Down Smash','Air Smash','Super Armor','Forward Guard','Knockdown','Knockback','Stiffness','Invincible','Iframe','Freeze','Stun','Bound','Float','Grab','Shift','Space','LMB','RMB'];
function protect(text){
  let out=String(text); const vals=[];
  protectedTerms.forEach((term,i)=>{const token=`§§POSTKEEP${i}§§`; if(out.includes(term)){vals.push([token,term]); out=out.split(term).join(token);}});
  return {out,vals};
}
function restore(text,vals){let out=text; for(const [t,v] of vals) out=out.split(t).join(v); return out;}
for(const locale of locales){
  const file=path.join(locale,'index.html');
  let html=fs.readFileSync(file,'utf8');
  let applied=0;
  for(const patch of patches){
    for(const [from,map] of Object.entries(patch)){
      const to=map&&map[locale]; if(!from||!to) continue;
      const pf=protect(from), pt=protect(to);
      if(!html.includes(pf.out)) continue;
      html=html.split(pf.out).join(pt.out);
      html=restore(html,[...pf.vals,...pt.vals]);
      applied++;
    }
  }
  fs.writeFileSync(file,html,'utf8');
  console.log(locale+': post-visible translations applied:',applied);
}
