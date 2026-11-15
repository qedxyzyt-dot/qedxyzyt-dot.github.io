"use strict";
/* Lucide arrow paths inherit currentColor after inline conversion.
   Static and dynamically inserted arrows share one consistent high-contrast
   rendering in both themes. Original SVG URLs remain as no-JS fallbacks. */
(() => {
 const paths={
  "ui-arrow-up-right.svg":["M7 7h10v10","M7 17 17 7"],
  "ui-arrow-down-right.svg":["m7 7 10 10","M17 7v10H7"],
  "ui-arrow-left.svg":["m12 19-7-7 7-7","M19 12H5"]
 };
 const arrowSelector='img[src$="ui-arrow-up-right.svg"],img[src$="ui-arrow-down-right.svg"],img[src$="ui-arrow-left.svg"]';
 const convert=(img)=>{
  const key=(img.getAttribute("src")||"").split("/").pop();
  if(!Object.hasOwn(paths,key))return;
  const svg=document.createElementNS("http://www.w3.org/2000/svg","svg");
  svg.setAttribute("viewBox","0 0 24 24");
  svg.setAttribute("width",img.getAttribute("width")||"16");
  svg.setAttribute("height",img.getAttribute("height")||"16");
  svg.setAttribute("fill","none");
  svg.setAttribute("stroke","currentColor");
  svg.setAttribute("stroke-width","2");
  svg.setAttribute("stroke-linecap","round");
  svg.setAttribute("stroke-linejoin","round");
  svg.setAttribute("class","ui-inline-arrow");
  svg.setAttribute("focusable","false");
  svg.setAttribute("aria-hidden","true");
  for(const d of paths[key]){
   const el=document.createElementNS("http://www.w3.org/2000/svg","path");
   el.setAttribute("d",d);svg.appendChild(el);
  }
  img.replaceWith(svg);
 };
 const scan=(root)=>{
  if(root.nodeType!==1&&root.nodeType!==9)return;
  if(root.nodeType===1&&root.matches(arrowSelector))convert(root);
  root.querySelectorAll?.(arrowSelector).forEach(convert);
 };
 scan(document);
 if(!document.body)return;
 const observer=new MutationObserver(records=>{
  for(const record of records)for(const node of record.addedNodes)scan(node);
 });
 observer.observe(document.body,{subtree:true,childList:true});
})();
