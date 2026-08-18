(()=>{'use strict';
function load(src,id){
  if(document.getElementById(id))return;
  const s=document.createElement('script');s.id=id;s.src=src;document.head.appendChild(s);
}
load('/bcl-test-native-v128.js?v=128','bcl-test-native-v128');
load('/bcl-analysis-settings-v121.js?v=127','bcl-analysis-settings-v127');
load('/bcl-analysiscore-builder-v129.js?v=140','bcl-analysiscore-builder-v140');
load('/bcl-combat-profile-safe-v141.js?v=141','bcl-combat-profile-safe-v141');
load('/bcl-phase-target-safe-v142.js?v=142','bcl-phase-target-safe-v142');
load('/bcl-combat-coach-safe-v143.js?v=143','bcl-combat-coach-safe-v143');
load('/bcl-builder-harmony-v144.js?v=149','bcl-builder-workspace-v149');
})();