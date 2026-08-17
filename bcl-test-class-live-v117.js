(()=>{'use strict';
function load(src,id){
  if(document.getElementById(id))return;
  const s=document.createElement('script');s.id=id;s.src=src;document.head.appendChild(s);
}
load('/bcl-test-class-fixture-v121.js?v=124','bcl-test-class-fixture-v124');
load('/bcl-analysis-settings-v121.js?v=125','bcl-analysis-settings-v125');
})();
