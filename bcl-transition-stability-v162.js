(()=>{'use strict';
const PATCH_ID='bcl-transition-stability-v164';if(window[PATCH_ID])return;window[PATCH_ID]=true;
let original=null,lastSig=null,hasRendered=false,installTimer=0;
function context(){return{cls:document.getElementById('classSelector')?.value||'',spec:document.getElementById('specSelector')?.value||'Awakening'}}
function rawList(cls,spec){try{return typeof CLASS_TRANSITIONS!=='undefined'&&Array.isArray(CLASS_TRANSITIONS?.[cls]?.[spec])?CLASS_TRANSITIONS[cls][spec]:[]}catch(e){return[]}}
function compactActiveStore(){const{cls,spec}=context();const list=rawList(cls,spec);if(!list.length)return list;const clean=list.filter(Boolean);if(clean.length!==list.length)list.splice(0,list.length,...clean);return list}
function signature(){try{const{cls,spec}=context(),list=rawList(cls,spec);const compact=list.filter(Boolean).map(t=>[
 t?.from?.name??t?.fromSkill??t?.from_skill??t?.from??t?.sequence?.[0]??'',
 t?.to?.name??t?.toSkill??t?.to_skill??t?.to??t?.sequence?.[1]??'',
 t?.timingSeconds??t?.transitionSeconds??t?.gapSeconds??t?.timing??t?.duration??t?.time??'',
 t?.cancelAt??t?.cancelAtSeconds??t?.cancelSeconds??t?.cancelTiming??'',
 t?.entryOffset??t?.entryOffsetSeconds??t?.targetEntryAt??t?.skipTo??'',
 t?.timingFrames??t?.cancelFrames??t?.frames??'',t?.timingFPS??t?.fps??'',t?.timingAttempts??t?.attempts??'',
 t?.reviewStatus??'',t?.needsValidation??'',t?.manualValidation??'',t?.timingConfidence??'',
 t?.validated??'',t?.measured??'',t?.status??'',t?.enabled??'',t?.autoMeasured??'',t?.measuredFromAutoVideo??''
 ]);return cls+'|'+spec+'|'+JSON.stringify(compact)}catch(e){return'error|'+String(e?.message||e)}}
function pageActive(){return !!document.getElementById('transitionPage')?.classList.contains('active')}
function invalidate(){lastSig=null;hasRendered=false}
function patchReviewIndex(){if(typeof window.transitionReviewFindV47!=='function'||window.transitionReviewFindV47.__bclV164)return;const fixed=function(index){const{cls,spec}=context();const store=compactActiveStore();return{store,tr:store[Number(index)]||null}};fixed.__bclV164=true;window.transitionReviewFindV47=fixed}
function wrap(){if(typeof window.renderTransitionPage!=='function')return false;if(window.renderTransitionPage.__bclStableV164){patchReviewIndex();return true}original=window.renderTransitionPage.__original||window.renderTransitionPage;const wrapped=function(force=false){if(!force&&!pageActive())return;compactActiveStore();patchReviewIndex();const sig=signature();if(!force&&hasRendered&&sig===lastSig)return;const result=original.apply(this,arguments);lastSig=sig;hasRendered=true;return result};wrapped.__bclStableV164=true;wrapped.__original=original;window.renderTransitionPage=wrapped;patchReviewIndex();window.bclForceTransitionRenderV164=()=>{invalidate();return wrapped(true)};window.bclInvalidateTransitionRenderV164=invalidate;return true}
function boot(){wrap();['classSelector','specSelector'].forEach(id=>document.getElementById(id)?.addEventListener('change',invalidate,true));let tries=0;installTimer=setInterval(()=>{if(wrap()||++tries>40)clearInterval(installTimer)},150)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();