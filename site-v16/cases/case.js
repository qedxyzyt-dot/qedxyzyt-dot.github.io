"use strict";
// Standalone editorial case pages. All content comes from locally curated source data.
(() => {
 const data = window.PORTFOLIO_CASES || {};
 const requested = new URLSearchParams(location.search).get("project");
 // Removed or invalid slugs no longer masquerade as the default case.
 if(requested&&!Object.prototype.hasOwnProperty.call(data,requested)){
   location.replace("../index.html#projetos");return;
 }
 const id = requested||"jarvis";
 const item = data[id];
 // Only the TCC case exposes the verified W261 interface screenshots.
 const voiceShowcase=document.getElementById("vc-showcase");
 if(voiceShowcase)voiceShowcase.hidden=id!=="tcc";
 const $ = (id) => document.getElementById(id);
 const put = (id, text) => { const el=$(id); if(el) el.textContent=text; };
 document.documentElement.dataset.caseTheme = item.theme;
 document.documentElement.dataset.project = id;
 document.body.classList.add("case-body");
 document.title = (id==="qed"?"Canal QED — Educação matemática":id==="iee"?"IEE-USP — Pesquisa acadêmica":item.name+" — Projeto de engenharia")+" | Augusto Massayoshi";
 // Update human-facing metadata and share state for client-side navigation.
 // GitHub Pages serves the same HTML for all ?project= values; crawlers that
 // do not execute JS see the generic case preview in the initial HTML.
 const pageUrl="https://qedxyzyt-dot.github.io/cases/?project="+encodeURIComponent(id);
 const seo=(selector,attribute,value)=>{
  const meta=document.querySelector(selector);
  if(meta)meta.setAttribute(attribute,value);
 };
 seo('meta[name="description"]',"content",item.intro.slice(0,165));
 seo('link[rel="canonical"]',"href",pageUrl);
 seo('meta[property="og:title"]',"content",item.name+" · Augusto Massayoshi");
 seo('meta[property="og:description"]',"content",item.intro.slice(0,190));
 seo('meta[property="og:url"]',"content",pageUrl);
 put("case-crumb-label", item.name);
 put("case-eyebrow", id==="qed"?"PRODUÇÃO EDUCACIONAL / CANAL QED":id==="iee"?"PESQUISA ACADÊMICA / IEE-USP":item.index+" / "+item.category);
 put("case-title", item.headline);
 put("case-intro", item.intro);
 put("case-platform", item.platform);
 put("case-status", item.status);
 put("case-question", item.question);
 put("case-decision", item.decision);
 put("case-role", "CONTRIBUIÇÃO / "+item.role);
 const brand=document.createElement("div");brand.className="case-brand-identity";
 const iconMeta=document.createElement("div");const iconName=document.createElement("strong");iconName.textContent=item.name;
 iconMeta.append(iconName);
 const icon=document.createElement("img");
 icon.src="../assets/projects/"+(id==="qed"?"qed-avatar":id==="iee"?"iee-official-traced-v12":encodeURIComponent(id))+".svg";
 icon.alt=id==="qed"?"Foto de perfil do canal QED no YouTube":"";icon.width=72;icon.height=72;
 brand.append(icon);
 if(id==="qed"){
   brand.classList.add("case-brand-qed");
   const platform=document.createElement("span");platform.className="case-qed-platform";
   const youtube=document.createElement("img");youtube.src="../assets/projects/ui-youtube.svg";youtube.alt="";youtube.width=17;youtube.height=17;youtube.setAttribute("aria-hidden","true");
   platform.append(youtube,document.createTextNode("Canal no YouTube"));iconMeta.prepend(platform);
 }
 brand.append(iconMeta);
 const eyebrow=$("case-eyebrow");eyebrow.parentElement.insertBefore(brand,eyebrow);
 if(id==="iee"){
   const academic=document.createElement("div");academic.className="case-affiliation";
   const usp=document.createElement("img");usp.src="../assets/projects/usp-logo.svg";usp.alt="Universidade de São Paulo";usp.width=90;usp.height=40;
   const msg=document.createElement("small");msg.textContent="Vínculo acadêmico · não representa patrocínio institucional";
   academic.append(usp,msg);document.querySelector(".case-facts").append(academic);
 }
 if(id==="tcc"){
   const proof=document.querySelector(".case-facts>div:last-child strong");
   if(proof)proof.textContent="Capturas reais W261 + visual didático";
 }
 if(id==="qed"||id==="iee"){
   put("architecture-title",id==="qed"?"Como os conteúdos são produzidos.":"Como a pesquisa foi conduzida.");
   const facts=[...document.querySelectorAll(".case-facts>div")];
   const proof=facts.find(node=>node.querySelector("small")?.textContent==="TIPO DE PROVA");
   if(proof?.querySelector("strong"))proof.querySelector("strong").textContent=id==="qed"?"Vídeos públicos e canal YouTube":"Programa oficial do IEEE ICHVE 2026";
   const caption=document.querySelector(".case-artframe figcaption");
   if(caption)caption.textContent=id==="qed"?"Apresentação educativa com links para vídeos publicados; peças ilustrativas são identificadas como tais.":"Representação explicativa da pesquisa; não equivale a dados experimentais restritos ou resultados não publicados.";
 }
 const actions=$("case-actions");
 const addLink=(href,text,secondary=false)=>{ const link=document.createElement("a");link.href=href;link.className=secondary?"case-action-secondary":"case-action-primary";const label=document.createElement("span");label.textContent=text.replace(/[↗↓]/g,"").trim();const img=document.createElement("img");img.src="../assets/projects/ui-"+(text.includes("↓")?"arrow-down-right":"arrow-up-right")+".svg";img.className="ui-inline-arrow";img.alt="";img.setAttribute("aria-hidden","true");img.width=16;img.height=16;link.append(label,img);actions.appendChild(link);};
 if(item.showDemo)addLink("../demos/index.html?project="+encodeURIComponent(item.showDemo),"Explorar a sequência ilustrativa ↗");
 if(item.external)addLink(item.external,id==="tcc"?"Instalador Windows ↗":"Ver fonte pública ↗",!!item.showDemo);
 addLink("#details-title","Conhecer decisões técnicas ↓",true);
 // Display a sequence only when the project evidence supports a meaningful,
 // ordered explanation. Parallel integrations and unverified prototypes are
 // deliberately not forced into a linear diagram.
 const flowSpecs={
   "jarvis":{heading:"Da tarefa à entrega verificável.",intro:"O agente trabalha dentro de um projeto autorizado e apresenta os resultados para revisão.",steps:[
     ["ESCOPO","Definir a tarefa","O pedido delimita objetivo, pastas e ações permitidas."],
     ["PERMISSÕES","Ler as regras locais","O ambiente e as instruções do projeto determinam o que pode ser executado."],
     ["EXECUÇÃO","Usar ferramentas MCP","Leituras e alterações são realizadas dentro do escopo autorizado."],
     ["CONFERÊNCIA","Testar e documentar","A entrega registra alterações, testes e limites identificados."]
   ]},
   "lost-time":{heading:"Como o tempo de uso vira informação.",intro:"O acompanhamento utiliza dados de uso do Android e controles de foco configurados pela pessoa.",steps:[
     ["COLETA","Eventos de uso Android","O sistema operacional disponibiliza eventos dos aplicativos usados."],
     ["REGISTRO","Histórico local","Os dados são organizados e armazenados para consulta no dispositivo."],
     ["LEITURA","Painéis e categorias","Telas apresentam totais, padrões diários e históricos de uso."],
     ["CONTROLE","Metas e períodos de foco","Limites e sessões de foco são configurados para reduzir distrações."]
   ]},
   "select-anywhere":{heading:"Como selecionar texto em outras telas.",intro:"A leitura pela acessibilidade é priorizada; o OCR entra quando a interface não fornece o texto diretamente.",steps:[
     ["LEITURA","Árvore de acessibilidade","O Android fornece texto e elementos disponíveis na interface."],
     ["ALTERNATIVA","OCR no dispositivo","Quando necessário, o reconhecimento local identifica caracteres visíveis."],
     ["SELEÇÃO","Delimitar o trecho","A pessoa ajusta a área desejada, conforme a compatibilidade da tela."],
     ["CÓPIA","Confirmar e copiar","O trecho selecionado é entregue à área de transferência."]
   ]},
   "voice2text":{heading:"Da fala ao campo de texto correto.",intro:"Captura e transcrição são locais; a inserção depende da verificação da janela de destino.",steps:[
     ["ENTRADA","Atalho e captura WASAPI","A interface indica a gravação de áudio no Windows."],
     ["RECONHECIMENTO","VAD e Whisper local","A fala é segmentada e convertida em texto no computador."],
     ["TEXTO","Consolidar a transcrição","O resultado é preparado antes de qualquer tentativa de inserção."],
     ["DESTINO","Verificar o foco","A colagem só é tentada quando o campo ativo pode ser confirmado."]
   ]},
   "tcc":{heading:"O caminho do áudio com supressão de ruído.",intro:"Cadeia experimental de processamento local; o diagrama não representa desempenho ou latência já validados.",steps:[
     ["ENTRADA","Microfone a 48 kHz","O sinal original é capturado para tratamento em tempo real."],
     ["SUPRESSÃO","Denoiser neural","RNNoise e CEVA DPDFNet2 são avaliados como alternativas de redução de ruído."],
     ["AJUSTES","Equalização e dinâmica","EQ, compressor e limitador podem complementar o tratamento."],
     ["SAÍDA","Microfone virtual","O VB-CABLE encaminha o áudio processado às aplicações de comunicação."]
   ]},
   "transcrever":{heading:"Da gravação aos trechos revisados.",intro:"A transcrição auxilia a localizar cortes, mas a decisão final permanece humana.",steps:[
     ["FONTE","Áudio de entrada","Uma gravação autorizada é preparada para análise."],
     ["TEXTO","Reconhecimento com Whisper","A fala é transcrita para apoiar a localização de intervalos."],
     ["CANDIDATOS","Segmentação temporal","Trechos potencialmente dispensáveis são destacados para inspeção."],
     ["REVISÃO","Escuta antes da exportação","Os cortes são conferidos para preservar explicações e contexto."]
   ]},
   "easy-sign":{heading:"O percurso visível nas telas do Easy Sign.",intro:"As artes originais mostram a assinatura visual de PDF, não uma certificação digital de documentos.",steps:[
     ["DOCUMENTO","Abrir um PDF","O arquivo é exibido no visualizador do aplicativo."],
     ["ASSINATURA","Escolher uma assinatura","A interface permite acessar assinaturas disponíveis."],
     ["POSIÇÃO","Ajustar no documento","O traço é inserido e posicionado sobre a página."],
     ["EXPORTAÇÃO","Gerar o PDF editado","O comando de exportação aparece no editor do aplicativo."]
   ]},
   "fuvest":{heading:"Da fonte oficial à comparação histórica.",intro:"Os dois painéis preservam a distinção entre vestibular tradicional e transferência externa.",steps:[
     ["FONTES","Documentos FUVEST","Notas de corte e editais oficiais são referenciados por edição."],
     ["ORGANIZAÇÃO","Séries por modalidade","Cursos, campi e anos são separados conforme cada processo seletivo."],
     ["CONSULTA","Filtros e busca","O visitante seleciona carreira, curso, período ou modalidades disponíveis."],
     ["ANÁLISE","Gráficos e PDFs","As comparações visuais mantêm acesso às fontes e às lacunas de dados."]
   ]},
   "iee":{heading:"Etapas da análise de estabilidade.",intro:"Esquema do método estudado no artigo sobre geradores síncronos; não exibe medições nem resultados inéditos.",steps:[
     ["MODELO","Gerador síncrono","O comportamento dinâmico é representado por equações de estado descritor."],
     ["SIMULAÇÃO","MATLAB e Simulink","Os modelos são preparados para estudo e análise."],
     ["ESTABILIDADE","Linearização e autovalores","A análise de pequenas perturbações examina a resposta dinâmica."],
     ["PARÂMETROS","Estudo de sensibilidade","Investiga-se a influência dos parâmetros sobre a estabilidade."]
   ]}
 };
 const flow=flowSpecs[id];
 const architecture=document.querySelector(".case-architecture");
 const process=$("case-process");
 if(!flow){
   architecture?.remove();
   const step=document.querySelector(".case-thinking .case-kicker");
   if(step)step.textContent="02 / DECISÕES TÉCNICAS";
 }else{
   put("architecture-title",flow.heading);
   const explanation=document.querySelector(".case-flow-intro");
   if(explanation)explanation.textContent=flow.intro;
   process.classList.add("app-flow");
   process.style.setProperty("--flow-count",String(flow.steps.length));
   process.setAttribute("aria-label","Etapas documentadas de "+item.name);
   for(const [i,[phase,name,detail]] of flow.steps.entries()){
     const li=document.createElement("li");
     li.className="app-flow-step"+(i===0?" is-start":i===flow.steps.length-1?" is-end":"");
     const top=document.createElement("div");top.className="app-flow-top";
     const number=document.createElement("span");number.className="process-n";
     number.textContent=String(i+1).padStart(2,"0");
     const phaseEl=document.createElement("small");phaseEl.className="app-flow-phase";phaseEl.textContent=phase;
     top.append(number,phaseEl);
     const title=document.createElement("strong");title.textContent=name;
     const paragraph=document.createElement("p");paragraph.className="app-flow-detail";paragraph.textContent=detail;
     const connector=document.createElement("span");connector.className="app-flow-connector";connector.setAttribute("aria-hidden","true");
     li.append(top,title,paragraph,connector);process.appendChild(li);
   }
 }
 const pillars=$("case-pillars");
 item.pillars.forEach(([title,description],i)=>{
   const article=document.createElement("article");article.className="case-pillar";
   const span=document.createElement("span");span.className="pillar-n";span.textContent="0"+(i+1)+" / PRINCÍPIO";
   const h=document.createElement("h3");h.textContent=title;
   const p=document.createElement("p");p.textContent=description;
   article.append(span,h,p);pillars.appendChild(article);
 });
 const art=$("case-art");
 function flowArt(steps,mode){
  const nodes=steps.map((step,i)=>`<div class="scene-flow-node"><span>0${i+1}</span><strong>${step}</strong></div>`).join('<span class="scene-flow-arrow" aria-hidden="true">→</span>');
  return `<div class="scene-flow scene-flow-${mode}"><div class="scene-overline">REFERÊNCIA DIDÁTICA / ESTRUTURA DE PROCESSAMENTO</div><div class="scene-flow-track">${nodes}</div><div class="scene-flow-footer">Cada bloco representa uma responsabilidade conceitual, não uma operação executada.</div></div>`;
 }
 function crmArt(){
  return `<div class="scene-crm"><div class="scene-crm-window"><div class="scene-window-head"><span class="window-dots"><i></i><i></i><i></i></span><span>CRM / ARQUITETURA DE INTEGRAÇÕES</span><span>MAPA DE CAMADAS</span></div>
  <div class="scene-crm-body">
   <div class="scene-crm-sidebar"><b>WORKSPACE</b><span>Visão geral</span><span>Relacionamentos</span><span class="selected">Atividades</span><span>Integrações</span><span>Automações <small>em desenvolvimento</small></span></div>
   <div class="scene-crm-main"><div class="scene-crm-title"><div><small>CAMADA DE INTEGRAÇÕES</small><h3>Um domínio. Vários canais.</h3></div><span class="scene-label">ESQUEMA</span></div>
    <div class="scene-crm-integrations"><div><small>CANAL 01</small><strong>WhatsApp Business</strong><p>Meta Cloud API · coexistência</p></div><div class="scene-crm-line" aria-hidden="true">⇄</div><div><small>DOMÍNIO</small><strong>CRM</strong><p>Multi-workspace · regras</p></div><div class="scene-crm-line" aria-hidden="true">⇄</div><div><small>CANAL 02</small><strong>Google Agenda</strong><p>Atividades · serviços</p></div></div>
    <div class="scene-crm-bottom"><div><small>EDITOR DE AUTOMAÇÕES</small><strong>Editor de automações</strong><p>Gatilhos → operações → auditoria</p></div><div><small>ORÇAMENTO POR OPERAÇÃO</small><strong>Reserva de créditos</strong><p>Estimar → autorizar → registrar</p></div></div>
   </div>
  </div></div><span class="scene-stamp">CAMADAS DE INTEGRAÇÃO · CRM SERVERLESS</span></div>`;
 }
 function voiceArt(){
  return `<div class="scene-voice interactive-voice" data-step="0">
  <div class="voice-simulation-label"><span>VOICE2TEXT · DEMONSTRAÇÃO INTERATIVA</span><strong>Sem microfone, ASR ou clipboard reais</strong></div>
  <div class="scene-voice-editor">
   <div class="scene-window-head"><span class="window-dots"><i></i><i></i><i></i></span><span>EDITOR / DOCUMENTO DE EXEMPLO</span><span>AMBIENTE FICTÍCIO</span></div>
   <div class="scene-voice-workarea"><aside><span>ARQUIVOS</span><p>nota-de-exemplo.txt</p><p>anotacoes.md</p><span>PROCESSAMENTO</span><p>Whisper local · Windows</p></aside><div><div class="scene-document-kicker">ÁREA DE TEXTO ILUSTRATIVA</div><h3 id="voice-scene-title">Primeiro, escolher a entrada.</h3><p class="scene-editable" id="voice-scene-editor">O editor está pronto para receber uma nota de exemplo.</p><div class="scene-doc-line"></div><div class="scene-doc-line short"></div></div></div>
   <div class="scene-voice-pill"><span class="scene-mic-mark"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" width="19" height="19"><rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 10a7 7 0 0 0 14 0M12 17v5m-4 0h8"/></svg></span><div><strong id="voice-scene-pill">Entrada: microfone</strong><small id="voice-scene-subtitle">Escolha uma etapa no painel inferior</small></div><div class="scene-waveform" aria-hidden="true">${[8,14,6,20,11,25,17,9,20,15,7,11].map((h,i)=>`<i style="height:${h}px;animation-delay:-${(i%5)*0.17}s"></i>`).join("")}</div></div>
  </div>
  <div class="voice-stepper" role="group" aria-label="Etapas da demonstração">
   <button type="button" data-voice-step="0" aria-pressed="true"><span>01</span> Capturar</button>
   <button type="button" data-voice-step="1" aria-pressed="false"><span>02</span> Processar</button>
   <button type="button" data-voice-step="2" aria-pressed="false"><span>03</span> Entregar</button>
   <button type="button" data-voice-step="3" aria-pressed="false"><span>04</span> Se o foco mudar</button>
  </div>
  <p class="voice-simulation-feedback" id="voice-scene-feedback" role="status" aria-live="polite">Selecione uma etapa para explorar o comportamento documentado no código Windows.</p>
  </div>`;
 }
 function agentsArt(){
  return `<div class="scene-agents"><div class="scene-agents-console"><div class="scene-window-head"><span class="window-dots"><i></i><i></i><i></i></span><span>PROJETO / ETAPAS DE CONTROLE</span><span>FONTE → EVIDÊNCIA</span></div><div class="scene-agents-rows"><div><span>01</span><strong>Escopo autorizado</strong><i>AUTORIZADO</i></div><div><span>02</span><strong>AGENTS.md / regras locais</strong><i>REGRAS LIDAS</i></div><div><span>03</span><strong>Inspeção de fontes</strong><i>DELIMITADO</i></div><div><span>04</span><strong>Validação</strong><i>REVISADO</i></div><div><span>05</span><strong>Entrega documentada</strong><i>DISPONÍVEL</i></div></div><div class="scene-agents-dual"><span>ASUS / ASTRA</span><span>GALAXY / JARVIS</span><small>AMBIENTES INDEPENDENTES</small></div></div><span class="scene-stamp">ESTUDO DO FLUXO, NÃO EXECUÇÃO REMOTA</span></div>`;
 }
 function mobileArt(){
   const select=id==="select-anywhere";
   const title=select?"Seleção precisa":id==="lost-time"?"Lost Time":item.name;
   const body=select?`<p class="scene-phone-selection">Este é um texto de exemplo <mark>que pode ser selecionado com precisão</mark> mesmo quando o aplicativo não permite seleção nativa.</p>`:`<div class="scene-phone-bars">${[33,55,44,76,61,40,57].map((h)=>`<i style="height:${h}px"></i>`).join("")}</div><div class="scene-phone-two"><span>FOCO</span><span>HISTÓRICO</span></div>`;
   return `<div class="scene-mobile"><div class="scene-mobile-orbit"></div><div class="scene-phone"><div class="scene-phone-status">09:41 <span>•••</span></div><div class="scene-phone-notch"></div><div class="scene-phone-content"><small>ANDROID / CONCEPT</small><h3>${title}</h3>${body}<div class="scene-phone-bottom"><i></i><i></i><i></i><i></i></div></div></div><div class="scene-mobile-aside"><span>ANDROID</span><strong>${select?"O texto é seu. A seleção também.":"Projetar para o contexto real."}</strong><p>Representação editorial do problema. Captura autenticada do aplicativo ainda pendente.</p></div><span class="scene-stamp">VISUAL CONCEITUAL · NÃO É SCREENSHOT DA PLAY STORE</span></div>`;
 }
 function researchArt(){
  return `<div class="scene-research"><div class="scene-research-grid"><div class="scene-research-top"><span>${id==="iee"?"DYNAMIC SYSTEMS / MATLAB":"MODEL COMPARISON / EXPERIMENTS"}</span><span>ABSTRACT SIGNAL / NOT MEASURED DATA</span></div>
   <svg viewBox="0 0 860 325" role="img" aria-label="Desenho vetorial conceitual de formas de onda, sem representar medições científicas." preserveAspectRatio="xMidYMid meet">
    <defs><linearGradient id="signalLine" x1="0" y1="0" x2="1" y2="0"><stop stop-color="#b9c7ff"/><stop offset=".55" stop-color="#d4ff85"/><stop offset="1" stop-color="#a5d6dd"/></linearGradient></defs>
    <path d="M30 40V270M30 270H820" stroke="#5e787f" stroke-width="1"/><g stroke="#42606c" stroke-width=".6" stroke-dasharray="3 8"><path d="M30 90H820M30 160H820M30 220H820M170 40V270M320 40V270M470 40V270M620 40V270M770 40V270"/></g>
    <path d="M34 160C66 38 90 284 130 160S200 78 240 160S306 112 344 160S416 134 450 160S530 146 570 160S657 155 700 160S760 158 811 160" stroke="url(#signalLine)" stroke-width="3" fill="none"/>
    <path d="M34 158C120 144 185 192 247 167S371 153 442 160S548 167 645 159S750 162 812 160" stroke="#b1b6fa" stroke-width="2" stroke-dasharray="4 5" fill="none" opacity=".65"/>
    <text x="40" y="26" font-size="13" fill="#a0b8c0">CONCEPTUAL RESPONSE</text><text x="730" y="296" font-size="12" fill="#8099a1">time →</text>
   </svg><div class="scene-research-footer"><span>SIMULAÇÃO / REFERÊNCIA</span><span>COMPARAR · QUESTIONAR · VALIDAR</span></div></div><span class="scene-stamp">DESENHO DIDÁTICO · NÃO É GRÁFICO DO ARTIGO OU DADOS REAIS</span></div>`;
 }
 function inkArt(){
  return `<div class="scene-ink"><div class="scene-ink-paper"><span>EXPERIMENTAL INK / RENDERING STUDY</span><svg viewBox="0 0 600 250" aria-label="Ilustração autoral com linhas vetoriais, não prova de escrita com dispositivo real"><path d="M45 170C88 40 111 233 160 135S244 45 270 160S332 194 350 113S402 53 430 146S517 216 545 85" stroke="#182d47" stroke-width="2.6" fill="none" stroke-linecap="round"/><path d="M45 185C90 57 106 240 170 148S243 57 276 167S328 203 366 122S412 63 440 158S517 225 554 98" stroke="#53687c" stroke-width="1" fill="none" stroke-linecap="round" opacity=".75"/></svg><div><span>BASELINE</span><span>VARIAÇÃO SINTÉTICA</span></div></div><span class="scene-stamp">TRAÇOS VETORIAIS ILUSTRATIVOS · NÃO É TESTE WACOM</span></div>`;
 }
 function audioArt(){
  return `<div class="scene-audio"><div class="scene-audio-rack"><span>VOICE SIGNAL / DSP STUDY</span><h3>Uma voz.<br>Várias condições de ruído.</h3><div class="scene-audio-track"><small>ENTRADA / ESQUEMA</small><div class="scene-audio-bars">${Array.from({length:52},(_,i)=>`<i style="height:${6+((i*17)%47)}px"></i>`).join("")}</div></div><div class="scene-audio-track processed"><small>SAÍDA / ESQUEMA</small><div class="scene-audio-bars">${Array.from({length:52},(_,i)=>`<i style="height:${8+((i*11)%23)}px"></i>`).join("")}</div></div><p>Formas de onda ilustrativas: não mostram supressão medida nem qualidade de voz.</p></div><span class="scene-stamp">DSP / VISUALIZAÇÃO CONCEITUAL</span></div>`;
 }
 if(id==="lost-time"){
   const assets=[
     {n:"01",label:"01 / ATENÇÃO",title:"Retome sua atenção",alt:"Arte de divulgação do Lost Time com tela real de acompanhamento do tempo de uso"},
     {n:"04",label:"02 / HISTÓRICO",title:"Veja sua semana",alt:"Arte de divulgação do Lost Time com tela real de estatísticas e gráfico semanal"},
     {n:"05",label:"03 / METAS",title:"Crie metas e foco",alt:"Arte de divulgação do Lost Time com tela real dos controles de foco"}
   ];
   const cards=assets.map(v=>`<figure class="lt-hd-card">
     <a href="../assets/evidence/lost-time-play-hires-${v.n}.svg" target="_blank" rel="noopener noreferrer" aria-label="Ampliar imagem: ${v.title}">
       <img src="../assets/evidence/lost-time-play-hires-${v.n}.svg" width="1080" height="1920" alt="${v.alt}" loading="eager">
     </a><figcaption><small>${v.label}</small><strong>${v.title}</strong></figcaption>
   </figure>`).join("");
   art.innerHTML=`<div class="lt-hd-scene">
      <div class="lt-hd-intro">
       <small>LOST TIME · ANDROID · GOOGLE PLAY</small>
       <h3>Seu tempo.<br><em>Suas escolhas.</em></h3>
       <p>Entenda quanto tempo você passa em cada aplicativo, acompanhe hábitos e defina limites para recuperar o foco.</p>
       <span class="lt-hd-direction">Três perspectivas sobre o mesmo propósito.</span>
      </div>
      <div class="lt-hd-gallery" role="group" tabindex="0" aria-label="Galeria de três peças em alta resolução do Lost Time; deslize para navegar no celular">
       ${cards}
      </div>
   </div>`;
   const note=document.querySelector(".case-artframe > figcaption");
   if(note)note.textContent="Lost Time · peças originais de divulgação da Google Play (1080 × 1920). Clique ou toque para ampliar cada imagem.";
 }
 else if(id==="crm")art.innerHTML=crmArt();
 else if(id==="voice2text")art.innerHTML=voiceArt();
 else if(id==="jarvis")art.innerHTML=agentsArt();
 else if(["select-anywhere","better-notifications","easy-sign"].includes(id))art.innerHTML=mobileArt();
 else if(id==="iee")art.innerHTML=researchArt();
 else if(["tcc","transcrever"].includes(id))art.innerHTML=audioArt();
 else art.innerHTML=flowArt(item.layers,id);
 // A distinctive chapter for each of the two most complex software systems.
 const figure=document.querySelector(".case-artframe");
 if(id==="voice2text"){
   const chapter=document.createElement("section");chapter.className="case-special";chapter.setAttribute("aria-label","Duas experiências Voice2Text");
   chapter.innerHTML=`<div class="case-special-head"><span>WINDOWS + ANDROID / FORMAS DE USO</span><h2>Uma ideia. <em>Dois modos de uso.</em></h2></div>
   <figure class="case-original-asset"><img src="../assets/voice2text-landing-cover.svg" alt="Arte editorial da landing Voice2Text: Pensou? Falou. Virou texto. Uma pílula de ditado estilizada é ilustrada." width="1200" height="630" loading="lazy"><figcaption>Identidade visual da landing Voice2Text, dedicada às experiências Windows e Android.</figcaption></figure><div class="case-platform-grid"><article><small>01 / WINDOWS · FONTE INSPECIONADA</small><h3>Ditado que volta ao editor.</h3><p>Uma pílula WPF dá acesso à captura; Whisper local prepara o texto e a rotina de saída verifica o destino antes de tentar colar.</p><div class="case-platform-foot"><span>WPF / Whisper / Clipboard</span><strong>Código documentado</strong></div></article><article><small>02 / ANDROID · EXPERIÊNCIA MOBILE</small><h3>Sessões para revisitar depois.</h3><p>A versão Android segue desenvolvimento independente, com funcionalidades e validações avaliadas separadamente do aplicativo Windows.</p><div class="case-platform-foot"><span>Mobile / On-device</span><strong>Frente Android em desenvolvimento</strong></div></article></div>`;
   figure.insertAdjacentElement("afterend",chapter);
 }
 if(id==="crm"){
   const chapter=document.createElement("section");chapter.className="case-special";chapter.setAttribute("aria-label","Estados das integrações do CRM");
   chapter.innerHTML=`<div class="case-special-head"><span>PROTOCOLOS / AUTORIZAÇÃO / ATIVAÇÃO</span><h2>Conectado no código.<br><em>Controlado na execução.</em></h2></div>
   <div class="case-condition-grid">
   <article><small>META / ENTRADA</small><strong>Business App → webhook assinado</strong><p>Parser de ecos, mensagens e histórico com validação do ingresso. Coexistência completa ainda não homologada.</p><span>IMPLEMENTAÇÃO DE PROTOCOLO</span></article>
   <article><small>META / SAÍDA</small><strong>Templates → admissão de créditos</strong><p>UI e transporte previstos; envio real permanece condicionado à validação financeira e operacional.</p><span>SEM ENVIO OPERACIONAL COMPROVADO</span></article>
   <article><small>CALENDAR / ACTIVITIES</small><strong>CRM ↔ Google Calendar</strong><p>Sincronização gerenciada para atividades vinculadas, distinta dos eventos da Meta. A operação ponta a ponta ainda requer validação.</p><span>COMPONENTES DE SINCRONIZAÇÃO</span></article>
   <article><small>AUTOMAÇÕES / FINANÇAS</small><strong>Editor visual + reserva integral</strong><p>Grafo, prévia sem execução e versões inativas. O controle de créditos ainda depende de validação transacional.</p><span>EDITOR EM DESENVOLVIMENTO</span></article></div>`;
   figure.insertAdjacentElement("afterend",chapter);
 }
 if(item.relatedPublication){
   const chapter=document.createElement("section");chapter.className="case-related";chapter.setAttribute("aria-label",item.relatedPublication.kind==="coauthored"?"Artigo IEEE em coautoria":"Publicação IEEE relacionada");
   const p=item.relatedPublication;
   const kicker=document.createElement("p");kicker.textContent=p.kind==="coauthored"?"PUBLICAÇÃO ACADÊMICA / COAUTORIA CONFIRMADA":"PESQUISA RELACIONADA / ARTIGO DO ORIENTADOR";
   const title=document.createElement("h2");title.textContent=p.title;
   const authors=document.createElement("p");authors.textContent=p.authors+" · "+p.year+(p.doi?" · DOI "+p.doi:" · DOI ainda não localizado");
   const note=document.createElement("p");note.className="case-related-note";note.textContent=p.kind==="coauthored"?"O programa oficial do ICHVE 2026 lista A. M. Yojo de Lima como coautor do Paper 1305. A participação está confirmada; DOI e texto integral só serão associados mediante fonte oficial específica.":"Os autores listados nesta publicação são distintos dos participantes do projeto de IC."; 
   const link=document.createElement("a");link.href=p.url;link.target="_blank";link.rel="noopener noreferrer";link.textContent=p.kind==="coauthored"?"Consultar o Paper 1305 no programa oficial ↗":"Consultar publicação relacionada ↗";
   chapter.append(kicker,title,authors,note,link);
   figure.insertAdjacentElement("afterend",chapter);
 }
 // Opt-in controls operate on this editorial illustration only.
 if(id==="voice2text"){
   const steps=[
     {title:"Primeiro, escolher a entrada.",editor:"O editor está pronto para receber uma nota de exemplo.",pill:"Entrada: microfone",subtitle:"Hotkey e janela de captura nativas no Windows",message:"Etapa 1/4 — a fonte é escolhida e a UI indica o modo de captura."},
     {title:"Transcrição em processamento.",editor:"O editor continua aguardando; nenhuma palavra é inserida ao vivo.",pill:"Whisper local · processando",subtitle:"Texto consolidado, ainda sem colagem",message:"Etapa 2/4 — simulação do reconhecimento local. Nenhum áudio é capturado nesta página."},
     {title:"Texto entregue ao destino.",editor:"Registrar as três prioridades do projeto no documento.",pill:"Tentativa de colagem após conferir o foco",subtitle:"Frase editorial fictícia; sem uso do clipboard",message:"Etapa 3/4 — ramo hipotético de foco confirmado. Não é prova de que todo editor aceite a inserção."},
     {title:"O destino mudou.",editor:"O editor original permanece sem alteração.",pill:"Não enviar teclas ao destino incerto",subtitle:"Texto preservado para recuperação manual",message:"Etapa 4/4 — quando o foco não é seguro, a rotina evita colar na janela errada."}
   ];
   const buttons=[...document.querySelectorAll("[data-voice-step]")];
   const scene=document.querySelector(".interactive-voice");
   buttons.forEach(button=>button.addEventListener("click",()=>{
      const idx=Number(button.dataset.voiceStep);const step=steps[idx];if(!step)return;
      buttons.forEach(b=>b.setAttribute("aria-pressed",String(b===button)));
      scene.dataset.step=String(idx);
      put("voice-scene-title",step.title);
      put("voice-scene-editor",step.editor);
      put("voice-scene-pill",step.pill);
      put("voice-scene-subtitle",step.subtitle);
      put("voice-scene-feedback",step.message);
   }));
 }
})();
