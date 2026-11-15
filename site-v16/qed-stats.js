"use strict";
(() => {
 const label=document.querySelector("#qed-subs"),views=document.querySelector("#qed-views"),date=document.querySelector("#qed-stats-date");
 if(!label||!views||!date)return;
 fetch("./qed-stats.json",{cache:"no-store"}).then(r=>{if(!r.ok)throw Error("Snapshot HTTP "+r.status);return r.json()}).then(s=>{
  if(s.channelId!=="UCiwhkT-ZkNQlmupN7jduBUA"||!Number.isSafeInteger(s.totalViews)||s.totalViews<0||typeof s.subscriberCountLabel!=="string"||s.subscriberCountLabel.length>50)return;
  const value=s.subscriberCountLabel.trim();
  label.textContent=value?value+" inscritos":"Inscritos não divulgados";
  views.textContent=new Intl.NumberFormat("pt-BR").format(s.totalViews)+" visualizações";
  const raw=String(s.checkedAt||"");
  const onlyDate=/^\d{4}-\d{2}-\d{2}$/.test(raw);
  const parsed=new Date(raw);
  if(!Number.isFinite(+parsed))return;
  const display=onlyDate?raw.split("-").reverse().join("/"):
    new Intl.DateTimeFormat("pt-BR",{day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit",timeZone:"America/Sao_Paulo"}).format(parsed);
  const olderThan48h=Date.now()-parsed.getTime()>48*60*60*1000;
  date.textContent="Fonte: YouTube · consultado em "+display+(olderThan48h?" · aguardando nova atualização":"");
  date.dateTime=raw;
 }).catch(()=>{date.textContent+=" · atualização indisponível";});
})();
