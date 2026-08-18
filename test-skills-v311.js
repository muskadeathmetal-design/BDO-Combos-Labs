(()=>{'use strict';
const KEY='bcl.clean.v3';
const EXTRA_SKILLS=[
{name:'Azure Pulse',phase:'cc',pveDamage:2860,pvpDamage:1910,duration:.92,cooldown:11,damageAt:.46,cc:['Stun'],ccAt:.61,protection:'Super Armor',staminaCost:120,resourceCost:15,mobility:'',specialAttacks:['Down Attack'],buffs:[],debuffs:['All DP -10'],notes:'Manual V3.11 test skill',enabled:true},
{name:'Solar Arc',phase:'burst',pveDamage:5120,pvpDamage:3340,duration:1.18,cooldown:8,damageAt:.52,cc:[],protection:'Forward Guard',staminaCost:0,resourceCost:35,mobility:'',specialAttacks:['Down Attack'],buffs:['Attack Speed +5%'],debuffs:[],notes:'Manual V3.11 test skill',enabled:true},
{name:'Shadow Pulse',phase:'setup',pveDamage:2140,pvpDamage:1450,duration:.74,cooldown:5,damageAt:.31,cc:['Stiffness'],ccAt:.38,protection:'',staminaCost:80,resourceCost:10,mobility:'forward',specialAttacks:[],buffs:[],debuffs:['Movement Speed -10%'],notes:'Manual V3.11 test skill',enabled:true},
{name:'Astral Fang',phase:'burst',pveDamage:4360,pvpDamage:2890,duration:1.03,cooldown:12,damageAt:.43,cc:[],protection:'Super Armor',staminaCost:140,resourceCost:25,mobility:'',specialAttacks:['Air Attack'],buffs:[],debuffs:[],notes:'Manual V3.11 test skill',enabled:true},
{name:'Golden Mark',phase:'setup',pveDamage:1780,pvpDamage:1190,duration:.68,cooldown:9,damageAt:.29,cc:[],protection:'Forward Guard',staminaCost:0,resourceCost:20,mobility:'',specialAttacks:[],buffs:['All Accuracy +5%'],debuffs:['All DP -15'],notes:'Manual V3.11 test skill',enabled:true},
{name:'Crimson Veil',phase:'defense',pveDamage:1320,pvpDamage:910,duration:.81,cooldown:10,damageAt:.37,cc:['Stiffness'],ccAt:.49,protection:'Super Armor',staminaCost:100,resourceCost:0,mobility:'backward',specialAttacks:[],buffs:['All DP +15'],debuffs:[],notes:'Manual V3.11 test skill',enabled:true},
{name:'Void Brand',phase:'finish',pveDamage:5980,pvpDamage:3910,duration:1.31,cooldown:15,damageAt:.64,cc:['Knockdown'],ccAt:.79,protection:'',staminaCost:0,resourceCost:45,mobility:'',specialAttacks:['Down Attack'],buffs:[],debuffs:[],notes:'Manual V3.11 test skill',enabled:true},
{name:'Feral Rush',phase:'engagement',pveDamage:2250,pvpDamage:1510,duration:.63,cooldown:6,damageAt:.27,cc:[],protection:'Super Armor',staminaCost:180,resourceCost:0,mobility:'forward',specialAttacks:[],buffs:['Movement Speed +10%'],debuffs:[],notes:'Manual V3.11 test skill',enabled:true}
];
let state;try{state=JSON.parse(localStorage.getItem(KEY)||'null')}catch(_){state=null}
if(!state||typeof state!=='object')return;
state.skills=state.skills&&typeof state.skills==='object'?state.skills:{};
state.skills.Test=state.skills.Test&&typeof state.skills.Test==='object'?state.skills.Test:{Awakening:[],Succession:[]};
state.skills.Test.Awakening=Array.isArray(state.skills.Test.Awakening)?state.skills.Test.Awakening:[];
const names=new Set(state.skills.Test.Awakening.map(s=>String(s?.name||'').trim().toLowerCase()));
let added=0;
for(const skill of EXTRA_SKILLS){const key=skill.name.toLowerCase();if(!names.has(key)){state.skills.Test.Awakening.push(skill);names.add(key);added++;}}
if(added)localStorage.setItem(KEY,JSON.stringify(state));
console.info(`[V3.11] ${added} manual test skills added`);
})();