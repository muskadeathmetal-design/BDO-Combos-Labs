(()=>{'use strict';
const VERSION='v125-analysis-control-center';
const KEY='bcl.analysisSettings.v125';
const DEFAULTS={mode:'simple',profile:'balanced',searchDepth:'standard',maxComboSkills:10,combatMode:'pvp',strictCC:true,protectionPolicy:'normal',cancelPolicy:'validated',resourceModel:'normal',timingTolerance:'normal',transitionPolicy:'validated',protectionGapPolicy:'penalize',confidence:'medium',recommendationStyle:'balanced'};
const OPT={
  profile:[['balanced','Balanced'],['burst','Burst'],['protected','Protected'],['cc','CC Control'],['low_stamina','Low Stamina'],['mobility','Mobility']],
  depth:[['shallow','Shallow'],['standard','Standard'],['deep','Deep']],
  combat:[['pvp','PvP'],['pve','PvE']],
  protection:[['relaxed','Relaxed'],['normal','Normal'],['strict','Strict']],
  cancel:[['validated','Validated only'],['allow_pending','Allow pending']],
  resource:[['relaxed','Relaxed'],['normal','Normal'],['strict','Strict']],
  timing:[['tight','Tight'],['normal','Normal'],['loose','Loose']],
  transition:[['validated','Validated only'],['allow_pending','Allow pending']],
  gap:[['ignore','Ignore'],['penalize','Penalize'],['reject','Reject']],
  confidence:[['low','Low'],['medium','Medium'],['high','High']],
  style:[['conservative','Conservative'],['balanced','Balanced'],['exploratory','Exploratory']]
};
function load(){
  try{
    const modern=JSON.parse(localStorage.getItem(KEY)||'{}');
    const old=JSON.parse(localStorage.getItem('bcl.analysisSettings.v121')||'{}');
    return {...DEFAULTS,...old,...modern};
  }catch(e){return {...DEFAULTS}}
}
function save(v){
  const clean={...DEFAULTS,...v};
  localStorage.setItem(KEY,JSON.stringify(clean));
  window.dispatchEvent(new CustomEvent('bcl-analysis-settings-changed',{detail:{...clean}}));
  return clean;
}
function e(v){return String(v??'').replace(/[&<>\"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;'}[c]||c))}
function sel(id,value,options){return `<select id="${id}">${options.map(([v,l])=>`<option value="${v}"${v===value?' selected':''}>${e(l)}</option>`).join('')}</select>`}
function field(label,control,help=''){return `<label class="ac-field"><span>${e(label)}</span>${control}${help?`<small>${e(help)}</small>`:''}</label>`}
function page(){return document.getElementById('settingsPage')||document.querySelector('[data-page="settings"]')}
function collect(root){return {
  mode:root.querySelector('#acMode')?.value||'simple',
  profile:root.querySelector('#acProfile')?.value||'balanced',
  searchDepth:root.querySelector('#acDepth')?.value||'standard',
  maxComboSkills:Math.max(2,Math.min(20,Number(root.querySelector('#acMaxSkills')?.value)||10)),
  combatMode:root.querySelector('#acCombat')?.value||'pvp',
  strictCC:!!root.querySelector('#acStrictCC')?.checked,
  protectionPolicy:root.querySelector('#acProtection')?.value||'normal',
  cancelPolicy:root.querySelector('#acCancel')?.value||'validated',
  resourceModel:root.querySelector('#acResource')?.value||'normal',
  timingTolerance:root.querySelector('#acTiming')?.value||'normal',
  transitionPolicy:root.querySelector('#acTransition')?.value||'validated',
  protectionGapPolicy:root.querySelector('#acGap')?.value||'penalize',
  confidence:root.querySelector('#acConfidence')?.value||'medium',
  recommendationStyle:root.querySelector('#acStyle')?.value||'balanced'
}}
function hideLegacy(p,root){
  [...p.children].forEach(el=>{if(el!==root){el.dataset.acLegacyHidden='1';el.style.display='none'}});
}
function render(){
  const p=page();if(!p)return false;
  let root=p.querySelector('#analysisControlCenterV125');
  if(root){hideLegacy(p,root);return true}
  const s=load();
  root=document.createElement('section');root.id='analysisControlCenterV125';root.className='ac-shell';
  root.innerHTML=`<style>
  #analysisControlCenterV125{display:grid;gap:14px}.ac-hero{padding:18px;border-radius:14px;border:1px solid rgba(88,166,255,.28);background:linear-gradient(135deg,rgba(31,111,235,.13),rgba(17,24,33,.95))}.ac-hero h2{margin:0 0 6px;font-size:20px}.ac-hero p{margin:0;color:#9aa7b5;max-width:850px}.ac-grid{display:grid;grid-template-columns:repeat(2,minmax(280px,1fr));gap:12px}.ac-card{padding:15px;border-radius:13px;border:1px solid rgba(139,148,158,.16);background:rgba(17,24,33,.94)}.ac-card h3{margin:0 0 11px}.ac-field{display:grid;gap:6px;margin:10px 0}.ac-field>span{font-size:12px;color:#c9d1d9}.ac-field small{font-size:11px;color:#8b949e}.ac-field select,.ac-field input{width:100%;max-width:none}.ac-check{display:flex;align-items:center;gap:8px;margin:11px 0;color:#c9d1d9}.ac-check input{width:auto;min-height:auto}.ac-actions{display:flex;gap:8px;flex-wrap:wrap}.ac-status{font-size:12px;color:#79c0ff;align-self:center}.ac-private{padding:10px 12px;border-radius:10px;background:rgba(46,160,67,.08);border:1px solid rgba(46,160,67,.2);font-size:12px;color:#9fdfad}.ac-advanced[hidden]{display:none!important}@media(max-width:800px){.ac-grid{grid-template-columns:1fr}}
  </style>
  <div class="ac-hero"><h2>Analysis & Optimization</h2><p>Configure comment AnalysisCore doit rechercher, simuler et classer les combos. Les formules, poids internes et heuristiques privées ne sont jamais exposés dans le navigateur.</p></div>
  <div class="ac-grid">
    <article class="ac-card"><h3>Optimizer</h3>
      ${field('Control level',sel('acMode',s.mode,[['simple','Simple'],['advanced','Advanced']]))}
      ${field('Objective profile',sel('acProfile',s.profile,OPT.profile),'Choisit l’objectif général sans révéler les coefficients internes.')}
      ${field('Search depth',sel('acDepth',s.searchDepth,OPT.depth))}
      ${field('Maximum combo length',`<input id="acMaxSkills" type="number" min="2" max="20" step="1" value="${Math.max(2,Math.min(20,Number(s.maxComboSkills)||10))}">`)}
    </article>
    <article class="ac-card"><h3>Combat Simulation</h3>
      ${field('Combat mode',sel('acCombat',s.combatMode,OPT.combat))}
      <label class="ac-check"><input id="acStrictCC" type="checkbox"${s.strictCC?' checked':''}><span>Strict CC state & immunity</span></label>
      ${field('Protection handling',sel('acProtection',s.protectionPolicy,OPT.protection))}
      ${field('Cancel policy',sel('acCancel',s.cancelPolicy,OPT.cancel))}
      ${field('Resource model',sel('acResource',s.resourceModel,OPT.resource))}
    </article>
    <article class="ac-card ac-advanced"><h3>Timeline & Combat Graph</h3>
      ${field('Timing tolerance',sel('acTiming',s.timingTolerance,OPT.timing))}
      ${field('Transition policy',sel('acTransition',s.transitionPolicy,OPT.transition))}
      ${field('Protection gaps',sel('acGap',s.protectionGapPolicy,OPT.gap))}
    </article>
    <article class="ac-card ac-advanced"><h3>Confidence & Recommendations</h3>
      ${field('Minimum confidence',sel('acConfidence',s.confidence,OPT.confidence))}
      ${field('Recommendation style',sel('acStyle',s.recommendationStyle,OPT.style))}
      <div class="ac-private">Private boundary: AnalysisCore converts these preferences into internal scoring, pruning, search budgets and ranking logic.</div>
    </article>
  </div>
  <div class="ac-actions"><button type="button" class="optimizer-btn" id="acSave">Save analysis settings</button><button type="button" class="tab-btn" id="acReset">Reset defaults</button><span class="ac-status" id="acStatus"></span></div>`;
  p.prepend(root);hideLegacy(p,root);
  const mode=()=>{const advanced=root.querySelector('#acMode')?.value==='advanced';root.querySelectorAll('.ac-advanced').forEach(x=>x.hidden=!advanced)};
  const persist=()=>{const v=save(collect(root));const st=root.querySelector('#acStatus');if(st){st.textContent='Saved';setTimeout(()=>{if(st.textContent==='Saved')st.textContent=''},1200)};return v};
  root.querySelector('#acMode')?.addEventListener('change',()=>{mode();persist()});
  root.addEventListener('change',ev=>{if(ev.target?.id!=='acMode')persist()});
  root.querySelector('#acSave')?.addEventListener('click',persist);
  root.querySelector('#acReset')?.addEventListener('click',()=>{localStorage.removeItem(KEY);localStorage.removeItem('bcl.analysisSettings.v121');root.remove();render()});
  mode();
  window.bclGetAnalysisPreferencesV125=()=>({...collect(root)});
  window.bclGetAnalysisPreferencesV121=()=>({...collect(root)});
  window.BCL_ANALYSIS_SETTINGS_V125={version:VERSION,key:KEY,defaults:{...DEFAULTS},get:()=>({...load()}),set:v=>save({...load(),...v})};
  return true;
}
function boot(){render();setTimeout(render,250);setTimeout(render,1000);document.querySelector('[data-page="settingsPage"]')?.addEventListener('click',()=>setTimeout(render,0));}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
