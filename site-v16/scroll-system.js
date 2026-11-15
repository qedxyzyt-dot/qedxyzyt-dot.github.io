"use strict";
/* Scroll UI by the author — real scroll position, no fake animation.
 * Native wheel, touch, trackpad, screen reader navigation and anchor links remain
 * functional. If the enhancement fails, untouched native scrollbars are retained. */
(() => {
 const root=document.documentElement;
 if(!("requestAnimationFrame" in window)||!("PointerEvent" in window))return;
 const clamp=(n,min,max)=>Math.max(min,Math.min(max,n));
 function makeTrack(className,orientation,controls,label){
   const el=document.createElement("div");
   el.className=className;el.setAttribute("role","scrollbar");
   el.setAttribute("tabindex","0");el.setAttribute("aria-label",label);
   el.setAttribute("aria-controls",controls);
   el.setAttribute("aria-orientation",orientation);
   el.setAttribute("aria-valuemin","0");el.setAttribute("aria-valuemax","100");
   el.setAttribute("aria-valuenow","0");
   const thumb=document.createElement("span");
   thumb.className=className.replace("track","thumb");
   thumb.setAttribute("aria-hidden","true");el.append(thumb);
   return {el,thumb};
 }
 const vertical=makeTrack("site-scroll-track","vertical",document.querySelector("main")?.id||"principal","Rolagem vertical da página");
 document.body.append(vertical.el);
 const rail=document.getElementById("cosmos-rail");
 const horizontal=rail?makeTrack("rail-scroll-track","horizontal","cosmos-rail","Posição na lista horizontal dos projetos"):null;
 if(rail && horizontal)rail.insertAdjacentElement("afterend",horizontal.el);

 let raf=0;
 const getMaxY=()=>Math.max(0,root.scrollHeight-window.innerHeight);
 function paintVertical(){
   const max=getMaxY();
   vertical.el.hidden=max<=1;
   if(max<=1)return;
   const trackH=vertical.el.clientHeight;
   const contentH=root.scrollHeight;
   const thumbH=clamp(trackH*window.innerHeight/contentH,42,trackH);
   const travel=Math.max(0,trackH-thumbH);
   const fraction=clamp(window.scrollY/max,0,1);
   vertical.thumb.style.height=thumbH+"px";
   vertical.thumb.style.top=(travel*fraction)+"px";
   vertical.el.setAttribute("aria-valuenow",String(Math.round(fraction*100)));
   vertical.el.setAttribute("aria-valuetext",Math.round(fraction*100)+"% da página");
 }
 function paintHorizontal(){
   if(!rail||!horizontal)return;
   const mobile=getComputedStyle(rail).display!=="none";
   const max=Math.max(0,rail.scrollWidth-rail.clientWidth);
   const active=mobile&&max>3;
   horizontal.el.dataset.active=String(active);
   if(!active)return;
   const width=horizontal.el.clientWidth;
   const thumbWidth=clamp(width*rail.clientWidth/rail.scrollWidth,36,width);
   const fraction=clamp(rail.scrollLeft/max,0,1);
   horizontal.thumb.style.width=thumbWidth+"px";
   horizontal.thumb.style.left=(width-thumbWidth)*fraction+"px";
   horizontal.el.setAttribute("aria-valuenow",String(Math.round(fraction*100)));
   horizontal.el.setAttribute("aria-valuetext",Math.round(fraction*100)+"% dos projetos");
 }
 function paint(){raf=0;paintVertical();paintHorizontal();}
 function requestPaint(){if(!raf)raf=requestAnimationFrame(paint);}
 function bindDrag(track,thumb,isHorizontal){
   let drag=null;
   const length=()=>isHorizontal?track.clientWidth:track.clientHeight;
   const position=(event)=>isHorizontal?event.clientX-track.getBoundingClientRect().left:event.clientY-track.getBoundingClientRect().top;
   const maxScroll=()=>isHorizontal?Math.max(0,rail.scrollWidth-rail.clientWidth):getMaxY();
   const scrollToValue=(value)=>{
     const max=maxScroll();
     if(isHorizontal)rail.scrollLeft=clamp(value,0,max);
     else window.scrollTo({top:clamp(value,0,max),behavior:"instant"});
     requestPaint();
   };
   track.addEventListener("pointerdown",event=>{
     if(event.button!==0)return;
     event.preventDefault();
     const thumbBox=thumb.getBoundingClientRect(),trackBox=track.getBoundingClientRect();
     const begin=isHorizontal?thumbBox.left-trackBox.left:thumbBox.top-trackBox.top;
     const extent=isHorizontal?thumbBox.width:thumbBox.height;
     const cursor=position(event);
     const inside=cursor>=begin&&cursor<=begin+extent;
     drag={pointer:event.pointerId,offset:inside?cursor-begin:extent/2};
     const travel=Math.max(0,length()-extent);
     const fraction=travel?(cursor-drag.offset)/travel:0;
     scrollToValue(clamp(fraction,0,1)*maxScroll());
     track.dataset.dragging="true";track.setPointerCapture(event.pointerId);
   });
   track.addEventListener("pointermove",event=>{
     if(!drag||event.pointerId!==drag.pointer)return;
     event.preventDefault();
     const extent=isHorizontal?thumb.getBoundingClientRect().width:thumb.getBoundingClientRect().height;
     const travel=Math.max(0,length()-extent);
     const fraction=travel?(position(event)-drag.offset)/travel:0;
     scrollToValue(clamp(fraction,0,1)*maxScroll());
   });
   const release=(event)=>{
     if(!drag||event.pointerId!==drag.pointer)return;
     drag=null;delete track.dataset.dragging;
     if(track.hasPointerCapture(event.pointerId))track.releasePointerCapture(event.pointerId);
   };
   track.addEventListener("pointerup",release);
   track.addEventListener("pointercancel",release);
   track.addEventListener("lostpointercapture",()=>{drag=null;delete track.dataset.dragging;});
   track.addEventListener("keydown",event=>{
     const step=isHorizontal?Math.max(85,rail.clientWidth*.3):64;
     const page=isHorizontal?rail.clientWidth*.85:window.innerHeight*.85;
     const current=isHorizontal?rail.scrollLeft:window.scrollY;
     const commands={
       ArrowDown:step,ArrowRight:step,ArrowUp:-step,ArrowLeft:-step,
       PageDown:page,PageUp:-page
     };
     if(event.key==="Home"){event.preventDefault();scrollToValue(0);}
     else if(event.key==="End"){event.preventDefault();scrollToValue(maxScroll());}
     else if(event.key in commands){event.preventDefault();scrollToValue(current+commands[event.key]);}
   });
 }
 bindDrag(vertical.el,vertical.thumb,false);
 if(rail&&horizontal)bindDrag(horizontal.el,horizontal.thumb,true);
 window.addEventListener("scroll",requestPaint,{passive:true});
 window.addEventListener("resize",requestPaint,{passive:true});
 if(rail)rail.addEventListener("scroll",requestPaint,{passive:true});
 if("ResizeObserver" in window){
   const observer=new ResizeObserver(requestPaint);
   observer.observe(root);
   if(rail)observer.observe(rail);
 }
 // Enhancement only starts after the required controls are constructed.
 root.classList.add("scroll-enhanced");
 if(rail)rail.classList.add("rail-scroll-enhanced");
 requestPaint();
})();
