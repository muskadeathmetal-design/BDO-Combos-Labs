(()=>{'use strict';
const CLASS='Optimizer Test Class';
let state=0xBADC0DE;
const rnd=()=>{state=(state*1664525+1013904223)>>>0;return state/4294967296};
const r=(a,b,d=3)=>Number((a+rnd()*(b-a)).toFixed(d));
const pick=a=>a[Math.floor(rnd()*a.length)];
const cc=['None','Stiffness','Stun','Knockdown','Bound','Floating','Knockback'];
const prot=['None','SA','FG','IFRAME'];
const roles=['opener','bridge','damage','cc','protected','resource','finisher','mobility'];
const inputs=['W+F','S+F','Shift+F','Shift+LMB','Shift+RMB','W+RMB','S+RMB','Q','E','F','LMB','RMB'];

function skill(i,spec){
  const cluster=i%10,role=roles[i%roles.length],p=pick(prot),c=pick(cc);
  const duration=r(.18,1.45),damage=Math.round(r(450,5200,0)),hits=Math.max(1,Math.round(r(1,12,0)));
  const protectionLabel=p==='SA'?'Super Armor':p==='FG'?'Forward Guard':p==='IFRAME'?'i-Frames':'';
  const ccPoints=c==='Stiffness'||c==='Knockback'?0.7:c==='None'?0:1;
  return {
    id:`TST-${spec==='Common'?'C':'A'}-${String(i+1).padStart(3,'0')}`,
    name:`Test ${spec} Skill ${String(i+1).padStart(3,'0')}`,
    spec,category:spec,cluster,role,
    input:pick(inputs),inputs:[],
    duration,executionSeconds:duration,timingSeconds:duration,timer:duration,
    damage,hits,dps:Number((damage/duration).toFixed(2)),
    pveDamage:String(damage),pvpDamage:String(Math.round(damage*.72)),
    staminaCost:Math.round(r(0,220,0)),resourceDelta:Math.round(r(-80,120,0)),cooldown:r(0,18,1),
    cc:c,ccPoints,
    protection:p,protections:protectionLabel?[protectionLabel]:[],
    protectionWindows:p==='None'?[]:[{type:p,start:r(0,.08),end:Number(Math.max(.12,duration-r(0,.12)).toFixed(3)),quality:'synthetic-measured',confidence:r(.78,.99,2)}],
    accuracy:r(-12,18,1),critRate:r(0,100,1),downAttack:rnd()>.45,airAttack:rnd()>.7,backAttack:rnd()>.3,
    recovery:rnd()>.75?Math.round(r(20,180,0)):0,
    enabled:true,synthetic:true,referenceSource:'Optimizer synthetic stress fixture',
    tags:[role,`cluster-${cluster}`,p.toLowerCase(),c.toLowerCase()].filter(x=>x!=='none')
  };
}

const common=Array.from({length:50},(_,i)=>skill(i,'Common'));
const awakening=Array.from({length:50},(_,i)=>skill(i,'Awakening'));
for(const s of [...common,...awakening]) s.inputs=[s.input];
const allSkills=[...common,...awakening];

const transitions=[];
for(let i=0;i<allSkills.length;i++){
  const a=allSkills[i];
  for(let j=0;j<allSkills.length;j++){
    if(i===j)continue;
    const b=allSkills[j];
    const same=a.cluster===b.cluster;
    const roleChain=(a.role==='opener'&&['cc','bridge'].includes(b.role))||
      (a.role==='cc'&&['damage','finisher'].includes(b.role))||
      (a.role==='bridge'&&['damage','protected'].includes(b.role))||
      (a.role==='damage'&&['finisher','resource'].includes(b.role));
    if(!same&&!roleChain&&rnd()>.055)continue;
    let timing=r(.035,.42);
    if(same)timing*=.68;
    if(roleChain)timing*=.72;
    timing=Number(Math.max(.02,timing).toFixed(3));
    const hasCancel=rnd()<(same?.72:.38);
    const cancelAt=hasCancel?r(.02,Math.max(.03,Math.min(a.duration*.7,.45))):null;
    const confidence=r(.72,.99,2);
    const validated=rnd()>.18;
    transitions.push({
      from:a.name,to:b.name,sequence:[a.name,b.name],
      timingSeconds:timing,transitionSeconds:timing,duration:timing,
      timingAttempts:Math.round(r(2,7,0)),timingConfidence:confidence,
      measured:true,validated,manualValidation:validated,
      reviewStatus:validated?'validated':'pending',needsValidation:!validated,
      cancelAt,hasCancel:cancelAt!==null,cancelSeconds:cancelAt,
      synergy:Number(((same?.45:0)+(roleChain?.4:0)+r(-.12,.22)).toFixed(3)),
      reason:same&&roleChain?'cluster+role':same?'cluster':'role',
      source:'Optimizer synthetic stress fixture',sourceTag:'synthetic',enabled:true,synthetic:true
    });
  }
}

/* Verified PvP ruleset, locked to sources checked 2026-08-17. */
const PVP_RULES={
  version:'2025-07-24+',
  baseClassDamageRatio:0.8929,
  groupAdvantage:0.05,
  tamer:{Awakening:'Skirmisher',Succession:'Pulverizer'},
  cc:{
    limit:2,
    immunitySeconds:5,
    points:{Stiffness:0.7,Knockback:0.7,Stun:1,Knockdown:1,Bound:1,Floating:1,Float:1,Grab:1,Freezing:1,Freeze:1},
    extensions:{DownSmash:{countsTowardLimit:false},AirSmash:{countsTowardLimit:false}}
  },
  specialDamage:{critical:2,backAttackPvp:1.2,downAttackPvp:1.2,airAttackPvp:1.7},
  protection:{
    Invincibility:{blocksDamage:true,blocksCC:true,grabBlocked:true},
    SuperArmor:{blocksDamage:false,blocksCC:true,grabBlocked:false},
    ForwardGuard:{blocksFrontalDamage:true,blocksFrontalCC:true,grabBlocked:false,directional:true}
  },
  brackets:{enabled:false,reason:'AP/DP bracket values supplied externally are not sufficiently verified for live optimizer math'}
};
globalThis.BCL_PVP_RULES_V118=PVP_RULES;

function normalizedText(skill){
  return [skill?.cc,skill?.effect,skill?.effects,skill?.notes,skill?.protection,skill?.protections].flat(Infinity).filter(Boolean).join(' ').toLowerCase();
}
function pvpCCInfo(skill){
  const text=normalizedText(skill);
  const types=[];
  const add=(name,regex)=>{if(regex.test(text))types.push(name)};
  add('Stiffness',/\bstiff(?:ness|en)?\b/);
  add('Knockback',/\bknockback\b/);
  add('Stun',/\bstun\b/);
  add('Knockdown',/\bknock\s?down\b|\bkd\b/);
  add('Bound',/\bbound\b/);
  add('Floating',/\bfloat(?:ing)?\b/);
  add('Grab',/\bgrab|grapple\b/);
  add('Freezing',/\bfreez(?:e|ing)|frozen\b/);
  const extensionTypes=[];
  if(/down\s*smash/.test(text))extensionTypes.push('Down Smash');
  if(/air\s*smash/.test(text))extensionTypes.push('Air Smash');
  const uniq=[...new Set(types)];
  const points=uniq.reduce((sum,t)=>sum+(PVP_RULES.cc.points[t]||0),0);
  return {types:uniq,points,label:uniq.length?uniq.join(' + '):'No CC',extensionTypes};
}

function patchOptimizerRules(){
  let patched=false;
  try{
    if(typeof builderOfficialCCInfo==='function'){
      builderOfficialCCInfo=function(skill){return pvpCCInfo(skill)};
      patched=true;
    }
  }catch(e){console.warn('[BCL PvP rules] builderOfficialCCInfo patch failed',e)}

  try{
    if(typeof smartBuilderCCScore==='function'){
      smartBuilderCCScore=function(skill){
        const info=pvpCCInfo(skill);
        let s=info.points*2;
        if(info.extensionTypes.includes('Down Smash'))s+=0.75;
        if(info.extensionTypes.includes('Air Smash'))s+=0.9;
        return s;
      };
      patched=true;
    }
  }catch(e){console.warn('[BCL PvP rules] smartBuilderCCScore patch failed',e)}

  try{
    if(typeof smartBuilderProtectionScore==='function'){
      smartBuilderProtectionScore=function(skill){
        const text=normalizedText(skill);
        if(/iframe|i-frame|invinc/.test(text))return 3;
        if(/super armor|\bsa\b/.test(text))return 2;
        if(/forward guard|\bfg\b/.test(text))return 1.6;
        return 0;
      };
      patched=true;
    }
  }catch(e){console.warn('[BCL PvP rules] smartBuilderProtectionScore patch failed',e)}

  globalThis.BCL_PVP_RULES_V118.optimizerPatched=patched;
  return patched;
}

function install(){
  const sel=document.getElementById('classSelector');
  if(!sel)return false;
  if(![...sel.options].some(o=>o.value===CLASS)){
    const o=document.createElement('option');
    o.value=CLASS;
    o.textContent='🧪 Optimizer Test Class (100 synthetic skills)';
    sel.appendChild(o);
  }
  try{
    if(typeof CLASS_SKILLS!=='undefined'){
      CLASS_SKILLS[CLASS]={Common:common,Shared:common,Awakening:allSkills,Succession:common};
    }
  }catch(e){console.error('[BCL test class] CLASS_SKILLS install failed',e)}
  try{
    if(typeof CLASS_TRANSITIONS!=='undefined'){
      CLASS_TRANSITIONS[CLASS]={Awakening:transitions,Succession:transitions.filter(t=>t.from.includes('Common')&&t.to.includes('Common'))};
    }
  }catch(e){console.error('[BCL test class] CLASS_TRANSITIONS install failed',e)}
  globalThis.BCL_TEST_CLASS_V117={name:CLASS,synthetic:true,skills:allSkills,common,awakening,transitions,counts:{skills:allSkills.length,common:common.length,awakening:awakening.length,transitions:transitions.length,cancels:transitions.filter(t=>t.cancelAt!==null).length}};
  patchOptimizerRules();
  if(sel.value===CLASS){
    try{if(typeof renderClassStats==='function')renderClassStats();}catch(e){}
    try{if(typeof renderSkillsPage==='function')renderSkillsPage();}catch(e){}
    try{if(typeof renderTransitionPage==='function')renderTransitionPage();}catch(e){}
    try{if(typeof renderComboBuilder==='function')renderComboBuilder();}catch(e){}
    try{if(typeof updateBuilder==='function')updateBuilder();}catch(e){}
  }
  return true;
}
function boot(){install();setTimeout(()=>{install();patchOptimizerRules()},120);setTimeout(()=>{install();patchOptimizerRules()},500);setTimeout(patchOptimizerRules,1500)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
