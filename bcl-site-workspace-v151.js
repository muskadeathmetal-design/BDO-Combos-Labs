(()=>{'use strict';
const ID='bcl-site-workspace-v151-style';
function install(){if(document.getElementById(ID))return;const s=document.createElement('style');s.id=ID;s.textContent=`
:root{--bcl-w-line:rgba(148,163,184,.13);--bcl-w-line2:rgba(148,163,184,.20);--bcl-w-text:#e5ebf2;--bcl-w-muted:#8492a1;--bcl-w-accent:#8b7cf6;--bcl-w-soft:rgba(255,255,255,.018)}
body{font-size:13px!important;line-height:1.45!important}
main,.main,.content,.page{scroll-margin-top:60px}
.page:not(#builderPage){max-width:1420px!important;margin:0 auto!important;padding:16px 22px 50px!important}
.page:not(#builderPage) h1{font-size:20px!important;line-height:1.2!important;letter-spacing:-.025em!important;margin:4px 0 5px!important}.page:not(#builderPage) h2{font-size:15px!important;margin:14px 0 7px!important}.page:not(#builderPage) h3{font-size:12.5px!important;margin:10px 0 6px!important}
.page:not(#builderPage) .page-subtitle,.page:not(#builderPage) .muted,.page:not(#builderPage) small{color:var(--bcl-w-muted)!important}
.page:not(#builderPage) .panel,.page:not(#builderPage) .card,.page:not(#builderPage) article,.page:not(#builderPage) section{box-shadow:none!important}
.page:not(#builderPage) .panel,.page:not(#builderPage) .card{border-color:var(--bcl-w-line)!important;border-radius:5px!important;background:transparent!important}
.page:not(#builderPage) .grid{gap:7px!important}
.page:not(#builderPage) button,.page:not(#builderPage) .tab-btn,.page:not(#builderPage) .optimizer-btn{min-height:30px!important;padding:0 10px!important;border-radius:4px!important;box-shadow:none!important;font-size:11px!important}.page:not(#builderPage) button:hover,.page:not(#builderPage) .tab-btn:hover{transform:none!important}
.page:not(#builderPage) input,.page:not(#builderPage) select,.page:not(#builderPage) textarea{border-radius:4px!important;min-height:32px!important;box-shadow:none!important}
.page:not(#builderPage) table{font-size:11.5px!important}.page:not(#builderPage) th{font-size:9.5px!important;text-transform:uppercase!important;letter-spacing:.035em!important;color:var(--bcl-w-muted)!important}.page:not(#builderPage) th,.page:not(#builderPage) td{padding:7px 9px!important;border-color:var(--bcl-w-line)!important}
.page:not(#builderPage) .badge,.page:not(#builderPage) [class*="chip"]{border-radius:3px!important;box-shadow:none!important}
nav a,nav button,.topbar a,.topbar button{box-shadow:none!important}
#settingsPage #analysisControlCenterV127{gap:0!important;max-width:1180px!important}
#settingsPage #analysisControlCenterV127 .ac-hero{padding:5px 0 13px!important;border:0!important;border-bottom:1px solid var(--bcl-w-line)!important;border-radius:0!important;background:transparent!important}
#settingsPage #analysisControlCenterV127 .ac-hero h2{font-size:18px!important;margin:0 0 4px!important}
#settingsPage #analysisControlCenterV127 .ac-preset-title{margin-top:11px!important;font-size:9.5px!important;text-transform:uppercase!important;letter-spacing:.05em!important;color:var(--bcl-w-muted)!important}
#settingsPage #analysisControlCenterV127 .ac-presets{gap:4px!important;margin-top:5px!important}
#settingsPage #analysisControlCenterV127 .ac-preset{padding:0 9px!important;min-height:27px!important;border-radius:4px!important;background:transparent!important;border-color:var(--bcl-w-line)!important}
#settingsPage #analysisControlCenterV127 .ac-preset.active{background:rgba(139,124,246,.10)!important;border-color:rgba(139,124,246,.38)!important;box-shadow:none!important;color:#ddd8ff!important}
#settingsPage #analysisControlCenterV127 .ac-preset-note{font-size:10px!important;color:var(--bcl-w-muted)!important;margin-top:6px!important}
#settingsPage #analysisControlCenterV127 .ac-grid{grid-template-columns:repeat(3,minmax(240px,1fr))!important;gap:0!important}
#settingsPage #analysisControlCenterV127 .ac-card{padding:13px 16px!important;margin:0!important;border:0!important;border-bottom:1px solid var(--bcl-w-line)!important;border-right:1px solid var(--bcl-w-line)!important;border-radius:0!important;background:transparent!important}
#settingsPage #analysisControlCenterV127 .ac-card:nth-child(3n){border-right:0!important}
#settingsPage #analysisControlCenterV127 .ac-card h3{font-size:11px!important;text-transform:uppercase!important;letter-spacing:.045em!important;color:#cbd5df!important;margin:0 0 9px!important}
#settingsPage #analysisControlCenterV127 .ac-field{grid-template-columns:minmax(115px,.9fr) minmax(120px,1.1fr)!important;align-items:center!important;gap:10px!important;margin:6px 0!important}
#settingsPage #analysisControlCenterV127 .ac-field>span{font-size:10.5px!important;color:#9eabb8!important}
#settingsPage #analysisControlCenterV127 .ac-field select,#settingsPage #analysisControlCenterV127 .ac-field input{min-height:29px!important;font-size:10.5px!important}
#settingsPage #analysisControlCenterV127 .ac-check{margin:6px 0!important;font-size:10.5px!important}
#settingsPage #analysisControlCenterV127 .ac-private{padding:7px 0!important;border:0!important;border-top:1px solid var(--bcl-w-line)!important;border-radius:0!important;color:#7f8d9b!important;font-size:9.5px!important;margin-top:8px!important}
#settingsPage #analysisControlCenterV127 .ac-actions{padding-top:10px!important}
@media(max-width:1000px){#settingsPage #analysisControlCenterV127 .ac-grid{grid-template-columns:repeat(2,minmax(240px,1fr))!important}#settingsPage #analysisControlCenterV127 .ac-card:nth-child(3n){border-right:1px solid var(--bcl-w-line)!important}#settingsPage #analysisControlCenterV127 .ac-card:nth-child(2n){border-right:0!important}}
@media(max-width:700px){.page:not(#builderPage){padding:10px!important}#settingsPage #analysisControlCenterV127 .ac-grid{grid-template-columns:1fr!important}#settingsPage #analysisControlCenterV127 .ac-card{border-right:0!important}#settingsPage #analysisControlCenterV127 .ac-field{grid-template-columns:1fr!important;gap:3px!important}}
`;document.head.appendChild(s)}
function boot(){install()}if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();})();