(()=>{'use strict';
const KEY='bcl.clean.v3';
const $=q=>document.querySelector(q);
const esc=v=>String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
const arr=v=>Array.isArray(v)?v:String(v||'').split(',').map(x=>x.trim()).filter(Boolean);
const num=(v,d=0)=>Number.isFinite(Number(v))?Number(v):d;
function state(){try{return JSON.parse(localStorage.getItem(KEY)||'null')||{}}catch(_){return {}}}
function save(s){localStorage.setItem(KEY,JSON.stringify(s))}
function ctx(s){return{c:s?.context?.className||$('#classSelector')?.value||'Test',sp:s?.context?.spec||$('#specSelector')?.value||'Awakening'}}
function list(s){const {c,sp}=ctx(s);s.addons??={};s.addons[c]??={Awakening:[],Succession:[]};s.addons[c][sp]=Array.isArray(s.addons[c][sp])?s.addons[c][sp]:[];return s.addons[c][sp]}
function normalize(a={}){const effect1=a.effect1||a.effect||'',effect2=a.effect2||'';return{skill:a.skill||'',mode:a.mode||'both',effect1,effect1Value:a.effect1Value??'',effect1Duration:a.effect1Duration??'',effect2,effect2Value:a.effect2Value??'',effect2Duration:a.effect2Duration??'',tags:arr(a.tags),notes:a.notes||'',enabled:a.enabled!==false}}
function effectLine(name,val,dur){if(!name)return'—';let x=name;if(String(val).trim())x+=` · ${val}`;if(String(dur).trim())x+=` · ${dur}s`;return x}
function render(){const h=$('#addonList');if(!h)return;const s=state(),d=list(s).map(normalize);h.innerHTML=d.length?d.map((a,i)=>`<article class="row"><div class="row-title"><strong>${esc(a.skill||'Unassigned skill')}</strong><small>${esc(a.mode.toUpperCase())}${a.tags.length?' · '+esc(a.tags.join(', ')):''}</small></div><div class="cell"><span>Effect 1</span><b>${esc(effectLine(a.effect1,a.effect1Value,a.effect1Duration))}</b></div><div class="cell"><span>Effect 2</span><b>${esc(effectLine(a.effect2,a.effect2Value,a.effect2Duration))}</b></div><div class="cell"><span>Status</span><b>${a.enabled?'Enabled':'Disabled'}</b></div><div class="actions"><button data-addon-edit="${i}">Edit</button><button data-addon-dup="${i}">Duplicate</button><button data-addon-toggle="${i}">${a.enabled?'Disable':'Enable'}</button><button data-addon-del="${i}" class="danger">Delete</button></div>${a.notes?`<div style="grid-column:1/-1"><small>${esc(a.notes)}</small></div>`:''}</article>`).join(''):'<div class="empty">No skill add-ons registered.</div>'}
function openEditor(index=null){const s=state(),d=list(s),raw=index==null?{}:d[index]||{},a=normalize(raw),dlg=$('#editorDialog'),form=$('#editorForm'),box=$('#editorFields');if(!dlg||!form||!box)return;$('#editorTitle').textContent=index==null?'Add skill add-on':'Edit skill add-on';box.innerHTML=`
<label>Skill<input name="skill" value="${esc(a.skill)}" required></label>
<label>Mode<select name="mode"><option value="both" ${a.mode==='both'?'selected':''}>PvP & PvE</option><option value="pvp" ${a.mode==='pvp'?'selected':''}>PvP</option><option value="pve" ${a.mode==='pve'?'selected':''}>PvE</option></select></label>
<label>Effect 1<input name="effect1" value="${esc(a.effect1)}" placeholder="e.g. Attack Speed +7%"></label>
<label>Effect 1 value<input name="effect1Value" value="${esc(a.effect1Value)}" placeholder="Optional numeric/text value"></label>
<label>Effect 1 duration (s)<input name="effect1Duration" type="number" step="any" value="${esc(a.effect1Duration)}"></label>
<label>Effect 2<input name="effect2" value="${esc(a.effect2)}" placeholder="e.g. All DP -15"></label>
<label>Effect 2 value<input name="effect2Value" value="${esc(a.effect2Value)}"></label>
<label>Effect 2 duration (s)<input name="effect2Duration" type="number" step="any" value="${esc(a.effect2Duration)}"></label>
<label class="wide">Tags<input name="tags" value="${esc(a.tags.join(', '))}" placeholder="damage, defense, utility"></label>
<label class="wide">Notes<textarea name="notes">${esc(a.notes)}</textarea></label>`;
form.onsubmit=e=>{e.preventDefault();const fd=Object.fromEntries(new FormData(form));const x={...a,skill:String(fd.skill||'').trim(),mode:fd.mode||'both',effect1:String(fd.effect1||'').trim(),effect1Value:String(fd.effect1Value||'').trim(),effect1Duration:fd.effect1Duration===''?'':num(fd.effect1Duration),effect2:String(fd.effect2||'').trim(),effect2Value:String(fd.effect2Value||'').trim(),effect2Duration:fd.effect2Duration===''?'':num(fd.effect2Duration),tags:arr(fd.tags),notes:String(fd.notes||'').trim(),enabled:a.enabled!==false};if(index==null)d.push(x);else d[index]=x;save(s);dlg.close();render()};dlg.showModal()}
function duplicate(i){const s=state(),d=list(s),a=d[i];if(!a)return;d.splice(i+1,0,{...JSON.parse(JSON.stringify(a)),skill:(a.skill||'Skill')+' copy'});save(s);render()}
function toggle(i){const s=state(),d=list(s),a=d[i];if(!a)return;a.enabled=a.enabled===false;save(s);render()}
function del(i){if(!confirm('Delete this skill add-on?'))return;const s=state(),d=list(s);d.splice(i,1);save(s);render()}
function boot(){const add=$('#addAddonBtn');if(add)add.addEventListener('click',e=>{e.preventDefault();e.stopImmediatePropagation();openEditor()},{capture:true});document.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;if(b.dataset.addonEdit!=null){e.preventDefault();e.stopImmediatePropagation();openEditor(+b.dataset.addonEdit)}else if(b.dataset.addonDup!=null){e.preventDefault();e.stopImmediatePropagation();duplicate(+b.dataset.addonDup)}else if(b.dataset.addonToggle!=null){e.preventDefault();e.stopImmediatePropagation();toggle(+b.dataset.addonToggle)}else if(b.dataset.addonDel!=null){e.preventDefault();e.stopImmediatePropagation();del(+b.dataset.addonDel)}else if(b.dataset.page==='addons')setTimeout(render,0)},{capture:true});$('#classSelector')?.addEventListener('change',()=>setTimeout(render,0));$('#specSelector')?.addEventListener('change',()=>setTimeout(render,0));render()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();