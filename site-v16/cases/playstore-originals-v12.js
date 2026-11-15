"use strict";
// V12: directly embedded, SHA-256-verified Google Play marketing assets from the Galaxy.
// SVG containers carry the original complete PNG byte streams, not hand-drawn phone frames.
(() => {
 const id = new URLSearchParams(location.search).get("project");
 const variants = {
  "better-notifications": {
   name:"Better Notifications",theme:"better",kicker:"ANDROID / EFEITOS DE NOTIFICAÇÃO",
   title:"A luz que torna cada alerta reconhecível.",
   body:"As artes originais mostram o painel inicial, as opções de animação e o seletor de cores. São peças preparadas para Google Play, com o PNG integral preservado em cada imagem.",
   pictures:[
    ["play-better-original-01.svg","01 / TELA INICIAL","Painel inicial do Better Notifications em tema escuro"],
    ["play-better-original-02.svg","02 / EFEITOS","Opções de modos de notificação do Better Notifications"],
    ["play-better-original-03.svg","03 / PERSONALIZAÇÃO","Seletor de cor do Better Notifications"]
   ]
  },
  "easy-sign": {
   name:"Easy Sign",theme:"easy",kicker:"ANDROID / ANOTAÇÃO E ASSINATURA DE PDF",
   title:"Assinar, reutilizar, posicionar.",
   body:"Três peças originais do aplicativo documentam o fluxo de assinatura em PDF, a reutilização da assinatura e o posicionamento preciso na página.",
   pictures:[
    ["play-easysign-original-01.svg","01 / ASSINAR PDF","Arte promocional original do Easy Sign: assinatura em documento PDF"],
    ["play-easysign-original-02.svg","02 / REUTILIZAR","Arte promocional original do Easy Sign: assinaturas reutilizáveis"],
    ["play-easysign-original-03.svg","03 / PRECISÃO","Arte promocional original do Easy Sign: posicionamento da assinatura"]
   ]
  }
 };
 const config=variants[id];if(!config)return;
 const frame=document.querySelector(".case-artframe");if(!frame)return;
 frame.classList.add("playstore-v12-frame","ps-"+config.theme);
 const art=config.pictures.map(([file,caption,alt]) => `
   <figure class="ps-v12-art">
    <a href="../assets/evidence/${file}" target="_blank" rel="noopener noreferrer" aria-label="Ampliar ${caption.toLowerCase()} do ${config.name}">
     <img src="../assets/evidence/${file}" alt="${alt}" width="2160" height="3840" loading="eager" decoding="async">
    </a>
    <figcaption>${caption}</figcaption>
   </figure>`).join("");
 frame.innerHTML=`<div class="ps-v12">
  <div class="ps-v12-head"><small>${config.kicker}</small><h2>${config.title}</h2><p>${config.body}</p>
   <p class="ps-v12-source">ARTES ORIGINAIS · GOOGLE PLAY · 2160 × 3840</p>
  </div>
  <div class="ps-v12-gallery" tabindex="0" role="group" aria-label="Três artes promocionais originais de ${config.name}; role para explorar no celular">
   ${art}
  </div>
  <p class="ps-v12-hint">Toque em uma imagem para ampliá-la. No celular, deslize horizontalmente para explorar as três peças.</p>
 </div>
 <figcaption>Artes promocionais originais preparadas para a Google Play, preservadas em seu enquadramento completo. Integridade das imagens conferida por SHA-256.</figcaption>`;
 const evidence=document.querySelector(".case-facts>div:nth-child(3) strong");
 if(evidence)evidence.textContent="Artes promocionais originais · integridade por SHA-256";
})();
