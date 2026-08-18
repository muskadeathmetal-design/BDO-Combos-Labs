(()=>{'use strict';
const KEY='bcl.clean.v3';
const MARK='bcl.migration.testskills.v313';
const SRC='https://raw.githubusercontent.com/muskadeathmetal-design/BDO-Combos-Labs/legacy-before-clean-rewrite-2026-08-18/bcl-test-native-v128.js';
const empty=v=>v==null||v===''||(Array.isArray(v)&&v.length===0);
function mergeSkill(oldSkill,current){
  if(!current){
    const x={...oldSkill};
    if(!x.phase)x.phase=x.role||'unclassified';
    if(!x.protection&&Array.isArray(x.protections)&&x.protections.length)x.protection=x.protections[0];
    return x;
  }
  const out={...current};
  for(const [k,v] of Object.entries(oldSkill)) if(empty(out[k])&&!empty(v)) out[k]=v;
  if(empty(out.phase)&&!empty(oldSkill.role))out.phase=oldSkill.role;
  if(empty(out.protection)&&Array.isArray(oldSkill.protections)&&oldSkill.protections.length)out.protection=oldSkill.protections[0];
  return out;
}
async function migrate(){
  if(localStorage.getItem(MARK)==='done')return;
  try{
    const r=await fetch(SRC,{cache:'no-store'}); if(!r.ok)throw new Error('legacy source HTTP '+r.status);
    const text=await r.text();
    const m=text.match(/const TEST_SKILLS=(\[[\s\S]*?\]);\s*const TEST_TRANSITIONS=/);
    if(!m)throw new Error('TEST_SKILLS block not found');
    const all=JSON.parse(m[1]);
    const state=JSON.parse(localStorage.getItem(KEY)||'{}');
    state.skills??={}; state.skills.Test??={Awakening:[],Succession:[]};
    for(const spec of ['Awakening','Succession']){
      const source=spec==='Awakening'?all:all.filter(s=>s.spec==='Common');
      const current=Array.isArray(state.skills.Test[spec])?state.skills.Test[spec]:[];
      const byName=new Map(current.map(s=>[String(s?.name||'').trim().toLowerCase(),s]));
      const merged=source.map(s=>mergeSkill(s,byName.get(String(s.name).trim().toLowerCase())));
      const sourceNames=new Set(source.map(s=>String(s.name).trim().toLowerCase()));
      for(const s of current)if(!sourceNames.has(String(s?.name||'').trim().toLowerCase()))merged.push(s);
      state.skills.Test[spec]=merged;
    }
    state.migrations={...(state.migrations||{}),legacyTestSkillsV313:{at:new Date().toISOString(),awakening:state.skills.Test.Awakening.length,succession:state.skills.Test.Succession.length}};
    localStorage.setItem(KEY,JSON.stringify(state));
    localStorage.setItem(MARK,'done');
    location.reload();
  }catch(e){console.error('[V3.13 migration]',e);localStorage.setItem(MARK,'error:'+String(e?.message||e));}
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',migrate,{once:true});else migrate();
})();