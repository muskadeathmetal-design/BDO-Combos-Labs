(()=>{'use strict';
const STYLE_ID='bcl-builder-harmony-v144-style';
function installStyle(){if(document.getElementById(STYLE_ID))return;const s=document.createElement('style');s.id=STYLE_ID;s.textContent=`
#builderPage{--bcl-surface:rgba(12,18,26,.72);--bcl-soft:rgba(255,255,255,.025);--bcl-line:rgba(139,148,158,.10);--bcl-line2:rgba(139,148,158,.16);--bcl-text:#d7e0e9;--bcl-muted:#8190a0;--bcl-blue:#75b7ff;max-width:1440px;margin:0 auto;padding-bottom:44px}
#builderPage .page-title,#builderPage h1{letter-spacing:-.025em;color:#e8eef5}
#builderPage .page-subtitle{max-width:760px;line-height:1.6;color:#8291a1}
#builderPage .panel,#builderPage .card,#builderPage .combo-card,#builderPage .builder-smart-panel,#builderPage .optimizer-panel,#builderPage [class*="stat-card"]{border-color:var(--bcl-line)!important;box-shadow:none!important}
#builderPage .builder-smart-panel,#builderPage .optimizer-panel,#builderPage #bclCombatProfileSafeV141,#builderPage #bclCombatCoachSafeV143{background:var(--bcl-surface)!important;border:1px solid var(--bcl-line)!important;border-radius:18px!important;padding:18px 20px!important;margin-top:18px!important}
#builderPage #builderCombatStats{display:grid!important;grid-template-columns:repeat(4,minmax(150px,1fr))!important;gap:10px!important;margin:18px 0!important}
#builderPage #builderCombatStats>*{min-width:0!important;padding:12px 14px!important;border:1px solid var(--bcl-line)!important;border-radius:12px!important;background:var(--bcl-soft)!important}
#builderPage #builderCombatStats>*:nth-child(n+5){opacity:.72}
#builderPage .combo-card{background:rgba(255,255,255,.018)!important;border:1px solid var(--bcl-line)!important;border-radius:13px!important;padding:13px 15px!important;margin:8px 0!important;transition:border-color .16s ease,background .16s ease,transform .16s ease}
#builderPage .combo-card:hover{border-color:rgba(117,183,255,.25)!important;background:rgba(117,183,255,.035)!important;transform:translateY(-1px)}
#builderPage .combo-header{gap:14px!important;align-items:center!important}
#builderPage .optimizer-note,#builderPage .muted,#builderPage small{color:var(--bcl-muted)!important;line-height:1.5}
#builderPage .badge{border-color:var(--bcl-line2)!important;background:rgba(255,255,255,.025)!important}
#builderPage button,#builderPage .tab-btn{border-radius:10px!important;min-height:34px;transition:background .15s ease,border-color .15s ease,transform .15s ease}
#builderPage button:hover,#builderPage .tab-btn:hover{transform:translateY(-1px)}
#builderPage input,#builderPage select{border-radius:10px!important;border-color:var(--bcl-line2)!important;background:rgba(6,10,15,.62)!important}
#builderPage #bclCombatProfileSafeV141>div:nth-child(2){grid-template-columns:minmax(250px,380px) minmax(240px,1fr)!important;gap:28px!important;margin-top:10px}
#builderPage #bclCombatProfileSafeV141 svg{width:100%;max-height:280px;display:block;margin:auto}
#builderPage #bclCombatCoachSafeV143{border-left:2px solid rgba(117,183,255,.38)!important}
#builderPage .builder-smart-head{padding-bottom:12px;margin-bottom:8px;border-bottom:1px solid var(--bcl-line)}
#builderPage #builderSuggestions{display:grid;gap:8px}
#builderPage .combo-sequence{line-height:1.8}
#builderPage hr{border-color:var(--bcl-line)!important}
@media(max-width:900px){#builderPage #builderCombatStats{grid-template-columns:repeat(2,minmax(130px,1fr))!important}#builderPage #bclCombatProfileSafeV141>div:nth-child(2){grid-template-columns:1fr!important}#builderPage{padding-left:10px;padding-right:10px}}
@media(max-width:560px){#builderPage #builderCombatStats{grid-template-columns:1fr 1fr!important}#builderPage .builder-smart-panel,#builderPage .optimizer-panel,#builderPage #bclCombatProfileSafeV141,#builderPage #bclCombatCoachSafeV143{padding:14px!important;border-radius:14px!important}}
`;document.head.appendChild(s)}
function addSectionLabels(){const page=document.getElementById('builderPage');if(!page)return;const profile=document.getElementById('bclCombatProfileSafeV141');if(profile&&!profile.dataset.harmony){profile.dataset.harmony='1';profile.setAttribute('aria-label','Profil de combat du combo')}const coach=document.getElementById('bclCombatCoachSafeV143');if(coach&&!coach.dataset.harmony){coach.dataset.harmony='1';coach.setAttribute('aria-label','Conseils de combat AnalysisCore')}}
function boot(){installStyle();addSectionLabels();let t;const page=document.getElementById('builderPage');if(page)new MutationObserver(()=>{clearTimeout(t);t=setTimeout(addSectionLabels,100)}).observe(page,{childList:true,subtree:true})}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(boot,350),{once:true});else setTimeout(boot,350);
})();