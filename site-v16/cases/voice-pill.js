"use strict";
/* Voice2Text – web recreation of the WPF listening pill, derived from:
 * src/Voice2Text.UI/{CursorOverlayWindow.xaml,VoiceEnvelopeRenderer.cs}
 * and an owner-provided reference capture.
 * No microphone, audio, clipboard, OS hooks or live transcription.
 * The waveform is deterministic stage-demo content, not measured audio. */
(() => {
 const project=new URLSearchParams(location.search).get("project");
 if(project!=="voice2text")return;
 const container=document.querySelector(".case-artframe");
 if(!container)return;
 container.classList.add("voice-pill-case");
 container.innerHTML=`<div class="v2t-stage">
 <div class="v2t-stage-intro"><span>WINDOWS · PÍLULA DE CAPTURA</span>
  <h2>O estado da voz, <em>sempre visível.</em></h2>
  <p>Feedback luminoso, fluxo de captura e processamento local: uma interface compacta que acompanha o trabalho sem interromper o editor.</p>
  <div class="v2t-technical"><span>398 × 80 px / referência nativa</span><span>WPF · C# · Windows</span><span>60 Hz nominal no renderer</span></div>
 </div>
 <div class="v2t-pill-viewport">
 <div class="v2t-pill-demo" id="v2t-pill-demo" aria-label="Animação interativa da interface de captura Voice2Text">
  <svg class="v2t-ring" viewBox="0 0 452 128" aria-hidden="true" preserveAspectRatio="xMidYMid meet">
   <defs>
    <linearGradient id="v2t-envelope-grad" gradientUnits="userSpaceOnUse" x1="27" y1="64" x2="425" y2="64">
      <stop offset="0%" stop-color="#34e8d2"/><stop offset="48%" stop-color="#739dff"/><stop offset="100%" stop-color="#bf71ff"/>
    </linearGradient>
    <filter id="v2t-blur-11" x="-30%" y="-110%" width="160%" height="320%"><feGaussianBlur stdDeviation="10"/></filter>
    <filter id="v2t-blur-17" x="-35%" y="-130%" width="170%" height="360%"><feGaussianBlur stdDeviation="13"/></filter>
    <filter id="v2t-blur-9" x="-30%" y="-100%" width="160%" height="300%"><feGaussianBlur stdDeviation="7"/></filter>
    <filter id="v2t-blur-5" x="-20%" y="-70%" width="140%" height="240%"><feGaussianBlur stdDeviation="3.5"/></filter>
   </defs>
   <path class="v2t-halo" d="M67 24 H385 A40 40 0 0 1 425 64 A40 40 0 0 1 385 104 H67 A40 40 0 0 1 27 64 A40 40 0 0 1 67 24 Z" fill="none" stroke="url(#v2t-envelope-grad)" stroke-width="11" filter="url(#v2t-blur-11)" opacity=".21"/>
   <path class="v2t-edge" d="M67 24 H385 A40 40 0 0 1 425 64 A40 40 0 0 1 385 104 H67 A40 40 0 0 1 27 64 A40 40 0 0 1 67 24 Z" fill="none" stroke="url(#v2t-envelope-grad)" stroke-width="1.5" opacity=".54"/>
   <path class="v2t-pulse-glow" fill="url(#v2t-envelope-grad)" filter="url(#v2t-blur-17)" opacity=".26"/>
   <path class="v2t-pulse-trail" fill="url(#v2t-envelope-grad)" filter="url(#v2t-blur-9)" opacity=".23"/>
   <path class="v2t-pulse-core" fill="url(#v2t-envelope-grad)" filter="url(#v2t-blur-5)" opacity=".18"/>
  </svg>
  <div class="v2t-capsule">
    <button type="button" class="v2t-control v2t-cancel" title="Cancelar animação" aria-label="Cancelar animação" data-v2t-action="cancel"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true" focusable="false"><path d="M5.5 5.5 18.5 18.5M18.5 5.5 5.5 18.5" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg></button>
    <div class="v2t-voice-core"><div class="v2t-status" aria-live="off"><span id="v2t-status">Ouvindo</span><span class="v2t-status-dot">·</span><time id="v2t-timer">00:00</time></div>
      <div class="v2t-bars" id="v2t-bars" aria-hidden="true"></div>
    </div>
    <button type="button" class="v2t-control v2t-pause" title="Pausar animação" aria-label="Pausar animação" data-v2t-action="pause"><svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M5 3.5v9M11 3.5v9" stroke="currentColor" stroke-width="2.8" stroke-linecap="round"/></svg></button>
    <button type="button" class="v2t-control v2t-stop" title="Concluir animação" aria-label="Concluir animação" data-v2t-action="stop"><span aria-hidden="true"></span></button>
  </div>
 </div>
 </div>
 <div class="v2t-demo-actions"><button type="button" class="v2t-replay" id="v2t-replay">Reproduzir novamente <span aria-hidden="true">↺</span></button><span class="v2t-demo-state" id="v2t-demo-state">Ciclo visual de interface</span></div>
 </div>
 <figcaption>Voice2Text no Windows · interface WPF reproduzida em HTML/SVG a partir do componente de captura.</figcaption>`;
 const demo=container.querySelector("#v2t-pill-demo");
 const bars=container.querySelector("#v2t-bars");
 const timer=container.querySelector("#v2t-timer");
 const status=container.querySelector("#v2t-status");
 const note=container.querySelector("#v2t-demo-state");
 const halo=container.querySelector(".v2t-halo");
 const glow=container.querySelector(".v2t-pulse-glow");
 const trail=container.querySelector(".v2t-pulse-trail");
 const core=container.querySelector(".v2t-pulse-core");
 const viewport=container.querySelector(".v2t-pill-viewport");
 function syncLayout(){
   const available=viewport.clientWidth;
   const factor=Math.min(1,Math.max(.52,(available-8)/452));
   demo.style.setProperty("--pill-scale",factor.toFixed(4));
   viewport.style.height=(128*factor+22).toFixed(1)+"px";
 }
 // Capsule geometry mirrors the WPF native renderer's perimeter parameterization.
 const box={left:27,top:24,width:398,height:80,radius:40};
 const straight=box.width-2*box.radius;
 const perimeter=2*straight+2*Math.PI*box.radius;
 function along(distance){
   let p=((distance%perimeter)+perimeter)%perimeter;
   if(p<straight)return {x:box.left+box.radius+p,y:box.top};
   p-=straight;
   if(p<Math.PI*box.radius){
     const a=-Math.PI/2+p/box.radius;
     return {x:box.left+box.width-box.radius+box.radius*Math.cos(a),y:box.top+box.radius+box.radius*Math.sin(a)};
   }
   p-=Math.PI*box.radius;
   if(p<straight)return {x:box.left+box.width-box.radius-p,y:box.top+box.height};
   p-=straight;
   const a=Math.PI/2+p/box.radius;
   return {x:box.left+box.radius+box.radius*Math.cos(a),y:box.top+box.radius+box.radius*Math.sin(a)};
 }
 function ribbon(head,length,offset){
   const left=[],right=[],n=72;
   for(let i=0;i<=n;i++){
     const u=i/n,d=head-length+length*u;
     const c=along(d),before=along(d-.18),after=along(d+.18);
     const dx=after.x-before.x,dy=after.y-before.y,norm=Math.max(.00001,Math.hypot(dx,dy));
     const taper=Math.pow(Math.sin(Math.PI*u),2);
     const ox=-dy/norm*offset*taper,oy=dx/norm*offset*taper;
     left.push((c.x+ox).toFixed(2)+","+(c.y+oy).toFixed(2));
     right.push((c.x-ox).toFixed(2)+","+(c.y-oy).toFixed(2));
   }
   return "M"+left[0]+"L"+left.slice(1).join("L")+"L"+right.reverse().join("L")+"Z";
 }
 const pause=container.querySelector('[data-v2t-action="pause"]');
 const reduced=matchMedia("(prefers-reduced-motion: reduce)");
 const heights=Array.from({length:36},()=>{const b=document.createElement("i");b.style.height="4px";bars.append(b);return b;});
 let playing=true,active=true,visible=true,progress=0,last=0,frame=0,phase=.04,level=.1,rhythm=0,speed=.003,previous=.0,cooldown=0;
 let lastState="";
 const windowActive=()=>!document.hidden&&visible&&!reduced.matches;
 function state(){return progress<12?"listening":progress<15?"paused":progress<18?"processing":progress<22?"complete":"replay";}
 function notify(s){
   if(s===lastState)return;
   lastState=s;demo.dataset.phase=s;
   const labels={listening:"Ouvindo",paused:"Pausado",processing:"Transcrevendo",complete:"Concluído",replay:"Pronto"};
   status.textContent=labels[s];
   note.textContent={
    listening:"Escuta em destaque · contorno luminoso",paused:"Captura pausada",
    processing:"Processamento em destaque",complete:"Texto pronto para edição",
    replay:"Novo ciclo de captura"
   }[s];
 }
 function setPauseButton(){
  pause.setAttribute("aria-label",playing?"Pausar animação":"Retomar animação");
  pause.setAttribute("title",playing?"Pausar animação":"Retomar animação");
  pause.setAttribute("aria-pressed",String(!playing));
  pause.innerHTML=playing?'<svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M5 3.5v9M11 3.5v9" stroke="currentColor" stroke-width="2.8" stroke-linecap="round"/></svg>':'<svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M5 2.5v11l9-5.5z" fill="currentColor"/></svg>';
 }
 function paint(t,dt){
   const s=state();
   notify(s);
   const elapsed=s==="listening"?progress:s==="paused"?12:0;
   const n=Math.max(0,Math.floor(elapsed));
   timer.textContent=String(Math.floor(n/60)).padStart(2,"0")+":"+String(n%60).padStart(2,"0");
   let average=0,peak=0;
   const listening=s==="listening"&&playing;
   for(let i=0;i<heights.length;i++){
     const envelope=listening?(0.17+0.6*Math.pow(Math.sin(t*.0035+i*.32),2)*(0.3+0.7*Math.abs(Math.sin(t*.0014)))):s==="processing"?.20:.09;
     const v=Math.max(.06,Math.min(1,envelope*(.48+.52*Math.abs(Math.sin(i*1.37+t*.0024)))));
     heights[i].style.height=(2.8+v*27.2).toFixed(2)+"px";
     average+=v;peak=Math.max(peak,v);
   }
   average/=heights.length;
   const target=s==="processing"?.48+(Math.sin(phase*Math.PI*4)*.07):listening?Math.min(1,average*1.55+peak*.34):.07;
   const energy=average*.78+peak*.22;
   const onset=Math.max(0,energy-previous);
   previous+=(energy-previous)*(energy>previous?.42:.24);
   cooldown=Math.max(0,cooldown-1);
   rhythm*=.925;
   if(cooldown===0&&listening&&energy>.16&&onset>.046){rhythm=Math.min(1,rhythm+Math.min(.65,onset*3.6));cooldown=10;}
   level+=(target-level)*(target>level?.22:.10);
   const targetSpeed=s==="processing"?.0045:.0024+level*.0021+rhythm*.0043;
   speed+=(targetSpeed-speed)*.12;
   if(playing&&!["paused","complete"].includes(s))phase=(phase+Math.min(.009,Math.max(.0018,speed))*Math.min(2,dt/16.67))%1;
   const visiblePulse=playing && !["paused","complete","replay"].includes(s) && !reduced.matches;
   halo.setAttribute("opacity",(s==="paused"?.13:.18+level*.10).toFixed(3));
   if(!visiblePulse){
     [glow,trail,core].forEach(path=>path.setAttribute("d",""));
   }else{
     const head=phase*perimeter;
     glow.setAttribute("d",ribbon(head,perimeter*.55,4.5+level*2));
     trail.setAttribute("d",ribbon(head,perimeter*.43,2+level*.8));
     core.setAttribute("d",ribbon(head,perimeter*.25,.8+level*.35));
     glow.setAttribute("opacity",(.19+level*.18+rhythm*.05).toFixed(3));
     trail.setAttribute("opacity",(.15+level*.16+rhythm*.04).toFixed(3));
     core.setAttribute("opacity",(.10+level*.14).toFixed(3));
   }
 }
 function stopFrame(){if(frame)cancelAnimationFrame(frame);frame=0;last=0;}
 function loop(now){
   frame=0;if(!windowActive())return;
   const dt=last?Math.min(65,now-last):16.67;last=now;
   if(playing){progress+=dt/1000;if(progress>=22){progress=0;lastState="";}}
   paint(now,dt);
   frame=requestAnimationFrame(loop);
 }
 function refresh(){stopFrame();notify(state());if(windowActive())frame=requestAnimationFrame(loop);else paint(0,16.67);}
 container.querySelectorAll("[data-v2t-action]").forEach(button=>{
   button.addEventListener("click",()=>{
     const action=button.dataset.v2tAction;
     if(action==="pause"){playing=!playing;setPauseButton();}
     else if(action==="cancel"){playing=false;progress=0;note.textContent="Captura cancelada";lastState="";setPauseButton();}
     else if(action==="stop"){playing=false;progress=18;note.textContent="Captura concluída";lastState="";setPauseButton();}
     refresh();
   });
 });
 container.querySelector("#v2t-replay").addEventListener("click",()=>{progress=0;playing=true;phase=.04;lastState="";setPauseButton();refresh();});
 document.addEventListener("visibilitychange",refresh);
 if(reduced.addEventListener)reduced.addEventListener("change",refresh);
 if("IntersectionObserver" in window)new IntersectionObserver(es=>{visible=es[0]?.isIntersecting??true;refresh();},{threshold:.03}).observe(demo);
 window.addEventListener("resize",syncLayout,{passive:true});
 syncLayout();setPauseButton();refresh();
})();
