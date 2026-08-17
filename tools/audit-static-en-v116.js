const fs=require('fs');
const src=fs.readFileSync('en/index.html','utf8');

const french=/\b(?:le|la|les|un|une|des|du|de|dans|avec|sans|pour|sur|est|sont|tu|vous|peux|peut|aucun|aucune|ajouter|ajoute|supprimer|enregistrer|choisir|sélectionner|sélectionne|analyse|analyser|vidéo|données|compétence|compétences|mesure|mesures|détection|durée|début|fin|actuel|actuelle|chargé|chargée|guide|renommer|vérifie|contrôle|lecture|recommandé|seconde|secondes|classe|transition|transitions|annuler|fermer|ouvrir|valider|vider|retour|restaurer|sauvegarde|sauvegarder|fichier|document|référence|référentiel|utiliser|avant|après|pendant|depuis|validée|validées|détecté|détectée|détectées|ajouté|ajoutée|paramètres|profil|ressources|état|qualité|recherche|filtre|tri|historique|connexion|déconnexion|compte|utilisateur|communauté|partagé|partagée|vérifié|vérifiée|priorité|actions|prochaines|donnée|créer|premier|première|activer|désactiver|modifier|actualiser|afficher|affichage|résolu|résolue|inconnu|inconnue|possible|impossible|erreur|attention|avertissement)\b|[àâçéèêëîïôùûüÿœæ]/i;
const excluded=/^(?:Stun|Stiffness|Knockdown|Bound|Float|Knockback|Grab|Freeze|Down Smash|Air Smash|Super Armor|Forward Guard|Invincible|Iframe|Shift|Space|LMB|RMB|[WASDQEFCZXT](?:\s*\+\s*[A-Z]+)?)$/i;
const codeHeavy=/(?:\bfunction\b|\bconst\b|\blet\b|\bvar\b|\breturn\b|document\.|window\.|localStorage|querySelector|innerHTML|textContent|addEventListener|Math\.|JSON\.|Object\.|Array\.|\.map\(|\.filter\(|\.forEach\(|=>|<\/?(?:div|span|button|input|select|option|script|style|table|thead|tbody|tr|td|th)\b|class=|style=)/i;
const protectedNames=new Set();
for(const re of [/\bname\s*:\s*["'`]([^"'`\n]{2,120})["'`]/g,/\bskillName\s*:\s*["'`]([^"'`\n]{2,120})["'`]/g,/\bskill\s*:\s*["'`]([^"'`\n]{2,120})["'`]/g]){
  for(const m of src.matchAll(re)) protectedNames.add(norm(m[1]));
}
function norm(v){return String(v||'').replace(/&nbsp;/g,' ').replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/\s+/g,' ').trim();}
function human(v){
  v=norm(v);
  if(v.length<3||v.length>380||excluded.test(v)||protectedNames.has(v)||!french.test(v))return false;
  if(/^https?:\/\//i.test(v)||codeHeavy.test(v))return false;
  if((v.match(/\$\{/g)||[]).length>3)return false;
  const letters=(v.match(/[A-Za-zÀ-ÖØ-öø-ÿ]/g)||[]).length;
  if(letters<2)return false;
  const noisy=(v.match(/[^A-Za-zÀ-ÖØ-öø-ÿ0-9\s.,;:!?()\-–—→/+%’'"«»…${}]/g)||[]).length;
  return noisy/Math.max(1,v.length)<=0.08;
}
const found=new Set();
function add(v){v=norm(v);if(human(v))found.add(v);}
let htmlOnly=src.replace(/<script\b[\s\S]*?<\/script>/gi,' ').replace(/<style\b[\s\S]*?<\/style>/gi,' ');
for(const m of htmlOnly.matchAll(/>([^<>]+)</g))add(m[1]);
for(const m of src.matchAll(/(["'`])((?:\\.|(?!\1).){3,380})\1/gs))add(m[2]);
const rows=[...found].sort((a,b)=>a.localeCompare(b,'fr'));
fs.writeFileSync('en/untranslated-audit.txt',`V116 human residual French candidates: ${rows.length}\n\n`+rows.join('\n'),'utf8');
console.log('Human residual French candidates:',rows.length);
// Rerun marker: prepared-patches build completed successfully.
