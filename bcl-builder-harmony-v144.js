(()=>{'use strict';
const SID='bcl-workspace-v149-style',TECH='bclWorkspaceTechV149';
function css(){if(document.getElementById(SID))return;const s=document.createElement('style');s.id=SID;s.textContent=`
#builderPage{--w-bg:#0b1118;--w-line:rgba(148,163,184,.13);--w-text:#e7edf4;--w-muted:#8493a3;--w-accent:#8b7cf6;max-width:1420px!important;margin:0 auto!important;padding:16px 22px 54px!important;color:var(--w-text);font-size:13px;line-height:1.45}
#builderPage *{box-shadow:none!important}
#builderPage #bclBuilderHeroV148,#builderPage #bclBuilderDashboardV148,#builderPage #bclBuilderAnalysisV148{display:contents!important}
#builderPage #bclBuilderHeroV148{display:none!important}
#builderPage #builderCombatStats{display:flex!important;align-items:stretch!important;gap:0!important;margin:8px 0 12px!important;padding:0!important;border-top:1px solid var(--w-line)!important;border-bottom:1px solid var(--w-line)!important;background:transparent!important;overflow-x:auto}
#builderPage #builderCombatStats>*{flex:1 0 105px!important;min-width:105px!important;margin:0!important;padding:9px 11px!important;border:0!important;border-right:1px solid var(--w-line)!important;border-radius:0!important;background:transparent!important}
#builderPage #builderCombatStats>*:last-child{border-right:0!important}
#builderPage #builderCombatStats>*:nth-child(n+7){opacity:.64}
#builderPage #builderCombatStats span,#builderPage #builderCombatStats small{font-size:9px!important;color:var(--w-muted)!important;white-space:nowrap}
#builderPage #builderCombatStats strong,#builderPage #builderCombatStats b{display:block!important;margin-top:2px!important;font-size:14px!important;color:#f0f4f8!important;white-space:nowrap}
#builderPage .builder-smart-panel,#builderPage .optimizer-panel,#builderPage #bclCombatProfileSafeV141,#builderPage #bclCombatCoachSafeV143{margin:10px 0!important;padding:13px 14px!important;border:0!important;border-top:1px solid var(--w-line)!important;border-radius:0!important;background:transparent!important}
#builderPage #bclCombatProfileSafeV141{display:grid!important;grid-template-columns:190px minmax(0,1fr)!important;align-items:center!important;gap:18px!important;min-height:190px}
#builderPage #bclCombatProfileSafeV141>div:first-child{border:0!important;padding:0!important}
#builderPage #bclCombatProfileSafeV141>div:nth-child(2){display:grid!important;grid-template-columns:210px minmax(220px,1fr)!important;gap:22px!important;margin:0!important;align-items:center!important}
#builderPage #bclCombatProfileSafeV141 svg{width:205px!important;max-height:190px!important;margin:0!important}
#builderPage .builder-smart-head{display:flex!important;align-items:center!important;gap:12px!important;padding:0 0 9px!important;margin:0 0 8px!important;border-bottom:1px solid var(--w-line)!important}
#builderPage #builderSuggestions{display:grid!important;grid-template-columns:repeat(3,minmax(0,1fr))!important;gap:5px!important}
#builderPage .combo-card{margin:0!important;padding:9px 10px!important;border:0!important;border-left:2px solid rgba(139,124,246,.22)!important;border-radius:0!important;background:rgba(255,255,255,.018)!important}
#builderPage .combo-card:hover{transform:none!important;background:rgba(139,124,246,.035)!important;border-left-color:rgba(139,124,246,.62)!important}
#builderPage .combo-header{gap:8px!important}
#builderPage #bclCombatCoachSafeV143{border-top:1px solid var(--w-line)!important;border-left:0!important}
#builderPage #bclCombatCoachSafeV143 article{border-radius:4px!important;background:rgba(255,255,255,.015)!important}
#builderPage .badge{border:0!important;border-radius:3px!important;background:rgba(139,124,246,.10)!important;box-shadow:none!important}
#builderPage button,#builderPage .tab-btn{min-height:30px!important;border-radius:5px!important;box-shadow:none!important}
#builderPage button:hover,#builderPage .tab-btn:hover{transform:none!important}
#builderPage input,#builderPage select,#builderPage textarea{min-height:32px!important;border-radius:5px!important;border-color:var(--w-line)!important;background:#0a1016!important;box-shadow:none!important}
#builderPage .optimizer-note,#builderPage .muted,#builderPage small{color:var(--w-muted)!important}
#builderPage #${TECH}{margin:10px 0 0!important;border-top:1px solid var(--w-line)!important;border-bottom:1px solid var(--w-line)!important;background:transparent!important}
#builderPage #${TECH}>summary{padding:9px 2px!important;cursor:pointer;list-style:none;color:#aab6c2;font-size:10.5px;font-weight:700}
#builderPage #${TECH}>summary::-webkit-details-marker{display:none}
#builderPage #${TECH}>summary:after{content:'  ·  afficher les détails';color:#657383;font-weight:500}
#builderPage #${TECH}[open]>summary:after{content:'  ·  masquer'}
#builderPage #${TECH}>div{padding:2px 0 10px!important}
#builderPage hr{border-color:var(--w-line)!important}
@media(max-width:1000px){#builderPage #builderSuggestions{grid-template-columns:repeat(2,minmax(0,1fr))!important}#builderPage #bclCombatProfileSafeV141{grid-template-columns:1fr!important}#builderPage #bclCombatProfileSafeV141>div:nth-child(2){grid-template-columns:200px 1fr!important}}
@media(max-width:700px){#builderPage{padding:10px!important}#builderPage #builderSuggestions{grid-template-columns:1fr!important}#builderPage #bclCombatProfileSafeV141>div:nth-child(2){grid-template-columns:1fr!important}#builderPage #builderCombatStats>*{flex-basis:95px!important;min-width:95px!important}}
`;document.head.appendChild(s)}
function unwrapOld(){['bclBuilderDashboardV148','bclBuilderAnalysisV148'].forEach(id=>{const w=document.getElementById(id);if(!w)return;while(w.firstChild)w.parentNode.insertBefore(w.firstChild,w);w.remove()});document.getElementById('bclBuilderHeroV148')?.remove();document.getElementById('bclBuilderTechnicalV148')?.replaceWith(...document.getElementById('bclBuilderTechnicalV148').querySelector('div')?.childNodes||[])}
function tech(){const page=document.getElementById('builderPage');if(!page||document.getElementById(TECH))return;const target=[...page.querySelectorAll('section,div')].find(el=>{const t=(el.textContent||'').trim();return !el.closest('#'+TECH)&&/Système CC PvP officiel/i.test(t)&&t.length>40&&t.length<1800&&el.children.length>0});if(!target)return;const d=document.createElement('details');d.id=TECH;d.innerHTML='<summary>Règles PvP / CC / données techniques</summary><div></div>';target.parentNode.insertBefore(d,target);d.querySelector('div').appendChild(target)}
function arrange(){unwrapOld();tech()}
function boot(){css();arrange();let tm;const p=document.getElementById('builderPage');if(p)new MutationObserver(()=>{clearTimeout(tm);tm=setTimeout(arrange,120)}).observe(p,{childList:true,subtree:true})}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(boot,420),{once:true});else setTimeout(boot,420);
})();