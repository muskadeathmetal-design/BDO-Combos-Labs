(()=>{'use strict';
const CLASS='Optimizer Test Class';
const VERSION='v119-fixture-only';
let state=0x0BADC0DE;
const rnd=()=>{state=(state*1664525+1013904223)>>>0;return state/4294967296};
const r=(a,b,d=3)=>Number((a+rnd()*(b-a)).toFixed(d));
const ri=(a,b)=>Math.floor(a+rnd()*(b-a+1));
const pick=a=>a[Math.floor(rnd()*a.length)];

const ccTypes=['None','Stiffness','Stun','Knockdown','Bound','Floating','Knockback'];
const protections=['None','SA','FG','IFRAME'];
const roles=['opener','bridge','damage','cc','protected','resource','finisher','mobility'];
const inputs=['W+F','S+F','Shift+F','Shift+LMB','Shift+RMB','W+RMB','S+RMB','Q','E','F','LMB','RMB','Space','W+Space'];
const nameA=['Astral','Crimson','Iron','Moon','Storm','Phantom','Solar','Void','Thunder','Silent'];
const nameB=['Fang','Rush','Spiral','Break','Claw','Pulse','Bloom','Crash','Step','Lance'];
const clusters=['catch','air','down','burst','guard','stamina','resource','mobility','cancel','finisher'];

const makeName=i=>`${nameA[Math.floor(i/10)]} ${nameB[i%10]}`;
const ccPoints=t=>t==='Stiffness'||t==='Knockback'?0.7:t==='None'?0:1;
const protectionLabel=t=>t==='SA'?'Super Armor':t==='FG'?'Forward Guard':t==='IFRAME'?'i-Frames':'';

function makeSkill(i,spec){
  const role=roles[i%roles.length];
  const cluster=clusters[i%clusters.length];
  const protection=pick(protections);
  const cc=pick(ccTypes);
  const duration=r(.18,1.55);
  const damage=ri(450,5600);
  const hits=ri(1,12);
  const critRate=r(0,100,1);
  const accuracy=r(-12,20,1);
  const staminaCost=ri(0,240);
  const resourceDelta=ri(-90,130);
  const cooldown=r(0,20,1);
  const pvpFactor=r(.58,.88,3);
  const pvpDamage=Math.round(damage*pvpFactor);
  const name=makeName(i);
  const pLabel=protectionLabel(protection);
  const downAttack=rnd()>.48;
  const airAttack=rnd()>.70;
  const backAttack=rnd()>.30;
  const downSmash=cc==='None'&&rnd()>.88;
  const airSmash=cc==='None'&&rnd()>.94;
  const recovery=rnd()>.72?ri(20,180):0;
  const mobility=r(0,10,2);
  const range=r(.8,14,1);
  const aoe=r(1,10,2);
  const input=pick(inputs);
  const start=r(0,.08);
  const end=Math.max(.12,duration-r(0,.14));

  return {
    id:`TST-${spec==='Common'?'C':'A'}-${String(i+1).padStart(3,'0')}`,
    name,
    spec,category:spec,cluster,role,
    input,inputs:[input],
    duration,executionSeconds:duration,timingSeconds:duration,timer:duration,
    damage,hits,dps:Number((damage/duration).toFixed(2)),
    pveDamage:String(damage),pvpDamage:String(pvpDamage),
    staminaCost,resourceDelta,cooldown,
    cc,ccPoints:ccPoints(cc),
    protection,protections:pLabel?[pLabel]:[],
    protectionWindows:protection==='None'?[]:[{
      type:protection,start,end:Number(end.toFixed(3)),
      quality:'synthetic',confidence:r(.72,.99,2)
    }],
    accuracy,critRate,downAttack,airAttack,backAttack,downSmash,airSmash,
    recovery,mobility,range,aoe,
    enabled:true,synthetic:true,
    referenceSource:'BDO Combos Labs deterministic optimizer stress fixture',
    tags:[role,cluster,protection.toLowerCase(),cc.toLowerCase(),downAttack?'down-attack':'',airAttack?'air-attack':'',backAttack?'back-attack':''].filter(Boolean).filter(x=>x!=='none')
  };
}

/* Exactly 100 unique skills: 50 Common + 50 Awakening. */
const common=Array.from({length:50},(_,i)=>makeSkill(i,'Common'));
const awakening=Array.from({length:50},(_,i)=>makeSkill(i+50,'Awakening'));
const allSkills=[...common,...awakening];
const commonNames=new Set(common.map(s=>s.name));

/* Dense deterministic graph to stress transition/cancel search without exposing optimizer logic. */
const transitions=[];
for(let i=0;i<allSkills.length;i++){
  const from=allSkills[i];
  for(let j=0;j<allSkills.length;j++){
    if(i===j)continue;
    const to=allSkills[j];
    const sameCluster=from.cluster===to.cluster;
    const roleChain=(from.role==='opener'&&['cc','bridge'].includes(to.role))||
      (from.role==='cc'&&['damage','finisher'].includes(to.role))||
      (from.role==='bridge'&&['damage','protected'].includes(to.role))||
      (from.role==='damage'&&['finisher','resource'].includes(to.role))||
      (from.role==='mobility'&&['opener','cc'].includes(to.role));
    if(!sameCluster&&!roleChain&&rnd()>.055)continue;

    let timing=r(.035,.46);
    if(sameCluster)timing*=.68;
    if(roleChain)timing*=.72;
    timing=Number(Math.max(.02,timing).toFixed(3));

    const hasCancel=rnd()<(sameCluster?.72:.38);
    const cancelAt=hasCancel?r(.02,Math.max(.03,Math.min(from.duration*.7,.45))):null;
    const confidence=r(.70,.99,2);
    const validated=rnd()>.18;

    transitions.push({
      id:`TR-${String(i+1).padStart(3,'0')}-${String(j+1).padStart(3,'0')}`,
      from:from.name,to:to.name,fromId:from.id,toId:to.id,
      sequence:[from.name,to.name],
      timingSeconds:timing,transitionSeconds:timing,duration:timing,
      timingAttempts:ri(2,8),timingConfidence:confidence,
      measured:true,validated,manualValidation:validated,
      reviewStatus:validated?'validated':'pending',needsValidation:!validated,
      cancelAt,hasCancel:cancelAt!==null,cancelSeconds:cancelAt,
      synergyGroup:sameCluster?from.cluster:(roleChain?`${from.role}->${to.role}`:'exploration'),
      syntheticAffinity:Number(((sameCluster?.45:0)+(roleChain?.4:0)+r(-.12,.22)).toFixed(3)),
      reason:sameCluster&&roleChain?'cluster+role':sameCluster?'cluster':roleChain?'role':'exploration',
      source:'BDO Combos Labs deterministic optimizer stress fixture',sourceTag:'synthetic',
      enabled:true,synthetic:true
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

  try{
    if(typeof CLASS_SKILLS!=='undefined'){
      CLASS_SKILLS[CLASS]={Common:common,Shared:common,Awakening:allSkills,Succession:common};
    }
  }catch(e){console.error('[BCL test fixture] CLASS_SKILLS install failed',e)}

  try{
    if(typeof CLASS_TRANSITIONS!=='undefined'){
      CLASS_TRANSITIONS[CLASS]={
        Awakening:transitions,
        Succession:transitions.filter(t=>commonNames.has(t.from)&&commonNames.has(t.to))
      };
    }
  }catch(e){console.error('[BCL test fixture] CLASS_TRANSITIONS install failed',e)}

  globalThis.BCL_TEST_CLASS_V119={
    version:VERSION,name:CLASS,synthetic:true,
    skills:allSkills,common,awakening,transitions,
    counts:{
      skills:allSkills.length,
      common:common.length,
      awakening:awakening.length,
      transitions:transitions.length,
      cancels:transitions.filter(t=>t.hasCancel).length
    }
  };

  if(sel.value===CLASS){
    try{if(typeof renderClassStats==='function')renderClassStats()}catch(e){}
    try{if(typeof renderSkillsPage==='function')renderSkillsPage()}catch(e){}
    try{if(typeof renderTransitionPage==='function')renderTransitionPage()}catch(e){}
    try{if(typeof renderComboBuilder==='function')renderComboBuilder()}catch(e){}
    try{if(typeof updateBuilder==='function')updateBuilder()}catch(e){}
  }
  return true;
}

function boot(){install();setTimeout(install,120);setTimeout(install,500);setTimeout(install,1500)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
