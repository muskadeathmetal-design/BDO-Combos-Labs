(()=>{'use strict';
const VERSION='v133-combo-setup-visual';
const PHASES=[
  {key:'engagement',label:'Engagement',short:'ENG'},
  {key:'setup',label:'Setup',short:'SET'},
  {key:'cc',label:'CC',short:'CC'},
  {key:'burst',label:'Burst',short:'BST'},
  {key:'finish',label:'Finish',short:'FIN'}
];
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function phaseCards(grid){return [...grid.querySelectorAll('.phase-card')].slice(0,5)}
function skillFor(card){const s=card?.querySelector('select');return (s?.selectedOptions?.[0]?.textContent||s?.value||'').trim()}
function hasSkill(v){return !!v && !/^(—|-|none|aucun|select|choose|choisir)/i.test(v)}
function setupRoot(grid){return grid.closest('.page')||grid.parentElement}
function values(grid){const cards=phaseCards(grid);return PHASES.map((p,i)=>({phase:p,skill:skillFor(cards[i]),active:hasSkill(skillFor(cards[i]))}))}
function graphSvg(vals){
  const W=1060,H=238,left=74,right=74,y=100,step=(W-left-right)/4;
  const pts=vals.map((v,i)=>({x:left+i*step,y, ...v}));
  const lines=pts.slice(0,-1).map((p,i)=>`<line x1="${p.x+40}" y1="${p.y}" x2="${pts[i+1].x-40}" y2="${pts[i+1].y}" class="cs133-link ${p.active&&pts[i+1].active?'on':''}"/>`).join('');
  const nodes=pts.map((p,i)=>`<g class="cs133-node ${p.active?'on':''}" transform="translate(${p.x},${p.y})">
    <circle r="36"/>
    <text class="cs133-code" text-anchor="middle" y="5">${p.phase.short}</text>
    <text class="cs133-label" text-anchor="middle" y="62">${p.phase.label}</text>
    <foreignObject x="-92" y="72" width="184" height="46"><div xmlns="http://www.w3.org/1999/xhtml" class="cs133-skill">${esc(p.active?p.skill:'Non défini')}</div></foreignObject>
  </g>`).join('');
  return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Progression du combo PvP">${lines}${nodes}</svg>`;
}
function metrics(vals){const filled=vals.filter(v=>v.active).length,coverage=Math.round(filled/5*100);let streak=0;for(const v of vals){if(v.active)streak++;else break}return{filled,coverage,streak}}
function update(grid,panel){const vals=values(grid),m=metrics(vals);panel.querySelector('.cs133-graph').innerHTML=graphSvg(vals);panel.querySelector('[data-cs="coverage"]').textContent=`${m.coverage}%`;panel.querySelector('[data-cs="filled"]').textContent=`${m.filled} / 5`;panel.querySelector('[data-cs="flow"]').textContent=m.streak===5?'Complet':m.streak>=3?'Solide':m.streak>=1?'En construction':'Vide';panel.querySelector('.cs133-flowbar span').style.width=`${m.coverage}%`;panel.querySelector('.cs133-route').innerHTML=vals.map(v=>`<span class="${v.active?'on':''}">${v.phase.label}</span>`).join('<b>→</b>')}
function install(){
  const grid=document.querySelector('.phase-grid');if(!grid)return false;if(grid.dataset.cs133==='1')return true;grid.dataset.cs133='1';const root=setupRoot(grid);root?.classList.add('combo-setup-v133');
  const style=document.createElement('style');style.id='comboSetupV133Style';style.textContent=`
  .combo-setup-v133{--cs-bg:rgba(12,18,25,.72);--cs-panel:rgba(15,22,31,.78);--cs-line:rgba(139,148,158,.12);--cs-text:#e6edf3;--cs-muted:#8b949e;--cs-accent:#58a6ff}
  .combo-setup-v133>.card,.combo-setup-v133 .card{box-shadow:none!important}
  .combo-setup-v133 .phase-grid{grid-template-columns:repeat(5,minmax(160px,1fr))!important;gap:10px!important;margin-top:14px!important}
  .combo-setup-v133 .phase-card{position:relative!important;padding:14px!important;border:1px solid var(--cs-line)!important;background:linear-gradient(180deg,rgba(18,26,36,.74),rgba(12,18,25,.64))!important;border-radius:14px!important;box-shadow:none!important;transition:border-color .16s ease,transform .16s ease!important}
  .combo-setup-v133 .phase-card:hover{border-color:rgba(88,166,255,.24)!important;transform:translateY(-1px)}
  .combo-setup-v133 .phase-card:focus-within{border-color:rgba(88,166,255,.32)!important;box-shadow:0 0 0 2px rgba(88,166,255,.05)!important}
  .combo-setup-v133 .phase-card-head{margin-bottom:8px!important}.combo-setup-v133 .phase-card-head strong,.combo-setup-v133 .phase-card-head h3{font-size:13px!important;letter-spacing:.01em!important}
  .combo-setup-v133 .phase-card input,.combo-setup-v133 .phase-card select{min-height:36px!important;padding:8px 10px!important;border-radius:9px!important;background:rgba(8,13,19,.52)!important}
  .cs133-shell{margin:12px 0 2px;border:1px solid var(--cs-line);border-radius:18px;background:linear-gradient(180deg,rgba(13,20,28,.9),rgba(9,14,20,.72));overflow:hidden}
  .cs133-head{display:flex;justify-content:space-between;align-items:flex-start;gap:18px;padding:18px 20px 14px;border-bottom:1px solid rgba(139,148,158,.09)}
  .cs133-head h2{margin:0;font-size:18px;font-weight:750;letter-spacing:-.01em}.cs133-head p{margin:5px 0 0;color:var(--cs-muted);font-size:12px;max-width:680px}
  .cs133-kpis{display:flex;gap:8px;flex-wrap:wrap}.cs133-kpi{min-width:90px;padding:9px 11px;border:1px solid rgba(139,148,158,.1);border-radius:11px;background:rgba(255,255,255,.018)}.cs133-kpi span{display:block;font-size:10px;color:var(--cs-muted);text-transform:uppercase;letter-spacing:.08em}.cs133-kpi strong{display:block;margin-top:3px;font-size:15px}
  .cs133-chart-wrap{padding:14px 18px 4px}.cs133-graph{width:100%;overflow:hidden}.cs133-graph svg{display:block;width:100%;height:auto;min-height:190px}.cs133-link{stroke:rgba(139,148,158,.14);stroke-width:3;stroke-linecap:round}.cs133-link.on{stroke:rgba(88,166,255,.48)}.cs133-node circle{fill:rgba(17,24,33,.96);stroke:rgba(139,148,158,.18);stroke-width:2}.cs133-node.on circle{fill:rgba(31,111,235,.10);stroke:rgba(88,166,255,.58)}.cs133-code{fill:#8b949e;font-size:12px;font-weight:800;letter-spacing:.07em}.cs133-node.on .cs133-code{fill:#9ecbff}.cs133-label{fill:#c9d1d9;font-size:12px;font-weight:700}.cs133-skill{font:11px/1.25 system-ui,-apple-system,Segoe UI,sans-serif;text-align:center;color:#7d8996;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.cs133-node.on .cs133-skill{color:#d9e7f7}
  .cs133-foot{display:grid;grid-template-columns:1fr minmax(220px,.35fr);gap:14px;align-items:center;padding:4px 20px 17px}.cs133-route{display:flex;align-items:center;gap:7px;min-width:0;overflow:hidden}.cs133-route span{font-size:11px;color:#65717e;white-space:nowrap}.cs133-route span.on{color:#b7c9dc}.cs133-route b{font-weight:400;color:#46515d}.cs133-flowbar{height:5px;border-radius:999px;overflow:hidden;background:rgba(139,148,158,.10)}.cs133-flowbar span{display:block;height:100%;width:0;background:linear-gradient(90deg,rgba(88,166,255,.55),rgba(88,166,255,.9));transition:width .2s ease}
  @media(max-width:1100px){.combo-setup-v133 .phase-grid{grid-template-columns:repeat(2,minmax(220px,1fr))!important}.cs133-head{flex-direction:column}.cs133-kpis{width:100%}.cs133-kpi{flex:1}.cs133-graph svg{min-width:760px}.cs133-graph{overflow-x:auto}.cs133-foot{grid-template-columns:1fr}}
  @media(max-width:650px){.combo-setup-v133 .phase-grid{grid-template-columns:1fr!important}.cs133-shell{border-radius:14px}.cs133-head{padding:15px}.cs133-chart-wrap{padding:10px}.cs133-foot{padding:3px 15px 14px}.cs133-route{display:none}}
  `;document.head.appendChild(style);
  const panel=document.createElement('section');panel.className='cs133-shell';panel.innerHTML=`<div class="cs133-head"><div><h2>Combo Setup</h2><p>Construis le flux PvP par intention. Le graphique reflète immédiatement les compétences choisies pour chaque phase.</p></div><div class="cs133-kpis"><div class="cs133-kpi"><span>Couverture</span><strong data-cs="coverage">0%</strong></div><div class="cs133-kpi"><span>Phases</span><strong data-cs="filled">0 / 5</strong></div><div class="cs133-kpi"><span>Flux</span><strong data-cs="flow">Vide</strong></div></div></div><div class="cs133-chart-wrap"><div class="cs133-graph"></div></div><div class="cs133-foot"><div class="cs133-route"></div><div class="cs133-flowbar"><span></span></div></div>`;
  grid.parentNode.insertBefore(panel,grid);update(grid,panel);
  grid.addEventListener('change',()=>update(grid,panel));grid.addEventListener('input',()=>update(grid,panel));
  const mo=new MutationObserver(()=>update(grid,panel));mo.observe(grid,{childList:true,subtree:true,characterData:true});
  window.BCL_COMBO_SETUP_V133={version:VERSION,refresh:()=>update(grid,panel)};return true
}
function boot(){if(install())return;let tries=0;const t=setInterval(()=>{tries++;if(install()||tries>40)clearInterval(t)},250)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();