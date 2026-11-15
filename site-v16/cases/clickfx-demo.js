"use strict";
/* ClickFX V12 staging demonstration: original authored pixels; optical behaviours
   informed by native app. No Windows screen capture, injection or OS hooks. */
(() => {
 if(new URLSearchParams(location.search).get("project")!=="clickfx")return;
 const frame=document.querySelector(".case-artframe");if(!frame)return;
 frame.classList.add("clickfx-case-frame");
 frame.innerHTML=`<div class="clickfx-showroom">
  <div class="clickfx-showroom-head">
   <div><small>CLICKFX / WINDOWS DESKTOP</small><h2>Um clique.<br><em>Outra dimensão.</em></h2>
    <p>Rings desenha anéis concêntricos; Warp deforma a superfície como uma lente; Ripple cria uma onda de refração. Escolha o efeito e toque na composição.</p></div>
   <img src="../assets/projects/clickfx.svg" width="79" height="79" alt="Marca do ClickFX">
  </div>
  <div class="clickfx-control-bar" role="group" aria-label="Selecionar efeito">
   <button type="button" class="clickfx-mode" data-clickfx-mode="rings" aria-pressed="false">Rings <span>01</span></button>
   <button type="button" class="clickfx-mode" data-clickfx-mode="warp" aria-pressed="false">Warp <span>02</span></button>
   <button type="button" class="clickfx-mode" data-clickfx-mode="ripple" aria-pressed="true">Ripple <span>03</span></button>
   <button type="button" class="clickfx-trigger" id="clickfx-trigger">Reproduzir efeito <span aria-hidden="true">↗</span></button>
  </div>
  <div class="clickfx-surface">
   <canvas id="clickfx-test-canvas" width="1600" height="840" tabindex="0" role="button"
    aria-label="Área de demonstração ClickFX: tocar ou pressionar Enter ou Espaço para reproduzir o efeito"></canvas>
   <div class="clickfx-surface-hint" aria-hidden="true"><span>DESKTOP COMPOSITION / AUTORAL</span><span>TOQUE OU CLIQUE</span></div>
  </div>
  <div class="clickfx-after"><span><b>RINGS</b> / anéis concêntricos</span><span><b>WARP</b> / lente elástica</span><span><b>RIPPLE</b> / onda radial</span><span id="clickfx-state" role="status" aria-live="polite">Pronto para interagir</span></div>
 </div>
 <figcaption>Demonstração óptica independente inspirada nos comportamentos do aplicativo ClickFX. Usa pixels sintéticos, não captura do desktop Windows, e não reivindica paridade com o motor C# nativo.</figcaption>`;
 const canvas=frame.querySelector("#clickfx-test-canvas");
 const ctx=canvas.getContext("2d",{willReadFrequently:true});
 if(!ctx)return;
 const base=document.createElement("canvas");
 const bctx=base.getContext("2d",{willReadFrequently:true});
 const selected=[...frame.querySelectorAll("[data-clickfx-mode]")];
 const out=frame.querySelector("#clickfx-state");
 const reduce=matchMedia("(prefers-reduced-motion: reduce)");
 let w=0,h=0,scale=1,baseImage=null,output=null;
 let mode="ripple",anim=null,frameId=0,visible=true,pointerDown=null;
 const maxPixels=550000;
 function drawBase(){
  const narrow=w/h<1.65, logicalW=narrow?560:800, logicalH=420;
  const zoom=Math.max(w/logicalW,h/logicalH);
  bctx.setTransform(1,0,0,1,0,0);bctx.clearRect(0,0,w,h);
  bctx.setTransform(zoom,0,0,zoom,(w-logicalW*zoom)/2,(h-logicalH*zoom)/2);
  const gradient=bctx.createLinearGradient(0,0,logicalW,logicalH);
  gradient.addColorStop(0,"#0e1822");gradient.addColorStop(.57,"#1b3041");gradient.addColorStop(1,"#13212c");
  bctx.fillStyle=gradient;bctx.fillRect(0,0,logicalW,logicalH);
  bctx.strokeStyle="rgba(200,237,250,.11)";bctx.lineWidth=1;
  for(let x=0;x<logicalW;x+=27){bctx.beginPath();bctx.moveTo(x,0);bctx.lineTo(x,logicalH);bctx.stroke();}
  for(let y=0;y<logicalH;y+=27){bctx.beginPath();bctx.moveTo(0,y);bctx.lineTo(logicalW,y);bctx.stroke();}
  bctx.fillStyle="#96e8ef";bctx.font="700 13px Consolas,monospace";bctx.fillText("CLICKFX / OPTICAL RESPONSE",30,42);
  bctx.fillStyle="#f0f6fd";bctx.font=narrow?"700 63px Arial,Helvetica,sans-serif":"700 67px Arial,Helvetica,sans-serif";
  bctx.fillText(narrow?"TOQUE":"CLIQUE",30,147);bctx.fillText("PIXELS",30,217);
  bctx.fillStyle="#b4c8d9";bctx.font="17px Arial,Helvetica,sans-serif";
  bctx.fillText(narrow?"Rings  /  Warp  /  Ripple":"Rings  /  Warp  /  Ripple  /  Windows",31,262);
  const offset=narrow?-180:0;
  bctx.fillStyle="#3d70fb";bctx.fillRect(560+offset,58,170,113);
  bctx.fillStyle="#ffbf76";bctx.beginPath();bctx.arc(644+offset,237,66,0,Math.PI*2);bctx.fill();
  bctx.fillStyle="#c97fd2";bctx.beginPath();bctx.arc(747+offset,340,87,0,Math.PI*2);bctx.fill();
  bctx.strokeStyle="#f6f3ec";bctx.lineWidth=4;
  bctx.beginPath();bctx.moveTo(30,320);bctx.bezierCurveTo(191,296,170,386,narrow?335:375,341);bctx.stroke();
  bctx.fillStyle="#eaf5ff";bctx.font="700 13px Consolas,monospace";bctx.fillText("CLICK / OPTICAL REFRACTION",31,401);
  bctx.strokeStyle="rgba(239,245,253,.54)";bctx.lineWidth=1.5;bctx.strokeRect(15,15,logicalW-30,logicalH-30);
 }
 function drawStatic(){if(baseImage)ctx.putImageData(baseImage,0,0);}
 function reset(message="Pronto para interagir"){
  if(frameId)cancelAnimationFrame(frameId);frameId=0;anim=null;pointerDown=null;
  drawStatic();out.textContent=message;
 }
 function resizeCanvas(){
  const rect=canvas.getBoundingClientRect();
  if(!rect.width||!rect.height)return;
  const dpr=Math.max(.1,Math.min(window.devicePixelRatio||1,1.5,Math.sqrt(maxPixels/(rect.width*rect.height))));
  const nw=Math.max(1,Math.round(rect.width*dpr)),nh=Math.max(1,Math.round(rect.height*dpr));
  if(nw===w&&nh===h&&baseImage)return;
  if(frameId)cancelAnimationFrame(frameId);frameId=0;anim=null;
  w=nw;h=nh;scale=dpr;canvas.width=w;canvas.height=h;base.width=w;base.height=h;
  drawBase();baseImage=bctx.getImageData(0,0,w,h);output=ctx.createImageData(w,h);
  drawStatic();out.textContent="Pronto para interagir";
 }
 function paint(progress){
  if(!anim||!baseImage)return;
  const p=Math.max(0,Math.min(1,progress));
  if(mode==="rings"){
   ctx.putImageData(baseImage,0,0);ctx.save();
   ctx.strokeStyle="#d1e8ff";ctx.lineWidth=3.2*scale;
   for(let k=0;k<3;k++){
    const t=p-k*.14;if(t<=0)continue;
    const radius=(20+t*138)*scale;
    ctx.globalAlpha=Math.max(0,Math.pow(1-t,1.6))*(.78-k*.1);
    ctx.beginPath();ctx.arc(anim.x,anim.y,radius,0,2*Math.PI);ctx.stroke();
   }
   ctx.restore();return;
  }
  const source=baseImage.data,target=output.data;target.set(source);
  const {x:cx,y:cy,r}=anim;
  const xlo=Math.max(0,Math.floor(cx-r-2)),xhi=Math.min(w-1,Math.ceil(cx+r+2));
  const ylo=Math.max(0,Math.floor(cy-r-2)),yhi=Math.min(h-1,Math.ceil(cy+r+2));
  const fade=Math.pow(Math.max(0,Math.sin(Math.PI*p)),1.15);
  for(let y=ylo;y<=yhi;y++)for(let x=xlo;x<=xhi;x++){
   const dx=x-cx,dy=y-cy,d=Math.hypot(dx,dy),q=d/r;
   if(q>=1||d<.001)continue;
   let shift;
   if(mode==="warp"){
    const t=Math.max(0,1-q*q);shift=44*scale*q*t*t*fade;
   }else{
    const theta=(d-p*r*.93)/(22*scale);
    shift=14*scale*Math.sin(theta*2.4)*Math.exp(-.5*theta*theta)*Math.pow(fade,.8);
   }
   if(!Number.isFinite(shift))continue;
   const sx=Math.max(0,Math.min(w-1,x+dx/d*shift)),sy=Math.max(0,Math.min(h-1,y+dy/d*shift));
   if(!Number.isFinite(sx)||!Number.isFinite(sy))continue;
   const x0=Math.floor(sx),y0=Math.floor(sy),x1=Math.min(w-1,x0+1),y1=Math.min(h-1,y0+1);
   const tx=sx-x0,ty=sy-y0;
   const a=(y0*w+x0)*4,b=(y0*w+x1)*4,c=(y1*w+x0)*4,d0=(y1*w+x1)*4,i=(y*w+x)*4;
   for(let ch=0;ch<3;ch++){
    const up=source[a+ch]*(1-tx)+source[b+ch]*tx;
    const down=source[c+ch]*(1-tx)+source[d0+ch]*tx;
    target[i+ch]=up*(1-ty)+down*ty;
   }
   target[i+3]=255;
  }
  ctx.putImageData(output,0,0);
 }
 function render(time){
  frameId=0;
  if(!anim||!visible||document.hidden||reduce.matches){reset();return;}
  const elapsed=Math.max(0,time-anim.start);
  const progress=Number.isFinite(elapsed)?Math.min(1,elapsed/anim.duration):0;
  if(progress>=1){reset();return;}
  paint(progress);frameId=requestAnimationFrame(render);
 }
 function trigger(x=w*.67,y=h*.52){
  if(!baseImage)resizeCanvas();
  if(!visible||document.hidden){reset("Pausado fora da área visível");return;}
  if(frameId)cancelAnimationFrame(frameId);frameId=0;
  anim={x,y,r:Math.min(145*scale,Math.max(65,Math.min(w,h)*.72)),start:performance.now(),
    duration:mode==="warp"?820:mode==="rings"?960:1120};
  const label=mode==="rings"?"Rings · anéis concêntricos":mode==="warp"?"Warp · distorção elástica":"Ripple · onda radial";
  if(reduce.matches){
   paint(.42);anim=null;out.textContent=label+" · prévia estática (movimento reduzido)";return;
  }
  out.textContent=label;frameId=requestAnimationFrame(render);
 }
 selected.forEach(button=>button.addEventListener("click",()=>{
  mode=button.dataset.clickfxMode;
  selected.forEach(b=>b.setAttribute("aria-pressed",String(b===button)));
  trigger();
 }));
 frame.querySelector("#clickfx-trigger").addEventListener("click",()=>trigger());
 canvas.addEventListener("pointerdown",e=>{
  if(e.button!==0||!e.isPrimary)return;
  pointerDown={id:e.pointerId,x:e.clientX,y:e.clientY,t:performance.now()};
 });
 canvas.addEventListener("pointercancel",()=>pointerDown=null);
 canvas.addEventListener("pointerup",e=>{
  if(!pointerDown||pointerDown.id!==e.pointerId)return;
  const moved=Math.hypot(e.clientX-pointerDown.x,e.clientY-pointerDown.y);
  const held=performance.now()-pointerDown.t;pointerDown=null;
  if(moved>12||held>800)return;
  const rect=canvas.getBoundingClientRect();
  trigger((e.clientX-rect.left)*w/rect.width,(e.clientY-rect.top)*h/rect.height);
 });
 canvas.addEventListener("keydown",e=>{
  if(e.key==="Enter"||e.key===" "){e.preventDefault();trigger();}
 });
 document.addEventListener("visibilitychange",()=>reset(document.hidden?"Pausado: aba oculta":"Pronto para interagir"));
 if("IntersectionObserver" in window)new IntersectionObserver(entries=>{
  const now=entries[0]?.isIntersecting??false;
  if(now===visible)return;
  visible=now;reset(now?"Pronto para interagir":"Pausado fora da área visível");
 },{threshold:.05}).observe(canvas);
 if(reduce.addEventListener)reduce.addEventListener("change",()=>reset(reduce.matches?"Movimento reduzido: selecione um efeito para a prévia":"Pronto para interagir"));
 window.addEventListener("resize",resizeCanvas,{passive:true});
 resizeCanvas();
})();