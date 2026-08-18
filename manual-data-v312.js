(()=>{'use strict';
const KEY='bcl.clean.v3';
const RECOVERY='bcl.v312.static.recovery';
const norm=v=>String(v??'').trim().toLowerCase();
const clone=v=>JSON.parse(JSON.stringify(v));
const read=()=>{try{return JSON.parse(localStorage.getItem(KEY)||'null')||{}}catch(_){return {}}};
const save=s=>localStorage.setItem(KEY,JSON.stringify(s));
const ensure=(root,key)=>{root[key]??={Awakening:[],Succession:[]};root[key].Awakening=Array.isArray(root[key].Awakening)?root[key].Awakening:[];root[key].Succession=Array.isArray(root[key].Succession)?root[key].Succession:[];return root[key]};
function mergeSkills(existing,source){const out=Array.isArray(existing)?existing.map(clone):[];const by=new Map(out.map((s,i)=>[norm(s?.name),i]));for(const raw of source){const s=clone(raw),k=norm(s.name);if(!k)continue;if(by.has(k)){const i=by.get(k);out[i]={...s,...out[i]};}else{out.push(s);by.set(k,out.length-1);}}return out;}
function tkey(t){return `${norm(t?.from||t?.fromSkill)}>${norm(t?.to||t?.toSkill)}`;}
function mergeTransitions(existing,source){const out=Array.isArray(existing)?existing.map(clone):[];const by=new Map(out.map((t,i)=>[tkey(t),i]));for(const raw of source){const t=clone(raw),k=tkey(t);if(!k||k==='>')continue;if(by.has(k)){const i=by.get(k);out[i]={...t,...out[i]};}else{out.push(t);by.set(k,out.length-1);}}return out;}
function install(){
 const bundle=globalThis.BCL_TEST_NATIVE_V128;
 if(!bundle||!Array.isArray(bundle.skills)||bundle.skills.length<100||!Array.isArray(bundle.transitions)){return false;}
 const state=read();state.version=3;state.context={className:'Test',spec:'Awakening',...(state.context||{})};
 state.skills=state.skills&&typeof state.skills==='object'?state.skills:{};state.transitions=state.transitions&&typeof state.transitions==='object'?state.transitions:{};
 const sk=ensure(state.skills,'Test'),tr=ensure(state.transitions,'Test');
 const common=bundle.skills.filter(s=>s.spec==='Common'),commonNames=new Set(common.map(s=>norm(s.name)));
 sk.Awakening=mergeSkills(sk.Awakening,bundle.skills);sk.Succession=mergeSkills(sk.Succession,common);
 tr.Awakening=mergeTransitions(tr.Awakening,bundle.transitions);tr.Succession=mergeTransitions(tr.Succession,bundle.transitions.filter(t=>commonNames.has(norm(t.from))&&commonNames.has(norm(t.to))));
 state.staticData={...(state.staticData||{}),version:'3.12',manualV312Loaded:true,testSkills:bundle.skills.length,testTransitions:bundle.transitions.length,loadedAt:new Date().toISOString()};
 save(state);console.info('[V3.12] static data installed',sk.Awakening.length,tr.Awakening.length);return sk.Awakening.length>=100;
}
// Primary bootstrap: this script is loaded before app-mini-v3.js.
install();
// Recovery: if any browser/defer/cache ordering still started the runtime with the 4-skill seed,
// repair localStorage once and reload so app-mini starts from the repaired state.
window.addEventListener('load',()=>{
 const count=read()?.skills?.Test?.Awakening?.length||0;
 if(count>=90){sessionStorage.removeItem(RECOVERY);return;}
 if(sessionStorage.getItem(RECOVERY)==='1')return;
 if(install()){
   sessionStorage.setItem(RECOVERY,'1');
   location.reload();
 }
},{once:true});
})();