"use strict";
/* Reuse the exact Lucide arrow geometry already referenced by the portfolio.
   Inline paths inherit currentColor, unlike <img> SVG which cannot inherit parent color.
   Original SVG assets stay present for the non-JS fallback. */
(() => {
 const paths={
  "ui-arrow-up-right.svg":["M7 7h10v10","M7 17 17 7"],
  "ui-arrow-down-right.svg":["m7 7 10 10","M17 7v10H7"],
  "ui-arrow-left.svg":["m12 19-7-7 7-7","M19 12H5"]
 };
 for(const img of document.querySelectorAll("img.ui-inline-arrow")){
  const key=(img.getAttribute("src")||"").split("/").pop();
  if(!Object.prototype.hasOwnProperty.call(paths,key))continue;
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
   const path=document.createElementNS("http://www.w3.org/2000/svg","path");
   path.setAttribute("d",d);
   svg.appendChild(path);
  }
  img.replaceWith(svg);
 }
})();
