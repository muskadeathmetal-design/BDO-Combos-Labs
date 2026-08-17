(()=>{'use strict';
function load(src,id){
  if(document.getElementById(id))return;
  const s=document.createElement('script');s.id=id;s.src=src;document.head.appendChild(s);
}
load('/bcl-test-native-v128.js?v=128','bcl-test-native-v128');
load('/bcl-analysis-settings-v121.js?v=127','bcl-analysis-settings-v127');
load('/bcl-analysiscore-builder-v129.js?v=140','bcl-analysiscore-builder-v140');
load('/bcl-combo-setup-v134.js?v=134','bcl-combo-setup-v134');
load('/bcl-combo-builder-v135.js?v=136','bcl-combo-builder-v136');
load('/bcl-builder-phase-target-v137.js?v=137','bcl-builder-phase-target-v137');
load('/bcl-combat-profile-v138.js?v=138','bcl-combat-profile-v138');
})();