"use strict";

/* Project search V15: verified languages/frameworks/services plus card text.
 * tech-index.json is the source of truth; the visible table is an instant
 * fallback while it loads or when the network is unavailable.
 */
(() => {
 const appCards=[...document.querySelectorAll("#grid article.project")];
 const otherCards=[...document.querySelectorAll("#other-grid article.other-work-card")];
 const cards=[...appCards,...otherCards];
 const appGrid=document.getElementById("grid");
 const otherSection=document.getElementById("outras-frentes");
 const buttons=[...document.querySelectorAll("[data-filter]")];
 const search=document.getElementById("search");
 const count=document.getElementById("count");
 const empty=document.getElementById("empty");
 if(!cards.length||!search||!count||!empty)return;

 const index=new Map();
 const aliases=new Map([
  ["js","javascript"],["ts","typescript"],["py","python"],
  ["csharp","c#"],["c-sharp","c#"],["c sharp","c#"],
  ["cpp","c++"],["c plus plus","c++"],["cplusplus","c++"],
  ["dotnet",".net"],["reactjs","react"],["react.js","react"],
  ["nodejs","node.js"],["node js","node.js"],["aws lambda","lambda"]
 ]);
 const specialExact=new Set(["java","c#","c++",".net","c","r"]);
 let active="todos";

 function normalize(value){
  return String(value??"").normalize("NFD").replace(/[\u0300-\u036f]/g,"")
   .toLocaleLowerCase("pt-BR").replace(/\s+/g," ").trim();
 }
 function escapeRegExp(value){return value.replace(/[/\\^$*+?.()|[\]{}]/g,"\\$&");}
 function searchParts(raw){
  const term=normalize(raw);
  if(!term)return [];
  if(aliases.has(term))return [aliases.get(term)];
  return term.split(/\s+/).filter(Boolean).map(word=>aliases.get(word)||word);
 }
 function hasWord(haystack,word){
  const left="(?:^|[^\\p{L}\\p{N}#+.])";
  const right="(?=$|[^\\p{L}\\p{N}#+.])";
  const needle=escapeRegExp(word);
  if(new RegExp(left+needle+right,"u").test(haystack))return true;
  // Incremental typing for regular words. Avoid Java -> JavaScript,
  // and cross-matching C, C#, C++ or .NET identifiers.
  return word.length>=3&&!specialExact.has(word)
   &&new RegExp(left+needle+"[\\p{L}\\p{N}]*","u").test(haystack);
 }
 function tableFallback(){
  for(const row of document.querySelectorAll(".tech-index-table tbody tr")){
   const url=row.querySelector("th a")?.getAttribute("href")||"";
   const slug=new URLSearchParams(url.split("?")[1]||"").get("project");
   if(!slug)continue;
   const values=[row.querySelector("th")?.textContent,
    row.querySelector('[data-label="Linguagens"]')?.textContent,
    row.querySelector('[data-label="Tecnologias"]')?.textContent].filter(Boolean);
   index.set(slug,normalize(values.join(" ")));
  }
 }
 function applyFilter(next){
  active=next;
  for(const button of buttons){
   const selected=(button.dataset.filter||"todos")===next;
   button.classList.toggle("active",selected);
   button.setAttribute("aria-pressed",String(selected));
  }
 }
 function render(){
  const tokens=searchParts(search.value);
  let visible=0,visibleApps=0,visibleOther=0;
  for(const card of cards){
   const categories=(card.dataset.category||"").split(/\s+/);
   const categoryMatch=active==="todos"||categories.includes(active);
   const searchText=normalize(card.textContent+" "+(index.get(card.id)||""));
   const textMatch=tokens.every(token=>hasWord(searchText,token));
   card.hidden=!(categoryMatch&&textMatch);
   if(!card.hidden){
    visible++;
    if(appCards.includes(card))visibleApps++;else visibleOther++;
   }
  }
  appGrid.hidden=visibleApps===0;
  if(otherSection)otherSection.hidden=visibleOther===0;
  const noun=visible===1?"resultado":"resultados";
  const term=search.value.trim();
  count.textContent=term
   ? visible+" "+noun+" para “"+term+"” · "+(active==="todos"?"todas as áreas":"filtro selecionado")
   : visibleApps+" aplicações e ferramentas"+(visibleOther?" · "+visibleOther+" frentes de ensino e pesquisa":"");
  empty.hidden=visible!==0;
  if(!empty.hidden)empty.textContent=term
   ? "Nenhum resultado encontrado para “"+term+"”. Tente outra linguagem, tecnologia ou escolha “Todos”."
   : "Nenhuma aplicação ou frente neste filtro. Selecione “Todos” para ver o portfólio completo.";
 }

 tableFallback();
 for(const button of buttons){
  button.addEventListener("click",()=>{
   applyFilter(button.dataset.filter||"todos");
   render();
  });
 }
 search.addEventListener("input",()=>{
  // Typing searches the entire catalog, regardless of the prior category.
  if(search.value.trim())applyFilter("todos");
  render();
 });
 render();

 fetch("./tech-index.json",{cache:"no-store"})
  .then(response=>{if(!response.ok)throw Error("Technical index HTTP "+response.status);return response.json();})
  .then(data=>{
   if(!Array.isArray(data?.projects))throw Error("Invalid technical index");
   for(const project of data.projects){
    if(!project?.slug||!cards.some(card=>card.id===project.slug))continue;
    const languages=Array.isArray(project.languages)?project.languages:[];
    const tools=Array.isArray(project.tools)?project.tools:[];
    index.set(project.slug,normalize([project.name,...languages,...tools].join(" ")));
   }
   render();
  })
  .catch(()=>{ /* Fallback remains usable when the JSON is unavailable. */ });
})();
