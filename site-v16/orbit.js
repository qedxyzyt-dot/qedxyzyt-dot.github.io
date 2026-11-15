"use strict";
/* Calm continuous orbit with explicit keyboard-accessible stop, responsive fallback,
 * no external dependencies. Motion is always disabled by reduced-motion and hidden tabs. */
(() => {
 const stage=document.getElementById("inicio");
 const orbit=document.getElementById("cosmos-projects");
 const rail=document.getElementById("cosmos-rail");
 if(!stage||!orbit||!rail)return;
 const projects=[...document.querySelectorAll("#grid article.project")].map(card=>({
   id:card.id,
   title:card.querySelector("h3")?.textContent?.trim()||card.id,
   href:"./cases/?project="+encodeURIComponent(card.id),
   icon:"./assets/projects/"+(card.id==="iee"?"iee-official-traced-v12":encodeURIComponent(card.id))+".svg"
 }));
 if(!projects.length)return;
 const nodes=[];
 for(const item of projects) {
   const link=document.createElement("a");
   link.className="cosmos-node";
   link.href=item.href;
   link.setAttribute("aria-label","Abrir detalhes do projeto: "+item.title);
   const picture=document.createElement("img");
   picture.src=item.icon;picture.alt="";picture.width=72;picture.height=72;
   picture.decoding="async";
   const title=document.createElement("span");
   title.className="cosmos-label";title.textContent=item.title;
   link.append(picture,title);orbit.append(link);nodes.push(link);
   const railLink=document.createElement("a");
   railLink.href=item.href;
   railLink.setAttribute("aria-label","Detalhes do projeto: "+item.title);
   const railIcon=document.createElement("img");
   railIcon.src=item.icon;railIcon.alt="";railIcon.width=67;railIcon.height=67;
   railIcon.loading="lazy";
   const railLabel=document.createElement("span");railLabel.textContent=item.title;
   railLink.append(railIcon,railLabel);rail.append(railLink);
 }
 const counter=document.querySelector(".cosmos-counter");
 if(counter)counter.textContent=projects.length+" / PROJETOS";
 const reduce=window.matchMedia("(prefers-reduced-motion: reduce)");
 const optOut=document.getElementById("orbit-motion-opt-out");
 let phase=0,pointerOffset=0,targetPointerOffset=0,stoppedByUser=false;
 let hovering=false,visible=true,lastFrame=0,frame=0;
 const speed=2*Math.PI/145000; // one gentle revolution in ~145 seconds

 function canAnimate(){
   return !reduce.matches&&!stoppedByUser&&!hovering&&visible&&!document.hidden&&stage.clientWidth>850;
 }
 function position(){
   const width=stage.clientWidth,height=stage.clientHeight;
   if(width<=850){
     nodes.forEach(link=>{
       link.tabIndex=-1;link.setAttribute("aria-hidden","true");
       link.style.transform="";link.style.zIndex="";
     });
     return;
   }
   const radiusX=Math.max(170,width*.5-88);
   const radiusY=Math.min(344,height*.385);
   const cy=height*.49;
   const nodeSize=width<1100?69:86;
   const angleShift=phase+pointerOffset;
   for(let i=0;i<nodes.length;i++){
     const theta=-Math.PI/2+2*Math.PI*i/nodes.length+angleShift;
     const x=width*.5+Math.cos(theta)*radiusX;
     const y=cy+Math.sin(theta)*radiusY;
     const depth=(Math.sin(theta)+1)*.5;
     const scale=.91+depth*.12;
     const node=nodes[i];
     node.tabIndex=0;node.removeAttribute("aria-hidden");
     node.style.transform="translate3d("+(x-nodeSize/2).toFixed(1)+"px,"+(y-nodeSize/2).toFixed(1)+"px,0) scale("+scale.toFixed(3)+")";
     node.style.zIndex=String(10+Math.round(depth*10));
   }
 }
 function cancel(){if(frame){cancelAnimationFrame(frame);frame=0;}lastFrame=0;}
 function tick(time){
   frame=0;
   if(!canAnimate()){position();lastFrame=0;return;}
   if(lastFrame){
     const elapsed=Math.min(64,time-lastFrame);
     phase=(phase+elapsed*speed)%(Math.PI*2);
   }
   lastFrame=time;
   pointerOffset+=(targetPointerOffset-pointerOffset)*.032;
   position();
   frame=requestAnimationFrame(tick);
 }
 function refresh(){
   cancel();position();
   orbit.classList.toggle("orbit-running",canAnimate());
   if(canAnimate())frame=requestAnimationFrame(tick);
 }
 stage.addEventListener("pointermove",event=>{
   if(event.pointerType==="touch"||reduce.matches||stage.clientWidth<=850)return;
   const rect=stage.getBoundingClientRect();
   const x=(event.clientX-rect.left)/Math.max(1,rect.width)-.5;
   targetPointerOffset=x*.08;
 },{passive:true});
 stage.addEventListener("pointerleave",()=>{targetPointerOffset=0;},{passive:true});
 orbit.addEventListener("pointerover",event=>{
   if(event.target.closest(".cosmos-node")){hovering=true;refresh();}
 });
 orbit.addEventListener("pointerout",event=>{
   if(event.relatedTarget&&orbit.contains(event.relatedTarget))return;
   hovering=false;refresh();
 });
 orbit.addEventListener("focusin",()=>{hovering=true;refresh();});
 orbit.addEventListener("focusout",event=>{
   if(event.relatedTarget&&orbit.contains(event.relatedTarget))return;
   hovering=false;refresh();
 });
 if(optOut){
   optOut.addEventListener("click",()=>{
     stoppedByUser=!stoppedByUser;
     optOut.setAttribute("aria-pressed",String(stoppedByUser));
     optOut.textContent=stoppedByUser?"Retomar órbita dos projetos":"Suspender órbita dos projetos";
     refresh();
   });
 }
 window.addEventListener("resize",refresh,{passive:true});
 document.addEventListener("visibilitychange",refresh);
 if(typeof reduce.addEventListener==="function")reduce.addEventListener("change",refresh);
 if("IntersectionObserver" in window){
   new IntersectionObserver(entries=>{
     visible=entries[0]?.isIntersecting??false;refresh();
   },{threshold:.04}).observe(stage);
 }
 refresh();
})();
