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
  return {
    id:`TST-${spec==='Common'?'C':'A'}-${String(i+1).padStart(3,'0')}`,
    name:`Test ${spec} Skill ${String(i+1).padStart(3,'0')}`,
    spec,category:spec,cluster,role,
    input:pick(inputs),inputs:[],
    duration,executionSeconds:duration,timingSeconds:duration,timer:duration,
    damage,hits,dps:Number((damage/duration).toFixed(2)),
    pveDamage:String(damage),pvpDamage:String(Math.round(damage*.72)),
    staminaCost:Math.round(r(0,220,0)),resourceDelta:Math.round(r(-80,120,0)),cooldown:r(0,18,1),
    cc:c,ccPoints:c==='None'?0:r(.4,1,2),
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

function install(){
  const sel=document.getElementById('classSelector');
  if(!sel)return false;
  if(![...sel.options].some(o=>o.value===CLASS)){
    const o=document.createElement('option');
    o.value=CLASS;
    o.textContent='🧪 Optimizer Test Class (100 synthetic skills)';
    sel.appendChild(o);
  }

  // IMPORTANT: the application stores are top-level lexical const bindings, not window properties.
  try{
    if(typeof CLASS_SKILLS!=='undefined'){
      CLASS_SKILLS[CLASS]={
        Common:common,
        Shared:common,
        Awakening:allSkills,
        Succession:common
      };
    }
  }catch(e){console.error('[BCL test class] CLASS_SKILLS install failed',e);}

  try{
    if(typeof CLASS_TRANSITIONS!=='undefined'){
      CLASS_TRANSITIONS[CLASS]={Awakening:transitions,Succession:transitions.filter(t=>t.from.includes('Common')&&t.to.includes('Common'))};
    }
  }catch(e){console.error('[BCL test class] CLASS_TRANSITIONS install failed',e);}

  globalThis.BCL_TEST_CLASS_V117={
    name:CLASS,synthetic:true,
    skills:allSkills,common,awakening,transitions,
    counts:{skills:allSkills.length,common:common.length,awakening:awakening.length,transitions:transitions.length,cancels:transitions.filter(t=>t.cancelAt!==null).length}
  };

  if(sel.value===CLASS){
    try{if(typeof renderClassStats==='function')renderClassStats();}catch(e){}
    try{if(typeof renderSkillsPage==='function')renderSkillsPage();}catch(e){}
    try{if(typeof renderTransitionPage==='function')renderTransitionPage();}catch(e){}
    try{if(typeof renderComboBuilder==='function')renderComboBuilder();}catch(e){}
    try{if(typeof updateBuilder==='function')updateBuilder();}catch(e){}
  }
  return true;
}

function boot(){install();setTimeout(install,120);setTimeout(install,500);}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
