(()=>{'use strict';
const STYLE_ID='bcl-builder-harmony-v144-style';
function installStyle(){if(document.getElementById(STYLE_ID))return;const s=document.createElement('style');s.id=STYLE_ID;s.textContent=`
#builderPage{--bcl-surface:#171a1d;--bcl-surface2:#1d2125;--bcl-soft:#20252a;--bcl-line:#30363c;--bcl-text:#e6e9ec;--bcl-muted:#9aa3ac;--bcl-accent:#8b73c9;max-width:1180px!important;margin:18px auto 54px!important;padding:0 18px 44px!important;color:var(--bcl-text);font-size:14px;line-height:1.45}
#builderPage>*{max-width:100%}
#builderPage .page-title,#builderPage h1{font-size:20px!important;letter-spacing:-.02em;color:#f0f2f4!important;margin-bottom:4px!important}
#builderPage .page-subtitle{max-width:720px;color:var(--bcl-muted)!important;line-height:1.5}
#builderPage .panel,#builderPage .card,#builderPage .combo-card,#builderPage .builder-smart-panel,#builderPage .optimizer-panel,#builderPage [class*="stat-card"]{box-shadow:none!important;border-color:var(--bcl-line)!important}
#builderPage .builder-smart-panel,#builderPage .optimizer-panel,#builderPage #bclCombatProfileSafeV141,#builderPage #bclCombatCoachSafeV143{background:var(--bcl-surface)!important;border:1px solid var(--bcl-line)!important;border-radius:7px!important;padding:16px 18px!important;margin:12px 0!important}
#builderPage #builderCombatStats{display:grid!important;grid-template-columns:repeat(4,minmax(0,1fr))!important;gap:6px!important;margin:12px 0!important}
#builderPage #builderCombatStats>*{min-width:0!important;padding:10px 12px!important;border:1px solid var(--bcl-line)!important;border-radius:5px!important;background:var(--bcl-surface2)!important;box-shadow:none!important}
#builderPage #builderCombatStats>*:nth-child(n+5){opacity:.88}
#builderPage #builderCombatStats *{text-shadow:none!important}
#builderPage .combo-card{background:var(--bcl-surface2)!important;border:1px solid var(--bcl-line)!important;border-radius:5px!important;padding:11px 13px!important;margin:5px 0!important;transition:background .12s ease,border-color .12s ease}
#builderPage .combo-card:hover{background:#23282d!important;border-color:#424a52!important;transform:none!important}
#builderPage .combo-header{gap:10px!important;align-items:center!important}
#builderPage .optimizer-note,#builderPage .muted,#builderPage small{color:var(--bcl-muted)!important;line-height:1.45}
#builderPage .badge{border:1px solid #3a4148!important;background:#20252a!important;border-radius:4px!important;box-shadow:none!important}
#builderPage button,#builderPage .tab-btn{border-radius:4px!important;min-height:32px!important;box-shadow:none!important;transition:background .12s ease,border-color .12s ease!important}
#builderPage button:hover,#builderPage .tab-btn:hover{transform:none!important}
#builderPage input,#builderPage select{border-radius:4px!important;border-color:#394047!important;background:#14171a!important;min-height:34px!important;box-shadow:none!important}
#builderPage #bclCombatProfileSafeV141{display:grid!important;grid-template-columns:1fr!important}
#builderPage #bclCombatProfileSafeV141>div:first-child{padding-bottom:10px;border-bottom:1px solid var(--bcl-line)}
#builderPage #bclCombatProfileSafeV141>div:nth-child(2){grid-template-columns:minmax(230px,310px) minmax(300px,1fr)!important;gap:32px!important;margin-top:8px!important;align-items:center!important}
#builderPage #bclCombatProfileSafeV141 svg{width:100%!important;max-height:235px!important;display:block;margin:auto}
#builderPage #bclCombatCoachSafeV143{border-left:3px solid #65549a!important}
#builderPage .builder-smart-head{padding-bottom:10px!important;margin-bottom:10px!important;border-bottom:1px solid var(--bcl-line)!important}
#builderPage #builderSuggestions{display:grid!important;grid-template-columns:repeat(auto-fit,minmax(245px,1fr))!important;gap:6px!important}
#builderPage .combo-sequence{line-height:1.65}
#builderPage hr{border-color:var(--bcl-line)!important}
#builderPage [style*="border:1px solid rgba"],#builderPage [style*="border: 1px solid rgba"]{border-color:var(--bcl-line)!important}
#builderPage [style*="border-radius:14px"],#builderPage [style*="border-radius: 14px"],#builderPage [style*="border-radius:18px"],#builderPage [style*="border-radius: 18px"]{border-radius:7px!important}
@media(max-width:900px){#builderPage{margin-top:8px!important;padding-left:10px!important;padding-right:10px!important}#builderPage #builderCombatStats{grid-template-columns:repeat(2,minmax(0,1fr))!important}#builderPage #bclCombatProfileSafeV141>div:nth-child(2){grid-template-columns:1fr!important;gap:12px!important}}
@media(max-width:560px){#builderPage #builderCombatStats{grid-template-columns:1fr 1fr!important}#builderPage .builder-smart-panel,#builderPage .optimizer-panel,#builderPage #bclCombatProfileSafeV141,#builderPage #bclCombatCoachSafeV143{padding:12px!important}}
`;document.head.appendChild(s)}
function labels(){const profile=document.getElementById('bclCombatProfileSafeV141');if(profile)profile.setAttribute('aria-label','Profil de combat du combo');const coach=document.getElementById('bclCombatCoachSafeV143');if(coach)coach.setAttribute('aria-label','Conseils de combat AnalysisCore')}
function boot(){installStyle();labels();let t;const page=document.getElementById('builderPage');if(page)new MutationObserver(()=>{clearTimeout(t);t=setTimeout(labels,100)}).observe(page,{childList:true,subtree:true})}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(boot,350),{once:true});else setTimeout(boot,350);
})();