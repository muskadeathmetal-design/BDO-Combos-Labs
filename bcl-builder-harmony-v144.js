(()=>{'use strict';
const STYLE_ID='bcl-builder-redesign-v148-style';
const INTRO_ID='bclBuilderHeroV148';
const DASH_ID='bclBuilderDashboardV148';
const ANALYSIS_ID='bclBuilderAnalysisV148';
const TECH_ID='bclBuilderTechnicalV148';
function css(){if(document.getElementById(STYLE_ID))return;const s=document.createElement('style');s.id=STYLE_ID;s.textContent=`
#builderPage{--r148-bg:#0a0f15;--r148-panel:#101720;--r148-panel2:#131c27;--r148-panel3:#172230;--r148-line:rgba(151,169,190,.13);--r148-line2:rgba(151,169,190,.22);--r148-text:#e8eef5;--r148-muted:#8798aa;--r148-soft:#b7c4d1;--r148-accent:#8b7cf6;--r148-accent2:#58a6ff;max-width:1380px!important;margin:0 auto!important;padding:24px 24px 64px!important;color:var(--r148-text);font-size:14px;line-height:1.5}
#builderPage *{box-shadow:none!important}
#builderPage #${INTRO_ID}{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:24px;align-items:end;margin:0 0 22px;padding:0 2px 18px;border-bottom:1px solid var(--r148-line)}
#builderPage #${INTRO_ID} h2{margin:0;color:#f4f7fb;font-size:27px;line-height:1.08;letter-spacing:-.035em}
#builderPage #${INTRO_ID} p{max-width:700px;margin:7px 0 0;color:var(--r148-muted);font-size:13px}
#builderPage #${INTRO_ID} .r148-context{display:flex;flex-wrap:wrap;gap:7px;justify-content:flex-end}
#builderPage #${INTRO_ID} .r148-context span{display:inline-flex;align-items:center;min-height:29px;padding:0 9px;border:1px solid var(--r148-line);border-radius:8px;background:rgba(255,255,255,.025);color:#b9c6d4;font-size:10.5px;font-weight:700;letter-spacing:.015em}
#builderPage #${DASH_ID}{display:grid;grid-template-columns:minmax(0,1.12fr) minmax(340px,.88fr);gap:14px;align-items:stretch;margin:0 0 16px}
#builderPage #${DASH_ID}>.r148-summary,#builderPage #${DASH_ID}>#bclCombatProfileSafeV141{margin:0!important;min-width:0}
#builderPage .r148-summary{padding:18px;border:1px solid var(--r148-line);border-radius:16px;background:linear-gradient(180deg,var(--r148-panel2),var(--r148-panel));overflow:hidden}
#builderPage .r148-section-label{display:flex;justify-content:space-between;gap:14px;align-items:flex-start;margin-bottom:13px}
#builderPage .r148-section-label strong{font-size:14px;color:#edf3f8}
#builderPage .r148-section-label span{font-size:10.5px;color:var(--r148-muted)}
#builderPage #builderCombatStats{display:grid!important;grid-template-columns:repeat(4,minmax(0,1fr))!important;gap:7px!important;margin:0!important}
#builderPage #builderCombatStats>*{min-width:0!important;padding:11px 12px!important;border:1px solid rgba(151,169,190,.09)!important;border-radius:10px!important;background:rgba(6,11,17,.30)!important}
#builderPage #builderCombatStats>*:nth-child(-n+4){background:rgba(139,124,246,.045)!important;border-color:rgba(139,124,246,.13)!important}
#builderPage #builderCombatStats>*:nth-child(n+9){opacity:.68}
#builderPage #builderCombatStats span,#builderPage #builderCombatStats small{font-size:9.5px!important;color:#7f91a4!important;letter-spacing:.015em}
#builderPage #builderCombatStats strong,#builderPage #builderCombatStats b{display:block;margin-top:3px;font-size:15px!important;color:#eef4f9!important}
#builderPage #bclCombatProfileSafeV141{padding:17px 18px!important;border:1px solid var(--r148-line)!important;border-radius:16px!important;background:linear-gradient(180deg,#111a25,#0e151e)!important;overflow:hidden}
#builderPage #bclCombatProfileSafeV141>div:first-child{padding-bottom:9px!important;border-bottom:1px solid var(--r148-line)!important}
#builderPage #bclCombatProfileSafeV141>div:nth-child(2){grid-template-columns:minmax(210px,280px) minmax(150px,1fr)!important;gap:18px!important;margin-top:7px!important;align-items:center!important}
#builderPage #bclCombatProfileSafeV141 svg{display:block;width:100%!important;max-height:220px!important;margin:auto!important}
#builderPage #${ANALYSIS_ID}{display:grid;grid-template-columns:minmax(0,1.36fr) minmax(320px,.64fr);gap:14px;align-items:start;margin-top:14px}
#builderPage #${ANALYSIS_ID}>*{min-width:0;margin:0!important}
#builderPage .builder-smart-panel,#builderPage .optimizer-panel,#builderPage #bclCombatCoachSafeV143{padding:18px!important;border:1px solid var(--r148-line)!important;border-radius:16px!important;background:var(--r148-panel)!important}
#builderPage #bclCombatCoachSafeV143{position:sticky;top:14px;border-top:2px solid rgba(139,124,246,.5)!important}
#builderPage .builder-smart-head{display:flex!important;align-items:center!important;gap:14px!important;padding-bottom:12px!important;margin-bottom:13px!important;border-bottom:1px solid var(--r148-line)!important}
#builderPage .builder-smart-head h3,#builderPage .builder-smart-head strong{font-size:15px!important}
#builderPage #builderSuggestions{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:8px!important}
#builderPage .combo-card{margin:0!important;padding:13px 14px!important;border:1px solid var(--r148-line)!important;border-radius:11px!important;background:rgba(255,255,255,.024)!important;transition:border-color .14s ease,background .14s ease!important}
#builderPage .combo-card:hover{transform:none!important;border-color:rgba(139,124,246,.30)!important;background:rgba(139,124,246,.045)!important}
#builderPage .combo-header{align-items:flex-start!important;gap:10px!important}
#builderPage .combo-sequence{line-height:1.7!important;color:#aebdca!important}
#builderPage .optimizer-note,#builderPage .muted,#builderPage small{color:var(--r148-muted)!important;line-height:1.5!important}
#builderPage .badge{border:1px solid rgba(139,124,246,.22)!important;border-radius:6px!important;background:rgba(139,124,246,.08)!important;color:#c5bbff!important}
#builderPage button,#builderPage .tab-btn{min-height:34px!important;border-radius:8px!important;transition:border-color .12s ease,background .12s ease!important}
#builderPage button:hover,#builderPage .tab-btn:hover{transform:none!important}
#builderPage input,#builderPage select,#builderPage textarea{min-height:36px!important;border-radius:8px!important;border-color:var(--r148-line2)!important;background:#0b121a!important;color:var(--r148-text)!important}
#builderPage #${TECH_ID}{margin:14px 0 0;border:1px solid var(--r148-line);border-radius:13px;background:rgba(16,23,32,.72);overflow:hidden}
#builderPage #${TECH_ID}>summary{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:12px 15px;cursor:pointer;list-style:none;color:#c9d4df;font-size:11px;font-weight:750;letter-spacing:.01em}
#builderPage #${TECH_ID}>summary::-webkit-details-marker{display:none}
#builderPage #${TECH_ID}>summary:after{content:'Afficher';font-size:9.5px;color:var(--r148-muted);font-weight:600}
#builderPage #${TECH_ID}[open]>summary:after{content:'Masquer'}
#builderPage #${TECH_ID}>div{padding:0 12px 12px}
#builderPage #${TECH_ID} [style*="border"]{border-color:var(--r148-line)!important}
#builderPage .page-placeholder,#builderPage .empty{border-color:var(--r148-line)!important;background:rgba(255,255,255,.018)!important;color:var(--r148-muted)!important}
#builderPage hr{border-color:var(--r148-line)!important}
@media(max-width:1120px){#builderPage #${DASH_ID}{grid-template-columns:1fr}#builderPage #${ANALYSIS_ID}{grid-template-columns:1fr}#builderPage #bclCombatCoachSafeV143{position:static}#builderPage #bclCombatProfileSafeV141>div:nth-child(2){grid-template-columns:minmax(230px,330px) 1fr!important}}
@media(max-width:820px){#builderPage{padding:16px 12px 48px!important}#builderPage #${INTRO_ID}{grid-template-columns:1fr;align-items:start}#builderPage #${INTRO_ID} .r148-context{justify-content:flex-start}#builderPage #builderCombatStats{grid-template-columns:repeat(2,minmax(0,1fr))!important}#builderPage #builderSuggestions{grid-template-columns:1fr!important}}
@media(max-width:560px){#builderPage #${INTRO_ID} h2{font-size:23px}#builderPage #bclCombatProfileSafeV141>div:nth-child(2){grid-template-columns:1fr!important}#builderPage #builderCombatStats{grid-template-columns:1fr 1fr!important}.r148-summary,#builderPage .builder-smart-panel,#builderPage .optimizer-panel,#builderPage #bclCombatCoachSafeV143,#builderPage #bclCombatProfileSafeV141{border-radius:12px!important;padding:14px!important}}
`;document.head.appendChild(s)}
function contextHtml(){const cls=document.getElementById('classSelector')?.value||'Classe';const spec=document.getElementById('specSelector')?.value||'';return`<span>${cls}</span>${spec?`<span>${spec}</span>`:''}<span>AnalysisCore V2</span>`}
function hero(){const page=document.getElementById('builderPage');if(!page)return;let el=document.getElementById(INTRO_ID);if(!el){el=document.createElement('section');el.id=INTRO_ID;el.innerHTML='<div><h2>Combo Builder</h2><p>Construis ton enchaînement, lis son profil de combat et comprends les décisions tactiques proposées par AnalysisCore.</p></div><div class="r148-context"></div>';page.insertBefore(el,page.firstChild)}el.querySelector('.r148-context').innerHTML=contextHtml()}
function findCcBlock(page){const nodes=[...page.querySelectorAll('section,div')];return nodes.find(el=>{if(el.closest('#'+TECH_ID))return false;const text=(el.textContent||'').trim();return /Système CC PvP officiel/i.test(text)&&text.length>40&&text.length<1800&&el.children.length>0})||null}
function dashboard(){const page=document.getElementById('builderPage');const stats=document.getElementById('builderCombatStats');const profile=document.getElementById('bclCombatProfileSafeV141');if(!page||!stats||!profile)return;let dash=document.getElementById(DASH_ID);if(!dash){dash=document.createElement('section');dash.id=DASH_ID;const summary=document.createElement('div');summary.className='r148-summary';summary.innerHTML='<div class="r148-section-label"><div><strong>Résumé du combat</strong><div><span>Les indicateurs clés du combo en cours.</span></div></div><span>LIVE</span></div>';stats.parentNode.insertBefore(dash,stats);dash.appendChild(summary);summary.appendChild(stats)}if(profile.parentNode!==dash)dash.appendChild(profile)}
function analysis(){const page=document.getElementById('builderPage');if(!page)return;const smart=page.querySelector('.builder-smart-panel')||document.getElementById('builderSuggestions')?.closest('section,div');const coach=document.getElementById('bclCombatCoachSafeV143');if(!smart||!coach||smart===coach)return;let wrap=document.getElementById(ANALYSIS_ID);if(!wrap){wrap=document.createElement('section');wrap.id=ANALYSIS_ID;smart.parentNode.insertBefore(wrap,smart)}if(smart.parentNode!==wrap)wrap.appendChild(smart);if(coach.parentNode!==wrap)wrap.appendChild(coach)}
function technical(){const page=document.getElementById('builderPage');if(!page||document.getElementById(TECH_ID))return;const target=findCcBlock(page);if(!target)return;const details=document.createElement('details');details.id=TECH_ID;details.innerHTML='<summary>Règles PvP, CC et détails techniques</summary><div></div>';target.parentNode.insertBefore(details,target);details.querySelector('div').appendChild(target)}
function arrange(){hero();dashboard();analysis();technical()}
function boot(){css();arrange();document.getElementById('classSelector')?.addEventListener('change',hero);document.getElementById('specSelector')?.addEventListener('change',hero);let timer;const page=document.getElementById('builderPage');if(page)new MutationObserver(()=>{clearTimeout(timer);timer=setTimeout(arrange,120)}).observe(page,{childList:true,subtree:true})}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(boot,420),{once:true});else setTimeout(boot,420);
})();