const fs=require('fs');
const path=require('path');
const locales=['en','de','es','it','pt'];
const rows=JSON.parse(fs.readFileSync(path.join('translations','missing-visible-v116.json'),'utf8'));
const finalMap=JSON.parse(fs.readFileSync(path.join('translations','auto-complete-visible-v116.json'),'utf8'));
function esc(s){return String(s).replace(/[.*+?^${}()|[\]\\]/g,'\\$&')}
function flex(s){return new RegExp(String(s).trim().split(/\s+/).map(esc).join('\\s+'),'g')}
function replaceText(text,from,to){if(!from||!to||from===to)return text;if(text.includes(from))return text.split(from).join(to);const re=flex(from);return re.test(text)?text.replace(re,to):text}
for(const locale of locales){
  const file=path.join(locale,'index.html');
  let html=fs.readFileSync(file,'utf8');
  const blocks=[];
  html=html.replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi,b=>{const t=`§§ALIGNBLOCK${blocks.length}§§`;blocks.push([t,b]);return t});
  let applied=0;
  html=html.replace(/<[^>]+>|[^<]+/g,chunk=>{
    if(!chunk)return chunk;
    if(chunk[0]!=='<'){
      let out=chunk;
      for(const row of rows){const from=row[locale],to=finalMap[row.fr]&&finalMap[row.fr][locale];const next=replaceText(out,from,to);if(next!==out){applied++;out=next}}
      return out;
    }
    return chunk.replace(/\b(title|placeholder|aria-label|alt)\s*=\s*(["'])([\s\S]*?)\2/gi,(whole,attr,q,value)=>{
      let out=value;
      for(const row of rows){const from=row[locale],to=finalMap[row.fr]&&finalMap[row.fr][locale];const next=replaceText(out,from,to);if(next!==out){applied++;out=next}}
      return `${attr}=${q}${out}${q}`;
    });
  });
  for(const [t,b] of blocks)html=html.split(t).join(b);
  fs.writeFileSync(file,html,'utf8');
  console.log(locale+': aligned residual replacements:',applied);
}
