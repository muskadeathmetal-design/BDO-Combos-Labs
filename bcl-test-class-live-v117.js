(()=>{'use strict';
const modules=[
 ['/bcl-test-native-v128.js?v=128','bcl-test-native-v128'],
 ['/bcl-analysis-settings-v121.js?v=151','bcl-analysis-settings-v151'],
 ['/bcl-site-workspace-v151.js?v=156','bcl-site-class-combos-v156'],
 ['/bcl-analysiscore-builder-v129.js?v=159','bcl-analysiscore-builder-v159'],
 ['/bcl-combat-profile-safe-v141.js?v=158','bcl-combat-profile-safe-v158'],
 ['/bcl-phase-target-safe-v142.js?v=158','bcl-phase-target-safe-v158'],
 ['/bcl-combat-coach-safe-v143.js?v=143','bcl-combat-coach-safe-v143'],
 ['/bcl-builder-harmony-v144.js?v=160','bcl-builder-redesign-v160'],
 ['/bcl-builder-breakpoint-v161.js?v=161','bcl-builder-breakpoint-v161'],
 ['/bcl-addons-scale-v157.js?v=157','bcl-addons-scale-v157'],
 ['/bcl-runtime-health-v158.js?v=158','bcl-runtime-health-v158']
];
function load(src,id){return new Promise(resolve=>{const existing=document.getElementById(id);if(existing){resolve();return}const s=document.createElement('script');s.id=id;s.src=src;s.async=false;s.onload=()=>resolve();s.onerror=()=>{console.error('[BCL loader] failed',src);resolve()};document.head.appendChild(s)})}
(async()=>{for(const [src,id] of modules)await load(src,id);document.documentElement.dataset.bclModulesReady='1'})();
})();