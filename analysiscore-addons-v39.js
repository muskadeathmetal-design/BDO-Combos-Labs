(()=>{'use strict';
const KEY='bcl.clean.v3';
const VERSION='3.9';
const originalFetch=window.fetch.bind(window);
const ENDPOINT_PART='/functions/v1/analysiscore-builder-v2';
function read(){try{return JSON.parse(localStorage.getItem(KEY)||'null')||{}}catch(_){return{}}}
function list(s,k,c,sp){return Array.isArray(s?.[k]?.[c]?.[sp])?s[k][c][sp]:[]}
function cleanEffect(e={}){return{effect:String(e.effect||e.name||e.type||'').slice(0,100),value:e.value??null,duration:e.duration??null}}
function normalizeAddon(a={}){const effects=Array.isArray(a.effects)?a.effects:[{effect:a.effect1||a.effect,value:a.value1??a.value,duration:a.duration1??a.duration},{effect:a.effect2,value:a.value2,duration:a.duration2}];return{skill:String(a.skill||'').slice(0,120),mode:String(a.mode||'both').toLowerCase(),enabled:a.enabled!==false,effects:effects.map(cleanEffect).filter(x=>x.effect),tags:Array.isArray(a.tags)?a.tags:[],notes:String(a.notes||'').slice(0,240)}}
window.fetch=async function(input,init){try{const url=typeof input==='string'?input:input?.url||'';if(url.includes(ENDPOINT_PART)&&init?.body&&typeof init.body==='string'){const body=JSON.parse(init.body);const s=read(),c=s?.context?.className||document.querySelector('#classSelector')?.value||'Test',sp=s?.context?.spec||document.querySelector('#specSelector')?.value||'Awakening';body.addons=list(s,'addons',c,sp).map(normalizeAddon).filter(a=>a.skill&&a.enabled);init={...init,body:JSON.stringify(body)};}}
catch(e){console.warn('[Add-ons V3.9] payload enrichment skipped',e)}return originalFetch(input,init)};
function sync(){window.BDO_COMBOS_LAB_VERSION=VERSION;const h=document.querySelector('#appHealth');if(h){h.textContent=`Ready · V${VERSION}`;h.dataset.version=VERSION}const a=document.querySelector('#analysisStatus');if(a&&a.textContent.includes('Ready'))a.textContent=`AnalysisCore · Ready · V${VERSION}`;}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',sync,{once:true});else sync();window.addEventListener('load',sync,{once:true});
})();