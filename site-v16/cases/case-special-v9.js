"use strict";
/* Distinct technical evidence maps for projects lacking publishable UI captures.
 * These are architectural/editorial diagrams grounded in documented stages,
 * never screenshots or measurements. */
(() => {
 const id=new URLSearchParams(location.search).get("project");
 const frame=document.querySelector(".case-artframe");
 if(!frame)return;
 const diagrams={
   "transcrever":`<div class="case-v9-media"><header><small>TRANSCRIBER / MEDIA ENGINEERING</small><h2>Da fala ao ponto<br><em>de edição.</em></h2><p>Transcrição, segmentação e revisão humana em um fluxo concebido para preservar contexto em material falado.</p></header>
   <div class="media-edit-lanes" aria-label="Etapas da edição assistida">
     <div class="media-edit-row"><span>01 / INPUT</span><strong>Áudio autorizado</strong><i>Fonte e duração</i></div>
     <div class="media-edit-row"><span>02 / ASR</span><strong>Reconhecimento</strong><i>Whisper · segmentos de fala</i></div>
     <div class="media-edit-row"><span>03 / SELECTION</span><strong>Intervalos candidatos</strong><i>Regras · timestamps · contexto</i></div>
     <div class="media-edit-row"><span>04 / REVIEW</span><strong>Decisão humana</strong><i>Escuta e conferência antes do corte</i></div>
     <div class="media-edit-row"><span>05 / OUTPUT</span><strong>Exportação</strong><i>FFmpeg e validação do resultado</i></div>
   </div><div class="media-edit-footer"><span>ÁUDIO / ASR / TIMESTAMPS / REVISÃO</span><span>AUTOMAÇÃO COM CONTROLE HUMANO</span></div></div>`,
   "tcc":`<div class="case-v9-signal"><header><small>PTC3527 / VOICE CONTROL · DSP WINDOWS</small><h2>Tratar o ruído.<br><em>Preservar a voz.</em></h2><p>Um pipeline causal combina supressão, tratamento dinâmico opcional e roteamento de áudio para comunicação, com medições de qualidade e atraso.</p></header>
     <div class="signal-route" aria-label="Fluxo de processamento de áudio">
       <article><span>01 / 48 KHZ</span><strong>Microfone</strong><small>Entrada de fala + ambiente</small></article>
       <article><span>02 / DENOISER</span><strong>DPDFNet2</strong><small>Motor CEVA · fluxo causal</small></article>
       <article><span>03 / DSP</span><strong>Equalização</strong><small>Compressor e limiter configuráveis</small></article>
       <article><span>04 / OUTPUT</span><strong>VB-CABLE</strong><small>Saída virtual para chamadas</small></article>
     </div>
     <div class="signal-measures"><article><b>FALA</b><span>Inteligibilidade e timbre</span></article><article><b>RUÍDO</b><span>Motor durante a fala</span></article><article><b>LATÊNCIA</b><span>Janelas, buffers e roteamento</span></article></div>
   </div>`,
   "circuitos":`<div class="case-v9-curation"><header><small>CIRCUITOS ELÉTRICOS / POLI-USP</small><h2>Curadoria antes<br><em>da transcrição.</em></h2><p>Uma aplicação acadêmica organiza o acervo de questões com proveniência e revisão docente antes de converter conteúdo selecionado para LaTeX.</p></header>
     <div class="curation-columns">
       <section><small>ACERVO</small><h3>Fonte preservada</h3><p>Compêndios, enunciados, metadados e vínculo ao material original.</p><span>01 / PROVENIÊNCIA</span></section>
       <section><small>SELEÇÃO</small><h3>Critérios explícitos</h3><p>Busca por tema, dificuldade e estado de revisão para apoiar professores.</p><span>02 / CURADORIA</span></section>
       <section><small>PUBLICAÇÃO</small><h3>Fidelidade na saída</h3><p>LaTeX e CircuitikZ somente após seleção e conferência visual das questões.</p><span>03 / QUALIDADE</span></section>
     </div>
     <footer><span>NEXT.JS · TYPESCRIPT · SUPABASE</span><span>PLATAFORMA DE CURADORIA</span></footer>
   </div>`,
   "crm":`<div class="case-v9-crm"><header><small>CRM SERVERLESS / AWS / META</small><h2>Uma plataforma.<br><em>Domínios conectados.</em></h2><p>O CRM integra identidade, atividades comerciais e serviços externos sem confundir dados internos, eventos recebidos e operações autorizadas.</p></header>
     <div class="crm-architecture">
       <div class="crm-domain"><small>CAMADA DE EXPERIÊNCIA</small><strong>React · Workspace CRM</strong><p>Relacionamentos, atividades e jornadas</p></div>
       <div class="crm-link" aria-hidden="true">↓</div>
       <div class="crm-domain primary"><small>CAMADA DE DOMÍNIO</small><strong>API Gateway · Lambda · DynamoDB</strong><p>Autorização, isolamento por workspace e persistência</p></div>
       <div class="crm-link" aria-hidden="true">↓</div>
       <div class="crm-external">
         <article><small>WHATSAPP BUSINESS</small><strong>Meta Cloud API</strong><p>Embedded signup, templates e webhooks</p></article>
         <article><small>ATIVIDADES</small><strong>Google Calendar</strong><p>Eventos e sincronização sob permissões</p></article>
         <article><small>AUTOMAÇÕES</small><strong>Workflows + SQS</strong><p>Editor visual e execução condicionada a gates</p></article>
       </div>
     </div>
   </div>`
 };
 if(!diagrams[id])return;
 frame.classList.add("case-v9-architecture");
 frame.innerHTML=diagrams[id]+'<figcaption>Componentes e responsabilidades da solução, organizados a partir da documentação de engenharia. Etapas sujeitas a autorização e validação são identificadas no estudo de caso.</figcaption>';
})();
