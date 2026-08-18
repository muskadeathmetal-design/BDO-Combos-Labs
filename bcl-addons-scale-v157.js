(()=>{'use strict';const ID='bcl-addons-scale-v157-style';function install(){if(document.getElementById(ID))return;const s=document.createElement('style');s.id=ID;s.textContent=`
/* Skill Addons: explicit final-scale override. Must load after legacy #addonsPage rules. */
#addonsPage{max-width:1200px!important;margin:0 auto!important;padding:18px!important;font-size:14px!important;line-height:1.45!important}
#addonsPage h1{font-size:22px!important;line-height:1.25!important;margin:0 0 5px!important}
#addonsPage h2{font-size:17px!important;line-height:1.3!important;margin:20px 0 8px!important}
#addonsPage h3,#addonsPage .addon-loadout-heading h3{font-size:14px!important;line-height:1.35!important;margin:14px 0 7px!important}
#addonsPage p,#addonsPage .optimizer-note,#addonsPage .note{font-size:12px!important;line-height:1.45!important}
#addonsPage .card,#addonsPage .panel,#addonsPage .class-config-card,#addonsPage .loadout-card,#addonsPage .consumable-card,#addonsPage .crystal-card{padding:12px!important;border-radius:8px!important;min-height:0!important}
#addonsPage .loadout-before-addons{margin:10px 0!important}
#addonsPage .loadout-before-addons .class-config-grid{display:grid!important;grid-template-columns:160px minmax(0,1fr) minmax(0,1fr)!important;gap:8px!important;margin:0!important;width:100%!important}
#addonsPage .loadout-before-addons .class-config-card{padding:10px!important;min-height:0!important}
#addonsPage .loadout-before-addons .class-config-card h3{font-size:12px!important;margin:0 0 6px!important}
#addonsPage label,#addonsPage .addon-line label{font-size:11px!important;margin-bottom:5px!important}
#addonsPage select,#addonsPage input,#addonsPage textarea,#addonsPage .loadout-before-addons select,#addonsPage .addon-line select,#addonsPage .consumable-name-cell select,#addonsPage .compact-consumable-name select{min-height:34px!important;height:auto!important;padding:6px 9px!important;border-radius:7px!important;font-size:11px!important}
#addonsPage button,#addonsPage .toolbar button,#addonsPage .class-config-card button{min-height:32px!important;height:auto!important;padding:0 10px!important;border-radius:7px!important;font-size:11px!important;line-height:1.2!important}
#addonsPage .toolbar{gap:6px!important;flex-wrap:wrap!important}
#addonsPage #classAddonLines,#addonsPage .addon-lines{display:grid!important;gap:8px!important;margin-top:10px!important}
#addonsPage #classAddonLines .addon-line,#addonsPage .addon-line{display:grid!important;grid-template-columns:minmax(200px,1.2fr) minmax(150px,1fr) minmax(150px,1fr)!important;gap:8px!important;align-items:end!important;padding:10px!important;border-radius:8px!important;min-height:0!important}
#addonsPage #classAddonLines .addon-line strong,#addonsPage .addon-line strong{font-size:12px!important;margin-bottom:5px!important}
#addonsPage #classAddonLines .addon-line .optimizer-note,#addonsPage .addon-line .optimizer-note{font-size:10px!important;margin-top:5px!important;min-height:0!important}
#addonsPage table,#addonsPage #oldEffectsTable,#addonsPage #oldCrystalTable{font-size:11px!important;border-spacing:0 6px!important}
#addonsPage th,#addonsPage #oldEffectsTable th,#addonsPage #oldCrystalTable th{font-size:9px!important;padding:0 7px 4px!important}
#addonsPage td,#addonsPage #oldEffectsTable td,#addonsPage #oldCrystalTable td{padding:7px!important;font-size:11px!important}
#addonsPage .consumable-role-cell,#addonsPage .crystal-role-cell,#addonsPage .compact-consumable-role,#addonsPage .consumable-duration-inline,#addonsPage .compact-consumable-duration{font-size:9.5px!important;line-height:1.3!important}
#addonsPage .consumable-stat-chip,#addonsPage .crystal-stat-chip{padding:3px 6px!important;font-size:9px!important;border-radius:6px!important}
#addonsPage img{max-width:42px!important;max-height:42px!important;object-fit:contain!important}
@media(max-width:1050px){#addonsPage .loadout-before-addons .class-config-grid{grid-template-columns:1fr!important}#addonsPage #classAddonLines .addon-line,#addonsPage .addon-line{grid-template-columns:1fr 1fr!important}#addonsPage #classAddonLines .addon-line>div:first-child,#addonsPage .addon-line>div:first-child{grid-column:1/-1!important}}
@media(max-width:650px){#addonsPage{padding:12px!important}#addonsPage #classAddonLines .addon-line,#addonsPage .addon-line{grid-template-columns:1fr!important}#addonsPage #classAddonLines .addon-line>div:first-child,#addonsPage .addon-line>div:first-child{grid-column:auto!important}}
`;document.head.appendChild(s)}function boot(){install()}if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();})();