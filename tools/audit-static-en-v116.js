const fs=require('fs');
const locales=['en','de','es','it','pt'];

// Deliberately avoids "accent = French": Spanish/Italian/Portuguese legitimately
// contain many of the same accented letters. Match French-specific UI vocabulary
// and common French fragments instead.
const strongFrench=/\b(?:aucun|aucune|ajouter|ajoute|ajouté|ajoutée|supprimer|enregistrer|enregistré|sélectionner|sélectionne|vidéo|données|donnée|compétence|compétences|mesure|mesures|détection|détecté|détectée|durée|durées|début|chargé|chargée|renommer|vérifie|vérifier|contrôle|recommandé|annuler|fermer|ouvrir|valider|sauvegarde|sauvegarder|fichier|référence|référentiel|paramètres|réglages|déconnexion|compte|utilisateur|communauté|partagé|partagée|vérifié|vérifiée|prochaines|créer|premier|première|désactiver|actualiser|afficher|affichage|résolu|résolue|inconnu|inconnue|erreur|avertissement|confirmer|réinitialiser|réinitialisé|définitivement|nécessaire|souhaitée|maximale|minimale|complète|restaurer|restauration|restauré|restaurée|enchaînement|optimiseur|fenêtre|désactivée|désormais|réellement|joueurs|seuil|rejoint|quitte|coller|charger|exporté|analysé|indépendamment|chaînes|extraits|ajoutés|importés|ensuite|caractères|répète|générique|catégorie|spécialisation|séquence|sécurité|protection|dégâts|coût|quantité|priorité|préparation|répétition|ressource|détection|télécharger|résumé|rôle|attendu|observé|comportement|connexion|dernière|maintenance|métadonnées|utilise|utilisent|sépare|remplace|produit|reste|inconnue|inconnues|silencieusement|valeur arbitraire|fais une copie|mot de passe)\b|\b(?:l’application|l’outil|l’optimiseur|l’animation|d’une|d’un|n’est|n’existe|s’il|qu’une|qu’un|ce navigateur|les pages|une compétence|le lecteur|la vidéo|le fichier|le combo|du combo|au profil|à la fin|après une|avant de|pour restaurer|dans l’onglet)\b/i;
const protectedTerms=/^(?:Stun|Stiffness|Knockdown|Bound|Float|Knockback|Grab|Freeze|Down Smash|Air Smash|Super Armor|Forward Guard|Invincible|Iframe|Shift|Space|LMB|RMB)$/i;
function norm(v){return String(v||'').replace(/&nbsp;/g,' ').replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/\s+/g,' ').trim();}
function isHumanFrench(v){
  v=norm(v);
  if(v.length<3||v.length>700||protectedTerms.test(v)||!strongFrench.test(v))return false;
  if(/^https?:\/\//i.test(v))return false;
  const letters=(v.match(/[A-Za-zÀ-ÖØ-öø-ÿ]/g)||[]).length;
  return letters>=2;
}

for(const locale of locales){
  const file=`${locale}/index.html`;
  const src=fs.readFileSync(file,'utf8');
  const htmlOnly=src.replace(/<script\b[\s\S]*?<\/script>/gi,' ').replace(/<style\b[\s\S]*?<\/style>/gi,' ');
  const visible=new Set();
  for(const m of htmlOnly.matchAll(/>([^<>]+)</g)){
    const v=norm(m[1]); if(isHumanFrench(v)) visible.add(v);
  }
  for(const m of htmlOnly.matchAll(/\b(?:title|placeholder|aria-label|alt)\s*=\s*(["'])(.*?)\1/gi)){
    const v=norm(m[2]); if(isHumanFrench(v)) visible.add(v);
  }
  const rows=[...visible].sort((a,b)=>a.localeCompare(b,'fr'));
  fs.writeFileSync(`${locale}/untranslated-visible-audit.txt`,`V116 ${locale} visible French residual candidates: ${rows.length}\n\n${rows.join('\n')}`,'utf8');
  console.log(locale,'visible French residual candidates:',rows.length);
}
// final verification marker for the 19-source residual batch
