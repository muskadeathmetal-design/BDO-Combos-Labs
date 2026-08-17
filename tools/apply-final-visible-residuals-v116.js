const fs=require('fs');
const locales=['en','de','es','it','pt'];
const common={
  '8 caractères minimum':{en:'8 characters minimum',de:'Mindestens 8 Zeichen',es:'8 caracteres mínimo',it:'Minimo 8 caratteri',pt:'Mínimo de 8 caracteres'},
  'Décris ce que l’application aurait dû faire...':{en:'Describe what the application should have done...',de:'Beschreibe, was die Anwendung hätte tun sollen...',es:'Describe lo que debería haber hecho la aplicación...',it:'Descrivi cosa avrebbe dovuto fare l’applicazione...',pt:'Descreve o que a aplicação deveria ter feito...'},
  'Nom, input, effet, CC, protection…':{en:'Name, input, effect, CC, protection…',de:'Name, Input, Effekt, CC, Schutz…',es:'Nombre, input, efecto, CC, protección…',it:'Nome, input, effetto, CC, protezione…',pt:'Nome, input, efeito, CC, proteção…'},
  'Répète le mot de passe':{en:'Repeat password',de:'Passwort wiederholen',es:'Repite la contraseña',it:'Ripeti la password',pt:'Repete a palavra-passe'}
};
const specific={de:{
  'Les combos partagés par les joueurs restent ici pendant leur phase de vote. Lorsqu’un combo atteint le seuil communautaire, il devient automatiquement vérifié, quitte Spieler-Combos et rejoint Klassen-Combos.':'Von Spielern geteilte Combos bleiben hier während der Abstimmungsphase. Sobald eine Combo die Community-Schwelle erreicht, wird sie automatisch verifiziert, verlässt Spieler-Combos und wechselt zu Klassen-Combos.',
  'Tu peux coller le lien d’un Google Doc/Sheet public ou charger un fichier exporté depuis Google Docs. Le document est d’abord analysé indépendamment de la Skill Library : les noms présents dans les chaînes explicites sont extraits, puis ajoutés aux Skills de la classe active s’ils n’existent pas encore. Les combos et transitions sont importés ensuite.':'Du kannst den Link zu einem öffentlichen Google Doc/Sheet einfügen oder eine aus Google Docs exportierte Datei laden. Das Dokument wird zuerst unabhängig von der Skill Library analysiert: Namen aus expliziten Ketten werden extrahiert und den Skills der aktiven Klasse hinzugefügt, falls sie noch nicht existieren. Danach werden Combos und Transitions importiert.'
}};
function esc(s){return s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')}
function flexible(s){return new RegExp(s.trim().split(/\s+/).map(esc).join('\\s+'),'g')}
for(const locale of locales){
  const file=`${locale}/index.html`;
  let html=fs.readFileSync(file,'utf8'),count=0;
  for(const [from,map] of Object.entries(common)){
    const to=map[locale];
    if(html.includes(from)){html=html.split(from).join(to);count++;}
  }
  for(const [from,to] of Object.entries((specific[locale]||{}))){
    if(html.includes(from)){html=html.split(from).join(to);count++;continue;}
    const re=flexible(from);
    if(re.test(html)){re.lastIndex=0;html=html.replace(re,to);count++;}
  }
  fs.writeFileSync(file,html,'utf8');
  console.log(locale+': final visible residual replacements:',count);
}
