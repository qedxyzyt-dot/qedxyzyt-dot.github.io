"use strict";
/* Lost Time V12: SHA-256-verified original promotional PNGs are the primary proof.
   A flattened editorial triptych remains optional; no official Pixel frame claim. */
(() => {
 if(new URLSearchParams(location.search).get("project")!=="lost-time")return;
 const frame=document.querySelector(".case-artframe");if(!frame)return;
 frame.classList.add("losttime-v12-frame");
 const names=["Atenção","Histórico","Limites"];
 const asset="../assets/evidence/lost-time-pixel9-triptych-v12.svg";
 const original=[
   ["01","Retome sua atenção","Tela do Lost Time na campanha original da Google Play"],
   ["04","Veja sua semana","Gráfico semanal do Lost Time na campanha original da Google Play"],
   ["05","Crie metas e foco","Metas do Lost Time na campanha original da Google Play"]
 ];
 frame.innerHTML=`<section class="ltv12" aria-label="Lost Time: galeria com telas reais">
  <div class="ltv12-head">
    <div><small>LOST TIME / ANDROID · WINDOWS</small>
      <h2>Seu tempo.<br><em>Suas escolhas.</em></h2>
      <p>Analise padrões de uso, compreenda o histórico e configure limites para dedicar mais atenção ao que importa.</p>
      <p class="ltv12-caption">Três artes originais da Google Play (1080 × 1920), verificadas por SHA-256. A composição derivada é opcional.</p>
    </div>
    <div class="ltv12-modes" role="group" aria-label="Escolher visualização do Lost Time">
      <button type="button" data-lt-mode="pixel" aria-pressed="false" aria-controls="ltv12-pixel">Composição editorial</button>
      <button type="button" data-lt-mode="play" aria-pressed="true" aria-controls="ltv12-play">Artes originais da Google Play</button>
    </div>
  </div>
  <div id="ltv12-pixel" class="ltv12-panel ltv12-pixel" role="group" aria-label="Composição editorial derivada das artes do aplicativo" hidden>
    <div class="ltv12-pixel-gallery">
      ${names.map((title,i)=>`<figure class="ltv12-device">
        <a href="${asset}" target="_blank" rel="noopener noreferrer" aria-label="Ampliar montagem editorial: ${title}">
          <span class="ltv12-device-image ltv12-device-image--${i}" role="img" aria-label="Montagem derivada de arte promocional do Lost Time: ${title}"></span>
        </a>
        <figcaption><span>0${i+1}</span><strong>${title}</strong></figcaption>
      </figure>`).join("")}
    </div>
  </div>
  <div id="ltv12-play" class="ltv12-panel ltv12-play" role="group" aria-label="Peças originais da Google Play">
    <div class="ltv12-play-gallery">
      ${original.map(([num,title,alt],i)=>`<figure class="ltv12-play-figure">
        <a href="../assets/evidence/lost-time-play-hires-${num}.svg" target="_blank" rel="noopener noreferrer" aria-label="Ampliar peça Google Play: ${title}">
          <img src="../assets/evidence/lost-time-play-hires-${num}.svg" width="1080" height="1920" alt="${alt}" loading="lazy">
        </a><figcaption><span>0${i+1}</span><strong>${title}</strong></figcaption>
      </figure>`).join("")}
    </div>
  </div>
 </section>
 <figcaption>Lost Time · três artes originais de divulgação para a Google Play, com PNGs recuperados e hashes verificados. A visualização alternativa é uma montagem editorial achatada e não comprova uma moldura oficial do Google Pixel.</figcaption>`;
 const controls=[...frame.querySelectorAll("[data-lt-mode]")];
 controls.forEach(button=>button.addEventListener("click",()=>{
    const selected=button.dataset.ltMode;
    controls.forEach(item=>item.setAttribute("aria-pressed",String(item===button)));
    frame.querySelector("#ltv12-pixel").hidden=selected!=="pixel";
    frame.querySelector("#ltv12-play").hidden=selected!=="play";
 }));
})();
