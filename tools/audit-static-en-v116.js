const fs=require('fs');
const src=fs.readFileSync('en/index.html','utf8');
const french=/\b(?:le|la|les|un|une|des|du|de|dans|avec|sans|pour|sur|est|sont|tu|vous|peux|peut|aucun|aucune|ajouter|supprimer|enregistrer|choisir|sélectionner|sélectionne|analyse|analyser|vidéo|données|compétence|compétences|mesure|mesures|détection|durée|début|fin|actuel|actuelle|chargé|chargée|guide|renommer|vérifie|contrôle|lecture|recommandé|seconde|secondes)\b|[àâçéèêëîïôùûüÿœæ]/i;
const excluded=/^(?:Stun|Stiffness|Knockdown|Bound|Float|Knockback|Grab|Freeze|Down Smash|Air Smash|Super Armor|Forward Guard|Invincible|Iframe|Shift|Space|LMB|RMB|[WASDQEFCZXT](?:\+[A-Z]+)?)$/i;
const found=new Set();
function add(v){v=String(v||'').replace(/\s+/g,' ').trim();if(v.length<3||v.length>500||excluded.test(v)||!french.test(v))return;if(/^https?:\/\//i.test(v))return;found.add(v);}
for(const m of src.matchAll(/>([^<>]+)</g))add(m[1]);
for(const m of src.matchAll(/(?:'([^'\n]{3,500})'|"([^"\n]{3,500})"|`([^`\n]{3,500})`)/g))add(m[1]||m[2]||m[3]);
const rows=[...found].sort((a,b)=>a.localeCompare(b,'fr'));
fs.writeFileSync('en/untranslated-audit.txt',`V116 residual French candidates: ${rows.length}\n\n`+rows.join('\n'),'utf8');
console.log('Residual French candidates:',rows.length);
