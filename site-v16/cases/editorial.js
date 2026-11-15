"use strict";
/* Product-facing case editorial. Technical provenance and publication limits stay in
 * workstreams; this layer describes user benefit and engineering honestly. No
 * simulated execution is passed off as measured product behavior. */
(() => {
 const id=new URLSearchParams(location.search).get("project");
 const editorial={
  "jarvis":{
   status:"Ferramentas de desenvolvimento",
   summary:"Transformei a conversa com ChatGPT em uma interface para ferramentas de desenvolvimento locais. Jarvis e Astra conectam solicitações a arquivos, comandos e validações em dois computadores, com escopo de execução definido por workspace.",
   contribution:"Integração do ChatGPT a fluxos de engenharia por ferramentas MCP/DevSpace, coordenação de tarefas e revisão dos resultados.",
   pillars:[
    ["ChatGPT + ferramentas","O chat deixa de ser somente uma resposta textual: ele pode consultar um projeto autorizado, inspecionar código, realizar alterações permitidas e retornar resultados verificáveis."],
    ["Dois ambientes, uma interface","Jarvis trabalha no Galaxy Book; Astra, no ASUS. Cada execução respeita a pasta autorizada, as ferramentas disponíveis e as restrições de acesso do respectivo dispositivo."],
    ["Autonomia com rastreabilidade","Regras locais, revisão de alterações, compilação, testes e entregas documentadas compõem o fluxo de desenvolvimento, com controle de permissões e revisão humana."]
   ],
   proof:["Integração funcional de ferramentas MCP com workspaces Windows distintos, usada na própria construção deste portfólio.","O acesso ao computador depende de permissões explícitas; a execução ocorre fora da janela textual, não como capacidade ilimitada do modelo.","Experiência próxima à de um assistente de programação: ler, modificar e validar código no contexto de uma conversa."]
  },
  "crm":{
   status:"Plataforma em desenvolvimento",
   summary:"CRM multi-workspace em AWS com interfaces React, integração à API oficial da Meta para WhatsApp Business e componentes para atividades, agenda, automações e controle de consumo de créditos.",
   pillars:[
    ["WhatsApp Business Platform","Embedded Signup, endpoints e webhooks em desenvolvimento para conversas, templates e coexistência com o Business App; a homologação completa permanece um gate de integração."],
    ["Eventos e agendas","Eventos de atividades integram-se à estrutura de Google Calendar. Mensagens, contatos e histórico usam mecanismos específicos da API Meta — dois fluxos distintos, com regras de autorização próprias."],
    ["Automações e créditos","O editor visual permite estruturar workflows. O modelo de execução prevê publicação, ativação controlada, reserva de créditos e rastreabilidade por operação."]
   ],
   proof:["Arquitetura serverless baseada em React, Python, AWS Lambda, DynamoDB e integrações Meta/Google.","Separação entre identidade, dados de cada workspace, eventos e autorização de efeitos externos.","Um sistema de relacionamentos extensível, com cobrança e automação pensadas como partes da arquitetura."]
  },
  "voice2text":{
   status:"Aplicativo Windows / IA local",
   summary:"Ditado no desktop com captura de áudio, reconhecimento Whisper local, overlay de estado e inserção contextual de texto no editor utilizado.",
   pillars:[
    ["Um gesto, vários estágios","Atalho, captura, processamento local e inserção são apresentados numa mesma experiência: o usuário continua focado no conteúdo."],
    ["Pílula WPF","A interface compacta acompanha o estado de escuta, pausa e processamento. O contorno luminoso e as barras trazem feedback sem bloquear o editor."],
    ["Foco antes da colagem","O destino é conferido antes da tentativa de inserção, reduzindo o risco de escrever na janela errada quando o foco muda."]
   ],
   proof:["Aplicação C#/.NET com WPF, WASAPI e Whisper; componentes do fluxo disponíveis no código Windows.","O componente de destaque nesta página reproduz a interação visual do overlay; o áudio do visitante não é acessado.","O resultado esperado é texto pronto para edição no contexto da tarefa."]
  },
  "lost-time":{
   status:"Android publicado",
   summary:"Bem-estar digital com visualização do tempo de uso, histórico e metas de atenção. O aplicativo reúne dados de utilização em painéis claros e estende a experiência ao Windows.",
   pillars:[
    ["Visão do tempo","Acompanhar o uso do dispositivo em uma interface que transforma registros diários em informação legível."],
    ["Histórico semanal","Perceber padrões e comparar dias para reconhecer oportunidades de uso mais consciente."],
    ["Metas de foco","Definir limites e organizar objetivos de atenção sem transformar o aplicativo em mais uma fonte de distração."]
   ],
   proof:["Aplicativo Android disponível na Google Play, com companion Windows documentado.","Telas reais do aplicativo presentes nas peças de divulgação do aplicativo.","Experiência voltada à autonomia e privacidade na análise de hábitos digitais."]
  },
  "select-anywhere":{
   status:"Android publicado",
   summary:"Seleção e cópia de texto onde interfaces Android não oferecem seleção convencional, combinando acessibilidade, detecção visual e reconhecimento local.",
   pillars:[
    ["Selecionar o que interessa","Interagir com textos que aparecem fora de campos editáveis, a partir de uma camada de seleção própria."],
    ["Precisão e contexto","A geometria de seleção procura respeitar trechos exatos; o suporte pode variar conforme o aplicativo de origem."],
    ["OCR local","Quando a árvore de acessibilidade é insuficiente, o reconhecimento visual amplia os cenários de leitura."]
   ],
   proof:["Kotlin, APIs Android de acessibilidade e ML Kit/OCR no aplicativo.","Interfaces ilustradas pelas capturas do aplicativo preparado para a loja.","Controle explícito pelo usuário sobre o texto selecionado e copiado."]
  },
  "tcc":{
   status:"Pesquisa aplicada em processamento de áudio",
   summary:"Voice Control investiga redução de ruído durante a fala com processamento local e microfone virtual no Windows, considerando naturalidade, inteligibilidade e latência.",
   pillars:[
    ["Ruído concomitante à fala","O problema central não é eliminar o som em silêncio, mas reduzir interferências sem apagar fricativas, voz baixa ou nuances do timbre."],
    ["Pipeline causal","Experimentos com RNNoise, DPDFNet2 e processamento em 48 kHz integram um fluxo para microfone virtual com preocupação explícita de latência."],
    ["Comparação criteriosa","Testes perceptivos e telemetria distinguem supressão, fidelidade, artefatos e atrasos; o trabalho segue em investigação."]
   ],
   proof:["Aplicativo e instrumentação Python/Windows com interfaces de DSP.","Arquitetura que combina denoiser, dinâmica, medição e saída virtual.","Pesquisa aplicada para comunicação em ambientes de ruído urbano."]
  },
  "omniclip":{
   status:"Aplicativo de continuidade Android / Windows",
   summary:"OmniClip Enhanced mantém a área de transferência disponível entre smartphone e computador, com estados de pareamento, conexão e sincronização apresentados ao usuário.",
   pillars:[
    ["Sincronização ativa","A interface evidencia quantos computadores estão conectados e quando uma transferência é confirmada no destino."],
    ["Controle por conteúdo","O envio de textos e imagens pode ser habilitado separadamente para respeitar o contexto de cada dispositivo."],
    ["Continuidade de uso","Reconexão e controles de pareamento reduzem interrupções entre tarefas no celular e no PC."]
   ],
   proof:["Aplicativo com componentes TypeScript/Rust e interface Android/desktop documentados.","A tela do aplicativo mostra conexão ativa entre dois computadores; endereços de rede permanecem omitidos.","Interação centrada em estado, controle e confirmação de transferência."]
  },
  "transcrever":{
   status:"Ferramenta de produtividade audiovisual",
   summary:"Fluxos de reconhecimento e revisão que ajudam a localizar trechos de fala, preparar transcrições e selecionar intervalos de edição com controle humano.",
   pillars:[
    ["Transcrição como índice","ASR transforma áudio em segmentos pesquisáveis que ajudam a localizar conteúdo e preparar revisão."],
    ["Cortes com contexto","Intervalos candidatos não são excluídos automaticamente apenas por silêncio; o material pode conter pausas significativas."],
    ["Revisão e exportação","O controle final permanece com quem edita, com etapas de inspeção antes da saída."]
   ],
   proof:["Automação desktop apoiada em C#, Whisper e FFmpeg; tarefas complementares documentadas.","Segmentação e revisão tratadas como fases distintas.","Foco na preservação do sentido em material falado."]
  },
  "clickfx":{
   status:"Aplicativo Windows de efeitos de cursor",
   summary:"ClickFX adiciona feedback óptico aos cliques no desktop com efeitos Warp, Ripple e Rings. A ferramenta combina captura de interação, renderização e controles de intensidade.",
   pillars:[
    ["Warp · distorção elástica","O clique gera uma depressão óptica localizada, deformando momentaneamente os píxeis ao redor do ponteiro."],
    ["Ripple · propagação radial","Uma onda se desloca pela região do evento e refrata a imagem conforme a variação do campo de distorção."],
    ["Uso controlado","Efeitos transitórios, perfis por botão e condições de execução pensados para não interromper a atividade."]
   ],
   proof:["Implementação Windows em C# com mecanismos de captura, efeitos e testes de Warp/Ripple.","Renderização temporária baseada em deformação de imagem; funcionamento definido por parâmetros de raio, intensidade e duração.","Demonstração visual desta página representa os dois mecanismos; gravações nativas exigem seleção e revisão de privacidade."]
  },
  "better-notifications":{
   status:"Aplicativo Android",
   summary:"Alertas personalizados para Android com efeitos de luz e movimento que ampliam a visibilidade de notificações, com atenção à acessibilidade.",
   pillars:[
    ["Efeitos de perímetro","Animações em torno da tela ajudam a perceber eventos sem abrir imediatamente o aplicativo."],
    ["Personalização","Cores, padrões e comportamento das notificações podem ser ajustados para adequar o feedback ao contexto."],
    ["Privacidade e atenção","A configuração procura equilibrar visibilidade, controle e discrição."]
   ],
   proof:["Implementação Kotlin para Android; telas de configuração, efeitos e privacidade presentes no material de divulgação.","Interação visual baseada em eventos do sistema.","Configuração sob controle do usuário."]
  },
  "easy-sign":{
   status:"Aplicativo Android",
   summary:"Assinatura visual de documentos PDF no Android, com posicionamento controlado da assinatura e processamento local.",
   pillars:[
    ["PDF em primeiro plano","A visualização do documento orienta a escolha do local de assinatura."],
    ["Posicionamento preciso","A interação permite revisar o alinhamento no documento antes da saída."],
    ["Assinatura visual e segurança","O traço inserido no PDF não equivale, por si só, a uma assinatura digital certificada. O código Android inclui componentes Java, PDF e Android Keystore."]
   ],
   proof:["Fontes Java e telas do aplicativo preparado para a Play Store.","Fluxo de abertura, visualização e assinatura em documento de exemplo.","Experiência centrada em precisão e privacidade do arquivo."]
  },
  "cash-map":{
   status:"Aplicativo financeiro Android",
   summary:"Cash Map organiza informações financeiras em três perspectivas complementares: calendário mensal, composição dos gastos e distribuição diária.",
   contribution:"Desenvolvimento do aplicativo e suas experiências de consulta mensal, classificação e visualização de despesas.",
   pillars:[
    ["Calendário financeiro","O mês reúne lançamentos, vencimentos e lembretes para reconhecer compromissos e navegar por datas."],
    ["Categorias e modalidades","Um gráfico em anel ajuda a compreender a composição de gastos, com separação entre modalidades e categorias."],
    ["Mapa de calor diário","A intensidade dos dias destaca padrões ao longo do mês e conecta a visão agregada aos registros daquele período."]
   ],
   proof:["Aplicativo Android com visões de calendário, categorias e distribuição diária.","Telas do aplicativo ilustram visualização temporal e composição financeira.","Valores e registros particulares foram retirados dos materiais de divulgação."]
  },
  "qed":{
   status:"Conteúdo publicado no YouTube",
   summary:"Canal de matemática com resoluções explicadas passo a passo, incluindo olimpíadas, provas e questões de raciocínio lógico.",
   pillars:[
    ["Raciocínio passo a passo","O conteúdo reorganiza enunciados em pequenas decisões que o espectador consegue acompanhar."],
    ["Matemática em vídeo","Ilustrações, edição e organização visual sustentam uma linguagem didática para Shorts e aulas."],
    ["Publicação contínua","Três Shorts de destaque permitem conhecer diretamente o trabalho de comunicação técnica."]
   ],
   proof:["Vídeos publicados no canal QED e acessíveis por links individuais.","Três miniaturas reais servidas pelo YouTube.","Comunicação matemática como competência complementar à engenharia."]
  },
  "iee":{
   status:"Pesquisa acadêmica / artigo IEEE",
   summary:"Iniciação científica em modelagem de máquinas e sistemas elétricos, com desenvolvimento de modelos de estado e análise de estabilidade a pequenas perturbações.",
   pillars:[
    ["Modelo descriptor state-space","Representação matemática de geradores síncronos e suas dinâmicas para investigar estabilidade em sistemas elétricos."],
    ["Análise de estabilidade","Simulação, linearização, autovalores e parâmetros ajudam a interpretar a resposta de modelos de engenharia elétrica."],
    ["Coautoria acadêmica","Paper 1305 do IEEE ICHVE 2026, assinado por A. M. Yojo de Lima, E. Gurski e L. F. Normandia Lourenço."]
   ],
   proof:["Pesquisa desenvolvida no contexto IEE-USP, com modelagem em MATLAB/Simulink.","Programa oficial do IEEE ICHVE 2026 confirma o título e os três autores do Paper 1305.","Os resultados do artigo são associados à publicação original, sem extrapolar seus dados."]
  }
 };
 const item=editorial[id];
 if(!item)return;
 const set=(sel,t)=>{const el=document.querySelector(sel);if(el&&t)el.textContent=t;};
 set("#case-status",item.status);
 set("#case-intro",item.summary);
 const contribution={
   "jarvis":"Integração de agentes e ferramentas ao fluxo de desenvolvimento no ChatGPT, coordenação de tarefas e validação.",
   "crm":"Implementação de componentes de integração e automações em uma plataforma colaborativa, com contribuição individual no ecossistema serverless.",
   "voice2text":"Desenvolvimento e evolução da experiência Windows de ditado, interface WPF e fluxo de inserção.",
   "lost-time":"Concepção e desenvolvimento do aplicativo Android de bem-estar digital e integração com Windows.",
   "select-anywhere":"Desenvolvimento Android de seleção contextual, acessibilidade e OCR.",
   "tcc":"Pesquisa aplicada em DSP, interfaces Windows e experimentos de melhoria de voz.",
   "nero":"Investigação acadêmica com modelos neurais, análise de séries temporais e avaliação de métodos.",
   "omniclip":"Desenvolvimento de integração entre dispositivos e experiência de sincronização.",
   "transcrever":"Desenvolvimento de fluxos de reconhecimento, segmentação e revisão de mídia.",
   "clickfx":"Desenvolvimento de interações e efeitos gráficos Windows, incluindo Warp e Ripple.",
   "better-notifications":"Implementação Android de notificações visuais, controles de interface e animações.",
   "easy-sign":"Desenvolvimento Android Java do fluxo de visualização e assinatura de PDF.",
   "circuitos":"Engenharia da aplicação web de curadoria e organização de questões em ambiente acadêmico.",
   "cash-map":"Desenvolvimento do aplicativo financeiro móvel e suas experiências de consulta mensal, classificação e visualização de despesas.",
   "qed":"Criação, roteiro, resolução e produção audiovisual de conteúdo matemático.",
   "iee":"Pesquisa de modelagem em sistemas elétricos e coautoria do Paper 1305 do IEEE ICHVE 2026."
 };
 set("#case-role","CONTRIBUIÇÃO / "+(item.contribution||contribution[id]));
 const pillars=document.querySelector("#case-pillars");
 if(pillars&&item.pillars){
   pillars.replaceChildren();
   for(const [i,[heading,description]] of item.pillars.entries()){
     const article=document.createElement("article");article.className="case-pillar";
     const number=document.createElement("span");number.className="pillar-n";number.textContent=String(i+1).padStart(2,"0")+" / DESIGN & ENGENHARIA";
     const h=document.createElement("h3");h.textContent=heading;
     const p=document.createElement("p");p.textContent=description;
     article.append(number,h,p);pillars.append(article);
   }
 }
 set(".case-thinking .case-section-head > p","Decisões técnicas que impactam o funcionamento e a experiência.");
 const lastFigure=document.querySelector(".case-artframe > figcaption");
 if(lastFigure&& !["lost-time","qed","cash-map","omniclip","voice2text","jarvis","iee","nero","clickfx","select-anywhere","better-notifications","easy-sign"].includes(id)){
   lastFigure.textContent="Mapa visual do funcionamento e dos componentes. Detalhes técnicos e fontes são apresentados nas seções seguintes.";
 }
 const authorLabel=document.querySelector(".case-facts div:nth-child(3) strong");
 const proofKind={
   "jarvis":"Ferramentas MCP e projeto local",
   "crm":"Arquitetura e código",
   "voice2text":"Interface e código Windows",
   "lost-time":"Aplicativo e peças Google Play",
   "select-anywhere":"Capturas e código Android",
   "tcc":"DSP e pesquisa aplicada",
   "nero":"Método e arquitetura de ML",
   "omniclip":"Aplicativo e sincronização",
   "transcrever":"Fluxo de automação",
   "clickfx":"Código e efeitos Windows",
   "better-notifications":"Capturas e código Android",
   "easy-sign":"Capturas e código Android",
   "circuitos":"Plataforma acadêmica",
   "cash-map":"Interface financeira",
   "qed":"Shorts publicados",
   "iee":"Artigo IEEE e modelagem"
 };
 if(authorLabel)authorLabel.textContent=proofKind[id]||"Engenharia de software";
 const figureLabels={
   "lost-time":["LOST TIME / APLICAÇÃO ANDROID","TELAS DA EXPERIÊNCIA"],
   "select-anywhere":["SELECT ANYWHERE / ANDROID","SELEÇÃO DE TEXTO"],
   "better-notifications":["BETTER NOTIFICATIONS / ANDROID","EFEITOS DE NOTIFICAÇÃO"],
   "easy-sign":["EASY SIGN / ANDROID","VISUALIZAÇÃO DE PDF"],
   "tcc":["VOICE CONTROL / DSP","CAMINHO DO SINAL"],
   "crm":["CRM / CLOUD & INTEGRAÇÕES","ARQUITETURA DE SERVIÇOS"]
 };
 const tags=document.querySelectorAll(".case-artframe-label span");
 if(figureLabels[id] && tags.length===2){
    tags[0].textContent=figureLabels[id][0];
    tags[1].textContent=figureLabels[id][1];
 }
 const meta=document.querySelector('meta[name="description"]');
 if(meta)meta.content=item.summary.slice(0,159);
})();
