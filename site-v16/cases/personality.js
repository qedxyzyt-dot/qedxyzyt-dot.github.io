"use strict";
/* Editorial families: each case keeps factual text from data.js and receives a
   distinct, source-grounded visual. Public videos are linked, never autoplayed.
   Drawings of processes are never presented as screenshots or measured results. */
(() => {
 const items=window.PORTFOLIO_CASES||{};
 const query=new URLSearchParams(location.search).get("project");
 const id=Object.hasOwn(items,query)?query:"jarvis";
 const item=items[id];
 const categories={
   "qed":"publishing","iee":"laboratory","nero":"offshore",
   "tcc":"audio","lost-time":"app","select-anywhere":"accessibility",
   "voice2text":"dictation","jarvis":"agents","crm":"cloud",
   "omniclip":"sync","cash-map":"finance","clickfx":"interaction",
   "xournal-plus-plus":"ink","transcrever":"media",
   "better-notifications":"mobile","easy-sign":"documents","circuitos":"academia"
 };
 const family=categories[id]||"product";
 document.body.dataset.caseFamily=family;

 const labels={
   publishing:["02 / ROTEIRO & CONTEÚDO","Como um problema se transforma em explicação.","05 / VÍDEOS PUBLICADOS"],
   laboratory:["02 / MÉTODO CIENTÍFICO","Modelo, hipótese e análise.","05 / PESQUISA & FONTES"],
   offshore:["02 / MONITORAMENTO E ANÁLISE","Da observação ao diagnóstico.","05 / PESQUISA & LIMITES"],
   audio:["02 / ÁUDIO EM TEMPO REAL","Do sinal à escuta.","05 / DSP & PESQUISA"],
   finance:["02 / EXPERIÊNCIA FINANCEIRA","A experiência e o seu contexto.","05 / COMPONENTES & EVIDÊNCIA"],
   agents:["02 / ORQUESTRAÇÃO DE FERRAMENTAS","Um ambiente com responsabilidades.","05 / ENGENHARIA DE AGENTES"],
   app:["02 / FLUXO DE PRODUTO","O caminho entre intenção e ação.","05 / PRODUTO & DESENVOLVIMENTO"]
 };
 const [chapter,titles,skillTitle]=labels[family]||["02 / FUNCIONAMENTO","Decisões de implementação.","05 / SOFTWARE & FERRAMENTAS"];
 const architecture=document.querySelector(".case-architecture .case-kicker");
 const architectureTitle=document.getElementById("architecture-title");
 if(architecture)architecture.textContent=chapter;
 if(architectureTitle)architectureTitle.textContent=id==="qed"?"Fluxo de produção.":["nero","iee"].includes(id)?"Fluxo da pesquisa.":id==="circuitos"?"Fluxo de curadoria.":"Fluxo da aplicação.";
 const sectionKicker=document.querySelector(".case-proof .case-kicker");
 if(sectionKicker)sectionKicker.textContent=skillTitle;
 const desc=document.querySelector('meta[name="description"]');
 if(desc)desc.content=item.name+" — "+item.intro.slice(0,155);
 const proofLabel=document.querySelector(".case-facts div:nth-child(3) strong");
 const proofLabels={
   qed:"Vídeos e canal públicos",iee:"Orientação acadêmica e publicação correlata",
   nero:"Pesquisa e método documentados",jarvis:"Ferramentas locais documentadas",
   "lost-time":"Peças Google Play do produto","xournal-plus-plus":"Fixtures técnicas do fork",
   "cash-map":"Descrição e identidade do projeto"
 };
 if(proofLabel)proofLabel.textContent=proofLabels[id]||"Código e decisões documentados";
 const brand=document.querySelector(".case-brand-identity span");
 if(brand){
  const authentic=["jarvis","omniclip","crm","clickfx","nero","tcc","lost-time","select-anywhere","voice2text","better-notifications","easy-sign","circuitos"];
  if(authentic.includes(id))brand.textContent=id==="nero"?"Símbolo do TPN · origem a confirmar":"Identidade visual do projeto";
  else brand.textContent="Identidade editorial";
 }
 const vocab={
  qed:["QUESTÃO / PROVA / DEMONSTRAÇÃO / PRODUÇÃO / DIDÁTICA","Uma explicação que permanece.","Do enunciado à solução."],
  nero:["SÉRIES TEMPORAIS / MODELO / REFERÊNCIA / INCERTEZA","Uma hipótese merece teste.","Onde o método encontra seus limites."],
  iee:["GERADOR / INVERSOR / AUTOVALORES / MODELAGEM / SISTEMAS ELÉTRICOS","Modelar para compreender.","Entre matemática e engenharia elétrica."],
  tcc:["FALA / RUÍDO / DENOISING / LATÊNCIA / ESCUTA","Voz natural é prioridade.","O que a medição não escuta."],
  "lost-time":["TEMPO / ATENÇÃO / LIMITES / HISTÓRICO / ESCOLHA","Retomar atenção é uma escolha.","O cuidado está na interface."],
  "select-anywhere":["SELEÇÃO / ACESSIBILIDADE / GEOMETRIA / OCR / PRIVACIDADE","Mais texto ao alcance.","Precisão como decisão de produto."],
  voice2text:["VOZ / CAPTURA / ASR / FOCO / EDIÇÃO","Uma ideia segue até o editor.","O ditado que respeita o contexto."],
  jarvis:["AUTORIZAÇÃO / WORKSPACE / MCP / TESTES / HANDOFF","Agentes entregam evidências.","Confiabilidade antes de autonomia."],
  crm:["META / WHATSAPP / WORKSPACE / EVENTOS / CRÉDITOS","Integração é responsabilidade.","Operação assíncrona sob controle."],
  omniclip:["DISPOSITIVOS / CLIPBOARD / PERMISSÃO / DESTINO / CONFIRMAÇÃO","Continuidade sem ruído.","O momento da transferência."],
  "cash-map":["CLAREZA / FINANÇAS / INTERFACE / VALIDAÇÃO / EVOLUÇÃO","Uma interface deve explicar.","Decisões de apresentação e produto."],
  clickfx:["CURSOR / MOVIMENTO / FEEDBACK / WINDOWS / PERCEPÇÃO","Detalhes que acompanham a ação.","O gesto como parte da interface."],
  "xournal-plus-plus":["TRAÇO / CAIRO / TEXTURA / GTK / FORK","A tinta também tem arquitetura.","Entre a mão e o píxel."],
  transcrever:["ÁUDIO / TRANSCRIÇÃO / SEGMENTAÇÃO / REVISÃO / EXPORTAÇÃO","Automatizar sem perder o sentido.","Quando manter é melhor que cortar."],
  "better-notifications":["CORES / BORDAS / ACESSIBILIDADE / NOTIFICAÇÕES / ANDROID","A atenção encontra um sinal.","Visibilidade sem distração."],
  "easy-sign":["DOCUMENTO / ASSINATURA / PDF / POSIÇÃO / PRIVACIDADE","Assinar deve ser simples.","Do documento à decisão."],
  circuitos:["QUESTÕES / CURADORIA / AVALIAÇÃO / TEX / PROVENIÊNCIA","Organizar também é ensinar.","Seleção antes da transcrição."]
 };
 const current=vocab[id];
 if(current){
   const strap=document.querySelector(".case-scroll-strip>div");
   if(strap)strap.textContent=(current[0]+" / "+current[0]);
   const endHeading=document.querySelector(".case-end h2");
   if(endHeading)endHeading.textContent=current[1];
   const detailHeading=document.getElementById("details-title");
   if(detailHeading)detailHeading.textContent=current[2];
 }
 const figureHeader=document.querySelector(".case-artframe-label span:first-child");
 if(figureHeader)figureHeader.textContent={
   crm:"INTEGRAÇÕES / CAMADAS E EVENTOS",
   voice2text:"CAPTURA / PROCESSAMENTO / INSERÇÃO",
   tcc:"DENOISING / SIGNAL PATH",
   "xournal-plus-plus":"ESCRITA DIGITAL / RENDERIZAÇÃO",
   transcrever:"SEGMENTAÇÃO / REVISÃO",
   clickfx:"CURSOR FX / OVERLAY WINDOWS",
   circuitos:"CURADORIA / FLUXO DE QUESTÕES"
 }[id]||"FLUXO DOCUMENTADO / SISTEMA";
 const frame=document.querySelector(".case-artframe");
 function replaceFigure(html,caption){
   if(!frame)return;
   frame.classList.add("case-media-replaced");
   frame.innerHTML=html+'<figcaption>'+caption+'</figcaption>';
 }
 const source='target="_blank" rel="noopener noreferrer"';
 if(id==="qed"){
   const clips=[
     {id:"hfm9hUukBRc",title:"OBMEP 2019 · questão 01 · nível 1",eyebrow:"Resolução de olimpíada",year:"SHORT"},
     {id:"qZBD24vxg2Y",title:"OBMEP Mirim 2022 · questão 01 · nível 2",eyebrow:"Raciocínio olímpico",year:"SHORT"},
     {id:"fnp50rAttuc",title:"OBMEP · raciocínio lógico · nível 1",eyebrow:"Lógica e demonstração",year:"SHORT"}
   ];
   const cards=clips.map((v,i)=>`<article class="qed-episode">
       <a href="https://www.youtube.com/shorts/${v.id}" ${source} aria-label="Assistir no YouTube: ${v.title}">
         <div class="qed-poster"><div class="qed-symbol" aria-hidden="true">Q.E.D.</div>
         <img src="https://i.ytimg.com/vi/${v.id}/hq2.jpg" loading="lazy" referrerpolicy="no-referrer" alt="Miniatura de vídeo publicado pelo canal QED: ${v.title}" width="480" height="360">
         <span class="qed-play" aria-hidden="true">▶</span></div>
         <div class="qed-episode-body"><small>0${i+1} · ${v.eyebrow} · ${v.year}</small><h3>${v.title}</h3><span class="qed-video-action">Abrir no YouTube ↗</span></div>
       </a></article>`).join("");
   replaceFigure(`<div class="qed-screening" aria-label="Três vídeos publicados no canal QED">
    <div class="qed-screening-lead"><span>CANAL QED · AULAS DE MATEMÁTICA</span><strong>Raciocínio que se acompanha, não apenas se assiste.</strong><p>Três Shorts de destaque fornecidos pelo autor, confirmados como vídeos do canal QED. Miniaturas servidas pelo YouTube; a audiência acumulada informada pelo autor ainda requer contagem datada.</p>
    <a href="https://www.youtube.com/channel/UCiwhkT-ZkNQlmupN7jduBUA" ${source}>Visitar o canal completo ↗</a></div>
    <div class="qed-episodes">${cards}</div></div>`,
    "Três Shorts do canal QED confirmados por metadados públicos do YouTube. Sem autoplay nem contagens não verificadas. Miniaturas de seus titulares.");
   document.querySelectorAll(".qed-poster img").forEach(img=>img.addEventListener("error",()=>img.classList.add("is-unavailable"),{once:true}));
 }
 if(id==="nero"){
  replaceFigure(`<div class="nero-research-scene"><div class="nero-brandboard">
    <div class="nero-mark"><img src="../assets/projects/nero.svg" alt="Símbolo azul associado ao TPN encontrado nos arquivos do Galaxy; origem institucional ainda a confirmar" width="230" height="230"></div>
    <div><small>NEURO / ENGENHARIA OFFSHORE</small><h3>O que mudou no comportamento de um sistema físico?</h3><p>Um projeto de iniciação científica sobre integridade de amarrações, séries temporais e limites da transposição entre simulação e medições reais.</p></div></div>
    <div class="nero-steps"><div><span>01</span><strong>Observação</strong><small>Dados temporais autorizados</small></div><div><span>02</span><strong>Referência</strong><small>Comportamento esperado</small></div><div><span>03</span><strong>Desacordo</strong><small>Hipótese a testar</small></div><div><span>04</span><strong>Interpretação</strong><small>Com incerteza explícita</small></div></div></div>`,
    "Símbolo recuperado do acervo local do TPN; uso institucional a confirmar. Esquema de método — não exibe dados, resultados ou modelos restritos da P-54.");
 }
 if(id==="iee"){
  replaceFigure(`<div class="iee-paper-scene"><div class="iee-paper-top"><span>IEE / USP · INICIAÇÃO CIENTÍFICA</span><a href="https://www.iee.usp.br/pagina/manual-de-identidade-visual/" ${source}>Identidade institucional ↗</a></div>
   <div class="iee-paper-main"><div class="iee-paper-crest"><img src="../assets/projects/iee-official-traced-v12.svg" width="220" height="208" alt="Logotipo colorido do Instituto de Energia e Ambiente da USP"></div><div><small>MODELAGEM EM SISTEMAS ELÉTRICOS</small><h3>Estabilidade começa com um modelo compreensível.</h3><p>Geradores síncronos · representação em espaço de estados · linearização · autovalores e sensibilidade.</p></div></div>
   <div class="iee-paper-strip"><span>MODELAGEM</span><span>MATLAB / SIMULINK</span><span>ANÁLISE DE ESTABILIDADE</span></div></div>`,
   "Prancha editorial com sigla textual, não logotipo institucional. Pesquisa desenvolvida no IEE-USP; a coautoria do estudante no Paper 1305 do IEEE ICHVE 2026 é confirmada pelo programa público da conferência.");
 }
 if(["select-anywhere","better-notifications","easy-sign"].includes(id)){
   const galleries={
     "select-anywhere":{
       overline:"SELECT ANYWHERE / ANDROID · ACESSIBILIDADE",
       title:"Selecionar com precisão, mesmo fora da caixa de texto.",
       summary:"Screenshots da composição Pixel 9 Pro destinada à Play Store. O texto usado no exemplo foi criado para demonstrar a seleção e a rolagem.",
       images:[
         ["sa-precision.svg","Seleção de uma frase sobre uma página de exemplo no Android","01 / Seleção precisa"],
         ["sa-scroll.svg","Modo de rolagem durante seleção em texto de demonstração","02 / Rolagem contextual"],
         ["sa-history.svg","Histórico do Select Anywhere em ambiente preparado para materiais de loja","03 / Histórico"]
       ]
     },
     "better-notifications":{
       overline:"BETTER NOTIFICATIONS / ANDROID · INTERFACE",
       title:"Uma assinatura visual para cada notificação.",
       summary:"Material de publicação do aplicativo: interface de configuração, efeito de borda e preferências de privacidade. Peças de loja, não gravação nova de execução.",
       images:[
         ["better-home.svg","Peça de loja com a página de configuração de Better Notifications","01 / Configurar"],
         ["better-effect.svg","Peça de loja mostrando o efeito de iluminação do perímetro","02 / Efeito de borda"],
         ["better-privacy.svg","Peça de loja de controles de comportamento e privacidade","03 / Ajustar comportamento"]
       ]
     },
     "easy-sign":{
       overline:"EASY SIGN / ANDROID · DOCUMENTOS",
       title:"Assinar PDFs de forma direta.",
       summary:"Capturas preparadas para a Google Play em ambiente Pixel 9 Pro com documento demonstrativo, sem contrato ou assinatura de pessoa real.",
       images:[
         ["easy-sign-document.svg","Interface do Easy Sign com documento de exemplo aberto e assinatura de teste","01 / Documento de exemplo"],
         ["easy-sign-precision.svg","Interface do Easy Sign mostrando ajuste de posição de assinatura em PDF de exemplo","02 / Posicionamento"]
       ]
     }
   };
   const entry=galleries[id];
   const shots=entry.images.map(([file,alt,label])=>`<figure class="case-product-shot"><img src="../assets/evidence/${file}" alt="${alt}" width="432" height="960" loading="eager"><figcaption>${label}</figcaption></figure>`).join("");
   replaceFigure(`<div class="case-product-gallery">
     <div class="case-product-gallery-heading"><small>${entry.overline}</small><h3>${entry.title}</h3><p>${entry.summary}</p></div>
     <div class="case-product-gallery-shots">${shots}</div>
   </div>`,
   "Imagens da experiência Android apresentadas nos materiais de divulgação das aplicações.");
 }
 if(["cash-map","omniclip"].includes(id)){
   const cases={
     "cash-map":{
       overline:"CASH MAP / INTERFACE ANDROID",
       title:"Finanças em perspectiva.",
       intro:"Calendário de compromissos, composição de despesas e distribuição diária tornam o histórico financeiro navegável e compreensível.",
       shots:[
        ["cash-map-calendar.webp","Calendário de novembro do Cash Map, com lançamentos financeiros fora do enquadramento","01 / Calendário"],
        ["cash-map-categories-redacted.webp","Gráfico circular por categoria, com valores financeiros inteiramente ocultados","02 / Categorias"],
        ["cash-map-heatmap-redacted.webp","Distribuição diária com área reconstruída para ocultar valores individuais","03 / Distribuição diária"]
       ],
       features:[
        ["01","Calendário de compromissos","Vencimentos, lembretes, dias especiais e navegação mensal em uma única superfície."],
        ["02","Composição dos gastos","Categorias e modalidades organizam a interpretação visual das despesas."],
        ["03","Distribuição no tempo","O mapa de calor revela a concentração de gastos ao longo do mês."]
       ],
       note:"Três perspectivas para explorar o mês — calendário, categorias e intensidade diária."
     },
     omniclip:{
       overline:"OMNICLIP ENHANCED / CONTINUIDADE",
       title:"A área de transferência atravessa dispositivos.",
       intro:"Pareamento, sincronização seletiva e confirmação visual permitem continuar tarefas do Android para computadores Windows.",
       shots:[
        ["omniclip-sync-redacted.webp","OmniClip Enhanced sincronizando com dois computadores, com identificadores de rede ocultados","01 / Sincronização"]
       ],
       features:[
        ["01","Do telefone ao desktop","Copiar conteúdo em um dispositivo e continuar o trabalho no computador."],
        ["02","Controle de envio","Permitir texto e imagens separadamente, segundo a intenção de quem usa."],
        ["03","Confirmação de estado","A interface distingue conexão, sincronização e retorno de recebimento."]
       ],
       note:"Continuidade Android–Windows com controle por conteúdo e estado de conexão."
     }
   };
   const d=cases[id];
   const screenshot=d.shots.map(([file,alt,label])=>`<figure class="owner-proof-shot"><div class="owner-proof-view">
      <img class="owner-proof-image" src="../assets/evidence/user-20261114/${file}" alt="${alt}" loading="eager" decoding="async" width="640" height="840">
     </div><figcaption>${label}</figcaption></figure>`).join("");
   const features=d.features.map(([index,title,description])=>`<article class="owner-proof-feature"><span>${index} / FLUXO DE PRODUTO</span><h4>${title}</h4><p>${description}</p></article>`).join("");
   replaceFigure(`<div class="owner-proof-gallery owner-proof-${id} is-missing">
      <div class="owner-proof-intro"><small>${d.overline}</small><h3>${d.title}</h3><p>${d.intro}</p><span class="owner-proof-note">${d.note}</span></div>
      <div class="owner-proof-shots" aria-label="Imagens do aplicativo">${screenshot}</div>
      <div class="owner-proof-features" aria-label="Funcionalidades do produto">${features}</div>
    </div>`,
    id==="cash-map"?"Cash Map · calendário financeiro, categorias e mapa de calor.":"OmniClip Enhanced · controles de sincronização Android e Windows.");
   const root=frame.querySelector(".owner-proof-gallery");
   const screenshots=[...frame.querySelectorAll(".owner-proof-view > .owner-proof-image")];
   function refresh(){
     const all=screenshots.every(img=>img.complete&&img.naturalWidth>0&&img.naturalHeight>0);
     root.classList.toggle("has-evidence",all);
     root.classList.toggle("is-missing",!all);
   }
   screenshots.forEach(img=>{
     img.addEventListener("load",refresh);
     img.addEventListener("error",refresh);
     if(img.decode)img.decode().then(refresh).catch(refresh);
   });
   refresh();
 }
 if(id==="jarvis"){
   replaceFigure(`<div class="agents-product-scene">
      <div class="agents-product-header"><span>CHATGPT / MCP / DEVSPACE</span><h2>De conversar<br><em>a construir software.</em></h2>
      <p>Ferramentas de desenvolvimento integradas ao ChatGPT: os agentes consultam um workspace autorizado, trabalham no código e devolvem resultados de engenharia.</p></div>
      <div class="agents-product-system">
        <div class="agents-chat-card"><div class="agents-chat-header"><img src="../assets/projects/openai-symbol-v11.svg" width="34" height="34" loading="eager" alt="Marca da OpenAI"><span>ChatGPT</span></div>
          <strong>Pedido em linguagem natural</strong><p>Inspecione o projeto, proponha mudanças, valide e apresente as evidências.</p>
          <div class="agents-chat-feedback"><span class="agent-dot"></span> Ferramentas de projeto conectadas</div></div>
        <div class="agents-link" aria-hidden="true"><span>MCP</span><svg viewBox="0 0 76 20" width="76" height="20"><path d="M2 10 H68 M60 3 L69 10 L60 17" fill="none" stroke="currentColor" stroke-width="1.5"/></svg></div>
        <div class="agents-targets">
          <div class="agent-machine"><img src="../assets/projects/jarvis.svg" width="49" height="49" alt=""><div><small>GALAXY BOOK</small><strong>Jarvis</strong><span>Fontes, arquivos e ferramentas</span></div></div>
          <div class="agent-machine"><img src="../assets/projects/astra-original-v11.svg" width="49" height="49" alt="Ícone do Astra Control Center"><div><small>ASUS Z13</small><strong>Astra</strong><span>Edição, build e QA no staging</span></div></div>
        </div>
      </div>
      <div class="agents-outcomes"><span>01 / Abrir contexto</span><span>02 / Usar ferramentas</span><span>03 / Testar</span><span>04 / Entregar</span></div>
      <p class="agents-disclosure">Integração independente com serviços ChatGPT/OpenAI. As ferramentas e os planos conectados mantêm seus respectivos limites de utilização; não há promessa de uso ilimitado.</p>
   </div>`,
   "Jarvis e Astra ampliam o ChatGPT por ferramentas MCP em workspaces Windows com permissões explícitas. Integração independente; sem afiliação ou endosso da OpenAI.");
 }
 // Technical language labels from a public, machine-readable source.
 fetch("../tech-index.json",{cache:"no-store"}).then(response=>{
   if(!response.ok)throw Error("catalogue unavailable");
   return response.json();
 }).then(data=>{
   const entry=data.projects?.find(project=>project.slug===id);
   if(!entry || !entry.languages?.length)return;
   const fact=document.createElement("div");
   fact.className="case-language-fact";
   const small=document.createElement("small");
   small.textContent="LINGUAGENS / CÓDIGO";
   const strong=document.createElement("strong");
   strong.textContent=entry.languages.join(" · ");
   const link=document.createElement("a");
   link.href="../index.html#tecnologias";link.textContent="Matriz de tecnologias ↗";
   fact.append(small,strong,link);
   const sidebar=document.querySelector(".case-facts");
   if(sidebar)sidebar.append(fact);
 }).catch(()=>{});
})();
