const fs=require('fs');
const locales=['fr','en','de','es','it','pt'];
const scripts=['bcl-timeline-engine-v1','bcl-timeline-adapter-v1','bcl-timeline-shadow-v1','bcl-combat-graph-v1','bcl-combat-graph-adapter-v1','bcl-confidence-engine-v1','bcl-protection-measurement-v1','bcl-protection-adapter-v1','bcl-multi-objective-engine-v1','bcl-multi-objective-adapter-v1','bcl-analysis-shadow-v1','bcl-shadow-comparator-v1'];
for(const locale of locales){
  const file=`${locale}/index.html`;
  if(!fs.existsSync(file))throw new Error(`Missing ${file}`);
  let html=fs.readFileSync(file,'utf8');
  for(const name of scripts){
    const re=new RegExp(`\\s*<script[^>]*src=["']\\/${name}\\.js["'][^>]*><\\/script>\\s*`,'gi');
    html=html.replace(re,'\n');
  }
  fs.writeFileSync(file,html,'utf8');
  console.log(locale+': removed public V1 engine references');
}
