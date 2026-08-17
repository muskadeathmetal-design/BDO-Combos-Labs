(()=>{'use strict';
const KEY='bcl.analysisSettings.v121';
const DEFAULTS={
  mode:'simple',profile:'balanced',searchDepth:'standard',maxComboSkills:10,
  combatMode:'pvp',strictCC:true,protectionPolicy:'normal',cancelPolicy:'validated',resourceModel:'normal',
  timingTolerance:'normal',transitionPolicy:'validated',protectionGapPolicy:'penalize',
  confidence:'medium',recommendationStyle:'balanced'
};
const PROFILES=['balanced','burst','protected','cc','low_stamina','mobility'];
function load(){try{return {...DEFAULTS,...JSON.parse(localStorage.getItem(KEY)||'{}')}}catch(e){return {...DEFAULTS}}}
function save(v){localStorage.setItem(KEY,JSON.stringify(v));window.dispatchEvent(new CustomEvent('bcl-analysis-settings-changed',{detail:{...v}}));}
function esc(v){return String(v).replace(/[&<>\"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;'}[c]||c))}
function field(label,html,help=''){return `<label class="bcl121-field"><span>${esc(label)}</span>${html}${help?`<small>${esc(help)}</small>`:''}</label>`}
function select(id,value,options){return `<select id="${id}">${options.map(([v,l])=>`<option value="${v}"${v===value?' selected':''}>${esc(l)}</option>`).join('')}</select>`}
function checkbox(id,checked,label){return `<label class="bcl121-check"><input id="${id}" type="checkbox"${checked?' checked':''}><span>${esc(label)}</span></label>`}
function settingsPage(){
  const direct=document.querySelector('#settingsPage,#pageSettings,#settings-page,[data-page="settings"]');
  if(direct)return direct;
  const pages=[...document.querySelectorAll('.page,section')];
  return pages.find(p=>/settings|paramètres|ajustes|einstellungen|impostazioni|definições/i.test((p.id||'')+' '+(p.getAttribute('data-page')||'')+' '+(p.querySelector('h1,h2,h3')?.textContent||'')))||null;
}
function render(){
  const page=settingsPage();if(!page)return false;
  if(page.querySelector('#bclAnalysisSettingsV121'))return true;
  const old=[...page.querySelectorAll('.settings-grid,.phase-grid,.settings-actions,.optimizer-result')];
  old.forEach(el=>{if(!el.closest('#bclAnalysisSettingsV121'))el.style.display='none'});
  const s=load();
  const root=document.createElement('section');root.id='bclAnalysisSettingsV121';root.className='bcl121-panel';
  root.innerHTML=`
    <style>
      .bcl121-panel{margin-top:16px;display:grid;gap:14px}.bcl121-head{padding:16px;border:1px solid rgba(88,166,255,.22);border-radius:14px;background:rgba(88,166,255,.06)}
      .bcl121-head h2{margin:0 0 6px}.bcl121-head p{margin:0;color:#9aa7b5}.bcl121-grid{display:grid;grid-template-columns:repeat(2,minmax(260px,1fr));gap:12px}
      .bcl121-card{border:1px solid rgba(139,148,158,.16);border-radius:14px;padding:14px;background:rgba(17,24,33,.92)}.bcl121-card h3{margin:0 0 10px}
      .bcl121-field{display:grid;gap:6px;margin:10px 0}.bcl121-field small{color:#8b949e}.bcl121-field select,.bcl121-field input{width:100%}
      .bcl121-check{display:flex;align-items:center;gap:8px;margin:9px 0;color:#c9d1d9}.bcl121-check input{width:auto;min-height:auto}
      .bcl121-actions{display:flex;gap:8px;flex-wrap:wrap}.bcl121-note{font-size:12px;color:#8b949e;margin-top:8px}
      .bcl121-advanced[hidden]{display:none!important}@media(max-width:800px){.bcl121-grid{grid-template-columns:1fr}}
    </style>
    <div class="bcl121-head"><h2>Analysis & Optimization</h2><p>Control the behavior of AnalysisCore without exposing private scoring weights or heuristics.</p></div>
    <div class="bcl121-grid">
      <div class="bcl121-card"><h3>Optimizer</h3>
        ${field('Control level',select('bcl121Mode',s.mode,[['simple','Simple'],['advanced','Advanced']]))}
        ${field('Objective profile',select('bcl121Profile',s.profile,PROFILES.map(x=>[x,x.replace('_',' ')])),'High-level objective only; private weights stay server-side.')}
        ${field('Search depth',select('bcl121Depth',s.searchDepth,[['shallow','Shallow'],['standard','Standard'],['deep','Deep']]))}
        ${field('Maximum combo length',`<input id="bcl121MaxSkills" type="number" min="3" max="30" step="1" value="${Number(s.maxComboSkills)||10}">`)}
      </div>
      <div class="bcl121-card"><h3>Combat Simulation</h3>
        ${field('Combat mode',select('bcl121Combat',s.combatMode,[['pvp','PvP'],['pve','PvE']]))}
        ${checkbox('bcl121StrictCC',!!s.strictCC,'Strict CC state and immunity handling')}
        ${field('Protection handling',select('bcl121Protection',s.protectionPolicy,[['relaxed','Relaxed'],['normal','Normal'],['strict','Strict']]))}
        ${field('Cancel policy',select('bcl121Cancel',s.cancelPolicy,[['confirmed','Confirmed only'],['validated','Validated'],['all','Allow experimental']]))}
        ${field('Resource model',select('bcl121Resource',s.resourceModel,[['light','Light'],['normal','Normal'],['strict','Strict']]))}
      </div>
      <div class="bcl121-card bcl121-advanced"><h3>Timeline & Combat Graph</h3>
        ${field('Timing tolerance',select('bcl121Timing',s.timingTolerance,[['low','Low'],['normal','Normal'],['high','High']]))}
        ${field('Unvalidated transitions',select('bcl121Transition',s.transitionPolicy,[['deny','Reject'],['validated','Prefer validated'],['allow','Allow']]))}
        ${field('Protection gaps',select('bcl121Gap',s.protectionGapPolicy,[['ignore','Ignore'],['penalize','Penalize'],['forbid','Forbid']]))}
      </div>
      <div class="bcl121-card bcl121-advanced"><h3>Confidence</h3>
        ${field('Minimum confidence',select('bcl121Confidence',s.confidence,[['low','Low'],['medium','Medium'],['high','High'],['verified','Verified only']]))}
        ${field('Recommendation style',select('bcl121Style',s.recommendationStyle,[['conservative','Conservative'],['balanced','Balanced'],['exploratory','Exploratory']]))}
        <div class="bcl121-note">These controls are public preferences only. AnalysisCore decides the private scoring, pruning and ranking behavior.</div>
      </div>
    </div>
    <div class="bcl121-actions"><button type="button" class="optimizer-btn" id="bcl121Save">Save analysis settings</button><button type="button" class="tab-btn" id="bcl121Reset">Reset defaults</button></div>`;
  page.appendChild(root);
  function collect(){return {
    mode:document.getElementById('bcl121Mode')?.value||'simple',profile:document.getElementById('bcl121Profile')?.value||'balanced',searchDepth:document.getElementById('bcl121Depth')?.value||'standard',maxComboSkills:Math.max(3,Math.min(30,Number(document.getElementById('bcl121MaxSkills')?.value)||10)),
    combatMode:document.getElementById('bcl121Combat')?.value||'pvp',strictCC:!!document.getElementById('bcl121StrictCC')?.checked,protectionPolicy:document.getElementById('bcl121Protection')?.value||'normal',cancelPolicy:document.getElementById('bcl121Cancel')?.value||'validated',resourceModel:document.getElementById('bcl121Resource')?.value||'normal',
    timingTolerance:document.getElementById('bcl121Timing')?.value||'normal',transitionPolicy:document.getElementById('bcl121Transition')?.value||'validated',protectionGapPolicy:document.getElementById('bcl121Gap')?.value||'penalize',confidence:document.getElementById('bcl121Confidence')?.value||'medium',recommendationStyle:document.getElementById('bcl121Style')?.value||'balanced'} }
  function mode(){const adv=(document.getElementById('bcl121Mode')?.value||'simple')==='advanced';root.querySelectorAll('.bcl121-advanced').forEach(el=>el.hidden=!adv)}
  document.getElementById('bcl121Mode')?.addEventListener('change',mode);mode();
  document.getElementById('bcl121Save')?.addEventListener('click',()=>save(collect()));
  document.getElementById('bcl121Reset')?.addEventListener('click',()=>{localStorage.removeItem(KEY);root.remove();render()});
  root.addEventListener('change',()=>save(collect()));
  window.bclGetAnalysisPreferencesV121=()=>({...collect()});
  window.BCL_ANALYSIS_SETTINGS_V121={version:121,key:KEY,defaults:{...DEFAULTS},get:()=>({...load()}),set:v=>save({...load(),...v})};
  return true;
}
function boot(){render();setTimeout(render,300);setTimeout(render,1200);document.addEventListener('click',()=>setTimeout(render,80),true);document.addEventListener('change',()=>setTimeout(render,80),true)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();