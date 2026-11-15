"use strict";
/* Atelier motion: progressive enhancement only. All content remains visible without JS.
 * CSS handles color/identity, JS handles scroll progress, entry cadence, active
 * navigation and pointer feedback. Never accesses project data or external services.
 */
(() => {
 const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
 const menuToggle=document.getElementById("nav-menu-toggle");
 const mobileNav=document.getElementById("mobile-nav");
 if(menuToggle && mobileNav){
   const menuIcon=menuToggle.querySelector("img");
   const iconBase=menuToggle.dataset.iconBase||"./assets/projects/";
   function closeMenu(restore=false){
     mobileNav.hidden=true;
     menuToggle.setAttribute("aria-expanded","false");
     menuToggle.setAttribute("aria-label","Abrir menu de navegação");
     if(menuIcon)menuIcon.src=iconBase+"ui-menu.svg";
     if(restore)menuToggle.focus();
   }
   menuToggle.addEventListener("click",()=>{
     const open=mobileNav.hidden;
     mobileNav.hidden=!open;
     menuToggle.setAttribute("aria-expanded",String(open));
     menuToggle.setAttribute("aria-label",open?"Fechar menu de navegação":"Abrir menu de navegação");
     if(menuIcon)menuIcon.src=iconBase+(open?"ui-x.svg":"ui-menu.svg");
   });
   mobileNav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>closeMenu()));
   document.addEventListener("keydown",e=>{if(e.key==="Escape"&&!mobileNav.hidden)closeMenu(true)});
   document.addEventListener("pointerdown",e=>{if(!mobileNav.hidden&&!mobileNav.contains(e.target)&&!menuToggle.contains(e.target))closeMenu()});
   window.addEventListener("resize",()=>{if(window.innerWidth>1000&&!mobileNav.hidden)closeMenu()},{passive:true});
 }
 const fine = window.matchMedia("(pointer: fine)");
 const progress = document.getElementById("scroll-progress-line");
 let requested = false;

 function paintScroll() {
   requested = false;
   const max = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
   const fraction = max ? Math.max(0, Math.min(1, window.scrollY / max)) : 0;
   if (progress) progress.style.transform = "scaleX(" + fraction.toFixed(5) + ")";
 }
 function requestPaint() {
   if (!requested) {
     requested = true;
     window.requestAnimationFrame(paintScroll);
   }
 }
 window.addEventListener("scroll", requestPaint, {passive:true});
 window.addEventListener("resize", requestPaint, {passive:true});
 requestPaint();

 const sections = [...document.querySelectorAll("main section[id]")];
 const navLinks = [...document.querySelectorAll(".nav-links a[href^='#']")];
 if ("IntersectionObserver" in window && sections.length && navLinks.length) {
   const activeObserver = new IntersectionObserver(entries=>{
     for(const entry of entries) {
       if(!entry.isIntersecting) continue;
       const id = entry.target.id;
       for(const a of navLinks){
         const active = a.getAttribute("href") === "#" + id;
         a.classList.toggle("nav-active",active);
         if(active) a.setAttribute("aria-current","location");
         else a.removeAttribute("aria-current");
       }
     }
   },{rootMargin:"-18% 0px -70% 0px",threshold:0});
   sections.forEach(section=>activeObserver.observe(section));
 }

 // Only activate reveal transitions when observer support exists. Nothing important
 // becomes hidden if the browser doesn't support them.
 function initReveals(){
   const elements = [
     ...document.querySelectorAll(".featured-work-head,.feature-case,.section-head,.project,.education-intro,.education-item,.method-layout>div,.timeline li,.contact-inner,.case-story,.case-section-head,.case-pillar,.case-special,.case-related")
   ];
   if(!elements.length || reduce.matches || !("IntersectionObserver" in window)) return;
   const observer = new IntersectionObserver(entries=>{
     for(const entry of entries){
       if(!entry.isIntersecting)continue;
       entry.target.classList.add("is-visible");
       observer.unobserve(entry.target);
     }
   },{rootMargin:"0px 0px -45px 0px",threshold:.06});
   elements.forEach((element,index)=>{
     element.dataset.atelierReveal = "";
     const delay = element.matches(".project,.case-pillar,.education-item") ? Math.min(index%3,2)*65 : 0;
     element.style.setProperty("--reveal-delay",delay+"ms");
     observer.observe(element);
   });
   document.documentElement.classList.add("motion-enabled");
 }
 initReveals();

 // Pointer proximity glimmer within feature cases and catalog cards. No tilt,
 // autoscroll, cursor hijacking, or overriding touch interactions.
 const pointerCards = [...document.querySelectorAll(".feature-case,.project")];
 function bindPointer(){
   for(const card of pointerCards) {
     if (card.dataset.atelierPointer === "1") continue;
     card.dataset.atelierPointer="1";
     card.addEventListener("pointermove",event=>{
       if(reduce.matches || !fine.matches)return;
       const box=card.getBoundingClientRect();
       card.style.setProperty("--mx",((event.clientX-box.left)/box.width*100).toFixed(1)+"%");
       card.style.setProperty("--my",((event.clientY-box.top)/box.height*100).toFixed(1)+"%");
     },{passive:true});
   }
 }
 if (fine.matches) bindPointer();

 // Mobile rail: buttons supplement swipe, scroll and keyboard access.
 const rail=document.getElementById("cosmos-rail");
 const railPrev=document.getElementById("cosmos-rail-prev");
 const railNext=document.getElementById("cosmos-rail-next");
 const railPosition=document.getElementById("cosmos-rail-position");
 if(rail && railPrev && railNext) {
   const items=[...rail.querySelectorAll("a")];
   function activeIndex(){
     if(!items.length)return 0;
     const railLeft=rail.getBoundingClientRect().left;
     let best=0,nearest=Infinity;
     for(let i=0;i<items.length;i++){
       const dx=Math.abs(items[i].getBoundingClientRect().left-railLeft-18);
       if(dx<nearest){nearest=dx;best=i;}
     }
     return best;
   }
   let queued=false;
   function syncRail(){
     queued=false;
     const index=activeIndex();
     if(railPosition) railPosition.textContent=String(index+1).padStart(2,"0")+" / "+items.length;
     railPrev.disabled=index===0;
     railNext.disabled=index===items.length-1;
   }
   function requestRail(){
     if(!queued){queued=true;window.requestAnimationFrame(syncRail);}
   }
   function moveRail(delta){
     const target=items[Math.max(0,Math.min(items.length-1,activeIndex()+delta))];
     if(target)target.scrollIntoView({block:"nearest",inline:"start",behavior:reduce.matches?"instant":"smooth"});
   }
   railPrev.addEventListener("click",()=>moveRail(-1));
   railNext.addEventListener("click",()=>moveRail(1));
   rail.addEventListener("scroll",requestRail,{passive:true});
   window.addEventListener("resize",requestRail,{passive:true});
   requestRail();
 }

 // Focus/hover on a featured project's picture surfaces its genuine product color.
 // This is CSS-only decoration and cannot change navigation or content semantics.
 reduce.addEventListener?.("change",()=>{
   if(reduce.matches) {
     document.documentElement.classList.remove("motion-enabled");
     document.querySelectorAll("[data-atelier-reveal]").forEach(el=>{
       el.classList.add("is-visible");
     });
   }
   requestPaint();
 });
})();
