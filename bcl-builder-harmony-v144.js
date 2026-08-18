(()=>{'use strict';
const STYLE_ID='bcl-builder-layout-v147-style';
const WRAP_ID='bclBuilderTechnicalV147';
function style(){if(document.getElementById(STYLE_ID))return;const s=document.createElement('style');s.id=STYLE_ID;s.textContent=`
#builderPage{--bg:#0c1219;--panel:#111923;--panel2:#16212d;--soft:#1b2734;--line:rgba(148,163,184,.14);--line2:rgba(148,163,184,.22);--text:#e7edf5;--muted:#8fa0b3;--accent:#8b7cf6;max-width:1320px!important;margin:0 auto!important;padding:18px 20px 52px!important;color:var(--text);font-size:14px;line-height:1.5}
#builderPage #bclBuilderIntroV147{display:flex;justify-content:space-between;align-items:flex-end;gap:18px;margin:4px 0 20px;padding:0 2px}
#builderPage #bclBuilderIntroV147 h2{margin:0;font-size:24px;letter-spacing:-.03em;color:#f3f6fa}
#builderPage #bclBuilderIntroV147 p{margin:5px 0 0;color:var(--muted);max-width:700px}
#builderPage #bclBuilderIntroV147 .ctx{display:flex;gap:8px;flex-wrap:wrap;justify-content:flex-end}
#builderPage #bclBuilderIntroV147 .ctx span{padding:5px 9px;border:1px solid var(--line);border-radius:8px;background:rgba(255,255,255,.025);color:#b9c6d4;font-size:11px}
#builderPage .panel,#builderPage .card,#builderPage .combo-card,#builderPage .builder-smart-panel,#builderPage .optimizer-panel,#builderPage [class*="stat-card"]{box-shadow:none!important}
#builderPage #builderCombatStats{display:grid!important;grid-template-columns:repeat(4,minmax(0,1fr))!important;gap:8px!important;margin:12px 0 16px!important}
#builderPage #builderCombatStats>*{padding:12px 14px!important;border:0!important;border-radius:10px!important;background:var(--panel2)!important;min-width:0!important}
#builderPage #builderCombatStats>*:nth-child(n+5){background:rgba(22,33,45,.68)!important;color:#aeb9c6!important}
#builderPage #builderCombatStats strong,#builderPage #builderCombatStats b{font-size:16px;color:#f1f5f9}
#builderPage .builder-smart-panel,#builderPage .optimizer-panel,#builderPage #bclCombatProfileSafeV141,#builderPage #bclCombatCoachSafeV143{background:var(--panel)!important;border:1px solid var(--line)!important;border-radius:14px!important;padding:17px 18px!important;margin:14px 0!important}
#builderPage #bclCombatProfileSafeV141{background:linear-gradient(180deg,#111923 0%,#0f1720 100%)!important}
#builderPage #bclCombatProfileSafeV141>div:first-child{padding-bottom:10px;border-bottom:1px solid var(--line)}
#builderPage #bclCombatProfileSafeV141>div:nth-child(2){grid-template-columns:minmax(260px,340px) 1fr!important;gap:28px!important;margin-top:10px!important;align-items:center!important}
#builderPage #bclCombatProfileSafeV141 svg{width:100%!important;max-height:250px!important;display:block;margin:auto}
#builderPage .builder-smart-head{padding-bottom:10px!important;margin-bottom:12px!important;border-bottom:1px solid var(--line)!important;align-items:center!important}
#builderPage #builderSuggestions{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:8px!important}
#builderPage .combo-card{background:rgba(255,255,255,.025)!important;border:1px solid var(--line)!important;border-radius:10px!important;padding:13px 14px!important;margin:0!important;transition:background .14s ease,border-color .14s ease!important}
#builderPage .combo-card:hover{background:rgba(139,124,246,.045)!important;border-color:rgba(139,124,246,.28)!important;transform:none!important}
#builderPage .combo-header{gap:12px!important;align-items:flex-start!important}
#builderPage .optimizer-note,#builderPage .muted,#builderPage small{color:var(--muted)!important;line-height:1.48}
#builderPage .badge{background:rgba(139,124,246,.08)!important;border:1px solid rgba(139,124,246,.22)!important;border-radius:6px!important;box-shadow:none!important}
#builderPage button,#builderPage .tab-btn{border-radius:8px!important;min-height:34px!important;box-shadow:none!important;transition:background .12s ease,border-color .12s ease!important}
#builderPage button:hover,#builderPage .tab-btn:hover{transform:none!important}
#builderPage input,#builderPage select{border-radius:8px!important;border-color:var(--line2)!important;background:#0d141c!important;min-height:36px!important;box-shadow:none!important}
#builderPage #bclCombatCoachSafeV143{border-left:3px solid rgba(139,124,246,.55)!important}
#builderPage #${WRAP_ID}{margin:12px 0 16px;border:1px solid var(--line);border-radius:12px;background:rgba(17,25,35,.72);overflow:hidden}
#builderPage #${WRAP_ID}>summary{cursor:pointer;list-style:none;padding:12px 15px;color:#cbd5e1;font-weight:700;display:flex;justify-content:space-between;align-items:center}
#builderPage #${WRAP_ID}>summary::-webkit-details-marker{display:none}
#builderPage #${WRAP_ID}>summary:after{content:'Afficher';font-size:10px;color:var(--muted);font-weight:600}
#builderPage #${WRAP_ID}[open]>summary:after{content:'Masquer'}
#builderPage #${WRAP_ID}>div{padding:0 12px 12px}
#builderPage .combo-sequence{line-height:1.75}
#builderPage hr{border-color:var(--line)!important}
@media(max-width:980px){#builderPage #builderSuggestions{grid-template-columns:1fr!important}#builderPage #builderCombatStats{grid-template-columns:repeat(2,minmax(0,1fr))!important}#builderPage #bclCombatProfileSafeV141>div:nth-child(2){grid-template-columns:1fr!important}}
@media(max-width:620px){#builderPage{padding-left:10px!important;padding-right:10px!important}#builderPage #bclBuilderIntroV147{align-items:flex-start;flex-direction:column}#builderPage #bclBuilderIntroV147 .ctx{justify-content:flex-start}#builderPage #builderCombatStats{grid-template-columns:1fr 1fr!important}}
`;document.head.appendChild(s)}
function intro(){const page=document.getElementById('builderPage');if(!page||document.getElementById('bclBuilderIntroV147'))return;const cls=document.getElementById('classSelector')?.value||'Classe';const spec=document.getElementById('specSelector')?.value||'';const el=document.createElement('section');el.id='bclBuilderIntroV147';el.innerHTML=`<div><h2>Combo Builder</h2><p>Construis, analyse et comprends ton enchaînement sans perdre de vue les informations importantes.</p></div><div class="ctx"><span>${cls}</span>${spec?`<span>${spec}</span>`:''}<span>AnalysisCore</span></div>`;page.insertBefore(el,page.firstChild)}
function technical(){const page=document.getElementById('builderPage');if(!page||document.getElementById(WRAP_ID))return;const nodes=[...page.querySelectorAll('div,section')];const target=nodes.find(el=>/Système CC PvP officiel/i.test(el.textContent||'')&&el.children.length>0&&el.textContent.length<1600);if(!target||target.closest('#'+WRAP_ID))return;const details=document.createElement('details');details.id=WRAP_ID;details.innerHTML='<summary>Règles PvP et détails techniques</summary><div></div>';target.parentNode.insertBefore(details,target);details.querySelector('div').appendChild(target)}
function refreshCtx(){const el=document.querySelector('#bclBuilderIntroV147 .ctx');if(!el)return;const cls=document.getElementById('classSelector')?.value||'Classe';const spec=document.getElementById('specSelector')?.value||'';el.innerHTML=`<span>${cls}</span>${spec?`<span>${spec}</span>`:''}<span>AnalysisCore</span>`}
function boot(){style();intro();technical();refreshCtx();document.getElementById('classSelector')?.addEventListener('change',refreshCtx);document.getElementById('specSelector')?.addEventListener('change',refreshCtx);let t;const page=document.getElementById('builderPage');if(page)new MutationObserver(()=>{clearTimeout(t);t=setTimeout(()=>{intro();technical();refreshCtx()},120)}).observe(page,{childList:true,subtree:true})}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(boot,350),{once:true});else setTimeout(boot,350);
})();