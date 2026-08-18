(()=>{'use strict';
const ID='bcl-transition-antiflicker-v167';if(window[ID])return;window[ID]=true;
function installStyle(){if(document.getElementById(ID+'-style'))return;const s=document.createElement('style');s.id=ID+'-style';s.textContent=`
#transitionPage,#transitionPage *,#transitionPage *::before,#transitionPage *::after{animation:none!important;transition:none!important}
#transitionPageContent{contain:layout paint style;transform:translateZ(0);backface-visibility:hidden;min-height:1px}
#transitionPage .transition-card,#transitionPage .transition-review-v47,#transitionPage .transition-timing-grid,#transitionPage .transition-timing-box{will-change:auto!important;opacity:1!important;visibility:visible!important}
`;document.head.appendChild(s)}
let lastHeight=0,raf=0;
function stabilize(){const page=document.getElementById('transitionPage'),content=document.getElementById('transitionPageContent');if(!page||!content||!page.classList.contains('active'))return;const h=content.getBoundingClientRect().height;if(h>0){lastHeight=h;content.style.minHeight=h+'px'}cancelAnimationFrame(raf);raf=requestAnimationFrame(()=>requestAnimationFrame(()=>{if(!content.isConnected)return;const nh=content.getBoundingClientRect().height;if(nh>0)lastHeight=nh;content.style.minHeight='';}))}
function boot(){installStyle();const content=document.getElementById('transitionPageContent');if(content){new MutationObserver(stabilize).observe(content,{childList:true,subtree:true,attributes:true,attributeFilter:['class','style']})}document.addEventListener('click',e=>{const b=e.target.closest?.('[data-page="transitionPage"], [onclick*="transitionPage"]');if(b)setTimeout(stabilize,0)},true);window.addEventListener('pageshow',()=>setTimeout(stabilize,0));}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();