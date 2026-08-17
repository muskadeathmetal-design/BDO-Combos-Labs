const fs=require('fs');
const locales=['fr','en','de','es','it','pt'];
const strongFrench=/(?:[àâçéèêëîïôùûüÿœæ]|\b(?:aucun|aucune|ajouter|ajoute|ajouté|ajoutée|supprimer|enregistrer|enregistré|sélectionner|sélectionne|vidéo|données|compétence|compétences|mesure|mesures|détection|détecté|détectée|durée|durées|début|chargé|chargée|renommer|vérifie|vérifier|contrôle|recommandé|annuler|fermer|ouvrir|valider|sauvegarde|sauvegarder|fichier|référence|référentiel|paramètres|réglages|déconnexion|compte|utilisateur|communauté|partagé|partagée|vérifié|vérifiée|prochaines|créer|premier|première|désactiver|actualiser|afficher|affichage|résolu|résolue|inconnu|inconnue|erreur|avertissement|confirmer|réinitialiser|réinitialisé|définitivement|nécessaire|souhaitée|maximale|minimale|complète|restaurer|restauration|restauré|restaurée|enchaînement|optimiseur|fenêtre|limite|désactivée|désormais|réellement|joueurs|seuil|rejoint|quitte|coller|charger|exporté|analysé|indépendamment|chaînes|extraits|ajoutés|importés|ensuite)\b)/i;
const protectedTerms=/^(?:Stun|Stiffness|Knockdown|Bound|Float|Knockback|Grab|Freeze|Down Smash|Air Smash|Super Armor|Forward Guard|Invincible|Iframe|Shift|Space|LMB|RMB)$/i;
function norm(v){return String(v||'').replace(/&nbsp;/g,' ').replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/\s+/g,' ').trim();}
function visibleNodes(html){
  html=html.replace(/<script\b[\s\S]*?<\/script>/gi,' ').replace(/<style\b[\s\S]*?<\/style>/gi,' ');
  const out=[];
  for(const m of html.matchAll(/>([^<>]+)</g)){
    const raw=norm(m[1]); if(raw) out.push(raw);
  }
  return out;
}
function french(v){v=norm(v);return v.length>=3&&!protectedTerms.test(v)&&strongFrench.test(v);}
const nodes={};
for(const l of locales) nodes[l]=visibleNodes(fs.readFileSync(`${l}/index.html`,'utf8'));
const n=Math.min(...locales.map(l=>nodes[l].length));
const byFr=new Map();
for(let i=0;i<n;i++){
  const row={index:i};
  for(const l of locales) row[l]=nodes[l][i]||'';
  if(!french(row.fr)) continue;
  if(!['en','de','es','it','pt'].some(l=>french(row[l]))) continue;
  const key=row.fr;
  if(!byFr.has(key)) byFr.set(key,{fr:key,en:row.en,de:row.de,es:row.es,it:row.it,pt:row.pt,indexes:[i]});
  else byFr.get(key).indexes.push(i);
}
const rows=[...byFr.values()].sort((a,b)=>a.fr.localeCompare(b.fr,'fr'));
fs.mkdirSync('translations',{recursive:true});
fs.writeFileSync('translations/missing-visible-v116.json',JSON.stringify(rows,null,2),'utf8');
console.log('Missing visible source strings:',rows.length);
