(()=>{'use strict';
const ID='bcl-site-workspace-v152-style';
function install(){if(document.getElementById(ID))return;const s=document.createElement('style');s.id=ID;s.textContent=`
:root{--bcl-w-line:rgba(148,163,184,.12);--bcl-w-text:#e5ebf2;--bcl-w-muted:#8492a1;--bcl-w-accent:#8b7cf6}
body{font-size:13px!important;line-height:1.45!important}
.page:not(#builderPage){max-width:1420px!important;margin:0 auto!important;padding:14px 22px 48px!important}
.page:not(#builderPage) h1{font-size:20px!important;letter-spacing:-.025em!important;margin:2px 0 4px!important}.page:not(#builderPage) h2{font-size:14px!important;margin:18px 0 7px!important}.page:not(#builderPage) h3{font-size:11.5px!important;margin:10px 0 5px!important;text-transform:uppercase!important;letter-spacing:.035em!important;color:#b9c4cf!important}
.page:not(#builderPage) .page-subtitle,.page:not(#builderPage) .muted,.page:not(#builderPage) small{color:var(--bcl-w-muted)!important}
.page:not(#builderPage) .panel,.page:not(#builderPage) .card,.page:not(#builderPage) article,.page:not(#builderPage) section{box-shadow:none!important;background:transparent!important}
.page:not(#builderPage) .panel,.page:not(#builderPage) .card{border:0!important;border-radius:0!important;padding-left:0!important;padding-right:0!important}
.page:not(#builderPage) .grid{gap:0!important}
.page:not(#builderPage) .grid>*{border-bottom:1px solid var(--bcl-w-line)!important;padding-top:8px!important;padding-bottom:8px!important}
.page:not(#builderPage) button,.page:not(#builderPage) .tab-btn,.page:not(#builderPage) .optimizer-btn{min-height:29px!important;padding:0 9px!important;border-radius:4px!important;box-shadow:none!important;font-size:10.5px!important}.page:not(#builderPage) button:hover,.page:not(#builderPage) .tab-btn:hover{transform:none!important}
.page:not(#builderPage) input,.page:not(#builderPage) select,.page:not(#builderPage) textarea{border-radius:4px!important;min-height:30px!important;box-shadow:none!important;background:#0a1016!important}
.page:not(#builderPage) table{font-size:11.5px!important;border-collapse:collapse!important}.page:not(#builderPage) th{font-size:9px!important;text-transform:uppercase!important;letter-spacing:.04em!important;color:var(--bcl-w-muted)!important}.page:not(#builderPage) th,.page:not(#builderPage) td{padding:6px 8px!important;border-color:var(--bcl-w-line)!important}
.page:not(#builderPage) .badge,.page:not(#builderPage) [class*="chip"]{border-radius:3px!important;box-shadow:none!important}
/* Preferences: flat settings list, no cards */
#settingsPage #analysisControlCenterV127{display:block!important;max-width:1120px!important}
#settingsPage #analysisControlCenterV127 .ac-hero{padding:2px 0 12px!important;border:0!important;border-bottom:1px solid var(--bcl-w-line)!important;border-radius:0!important;background:transparent!important}
#settingsPage #analysisControlCenterV127 .ac-hero h2{font-size:18px!important;margin:0 0 3px!important}
#settingsPage #analysisControlCenterV127 .ac-preset-title{margin-top:10px!important;font-size:9px!important;text-transform:uppercase!important;letter-spacing:.06em!important;color:var(--bcl-w-muted)!important}
#settingsPage #analysisControlCenterV127 .ac-presets{display:flex!important;gap:4px!important;flex-wrap:wrap!important;margin-top:5px!important}
#settingsPage #analysisControlCenterV127 .ac-preset{padding:0 8px!important;min-height:26px!important;border-radius:3px!important;background:transparent!important;border-color:var(--bcl-w-line)!important}
#settingsPage #analysisControlCenterV127 .ac-preset.active{background:rgba(139,124,246,.10)!important;border-color:rgba(139,124,246,.38)!important;color:#ddd8ff!important;box-shadow:none!important}
#settingsPage #analysisControlCenterV127 .ac-preset-note{font-size:9.5px!important;color:var(--bcl-w-muted)!important;margin-top:5px!important}
#settingsPage #analysisControlCenterV127 .ac-grid{display:block!important}
#settingsPage #analysisControlCenterV127 .ac-card{display:grid!important;grid-template-columns:180px minmax(0,1fr)!important;column-gap:24px!important;row-gap:0!important;padding:13px 0!important;margin:0!important;border:0!important;border-bottom:1px solid var(--bcl-w-line)!important;border-radius:0!important;background:transparent!important}
#settingsPage #analysisControlCenterV127 .ac-card h3{grid-column:1!important;grid-row:1 / span 20!important;align-self:start!important;margin:2px 0 0!important;font-size:10px!important;text-transform:uppercase!important;letter-spacing:.055em!important;color:#b4bfca!important}
#settingsPage #analysisControlCenterV127 .ac-field,#settingsPage #analysisControlCenterV127 .ac-check,#settingsPage #analysisControlCenterV127 .ac-private,#settingsPage #analysisControlCenterV127 .ac-advanced{grid-column:2!important}
#settingsPage #analysisControlCenterV127 .ac-field{display:grid!important;grid-template-columns:minmax(170px,1fr) minmax(150px,220px)!important;align-items:center!important;gap:18px!important;margin:0!important;padding:5px 0!important;border-bottom:1px solid rgba(148,163,184,.065)!important}
#settingsPage #analysisControlCenterV127 .ac-field:last-child{border-bottom:0!important}
#settingsPage #analysisControlCenterV127 .ac-field>span{font-size:10.5px!important;color:#9eabb8!important}
#settingsPage #analysisControlCenterV127 .ac-field select,#settingsPage #analysisControlCenterV127 .ac-field input{min-height:28px!important;font-size:10.5px!important;width:100%!important}
#settingsPage #analysisControlCenterV127 .ac-check{display:flex!important;align-items:center!important;gap:7px!important;margin:0!important;padding:6px 0!important;border-bottom:1px solid rgba(148,163,184,.065)!important;font-size:10.5px!important}
#settingsPage #analysisControlCenterV127 .ac-check input{width:auto!important;min-height:auto!important}
#settingsPage #analysisControlCenterV127 .ac-advanced{display:contents!important}#settingsPage #analysisControlCenterV127 .ac-advanced[hidden]{display:none!important}
#settingsPage #analysisControlCenterV127 .ac-private{padding:6px 0 0!important;border:0!important;color:#7f8d9b!important;font-size:9px!important}
#settingsPage #analysisControlCenterV127 .ac-actions{display:flex!important;gap:5px!important;align-items:center!important;padding:10px 0 0!important}
@media(max-width:800px){.page:not(#builderPage){padding:10px!important}#settingsPage #analysisControlCenterV127 .ac-card{grid-template-columns:1fr!important}#settingsPage #analysisControlCenterV127 .ac-card h3{grid-column:1!important;grid-row:auto!important;margin-bottom:7px!important}#settingsPage #analysisControlCenterV127 .ac-field,#settingsPage #analysisControlCenterV127 .ac-check,#settingsPage #analysisControlCenterV127 .ac-private{grid-column:1!important}#settingsPage #analysisControlCenterV127 .ac-field{grid-template-columns:1fr!important;gap:3px!important}}
`;document.head.appendChild(s)}
function boot(){install()}if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();})();