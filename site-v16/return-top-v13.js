"use strict";
/* Return-to-top control; visible only after meaningful scroll. */
(() => {
 const goTop=document.querySelector(".back-to-top");
 let scheduled=false;
 const refresh=()=>{
  scheduled=false;
  if(!goTop)return;
  const threshold=Math.max(560,window.innerHeight*.7);
  goTop.classList.toggle("is-visible",window.scrollY>threshold);
 };
 if(goTop){
  window.addEventListener("scroll",()=>{
   if(scheduled)return;
   scheduled=true;requestAnimationFrame(refresh);
  },{passive:true});
  window.addEventListener("resize",refresh,{passive:true});
  refresh();
 }

})();
