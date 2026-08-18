(()=>{'use strict';
const ID='bcl-transition-change-guard-v165';if(window[ID])return;window[ID]=true;
let lastClass='',lastSpec='Awakening';
function active(){return !!document.getElementById('transitionPage')?.classList.contains('active')}
function read(){return{cls:document.getElementById('classSelector')?.value||'',spec:document.getElementById('specSelector')?.value||'Awakening'}}
function sync(){const v=read();lastClass=v.cls;lastSpec=v.spec}
function guard(e){if(!active())return;const t=e.target;if(!(t instanceof HTMLSelectElement))return;if(t.id!=='classSelector'&&t.id!=='specSelector')return;const v=read();const unchanged=v.cls===lastClass&&v.spec===lastSpec;if(!e.isTrusted&&unchanged){e.stopImmediatePropagation();e.preventDefault();return}lastClass=v.cls;lastSpec=v.spec;try{window.bclInvalidateTransitionRenderV164?.()}catch(_){} }
document.addEventListener('change',guard,true);
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',sync,{once:true});else sync();
window.addEventListener('pageshow',sync);
})();