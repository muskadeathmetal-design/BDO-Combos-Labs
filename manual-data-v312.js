(()=>{'use strict';
const KEY='bcl.clean.v3';
const bundle=globalThis.BCL_TEST_NATIVE_V128;
if(!bundle||!Array.isArray(bundle.skills)||!Array.isArray(bundle.transitions)){console.error('[V3.12] Static Test data unavailable');return;}
const read=()=>{try{return JSON.parse(localStorage.getItem(KEY)||'null')||{}}catch(_){return {}}};
const save=s=>localStorage.setItem(KEY,JSON.stringify(s));
const norm=v=>String(v??'').trim().toLowerCase();
const clone=v=>JSON.parse(JSON.stringify(v));
const ensure=(root,key)=>{root[key]??={Awakening:[],Succession:[]};root[key].Awakening=Array.isArray(root[key].Awakening)?root[key].Awakening:[];root[key].Succession=Array.isArray(root[key].Succession)?root[key].Succession:[];return root[key]};
function mergeSkills(existing,staticSkills){
 const out=Array.isArray(existing)?existing.map(clone):[];
 const by=new Map(out.map((s,i)=>[norm(s?.name),i]));
 for(const raw of staticSkills){const s=clone(raw),k=norm(s.name);if(!k)continue;if(by.has(k)){const i=by.get(k);out[i]={...s,...out[i]};}else{out.push(s);by.set(k,out.length-1);}}
 return out;
}
function transitionKey(t){return `${norm(t?.from||t?.fromSkill)}>${norm(t?.to||t?.toSkill)}`;}
function mergeTransitions(existing,staticTransitions){
 const out=Array.isArray(existing)?existing.map(clone):[];
 const by=new Map(out.map((t,i)=>[transitionKey(t),i]));
 for(const raw of staticTransitions){const t=clone(raw),k=transitionKey(t);if(!k||k==='>')continue;if(by.has(k)){const i=by.get(k);out[i]={...t,...out[i]};}else{out.push(t);by.set(k,out.length-1);}}
 return out;
}
const state=read();
state.version=3;
state.context={className:'Test',spec:'Awakening',...(state.context||{})};
state.skills=state.skills&&typeof state.skills==='object'?state.skills:{};
state.transitions=state.transitions&&typeof state.transitions==='object'?state.transitions:{};
const skillTarget=ensure(state.skills,'Test');
const trTarget=ensure(state.transitions,'Test');
const common=bundle.skills.filter(s=>s.spec==='Common');
const commonNames=new Set(common.map(s=>norm(s.name)));
const successionTransitions=bundle.transitions.filter(t=>commonNames.has(norm(t.from))&&commonNames.has(norm(t.to)));
skillTarget.Awakening=mergeSkills(skillTarget.Awakening,bundle.skills);
skillTarget.Succession=mergeSkills(skillTarget.Succession,common);
trTarget.Awakening=mergeTransitions(trTarget.Awakening,bundle.transitions);
trTarget.Succession=mergeTransitions(trTarget.Succession,successionTransitions);
state.staticData={...(state.staticData||{}),version:'3.12',testSkills:bundle.skills.length,testTransitions:bundle.transitions.length,loadedAt:new Date().toISOString()};
save(state);
console.info('[V3.12] Static combat data loaded',{awakeningSkills:skillTarget.Awakening.length,successionSkills:skillTarget.Succession.length,awakeningTransitions:trTarget.Awakening.length,successionTransitions:trTarget.Succession.length});
})();