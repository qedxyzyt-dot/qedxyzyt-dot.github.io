// Update QED public statistics from the official YouTube Data API.
// Runs in GitHub Actions; this script and the API key never enter the Pages artifact.
import {writeFile} from "node:fs/promises";
import {resolve,dirname} from "node:path";
import {fileURLToPath} from "node:url";
const CHANNEL_ID="UCiwhkT-ZkNQlmupN7jduBUA";
const root=resolve(dirname(fileURLToPath(import.meta.url)),"..");
const statsPath=resolve(root,"site-v16/qed-stats.json");
const imagePath=resolve(root,"site-v16/assets/projects/qed-avatar.svg");

export function formatSnapshot(item,checkedAt=new Date().toISOString()){
 if(item?.id!==CHANNEL_ID)throw Error("Channel ID mismatch");
 const stats=item.statistics||{};
 const totalViews=Number(stats.viewCount);
 if(stats.viewCount==null||!Number.isSafeInteger(totalViews)||totalViews<0)throw Error("Invalid public view count");
 const hidden=stats.hiddenSubscriberCount===true;
 const subscribers=hidden?null:Number(stats.subscriberCount);
 if(!hidden&&(stats.subscriberCount==null||!Number.isSafeInteger(subscribers)||subscribers<0))throw Error("Invalid public subscriber count");
 const videos=Number(stats.videoCount);
 return {
  channelId:CHANNEL_ID,
  subscriberCountLabel:hidden?"":new Intl.NumberFormat("pt-BR",{notation:"compact",maximumFractionDigits:1}).format(subscribers).replace(/\u00a0/g," "),
  subscriberCountPublic:subscribers,
  subscriberCountIsRounded:!hidden&&subscribers>=1000,
  totalViews,
  videoCount:Number.isSafeInteger(videos)&&videos>=0?videos:null,
  checkedAt,
  source:"YouTube Data API v3 channels.list; subscriberCount arredondado pela plataforma"
 };
}

export function renderAvatar(buffer,mime){
 if(!["image/jpeg","image/png","image/webp"].includes(mime))throw Error("Unexpected image format");
 if(!Buffer.isBuffer(buffer)||buffer.length<256||buffer.length>1000000)throw Error("Invalid image size");
 return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 420" width="420" height="420" role="img" aria-label="Foto de perfil do canal QED no YouTube"><image width="420" height="420" href="data:'+mime+';base64,'+buffer.toString("base64")+'"/></svg>\n';
}

async function main(){
 const key=process.env.YOUTUBE_DATA_API_KEY;
 if(!key||!key.trim())throw Error("YouTube API secret not configured");
 const url=new URL("https://www.googleapis.com/youtube/v3/channels");
 url.searchParams.set("part","snippet,statistics");
 url.searchParams.set("id",CHANNEL_ID);
 url.searchParams.set("key",key);
 // Never log request URLs, API responses or credentials.
 let body;
 try{
  const r=await fetch(url,{signal:AbortSignal.timeout(18000)});
  if(!r.ok)throw Error("HTTP "+r.status);
  body=await r.json();
 }catch(e){throw Error("Could not request public channel metrics ("+String(e?.message||"").replace(/key=[^&\s]+/gi,"key=[redacted]")+")");}
 if(!Array.isArray(body?.items)||body.items.length!==1)throw Error("Unexpected channel count");
 const item=body.items[0],snapshot=formatSnapshot(item);
 let avatarUpdated=false;
 const thumbnail=item.snippet?.thumbnails?.high?.url||item.snippet?.thumbnails?.medium?.url||item.snippet?.thumbnails?.default?.url;
 if(thumbnail){
  try{
   const u=new URL(thumbnail);
   if(u.protocol!=="https:"||!["yt3.googleusercontent.com","yt3.ggpht.com"].includes(u.hostname))throw Error("Untrusted image host");
   const r=await fetch(u,{signal:AbortSignal.timeout(15000)});
   if(!r.ok)throw Error("Image HTTP "+r.status);
   const mime=(r.headers.get("content-type")||"").split(";")[0].trim().toLowerCase();
   const bytes=Buffer.from(await r.arrayBuffer());
   await writeFile(imagePath,renderAvatar(bytes,mime),"utf8");
   avatarUpdated=true;
  }catch(e){console.warn("Avatar not refreshed; keeping verified cached image");}
 }
 await writeFile(statsPath,JSON.stringify(snapshot,null,2)+"\n","utf8");
 console.log("QED verified:",snapshot.subscriberCountLabel||"hidden","subscribers;",snapshot.totalViews,"views; avatar",avatarUpdated?"refreshed":"unchanged");
}
if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 main().catch(e=>{console.error("QED update failed:",String(e?.message||"Unknown error"));process.exitCode=1;});
}
