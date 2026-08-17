(()=>{'use strict';
const CLASS='Optimizer Test Class';
const VERSION='v123-cloud-isolated-fixture';
let state=0x51A7C0DE;
const rnd=()=>{state=(state*1664525+1013904223)>>>0;return state/4294967296};
const r=(a,b,d=3)=>Number((a+rnd()*(b-a)).toFixed(d));
const ri=(a,b)=>Math.floor(a+rnd()*(b-a+1));
const pick=a=>a[Math.floor(rnd()*a.length)];
const shuffle=a=>{const out=[...a];for(let i=out.length-1;i>0;i--){const j=Math.floor(rnd()*(i+1));[out[i],out[j]]=[out[j],out[i]]}return out};

const prefixes=['Ashen','Astral','Azure','Black','Blood','Broken','Celestial','Crimson','Dusk','Echo','Ember','Feral','Frost','Ghost','Golden','Grim','Hollow','Iron','Ivory','Jade','Lunar','Night','Obsidian','Phantom','Raven','Scarlet','Shadow','Silent','Solar','Storm','Thunder','Umbral','Violet','Void','Wild','Winter'];
const suffixes=['Arc','Bane','Bite','Bloom','Brand','Break','Burst','Claw','Crash','Crescent','Dance','Edge','Fang','Flare','Gale','Grip','Howl','Lance','Mark','Pulse','Rift','Rush','Shard','Slash','Spiral','Step','Strike','Surge','Talon','Thorn','Torrent','Veil','Wave','Whisper'];
const ccTypes=['Stiffness','Knockback','Stun','Knockdown','Bound','Floating'];
const protections=['SA','FG','IFRAME'];
const roles=['opener','bridge','damage','cc','protected','resource','finisher','mobility'];
const inputs=['W+F','S+F','Shift+F','Shift+LMB','Shift+RMB','W+RMB','S+RMB','Q','E','F','LMB','RMB','Space','W+Space','S+Q'];
function uniqueNames(count){const pool=[];for(const a of prefixes)for(const b of suffixes)pool.push(`${a} ${b}`);return shuffle(pool).slice(0,count)}
const names=uniqueNames(100);
const ccIndexes=new Set(shuffle(Array.from({length:100},(_,i)=>i)).slice(0,20));
const pvpIndexes=new Set(shuffle(Array.from({length:100},(_,i)=>i)).slice(0,60));
const protectionIndexes=new Set(shuffle(Array.from({length:100},(_,i)=>i)).slice(0,34));
const specialIndexes=new Set(shuffle(Array.from({length:100},(_,i)=>i)).slice(0,28));
function ccPoints(type){return type==='Stiffness'||type==='Knockback'?0.7:type&&type!=='None'?1:0}
function protectionLabel(type){return type==='SA'?'Super Armor':type==='FG'?'Forward Guard':type==='IFRAME'?'i-Frames':''}
function makeSkill(i){
  const spec=i<50?'Common':'Awakening';
  const damage=ri(500,8000),duration=r(.25,2.1),hits=ri(1,12);
  const hasCC=ccIndexes.has(i),cc=hasCC?pick(ccTypes):'None',ccTimer=hasCC?r(1,2.5,2):null;
  const hasPvp=pvpIndexes.has(i),pvpDamage=hasPvp?ri(30,80):null;
  const hasProtection=protectionIndexes.has(i),protection=hasProtection?pick(protections):'None',pLabel=protectionLabel(protection);
  const hasSpecial=specialIndexes.has(i),input=pick(inputs),cooldown=r(0,24,1);
  const staminaCost=rnd()<.58?ri(40,320):0,resourceDelta=rnd()<.55?ri(-120,160):0;
  const accuracy=rnd()<.48?r(-15,25,1):0,critRate=rnd()<.52?r(0,100,1):0,recovery=rnd()<.18?ri(20,220):0;
  const role=pick(roles),downAttack=hasSpecial&&rnd()<.45,airAttack=hasSpecial&&rnd()<.30,backAttack=hasSpecial&&rnd()<.55;
  const downSmash=!hasCC&&rnd()<.06,airSmash=!hasCC&&rnd()<.03;
  const protectionStart=hasProtection?r(0,.18):null,protectionEnd=hasProtection?Number(Math.max(.15,duration-r(0,.22)).toFixed(3)):null;
  return {id:`TST-${spec==='Common'?'C':'A'}-${String(i%50+1).padStart(3,'0')}`,name:names[i],spec,category:spec,role,input,inputs:[input],duration,executionSeconds:duration,timingSeconds:duration,timer:duration,damage,hits,dps:Number((damage/duration).toFixed(2)),pveDamage:String(damage),pvpDamage:hasPvp?String(pvpDamage):'',pvpDamagePercent:hasPvp?pvpDamage:null,staminaCost,resourceDelta,cooldown,accuracy,critRate,recovery,cc,ccPoints:ccPoints(cc),ccTimerSeconds:ccTimer,ccDuration:ccTimer,protection,protections:pLabel?[pLabel]:[],protectionWindows:hasProtection?[{type:protection,start:protectionStart,end:protectionEnd,quality:'synthetic',confidence:r(.7,.98,2)}]:[],downAttack,airAttack,backAttack,downSmash,airSmash,mobility:rnd()<.35?r(1,10,2):0,range:rnd()<.50?r(.8,16,1):null,aoe:rnd()<.44?r(1,10,2):null,enabled:true,synthetic:true,fixtureVersion:VERSION,referenceSource:'BDO Combos Labs sparse deterministic stress fixture',tags:[role,hasCC?'cc':'',hasProtection?protection.toLowerCase():'',hasPvp?'pvp-profile':'',downAttack?'down-attack':'',airAttack?'air-attack':'',backAttack?'back-attack':''].filter(Boolean)};
}
const allSkills=Array.from({length:100},(_,i)=>makeSkill(i));
const common=allSkills.slice(0,50),awakening=allSkills.slice(50),commonNames=new Set(common.map(s=>s.name));
const chainLengths=[8,8,7],transitionPool=shuffle(allSkills.map((_,i)=>i));let cursor=0;
const transitionChains=chainLengths.map((length,chainIndex)=>{const indexes=transitionPool.slice(cursor,cursor+length);cursor+=length;return indexes.map(i=>allSkills[i])});
const transitions=[];
for(let chainIndex=0;chainIndex<transitionChains.length;chainIndex++){
  const chain=transitionChains[chainIndex];
  for(let step=0;step<chain.length-1;step++){
    const from=chain[step],to=chain[step+1],timing=r(.3,.8,3);
    transitions.push({id:`TST-CHAIN-${chainIndex+1}-${step+1}`,chainId:`synthetic-chain-${chainIndex+1}`,chainIndex,step,from:from.name,to:to.name,fromId:from.id,toId:to.id,sequence:[from.name,to.name],timingSeconds:timing,transitionSeconds:timing,duration:timing,cancelAt:timing,hasCancel:true,cancelSeconds:timing,timingAttempts:ri(2,6),timingConfidence:r(.7,.98,2),measured:true,validated:rnd()>.2,manualValidation:false,reviewStatus:'synthetic',needsValidation:false,fixtureVersion:VERSION,source:'BDO Combos Labs sparse deterministic stress fixture',sourceTag:'synthetic',enabled:true,synthetic:true});
  }
}
function fixtureSkills(){return {Common:common.map(x=>({...x})),Shared:[],Awakening:allSkills.map(x=>({...x})),Succession:common.map(x=>({...x}))}}
function fixtureTransitions(){return {Awakening:transitions.map(x=>({...x})),Succession:transitions.filter(t=>commonNames.has(t.from)&&commonNames.has(t.to)).map(x=>({...x}))}}
function isTestActive(){return document.getElementById('classSelector')?.value===CLASS}
function resetStores(){
  try{if(typeof CLASS_SKILLS!=='undefined')CLASS_SKILLS[CLASS]=fixtureSkills()}catch(e){console.error('[BCL test fixture] skills reset failed',e)}
  try{if(typeof CLASS_TRANSITIONS!=='undefined')CLASS_TRANSITIONS[CLASS]=fixtureTransitions()}catch(e){console.error('[BCL test fixture] transitions reset failed',e)}
}
function ensureOption(){
  const sel=document.getElementById('classSelector');if(!sel)return false;
  const matches=[...sel.options].filter(o=>o.value===CLASS);matches.slice(1).forEach(o=>o.remove());
  if(!matches.length){const o=document.createElement('option');o.value=CLASS;o.textContent='🧪 Optimizer Test Class (100 sparse synthetic skills)';sel.appendChild(o)}
  else matches[0].textContent='🧪 Optimizer Test Class (100 sparse synthetic skills)';
  return true;
}
function expose(){globalThis.BCL_TEST_CLASS_V123={version:VERSION,name:CLASS,synthetic:true,skills:allSkills,common,awakening,transitions,transitionChains,counts:{skills:100,common:50,awakening:50,cc:20,pvpProfiled:60,transitions:20,cancels:20,chains:3}}}
function isolateCloudSync(){
  if(globalThis.__BCL_TEST_CLOUD_ISOLATED_V123)return;
  globalThis.__BCL_TEST_CLOUD_ISOLATED_V123=true;
  try{
    if(typeof globalThis.bclSharedPullV108==='function'){
      const originalPull=globalThis.bclSharedPullV108;
      globalThis.bclSharedPullV108=async function(...args){if(isTestActive())return {skipped:true,reason:'synthetic-test-class'};return originalPull.apply(this,args)};
    }
    if(typeof globalThis.bclSharedPushV108==='function'){
      const originalPush=globalThis.bclSharedPushV108;
      globalThis.bclSharedPushV108=async function(...args){if(isTestActive())return {skipped:true,reason:'synthetic-test-class'};return originalPush.apply(this,args)};
    }
  }catch(e){console.warn('[BCL test fixture] cloud isolation failed',e)}
}
function boot(){
  ensureOption();resetStores();expose();isolateCloudSync();
  setTimeout(()=>{ensureOption();resetStores();isolateCloudSync()},300);
  setTimeout(()=>{ensureOption();resetStores();isolateCloudSync()},1200);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
