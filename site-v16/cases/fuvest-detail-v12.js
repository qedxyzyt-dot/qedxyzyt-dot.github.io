"use strict";
(() => {
 if(new URLSearchParams(location.search).get("project")!=="fuvest")return;
 const frame=document.querySelector(".case-artframe");if(!frame)return;
 frame.classList.add("fuvest-case-frame");
 const proofType=document.querySelector(".case-facts > div:nth-child(3) strong");
 if(proofType)proofType.textContent="Capturas reais dos dois dashboards públicos";
 frame.innerHTML=`<section class="fv-showcase" aria-label="Dashboards públicos de notas de corte da FUVEST">
 <div class="fv-head"><p class="fv-kicker">NOTAS DE CORTE / DADOS OFICIAIS</p>
 <h2>Histórico que<br><em>ajuda a decidir.</em></h2>
 <p>Dois painéis públicos para pesquisar cursos, explorar séries históricas e comparar candidatos e vagas usando relatórios oficiais da FUVEST.</p></div>
 <div class="fv-panel-grid">
  <article class="fv-panel"><div class="fv-panel-photo"><img src="../assets/evidence/fuvest-vestibular-v12.png" width="1440" height="900" alt="Captura real do dashboard de notas de corte do vestibular tradicional da FUVEST" loading="eager"></div>
   <div class="fv-panel-content"><small>01 / VESTIBULAR TRADICIONAL</small><h3>2000–2026</h3>
    <p>Notas da primeira fase, filtros por carreira, campus e modalidade, comparação entre até três opções e acesso aos PDFs anuais.</p>
    <a href="https://qedxyzyt-dot.github.io/notas-de-corte-fuvest-vestibular/" target="_blank" rel="noopener noreferrer">Explorar painel publicado ↗</a></div></article>
  <article class="fv-panel"><div class="fv-panel-photo"><img src="../assets/evidence/fuvest-transferencia-v12.png" width="1440" height="900" alt="Captura real do dashboard de notas de corte da transferência externa USP" loading="eager"></div>
   <div class="fv-panel-content"><small>02 / TRANSFERÊNCIA EXTERNA</small><h3>2019–2027*</h3>
    <p>Editais disponíveis, consulta por curso, indicadores de vagas e concorrência, comparação e links para os documentos oficiais.</p>
    <a href="https://qedxyzyt-dot.github.io/notas-de-corte-transferencia-usp/" target="_blank" rel="noopener noreferrer">Explorar painel publicado ↗</a></div></article>
 </div><p class="fv-footnote">* Série com lacunas documentais; a edição 2022 não possui publicação específica de notas de corte. Capturas dos dashboards reais, sem dados inventados.</p>
 </section><figcaption>Capturas reais das interfaces públicas de vestibular tradicional e transferência externa; os dados continuam sujeitos às ressalvas e fontes de cada edição.</figcaption>`;
})();
