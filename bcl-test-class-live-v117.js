(()=>{'use strict';
function load(src,id){
  if(document.getElementById(id))return;
  const s=document.createElement('script');s.id=id;s.src=src;document.head.appendChild(s);
}
load('/bcl-test-native-v128.js?v=128','bcl-test-native-v128');
load('/bcl-analysis-settings-v121.js?v=127','bcl-analysis-settings-v127');
load('/bcl-analysiscore-builder-v129.js?v=132','bcl-analysiscore-builder-v132');
})();
