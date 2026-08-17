const fs=require('fs');
const src=fs.readFileSync('en/index.html','utf8');

const french=/\b(?:le|la|les|un|une|des|du|de|dans|avec|sans|pour|sur|est|sont|tu|vous|tes|ton|ta|vos|votre|peux|peut|aucun|aucune|ajouter|ajoute|ajouté|ajoutée|supprimer|enregistrer|enregistré|choisir|sélectionner|sélectionne|analyse|analyser|vidéo|données|donnée|compétence|compétences|mesure|mesures|détection|détecté|détectée|durée|durées|début|fin|actuel|actuelle|chargé|chargée|guide|renommer|vérifie|vérifier|contrôle|lecture|recommandé|seconde|secondes|classe|transition|transitions|annuler|fermer|ouvrir|valider|validation|validé|validée|vider|retour|retourne|restaurer|restauration|sauvegarde|sauvegarder|fichier|document|référence|référentiel|utiliser|utilise|avant|après|pendant|depuis|paramètres|réglages|profil|profils|ressources|état|qualité|recherche|filtre|filtres|tri|historique|connexion|déconnexion|compte|utilisateur|communauté|partagé|partagée|vérifié|vérifiée|priorité|actions|prochaines|créer|premier|première|activer|désactiver|modifier|actualiser|afficher|affichage|résolu|résolue|inconnu|inconnue|source inconnue|possible|impossible|erreur|attention|avertissement|confirmer|confirmation|mot|passe|nouveau|nouvelle|changer|réinitialiser|réinitialisé|localement|local|espace|travail|effacer|importer|exporter|restauré|restaurée|restaurées|automatique|automatiquement|manuel|manuelle|nécessaire|souhaitée|maximale|minimale|complète|définitivement|aussi|encore|chaque|tous|toutes|bon|bonne|correct|correcte|suivant|suivante|précédent|précédente|déjà|présent|présente|présentes|restantes|restant|bloqué|immunité|enchaînement|optimiseur|fenêtre|limite|nombre|ordre|phase|désactivée|ignore|indique|conserver|perdre|récupère|désormais|selon|réellement|enregistrés|joueurs|vote|atteint|seuil|devient|rejoint|quitte|coller|lien|public|charger|exporté|analysé|indépendamment|noms|chaînes|explicites|extraits|ajoutés|existent|importés|ensuite)\b|[àâçéèêëîïôùûüÿœæ]/i;
const excluded=/^(?:Stun|Stiffness|Knockdown|Bound|Float|Knockback|Grab|Freeze|Down Smash|Air Smash|Super Armor|Forward Guard|Invincible|Iframe|Shift|Space|LMB|RMB|[WASDQEFCZXT](?:\s*\+\s*[A-Z]+)?)$/i;
const codeHeavy=/(?:\bfunction\b|\bconst\b|\blet\b|\bvar\b|\breturn\b|document\.|window\.|localStorage|querySelector|innerHTML|textContent|addEventListener|Math\.|JSON\.|Object\.|Array\.|\.map\(|\.filter\(|\.forEach\(|=>|<\/?(?:div|span|button|input|select|option|script|style|table|thead|tbody|tr|td|th)\b|class=|style=)/i;
const protectedNames=new Set();
for(const re of [/\bname\s*:\s*["'`]([^"'`\n]{2,120})["'`]/g,/\bskillName\s*:\s*["'`]([^"'`\n]{2,120})["'`]/g,/\bskill\s*:\s*["'`]([^"'`\n]{2,120})["'`]/g]){
  for(const m of src.matchAll(re)) protectedNames.add(norm(m[1]));
}
function norm(v){return String(v||'').replace(/&nbsp;/g,' ').replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/\s+/g,' ').trim();}
function human(v){
  v=norm(v);
  if(v.length<3||v.length>500||excluded.test(v)||protectedNames.has(v)||!french.test(v))return false;
  if(/^https?:\/\//i.test(v)||codeHeavy.test(v))return false;
  if((v.match(/\$\{/g)||[]).length>3)return false;
  const letters=(v.match(/[A-Za-zÀ-ÖØ-öø-ÿ]/g)||[]).length;
  if(letters<2)return false;
  const noisy=(v.match(/[^A-Za-zÀ-ÖØ-öø-ÿ0-9\s.,;:!?()\-–—→/+%’'"«»…${}]/g)||[]).length;
  return noisy/Math.max(1,v.length)<=0.08;
}
const visible=new Set();
const internal=new Set();
let htmlOnly=src.replace(/<script\b[\s\S]*?<\/script>/gi,' ').replace(/<style\b[\s\S]*?<\/style>/gi,' ');
for(const m of htmlOnly.matchAll(/>([^<>]+)</g)){
  const v=norm(m[1]); if(human(v)) visible.add(v);
}
for(const m of src.matchAll(/(["'`])((?:\\.|(?!\1).){3,500})\1/gs)){
  const v=norm(m[2]); if(human(v)&&!visible.has(v)) internal.add(v);
}
const visibleRows=[...visible].sort((a,b)=>a.localeCompare(b,'fr'));
const internalRows=[...internal].sort((a,b)=>a.localeCompare(b,'fr'));
const allRows=[...new Set([...visibleRows,...internalRows])].sort((a,b)=>a.localeCompare(b,'fr'));
fs.writeFileSync('en/untranslated-visible-audit.txt',`V116 visible French candidates: ${visibleRows.length}\n\n`+visibleRows.join('\n'),'utf8');
fs.writeFileSync('en/untranslated-audit.txt',`V116 human residual French candidates: ${allRows.length}\nVisible: ${visibleRows.length}\nInternal/dynamic: ${internalRows.length}\n\n`+allRows.join('\n'),'utf8');
console.log('Visible French candidates:',visibleRows.length);
console.log('Internal/dynamic French candidates:',internalRows.length);
console.log('Total human residual candidates:',allRows.length);
// Final audit after post-build visible translation patches.
