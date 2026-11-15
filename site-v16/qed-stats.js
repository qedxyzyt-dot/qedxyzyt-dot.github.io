"use strict";
(() => {
 const label=document.querySelector("#qed-subs"),views=document.querySelector("#qed-views"),date=document.querySelector("#qed-stats-date");if(!label||!views||!date)return;
 fetch("./qed-stats.json",{cache:"no-store"}).then(r=>{if(!r.ok)throw Error("No metrics snapshot");return r.json()}).then(s=>{
   if(s.channelId!=="UCiwhkT-ZkNQlmupN7jduBUA"||!Number.isInteger(s.totalViews)||!s.subscriberCountLabel)return;
   label.textContent=s.subscriberCountLabel+" inscritos";
   views.textContent=new Intl.NumberFormat("pt-BR").format(s.totalViews)+" visualizações";
   const raw=String(s.checkedAt||"");const isDate=/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(raw);const d=new Date(raw);
   if(isDate)date.textContent="Fonte: YouTube · consultado em "+raw.split("-").reverse().join("/");
   else if(Number.isFinite(+d))date.textContent="Fonte: YouTube · consultado em "+new Intl.DateTimeFormat("pt-BR",{day:"2-digit",month:"2-digit",year:"numeric",timeZone:"America/Sao_Paulo"}).format(d);
 }).catch(()=>{/* The dated HTML fallback is intentionally preserved. */});
})();
