(()=>{'use strict';
const PATCH_ID='bcl-transition-stability-v162';
if(window[PATCH_ID])return;window[PATCH_ID]=true;
let original=null,lastSig='',lastRenderedAt=0,installTimer=0;
const norm=v=>String(v??'');
function currentSignature(){
  try{
    const cls=document.getElementById('classSelector')?.value||'';
    const spec=document.getElementById('specSelector')?.value||'Awakening';
    const list=(window.CLASS_TRANSITIONS?.[cls]?.[spec]||[]).filter(Boolean);
    const compact=list.map(t=>[
      t?.from?.name??t?.fromSkill??t?.from_skill??t?.from??t?.sequence?.[0]??'',
      t?.to?.name??t?.toSkill??t?.to_skill??t?.to??t?.sequence?.[1]??'',
      t?.timingSeconds??t?.transitionSeconds??t?.timing??t?.duration??t?.time??'',
      t?.cancelAt??t?.cancelAtSeconds??t?.cancelSeconds??t?.cancelTiming??'',
      t?.entryOffset??t?.entryOffsetSeconds??t?.targetEntryAt??t?.skipTo??'',
      t?.validated??t?.measured??t?.status??'',t?.enabled??''
    ]);
    return cls+'|'+spec+'|'+JSON.stringify(compact);
  }catch(e){return String(Date.now())}
}
function pageActive(){return !!document.getElementById('transitionPage')?.classList.contains('active')}
function wrap(){
  if(typeof window.renderTransitionPage!=='function')return false;
  if(window.renderTransitionPage.__bclStableV162)return true;
  original=window.renderTransitionPage;
  const wrapped=function(force=false){
    const sig=currentSignature(),now=Date.now();
    const content=document.getElementById('transitionPageContent');
    const needsFirst=!content||!content.childElementCount||content.classList.contains('page-placeholder');
    const changed=sig!==lastSig;
    if(!force&&!changed&&!needsFirst&&pageActive())return;
    if(!force&&!changed&&!pageActive()&&now-lastRenderedAt<1000)return;
    const result=original.apply(this,arguments);
    lastSig=sig;lastRenderedAt=now;
    return result;
  };
  wrapped.__bclStableV162=true;
  wrapped.__original=original;
  window.renderTransitionPage=wrapped;
  ['classSelector','specSelector'].forEach(id=>document.getElementById(id)?.addEventListener('change',()=>{lastSig='';},true));
  window.bclForceTransitionRenderV162=()=>{lastSig='';return wrapped(true)};
  return true;
}
function boot(){if(wrap())return;let tries=0;installTimer=setInterval(()=>{if(wrap()||++tries>80)clearInterval(installTimer)},100)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();