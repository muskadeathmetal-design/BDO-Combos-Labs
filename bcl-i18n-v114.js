(function(){
'use strict';
if(window.__BCL_I18N_MASTER_ACTIVE__) return;
window.__BCL_I18N_MASTER_ACTIVE__=true;

const maps={
 en:{
  'Accueil':'Home','État des données':'Data status','Couverture du build':'Build coverage','Prochaines actions':'Next actions','Priorités recommandées':'Recommended priorities','Créer un premier combo':'Create a first combo','Aucun combo enregistré pour ce contexte':'No combo saved for this context','Ajouter des transitions':'Add transitions','Aucun cancel/transition validé':'No validated cancel/transition','Workflow':'Workflow','De la donnée brute au combo optimisé':'From raw data to optimized combo','Clique sur une étape pour ouvrir l’outil correspondant':'Click a step to open the corresponding tool','Skills chargés':'Loaded skills','Référentiel':'Reference','aucune entrée':'no entry','pour ce contexte':'for this context','Transitions':'Transitions','avec timing':'with timing','Complétude':'Completeness','données de combat':'combat data','Métadonnées Skills':'Skill metadata','Skills vs référentiel':'Skills vs reference','Le contexte est prêt, mais aucune compétence n’est chargée. Commence par la recherche automatique depuis le dictionnaire.':'The context is ready, but no skill is loaded. Start with automatic search from the dictionary.','Référentiel : aucun pour ce contexte':'Reference: none for this context','Mesure, construis et optimise tes combos BDO':'Measure, build and optimize your BDO combos','Ouvrir Skills':'Open Skills','Contexte actif':'Active context','Aucun référentiel pour ce contexte':'No reference for this context','Actualiser':'Refresh','Construire':'Build','Ajouter':'Add','Aucune donnée':'No data','Aucune donnée disponible':'No data available','Aucun résultat':'No results','Aucun combo':'No combo','Aucune transition':'No transition','Aucune compétence':'No skill','Enregistrer':'Save','Supprimer':'Delete','Modifier':'Edit','Annuler':'Cancel','Fermer':'Close','Retour':'Back','Suivant':'Next','Précédent':'Previous','Rechercher':'Search','Sélectionner':'Select','Tout':'All','Toutes':'All','Actif':'Active','Inactive':'Inactive','Activé':'Enabled','Désactivé':'Disabled','Nom':'Name','Type':'Type','Séquence':'Sequence','Validation':'Validation','Actions':'Actions','Date':'Date','Source':'Source','Sources':'Sources','Description':'Description','Résultat':'Result','Résultats':'Results','Durée':'Duration','Confiance':'Confidence','Qualité':'Quality','Classe':'Class','Spécialisation':'Specialization','Compétences':'Skills','Combos':'Combos','Paramètres':'Settings','Configuration':'Configuration','Données':'Data','Sauvegarde':'Backup','Importer':'Import','Exporter':'Export','Optimisation':'Optimization','Ressources':'Resources','Diagnostic':'Diagnostics','Historique':'History','Liens utiles':'Useful links','Compte':'Account','Connexion':'Sign in','Déconnexion':'Sign out','Langue':'Language','Profil de classe':'Class profile','Configuration de classe':'Class configuration','Classe active':'Active class','Import & détection':'Import & detection','Sources de données':'Data sources','Import manuel Google Docs':'Manual Google Docs import','Qualité de détection':'Detection quality','Confiance minimum':'Minimum confidence','Équilibrée':'Balanced','Recherche':'Search','Filtre':'Filter','Tri':'Sort','Actives uniquement':'Active only','Préparation du build':'Build preparation','Consommables':'Consumables','Cristaux':'Crystals','Toutes les données':'All data','Exporter toutes les données':'Export all data','Importer une sauvegarde':'Import a backup','Structure du combo':'Combo structure','Réglage':'Setting','Valeur':'Value','Utilisation':'Usage','Phase':'Phase','État':'State','Maximum de compétences':'Maximum skills','Option':'Option','Historique Builder':'Builder history','Derniers builds construits':'Latest builds','Ressources de la classe':'Class resources','Ressources générales':'General resources','État du contexte actif':'Active context status','Qualité des données':'Data quality','Espace utilisateur':'User area','Compte local & données personnelles':'Local account & personal data','Gérer mon compte':'Manage my account','Orientation du combo':'Combo orientation','Mixte':'Mixed','Pré-Awakening':'Pre-Awakening','Oui':'Yes','Non':'No','Aucun':'None','Aucune':'None','Ouvrir':'Open','Valider':'Confirm','Vider':'Clear','J’aime':'Like','Vérifié':'Verified','Partager':'Share','Masquer pour moi':'Hide for me'
 },
 de:{'Accueil':'Startseite','État des données':'Datenstatus','Prochaines actions':'Nächste Aktionen','Priorités recommandées':'Empfohlene Prioritäten','Créer un premier combo':'Erstes Combo erstellen','Ajouter des transitions':'Transitionen hinzufügen','Actualiser':'Aktualisieren','Enregistrer':'Speichern','Supprimer':'Löschen','Modifier':'Bearbeiten','Annuler':'Abbrechen','Fermer':'Schließen','Retour':'Zurück','Rechercher':'Suchen','Classe':'Klasse','Spécialisation':'Spezialisierung','Compétences':'Skills','Combos':'Combos','Paramètres':'Einstellungen','Données':'Daten','Importer':'Importieren','Exporter':'Exportieren','Langue':'Sprache'},
 es:{'Accueil':'Inicio','État des données':'Estado de datos','Prochaines actions':'Próximas acciones','Priorités recommandées':'Prioridades recomendadas','Créer un premier combo':'Crear un primer combo','Ajouter des transitions':'Añadir transiciones','Actualiser':'Actualizar','Enregistrer':'Guardar','Supprimer':'Eliminar','Modifier':'Editar','Annuler':'Cancelar','Fermer':'Cerrar','Retour':'Volver','Rechercher':'Buscar','Classe':'Clase','Spécialisation':'Especialización','Compétences':'Habilidades','Combos':'Combos','Paramètres':'Ajustes','Données':'Datos','Importer':'Importar','Exporter':'Exportar','Langue':'Idioma'},
 it:{'Accueil':'Home','État des données':'Stato dati','Prochaines actions':'Prossime azioni','Priorités recommandées':'Priorità consigliate','Créer un premier combo':'Crea un primo combo','Ajouter des transitions':'Aggiungi transizioni','Actualiser':'Aggiorna','Enregistrer':'Salva','Supprimer':'Elimina','Modifier':'Modifica','Annuler':'Annulla','Fermer':'Chiudi','Retour':'Indietro','Rechercher':'Cerca','Classe':'Classe','Spécialisation':'Specializzazione','Compétences':'Abilità','Combos':'Combo','Paramètres':'Impostazioni','Données':'Dati','Importer':'Importa','Exporter':'Esporta','Langue':'Lingua'},
 pt:{'Accueil':'Início','État des données':'Estado dos dados','Prochaines actions':'Próximas ações','Priorités recommandées':'Prioridades recomendadas','Créer un premier combo':'Criar primeiro combo','Ajouter des transitions':'Adicionar transições','Actualiser':'Atualizar','Enregistrer':'Guardar','Supprimer':'Eliminar','Modifier':'Editar','Annuler':'Cancelar','Fermer':'Fechar','Retour':'Voltar','Rechercher':'Pesquisar','Classe':'Classe','Spécialisation':'Especialização','Compétences':'Habilidades','Combos':'Combos','Paramètres':'Definições','Données':'Dados','Importer':'Importar','Exporter':'Exportar','Langue':'Idioma'}
};

const originals=new WeakMap();
const CC=new Set(['CC','Stiffness','Stun','Knockdown','Bound','Float','Knockback','Grapple','Air Smash','Down Smash','Super Armor','Forward Guard','Invincible','Invincibility','I-frame','Iframe']);
const inputPattern=/^(?:(?:SHIFT|CTRL|ALT|SPACE|LMB|RMB|MMB|W|A|S|D|Q|E|F|C|X|Z|R|T|G|V|1|2|3|4|5|6|7|8|9|0)(?:\s*\+\s*|\s*\/\s*|\s*→\s*|\s*,\s*|\s+)?)+$/i;
let observer=null;
let applying=false;
let timer=null;

function language(){
 const s=document.getElementById('bclLanguageSelect');
 const v=(s&&s.value)||localStorage.getItem('bcl_language')||localStorage.getItem('bclLanguage')||'fr';
 return ['fr','en','de','es','it','pt'].includes(v)?v:'fr';
}
function excluded(el,text){
 if(!el) return true;
 if(el.closest('script,style,noscript,code,pre,input,textarea,select,option,[contenteditable="true"],[data-no-i18n],[data-i18n],.skill-detail-name,.builder-skill-btn,.skill-name,[data-skill-name],[data-input],[data-cc],.cc,.combat-input')) return true;
 const sig=((el.id||'')+' '+(typeof el.className==='string'?el.className:'')).toLowerCase();
 if(/skill[-_ ]?(name|title)|name[-_ ]?skill|combat[-_ ]?input|skill[-_ ]?input|cc[-_ ]?(type|name|value|label)/.test(sig)) return true;
 const t=(text||'').trim();
 return !t || CC.has(t) || inputPattern.test(t) || /^https?:\/\//i.test(t);
}
function translate(text,l){
 if(l==='fr') return text;
 const dict=maps[l]||maps.en;
 const m=text.match(/^(\s*)([\s\S]*?)(\s*)$/);
 const lead=m?m[1]:'', core=m?m[2]:text, tail=m?m[3]:'';
 if(!core) return text;
 if(dict[core]) return lead+dict[core]+tail;
 let out=core;
 for(const key of Object.keys(dict).sort((a,b)=>b.length-a.length)){
   if(out.includes(key)) out=out.split(key).join(dict[key]);
 }
 return lead+out+tail;
}
function process(node,l,refreshSource){
 if(node.nodeType!==Node.TEXT_NODE) return;
 const el=node.parentElement;
 if(excluded(el,node.nodeValue)) return;
 if(refreshSource || !originals.has(node)) originals.set(node,node.nodeValue);
 const src=originals.get(node);
 const next=l==='fr'?src:translate(src,l);
 if(node.nodeValue!==next) node.nodeValue=next;
}
function observe(){
 if(!observer || !document.documentElement) return;
 observer.observe(document.documentElement,{subtree:true,childList:true,characterData:true});
}
function apply(root=document.body,refreshSource=false){
 if(applying||!root) return;
 applying=true;
 if(observer) observer.disconnect();
 try{
   const l=language();
   if(root.nodeType===Node.TEXT_NODE) process(root,l,refreshSource);
   else {
     const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
     let n; while((n=w.nextNode())) process(n,l,refreshSource);
   }
   document.documentElement.lang=l;
 } finally {
   applying=false;
   observe();
 }
}
function schedule(root,refreshSource){
 clearTimeout(timer);
 timer=setTimeout(()=>apply(root||document.body,!!refreshSource),35);
}
function init(){
 observer=new MutationObserver(mutations=>{
   if(applying) return;
   let needFull=false;
   const changed=[];
   for(const m of mutations){
     if(m.type==='characterData') changed.push(m.target);
     if(m.type==='childList'&&m.addedNodes.length) needFull=true;
   }
   if(changed.length){
     const l=language();
     observer.disconnect();
     applying=true;
     try{ for(const n of changed) process(n,l,true); }
     finally{ applying=false; observe(); }
   }
   if(needFull) schedule(document.body,false);
 });
 apply(document.body,false);
 document.addEventListener('change',e=>{
   if(e.target&&e.target.id==='bclLanguageSelect'){
     localStorage.setItem('bcl_language',e.target.value);
     apply(document.body,false);
   }
 });
 window.addEventListener('bcl-language-changed',()=>apply(document.body,false));
}
if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init,{once:true}); else init();
window.BCL_I18N_V115={apply:()=>apply(document.body,false)};
})();
