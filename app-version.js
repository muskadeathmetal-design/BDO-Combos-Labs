(()=>{'use strict';
const VERSION='3.12';
window.BDO_COMBOS_LAB_VERSION=VERSION;
function syncVersion(){
  const h=document.querySelector('#appHealth');
  if(h){h.textContent=`Ready · V${VERSION}`;h.className='status-pill good';h.dataset.version=VERSION;}
  document.documentElement.dataset.appVersion=VERSION;
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',syncVersion,{once:true});else syncVersion();
window.addEventListener('load',syncVersion,{once:true});
})();