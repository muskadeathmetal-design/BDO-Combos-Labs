(()=>{'use strict';
function load(src,id){
  if(document.getElementById(id))return;
  const s=document.createElement('script');s.id=id;s.src=src;document.head.appendChild(s);
}
load('/bcl-test-class-fixture-v121.js','bcl-test-class-fixture-v121');
load('/bcl-analysis-settings-v121.js','bcl-analysis-settings-v121');
})();
